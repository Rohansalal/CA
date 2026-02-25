// import { useState, useRef, useEffect } from 'react';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import {
//   Menu, X, Phone, Mail, ChevronDown, ChevronRight, ArrowRight,
//   Building2, Receipt, Scale,
//   Landmark, PieChart, Calculator, User, LogOut, LayoutDashboard, Settings
// } from 'lucide-react';
// import { cn } from './ui/utils';

// interface NavigationProps {
//   currentPage?: string;
//   onNavigate?: (page: string) => void;
// }

// interface SubService {
//   id: string;
//   name: string;
//   route: string;
//   subServices?: SubService[];
// }

// interface ServiceCategory {
//   id: string;
//   title: string;
//   route: string;
//   icon: React.ElementType;
//   color: 'blue' | 'blue' | 'blue' | 'blue' | 'blue'; // Kept as original though redundant
//   subServices: SubService[];
// }

// const SERVICE_CATEGORIES: ServiceCategory[] = [
//   {
//     id: 'business-registrations',
//     title: 'Business Registration',
//     route: '/services/business-registrations',
//     icon: Building2,
//     color: 'blue',
//     subServices: [
//       { id: 'proprietorship-registration', name: 'Proprietorship Registration', route: '/services/business-registrations/proprietorship' },
//       { id: 'huf-registration', name: 'HUF Registration', route: '/services/business-registrations/huf' },
//       { id: 'partnership-firm', name: 'Partnership Firm', route: '/services/business-registrations/partnership-firm' },
//       { id: 'llp-registration', name: 'LLP Registration', route: '/services/business-registrations/llp-registration' },
//       { id: 'private-limited-company', name: 'Private Limited Company', route: '/services/business-registrations/private-limited-company' },
//       { id: 'one-person-company', name: 'One Person Company – OPC', route: '/services/business-registrations/one-person-company' },
//       { id: 'public-limited-company', name: 'Public Limited Company', route: '/services/business-registrations/public-limited-company' },
//       { id: 'section-8-company', name: 'Section 8 Company', route: '/services/business-registrations/section-8-company' },
//       { id: 'trust-registration', name: 'Trust Registration', route: '/services/business-registrations/trust-registration' },
//       { id: 'society-registration', name: 'Society Registration', route: '/services/business-registrations/society-registration' },
//     ]
//   },
//   {
//     id: 'tax-registrations',
//     title: 'Tax Registration',
//     route: '/services/tax-registrations',
//     icon: Receipt,
//     color: 'blue',
//     subServices: [
//       { id: 'gst-registration', name: 'GST Registration', route: '/services/tax-registrations/gst-registration' },
//       { id: 'pan-application', name: 'PAN Application', route: '/services/tax-registrations/pan-application' },
//       { id: 'tan-application', name: 'TAN Application', route: '/services/tax-registrations/tan-application' },
//     ]
//   },
//   {
//     id: 'accounting-services',
//     title: 'Accounting Services',
//     route: '/services/business-compliances/book-keeping',
//     icon: Calculator,
//     color: 'blue',
//     subServices: [
//       { id: 'book-keeping', name: 'Book Keeping', route: '/services/business-compliances/book-keeping' },
//       { id: 'book-supervision', name: 'Book Supervision', route: '/services/business-compliances/book-supervision' },
//       {
//         id: 'roc-mca-compliance',
//         name: 'ROC / MCA Compliance',
//         route: '/services/roc-mca-compliance',
//         subServices: [
//           { id: 'change-directors-kmp', name: 'Change in directors/KMP', route: '/services/business-compliances/change-directors-kmp' },
//           { id: 'change-registered-office', name: 'Change in Registered office', route: '/services/business-compliances/change-registered-office' },
//           { id: 'annual-filing-company', name: 'Annual filling-Company', route: '/services/business-compliances/annual-filing-company' },
//           { id: 'din', name: 'DIN', route: '/services/business-compliances/din-dir3-kyc' },
//           { id: 'dir3-kyc', name: 'DIR3-KYC', route: '/services/business-compliances/din-dir3-kyc' },
//           { id: 'dir-wkyc', name: 'DIR-WKYC', route: '/services/business-compliances/din-dir3-kyc' },
//           { id: 'minutes-book', name: 'Minutes Book', route: '/services/business-compliances/minutes-book' },
//           { id: 'statutory-record', name: 'Statutory record', route: '/services/business-compliances/statutory-record' },
//           { id: 'annual-filing-llp', name: 'Annual filling-LLP', route: '/services/business-compliances/annual-filing-llp' },
//         ]
//       },
//     ]
//   },
//   {
//     id: 'tax-compliances',
//     title: 'Tax Compliances',
//     route: '/services/tax-financial-compliances',
//     icon: Calculator,
//     color: 'blue',
//     subServices: [
//       { id: 'advance-tax-calculation', name: 'Advance Tax Calculation', route: '/services/tax-compliances/advance-tax-calculation' },
//       { id: 'itr-filing', name: 'ITR Filing', route: '/services/tax-compliances/itr-filing' },
//       { id: 'tds-return-filing', name: 'TDS Return Filing', route: '/services/tax-compliances/tds-return-filing' },
//       { id: 'gst-return-filing', name: 'GST Return Filing', route: '/services/tax-compliances/gst-return-filing' },
//       { id: 'gst-annual-return', name: 'GST Annual Return', route: '/services/tax-compliances/gst-annual-return' },
//     ]
//   },
//   {
//     id: 'audit-assurance',
//     title: 'Audit & Assurance',
//     route: '/services/audit-assurance',
//     icon: PieChart,
//     color: 'blue',
//     subServices: [
//       { id: 'statutory-audit', name: 'Statutory Audit', route: '/services/audit-assurance/statutory-audit' },
//       { id: 'tax-audit', name: 'Tax Audit', route: '/services/audit-assurance/tax-audit' },
//       { id: 'gst-audit', name: 'GST Audit', route: '/services/audit-assurance/gst-audit' },
//       { id: 'internal-audit', name: 'Internal Audit', route: '/services/audit-assurance/internal-audit' },
//     ]
//   },
//   {
//     id: 'other-registrations',
//     title: 'Other Registrations',
//     route: '/services/government-registrations-compliances',
//     icon: Landmark,
//     color: 'blue',
//     subServices: [
//       { id: 'fssai-registration', name: 'FSSAI Registration', route: '/services/other-registrations/fssai' },
//       { id: 'import-export-code', name: 'Import Export Code (IEC)', route: '/services/other-registrations/iec' },
//       { id: 'msme-registration', name: 'MSME Registration', route: '/services/other-registrations/msme' },
//       { id: 'dsc', name: 'Digital Signature (DSC)', route: '/services/other-registrations/dsc' },
//       { id: 'pf-esic-registration', name: 'PF & ESIC Registration', route: '/services/other-registrations/pf-esic' },
//       { id: 'trademark-registration', name: 'Trademark Registration', route: '/services/other-registrations/trademark' },
//       { id: 'copyright-registration', name: 'Copyright Registration', route: '/services/other-registrations/copyright' },
//       { id: 'startup-india', name: 'Startup India', route: '/services/other-registrations/startup-india' },
//       { id: 'trade-license', name: 'Trade License', route: '/services/other-registrations/trade-license' },
//       { id: 'labour-registration', name: 'Shop & Establishment', route: '/services/other-registrations/labour-registration' },
//       { id: 'drug-license', name: 'Drug License', route: '/services/other-registrations/drug-license' },
//       { id: 'pollution-control', name: 'Pollution Control (NOC)', route: '/services/other-registrations/pollution-control' },
//     ]
//   },
// ];

// const NAV_ITEMS = [
//   { id: 'home', label: 'Home', route: '/' },
//   { id: 'about', label: 'About Us', route: '/about' },
//   { id: 'services', label: 'Services', hasSubmenu: true, route: '#' },
//   { id: 'industries', label: 'Industries', route: '/industries' },
//   { id: 'resources', label: 'Blogs', route: '/resources' },
//   { id: 'contact', label: 'Contact Us', route: '/contact' },
// ];

// const COLOR_STYLES = {
//   blue: {
//     bg: 'bg-blue-50',
//     text: 'text-blue-900',
//     activeBg: 'bg-blue-50',
//     activeText: 'text-blue-700',
//     iconBg: 'bg-blue-100',
//     iconText: 'text-blue-600',
//     hoverText: 'hover:text-blue-700',
//     bulletGroupHover: 'group-hover/sub:bg-blue-600',
//     border: 'border-blue-100',
//     hover: 'hover:bg-blue-100',
//   },
//   // Other colors removed for brevity as they are not used in new structure but might be needed if user reverts. 
//   // Actually, let's keep them if they were there, but for this edit I am replacing the block.
//   // To avoid deleting used code, I will paste the whole block if I am replacing the whole block.
//   // But wait, the previous tool call output showed I should replace up to start of Navigation component.
//   // I will just return the updated SERVICE_CATEGORIES and interfaces.
//   // BUT the instruction asks to update rendering loop too.
//   // I will have to do this in two steps or Replace a large chunk.
//   // I'll replace from `interface SubService` down to the `return` statement of the component? No that's too much.
//   // I will basically rewrite the constants and then I'll use another tool call for the render loop?
//   // Or I can do it all since I have the file content.
//   // I'll replace everything from line 15 (interface) to line 128 (end of categories).
//   // AND then I need to handle the render loop which is later in the file.
//   // I can't do non-contiguous edits in `replace_file_content` if they are too far apart or if I want to be safe.
//   // I will use `replacement_chunks` via `multi_replace_file_content`.

//   // WAIT. I don't have `multi_replace_file_content` in my thought process I only have `replace_file_content`.
//   // Oh, I see `multi_replace_file_content` in the tool definitions. I should use that.
// };

// // ... (skipping for now)




// export default function Navigation({ currentPage = '', onNavigate = () => { } }: NavigationProps) {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [servicesOpen, setServicesOpen] = useState(false);
//   const [activeCategory, setActiveCategory] = useState<string | null>(SERVICE_CATEGORIES[0].id);
//   const [isServicesHovered, setIsServicesHovered] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const profileRef = useRef<HTMLDivElement>(null);

//   // Close profile dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
//         setIsProfileOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Clear timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
//     };
//   }, []);

//   // Close on Escape key
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') setIsServicesHovered(false);
//     };
//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   // Close on Scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       if (isServicesHovered) setIsServicesHovered(false);
//     };
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [isServicesHovered]);

//   const handleMouseEnter = (hasSubmenu: boolean) => {
//     if (!hasSubmenu) return;
//     if (hoverTimeoutRef.current) {
//       clearTimeout(hoverTimeoutRef.current);
//       hoverTimeoutRef.current = null;
//     }
//     setIsServicesHovered(true);
//   };

//   const handleMouseLeave = (hasSubmenu: boolean) => {
//     if (!hasSubmenu) return;
//     hoverTimeoutRef.current = setTimeout(() => {
//       setIsServicesHovered(false);
//       setActiveCategory(SERVICE_CATEGORIES[0].id); // Reset to first category on close
//     }, 200);
//   };

//   const handleNavClick = (route: string, id: string) => {
//     navigate(route);
//     if (onNavigate) onNavigate(id);
//     setMobileMenuOpen(false);
//     setIsProfileOpen(false);
//     setActiveCategory(SERVICE_CATEGORIES[0].id);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const currentPath = location.pathname;

//   return (
//     <nav className="bg-white shadow-sm sticky top-0 z-50">
//       {/* Top bar */}
//       <div className="bg-primary text-white py-2">
//         <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col sm:flex-row justify-between items-center text-sm gap-2 sm:gap-0">
//             <div className="flex items-center gap-4">
//               <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-accent transition-colors">
//                 <Phone className="w-4 h-4" />
//                 <span> +91  9811105573</span>
//               </a>
//               <a href="mailto:info@caavinash.in" className="flex items-center gap-2 hover:text-accent transition-colors">
//                 <Mail className="w-4 h-4" />
//                 <span>info@caavinash.in</span>
//               </a>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-accent">✓</span>
//               <span>ICAI Registered | 10+ Years Experience</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main navigation */}
//       <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           {/* Logo Section */}
//           <button
//             onClick={() => handleNavClick('/', 'home')}
//             className="flex items-center gap-3 hover:opacity-80 transition-opacity"
//           >
//             <img
//               src="/logo.png"
//               alt="Company Logo"
//               className="w-12 h-12 sm:w-16 sm:h-16 bg-transparent"
//             />
//             <div className="flex flex-col items-center">
//               <div className="text-xl font-bold text-primary font-display leading-tight">Avinash Payal & Associates</div>
//               <div className="text-lg  font-semibold text-primary font-display leading-tight">Chartered Accountants</div>
//             </div>

//           </button>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center gap-8">
//             {NAV_ITEMS.map((item) => (
//               <div
//                 key={item.id}
//                 className="relative h-full flex items-center"
//                 onMouseEnter={() => handleMouseEnter(!!item.hasSubmenu)}
//                 onMouseLeave={() => handleMouseLeave(!!item.hasSubmenu)}
//               >
//                 <button
//                   onClick={() => {
//                     if (item.route) handleNavClick(item.route, item.id);
//                   }}
//                   className={cn(
//                     "text-sm font-medium transition-colors relative flex items-center gap-1.5 py-2",
//                     currentPage === item.id
//                       ? 'text-primary'
//                       : 'text-neutral-700 hover:text-primary'
//                   )}
//                 >
//                   {item.label}
//                   {item.hasSubmenu && <ChevronDown className={cn("w-5 h-5 opacity-70 transition-transform duration-200", isServicesHovered && 'rotate-180')} />}
//                   <span className={cn(
//                     "absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left transition-transform",
//                     currentPage === item.id ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
//                   )} />
//                 </button>

//                 {/* Services Dropdown removed from here */}
//               </div>
//             ))}
//           </div>

//           {/* Auth Buttons & CTA */}
//           <div className="hidden lg:flex items-center gap-4">
//             {user ? (
//               <div className="relative" ref={profileRef}>
//                 <button
//                   onClick={() => setIsProfileOpen(!isProfileOpen)}
//                   className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
//                 >
//                   <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20">
//                     <User className="w-5 h-5" />
//                   </div>
//                   <ChevronDown className={cn("w-4 h-4 text-gray-500 transition-transform duration-200", isProfileOpen && "rotate-180")} />
//                 </button>

//                 {/* Profile Dropdown */}
//                 {isProfileOpen && (
//                   <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
//                     <div className="px-4 py-3 border-b border-gray-50">
//                       <p className="text-sm font-semibold text-gray-900">{user.name}</p>
//                       <p className="text-xs text-gray-500 truncate">{user.email}</p>
//                     </div>

//                     <div className="py-1">
//                       <button
//                         onClick={() => handleNavClick('/dashboard', 'dashboard')}
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary flex items-center gap-2 transition-colors"
//                       >
//                         <LayoutDashboard className="w-4 h-4" />
//                         Dashboard
//                       </button>
//                       <button
//                         // onClick={() => handleNavClick('/profile', 'profile')} // Assuming profile page exists or placeholder
//                         className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary flex items-center gap-2 transition-colors opacity-50 cursor-not-allowed"
//                         disabled
//                       >
//                         <Settings className="w-4 h-4" />
//                         Settings
//                       </button>
//                     </div>

//                     <div className="border-t border-gray-50 py-1">
//                       <button
//                         onClick={() => {
//                           logout();
//                           setIsProfileOpen(false);
//                           navigate('/');
//                         }}
//                         className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
//                       >
//                         <LogOut className="w-4 h-4" />
//                         Sign Out
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => handleNavClick('/login', 'login')}
//                   className="px-4 py-2 text-sm font-semibold text-neutral-600 hover:text-primary transition-colors"
//                 >
//                   Log In
//                 </button>
//                 <button
//                   onClick={() => handleNavClick('/register', 'register')}
//                   className="px-4 py-2 text-sm font-semibold text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
//                 >
//                   Sign Up
//                 </button>
//               </div>
//             )}

//             <div className="h-8 w-px bg-gray-200 mx-2"></div>

//             <button
//               onClick={() => handleNavClick('/contact', 'contact')}
//               className="px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
//             >
//               BOOK CONSULTATION
//             </button>
//           </div>

//           {/* Mobile menu button */}
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="lg:hidden p-2 text-neutral-700"
//           >
//             {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {mobileMenuOpen && (
//         <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-neutral-200 shadow-xl max-h-[calc(100vh-100px)] overflow-y-auto pb-10">
//           <div className="px-4 py-4 space-y-2">
//             {NAV_ITEMS.map((item) => (
//               <div key={item.id}>
//                 <button
//                   onClick={() => {
//                     if (item.hasSubmenu) {
//                       setServicesOpen(!servicesOpen);
//                     } else if (item.route) {
//                       handleNavClick(item.route, item.id);
//                     }
//                   }}
//                   className={cn(
//                     "block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-between",
//                     currentPage === item.id
//                       ? 'bg-primary text-white'
//                       : 'text-neutral-700 hover:bg-neutral-50'
//                   )}
//                 >
//                   {item.label}
//                   {item.hasSubmenu && (
//                     <ChevronDown className={cn("w-4 h-4 transition-transform", servicesOpen ? 'rotate-180' : '')} />
//                   )}
//                 </button>

//                 {/* Mobile Services Submenu */}
//                 {item.hasSubmenu && servicesOpen && (
//                   <div className="mt-2 space-y-4 bg-slate-50 border-t border-slate-100 py-4">
//                     {SERVICE_CATEGORIES.map((category) => {
//                       const styles = COLOR_STYLES[category.color] || COLOR_STYLES.blue;
//                       const CategoryIcon = category.icon;

//                       return (
//                         <div key={category.id} className="bg-white rounded-xl shadow-sm border border-slate-100 mx-2 overflow-hidden">
//                           {/* Category Header */}
//                           <button
//                             onClick={() => handleNavClick(category.route, category.id)}
//                             className={cn(
//                               "w-full text-left px-4 py-3 font-bold text-xs uppercase flex items-center gap-3 border-b border-slate-50",
//                               styles.bg, styles.text
//                             )}
//                           >
//                             <div className={cn("p-1.5 rounded-lg bg-white/50 backdrop-blur-sm shadow-sm", styles.text)}>
//                               <CategoryIcon className="w-4 h-4" />
//                             </div>
//                             <span className="flex-1 tracking-wide">{category.title}</span>
//                             <ArrowRight className="w-3.5 h-3.5 opacity-60" />
//                           </button>

//                           {/* Sub-services Grid */}
//                           <div className="p-3">
//                             <div className="grid grid-cols-2 gap-2">
//                               {category.subServices.map((service) => (
//                                 <button
//                                   key={service.id}
//                                   onClick={() => handleNavClick(service.route, service.id)}
//                                   className="text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-[11px] font-medium text-slate-600 hover:text-primary transition-colors flex items-center gap-2 border border-slate-100 hover:border-slate-200 h-full"
//                                 >
//                                   <span className={cn("w-1 h-4 rounded-full flex-shrink-0", styles.text.replace('text-', 'bg-'))}></span>
//                                   <span className="line-clamp-2 leading-tight">{service.name}</span>
//                                 </button>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                     <div className="px-4 pt-2">
//                       <button
//                         onClick={() => handleNavClick('/services', 'services')}
//                         className="w-full text-center py-3 text-sm font-semibold text-primary bg-primary/5 rounded-xl border border-primary/10 hover:bg-primary/10 transition-colors"
//                       >
//                         View Full Services Index
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//             {/* Mobile Auth Buttons */}
//             <div className="grid grid-cols-2 gap-3 mt-6 border-t border-gray-100 pt-6">
//               {user ? (
//                 <>
//                   <button
//                     onClick={() => handleNavClick('/dashboard', 'dashboard')}
//                     className="col-span-2 w-full px-4 py-3 bg-primary/5 text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors text-center"
//                   >
//                     Go to Dashboard
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => handleNavClick('/login', 'login')}
//                     className="w-full px-4 py-3 text-neutral-600 font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-center"
//                   >
//                     Log In
//                   </button>
//                   <button
//                     onClick={() => handleNavClick('/register', 'register')}
//                     className="w-full px-4 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors text-center"
//                   >
//                     Sign Up
//                   </button>
//                 </>
//               )}
//             </div>

//             <button
//               onClick={() => handleNavClick('/contact', 'contact')}
//               className="w-full px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors mt-4 shadow-md"
//             >
//               BOOK CONSULTATION
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Services Dropdown - Desktop */}
//       {isServicesHovered && (
//         <div
//           className="absolute top-full left-0 w-full z-50 flex justify-center pointer-events-auto"
//           onMouseEnter={() => handleMouseEnter(true)}
//           onMouseLeave={() => handleMouseLeave(true)}
//         >
//           {/* Invisible bridge to prevent closing when moving from nav to menu */}
//           <div className="absolute top-[-20px] left-0 w-full h-[20px]" />

//           <div className="bg-white shadow-2xl shadow-blue-900/10 border border-neutral-100 rounded-b-2xl w-[95vw] max-w-[1400px] flex max-h-[85vh]">
//             {/* Sidebar - Service Categories */}
//             <div className="w-80 bg-neutral-50/50 border-r border-neutral-100 py-6 px-4 shrink-0 flex flex-col gap-2 overflow-y-auto">
//               {SERVICE_CATEGORIES.map((category) => {
//                 const Icon = category.icon;
//                 const isActive = activeCategory === category.id;
//                 return (
//                   <button
//                     key={category.id}
//                     onMouseEnter={() => setActiveCategory(category.id)}
//                     onClick={() => handleNavClick(category.route, category.id)}
//                     className={cn(
//                       "w-full text-left px-5 py-4 transition-all text-[15px] font-semibold rounded-xl flex items-center gap-4 relative",
//                       isActive
//                         ? "bg-white text-primary shadow-lg shadow-neutral-200/50 ring-1 ring-neutral-100 scale-105 z-10"
//                         : "text-neutral-500 hover:bg-neutral-100/80 hover:text-neutral-700"
//                     )}
//                   >
//                     <Icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive ? "text-primary" : "text-neutral-400")} />
//                     <span>{category.title}</span>
//                     {isActive && <ChevronRight className="w-4 h-4 ml-auto text-primary" />}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Content Area - Service Details */}
//             <div className="flex-1 bg-white flex flex-col relative">
//               {activeCategory && (() => {
//                 const category = SERVICE_CATEGORIES.find(c => c.id === activeCategory);
//                 if (!category) return null;
//                 return (
//                   <div className="animate-in fade-in slide-in-from-right-2 duration-300 h-full flex flex-col">

//                     {/* Header Area - Off-White Background */}
//                     <div className="flex justify-between items-start p-8 bg-neutral-50 border-b border-neutral-100 shrink-0">
//                       <div>
//                         <h3 className="text-3xl font-bold font-display text-primary mb-2 display-font">{category.title}</h3>
//                         <p className="text-neutral-500 text-sm max-w-lg">
//                           Explore our professional {category.title.toLowerCase()} services tailored for your business.
//                         </p>
//                       </div>
//                       <Link
//                         to={category.route}
//                         onClick={() => setIsServicesHovered(false)}
//                         className="px-4 py-2 bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg border border-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center gap-2 group/btn"
//                       >
//                         Client Guide <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
//                       </Link>
//                     </div>

//                     {/* Main Content - White Background */}
//                     <div className="p-8 flex-1 flex flex-col">
//                       {/* Services Grid - 3 Columns */}
//                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full pb-3">
//                         {category.subServices.map((sub, index) => (
//                           <div
//                             key={sub.id}
//                             className="group relative hover:z-50"
//                             onMouseEnter={() => {
//                               // Optional: Pre-load logic if needed
//                             }}
//                           >
//                             <Link
//                               to={sub.route}
//                               onClick={() => {
//                                 if (!sub.subServices) {
//                                   setMobileMenuOpen(false);
//                                   setIsServicesHovered(false);
//                                 }
//                               }}
//                               className={cn(
//                                 "flex items-center justify-center p-4 rounded-xl border transition-all duration-300 h-full",
//                                 "bg-white border-blue-100 text-primary shadow-sm", // Default
//                                 "hover:bg-primary hover:border-primary hover:text-white hover:shadow-lg relative overflow-hidden", // Hover
//                                 "min-h-[80px] text-center backface-visibility-hidden"
//                               )}
//                             >
//                               <h4 className="font-bold text-[14px] leading-relaxed group-hover:text-white transition-colors">
//                                 {sub.name}
//                                 {sub.subServices && <ChevronRight className="w-4 h-4 inline-block ml-1 opacity-70 group-hover:text-white group-hover:opacity-100" />}
//                               </h4>
//                             </Link>

//                             {/* Nested Sub-services Dropdown */}
//                             {sub.subServices && (
//                               <div className="absolute top-[95%] left-0 w-80 pt-4 hidden group-hover:block z-[9999]">
//                                 <div className="bg-white rounded-xl shadow-2xl border border-neutral-100 overflow-hidden flex flex-col py-2 ring-1 ring-black/5">
//                                   {sub.subServices.map((nested) => (
//                                     <Link
//                                       key={nested.id}
//                                       to={nested.route}
//                                       onClick={() => {
//                                         setMobileMenuOpen(false);
//                                         setIsServicesHovered(false);
//                                       }}
//                                       className="text-left px-5 py-3 hover:bg-neutral-50 text-sm font-medium text-neutral-700 hover:text-primary transition-colors flex items-center gap-3 border-l-4 border-transparent hover:border-primary"
//                                     >
//                                       {/* Replaced dot with small arrow or just text for cleaner look */}
//                                       <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 group-hover:bg-primary transition-colors" />
//                                       {nested.name}
//                                     </Link>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>

//                       <div className="mt-auto pt-4 flex justify-center">
//                         <Link
//                           to={category.route}
//                           className="inline-flex items-center justify-center px-6 py-2.5 bg-neutral-50 text-neutral-700 text-sm font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300 group shadow-sm hover:shadow-md"
//                         >
//                           Manage All {category.title}
//                           <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })()}
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Menu, X, Phone, Mail, ChevronDown, ChevronRight, ArrowRight,
  Building2, Receipt, Scale,
  Landmark, PieChart, Calculator, User, BookOpen, LogOut, LayoutDashboard, Settings
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
};

// ============================================================
// MEMOIZED COMPONENTS FOR PERFORMANCE
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
      >
        <div className="flex items-center justify-between">
          <span>{service.name}</span>
          {hasNested && (
            <ChevronDown className={cn("w-4 h-4 flex-shrink-0 transition-transform duration-200", expanded && 'rotate-180')} />
          )}
        </div>
      </button>

      {hasNested && expanded && (
        <div className="ml-4 mt-2 space-y-2 pb-2">
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
        </div>
      )}
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
    <div className="group relative hover:z-50">
      <Link
        to={service.route}
        onClick={() => {
          if (!hasNested) {
            onNavigate(service.route, service.id);
          }
        }}
        className={cn(
          "flex items-center justify-center p-4 rounded-xl border transition-all duration-300 h-full",
          "bg-white border-blue-100 text-primary shadow-sm",
          "hover:bg-primary hover:border-primary hover:text-white hover:shadow-lg relative overflow-hidden",
          "min-h-[80px] text-center"
        )}
        onMouseEnter={() => hasNested && setShowNested(true)}
        onMouseLeave={() => setShowNested(false)}
      >
        <h4 className="font-bold text-[14px] leading-relaxed group-hover:text-white transition-colors">
          {service.name}
          {hasNested && <ChevronRight className="w-4 h-4 inline-block ml-1 opacity-70 group-hover:opacity-100" />}
        </h4>
      </Link>

      {/* Nested Sub-services Dropdown - Desktop Only */}
      {hasNested && showNested && (
        <div
          className="absolute top-[100%] left-0 w-full pt-3 z-[9999]"
          onMouseEnter={() => setShowNested(true)}
          onMouseLeave={() => setShowNested(false)}
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
        </div>
      )}
    </div>
  );
};

// ============================================================
// MAIN NAVIGATION COMPONENT
// ============================================================

export default function Navigation({ currentPage = '', onNavigate = () => { } }: NavigationProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(SERVICE_CATEGORIES[0].id);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  // ============================================================
  // EFFECTS
  // ============================================================

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsServicesHovered(false);
        setMobileServicesOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isServicesHovered) setIsServicesHovered(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isServicesHovered]);

  // ============================================================
  // EVENT HANDLERS
  // ============================================================

  const handleMouseEnter = useCallback((hasSubmenu: boolean) => {
    if (!hasSubmenu) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsServicesHovered(true);
  }, []);

  const handleMouseLeave = useCallback((hasSubmenu: boolean) => {
    if (!hasSubmenu) return;
    hoverTimeoutRef.current = setTimeout(() => {
      setIsServicesHovered(false);
      setActiveCategory(SERVICE_CATEGORIES[0].id);
    }, 150); // Reduced from 200ms for better UX
  }, []);

  const handleNavClick = useCallback((route: string, id: string) => {
    navigate(route);
    onNavigate(id);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setIsProfileOpen(false);
    setIsServicesHovered(false);
    setActiveCategory(SERVICE_CATEGORIES[0].id);
    setActiveMobileCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate, onNavigate]);

  const currentPath = location.pathname;

  // ============================================================
  // MEMOIZED VALUES
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
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      {/* ============================================================ */}
      {/* TOP BAR */}
      {/* ============================================================ */}
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

      {/* ============================================================ */}
      {/* MAIN NAVIGATION BAR */}
      {/* ============================================================ */}
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24 lg:h-28">
          {/* Logo Section */}
          <button
            onClick={() => handleNavClick('/', 'home')}
            className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <img
              src="/logo.png"
              alt="Company Logo"
              className="w-14 h-14  sm:w-20 sm:h-20 border border-gray-300 object-contain p-1 bg-white shadow-sm rounded-lg"
            />
            <div className="flex flex-col items-start gap-0.5">
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-primary font-display leading-tight uppercase">
                Avinash Payal & Associates
              </div>
              <div className="text-[10px] sm:text-sm md:text-base lg:text-xs xl:text-sm 2xl:text-base font-medium text-primary font-display leading-tight tracking-wide">
                Chartered Accountants
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 lg:gap-6 xl:gap-8 2xl:gap-12">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.id}
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter(!!item.hasSubmenu)}
                onMouseLeave={() => handleMouseLeave(!!item.hasSubmenu)}
              >
                <button
                  onClick={() => {
                    if (item.route && item.route !== '#') handleNavClick(item.route, item.id);
                  }}
                  className={cn(
                    "text-sm lg:text-base font-medium transition-colors relative flex items-center gap-1.5 py-2",
                    currentPage === item.id
                      ? 'text-primary'
                      : 'text-neutral-700 hover:text-primary'
                  )}
                  aria-expanded={item.hasSubmenu && isServicesHovered}
                  aria-haspopup={item.hasSubmenu}
                >
                  {item.label}
                  {item.hasSubmenu && (
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 opacity-70 transition-transform duration-200",
                        isServicesHovered && 'rotate-180'
                      )}
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left transition-transform",
                      currentPage === item.id ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                    )}
                    aria-hidden="true"
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Auth Buttons & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="menu"
                >
                  <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20">
                    <User className="w-5 h-5" />
                  </div>
                  <ChevronDown
                    className={cn("w-4 h-4 text-gray-500 transition-transform duration-200", isProfileOpen && "rotate-180")}
                    aria-hidden="true"
                  />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    role="menu"
                  >
                    <div className="px-4 py-3 border-b border-gray-50">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
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
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary flex items-center gap-2 transition-colors opacity-50 cursor-not-allowed"
                        disabled
                        role="menuitem"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                    </div>

                    <div className="border-t border-gray-50 py-1">
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                          navigate('/');
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                        role="menuitem"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
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
                if (window.location.pathname === '/') {
                  document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/#consultation-form');
                }
              }}
              className="px-3 py-3 lg:px-4 lg:py-2 xl:px-6 xl:py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-lg transform hover:-translate-y-0.5 text-xs lg:text-sm xl:text-base whitespace-nowrap"
            >
              GET EXPERT CA GUIDANCE
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE NAVIGATION */}
      {/* ============================================================ */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-neutral-200 shadow-xl max-h-[calc(100vh-100px)] overflow-y-auto pb-10">
          <div className="px-4 py-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (item.hasSubmenu) {
                      setMobileServicesOpen(!mobileServicesOpen);
                      setActiveMobileCategory(SERVICE_CATEGORIES[0].id);
                    } else if (item.route && item.route !== '#') {
                      handleNavClick(item.route, item.id);
                    }
                  }}
                  className={cn(
                    "block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-between",
                    currentPage === item.id
                      ? 'bg-primary text-white'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  )}
                  aria-expanded={item.hasSubmenu && mobileServicesOpen}
                  aria-haspopup={item.hasSubmenu}
                >
                  {item.label}
                  {item.hasSubmenu && (
                    <ChevronDown
                      className={cn("w-4 h-4 transition-transform", mobileServicesOpen ? 'rotate-180' : '')}
                      aria-hidden="true"
                    />
                  )}
                </button>

                {/* Mobile Services Submenu - Full Grid View */}
                {item.hasSubmenu && mobileServicesOpen && (
                  <div className="mt-2 bg-white border-t border-slate-200 py-4 max-h-[calc(100vh-250px)] overflow-y-auto">
                    {/* Category Tabs - Horizontal Scroll */}
                    <div className="px-4 mb-6 flex gap-2 overflow-x-auto pb-2">
                      {SERVICE_CATEGORIES.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setActiveMobileCategory(category.id)}
                          className={cn(
                            "px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all flex-shrink-0",
                            activeMobileCategory === category.id
                              ? 'bg-primary text-white shadow-md'
                              : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                          )}
                        >
                          {category.title}
                        </button>
                      ))}
                    </div>

                    {/* Active Category - Full Width Grid View */}
                    {activeMobileCategoryData && (
                      <div className="px-4">
                        {/* Category Title */}
                        <h3 className="text-lg font-bold text-primary mb-4">
                          {activeMobileCategoryData.title}
                        </h3>

                        {/* Services Grid (1 column) */}
                        <div className="grid grid-cols-1 gap-3">
                          {activeMobileCategoryData.subServices.map((service) => (
                            <MobileServiceItem
                              key={service.id}
                              service={service}
                              onNavigate={handleNavClick}
                            />
                          ))}
                        </div>

                        {/* View All Button - Full Width */}
                        <button
                          onClick={() => handleNavClick(activeMobileCategoryData.route, activeMobileCategoryData.id)}
                          className="w-full mt-6 px-4 py-3 text-center font-semibold text-primary bg-primary/5 rounded-lg border border-primary/20 hover:bg-primary hover:text-white transition-all"
                        >
                          View All {activeMobileCategoryData.title}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-6 border-t border-gray-100 pt-6">
              {user ? (
                <>
                  <button
                    onClick={() => handleNavClick('/dashboard', 'dashboard')}
                    className="col-span-2 w-full px-4 py-3 bg-primary/5 text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors text-center"
                  >
                    Go to Dashboard
                  </button>
                </>
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

            <button
              onClick={() => {
                if (window.location.pathname === '/') {
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
        </div>
      )}

      {/* ============================================================ */}
      {/* DESKTOP SERVICES DROPDOWN */}
      {/* ============================================================ */}
      {isServicesHovered && (
        <div
          ref={servicesRef}
          className="absolute top-full left-0 w-full z-50 flex justify-center pointer-events-auto"
          onMouseEnter={() => handleMouseEnter(true)}
          onMouseLeave={() => setIsServicesHovered(false)}
          role="menu"
          aria-label="Services menu"
        >
          {/* Invisible bridge to prevent closing when moving from nav to menu */}
          <div className="absolute top-[-25px] left-0 w-full h-[25px]" aria-hidden="true" />

          <div className="bg-white shadow-2xl shadow-blue-900/10 border border-neutral-100 rounded-b-2xl w-[95vw] max-w-[1400px] flex max-h-[85vh]">
            {/* Sidebar - Service Categories */}
            <div className="w-[320px] min-w-[320px] max-w-[320px] bg-neutral-50/50 border-r border-neutral-100 py-6 px-4 shrink-0 flex flex-col gap-2 overflow-y-auto">
              {SERVICE_CATEGORIES.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onMouseEnter={() => setActiveCategory(category.id)}
                    onClick={() => handleNavClick(category.route, category.id)}
                    className={cn(
                      "w-full text-left px-5 py-4 transition-colors text-[15px] font-semibold rounded-xl flex items-center gap-4 relative group",
                      isActive
                        ? "bg-primary text-white shadow-md z-10"
                        : "text-neutral-600 hover:bg-blue-500 hover:text-white"
                    )}
                    role="menuitem"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 shrink-0 transition-colors",
                        isActive ? "text-white" : "text-neutral-400 group-hover:text-white"
                      )}
                      aria-hidden="true"
                    />
                    <span className="flex-1 whitespace-nowrap">{category.title}</span>
                    <ChevronRight
                      className={cn(
                        "w-4 h-4 ml-auto transition-colors",
                        isActive ? "text-white" : "text-transparent group-hover:text-white"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>

            {/* Content Area - Service Details */}
            <div className="flex-1 bg-white flex flex-col relative">
              {activeCategoryData && (
                <div className="animate-in fade-in slide-in-from-right-2 duration-300 h-full flex flex-col">
                  {/* Header Area */}
                  <div className="flex justify-between items-start p-8 bg-neutral-50 border-b border-neutral-100 shrink-0">
                    <div>
                      <h3 className="text-3xl font-bold font-display text-primary mb-2">
                        {activeCategoryData.title}
                      </h3>
                      <p className="text-neutral-500 text-sm max-w-lg">
                        Explore our professional {activeCategoryData.title.toLowerCase()} services tailored for your business.
                      </p>
                    </div>
                    <Link
                      to="/all-services"
                      onClick={() => setIsServicesHovered(false)}
                      className="px-4 py-2 bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg border border-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center gap-2 group/btn"
                    >
                      All Services{' '}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                  </div>

                  {/* Main Content */}
                  <div className="p-8 flex-1 flex flex-col overflow-y-visible">
                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full pb-3">
                      {activeCategoryData.subServices.map((sub) => (
                        <DesktopServiceCard
                          key={sub.id}
                          service={sub}
                          onNavigate={handleNavClick}
                        />
                      ))}
                    </div>

                    {/* View All Button */}
                    <div className="mt-auto pt-6 flex justify-center">
                      <Link
                        to={activeCategoryData.route}
                        className="inline-flex items-center justify-center px-6 py-2.5 bg-neutral-50 text-neutral-700 text-sm font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300 group shadow-sm hover:shadow-md"
                      >
                        Manage All {activeCategoryData.title}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}