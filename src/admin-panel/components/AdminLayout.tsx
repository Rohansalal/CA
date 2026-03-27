import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  CreditCard, 
  BarChart2, 
  Ticket, 
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
  Menu,
  Shield,
  X,
  Search,
  Bell,
  Sun,
  Moon,
  HelpCircle,
  Settings,
  Share2,
  ChevronDown,
  Box,
  Layers,
  Briefcase,
  ArrowLeft,
  FileSearch,
  UserCheck,
  FileText,
  Command,
  Activity,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdmin } from "../contexts/AdminContext";
import { Button } from "../../components/ui/button";
import { ModeToggle } from "../../components/mode-toggle";
import { cn } from "../../components/ui/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "../../components/ui/dropdown-menu";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { adminUser, adminLogout } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const navigation = [
    { 
      group: "Core Panel",
      items: [
        { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Users & Services", href: "/admin/users", icon: Users },
        { name: "Payments", href: "/admin/orders", icon: CreditCard },
        { name: "ITR Filings", href: "/admin/itr", icon: FileText },
      ]
    },
    {
      group: "Intelligence",
      items: [
        { name: "Analytics", href: "/admin/analytics", icon: BarChart2 },
        { name: "Tickets", href: "/admin/tickets", icon: Ticket },
        { name: "Consultations", href: "/admin/leads", icon: MessageSquare },
      ]
    },
    {
      group: "Resources",
      items: [
        { name: "CRM", href: "/admin/crm", icon: Box },
        { name: "HRMS", href: "/admin/hrms", icon: UserCheck },
        { name: "Asset Repository", href: "/admin/assets", icon: FileSearch },
        { name: "Tasks", href: "/admin/tasks", icon: Layers },
      ]
    }
  ];

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  const NavItem = ({ item, isActive, onClick }: { item: any, isActive: boolean, onClick?: () => void }) => (
    <Link
      to={item.href}
      onClick={onClick}
      className={cn(
        "group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 overflow-hidden",
        isActive
          ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      <div className="flex items-center gap-3 relative z-10">
        <item.icon className={cn(
          "w-4 h-4 transition-colors",
          isActive ? "text-white" : "text-slate-400 group-hover:text-slate-900"
        )} />
        <span>{item.name}</span>
      </div>
      {isActive && (
        <motion.div layoutId="adminActive" className="absolute inset-0 bg-slate-900 z-0 rounded-xl" />
      )}
      <ChevronRight className={cn(
        "h-3.5 w-3.5 transition-all",
        isActive ? "text-white/40 translate-x-0" : "text-slate-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
      )} />
    </Link>
  );

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900 overflow-hidden flex">
      {/* Sidebar - Desktop */}
      <aside className={cn(
        "hidden lg:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 z-40 shrink-0 h-screen",
        isSidebarOpen ? "w-72" : "w-20"
      )}>
        <div className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0">
          <Link to="/admin/dashboard" className="flex items-center gap-3 group outline-none">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Shield className="w-5 h-5 text-white" />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 tracking-tight leading-none mb-0.5">Admin Panel</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Firm Management</span>
              </div>
            )}
          </Link>
        </div>

        <nav className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-8">
          {navigation.map((group) => (
            <div key={group.group}>
              {isSidebarOpen && (
                <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                  {group.group}
                </p>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavItem 
                    key={item.name} 
                    item={item} 
                    isActive={location.pathname === item.href} 
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {isSidebarOpen && (
          <div className="p-6 pt-0 mt-auto">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                <Activity className="h-12 w-12 text-slate-900" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></div>
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none">Firm Health</p>
              </div>
              <p className="text-sm font-bold text-slate-900 mb-1">Status: Stable</p>
              <Button variant="outline" size="sm" className="w-full h-8 bg-white border-slate-200 text-[11px] font-bold rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all gap-2 mt-2">
                Diagnostics
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        <div className="p-4 border-t border-slate-100 flex justify-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-slate-400 hover:bg-slate-50 hover:text-slate-900 rounded-xl"
          >
            {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 px-6 flex items-center justify-between shrink-0 sticky top-0 z-40 transition-all">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="lg:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight capitalize leading-none mb-1">
                {location.pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Firm Operational</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            {/* Advanced Search Bar */}
            <div className="flex-1 max-w-md hidden md:block">
              <div className={cn(
                "relative transition-all duration-300 flex items-center bg-slate-100 rounded-xl px-3 group",
                isSearchFocused ? "ring-2 ring-blue-500/20 bg-white border-slate-300 shadow-sm" : "border-transparent"
              )}>
                <Search className={cn(
                  "h-4 w-4 transition-colors",
                  isSearchFocused ? "text-blue-600" : "text-slate-400"
                )} />
                <input
                  type="text"
                  placeholder="Universal search..."
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-64 h-9 px-3 bg-transparent border-none text-sm text-slate-900 placeholder:text-slate-400 focus:ring-0 outline-none"
                />
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white border border-slate-200 rounded-md shadow-sm">
                  <Command className="h-3 w-3 text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-400">/</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-100 rounded-lg relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 border-2 border-white rounded-full"></span>
              </Button>
              
              <div className="h-6 w-px bg-slate-200 mx-2 hidden sm:block" />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 p-1 pl-1 pr-2 hover:bg-slate-100 rounded-full transition-colors group outline-none">
                    <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-transparent group-hover:ring-slate-200 transition-all">
                      <AvatarImage src={adminUser?.avatar} />
                      <AvatarFallback className="bg-slate-900 text-white text-[10px] font-bold uppercase">
                        {adminUser?.name?.charAt(0) || 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex flex-col items-start text-left">
                      <span className="text-sm font-bold text-slate-900 leading-none mb-0.5">
                        {adminUser?.name?.split(' ')[0] || 'Administrator'}
                      </span>
                      <span className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter">
                        Firm Admin
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-2xl border-slate-200">
                  <DropdownMenuLabel className="px-3 py-3">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-bold text-slate-900">{adminUser?.name || 'Administrator'}</p>
                      <p className="text-xs text-slate-500 font-medium">{adminUser?.email || 'admin@firm.com'}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <div className="p-1">
                    <DropdownMenuItem onClick={() => navigate('/admin/profile')} className="rounded-lg h-10 cursor-pointer focus:bg-slate-50">
                      <User className="mr-3 h-4 w-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">Profile Portal</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/admin/settings')} className="rounded-lg h-10 cursor-pointer focus:bg-slate-50">
                      <Settings className="mr-3 h-4 w-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">Platform Settings</span>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <div className="p-1">
                    <DropdownMenuItem onClick={handleLogout} className="rounded-lg h-10 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="text-sm font-bold uppercase tracking-tight">Secure Sign Out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50">
          <div className="max-w-[1600px] mx-auto p-8 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-[300px] bg-white p-8 shadow-2xl z-[70] lg:hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-bold text-slate-900">Admin</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <nav className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-2">
                {navigation.map((group) => (
                  <div key={group.group}>
                    <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                      {group.group}
                    </p>
                    <div className="space-y-1">
                      {group.items.map((item) => (
                        <NavItem 
                          key={item.name} 
                          item={item} 
                          isActive={location.pathname === item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl w-full transition-all font-bold text-xs uppercase tracking-widest">
                  <LogOut className="w-4 h-4" />
                  <span>Secure Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};