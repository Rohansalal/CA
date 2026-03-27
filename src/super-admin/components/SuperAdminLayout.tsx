import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  CreditCard, 
  Settings, 
  BarChart3,
  Shield,
  Bell,
  Search,
  LogOut,
  Menu,
  X,
  ChevronDown,
  User,
  Activity,
  Command,
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuLabel
} from '../../components/ui/dropdown-menu';
import { useSuperAdmin } from '../contexts/SuperAdminContext';
import { cn } from '../../components/ui/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/super-admin/dashboard', category: 'Main' },
  { icon: Building2, label: 'CA Firms', path: '/super-admin/firms', category: 'Management' },
  { icon: Users, label: 'Platform Users', path: '/super-admin/users', category: 'Management' },
  { icon: CreditCard, label: 'Subscriptions', path: '/super-admin/subscriptions', category: 'Management' },
  { icon: BarChart3, label: 'Analytics', path: '/super-admin/analytics', category: 'Intelligence' },
  { icon: Activity, label: 'Audit Logs', path: '/super-admin/audit-logs', category: 'Intelligence' },
  { icon: Shield, label: 'Security Roles', path: '/super-admin/roles', category: 'System' },
  { icon: Settings, label: 'System Settings', path: '/super-admin/settings', category: 'System' },
];

export const SuperAdminLayout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminUser, logout } = useSuperAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/super-admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Professional Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="flex items-center justify-between h-full px-6">
          {/* Brand & Toggle */}
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-slate-100 rounded-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5 text-slate-600" /> : <Menu className="h-5 w-5 text-slate-600" />}
            </Button>
            
            <Link to="/super-admin/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 tracking-tight leading-none mb-0.5">Protech Planner</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Super Admin</span>
              </div>
            </Link>
          </div>

          {/* Advanced Search Bar */}
          <div className="flex-1 max-w-xl mx-12 hidden md:block">
            <div className={cn(
              "relative transition-all duration-300 flex items-center bg-slate-100 rounded-xl px-3",
              isSearchFocused ? "ring-2 ring-blue-500/20 bg-white border-slate-300 shadow-sm" : "border-transparent"
            )}>
              <Search className={cn(
                "h-4 w-4 transition-colors",
                isSearchFocused ? "text-blue-600" : "text-slate-400"
              )} />
              <input
                type="text"
                placeholder="Quick search (Ctrl + K)"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full h-10 px-3 bg-transparent border-none text-sm text-slate-900 placeholder:text-slate-400 focus:ring-0 outline-none"
              />
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white border border-slate-200 rounded-md shadow-sm">
                <Command className="h-3 w-3 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-400">K</span>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-100 rounded-lg relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 border-2 border-white rounded-full"></span>
            </Button>
            
            <Button variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-100 rounded-lg hidden sm:flex">
              <HelpCircle className="h-5 w-5" />
            </Button>

            <div className="h-6 w-px bg-slate-200 mx-2 hidden sm:block" />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 p-1 pl-1 pr-2 hover:bg-slate-100 rounded-full transition-colors group outline-none">
                  <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-transparent group-hover:ring-slate-200 transition-all">
                    <AvatarImage src={adminUser?.avatar} />
                    <AvatarFallback className="bg-slate-900 text-white text-[10px] font-bold">
                      {adminUser?.firstName?.[0] || 'A'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:flex flex-col items-start text-left">
                    <span className="text-sm font-bold text-slate-900 leading-none mb-0.5">
                      {adminUser?.firstName || 'Administrator'}
                    </span>
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter">
                      Platform Owner
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-2xl border-slate-200">
                <DropdownMenuLabel className="px-3 py-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold text-slate-900">{adminUser?.firstName} {adminUser?.lastName}</p>
                    <p className="text-xs text-slate-500 font-medium">{adminUser?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-100" />
                <div className="p-1">
                  <DropdownMenuItem onClick={() => navigate('/super-admin/profile')} className="rounded-lg h-10 cursor-pointer focus:bg-slate-50">
                    <User className="mr-3 h-4 w-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">My Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/super-admin/settings')} className="rounded-lg h-10 cursor-pointer focus:bg-slate-50">
                    <Settings className="mr-3 h-4 w-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">Account Settings</span>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator className="bg-slate-100" />
                <div className="p-1">
                  <DropdownMenuItem onClick={handleLogout} className="rounded-lg h-10 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700">
                    <LogOut className="mr-3 h-4 w-4" />
                    <span className="text-sm font-bold">Sign Out Platform</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Corporate Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 bottom-0 w-72 bg-white border-r border-slate-200 transition-all duration-300 z-40 overflow-y-auto",
          sidebarOpen ? "translate-x-0 shadow-xl lg:shadow-none" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6">
          {/* Navigation Categories */}
          {['Main', 'Management', 'Intelligence', 'System'].map((category) => (
            <div key={category} className="mb-8 last:mb-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 px-3">
                {category}
              </p>
              <div className="space-y-1">
                {menuItems
                  .filter(item => item.category === category)
                  .map((item) => {
                    const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                          "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative overflow-hidden",
                          isActive
                            ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        )}
                      >
                        <div className="flex items-center gap-3 relative z-10">
                          <item.icon className={cn("h-4 w-4 transition-colors", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-900")} />
                          <span>{item.label}</span>
                        </div>
                        {isActive && (
                          <motion.div layoutId="active" className="absolute inset-0 bg-slate-900 z-0 rounded-xl" />
                        )}
                        <ChevronRight className={cn(
                          "h-3.5 w-3.5 transition-all",
                          isActive ? "text-white/40 translate-x-0" : "text-slate-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                        )} />
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Improved Platform Stats Card */}
        <div className="mt-auto p-6 pt-0">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
              <Activity className="h-12 w-12 text-slate-900" />
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></div>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none">Global Health</p>
            </div>
            
            <p className="text-sm font-bold text-slate-900 mb-1">Operational Stable</p>
            <p className="text-[11px] text-slate-500 mb-4 font-medium">99.98% uptime recorded this month.</p>
            
            <Button variant="outline" size="sm" className="w-full h-8 bg-white border-slate-200 text-[11px] font-bold rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all gap-2">
              Status Page
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={cn(
        "pt-16 min-h-screen transition-all duration-300",
        sidebarOpen ? "lg:pl-72" : "pl-0"
      )}>
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
  );
};