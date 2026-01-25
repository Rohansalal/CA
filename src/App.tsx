import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminProtectedRoute } from './components/AdminProtectedRoute';

// Auth Pages
import { Login } from './components/pages/Login';
import { Register } from './components/pages/Register';
import { Dashboard } from './components/pages/Dashboard';

// Admin Pages
import { AdminLogin } from './components/pages/AdminLogin';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { AdminUsers } from './components/pages/AdminUsers';

// Home Pages
import { Home } from './components/Home';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import { Industries } from './components/Industries';
import { Resources } from './components/Resources';
import { ContactUs } from './components/ContactUs';

// Main Category Pages
import { BusinessRegistrations } from './components/services/BusinessRegistrations';
import { TaxRegistrationsService } from './components/services/TaxRegistrationsService';
import { BusinessEntityLawCompliances } from './components/services/BusinessEntityLawCompliances';
import { TaxFinancialCompliances } from './components/services/TaxFinancialCompliances';
import { GovernmentRegistrationsCompliances } from './components/services/GovernmentRegistrationsCompliances';

// Existing Sub-Service Pages (we'll keep these for backward compatibility)
import { CompanyIncorporation } from './components/services/CompanyIncorporation';
import { LLPFormation } from './components/services/LLPFormation';
import { PartnershipFirm } from './components/services/PartnershipFirm';
import { TaxRegistrations } from './components/services/TaxRegistrations';
import { TaxCompliances } from './components/services/TaxCompliances';
import { GovernmentRegistrations } from './components/services/GovernmentRegistrations';

import Navigation from './components/Navigation';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

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
    <div className="min-h-screen bg-neutral-50">
      {showNavigation && <Navigation currentPage={currentPage} onNavigate={() => { }} />}
      <main>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
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

          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<ContactUs />} />


          {/* ===== 5 MAIN SERVICE CATEGORY PAGES ===== */}
          <Route path="/services/business-registrations" element={<BusinessRegistrations />} />
          <Route path="/services/tax-registrations" element={<TaxRegistrationsService />} />
          <Route path="/services/business-entity-law-compliances" element={<BusinessEntityLawCompliances />} />
          <Route path="/services/tax-financial-compliances" element={<TaxFinancialCompliances />} />
          <Route path="/services/government-registrations-compliances" element={<GovernmentRegistrationsCompliances />} />

          {/* ===== SUB-SERVICE PAGES - Business Registrations ===== */}
          <Route path="/services/business-registrations/company-incorporation" element={<CompanyIncorporation />} />
          <Route path="/services/business-registrations/llp-formation" element={<LLPFormation />} />
          <Route path="/services/business-registrations/partnership-firm" element={<PartnershipFirm />} />
          <Route path="/services/business-registrations/sole-proprietorship" element={<CompanyIncorporation />} />
          <Route path="/services/business-registrations/one-person-company" element={<CompanyIncorporation />} />
          <Route path="/services/business-registrations/section-8-company" element={<CompanyIncorporation />} />

          {/* ===== SUB-SERVICE PAGES - Tax Registrations ===== */}
          <Route path="/services/tax-registrations/pan-registration" element={<TaxRegistrations />} />
          <Route path="/services/tax-registrations/tan-registration" element={<TaxRegistrations />} />
          <Route path="/services/tax-registrations/gst-registration" element={<TaxRegistrations />} />
          <Route path="/services/tax-registrations/professional-tax" element={<TaxRegistrations />} />
          <Route path="/services/tax-registrations/import-export-code" element={<TaxRegistrations />} />

          {/* ===== SUB-SERVICE PAGES - Business Entity Law & Operational Compliances ===== */}
          <Route path="/services/business-entity-law-compliances/roc-annual-filings" element={<TaxCompliances />} />
          <Route path="/services/business-entity-law-compliances/llp-annual-filings" element={<LLPFormation />} />
          <Route path="/services/business-entity-law-compliances/director-kyc" element={<TaxCompliances />} />
          <Route path="/services/business-entity-law-compliances/board-meetings" element={<TaxCompliances />} />
          <Route path="/services/business-entity-law-compliances/share-transfer" element={<TaxCompliances />} />
          <Route path="/services/business-entity-law-compliances/change-in-directors" element={<TaxCompliances />} />
          <Route path="/services/business-entity-law-compliances/registered-office-change" element={<TaxCompliances />} />

          {/* ===== SUB-SERVICE PAGES - Tax & Financial Compliances ===== */}
          <Route path="/services/tax-financial-compliances/income-tax-return" element={<TaxCompliances />} />
          <Route path="/services/tax-financial-compliances/gst-return-filing" element={<TaxCompliances />} />
          <Route path="/services/tax-financial-compliances/tds-return-filing" element={<TaxCompliances />} />
          <Route path="/services/tax-financial-compliances/tax-audit" element={<TaxCompliances />} />
          <Route path="/services/tax-financial-compliances/transfer-pricing" element={<TaxCompliances />} />
          <Route path="/services/tax-financial-compliances/advance-tax-payment" element={<TaxCompliances />} />
          <Route path="/services/tax-financial-compliances/e-invoicing" element={<TaxCompliances />} />
          <Route path="/services/tax-financial-compliances/labour-law-compliance" element={<TaxCompliances />} />

          {/* ===== SUB-SERVICE PAGES - Government Registrations & Special Regulatory Compliances ===== */}
          <Route path="/services/government-registrations-compliances/msme-udyam" element={<GovernmentRegistrations />} />
          <Route path="/services/government-registrations-compliances/trademark-registration" element={<GovernmentRegistrations />} />
          <Route path="/services/government-registrations-compliances/fssai-license" element={<GovernmentRegistrations />} />
          <Route path="/services/government-registrations-compliances/trade-license" element={<GovernmentRegistrations />} />
          <Route path="/services/government-registrations-compliances/shops-establishment" element={<GovernmentRegistrations />} />
          <Route path="/services/government-registrations-compliances/epfo-esic-returns" element={<GovernmentRegistrations />} />
          <Route path="/services/government-registrations-compliances/fcra-registration" element={<GovernmentRegistrations />} />
          <Route path="/services/government-registrations-compliances/darpan-registration" element={<GovernmentRegistrations />} />
          <Route path="/services/government-registrations-compliances/csr-filing" element={<GovernmentRegistrations />} />
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
          <AppContent />
        </AdminProvider>
      </AuthProvider>
    </Router>
  );
}
