import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../user-panel/contexts/AuthContext';
import {
  Menu, X, Phone, Mail, ChevronDown, ArrowRight,
  User, LogOut, LayoutDashboard, Settings, ShoppingCart
} from 'lucide-react';
import { cn } from './ui/utils';
import { useCart } from '../user-panel/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICE_CATEGORIES, SubService } from '../data/services';
import { ServicesDropdown } from './services/ServicesDropdown';

// ============================================================
// TYPES
// ============================================================

interface NavigationProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const NAV_ITEMS = [
  { id: 'home',       label: 'Home',       route: '/' },
  { id: 'about',      label: 'About Us',   route: '/about' },
  { id: 'services',   label: 'Services',   hasSubmenu: true, route: '#' },
  { id: 'industries', label: 'Industries', route: '/industries' },
  { id: 'resources',  label: 'Blogs',      route: '/resources' },
  { id: 'contact',    label: 'Contact Us', route: '/contact' },
];

// ============================================================
// MOBILE SERVICE ITEM  (card style, supports nested)
// ============================================================

const MobileServiceItem = ({
  service,
  onNavigate,
  fullWidth = false,
}: {
  service: SubService;
  onNavigate: (route: string, id: string) => void;
  fullWidth?: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasNested = !!service.subServices?.length;

  return (
    <div className="flex flex-col">
      <button
        onClick={() =>
          hasNested ? setExpanded(!expanded) : onNavigate(service.route, service.id)
        }
        className={cn(
          'w-full text-left p-3 rounded-xl border transition-all duration-200',
          'flex items-start justify-between gap-2',
          expanded
            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
            : 'bg-white text-slate-700 border-slate-200 hover:border-primary/50 hover:bg-primary/5 hover:text-primary shadow-sm',
          !fullWidth && 'min-h-[56px]'
        )}
      >
        <span className="text-[12px] font-semibold leading-tight flex-1">{service.name}</span>
        {hasNested ? (
          <ChevronDown
            className={cn(
              'w-3.5 h-3.5 flex-shrink-0 mt-0.5 transition-transform duration-200',
              expanded && 'rotate-180'
            )}
          />
        ) : (
          <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 opacity-30" />
        )}
      </button>

      {/* Nested items with animation */}
      <AnimatePresence>
        {hasNested && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-1 pl-2 space-y-1.5">
              {service.subServices!.map((nested) => (
                <button
                  key={nested.id}
                  onClick={() => onNavigate(nested.route, nested.id)}
                  className="flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-lg text-[11px] font-semibold bg-slate-50 text-slate-600 border border-slate-100 hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  <span className="w-1 h-1 rounded-full bg-current flex-shrink-0" />
                  {nested.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================
// MAIN NAVIGATION COMPONENT
// ============================================================

export default function Navigation({
  currentPage = '',
  onNavigate = () => {},
}: NavigationProps) {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>(
    SERVICE_CATEGORIES[0].id
  );
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ── Close everything ──────────────────────────────────────

  const closeAll = useCallback(() => {
    setIsServicesOpen(false);
    setIsProfileOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, []);

  // ── Effects ──────────────────────────────────────────────

  // Click outside nav → close all
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) closeAll();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [closeAll]);

  // Window resize
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
        setMobileServicesOpen(false);
      } else {
        setIsServicesOpen(false);
      }
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Route change → close all
  useEffect(() => { closeAll(); }, [location.pathname, closeAll]);

  // ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeAll(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [closeAll]);

  // Scroll → close desktop dropdown
  useEffect(() => {
    const handler = () => { if (isServicesOpen) setIsServicesOpen(false); };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [isServicesOpen]);

  // Cleanup hover timer
  useEffect(() => () => { if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current); }, []);

  // ── Hover handlers for Services nav item ─────────────────

  const handleServicesEnter = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsServicesOpen(true);
  }, []);

  const handleServicesLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => setIsServicesOpen(false), 150);
  }, []);

  // ── Navigation click ──────────────────────────────────────

  const handleNavClick = useCallback(
    (route: string, id: string) => {
      if (route === '#') return;
      navigate(route);
      onNavigate(id);
      closeAll();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [navigate, onNavigate, closeAll]
  );

  // ── Memoised values ───────────────────────────────────────

  const activeMobileCategoryData = useMemo(
    () => SERVICE_CATEGORIES.find((c) => c.id === activeMobileCategory),
    [activeMobileCategory]
  );

  // ── Render ────────────────────────────────────────────────

  return (
    <nav ref={navRef} className="bg-white shadow-sm sticky top-0 z-50">

      {/* ════════════════════════════════════════════════════ */}
      {/* TOP BAR                                              */}
      {/* ════════════════════════════════════════════════════ */}
      <div className="bg-primary text-white py-2">
        <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm gap-2 sm:gap-0">
            <div className="flex items-center gap-4">
              <a
                href="tel:+919811105573"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+91 9811105573</span>
              </a>
              <a
                href="mailto:info@caavinash.in"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
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

      {/* ════════════════════════════════════════════════════ */}
      {/* MAIN NAV BAR                                         */}
      {/* ════════════════════════════════════════════════════ */}
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24 lg:h-28">

          {/* Logo ─────────────────────────────────────────── */}
          <button
            onClick={() => handleNavClick('/', 'home')}
            className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <img
              src="/logo.png"
              alt="Avinash Payal & Associates"
              className="w-12 h-12 sm:w-20 sm:h-20 border border-gray-200 object-contain p-1 bg-white shadow-sm rounded-lg"
            />
            <div className="flex flex-col items-start gap-0.5">
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-primary font-display leading-tight uppercase">
                Avinash Payal & Associates
              </div>
              <div className="text-[9px] sm:text-xs font-semibold text-slate-500 tracking-widest uppercase">
                Chartered Accountants
              </div>
            </div>
          </button>

          {/* Desktop Nav Links ────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.id}
                className="relative flex items-center"
                onMouseEnter={item.hasSubmenu ? handleServicesEnter : undefined}
                onMouseLeave={item.hasSubmenu ? handleServicesLeave : undefined}
              >
                <button
                  onClick={() => handleNavClick(item.route, item.id)}
                  className={cn(
                    'text-sm font-medium transition-colors relative flex items-center gap-1.5 py-2',
                    currentPage === item.id || (item.hasSubmenu && isServicesOpen)
                      ? 'text-primary'
                      : 'text-neutral-700 hover:text-primary'
                  )}
                >
                  {item.label}
                  {item.hasSubmenu && (
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 opacity-70 transition-transform duration-200',
                        isServicesOpen && 'rotate-180'
                      )}
                    />
                  )}
                  {/* Active underline */}
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left transition-transform',
                      currentPage === item.id ? 'scale-x-100' : 'scale-x-0'
                    )}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Desktop Right: Cart + Auth + CTA ─────────────── */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">

            {/* Cart */}
            <button
              onClick={() => handleNavClick('/cart', 'cart')}
              className="relative p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all shadow-sm"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-5 h-5 text-slate-700" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Auth */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
                >
                  <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20">
                    <User className="w-5 h-5" />
                  </div>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-gray-500 transition-transform duration-200',
                      isProfileOpen && 'rotate-180'
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-50">
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => handleNavClick('/dashboard', 'dashboard')}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary flex items-center gap-2 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </button>
                        <button
                          onClick={() => handleNavClick(`/profile/${user.name}`, 'profile')}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary flex items-center gap-2 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>
                      </div>
                      <div className="border-t border-gray-50 py-1">
                        <button
                          onClick={() => { logout(); closeAll(); navigate('/'); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
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
              <div className="flex items-center gap-2">
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

            <div className="h-8 w-px bg-gray-200" />

            {/* CTA */}
            <button
              onClick={() => {
                if (location.pathname === '/') {
                  document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/#consultation-form');
                }
                closeAll();
              }}
              className="px-4 py-3 xl:px-6 xl:py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-lg text-sm whitespace-nowrap"
            >
              GET EXPERT CA GUIDANCE
            </button>
          </div>

          {/* Mobile: Cart + Hamburger ──────────────────────── */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => handleNavClick('/cart', 'cart')}
              className="relative p-2.5 rounded-xl bg-white border border-slate-100 shadow-sm"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-5 h-5 text-primary" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                  {cart.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* ════════════════════════════════════════════════════ */}
      {/* DESKTOP SERVICES MEGA-MENU                           */}
      {/* ════════════════════════════════════════════════════ */}
      <ServicesDropdown
        isOpen={isServicesOpen}
        onClose={() => setIsServicesOpen(false)}
        onNavigate={handleNavClick}
        onMouseEnter={handleServicesEnter}
        onMouseLeave={handleServicesLeave}
      />

      {/* ════════════════════════════════════════════════════ */}
      {/* MOBILE MENU                                          */}
      {/* ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-neutral-200 shadow-xl max-h-[calc(100vh-100px)] overflow-y-auto pb-10 z-40"
          >
            <div className="px-4 py-4 space-y-2">

              {/* Nav Items */}
              {NAV_ITEMS.map((item) => (
                <div key={item.id}>
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
                      'block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-between',
                      currentPage === item.id
                        ? 'bg-primary text-white'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    )}
                  >
                    {item.label}
                    {item.hasSubmenu && (
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform',
                          mobileServicesOpen ? 'rotate-180' : ''
                        )}
                      />
                    )}
                  </button>

                  {/* ── Mobile Services Panel ── */}
                  {item.hasSubmenu && mobileServicesOpen && (
                    <div className="mt-1 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">

                      {/* Category scroller */}
                      <div className="relative bg-white border-b border-slate-100">
                        {/* Right fade hint */}
                        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white to-transparent z-10" />
                        <div className="flex gap-2 overflow-x-auto px-3 py-3 scrollbar-hide">
                          {SERVICE_CATEGORIES.map((cat) => {
                            const CatIcon = cat.icon;
                            const isActive = activeMobileCategory === cat.id;
                            return (
                              <button
                                key={cat.id}
                                onClick={() => setActiveMobileCategory(cat.id)}
                                className={cn(
                                  'flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all flex-shrink-0 border',
                                  isActive
                                    ? 'bg-primary text-white border-primary shadow-md shadow-primary/25'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-primary/40 hover:text-primary'
                                )}
                              >
                                <CatIcon
                                  className={cn(
                                    'w-3.5 h-3.5 flex-shrink-0',
                                    isActive ? 'text-white' : 'text-primary/60'
                                  )}
                                  strokeWidth={2}
                                />
                                <span>{cat.title}</span>
                                <span
                                  className={cn(
                                    'text-[9px] font-black px-1.5 py-0.5 rounded-full',
                                    isActive
                                      ? 'bg-white/25 text-white'
                                      : 'bg-slate-100 text-slate-500'
                                  )}
                                >
                                  {cat.subServices.length}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Active category panel — animated on switch */}
                      <AnimatePresence mode="wait">
                        {activeMobileCategoryData && (
                          <motion.div
                            key={activeMobileCategoryData.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="px-3 pt-3 pb-4"
                          >
                            {/* Panel header */}
                            <div className="flex items-center justify-between mb-3 px-1">
                              <div className="flex items-center gap-2">
                                {(() => {
                                  const HeaderIcon = activeMobileCategoryData.icon;
                                  return (
                                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                                      <HeaderIcon className="w-4 h-4 text-primary" strokeWidth={1.75} />
                                    </div>
                                  );
                                })()}
                                <div>
                                  <p className="text-[13px] font-bold text-slate-800 leading-none">
                                    {activeMobileCategoryData.title}
                                  </p>
                                  <p className="text-[10px] text-slate-400 mt-0.5">
                                    {activeMobileCategoryData.subServices.length} services available
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* 2-col grid — nested items span full width */}
                            <div className="grid grid-cols-2 gap-2">
                              {activeMobileCategoryData.subServices.map((service) => {
                                const isNested = !!service.subServices?.length;
                                return (
                                  <div
                                    key={service.id}
                                    className={isNested ? 'col-span-2' : ''}
                                  >
                                    <MobileServiceItem
                                      service={service}
                                      onNavigate={handleNavClick}
                                      fullWidth={isNested}
                                    />
                                  </div>
                                );
                              })}
                            </div>

                            {/* View All CTA */}
                            <button
                              onClick={() =>
                                handleNavClick(
                                  activeMobileCategoryData.route,
                                  activeMobileCategoryData.id
                                )
                              }
                              className="w-full mt-4 py-3 text-[12px] font-bold text-primary bg-white rounded-xl border border-primary/20 hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
                            >
                              View All {activeMobileCategoryData.title}
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  )}
                </div>
              ))}

              {/* Auth Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-6 border-t border-gray-100 pt-6">
                {user ? (
                  <button
                    onClick={() => handleNavClick('/dashboard', 'dashboard')}
                    className="col-span-2 w-full px-4 py-3 bg-primary/5 text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors text-center"
                  >
                    Go to Dashboard
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleNavClick('/login', 'login')}
                      className="w-full px-4 py-3 text-neutral-600 font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-center"
                    >
                      Log In
                    </button>
                    <button
                      onClick={() => handleNavClick('/register', 'register')}
                      className="w-full px-4 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors text-center"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>

              {/* Mobile CTA */}
              <button
                onClick={() => {
                  if (location.pathname === '/') {
                    document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/#consultation-form');
                  }
                  setMobileMenuOpen(false);
                }}
                className="w-full px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors mt-4 shadow-md"
              >
                GET EXPERT CA GUIDANCE
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}
