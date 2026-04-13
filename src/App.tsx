import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './user-panel/contexts/AuthContext';
import { AdminProvider } from './admin-panel/contexts/AdminContext';
import { ProtectedRoute } from './user-panel/components/ProtectedRoute';
import { AdminProtectedRoute } from './admin-panel/components/AdminProtectedRoute';
import { AdminLayout } from './admin-panel/components/AdminLayout';
import { CartProvider } from './user-panel/contexts/CartContext';
import { Toaster } from 'sonner';
import { queryClient } from './hooks/queryClient';

// Auth Pages
import { Login } from './user-panel/pages/Login';
import { Register } from './user-panel/pages/Register';
import { Dashboard } from './user-panel/pages/Dashboard';
import { UserProfile } from './user-panel/pages/UserProfile';
import { OTPVerification } from './user-panel/pages/OTPVerification';
import { ForgotPassword } from './user-panel/pages/ForgotPassword';
import { OrderDocuments } from './user-panel/pages/OrderDocuments';
import { OrderRequirements } from './user-panel/pages/OrderRequirements';
import { OrderSubmitDetails } from './user-panel/pages/OrderSubmitDetails';
import { MyTasks } from './user-panel/pages/MyTasks';
import { MyNotifications } from './user-panel/pages/MyNotifications';
import { DynamicServiceForm } from './user-panel/pages/DynamicServiceForm';
import { ServicePaymentPage } from './user-panel/pages/ServicePaymentPage';

// Admin Pages
import { AdminLogin } from './admin-panel/pages/AdminLogin';
import { AdminDashboard } from './admin-panel/pages/AdminDashboard';
import { AdminUsersServices } from './admin-panel/pages/AdminUsersServices';
import { AdminAnalytics } from './admin-panel/pages/AdminAnalytics';
import { AdminTickets } from './admin-panel/pages/AdminTickets';
import { AdminProfile } from './admin-panel/pages/AdminProfile';
import { AdminTasks } from './admin-panel/pages/AdminTasks';
import { AdminLeads } from './admin-panel/pages/AdminLeads';
import { AdminPayments } from './admin-panel/pages/AdminPayments';
import { AdminNotifications } from './admin-panel/pages/AdminNotifications';
import { AdminCRM } from './admin-panel/pages/AdminCRM';
import { AdminHRMS } from './admin-panel/pages/AdminHRMS';
import { AdminAssets } from './admin-panel/pages/AdminAssets';
import { AdminITR } from './admin-panel/pages/AdminITR';

// Home Pages
import { Home } from './components/Home';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import { Industries } from './components/Industries';
import { Resources } from './components/Resources';
import { ContactUs } from './components/ContactUs';
import { PrivacyPolicy } from './components/pages/PrivacyPolicy';
import { TermsAndConditions } from './components/pages/TermsConditions';
import { AllServices } from './components/pages/AllServices';
import { Cart } from './user-panel/pages/Cart';
import Navigation from './components/Navigation';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { CrispChat, WhatsAppButton } from './components/common';

// Business Registration Services
import { SoleProprietorship } from './components/services/BusinessRegistration/SoleProprietorship';
import { PartnershipFirm } from './components/services/BusinessRegistration/PartnershipFirm';
import { PrivateLimitedCompany } from './components/services/BusinessRegistration/PrivateLimitedCompany';
import { LLPFormation } from './components/services/BusinessRegistration/LLPFormation';
import { OnePersonCompany } from './components/services/BusinessRegistration/OnePersonCompany';
import { HUFRegistration } from './components/services/BusinessRegistration/HUFRegistration';
import { PublicLimitedCompany } from './components/services/BusinessRegistration/PublicLimitedCompany';
import { Section8Company } from './components/services/BusinessRegistration/Section8Company';
import { TrustRegistration } from './components/services/BusinessRegistration/TrustRegistration';
import { SocietyRegistration } from './components/services/BusinessRegistration/SocietyRegistration';
import { CompanyIncorporation } from './components/services/BusinessRegistration/CompanyIncorporation';

// Tax Registration Services
import { GSTRegistration } from './components/services/TaxRegistration/GSTRegistration';
import { PANApplication } from './components/services/TaxRegistration/PANApplication';
import { TANApplication } from './components/services/TaxRegistration/TANApplication';

// Tax Compliances Services
import { ITRFiling } from './components/services/TaxCompliances/ITRFiling';
import { GSTReturn } from './components/services/TaxCompliances/GSTReturn';
import { GSTAnnualReturn } from './components/services/TaxCompliances/GSTAnnualReturn';
import { TDSReturn } from './components/services/TaxCompliances/TDSReturn';
import { AdvanceTax } from './components/services/TaxCompliances/AdvanceTax';

// Audit & Assurance Services
import { StatutoryAudit } from './components/services/AuditAssurance/StatutoryAudit';
import { TaxAudit } from './components/services/AuditAssurance/TaxAudit';
import { GSTAudit } from './components/services/AuditAssurance/GSTAudit';
import { InternalAudit } from './components/services/AuditAssurance/InternalAudit';

// Other Registrations Services
import { FSSAIRegistration } from './components/services/OtherRegistrations/FSSAIRegistration';
import { IECRegistration } from './components/services/OtherRegistrations/IECRegistration';
import { MSMERegistration } from './components/services/OtherRegistrations/MSMERegistration';
import { DSCRegistration } from './components/services/OtherRegistrations/DSCRegistration';
import { PFESICRegistration } from './components/services/OtherRegistrations/PFESICRegistration';
import { TrademarkRegistration } from './components/services/OtherRegistrations/TrademarkRegistration';
import { CopyrightRegistration } from './components/services/OtherRegistrations/CopyrightRegistration';
import { StartupIndiaRegistration } from './components/services/OtherRegistrations/StartupIndiaRegistration';
import { TradeLicense } from './components/services/OtherRegistrations/TradeLicense';
import { LabourRegistration } from './components/services/OtherRegistrations/LabourRegistration';
import { DrugLicense } from './components/services/OtherRegistrations/DrugLicense';
import { PollutionControlLicense } from './components/services/OtherRegistrations/PollutionControlLicense';

// Business Compliances Services
import { BookKeeping } from './components/services/BusinessCompliances/BookKeeping';
import { BookSupervision } from './components/services/BusinessCompliances/BookSupervision';
import { ROCAnnualFilings } from './components/services/BusinessCompliances/ROCAnnualFilings';
import { LLPAnnualFilings } from './components/services/BusinessCompliances/LLPAnnualFilings';
import { ChangeInDirectors } from './components/services/BusinessCompliances/ChangeInDirectors';
import { RegisteredOfficeChange } from './components/services/BusinessCompliances/RegisteredOfficeChange';
import { DirectorKYC } from './components/services/BusinessCompliances/DirectorKYC';
import { MinutesBook } from './components/services/BusinessCompliances/MinutesBook';
import { StatutoryRecord } from './components/services/BusinessCompliances/StatutoryRecord';

// Navigation Components
import { TwoPanelDropdownExample } from './components/navigation/TwoPanelDropdownExample';

function AppContent() {
  const location = useLocation();

  const getPageFromRoute = (pathname: string) => {
    if (pathname === '/') return 'home';
    return pathname.slice(1).replace(/\//g, '-');
  };

  const currentPage = getPageFromRoute(location.pathname);

  const showNavigation = !['/login', '/register', '/dashboard', '/admin'].some(path => location.pathname.startsWith(path));
  const showWhatsApp = !['/dashboard', '/admin'].some(path => location.pathname.startsWith(path));

  return (
    <div className="min-h-screen bg-neutral-50 relative">
      <Toaster position="top-right" richColors />
      <CrispChat />
      {showWhatsApp && <WhatsAppButton />}
      {showNavigation && <Navigation currentPage={currentPage} onNavigate={() => { }} />}
      <main>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<OTPVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/users/profile/:username" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/dashboard/order/:id/upload-documents" element={<ProtectedRoute><OrderDocuments /></ProtectedRoute>} />
          <Route path="/dashboard/order/:id/requirements" element={<ProtectedRoute><OrderRequirements /></ProtectedRoute>} />
          <Route path="/dashboard/order/:id/submit-details" element={<ProtectedRoute><OrderSubmitDetails /></ProtectedRoute>} />
          <Route path="/dashboard/tasks" element={<ProtectedRoute><MyTasks /></ProtectedRoute>} />
          <Route path="/dashboard/notifications" element={<ProtectedRoute><MyNotifications /></ProtectedRoute>} />
          <Route path="/dashboard/order/:id/payment" element={<ProtectedRoute><ServicePaymentPage /></ProtectedRoute>} />
          <Route path="/dashboard/order/:id/form" element={<ProtectedRoute><DynamicServiceForm /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route path="/admin/users" element={<AdminProtectedRoute><AdminUsersServices /></AdminProtectedRoute>} />
          <Route path="/admin/analytics" element={<AdminProtectedRoute><AdminAnalytics /></AdminProtectedRoute>} />
          <Route path="/admin/tickets" element={<AdminProtectedRoute><AdminTickets /></AdminProtectedRoute>} />
          <Route path="/admin/services" element={<AdminProtectedRoute><AdminUsersServices /></AdminProtectedRoute>} />
          <Route path="/admin/profile" element={<AdminProtectedRoute><AdminProfile /></AdminProtectedRoute>} />
          <Route path="/admin/tasks" element={<AdminProtectedRoute><AdminTasks /></AdminProtectedRoute>} />
          <Route path="/admin/leads" element={<AdminProtectedRoute><AdminLeads /></AdminProtectedRoute>} />
          <Route path="/admin/orders" element={<AdminProtectedRoute><AdminPayments /></AdminProtectedRoute>} />
          <Route path="/admin/notifications" element={<AdminProtectedRoute><AdminNotifications /></AdminProtectedRoute>} />
          <Route path="/admin/crm" element={<AdminProtectedRoute><AdminCRM /></AdminProtectedRoute>} />
          <Route path="/admin/hrms" element={<AdminProtectedRoute><AdminHRMS /></AdminProtectedRoute>} />
          <Route path="/admin/assets" element={<AdminProtectedRoute><AdminAssets /></AdminProtectedRoute>} />
          <Route path="/admin/itr" element={<AdminProtectedRoute><AdminLayout><AdminITR /></AdminLayout></AdminProtectedRoute>} />

          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/all-services" element={<AllServices />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />

          {/* Business Registration Service Pages */}
          <Route path="/services/business-registrations/proprietorship" element={<SoleProprietorship />} />
          <Route path="/services/business-registrations/partnership-firm" element={<PartnershipFirm />} />
          <Route path="/services/business-registrations/private-limited-company" element={<PrivateLimitedCompany />} />
          <Route path="/services/business-registrations/llp-registration" element={<LLPFormation />} />
          <Route path="/services/business-registrations/one-person-company" element={<OnePersonCompany />} />
          <Route path="/services/business-registrations/huf" element={<HUFRegistration />} />
          <Route path="/services/business-registrations/public-limited-company" element={<PublicLimitedCompany />} />
          <Route path="/services/business-registrations/section-8-company" element={<Section8Company />} />
          <Route path="/services/business-registrations/trust-registration" element={<TrustRegistration />} />
          <Route path="/services/business-registrations/society-registration" element={<SocietyRegistration />} />
          <Route path="/services/business-registrations/company-incorporation" element={<CompanyIncorporation />} />

          {/* Tax Registration Service Pages */}
          <Route path="/services/tax-registrations/gst-registration" element={<GSTRegistration />} />
          <Route path="/services/tax-registrations/pan-application" element={<PANApplication />} />
          <Route path="/services/tax-registrations/tan-application" element={<TANApplication />} />

          {/* Tax Compliances Service Pages */}
          <Route path="/services/tax-compliances/itr-filing" element={<ITRFiling />} />
          <Route path="/services/tax-compliances/gst-return-filing" element={<GSTReturn />} />
          <Route path="/services/tax-compliances/gst-annual-return" element={<GSTAnnualReturn />} />
          <Route path="/services/tax-compliances/tds-return-filing" element={<TDSReturn />} />
          <Route path="/services/tax-compliances/advance-tax-calculation" element={<AdvanceTax />} />

          {/* Audit & Assurance Service Pages */}
          <Route path="/services/audit-assurance/statutory-audit" element={<StatutoryAudit />} />
          <Route path="/services/audit-assurance/tax-audit" element={<TaxAudit />} />
          <Route path="/services/audit-assurance/gst-audit" element={<GSTAudit />} />
          <Route path="/services/audit-assurance/internal-audit" element={<InternalAudit />} />

          {/* Other Registrations Service Pages */}
          <Route path="/services/other-registrations/fssai" element={<FSSAIRegistration />} />
          <Route path="/services/other-registrations/iec" element={<IECRegistration />} />
          <Route path="/services/other-registrations/msme" element={<MSMERegistration />} />
          <Route path="/services/other-registrations/dsc" element={<DSCRegistration />} />
          <Route path="/services/other-registrations/pf-esic" element={<PFESICRegistration />} />
          <Route path="/services/other-registrations/trademark" element={<TrademarkRegistration />} />
          <Route path="/services/other-registrations/copyright" element={<CopyrightRegistration />} />
          <Route path="/services/other-registrations/startup-india" element={<StartupIndiaRegistration />} />
          <Route path="/services/other-registrations/trade-license" element={<TradeLicense />} />
          <Route path="/services/other-registrations/labour-registration" element={<LabourRegistration />} />
          <Route path="/services/other-registrations/drug-license" element={<DrugLicense />} />
          <Route path="/services/other-registrations/pollution-control" element={<PollutionControlLicense />} />

          {/* Business Compliances Service Pages */}
          <Route path="/services/business-compliances/book-keeping" element={<BookKeeping />} />
          <Route path="/services/business-compliances/book-supervision" element={<BookSupervision />} />
          <Route path="/services/business-compliances/annual-filing-company" element={<ROCAnnualFilings />} />
          <Route path="/services/business-compliances/annual-filing-llp" element={<LLPAnnualFilings />} />
          <Route path="/services/business-compliances/change-directors-kmp" element={<ChangeInDirectors />} />
          <Route path="/services/business-compliances/change-registered-office" element={<RegisteredOfficeChange />} />
          <Route path="/services/business-compliances/din-dir3-kyc" element={<DirectorKYC />} />
          <Route path="/services/business-compliances/minutes-book" element={<MinutesBook />} />
          <Route path="/services/business-compliances/statutory-record" element={<StatutoryRecord />} />
          
          {/* Navigation Demo */}
          <Route path="/demo/dropdown" element={<TwoPanelDropdownExample />} />
        </Routes>
      </main>
      {showNavigation && <Footer onNavigate={() => { }} />}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <AuthProvider>
          <AdminProvider>
            <CartProvider>
              <AppContent />
            </CartProvider>
          </AdminProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}