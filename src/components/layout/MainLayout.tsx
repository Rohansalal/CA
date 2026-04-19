import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '../../utils/cn';
import { useUIStore } from '../../store';

const pageTitles: Record<string, { title: string; description?: string }> = {
  '/dashboard': { title: 'Dashboard', description: 'Welcome back' },
  '/dashboard/expiry': { title: 'Expiry Dashboard', description: 'Track expiring documents and deadlines' },
  '/dashboard/leads': { title: 'Leads', description: 'Manage and track your sales pipeline' },
  '/dashboard/clients': { title: 'Clients', description: 'Manage your client portfolio' },
  '/dashboard/services': { title: 'Services', description: 'Manage your service catalog' },
  '/dashboard/services/categories': { title: 'Service Categories', description: 'Organize your catalog structure' },
  '/dashboard/hrms': { title: 'Timesheets', description: 'Track team hours and billable time' },
  '/dashboard/hrms/timesheets': { title: 'Timesheets', description: 'Track team hours and billable time' },
  '/dashboard/hrms/ediary': { title: 'E-Diary', description: 'Article clerk daily work log' },
  '/dashboard/hrms/stipends': { title: 'Stipends', description: 'Manage article stipend payments' },
  '/dashboard/orders': { title: 'Orders', description: 'Track and manage service orders' },
  '/dashboard/tickets': { title: 'Support Tickets', description: 'Manage client support requests' },
  '/dashboard/documents': { title: 'Documents', description: 'Secure document vault' },
  '/dashboard/consultations': { title: 'Consultations', description: 'Manage consultation requests' },
  '/dashboard/compliance': { title: 'Compliance Calendar', description: 'Track compliance deadlines' },
  '/dashboard/notifications': { title: 'Notifications', description: 'System notifications and alerts' },
  '/dashboard/settings': { title: 'Settings', description: 'Platform configuration' },
  '/dashboard/users': { title: 'Users', description: 'Manage user accounts' },
};

export function MainLayout() {
  const location = useLocation();
  const collapsed = useUIStore((state) => state.sidebarCollapsed);

  // Match exact path, then try prefix (for detail pages like /dashboard/services/5)
  const pageInfo =
    pageTitles[location.pathname] ||
    Object.entries(pageTitles)
      .sort((a, b) => b[0].length - a[0].length)
      .find(([p]) => location.pathname.startsWith(p + '/'))?.[1] ||
    { title: 'Admin Panel' };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <Header title={pageInfo.title} description={pageInfo.description} />
      <main
        className={cn(
          'pt-16 min-h-screen transition-all duration-300 ease-in-out',
          // desktop: offset by sidebar width
          collapsed ? 'md:pl-[72px]' : 'md:pl-64',
          // mobile: no left padding (sidebar is overlay)
          'pl-0'
        )}
      >
        <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
