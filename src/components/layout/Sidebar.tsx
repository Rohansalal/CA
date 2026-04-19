import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useUIStore } from '../../store';
import {
  LayoutDashboard,
  TrendingUp,
  Target,
  Users,
  Settings,
  Briefcase,
  Layers,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut,
  Shield,
  ClipboardList,
  BookOpen,
  Wallet,
  Calendar,
  ShoppingCart,
  Ticket,
  FileText,
  Bell,
  MessageSquare,
  X,
  Inbox,
} from 'lucide-react';
import { useLogout } from '../../api/hooks/useAuth';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: number;
  children?: NavItem[];
}

interface NavSection {
  id: string;
  label: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    id: 'overview',
    label: 'Overview',
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { label: 'Insights', path: '/dashboard/insights', icon: BookOpen },
      { label: 'Expiry Dashboard', path: '/dashboard/expiry', icon: TrendingUp },
    ],
  },
  {
    id: 'sales',
    label: 'Sales & Leads',
    items: [
      { label: 'Leads', path: '/dashboard/leads', icon: Target },
    ],
  },
  {
    id: 'clients',
    label: 'Client Management',
    items: [
      { label: 'Clients', path: '/dashboard/clients', icon: Users },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    items: [
      { label: 'Categories', path: '/dashboard/services/categories', icon: Layers },
      { label: 'Services', path: '/dashboard/services', icon: Briefcase },
      { label: 'Submissions', path: '/dashboard/submissions', icon: Inbox },
    ],
  },
  {
    id: 'hrms',
    label: 'HRMS',
    items: [
      { label: 'Timesheets', path: '/dashboard/hrms/timesheets', icon: ClipboardList },
      { label: 'E-Diary', path: '/dashboard/hrms/ediary', icon: BookOpen },
      { label: 'Stipends', path: '/dashboard/hrms/stipends', icon: Wallet },
    ],
  },
  {
    id: 'system',
    label: 'System',
    items: [
      { label: 'Orders', path: '/dashboard/orders', icon: ShoppingCart },
      { label: 'Tickets', path: '/dashboard/tickets', icon: Ticket },
      { label: 'Documents', path: '/dashboard/documents', icon: FileText },
      { label: 'Consultations', path: '/dashboard/consultations', icon: MessageSquare },
      { label: 'Compliance', path: '/dashboard/compliance', icon: Calendar },
      { label: 'Notifications', path: '/dashboard/notifications', icon: Bell },
      { label: 'Settings', path: '/dashboard/settings', icon: Settings },
    ],
  },
];

function NavItemRow({
  item,
  collapsed,
  onNavigate,
  depth = 0,
}: {
  item: NavItem;
  collapsed: boolean;
  onNavigate?: () => void;
  depth?: number;
}) {
  const location = useLocation();
  const [open, setOpen] = useState(() => {
    if (!item.children) return false;
    return item.children.some((c) => location.pathname.startsWith(c.path));
  });

  const isActive =
    item.path === '/dashboard'
      ? location.pathname === '/dashboard'
      : location.pathname === item.path ||
        location.pathname.startsWith(item.path + '/') ||
        location.pathname.startsWith(item.path + '?');

  const Icon = item.icon;

  if (item.children && !collapsed) {
    return (
      <div>
        <button
          onClick={() => setOpen((p) => !p)}
          className={cn(
            'group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
            isActive
              ? 'bg-blue-50 text-blue-700'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          )}
        >
          <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600')} />
          <span className="flex-1 text-left truncate">{item.label}</span>
          <ChevronDown className={cn('w-3.5 h-3.5 text-slate-400 transition-transform duration-200', open && 'rotate-180')} />
        </button>
        {open && (
          <div className="ml-4 mt-1 space-y-0.5 border-l border-slate-200 pl-3">
            {item.children.map((child) => (
              <NavItemRow key={child.path} item={child} collapsed={false} onNavigate={onNavigate} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.path}
      end={item.path === '/dashboard'}
      onClick={onNavigate}
      className={cn(
        'group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
        isActive
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
        collapsed && 'justify-center px-0 py-3'
      )}
    >
      <Icon className={cn('w-4 h-4 shrink-0 transition-all', isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700')} />
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge !== undefined && item.badge > 0 && (
            <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-bold', isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700')}>
              {item.badge}
            </span>
          )}
        </>
      )}
      {collapsed && (
        <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
          {item.label}
        </div>
      )}
    </NavLink>
  );
}

function SidebarContent({
  collapsed,
  onNavigate,
  onClose,
  showCloseBtn = false,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
  onClose?: () => void;
  showCloseBtn?: boolean;
}) {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const logout = useLogout();
  const navigate = useNavigate();

  return (
    <>
      {/* Brand */}
      <div
        className="h-16 flex items-center px-4 border-b border-slate-200 cursor-pointer shrink-0"
        onClick={() => { navigate('/dashboard'); onNavigate?.(); }}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-600/30 shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="font-bold text-slate-900 text-sm leading-none truncate">Admin Panel</p>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5 truncate">Protech Planner CA</p>
            </div>
          )}
        </div>
        {!collapsed && !showCloseBtn && (
          <button
            onClick={(e) => { e.stopPropagation(); toggleSidebar(); }}
            className="ml-auto p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        {showCloseBtn && (
          <button
            onClick={(e) => { e.stopPropagation(); onClose?.(); }}
            className="ml-auto p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Scrollable nav */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar">
        {navSections.map((section) => (
          <div key={section.id}>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavItemRow key={item.path} item={item} collapsed={collapsed} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="shrink-0 p-3 border-t border-slate-200 space-y-1">
        {collapsed && (
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-full py-3 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={() => logout.mutate()}
          className={cn(
            'group flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all',
            collapsed && 'justify-center px-0'
          )}
        >
          <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform shrink-0" />
          {!collapsed && <span>Sign Out</span>}
          {collapsed && (
            <div className="absolute left-full ml-3 px-3 py-1.5 bg-red-600 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
              Sign Out
            </div>
          )}
        </button>
      </div>
    </>
  );
}

export function Sidebar() {
  const collapsed = useUIStore((state) => state.sidebarCollapsed);
  const mobileOpen = useUIStore((state) => state.sidebarOpen);
  const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname, setSidebarOpen]);

  // Close on ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSidebarOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [setSidebarOpen]);

  return (
    <>
      {/* ── Desktop sidebar (md+) ── */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out shadow-sm',
          'hidden md:flex',
          collapsed ? 'w-[72px]' : 'w-64'
        )}
      >
        <SidebarContent collapsed={collapsed} />
      </aside>

      {/* ── Mobile overlay backdrop ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-72 bg-white border-r border-slate-200 flex flex-col shadow-2xl',
          'md:hidden transition-transform duration-300 ease-in-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent
          collapsed={false}
          showCloseBtn
          onClose={() => setSidebarOpen(false)}
          onNavigate={() => setSidebarOpen(false)}
        />
      </aside>
    </>
  );
}
