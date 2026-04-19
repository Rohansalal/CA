import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { MainLayout } from './components/layout/MainLayout';
import { isAdminTokenValid, clearAdminSession } from './api/client';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

// Insights
import { InsightList } from './pages/insights/List';

// Expiry
import { ExpiryDashboard } from './pages/expiry/ExpiryDashboard';

// Sales & Leads
import { Pipeline } from './pages/leads/Pipeline';

// Client Management
import { ClientList } from './pages/clients/List';

// Services
import { ServiceList } from './pages/services/List';
import { Categories } from './pages/services/Categories';
import { ServiceDetail } from './pages/services/Detail';

// HRMS
import { Timesheets } from './pages/hrms/Timesheets';
import { EDiary } from './pages/hrms/EDiary';
import { Stipends } from './pages/hrms/Stipends';

// Submissions
import { SubmissionList } from './pages/submissions/List';
import { SubmissionDetail } from './pages/submissions/Detail';

// System
import { OrderList } from './pages/orders/List';
import { ConsultationList } from './pages/consultations/List';
import { UserList } from './pages/users/List';
import { UserDetail } from './pages/users/Detail';
import { SupportTickets } from './pages/tickets/Support';
import { DocumentList } from './pages/documents/List';
import { ComplianceCalendar } from './pages/compliance/Calendar';
import { Notifications } from './pages/notifications/List';
import { Settings } from './pages/settings/Settings';
import { NotFound } from './pages/404';
import { useAuthStore } from './store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      // Never retry auth errors (401/403) — they won't resolve without re-login
      retry: (failureCount, error: unknown) => {
        const e = error as { status?: number; isAuthError?: boolean } | null;
        if (e?.isAuthError || e?.status === 401 || e?.status === 403) return false;
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
  },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  // Validate the real JWT — Zustand persists isAuthenticated so we must check
  // the actual token too. This catches the 24h expiry case.
  if (isAuthenticated && !isAdminTokenValid()) {
    // Token missing or expired — clear everything and go to login
    logout();
    clearAdminSession('expired');
    return <Navigate to="/dashboard/login?reason=expired" replace />;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/dashboard/login" replace />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors closeButton />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard/login" element={<Login />} />
          <Route path="/login" element={<Navigate to="/dashboard/login" replace />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            {/* Overview */}
            <Route index element={<Dashboard />} />
            <Route path="insights" element={<InsightList />} />
            <Route path="expiry" element={<ExpiryDashboard />} />

            {/* Sales & Leads */}
            <Route path="leads" element={<Pipeline />} />

            {/* Client Management */}
            <Route path="clients" element={<ClientList />} />

            {/* Services */}
            <Route path="services" element={<ServiceList />} />
            <Route path="services/categories" element={<Categories />} />
            <Route path="services/:id" element={<ServiceDetail />} />

            {/* HRMS */}
            <Route path="hrms" element={<Timesheets />} />
            <Route path="hrms/timesheets" element={<Timesheets />} />
            <Route path="hrms/ediary" element={<EDiary />} />
            <Route path="hrms/stipends" element={<Stipends />} />

            {/* Submissions */}
            <Route path="submissions" element={<SubmissionList />} />
            <Route path="submissions/:id" element={<SubmissionDetail />} />

            {/* System / Legacy */}
            <Route path="orders" element={<OrderList />} />
            <Route path="consultations" element={<ConsultationList />} />
            <Route path="users" element={<UserList />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="tickets" element={<SupportTickets />} />
            <Route path="documents" element={<DocumentList />} />
            <Route path="compliance" element={<ComplianceCalendar />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
