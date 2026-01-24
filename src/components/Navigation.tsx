import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Menu, X, Phone, Mail, ChevronDown, ChevronRight,
  Building2, Receipt, Scale,
  Landmark, PieChart, Calculator
} from 'lucide-react';
import { cn } from './ui/utils';

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
  icon: React.ElementType;
  color: 'blue' | 'blue' | 'blue' | 'blue' | 'blue';
  subServices: SubService[];
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'business-registrations',
    title: 'Business Registrations',
    route: '/services/business-registrations',
    icon: Building2,
    color: 'blue',
    subServices: [
      { id: 'company-incorporation', name: 'Company Incorporation', route: '/services/business-registrations/company-incorporation' },
      { id: 'llp-formation', name: 'LLP Formation', route: '/services/business-registrations/llp-formation' },
      //   { id: 'partnership-firm', name: 'Partnership Firm', route: '/services/business-registrations/partnership-firm' },
      //   { id: 'sole-proprietorship', name: 'Sole Proprietorship', route: '/services/business-registrations/sole-proprietorship' },
      //   { id: 'one-person-company', name: 'One Person Company (OPC)', route: '/services/business-registrations/one-person-company' },
      //   { id: 'section-8-company', name: 'Section 8 Company (NGO)', route: '/services/business-registrations/section-8-company' },
    ]
  },
  {
    id: 'tax-registrations',
    title: 'Tax Registrations',
    route: '/services/tax-registrations',
    icon: Receipt,
    color: 'blue',
    subServices: [
      // { id: 'pan-registration', name: 'PAN Registration', route: '/services/tax-registrations/pan-registration' },
      // { id: 'tan-registration', name: 'TAN Registration', route: '/services/tax-registrations/tan-registration' },
      // { id: 'gst-registration', name: 'GST Registration', route: '/services/tax-registrations/gst-registration' },
      // { id: 'professional-tax', name: 'Professional Tax Registration', route: '/services/tax-registrations/professional-tax' },
      // { id: 'import-export-code', name: 'Import Export Code (IEC)', route: '/services/tax-registrations/import-export-code' },
    ]
  },
  {
    id: 'business-entity-law-compliances',
    title: 'Entity Law & Compliances',
    route: '/services/business-entity-law-compliances',
    icon: Scale,
    color: 'blue',
    subServices: [
      // { id: 'roc-annual-filings', name: 'ROC Annual Filings', route: '/services/business-entity-law-compliances/roc-annual-filings' },
      // { id: 'llp-annual-filings', name: 'LLP Annual Filings', route: '/services/business-entity-law-compliances/llp-annual-filings' },
      // { id: 'director-kyc', name: 'Director KYC (DIR-3 KYC)', route: '/services/business-entity-law-compliances/director-kyc' },
      // { id: 'board-meetings', name: 'Board Meetings & AGM', route: '/services/business-entity-law-compliances/board-meetings' },
      // { id: 'share-transfer', name: 'Share Transfer & Transmission', route: '/services/business-entity-law-compliances/share-transfer' },
      // { id: 'change-in-directors', name: 'Change in Directors/Partners', route: '/services/business-entity-law-compliances/change-in-directors' },
      // { id: 'registered-office-change', name: 'Registered Office Change', route: '/services/business-entity-law-compliances/registered-office-change' },
    ]
  },
  {
    id: 'tax-financial-compliances',
    title: 'Tax & Financial Audit',
    route: '/services/tax-financial-compliances',
    icon: PieChart,
    color: 'blue',
    subServices: [
      // { id: 'income-tax-return', name: 'Income Tax Return (ITR)', route: '/services/tax-financial-compliances/income-tax-return' },
      // { id: 'gst-return-filing', name: 'GST Return Filing', route: '/services/tax-financial-compliances/gst-return-filing' },
      // { id: 'tds-return-filing', name: 'TDS Return Filing', route: '/services/tax-financial-compliances/tds-return-filing' },
      // { id: 'tax-audit', name: 'Tax Audit (Form 3CA/3CD)', route: '/services/tax-financial-compliances/tax-audit' },
      // { id: 'transfer-pricing', name: 'Transfer Pricing', route: '/services/tax-financial-compliances/transfer-pricing' },
      // { id: 'advance-tax-payment', name: 'Advance Tax Payment', route: '/services/tax-financial-compliances/advance-tax-payment' },
      // { id: 'e-invoicing', name: 'E-Invoicing & E-Way Bill', route: '/services/tax-financial-compliances/e-invoicing' },
      // { id: 'labour-law-compliance', name: 'Labour Law (PF, ESI)', route: '/services/tax-financial-compliances/labour-law-compliance' },
    ]
  },
  {
    id: 'government-registrations-compliances',
    title: 'Govt & Special Regulatory',
    route: '/services/government-registrations-compliances',
    icon: Landmark,
    color: 'blue',
    subServices: [
      // { id: 'msme-udyam', name: 'MSME/Udyam Registration', route: '/services/government-registrations-compliances/msme-udyam' },
      // { id: 'trademark-registration', name: 'Trademark Registration', route: '/services/government-registrations-compliances/trademark-registration' },
      // { id: 'fssai-license', name: 'FSSAI License', route: '/services/government-registrations-compliances/fssai-license' },
      // { id: 'trade-license', name: 'Trade License', route: '/services/government-registrations-compliances/trade-license' },
      // { id: 'shops-establishment', name: 'Shops & Establishment', route: '/services/government-registrations-compliances/shops-establishment' },
      // { id: 'epfo-esic-returns', name: 'EPFO/ESIC Returns', route: '/services/government-registrations-compliances/epfo-esic-returns' },
      // { id: 'fcra-registration', name: 'FCRA Registration', route: '/services/government-registrations-compliances/fcra-registration' },
      // { id: 'csr-filing', name: 'CSR-1 Filing', route: '/services/government-registrations-compliances/csr-filing' },
      // { id: 'iso-certification', name: 'ISO Certification Support', route: '/services/government-registrations-compliances/iso-certification' },
    ]
  },
];

const NAV_ITEMS = [
  { id: 'home', label: 'Home', route: '/' },
  { id: 'about', label: 'About Us', route: '/#' },
  { id: 'services', label: 'Services', hasSubmenu: true, route: '#' },
  { id: 'industries', label: 'Industries', route: '#' },
  { id: 'resources', label: 'Blogs', route: '/resources' },
  { id: 'contact', label: 'Contact Us', route: '/contact' },
];

const COLOR_STYLES = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    activeBg: 'bg-blue-50',
    activeText: 'text-blue-700',
    iconBg: 'bg-blue-100',
    iconText: 'text-blue-600',
    hoverText: 'hover:text-blue-700',
    bulletGroupHover: 'group-hover/sub:bg-blue-600',
    border: 'border-blue-100',
    hover: 'hover:bg-blue-100',
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-900',
    activeBg: 'bg-green-50',
    activeText: 'text-green-700',
    iconBg: 'bg-green-100',
    iconText: 'text-green-600',
    hoverText: 'hover:text-green-700',
    bulletGroupHover: 'group-hover/sub:bg-green-600',
    border: 'border-green-100',
    hover: 'hover:bg-green-100',
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-900',
    activeBg: 'bg-purple-50',
    activeText: 'text-purple-700',
    iconBg: 'bg-purple-100',
    iconText: 'text-purple-600',
    hoverText: 'hover:text-purple-700',
    bulletGroupHover: 'group-hover/sub:bg-purple-600',
    border: 'border-purple-100',
    hover: 'hover:bg-purple-100',
  },
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-900',
    activeBg: 'bg-orange-50',
    activeText: 'text-orange-700',
    iconBg: 'bg-orange-100',
    iconText: 'text-orange-600',
    hoverText: 'hover:text-orange-700',
    bulletGroupHover: 'group-hover/sub:bg-orange-600',
    border: 'border-orange-100',
    hover: 'hover:bg-orange-100',
  },
  teal: {
    bg: 'bg-teal-50',
    text: 'text-teal-900',
    activeBg: 'bg-teal-50',
    activeText: 'text-teal-700',
    iconBg: 'bg-teal-100',
    iconText: 'text-teal-600',
    hoverText: 'hover:text-teal-700',
    bulletGroupHover: 'group-hover/sub:bg-teal-600',
    border: 'border-teal-100',
    hover: 'hover:bg-teal-100',
  },
};

export default function Navigation({ currentPage = '', onNavigate = () => { } }: NavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(SERVICE_CATEGORIES[0].id);
  const [isServicesHovered, setIsServicesHovered] = useState(false);

  const handleNavClick = (route: string, id: string) => {
    navigate(route);
    if (onNavigate) onNavigate(id);
    setMobileMenuOpen(false);
    setActiveCategory(SERVICE_CATEGORIES[0].id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPath = location.pathname;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary text-white py-2">
        <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm gap-2 sm:gap-0">
            <div className="flex items-center gap-4">
              <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                <span> +91  9811105573</span>
              </a>
              <a href="mailto:info@caavinash.in" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@caavinash.in</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              <span>ICAI Registered | 10+ Years Experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
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
            {NAV_ITEMS.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => item.hasSubmenu && setIsServicesHovered(true)}
                onMouseLeave={() => item.hasSubmenu && setIsServicesHovered(false)}
              >
                <button
                  onClick={() => {
                    if (item.route) handleNavClick(item.route, item.id);
                  }}
                  className={cn(
                    "text-sm font-medium transition-colors relative flex items-center gap-1.5 py-2",
                    currentPage === item.id
                      ? 'text-primary'
                      : 'text-neutral-700 hover:text-primary'
                  )}
                >
                  {item.label}
                  {item.hasSubmenu && <ChevronDown className={cn("w-5 h-5 opacity-70 transition-transform duration-200", isServicesHovered && 'rotate-180')} />}
                  <span className={cn(
                    "absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left transition-transform",
                    currentPage === item.id ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                  )} />
                </button>

                {/* Services Dropdown */}
                {item.hasSubmenu && isServicesHovered && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 pointer-events-auto transition-all duration-200">
                    <div className="bg-white shadow-2xl border border-neutral-100 rounded-2xl overflow-hidden w-[98vw] max-w-full flex">

                      {/* Sidebar - Service Categories */}
                      <div className="w-72 bg-white border-r border-neutral-100 py-3 max-h-[600px] overflow-y-auto shrink-0">
                        {SERVICE_CATEGORIES.map((category) => {
                          const Icon = category.icon;
                          const styles = COLOR_STYLES[category.color] || COLOR_STYLES.blue;
                          return (
                            <button
                              key={category.id}
                              onMouseEnter={() => setActiveCategory(category.id)}
                              onClick={() => handleNavClick(category.route, category.id)}
                              className={cn(
                                "w-full text-left px-6 py-4 transition-all text-sm font-bold border-l-4 flex items-center gap-4",
                                activeCategory === category.id
                                  ? cn("bg-neutral-50", styles.activeText, styles.border, "border-l-4")
                                  : "text-neutral-500 hover:bg-neutral-50 border-transparent hover:text-neutral-700"
                              )}
                            >
                              <Icon className={cn("w-6 h-6 shrink-0", activeCategory === category.id ? "opacity-100" : "opacity-70")} />
                              <span>{category.title}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Content Area - Service Details */}
                      <div className="flex-1 p-8 bg-neutral-50/[0.3] max-h-[600px] overflow-y-auto">
                        {activeCategory && (() => {
                          const category = SERVICE_CATEGORIES.find(c => c.id === activeCategory);
                          if (!category) return null;
                          const Icon = category.icon;
                          const styles = COLOR_STYLES[category.color] || COLOR_STYLES.blue;

                          return (
                            <div className="animate-in fade-in duration-200 h-full flex flex-col">


                              {/* Services Row (Horizontal) */}
                              <div className="flex flex-row flex-nowrap gap-4 mt-6 w-full overflow-x-auto pb-3">
                                {category.subServices.map((sub, index) => (
                                  <Link
                                    key={sub.id}
                                    to={sub.route}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                      "group flex flex-row items-center justify-between p-3.5 px-5 rounded-lg bg-white border border-neutral-100 shadow-sm",
                                      "hover:shadow-md hover:border-neutral-200 transition-all duration-200",
                                      "relative overflow-hidden w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.33%-0.75rem)]"
                                    )}
                                  >
                                    <div className={cn(
                                      "absolute left-0 top-0 bottom-0 w-1 transition-transform duration-200 origin-left scale-y-0 group-hover:scale-y-100",
                                      // We can dynamically assign a background color based on the category color loop
                                      category.color === 'blue' && 'bg-blue-600',
                                      category.color === 'blue' && 'bg-blue-600',
                                      category.color === 'blue' && 'bg-blue-600',
                                      category.color === 'blue' && 'bg-blue-600',
                                      category.color === 'blue' && 'bg-blue-600'
                                    )} />

                                    <span className="font-bold text-sm text-neutral-700 group-hover:text-neutral-900 z-10 leading-snug text-left line-clamp-2 pr-2">{sub.name}</span>
                                    <div className={cn(
                                      "w-7 h-7 rounded-full flex items-center justify-center transition-colors shrink-0",
                                      styles.bg, // using the light bg for the circle
                                      "group-hover:bg-white"
                                    )}>
                                      <ChevronRight className={cn(
                                        "w-4 h-4 transition-all duration-200 transform",
                                        styles.iconText, // using the colored icon
                                        "group-hover:translate-x-0.5"
                                      )} />
                                    </div>
                                  </Link>
                                ))}
                              </div>

                              <div className="mt-auto pt-8 flex justify-end">
                                <Link
                                  to={category.route}
                                  className={cn(
                                    "flex items-center gap-2 text-sm font-bold uppercase tracking-wider py-2 px-4 rounded-lg transition-colors",
                                    styles.iconText, styles.iconBg
                                  )}
                                >
                                  Client Guide <ChevronRight className="w-4 h-4" />
                                </Link>
                              </div>
                            </div>
                          );
                        })()}
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
            {NAV_ITEMS.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (item.hasSubmenu) {
                      setServicesOpen(!servicesOpen);
                    } else if (item.route) {
                      handleNavClick(item.route, item.id);
                    }
                  }}
                  className={cn(
                    "block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-between",
                    currentPage === item.id
                      ? 'bg-primary text-white'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  )}
                >
                  {item.label}
                  {item.hasSubmenu && (
                    <ChevronDown className={cn("w-4 h-4 transition-transform", servicesOpen ? 'rotate-180' : '')} />
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
                    {SERVICE_CATEGORIES.map((category) => {
                      const styles = COLOR_STYLES[category.color] || COLOR_STYLES.blue;
                      const CategoryIcon = category.icon;

                      return (
                        <div key={category.id} className={cn("rounded-lg overflow-hidden border-2", styles.border)}>
                          <button
                            onClick={() => handleNavClick(category.route, category.id)}
                            className={cn("w-full text-left px-4 py-3 font-bold text-xs uppercase flex items-center gap-2", styles.bg, styles.text)}
                          >
                            <CategoryIcon className="w-5 h-5" />
                            <span className="flex-1">{category.title}</span>
                            <span className="text-[10px] opacity-70">{category.subServices.length}</span>
                          </button>
                          <div className="bg-white p-2 space-y-1">
                            {category.subServices.map((service) => (
                              <button
                                key={service.id}
                                onClick={() => handleNavClick(service.route, service.id)}
                                className={cn("w-full text-left px-3 py-2 rounded text-xs text-neutral-600 transition-colors flex items-start gap-2", styles.hover)}
                              >
                                <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5", styles.text.replace('text-', 'bg-'))}></span>
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