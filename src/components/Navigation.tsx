import { Menu, X, Phone, Mail, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

interface SubService {
  id: string;
  name: string;
  route: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  route: string;
  subServices: SubService[];
  color: string;
  icon: string;
}

export default function Navigation({ currentPage = '', onNavigate = () => { } }: NavigationProps) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // 5 Main Service Categories
  const serviceCategories: ServiceCategory[] = [
    {
      id: 'business-registrations',
      title: 'Business Registrations',
      route: '/services/business-registrations',
      color: 'blue',
      icon: '🏢',
      subServices: [
        { id: 'company-incorporation', name: 'Company Incorporation', route: '/services/business-registrations/company-incorporation' },
        { id: 'llp-formation', name: 'LLP Formation', route: '/services/business-registrations/llp-formation' },
        { id: 'partnership-firm', name: 'Partnership Firm', route: '/services/business-registrations/partnership-firm' },
        { id: 'sole-proprietorship', name: 'Sole Proprietorship', route: '/services/business-registrations/sole-proprietorship' },
        { id: 'one-person-company', name: 'One Person Company (OPC)', route: '/services/business-registrations/one-person-company' },
        { id: 'section-8-company', name: 'Section 8 Company (NGO)', route: '/services/business-registrations/section-8-company' },
      ]
    },
    {
      id: 'tax-registrations',
      title: 'Tax Registrations',
      route: '/services/tax-registrations',
      color: 'green',
      icon: '📋',
      subServices: [
        { id: 'pan-registration', name: 'PAN Registration', route: '/services/tax-registrations/pan-registration' },
        { id: 'tan-registration', name: 'TAN Registration', route: '/services/tax-registrations/tan-registration' },
        { id: 'gst-registration', name: 'GST Registration', route: '/services/tax-registrations/gst-registration' },
        { id: 'professional-tax', name: 'Professional Tax Registration', route: '/services/tax-registrations/professional-tax' },
        { id: 'import-export-code', name: 'Import Export Code (IEC)', route: '/services/tax-registrations/import-export-code' },
      ]
    },
    {
      id: 'business-entity-law-compliances',
      title: 'Business Entity Law & Operational Compliances',
      route: '/services/business-entity-law-compliances',
      color: 'purple',
      icon: '⚖️',
      subServices: [
        { id: 'roc-annual-filings', name: 'ROC Annual Filings (AOC-4, MGT-7)', route: '/services/business-entity-law-compliances/roc-annual-filings' },
        { id: 'llp-annual-filings', name: 'LLP Annual Filings (Form 8 & 11)', route: '/services/business-entity-law-compliances/llp-annual-filings' },
        { id: 'director-kyc', name: 'Director KYC (DIR-3 KYC)', route: '/services/business-entity-law-compliances/director-kyc' },
        { id: 'board-meetings', name: 'Board Meetings & AGM', route: '/services/business-entity-law-compliances/board-meetings' },
        { id: 'share-transfer', name: 'Share Transfer & Transmission', route: '/services/business-entity-law-compliances/share-transfer' },
        { id: 'change-in-directors', name: 'Change in Directors/Partners', route: '/services/business-entity-law-compliances/change-in-directors' },
        { id: 'registered-office-change', name: 'Registered Office Change', route: '/services/business-entity-law-compliances/registered-office-change' },
      ]
    },
    {
      id: 'tax-financial-compliances',
      title: 'Tax & Financial Compliances',
      route: '/services/tax-financial-compliances',
      color: 'orange',
      icon: '💰',
      subServices: [
        { id: 'income-tax-return', name: 'Income Tax Return Filing (ITR)', route: '/services/tax-financial-compliances/income-tax-return' },
        { id: 'gst-return-filing', name: 'GST Return Filing', route: '/services/tax-financial-compliances/gst-return-filing' },
        { id: 'tds-return-filing', name: 'TDS Return Filing (24Q, 26Q, 27Q)', route: '/services/tax-financial-compliances/tds-return-filing' },
        { id: 'tax-audit', name: 'Tax Audit (Form 3CA/3CB, 3CD)', route: '/services/tax-financial-compliances/tax-audit' },
        { id: 'transfer-pricing', name: 'Transfer Pricing Documentation', route: '/services/tax-financial-compliances/transfer-pricing' },
        { id: 'advance-tax-payment', name: 'Advance Tax Payment', route: '/services/tax-financial-compliances/advance-tax-payment' },
        { id: 'e-invoicing', name: 'E-Invoicing & E-Way Bill', route: '/services/tax-financial-compliances/e-invoicing' },
        { id: 'labour-law-compliance', name: 'Labour Law Compliance (PF, ESI)', route: '/services/tax-financial-compliances/labour-law-compliance' },
      ]
    },
    {
      id: 'government-registrations-compliances',
      title: 'Government Registrations & Special Regulatory Compliances',
      route: '/services/government-registrations-compliances',
      color: 'teal',
      icon: '🏛️',
      subServices: [
        { id: 'msme-udyam', name: 'MSME/Udyam Registration', route: '/services/government-registrations-compliances/msme-udyam' },
        { id: 'trademark-registration', name: 'Trademark Registration', route: '/services/government-registrations-compliances/trademark-registration' },
        { id: 'fssai-license', name: 'FSSAI License', route: '/services/government-registrations-compliances/fssai-license' },
        { id: 'trade-license', name: 'Trade License', route: '/services/government-registrations-compliances/trade-license' },
        { id: 'shops-establishment', name: 'Shops & Establishment License', route: '/services/government-registrations-compliances/shops-establishment' },
        { id: 'epfo-esic-returns', name: 'EPFO/ESIC Returns', route: '/services/government-registrations-compliances/epfo-esic-returns' },
        { id: 'fcra-registration', name: 'FCRA Registration (NGO)', route: '/services/government-registrations-compliances/fcra-registration' },
        { id: 'darpan-registration', name: 'DARPAN ID Registration', route: '/services/government-registrations-compliances/darpan-registration' },
        { id: 'csr-filing', name: 'CSR-1 Filing', route: '/services/government-registrations-compliances/csr-filing' },
        { id: 'iso-certification', name: 'ISO Certification Support', route: '/services/government-registrations-compliances/iso-certification' },
      ]
    },
  ];

  const navItems = [
    { id: 'home', label: 'Home', route: '/' },
    { id: 'about', label: 'About Us', route: '/about' },
    { id: 'services', label: 'Services', hasSubmenu: true, route: '/services' },
    { id: 'industries', label: 'Industries', route: '/industries' },
    { id: 'resources', label: 'Resources', route: '/resources' },
    { id: 'contact', label: 'Contact Us', route: '/contact' },
  ];

  const handleNavClick = (route: string, pageId?: string) => {
    navigate(route);
    if (pageId) onNavigate(pageId);
    setMobileMenuOpen(false);
    setActiveCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryColors = (color: string) => {
    const colors: Record<string, { bg: string; text: string; hover: string; border: string }> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-900', hover: 'hover:bg-blue-100', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', text: 'text-green-900', hover: 'hover:bg-green-100', border: 'border-green-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-900', hover: 'hover:bg-purple-100', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-900', hover: 'hover:bg-orange-100', border: 'border-orange-200' },
      teal: { bg: 'bg-teal-50', text: 'text-teal-900', hover: 'hover:bg-teal-100', border: 'border-teal-200' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm gap-2 sm:gap-0">
            <div className="flex items-center gap-4">
              <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                <span> +91  9811105573</span>
              </a>
              <a href="mailto:info@cafirm.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@cafirm.com</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              <span>ICAI Registered | 10+ Years Experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
      {/*  <button
            onClick={() => handleNavClick('/', 'home')}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-accent text-xl font-bold font-display">CA</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-primary font-display">Avinash Payal & Co.</div>
              <div className="text-xs text-neutral-600">Chartered Accountants</div>
            </div>
          </button> */}

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section - CA Name First, Then Logo Image */}
          <button
            onClick={() => handleNavClick('/', 'home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold text-primary font-display leading-tight">Avinash Payal & Co.</div>
              <div className="text-lg font-bold text-primary font-display leading-tight">Chartered Accountants</div>
            </div>
            <img
              src="/logo.png"
              alt="Company Logo"
              className="w-16 h-15 bg-transparent"
            />
          </button>


          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => {
                    if (item.route) handleNavClick(item.route, item.id);
                  }}
                  className={`text-sm font-medium transition-colors relative ${currentPage === item.id
                    ? 'text-primary'
                    : 'text-neutral-700 hover:text-primary'
                    }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left transition-transform ${currentPage === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                </button>

                {/* Services Dropdown */}
                {item.hasSubmenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[1000px] hidden group-hover:block z-50">
                    <div className="bg-white shadow-2xl border border-gray-200 rounded-xl overflow-hidden">

                      {/* Header */}
                      <button
                        onClick={() => handleNavClick('/services', 'services')}
                        className="w-full bg-primary px-6 py-4 text-white text-left hover:bg-primary/90 transition-colors"
                      >
                        <h3 className="text-lg font-bold">Our Services</h3>
                        <p className="text-xs text-white/80 mt-1">Comprehensive CA & Business Solutions</p>
                      </button>

                      {/* Two-Panel Layout */}
                      <div className="flex">

                        {/* Left Panel: Categories */}
                        <div className="w-80 bg-gray-50 border-r border-gray-200 p-4">
                          <div className="space-y-2">
                            {serviceCategories.map((category) => {
                              const colors = getCategoryColors(category.color);
                              return (
                                <div
                                  key={category.id}
                                  onMouseEnter={() => setActiveCategory(category.id)}
                                >
                                  <button
                                    onClick={() => handleNavClick(category.route, category.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${activeCategory === category.id
                                      ? `${colors.bg} ${colors.text} shadow-sm`
                                      : 'hover:bg-white text-neutral-700'
                                      }`}
                                  >
                                    <span className="text-2xl">{category.icon}</span>
                                    <div className="flex-1">
                                      <h4 className="text-sm font-bold leading-tight">{category.title}</h4>
                                      <p className="text-[10px] text-neutral-500 mt-0.5">{category.subServices.length} Services</p>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 transition-opacity ${activeCategory === category.id ? 'opacity-100' : 'opacity-0'}`} />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Right Panel: Sub-Services */}
                        <div className="flex-1 p-6 min-h-[400px]">
                          {activeCategory ? (
                            (() => {
                              const category = serviceCategories.find(cat => cat.id === activeCategory);
                              if (!category) return null;
                              const colors = getCategoryColors(category.color);

                              return (
                                <div>
                                  <div className="mb-6 pb-4 border-b-2 border-gray-200">
                                    <div className="flex items-center gap-3">
                                      <span className="text-3xl">{category.icon}</span>
                                      <div>
                                        <h3 className={`text-xl font-bold ${colors.text}`}>{category.title}</h3>
                                        <p className="text-sm text-neutral-500">{category.subServices.length} specialized services</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-3">
                                    {category.subServices.map((service) => (
                                      <button
                                        key={service.id}
                                        onClick={() => handleNavClick(service.route, service.id)}
                                        className={`text-left px-4 py-3 rounded-lg border-2 border-transparent transition-all ${colors.hover} hover:border-gray-300 hover:shadow-sm`}
                                      >
                                        <div className="flex items-start gap-2">
                                          <span className={`w-2 h-2 rounded-full mt-1.5 ${colors.text.replace('text-', 'bg-')}`}></span>
                                          <span className="text-sm font-medium text-neutral-700">{service.name}</span>
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              );
                            })()
                          ) : (
                            <div className="flex items-center justify-center h-full text-center">
                              <div>
                                <div className="text-6xl mb-4">👈</div>
                                <p className="text-neutral-500 text-sm font-medium">Hover over a category to view services</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                        <p className="text-xs text-neutral-600">Need help choosing the right service?</p>
                        <button
                          onClick={() => handleNavClick('/contact', 'contact')}
                          className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          Contact Us
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => handleNavClick('/contact', 'contact')}
            className="hidden lg:block px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
          >
            BOOK CONSULTATION
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (item.hasSubmenu) {
                      setServicesOpen(!servicesOpen);
                    } else if (item.route) {
                      handleNavClick(item.route, item.id);
                    }
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-between ${currentPage === item.id
                    ? 'bg-primary text-white'
                    : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                >
                  {item.label}
                  {item.hasSubmenu && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {/* Mobile Services Submenu */}
                {item.hasSubmenu && servicesOpen && (
                  <div className="mt-2 space-y-3 bg-neutral-50 rounded-lg p-3 ml-2 border-l-4 border-primary">
                    <button
                      onClick={() => handleNavClick('/services', 'services')}
                      className="w-full text-left px-4 py-3 rounded-lg font-bold text-sm text-primary hover:bg-white transition-colors flex items-center gap-2 border border-dashed border-primary/20"
                    >
                      <span className="text-lg">📑</span>
                      <span>View All Services</span>
                    </button>
                    {serviceCategories.map((category) => {
                      const colors = getCategoryColors(category.color);
                      return (
                        <div key={category.id} className={`rounded-lg overflow-hidden border-2 ${colors.border}`}>
                          <button
                            onClick={() => handleNavClick(category.route, category.id)}
                            className={`w-full text-left px-4 py-3 font-bold text-xs uppercase ${colors.bg} ${colors.text} flex items-center gap-2`}
                          >
                            <span className="text-lg">{category.icon}</span>
                            <span className="flex-1">{category.title}</span>
                            <span className="text-[10px] opacity-70">{category.subServices.length}</span>
                          </button>
                          <div className="bg-white p-2 space-y-1">
                            {category.subServices.map((service) => (
                              <button
                                key={service.id}
                                onClick={() => handleNavClick(service.route, service.id)}
                                className={`w-full text-left px-3 py-2 rounded text-xs text-neutral-600 ${colors.hover} transition-colors flex items-start gap-2`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${colors.text.replace('text-', 'bg-')}`}></span>
                                {service.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => handleNavClick('/contact', 'contact')}
              className="w-full px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors mt-4"
            >
              BOOK CONSULTATION
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ==================== PREVIOUS CODE (COMMENTED OUT) ====================

import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

interface SubService {
  id: string;
  name: string;
  route: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  route: string;
  subServices: SubService[];
  color: string;
  icon: string;
}

interface NavItem {
  id: string;
  label: string;
  route?: string;
  submenu?: ServiceCategory[];
}

export default function Navigation({ currentPage = '', onNavigate = () => {} }: NavigationProps) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // 5 Main Service Categories
  const serviceCategories: ServiceCategory[] = [
    {
      id: 'business-registrations',
      title: 'Business Registrations',
      route: '/services/business-registrations',
      color: 'blue',
      icon: '🏢',
      subServices: [
        { id: 'company-incorporation', name: 'Company Incorporation', route: '/services/business-registrations/company-incorporation' },
        { id: 'llp-formation', name: 'LLP Formation', route: '/services/business-registrations/llp-formation' },
        { id: 'partnership-firm', name: 'Partnership Firm', route: '/services/business-registrations/partnership-firm' },
        { id: 'sole-proprietorship', name: 'Sole Proprietorship', route: '/services/business-registrations/sole-proprietorship' },
        { id: 'one-person-company', name: 'One Person Company (OPC)', route: '/services/business-registrations/one-person-company' },
        { id: 'section-8-company', name: 'Section 8 Company (NGO)', route: '/services/business-registrations/section-8-company' },
      ]
    },
    {
      id: 'tax-registrations',
      title: 'Tax Registrations',
      route: '/services/tax-registrations',
      color: 'green',
      icon: '📋',
      subServices: [
        { id: 'pan-registration', name: 'PAN Registration', route: '/services/tax-registrations/pan-registration' },
        { id: 'tan-registration', name: 'TAN Registration', route: '/services/tax-registrations/tan-registration' },
        { id: 'gst-registration', name: 'GST Registration', route: '/services/tax-registrations/gst-registration' },
        { id: 'professional-tax', name: 'Professional Tax Registration', route: '/services/tax-registrations/professional-tax' },
        { id: 'import-export-code', name: 'Import Export Code (IEC)', route: '/services/tax-registrations/import-export-code' },
      ]
    },
    {
      id: 'business-entity-law-compliances',
      title: 'Business Entity Law & Operational Compliances',
      route: '/services/business-entity-law-compliances',
      color: 'purple',
      icon: '⚖️',
      subServices: [
        { id: 'roc-annual-filings', name: 'ROC Annual Filings (AOC-4, MGT-7)', route: '/services/business-entity-law-compliances/roc-annual-filings' },
        { id: 'llp-annual-filings', name: 'LLP Annual Filings (Form 8 & 11)', route: '/services/business-entity-law-compliances/llp-annual-filings' },
        { id: 'director-kyc', name: 'Director KYC (DIR-3 KYC)', route: '/services/business-entity-law-compliances/director-kyc' },
        { id: 'board-meetings', name: 'Board Meetings & AGM', route: '/services/business-entity-law-compliances/board-meetings' },
        { id: 'share-transfer', name: 'Share Transfer & Transmission', route: '/services/business-entity-law-compliances/share-transfer' },
        { id: 'change-in-directors', name: 'Change in Directors/Partners', route: '/services/business-entity-law-compliances/change-in-directors' },
        { id: 'registered-office-change', name: 'Registered Office Change', route: '/services/business-entity-law-compliances/registered-office-change' },
      ]
    },
    {
      id: 'tax-financial-compliances',
      title: 'Tax & Financial Compliances',
      route: '/services/tax-financial-compliances',
      color: 'orange',
      icon: '💰',
      subServices: [
        { id: 'income-tax-return', name: 'Income Tax Return Filing (ITR)', route: '/services/tax-financial-compliances/income-tax-return' },
        { id: 'gst-return-filing', name: 'GST Return Filing', route: '/services/tax-financial-compliances/gst-return-filing' },
        { id: 'tds-return-filing', name: 'TDS Return Filing (24Q, 26Q, 27Q)', route: '/services/tax-financial-compliances/tds-return-filing' },
        { id: 'tax-audit', name: 'Tax Audit (Form 3CA/3CB, 3CD)', route: '/services/tax-financial-compliances/tax-audit' },
        { id: 'transfer-pricing', name: 'Transfer Pricing Documentation', route: '/services/tax-financial-compliances/transfer-pricing' },
        { id: 'advance-tax-payment', name: 'Advance Tax Payment', route: '/services/tax-financial-compliances/advance-tax-payment' },
        { id: 'e-invoicing', name: 'E-Invoicing & E-Way Bill', route: '/services/tax-financial-compliances/e-invoicing' },
        { id: 'labour-law-compliance', name: 'Labour Law Compliance (PF, ESI)', route: '/services/tax-financial-compliances/labour-law-compliance' },
      ]
    },
    {
      id: 'government-registrations-compliances',
      title: 'Government Registrations & Special Regulatory Compliances',
      route: '/services/government-registrations-compliances',
      color: 'teal',
      icon: '🏛️',
      subServices: [
        { id: 'msme-udyam', name: 'MSME/Udyam Registration', route: '/services/government-registrations-compliances/msme-udyam' },
        { id: 'trademark-registration', name: 'Trademark Registration', route: '/services/government-registrations-compliances/trademark-registration' },
        { id: 'fssai-license', name: 'FSSAI License', route: '/services/government-registrations-compliances/fssai-license' },
        { id: 'trade-license', name: 'Trade License', route: '/services/government-registrations-compliances/trade-license' },
        { id: 'shops-establishment', name: 'Shops & Establishment License', route: '/services/government-registrations-compliances/shops-establishment' },
        { id: 'epfo-esic-returns', name: 'EPFO/ESIC Returns', route: '/services/government-registrations-compliances/epfo-esic-returns' },
        { id: 'fcra-registration', name: 'FCRA Registration (NGO)', route: '/services/government-registrations-compliances/fcra-registration' },
        { id: 'darpan-registration', name: 'DARPAN ID Registration', route: '/services/government-registrations-compliances/darpan-registration' },
        { id: 'csr-filing', name: 'CSR-1 Filing', route: '/services/government-registrations-compliances/csr-filing' },
        { id: 'iso-certification', name: 'ISO Certification Support', route: '/services/government-registrations-compliances/iso-certification' },
      ]
    },
  ];

  const navItems: NavItem[] = [
    { id: 'home', label: 'HOME', route: '/' },
    { id: 'services', label: 'SERVICES', submenu: serviceCategories },
    { id: 'about', label: 'ABOUT US', route: '/about' },
    { id: 'industries', label: 'INDUSTRIES', route: '/industries' },
    { id: 'resources', label: 'RESOURCES', route: '/resources' },
    { id: 'contact', label: 'CONTACT US', route: '/contact' },
  ];

  const handleNavClick = (route: string, pageId?: string) => {
    navigate(route);
    if (pageId) onNavigate(pageId);
    setMobileMenuOpen(false);
    setActiveCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryColors = (color: string) => {
    const colors: Record<string, { bg: string; text: string; hover: string; border: string }> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-900', hover: 'hover:bg-blue-100', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', text: 'text-green-900', hover: 'hover:bg-green-100', border: 'border-green-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-900', hover: 'hover:bg-purple-100', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-900', hover: 'hover:bg-orange-100', border: 'border-orange-200' },
      teal: { bg: 'bg-teal-50', text: 'text-teal-900', hover: 'hover:bg-teal-100', border: 'border-teal-200' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="font-sans">
      <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            <button 
              onClick={() => handleNavClick('/', 'home')}
              className="flex items-center gap-3 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-xl">CA</span>
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-blue-900 font-bold text-2xl tracking-tight">INDIA</span>
                <span className="text-[10px] text-gray-500 font-semibold tracking-widest">EST. 1995</span>
              </div>
            </button>

            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div 
                  key={item.id} 
                  className="relative group"
                >
                  <button
                    onClick={() => {
                      if (item.route) handleNavClick(item.route, item.id);
                    }}
                    className={`text-sm font-bold tracking-wide transition-colors py-2 relative ${
                      currentPage === item.id ? 'text-blue-900' : 'text-gray-600 hover:text-blue-900'
                    }`}
                  >
                    {item.label}
                    {currentPage === item.id && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-900 rounded-full"></span>
                    )}
                  </button>

                  {item.submenu && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[1000px] hidden group-hover:block">
                      <div className="bg-white shadow-2xl border border-gray-200 rounded-xl overflow-hidden">
                        
                        <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-4 text-white">
                          <h3 className="text-lg font-bold">Our Services</h3>
                          <p className="text-xs text-blue-100 mt-1">Comprehensive CA & Business Solutions</p>
                        </div>

                        <div className="flex">
                          
                          <div className="w-80 bg-gray-50 border-r border-gray-200 p-4">
                            <div className="space-y-2">
                              {item.submenu.map((category) => {
                                const colors = getCategoryColors(category.color);
                                return (
                                  <div
                                    key={category.id}
                                    onMouseEnter={() => setActiveCategory(category.id)}
                                  >
                                    <button
                                      onClick={() => handleNavClick(category.route, category.id)}
                                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                                        activeCategory === category.id
                                          ? `${colors.bg} ${colors.text} shadow-sm`
                                          : 'hover:bg-white text-gray-700'
                                      }`}
                                    >
                                      <span className="text-2xl">{category.icon}</span>
                                      <div className="flex-1">
                                        <h4 className="text-sm font-bold leading-tight">{category.title}</h4>
                                        <p className="text-[10px] text-gray-500 mt-0.5">{category.subServices.length} Services</p>
                                      </div>
                                      <ChevronRight className={`w-4 h-4 transition-opacity ${activeCategory === category.id ? 'opacity-100' : 'opacity-0'}`} />
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="flex-1 p-6 min-h-[400px]">
                            {activeCategory ? (
                              (() => {
                                const category = item.submenu.find(cat => cat.id === activeCategory);
                                if (!category) return null;
                                const colors = getCategoryColors(category.color);
                                
                                return (
                                  <div>
                                    <div className="mb-6 pb-4 border-b-2 border-gray-200">
                                      <div className="flex items-center gap-3">
                                        <span className="text-3xl">{category.icon}</span>
                                        <div>
                                          <h3 className={`text-xl font-bold ${colors.text}`}>{category.title}</h3>
                                          <p className="text-sm text-gray-500">{category.subServices.length} specialized services</p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                      {category.subServices.map((service) => (
                                        <button
                                          key={service.id}
                                          onClick={() => handleNavClick(service.route, service.id)}
                                          className={`text-left px-4 py-3 rounded-lg border-2 border-transparent transition-all ${colors.hover} hover:border-gray-300 hover:shadow-sm`}
                                        >
                                          <div className="flex items-start gap-2">
                                            <span className={`w-2 h-2 rounded-full mt-1.5 ${colors.text.replace('text-', 'bg-')}`}></span>
                                            <span className="text-sm font-medium text-gray-700">{service.name}</span>
                                          </div>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })()
                            ) : (
                              <div className="flex items-center justify-center h-full text-center">
                                <div>
                                  <div className="text-6xl mb-4">👈</div>
                                  <p className="text-gray-500 text-sm font-medium">Hover over a category to view services</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                          <p className="text-xs text-gray-600">Need help choosing the right service?</p>
                          <button 
                            onClick={() => handleNavClick('/contact', 'contact')}
                            className="px-4 py-2 bg-blue-900 text-white text-xs font-bold rounded-lg hover:bg-blue-800 transition-colors"
                          >
                            Contact Us
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden lg:block">
              <button 
                onClick={() => handleNavClick('/contact', 'contact')}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-900 to-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Enquire Now
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 fixed inset-0 top-[80px] z-40 overflow-y-auto">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (item.submenu) {
                      setServicesOpen(!servicesOpen);
                    } else if (item.route) {
                      handleNavClick(item.route, item.id);
                    }
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg font-bold text-sm uppercase tracking-wide flex items-center justify-between ${
                    currentPage === item.id ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                  {item.submenu && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  )}
                </button>
                
                {item.submenu && servicesOpen && (
                  <div className="mt-2 space-y-3 bg-gray-50 rounded-lg p-3 ml-2 border-l-4 border-blue-900">
                    {item.submenu.map((category) => {
                      const colors = getCategoryColors(category.color);
                      return (
                        <div key={category.id} className={`rounded-lg overflow-hidden border-2 ${colors.border}`}>
                          <button
                            onClick={() => handleNavClick(category.route, category.id)}
                            className={`w-full text-left px-4 py-3 font-bold text-xs uppercase ${colors.bg} ${colors.text} flex items-center gap-2`}
                          >
                            <span className="text-lg">{category.icon}</span>
                            <span className="flex-1">{category.title}</span>
                            <span className="text-[10px] opacity-70">{category.subServices.length}</span>
                          </button>
                          <div className="bg-white p-2 space-y-1">
                            {category.subServices.map((service) => (
                              <button
                                key={service.id}
                                onClick={() => handleNavClick(service.route, service.id)}
                                className={`w-full text-left px-3 py-2 rounded text-xs text-gray-600 ${colors.hover} transition-colors flex items-start gap-2`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${colors.text.replace('text-', 'bg-')}`}></span>
                                {service.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

==================== END OF PREVIOUS CODE ==================== */