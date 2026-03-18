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
  Briefcase,
  ArrowLeft,
  FileSearch
} from "lucide-react";
import { useAdmin } from "../contexts/AdminContext";
import { Button } from "../../components/ui/button";
import { ModeToggle } from "../../components/mode-toggle";
import { cn } from "../../components/ui/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { adminUser, adminLogout } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { 
      group: "Core Panel",
      items: [
        { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Users & Services", href: "/admin/users", icon: Users },
        { name: "Payments", href: "/admin/orders", icon: CreditCard },
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
        "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium mb-1 group",
        isActive
          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
          : "text-slate-400 hover:text-white hover:bg-slate-800"
      )}
    >
      <div className={cn(
        "transition-colors",
        isActive ? "text-white" : "text-slate-500 group-hover:text-white"
      )}>
        <item.icon className="w-5 h-5" />
      </div>
      <span className="text-sm">{item.name}</span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-outfit overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 bg-[#0F172A] flex-col shrink-0 h-screen overflow-hidden">
        <div className="h-20 flex items-center px-8 bg-[#0F172A] border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-lg tracking-tight block leading-none mb-0.5">PRODY</span>
              <span className="text-slate-500 text-[10px] font-medium uppercase tracking-[0.1em]">Admin Workspace</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-8">
            {navigation.map((group) => (
              <div key={group.group}>
                <p className="px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-[0.1em] mb-4">{group.group}</p>
                {group.items.map((item) => (
                  <NavItem 
                    key={item.name} 
                    item={item} 
                    isActive={location.pathname === item.href} 
                  />
                ))}
              </div>
            ))}
          </div>
        </nav>

        <div className="p-6 border-t border-slate-800 bg-[#0F172A] shrink-0">
          <div className="bg-slate-800/50 rounded-xl p-4 mb-4 border border-slate-700 hover:border-slate-600 transition-all group cursor-pointer" onClick={() => navigate('/admin/profile')}>
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 rounded-lg border border-slate-700">
                <AvatarImage src={adminUser?.avatar} />
                <AvatarFallback className="bg-slate-700 text-white font-bold rounded-lg group-hover:bg-indigo-600 transition-all">
                  {adminUser?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <p className="text-white font-semibold text-sm truncate">{adminUser?.name || 'Avinash Admin'}</p>
                <p className="text-slate-500 text-[10px] font-medium truncate uppercase tracking-widest">{adminUser?.role || 'ADMIN'}</p>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg w-full transition-all group font-semibold text-xs uppercase tracking-widest">
            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Secure Exit</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-20 md:h-20 px-6 md:px-10 flex items-center justify-between shrink-0 sticky top-0 z-40 transition-all">
          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 shadow-sm">
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-0.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.1em]">System Online</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight capitalize">
                {location.pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center relative px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-400 text-sm gap-3 w-64 lg:w-80 group focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/10 focus-within:border-indigo-500/20 transition-all">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none w-full text-slate-900 font-medium placeholder:text-slate-400 placeholder:font-normal"
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-3 p-1.5 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 shadow-sm hover:shadow transition-all pr-3 group" onClick={() => navigate('/admin/profile')}>
                <Avatar className="w-9 h-9 rounded-lg border border-slate-100">
                  <AvatarImage src={adminUser?.avatar} />
                  <AvatarFallback className="bg-slate-100 text-slate-700 font-bold rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    {adminUser?.name?.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <p className="text-[11px] font-bold text-slate-900 leading-none mb-1 uppercase tracking-tight">{adminUser?.name?.split(' ')[0] || 'Avinash'}</p>
                  <p className="text-[9px] font-medium text-slate-500 uppercase tracking-widest">Administrator</p>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>


      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="absolute left-0 top-0 bottom-0 w-[300px] bg-[#0F172A] p-8 shadow-2xl animate-in slide-in-from-left-full duration-300 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-white font-bold text-lg tracking-tight block leading-none mb-0.5 uppercase">PRODY</span>
                  <span className="text-slate-500 text-[10px] font-medium uppercase tracking-[0.1em]">Admin Panel</span>
                </div>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-slate-800/50 hover:bg-slate-800 rounded-xl transition-all border border-slate-700/50">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <nav className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-2">
              {navigation.map((group) => (
                <div key={group.group}>
                  <p className="px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-[0.1em] mb-4">{group.group}</p>
                  {group.items.map((item) => (
                    <NavItem 
                      key={item.name} 
                      item={item} 
                      isActive={location.pathname === item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                  ))}
                </div>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <div className="bg-slate-800/50 rounded-xl p-4 mb-4 border border-slate-700/30" onClick={() => { navigate('/admin/profile'); setIsMobileMenuOpen(false); }}>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 rounded-lg border border-slate-700">
                    <AvatarImage src={adminUser?.avatar} />
                    <AvatarFallback className="bg-indigo-600 text-white font-bold rounded-lg">
                      {adminUser?.name?.charAt(0) || 'A'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden">
                    <p className="text-white font-semibold text-sm truncate">{adminUser?.name || 'Administrator'}</p>
                    <p className="text-slate-500 text-[10px] font-medium truncate uppercase tracking-widest">{adminUser?.role || 'Full Access'}</p>
                  </div>
                </div>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg w-full transition-all font-bold text-[11px] uppercase tracking-widest border border-transparent hover:border-rose-500/20 group">
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Secure Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};