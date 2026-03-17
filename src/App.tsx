import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './user-panel/contexts/AuthContext';
import { AdminProvider } from './admin-panel/contexts/AdminContext';
import { ProtectedRoute } from './user-panel/components/ProtectedRoute';
import { AdminProtectedRoute } from './admin-panel/components/AdminProtectedRoute';
import { CartProvider } from './user-panel/contexts/CartContext';

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

// Admin Pages
import { AdminLogin } from './admin-panel/pages/AdminLogin';
import { AdminDashboard } from './admin-panel/pages/AdminDashboard';
import { AdminUsers } from './admin-panel/pages/AdminUsers';
import { AdminAnalytics } from './admin-panel/pages/AdminAnalytics';
import { AdminTickets } from './admin-panel/pages/AdminTickets';
import { AdminServices } from './admin-panel/pages/AdminServices';
import { AdminProfile } from './admin-panel/pages/AdminProfile'; // Import AdminProfile
import { AdminTasks } from './admin-panel/pages/AdminTasks';
import { AdminLeads } from './admin-panel/pages/AdminLeads';
import { AdminOrders } from './admin-panel/pages/AdminOrders';
import { AdminNotifications } from './admin-panel/pages/AdminNotifications';
import { AdminCRM } from './admin-panel/pages/AdminCRM';

import { MyTasks } from './user-panel/pages/MyTasks';
import { MyNotifications } from './user-panel/pages/MyNotifications';

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

// Blog Pages
import { Budget2026 } from './components/pages/blogs/Budget2026';
import { GSTComplianceJan2026 } from './components/pages/blogs/GSTComplianceJan2026';
import { ROCComplianceRequirements } from './components/pages/blogs/ROCComplianceRequirements';
import { TaxSavingStartups } from './components/pages/blogs/TaxSavingStartups';
import { ITRFilingGuide } from './components/pages/blogs/ITRFilingGuide';
import { TransferPricingSMEs } from './components/pages/blogs/TransferPricingSMEs';

// Business Registrations
import { BusinessRegistrations } from './components/services/BusinessRegistration/BusinessRegistrations';
import { SoleProprietorship } from './components/services/BusinessRegistration/SoleProprietorship';
import { CompanyIncorporation } from './components/services/BusinessRegistration/CompanyIncorporation';
import { LLPFormation } from './components/services/BusinessRegistration/LLPFormation';
import { PartnershipFirm } from './components/services/BusinessRegistration/PartnershipFirm';
import { OnePersonCompany } from './components/services/BusinessRegistration/OnePersonCompany';
import { Section8Company } from './components/services/BusinessRegistration/Section8Company';
import { HUFRegistration } from './components/services/BusinessRegistration/HUFRegistration';
import { PrivateLimitedCompany } from './components/services/BusinessRegistration/PrivateLimitedCompany';
import { PublicLimitedCompany } from './components/services/BusinessRegistration/PublicLimitedCompany';
import { TrustRegistration } from './components/services/BusinessRegistration/TrustRegistration';
import { SocietyRegistration } from './components/services/BusinessRegistration/SocietyRegistration';

// Tax Registrations
import { TaxRegistrationsService } from './components/services/TaxRegistration/TaxRegistrationsService';
import { TaxRegistrations } from './components/services/TaxRegistration/TaxRegistrations';
import { GSTRegistration } from './components/services/TaxRegistration/GSTRegistration';
import { PANApplication } from './components/services/TaxRegistration/PANApplication';
import { TANApplication } from './components/services/TaxRegistration/TANApplication';

// Business Compliances
import { BusinessEntityLawCompliances } from './components/services/BusinessCompliances/BusinessEntityLawCompliances';
import { BookKeeping } from './components/services/BusinessCompliances/BookKeeping';
import { BookSupervision } from './components/services/BusinessCompliances/BookSupervision';
import { MinutesBook } from './components/services/BusinessCompliances/MinutesBook';
import { StatutoryRecord } from './components/services/BusinessCompliances/StatutoryRecord';
import { ROCAnnualFilings } from './components/services/BusinessCompliances/ROCAnnualFilings';
import { LLPAnnualFilings } from './components/services/BusinessCompliances/LLPAnnualFilings';
import { DirectorKYC } from './components/services/BusinessCompliances/DirectorKYC';
import { BoardMeetingsAGM } from './components/services/BusinessCompliances/BoardMeetingsAGM';
import { ShareTransfer } from './components/services/BusinessCompliances/ShareTransfer';
import { ChangeInDirectors } from './components/services/BusinessCompliances/ChangeInDirectors';
import { RegisteredOfficeChange } from './components/services/BusinessCompliances/RegisteredOfficeChange';

// Tax Compliances
import { TaxFinancialCompliances } from './components/services/TaxCompliances/TaxFinancialCompliances';
import { TaxCompliances } from './components/services/TaxCompliances/TaxCompliances';
import { AdvanceTax } from './components/services/TaxCompliances/AdvanceTax';
import { ITRFiling } from './components/services/TaxCompliances/ITRFiling';
import { TDSReturn } from './components/services/TaxCompliances/TDSReturn';
import { GSTReturn } from './components/services/TaxCompliances/GSTReturn';
import { GSTAnnualReturn } from './components/services/TaxCompliances/GSTAnnualReturn';

// Audit & Assurance
import { AuditAssurance } from './components/services/AuditAssurance/AuditAssurance';
import { StatutoryAudit } from './components/services/AuditAssurance/StatutoryAudit';
import { TaxAudit } from './components/services/AuditAssurance/TaxAudit';
import { InternalAudit } from './components/services/AuditAssurance/InternalAudit';
import { GSTAudit } from './components/services/AuditAssurance/GSTAudit';

// Other Registrations & Government Licenses
import { GovernmentRegistrationsCompliances } from './components/services/OtherRegistrations/GovernmentRegistrationsCompliances';
import { GovernmentRegistrations } from './components/services/OtherRegistrations/GovernmentRegistrations';
import { PFESICRegistration } from './components/services/OtherRegistrations/PFESICRegistration';
import { FSSAIRegistration } from './components/services/OtherRegistrations/FSSAIRegistration';
import { IECRegistration } from './components/services/OtherRegistrations/IECRegistration';
import { DSCRegistration } from './components/services/OtherRegistrations/DSCRegistration';
import { MSMERegistration } from './components/services/OtherRegistrations/MSMERegistration';
import { TrademarkRegistration } from './components/services/OtherRegistrations/TrademarkRegistration';
import { StartupIndiaRegistration } from './components/services/OtherRegistrations/StartupIndiaRegistration';
import { CopyrightRegistration } from './components/services/OtherRegistrations/CopyrightRegistration';
import { TradeLicense } from './components/services/OtherRegistrations/TradeLicense';
import { LabourRegistration } from './components/services/OtherRegistrations/LabourRegistration';
import { DrugLicense } from './components/services/OtherRegistrations/DrugLicense';
import { PollutionControlLicense } from './components/services/OtherRegistrations/PollutionControlLicense';

import Navigation from './components/Navigation';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { CookieConsent, CrispChat, WhatsAppButton } from './components/common';
import { Toaster } from 'sonner';

function AppContent() {
  const location = useLocation();

  // Extract the current page from the route
  const getPageFromRoute = (pathname: string) => {
    if (pathname === '/') return 'home';
    return pathname.slice(1).replace(/\//g, '-');
  };

  const currentPage = getPageFromRoute(location.pathname);

  // Show navigation and footer only on non-auth and non-dashboard and non-admin pages
  const showNavigation = !['/login', '/register', '/dashboard', '/admin'].some(path => location.pathname.startsWith(path));

  return (
    <div className="min-h-screen bg-neutral-50 relative">
      <Toaster position="top-right" richColors />
      <CrispChat />
      <WhatsAppButton />
      {showNavigation && <Navigation currentPage={currentPage} onNavigate={() => { }} />}
      {/* {location.pathname === '/' && <CookieConsent />} */}
      <main>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<OTPVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/users/profile/:username"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/order/:id/upload-documents"
            element={
              <ProtectedRoute>
                <OrderDocuments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/order/:id/requirements"
            element={
              <ProtectedRoute>
                <OrderRequirements />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/order/:id/submit-details"
            element={
              <ProtectedRoute>
                <OrderSubmitDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/tasks"
            element={
              <ProtectedRoute>
                <MyTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/notifications"
            element={
              <ProtectedRoute>
                <MyNotifications />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminProtectedRoute>
                <AdminUsers />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <AdminProtectedRoute>
                <AdminAnalytics />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/tickets"
            element={
              <AdminProtectedRoute>
                <AdminTickets />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <AdminProtectedRoute>
                <AdminServices />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <AdminProtectedRoute>
                <AdminProfile />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/tasks"
            element={
              <AdminProtectedRoute>
                <AdminTasks />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/leads"
            element={
              <AdminProtectedRoute>
                <AdminLeads />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminProtectedRoute>
                <AdminOrders />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/notifications"
            element={
              <AdminProtectedRoute>
                <AdminNotifications />
              </AdminProtectedRoute>
            }
          />
          {/* CRM Admin Route */}
          <Route
            path="/admin/crm"
            element={
              <AdminProtectedRoute>
                <AdminCRM />
              </AdminProtectedRoute>
            }
          />

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

          {/* Blog/Resources Routes */}
          <Route path="/resources/budget-2026" element={<Budget2026 />} />
          <Route path="/resources/gst-checklist-jan-2026" element={<GSTComplianceJan2026 />} />
          <Route path="/resources/roc-compliance" element={<ROCComplianceRequirements />} />
          <Route path="/resources/tax-saving-startups" element={<TaxSavingStartups />} />
          <Route path="/resources/itr-filing-guide" element={<ITRFilingGuide />} />
          <Route path="/resources/transfer-pricing-smes" element={<TransferPricingSMEs />} />


          {/* ===== 5 MAIN SERVICE CATEGORY PAGES ===== */}
          <Route path="/services/business-registrations" element={<BusinessRegistrations />} />
          <Route path="/services/tax-registrations" element={<TaxRegistrationsService />} />
          {/* ROC / MCA Compliance Landing Page */}
          <Route path="/services/roc-mca-compliance" element={<BusinessEntityLawCompliances />} />

          {/* Business Compliances Sub-Service Routes */}
          <Route path="/services/tax-financial-compliances" element={<TaxFinancialCompliances />} />
          <Route path="/services/government-registrations-compliances" element={<GovernmentRegistrationsCompliances />} />
          <Route path="/services/audit-assurance" element={<AuditAssurance />} />


          {/* ===== 1. Business Registration ===== */}
          <Route path="/services/business-registrations" element={<BusinessRegistrations />} />
          <Route path="/services/business-registrations/proprietorship" element={<SoleProprietorship />} />
          <Route path="/services/business-registrations/huf" element={<HUFRegistration />} />
          <Route path="/services/business-registrations/partnership-firm" element={<PartnershipFirm />} />
          <Route path="/services/business-registrations/llp-registration" element={<LLPFormation />} />
          <Route path="/services/business-registrations/private-limited-company" element={<PrivateLimitedCompany />} />
          <Route path="/services/business-registrations/one-person-company" element={<OnePersonCompany />} />
          <Route path="/services/business-registrations/public-limited-company" element={<PublicLimitedCompany />} />
          <Route path="/services/business-registrations/section-8-company" element={<Section8Company />} />
          <Route path="/services/business-registrations/trust-registration" element={<TrustRegistration />} />
          <Route path="/services/business-registrations/society-registration" element={<SocietyRegistration />} />

          {/* ===== SUB-SERVICE PAGES - Tax Registrations ===== */}
          <Route path="/services/tax-registrations/gst-registration" element={<GSTRegistration />} />
          <Route path="/services/tax-registrations/pan-application" element={<PANApplication />} />
          <Route path="/services/tax-registrations/tan-application" element={<TANApplication />} />
          <Route path="/services/tax-registrations/professional-tax" element={<TaxRegistrations />} />
          <Route path="/services/tax-registrations/import-export-code" element={<TaxRegistrations />} />

          {/* ===== SUB-SERVICE PAGES - Business Compliances ===== */}
          <Route path="/services/business-compliances/book-keeping" element={<BookKeeping />} />
          <Route path="/services/business-compliances/book-supervision" element={<BookSupervision />} />
          <Route path="/services/business-compliances/change-directors-kmp" element={<ChangeInDirectors />} />
          <Route path="/services/business-compliances/change-registered-office" element={<RegisteredOfficeChange />} />
          <Route path="/services/business-compliances/annual-filing-company" element={<ROCAnnualFilings />} />
          <Route path="/services/business-compliances/din-dir3-kyc" element={<DirectorKYC />} />
          <Route path="/services/business-compliances/minutes-book" element={<MinutesBook />} />
          <Route path="/services/business-compliances/statutory-record" element={<StatutoryRecord />} />
          <Route path="/services/business-compliances/annual-filing-llp" element={<LLPAnnualFilings />} />

          {/* ===== SUB-SERVICE PAGES - Tax Compliances ===== */}
          <Route path="/services/tax-compliances/advance-tax-calculation" element={<AdvanceTax />} />
          <Route path="/services/tax-compliances/itr-filing" element={<ITRFiling />} />
          <Route path="/services/tax-compliances/tds-return-filing" element={<TDSReturn />} />
          <Route path="/services/tax-compliances/gst-return-filing" element={<GSTReturn />} />
          <Route path="/services/tax-compliances/gst-annual-return" element={<GSTAnnualReturn />} />

          {/* ===== SUB-SERVICE PAGES - Audit & Assurance ===== */}
          <Route path="/services/audit-assurance/statutory-audit" element={<StatutoryAudit />} />
          <Route path="/services/audit-assurance/tax-audit" element={<TaxAudit />} />
          <Route path="/services/audit-assurance/internal-audit" element={<InternalAudit />} />
          <Route path="/services/audit-assurance/gst-audit" element={<GSTAudit />} />

          {/* ===== SUB-SERVICE PAGES - Other Registrations ===== */}
          <Route path="/services/other-registrations/pf-esic" element={<PFESICRegistration />} />
          <Route path="/services/other-registrations/fssai" element={<FSSAIRegistration />} />
          <Route path="/services/other-registrations/iec" element={<IECRegistration />} />
          <Route path="/services/other-registrations/dsc" element={<DSCRegistration />} />
          <Route path="/services/other-registrations/msme" element={<MSMERegistration />} />
          <Route path="/services/other-registrations/trademark" element={<TrademarkRegistration />} />
          <Route path="/services/other-registrations/startup-india" element={<StartupIndiaRegistration />} />
          <Route path="/services/other-registrations/copyright" element={<CopyrightRegistration />} />
          <Route path="/services/other-registrations/trade-license" element={<TradeLicense />} />
          <Route path="/services/other-registrations/labour-registration" element={<LabourRegistration />} />
          <Route path="/services/other-registrations/drug-license" element={<DrugLicense />} />
          <Route path="/services/other-registrations/pollution-control" element={<PollutionControlLicense />} />
          <Route path="/services/government-registrations-compliances/iso-certification" element={<GovernmentRegistrations />} />

          {/* ===== BACKWARD COMPATIBILITY ROUTES ===== */}
          <Route path="/services/company-incorporation" element={<CompanyIncorporation />} />
          <Route path="/services/llp-formation" element={<LLPFormation />} />
          <Route path="/services/partnership-firm" element={<PartnershipFirm />} />
          <Route path="/services/tax-compliances" element={<TaxCompliances />} />
          <Route path="/services/government-registrations" element={<GovernmentRegistrations />} />
        </Routes>

      </main>
      {showNavigation && <Footer onNavigate={() => { }} />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <AdminProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AdminProvider>
      </AuthProvider>
    </Router>
  );
}




