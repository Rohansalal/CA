import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Menu, X, Phone, Mail, ChevronDown, ChevronRight, ArrowRight,
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
    title: 'Business Registration',
    route: '/services/business-registrations',
    icon: Building2,
    color: 'blue',
    subServices: [
      { id: 'proprietorship-registration', name: 'Proprietorship Registration', route: '/services/business-registrations/proprietorship' },
      { id: 'huf-registration', name: 'HUF Registration', route: '/services/business-registrations/huf' },
      { id: 'partnership-firm', name: 'Partnership Firm', route: '/services/business-registrations/partnership-firm' },
      { id: 'llp-registration', name: 'LLP Registration', route: '/services/business-registrations/llp-registration' },
      { id: 'private-limited-company', name: 'Private Limited Company', route: '/services/business-registrations/private-limited-company' },
      { id: 'one-person-company', name: 'One Person Company – OPC', route: '/services/business-registrations/one-person-company' },
      { id: 'public-limited-company', name: 'Public Limited Company', route: '/services/business-registrations/public-limited-company' },
      { id: 'section-8-company', name: 'Section 8 Company', route: '/services/business-registrations/section-8-company' },
      { id: 'trust-registration', name: 'Trust Registration', route: '/services/business-registrations/trust-registration' },
      { id: 'society-registration', name: 'Society Registration', route: '/services/business-registrations/society-registration' },
    ]
  },
  {
    id: 'tax-registrations',
    title: 'Tax Registration',
    route: '/services/tax-registrations',
    icon: Receipt,
    color: 'blue',
    subServices: [
      { id: 'gst-registration', name: 'GST Registration', route: '/services/tax-registrations/gst-registration' },
      { id: 'pan-application', name: 'PAN Application', route: '/services/tax-registrations/pan-application' },
      { id: 'tan-application', name: 'TAN Application', route: '/services/tax-registrations/tan-application' },
    ]
  },
  {
    id: 'business-compliances',
    title: 'Business Compliances',
    route: '/services/business-entity-law-compliances',
    icon: Scale,
    color: 'blue',
    subServices: [
      { id: 'book-keeping', name: 'Book Keeping', route: '/services/business-compliances/book-keeping' },
      { id: 'book-supervision', name: 'Book Supervision', route: '/services/business-compliances/book-supervision' },
      { id: 'change-directors-kmp', name: 'Change in directors/KMP', route: '/services/business-compliances/change-directors-kmp' },
      { id: 'change-registered-office', name: 'Change in Registered office', route: '/services/business-compliances/change-registered-office' },
      { id: 'annual-filing-company', name: 'Annual filling-Company', route: '/services/business-compliances/annual-filing-company' },
      { id: 'din-dir3-kyc', name: 'DIN / DIR3-KYC', route: '/services/business-compliances/din-dir3-kyc' },
      { id: 'minutes-book', name: 'Minutes Book', route: '/services/business-compliances/minutes-book' },
      { id: 'statutory-record', name: 'Statutory record', route: '/services/business-compliances/statutory-record' },
      { id: 'annual-filing-llp', name: 'Annual filling-LLP', route: '/services/business-compliances/annual-filing-llp' },
    ]
  },
  {
    id: 'tax-compliances',
    title: 'Tax Compliances',
    route: '/services/tax-financial-compliances',
    icon: Calculator,
    color: 'blue',
    subServices: [
      { id: 'advance-tax-calculation', name: 'Advance Tax Calculation', route: '/services/tax-compliances/advance-tax-calculation' },
      { id: 'itr-filing', name: 'ITR Filing', route: '/services/tax-compliances/itr-filing' },
      { id: 'tds-return-filing', name: 'TDS Return Filing', route: '/services/tax-compliances/tds-return-filing' },
      { id: 'gst-return-filing', name: 'GST Return Filing', route: '/services/tax-compliances/gst-return-filing' },
      { id: 'gst-annual-return', name: 'GST Annual Return', route: '/services/tax-compliances/gst-annual-return' },
    ]
  },
  {
    id: 'audit-assurance',
    title: 'Audit & Assurance',
    route: '/services/audit-assurance',
    icon: PieChart,
    color: 'blue',
    subServices: [
      { id: 'statutory-audit', name: 'Statutory Audit', route: '/services/audit-assurance/statutory-audit' },
      { id: 'tax-audit', name: 'Tax Audit', route: '/services/audit-assurance/tax-audit' },
      { id: 'gst-audit', name: 'GST Audit', route: '/services/audit-assurance/gst-audit' },
      { id: 'internal-audit', name: 'Internal Audit', route: '/services/audit-assurance/internal-audit' },
    ]
  },
  {
    id: 'other-registrations',
    title: 'Other Registrations',
    route: '/services/government-registrations-compliances',
    icon: Landmark,
    color: 'blue',
    subServices: [
      { id: 'fssai-registration', name: 'FSSAI Registration', route: '/services/other-registrations/fssai' },
      { id: 'import-export-code', name: 'Import Export Code (IEC)', route: '/services/other-registrations/iec' },
      { id: 'msme-registration', name: 'MSME Registration', route: '/services/other-registrations/msme' },
      { id: 'dsc', name: 'Digital Signature (DSC)', route: '/services/other-registrations/dsc' },
      { id: 'pf-esic-registration', name: 'PF & ESIC Registration', route: '/services/other-registrations/pf-esic' },
      { id: 'trademark-registration', name: 'Trademark Registration', route: '/services/other-registrations/trademark' },
      { id: 'copyright-registration', name: 'Copyright Registration', route: '/services/other-registrations/copyright' },
      { id: 'startup-india', name: 'Startup India', route: '/services/other-registrations/startup-india' },
      { id: 'trade-license', name: 'Trade License', route: '/services/other-registrations/trade-license' },
      { id: 'labour-registration', name: 'Shop & Establishment', route: '/services/other-registrations/labour-registration' },
      { id: 'drug-license', name: 'Drug License', route: '/services/other-registrations/drug-license' },
      { id: 'pollution-control', name: 'Pollution Control (NOC)', route: '/services/other-registrations/pollution-control' },
    ]
  },
];

const NAV_ITEMS = [
  { id: 'home', label: 'Home', route: '/' },
  { id: 'about', label: 'About Us', route: '/about' },
  { id: 'services', label: 'Services', hasSubmenu: true, route: '#' },
  { id: 'industries', label: 'Industries', route: '/industries' },
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
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsServicesHovered(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close on Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isServicesHovered) setIsServicesHovered(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isServicesHovered]);

  const handleMouseEnter = (hasSubmenu: boolean) => {
    if (!hasSubmenu) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsServicesHovered(true);
  };

  const handleMouseLeave = (hasSubmenu: boolean) => {
    if (!hasSubmenu) return;
    hoverTimeoutRef.current = setTimeout(() => {
      setIsServicesHovered(false);
      setActiveCategory(SERVICE_CATEGORIES[0].id); // Reset to first category on close
    }, 200);
  };

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
            <img
              src="/logo.png"
              alt="Company Logo"
              className="w-16 h-15 bg-transparent"
            />
            <div className="flex flex-col items-center">
              <div className="text-xl font-bold text-primary font-display leading-tight">Avinash Payal & Associates</div>
              <div className="text-lg  font-semibold text-primary font-display leading-tight">Chartered Accountants</div>
            </div>

          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.id}
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter(!!item.hasSubmenu)}
                onMouseLeave={() => handleMouseLeave(!!item.hasSubmenu)}
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

                {/* Services Dropdown removed from here */}
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

      {/* Services Dropdown - Desktop */}
      {isServicesHovered && (
        <div
          className="absolute top-full left-0 w-full z-50 flex justify-center pointer-events-auto"
          onMouseEnter={() => handleMouseEnter(true)}
          onMouseLeave={() => handleMouseLeave(true)}
        >
          {/* Invisible bridge to prevent closing when moving from nav to menu */}
          <div className="absolute top-[-20px] left-0 w-full h-[20px]" />

          <div className="bg-white shadow-2xl shadow-blue-900/10 border border-neutral-100 rounded-b-2xl overflow-hidden w-[95vw] max-w-[1400px] flex max-h-[75vh]">
            {/* Sidebar - Service Categories */}
            <div className="w-80 bg-neutral-50/50 border-r border-neutral-100 py-6 px-4 shrink-0 flex flex-col gap-2 overflow-y-auto">
              {SERVICE_CATEGORIES.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onMouseEnter={() => setActiveCategory(category.id)}
                    onClick={() => handleNavClick(category.route, category.id)}
                    className={cn(
                      "w-full text-left px-5 py-4 transition-all text-[15px] font-semibold rounded-xl flex items-center gap-4 relative",
                      isActive
                        ? "bg-white text-primary shadow-lg shadow-neutral-200/50 ring-1 ring-neutral-100 scale-105 z-10"
                        : "text-neutral-500 hover:bg-neutral-100/80 hover:text-neutral-700"
                    )}
                  >
                    <Icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive ? "text-primary" : "text-neutral-400")} />
                    <span>{category.title}</span>
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto text-primary" />}
                  </button>
                );
              })}
            </div>

            {/* Content Area - Service Details */}
            <div className="flex-1 bg-white overflow-y-auto flex flex-col">
              {activeCategory && (() => {
                const category = SERVICE_CATEGORIES.find(c => c.id === activeCategory);
                if (!category) return null;
                return (
                  <div className="animate-in fade-in slide-in-from-right-2 duration-300 h-full flex flex-col">

                    {/* Header Area - Off-White Background */}
                    <div className="flex justify-between items-start p-8 bg-neutral-50 border-b border-neutral-100 shrink-0">
                      <div>
                        <h3 className="text-3xl font-bold font-display text-primary mb-2 display-font">{category.title}</h3>
                        <p className="text-neutral-500 text-sm max-w-lg">
                          Explore our professional {category.title.toLowerCase()} services tailored for your business.
                        </p>
                      </div>
                      <Link
                        to={category.route}
                        onClick={() => setIsServicesHovered(false)}
                        className="px-4 py-2 bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg border border-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center gap-2 group/btn"
                      >
                        Client Guide <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Main Content - White Background */}
                    <div className="p-8 flex-1 flex flex-col">
                      {/* Services Grid - 3 Columns */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full pb-3">
                        {category.subServices.map((sub, index) => (
                          <Link
                            key={sub.id}
                            to={sub.route}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setIsServicesHovered(false);
                            }}
                            className={cn(
                              "group flex items-center justify-center p-4 rounded-xl border transition-all duration-300",
                              "bg-blue-600 border-blue-600 text-white shadow-sm", // Standard Blue
                              "hover:bg-blue-400 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden", // Lighter Blue Hover
                              "min-h-[80px] text-center"
                            )}
                          >
                            <h4 className="font-bold text-[14px] leading-relaxed group-hover:text-black transition-colors">
                              {sub.name}
                            </h4>

                            {/* Optional: Very subtle gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                          </Link>
                        ))}
                      </div>

                      <div className="mt-auto pt-4 flex justify-center">
                        <Link
                          to={category.route}
                          className="inline-flex items-center justify-center px-6 py-2.5 bg-neutral-50 text-neutral-700 text-sm font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300 group shadow-sm hover:shadow-md"
                        >
                          Manage All {category.title}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}