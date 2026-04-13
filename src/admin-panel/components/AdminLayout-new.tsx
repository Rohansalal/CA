import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  BarChart3, 
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
  Settings,
  ChevronDown,
  Briefcase,
  FileText,
  Layers,
  Building2,
  Wallet,
  TrendingUp,
  FolderKanban,
  ClipboardList,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdmin } from "../contexts/AdminContext";
import { Button } from "../../components/ui/button";
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

  // Professional navigation structure
  const navigation = [
    { 
      group: "Dashboard",
      items: [
        { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
      ]
    },
    { 
      group: "Operations",
      items: [
        { name: "Clients", href: "/admin/users", icon: Users },
        { name: "Services", href: "/admin/services", icon: Briefcase },
        { name: "Orders", href: "/admin/orders", icon: ClipboardList },
        { name: "Payments", href: "/admin/payments", icon: Wallet },
      ]
    },
    {
      group: "Compliance",
      items: [
        { name: "ITR Filings", href: "/admin/itr", icon: FileText },
        { name: "GST & Tax", href: "/admin/tax", icon: Building2 },
      ]
    },
    {
      group: "Management",
      items: [
        { name: "Support Tickets", href: "/admin/tickets", icon: Ticket },
        { name: "Tasks", href: "/admin/tasks", icon: Layers },
        { name: "Leads", href: "/admin/leads", icon: TrendingUp },
        { name: "Calendar", href: "/admin/calendar", icon: Calendar },
      ]
    },
    {
      group: "Analytics",
      items: [
        { name: "Reports", href: "/admin/analytics", icon: BarChart3 },
        { name: "CRM", href: "/admin/crm", icon: FolderKanban },
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
        "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-blue-600 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      )}
    >
      <item.icon className={cn(
        "w-4 h-4 transition-colors",
        isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"
      )} />
      <span className="truncate">{item.name}</span>
      {isActive && (
        <motion.div 
          layoutId="activeIndicator" 
          className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full" 
        />
      )}
    </Link>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-hidden flex">
      {/* Sidebar - Desktop */}
      <aside className={cn(
        "hidden lg:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 z-40 shrink-0 h-screen",
        isSidebarOpen ? "w-64" : "w-16"
      )}>
        {/* Logo Section */}
        <div className="h-16 flex items-center px-4 border-b border-slate-200 shrink-0">
          <Link to="/admin/dashboard" className="flex items-center gap-3 group outline-none">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Shield className="w-5 h-5 text-white" />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900 leading-none">CA Admin</span>
                <span className="text-xs text-slate-500 leading-none mt-0.5">Firm Management</span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto space-y-6">
          {navigation.map((group) => (
            <div key={group.group}>
              {isSidebarOpen && (
                <p className="px-3 text-xs font-medium text-slate-400 mb-2">
                  {group.group}
                </p>
              )}
              <div className="space-y-0.5">
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

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-200">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full text-slate-500 hover:text-slate-700 hover:bg-slate-100"
          >
            {isSidebarOpen ? (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span className="text-xs">Collapse</span>
              </>
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between shrink-0 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            
            {/* Breadcrumb / Page Title */}
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-slate-900">
                {navigation.flatMap(g => g.items).find(item => item.href === location.pathname)?.name || "Dashboard"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center">
              <div className={cn(
                "relative flex items-center bg-slate-100 rounded-lg px-3 py-1.5 transition-all",
                isSearchFocused ? "ring-2 ring-blue-500/20 bg-white" : ""
              )}>
                <Search className={cn(
                  "h-4 w-4 transition-colors",
                  isSearchFocused ? "text-blue-600" : "text-slate-400"
                )} />
                <input
                  type="text"
                  placeholder="Search..."
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-48 h-8 px-2 bg-transparent border-none text-sm text-slate-900 placeholder:text-slate-400 focus:ring-0 outline-none"
                />
              </div>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700 hover:bg-slate-100">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={adminUser?.avatar} />
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-medium">
                      {adminUser?.name?.charAt(0) || 'A'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-medium text-slate-900">
                      {adminUser?.name || 'Administrator'}
                    </span>
                    <span className="text-xs text-slate-500">
                      {adminUser?.role || 'Admin'}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-slate-900">{adminUser?.name || 'Administrator'}</p>
                    <p className="text-xs text-slate-500">{adminUser?.email || 'admin@firm.com'}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/admin/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-700 focus:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="max-w-7xl mx-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
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
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white shadow-xl z-50 lg:hidden flex flex-col"
            >
              {/* Mobile Header */}
              <div className="h-16 flex items-center px-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-slate-900">CA Admin</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="ml-auto p-2 hover:bg-slate-100 rounded-lg">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 py-4 px-3 overflow-y-auto space-y-6">
                {navigation.map((group) => (
                  <div key={group.group}>
                    <p className="px-3 text-xs font-medium text-slate-400 mb-2">
                      {group.group}
                    </p>
                    <div className="space-y-0.5">
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

              {/* Mobile Footer */}
              <div className="p-4 border-t border-slate-200">
                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
