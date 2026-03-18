import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../user-panel/contexts/AuthContext';
import {
  Menu, X, Phone, Mail, ChevronDown, ChevronRight, ArrowRight,
  Building2, Receipt, Landmark, PieChart, Calculator, User, LogOut, 
  LayoutDashboard, Settings, ShoppingCart, BookOpen
} from 'lucide-react';
import { cn } from './ui/utils';
import { useCart } from '../user-panel/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================
// TYPES & CONSTANTS
// ============================================================

interface NavigationProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

interface SubService {
  id: string;
  name: string;
  route: string;
  subServices?: SubService[];
}

interface ServiceCategory {
  id: string;
  title: string;
  route: string;
  icon: React.ElementType;
  color: 'blue';
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
    id: 'accounting-services',
    title: 'Accounting Services',
    route: '/services/business-compliances/book-keeping',
    icon: Calculator,
    color: 'blue',
    subServices: [
      { id: 'book-keeping', name: 'Book Keeping', route: '/services/business-compliances/book-keeping' },
      { id: 'book-supervision', name: 'Book Supervision', route: '/services/business-compliances/book-supervision' },
      {
        id: 'roc-mca-compliance',
        name: 'ROC / MCA Compliance',
        route: '/services/roc-mca-compliance',
        subServices: [
          { id: 'change-directors-kmp', name: 'Change in directors/KMP', route: '/services/business-compliances/change-directors-kmp' },
          { id: 'change-registered-office', name: 'Change in Registered office', route: '/services/business-compliances/change-registered-office' },
          { id: 'annual-filing-company', name: 'Annual filling-Company', route: '/services/business-compliances/annual-filing-company' },
          { id: 'din', name: 'DIN', route: '/services/business-compliances/din-dir3-kyc' },
          { id: 'dir3-kyc', name: 'DIR3-KYC', route: '/services/business-compliances/din-dir3-kyc' },
          { id: 'dir-wkyc', name: 'DIR-WKYC', route: '/services/business-compliances/din-dir3-kyc' },
          { id: 'minutes-book', name: 'Minutes Book', route: '/services/business-compliances/minutes-book' },
          { id: 'statutory-record', name: 'Statutory record', route: '/services/business-compliances/statutory-record' },
          { id: 'annual-filing-llp', name: 'Annual filling-LLP', route: '/services/business-compliances/annual-filing-llp' },
        ]
      },
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

// ============================================================
// SUB-COMPONENTS
// ============================================================

const MobileServiceItem = ({ service, onNavigate }: { service: SubService; onNavigate: (route: string, id: string) => void }) => {
  const [expanded, setExpanded] = useState(false);
  const hasNested = service.subServices && service.subServices.length > 0;

  return (
    <div className="flex flex-col">
      <button
        onClick={() => {
          if (hasNested) {
            setExpanded(!expanded);
          } else {
            onNavigate(service.route, service.id);
          }
        }}
        className={cn(
          "w-full text-left px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm",
          expanded ? "border-primary bg-blue-50 text-primary" : "bg-gradient-to-r from-blue-50 to-blue-50 border-blue-200 text-blue-900",
          "hover:border-primary hover:from-blue-100 hover:to-blue-50 hover:text-primary"
        )}
        aria-expanded={expanded}
      >
        <div className="flex items-center justify-between">
          <span>{service.name}</span>
          {hasNested && (
            <ChevronDown className={cn("w-4 h-4 flex-shrink-0 transition-transform duration-200", expanded && 'rotate-180')} />
          )}
        </div>
      </button>

      <AnimatePresence>
        {hasNested && expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="ml-4 mt-2 space-y-2 pb-2 overflow-hidden"
          >
            {service.subServices!.map((nested) => (
              <button
                key={nested.id}
                onClick={() => onNavigate(nested.route, nested.id)}
                className={cn(
                  "block w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                  "bg-slate-50 text-slate-600 border border-slate-200",
                  "hover:bg-primary hover:text-white hover:border-primary"
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-current flex-shrink-0" />
                  {nested.name}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DesktopServiceCard = ({
  service,
  onNavigate
}: {
  service: SubService;
  onNavigate: (route: string, id: string) => void;
}) => {
  const [showNested, setShowNested] = useState(false);
  const hasNested = service.subServices && service.subServices.length > 0;

  return (
    <div 
      className="group relative"
      onMouseEnter={() => hasNested && setShowNested(true)}
      onMouseLeave={() => setShowNested(false)}
    >
      <Link
        to={service.route}
        onClick={(e) => {
          if (hasNested) {
            e.preventDefault();
            setShowNested(!showNested);
          } else {
            onNavigate(service.route, service.id);
          }
        }}
        className={cn(
          "flex items-center justify-center p-4 rounded-xl border transition-all duration-300 h-full",
          "bg-white border-blue-100 text-primary shadow-sm",
          "hover:bg-primary hover:border-primary hover:text-white hover:shadow-lg relative overflow-hidden",
          "min-h-[80px] text-center"
        )}
      >
        <h4 className="font-bold text-[14px] leading-relaxed transition-colors">
          {service.name}
          {hasNested && <ChevronRight className={cn("w-4 h-4 inline-block ml-1 opacity-70 transition-transform", showNested && "rotate-90")} />}
        </h4>
      </Link>

      <AnimatePresence>
        {hasNested && showNested && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-[100%] left-0 w-full pt-3 z-[9999]"
          >
            <div className="bg-white rounded-xl shadow-2xl border border-neutral-100 overflow-hidden py-2 ring-1 ring-black/5">
              {service.subServices!.map((nested) => (
                <Link
                  key={nested.id}
                  to={nested.route}
                  onClick={() => onNavigate(nested.route, nested.id)}
                  className="text-left px-5 py-3 hover:bg-neutral-50 text-sm font-medium text-neutral-700 hover:text-primary transition-colors flex items-center gap-3 border-l-4 border-transparent hover:border-primary"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 group-hover:bg-primary transition-colors flex-shrink-0" />
                  {nested.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function Navigation({ currentPage = '', onNavigate = () => { } }: NavigationProps) {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  // State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(SERVICE_CATEGORIES[0].id);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Refs
  const navRef = useRef<HTMLElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ============================================================
  // CLOSURE LOGIC (THE CORE FIX)
  // ============================================================

  const closeAll = useCallback(() => {
    setIsServicesHovered(false);
    setIsProfileOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, []);

  // 1. Click Outside Detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeAll();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeAll]);

  // 2. Window Resize Handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // Desktop breakpoint
        setMobileMenuOpen(false);
        setMobileServicesOpen(false);
      } else {
        setIsServicesHovered(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 3. Navigation Change Handling
  useEffect(() => {
    closeAll();
  }, [location.pathname, closeAll]);

  // 4. Keyboard Navigation (ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAll();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeAll]);

  // 5. Scroll Handling
  useEffect(() => {
    const handleScroll = () => {
      if (isServicesHovered || isProfileOpen) {
        setIsServicesHovered(false);
        setIsProfileOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isServicesHovered, isProfileOpen]);

  // ============================================================
  // HANDLERS
  // ============================================================

  const handleMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsServicesHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsServicesHovered(false);
    }, 150);
  }, []);

  const handleNavClick = useCallback((route: string, id: string) => {
    if (route === '#') return;
    navigate(route);
    onNavigate(id);
    closeAll();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate, onNavigate, closeAll]);

  // ============================================================
  // RENDER HELPERS
  // ============================================================

  const activeCategoryData = useMemo(
    () => SERVICE_CATEGORIES.find(c => c.id === activeCategory),
    [activeCategory]
  );

  const activeMobileCategoryData = useMemo(
    () => SERVICE_CATEGORIES.find(c => c.id === activeMobileCategory),
    [activeMobileCategory]
  );

  return (
    <nav ref={navRef} className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary text-white py-2">
        <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm gap-2 sm:gap-0">
            <div className="flex items-center gap-4">
              <a href="tel:+919811105573" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                <span>+91 9811105573</span>
              </a>
              <a href="mailto:info@caavinash.in" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@caavinash.in</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              <span>ICAI Registered | 21+ Years Experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24 lg:h-28">
          {/* Logo Section */}
          <button
            onClick={() => handleNavClick('/', 'home')}
            className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <img
              src="/logo.png"
              alt="Avinash Payal & Associates"
              className="w-14 h-14 sm:w-20 sm:h-20 border border-gray-300 object-contain p-1 bg-white shadow-sm rounded-lg"
            />
            <div className="flex flex-col items-start gap-0.5">
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-primary font-display leading-tight uppercase">
                Avinash Payal & Associates
              </div>
              <div className="text-[10px] sm:text-sm md:text-base lg:text-xs font-medium text-primary font-display leading-tight tracking-wide">
                Chartered Accountants
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.id}
                className="relative h-full flex items-center"
                onMouseEnter={item.hasSubmenu ? handleMouseEnter : undefined}
                onMouseLeave={item.hasSubmenu ? handleMouseLeave : undefined}
              >
                <button
                  onClick={() => handleNavClick(item.route, item.id)}
                  className={cn(
                    "text-sm lg:text-base font-medium transition-colors relative flex items-center gap-1.5 py-2",
                    currentPage === item.id || (item.hasSubmenu && isServicesHovered)
                      ? 'text-primary'
                      : 'text-neutral-700 hover:text-primary'
                  )}
                  aria-expanded={item.hasSubmenu ? isServicesHovered : undefined}
                  aria-haspopup={item.hasSubmenu ? 'true' : undefined}
                >
                  {item.label}
                  {item.hasSubmenu && (
                    <ChevronDown className={cn("w-4 h-4 opacity-70 transition-transform duration-200", isServicesHovered && 'rotate-180')} />
                  )}
                  <span className={cn(
                    "absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left transition-transform",
                    currentPage === item.id ? 'scale-x-100' : 'scale-x-0'
                  )} />
                </button>
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Cart */}
            <button
              onClick={() => handleNavClick('/cart', 'cart')}
              className="relative p-2 rounded-full bg-slate-50 border border-gray-100 hover:bg-slate-100 transition-colors shadow-sm"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center ring-2 ring-white shadow-md">
                  {cart.length}
                </span>
              )}
            </button>

            {/* User Profile */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="true"
                >
                  <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20">
                    <User className="w-5 h-5" />
                  </div>
                  <ChevronDown className={cn("w-4 h-4 text-gray-500 transition-transform duration-200", isProfileOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden"
                      role="menu"
                    >
                      <div className="px-4 py-3 border-b border-gray-50 bg-slate-50/50">
                        <p className="text-sm font-bold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => handleNavClick('/dashboard', 'dashboard')}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary flex items-center gap-2 transition-colors"
                          role="menuitem"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </button>
                        <button
                          onClick={() => handleNavClick(`/profile/${user.name}`, 'profile')}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary flex items-center gap-2 transition-colors"
                          role="menuitem"
                        >
                          <Settings className="w-4 h-4" />
                          Account Settings
                        </button>
                      </div>
                      <div className="border-t border-gray-50 py-1">
                        <button
                          onClick={() => { logout(); closeAll(); navigate('/'); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors font-semibold"
                          role="menuitem"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNavClick('/login', 'login')}
                  className="px-4 py-2 text-sm font-semibold text-neutral-600 hover:text-primary transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNavClick('/register', 'register')}
                  className="px-4 py-2 text-sm font-semibold text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}

            <div className="h-8 w-px bg-gray-200 mx-2" />

            <button
              onClick={() => {
                if (location.pathname === '/') {
                  document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/#consultation-form');
                }
                closeAll();
              }}
              className="px-6 py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm"
            >
              FREE CONSULTATION
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => handleNavClick('/cart', 'cart')}
              className="relative p-2 rounded-full bg-slate-50 border border-gray-100"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                  {cart.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 rounded-lg hover:bg-gray-100"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Services Mega Menu - Desktop */}
      <AnimatePresence>
        {isServicesHovered && (
          <motion.div
            ref={servicesDropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full z-40 bg-white border-t border-gray-100 shadow-2xl hidden lg:block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-[95vw] mx-auto flex max-h-[80vh]">
              {/* Categories Sidebar */}
              <div className="w-[320px] bg-slate-50/50 border-r border-gray-100 py-8 px-4 overflow-y-auto custom-scrollbar">
                {SERVICE_CATEGORIES.map((category) => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onMouseEnter={() => setActiveCategory(category.id)}
                      onClick={() => handleNavClick(category.route, category.id)}
                      className={cn(
                        "w-full text-left px-5 py-4 transition-all text-sm font-bold rounded-xl flex items-center gap-4 mb-2 group",
                        isActive
                          ? "bg-primary text-white shadow-lg shadow-blue-900/10 scale-[1.02]"
                          : "text-neutral-600 hover:bg-white hover:text-primary hover:shadow-md"
                      )}
                    >
                      <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-white" : "text-neutral-400 group-hover:text-primary")} />
                      <span className="flex-1">{category.title}</span>
                      <ChevronRight className={cn("w-4 h-4", isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100")} />
                    </button>
                  );
                })}
              </div>

              {/* Content Area */}
              <div className="flex-1 bg-white p-10 overflow-y-auto custom-scrollbar">
                {activeCategoryData && (
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    <div className="flex justify-between items-end border-b border-gray-100 pb-6">
                      <div className="space-y-2">
                        <h3 className="text-3xl font-black text-primary font-display tracking-tight">{activeCategoryData.title}</h3>
                        <p className="text-neutral-500 text-sm max-w-xl">
                          Professional solutions for {activeCategoryData.title.toLowerCase()} specifically designed for growth-oriented enterprises.
                        </p>
                      </div>
                      <Link
                        to={activeCategoryData.route}
                        className="flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
                      >
                        View Expert Guide <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {activeCategoryData.subServices.map((sub) => (
                        <DesktopServiceCard
                          key={sub.id}
                          service={sub}
                          onNavigate={handleNavClick}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[112px] bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={closeAll}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
                {NAV_ITEMS.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <button
                      onClick={() => {
                        if (item.hasSubmenu) {
                          setMobileServicesOpen(!mobileServicesOpen);
                          if (!activeMobileCategory) setActiveMobileCategory(SERVICE_CATEGORIES[0].id);
                        } else {
                          handleNavClick(item.route, item.id);
                        }
                      }}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-xl font-bold transition-all",
                        currentPage === item.id ? "bg-primary text-white" : "bg-slate-50 text-neutral-800 hover:bg-slate-100"
                      )}
                    >
                      <span>{item.label}</span>
                      {item.hasSubmenu && <ChevronDown className={cn("w-5 h-5 transition-transform", mobileServicesOpen && "rotate-180")} />}
                    </button>

                    {/* Mobile Services Expansion */}
                    {item.hasSubmenu && mobileServicesOpen && (
                      <div className="space-y-4 pt-2">
                        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar snap-x">
                          {SERVICE_CATEGORIES.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => setActiveMobileCategory(cat.id)}
                              className={cn(
                                "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border-2 transition-all snap-start",
                                activeMobileCategory === cat.id ? "bg-primary text-white border-primary" : "bg-white text-neutral-600 border-neutral-200"
                              )}
                            >
                              {cat.title}
                            </button>
                          ))}
                        </div>

                        {activeMobileCategoryData && (
                          <motion.div
                            key={activeMobileCategory}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-3"
                          >
                            {activeMobileCategoryData.subServices.map((sub) => (
                              <MobileServiceItem key={sub.id} service={sub} onNavigate={handleNavClick} />
                            ))}
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Auth/CTA Footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
                {user ? (
                  <button
                    onClick={() => handleNavClick('/dashboard', 'dashboard')}
                    className="w-full py-4 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    USER DASHBOARD
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleNavClick('/login', 'login')}
                      className="py-4 bg-white text-primary border-2 border-primary/10 font-bold rounded-xl hover:bg-slate-50 transition-all"
                    >
                      LOG IN
                    </button>
                    <button
                      onClick={() => handleNavClick('/register', 'register')}
                      className="py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 hover:bg-blue-700 transition-all"
                    >
                      SIGN UP
                    </button>
                  </div>
                )}
                <button
                  onClick={() => handleNavClick('/contact', 'contact')}
                  className="w-full py-4 bg-accent text-white font-black rounded-xl hover:shadow-xl transition-all uppercase tracking-widest"
                >
                  Book Appointment
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
