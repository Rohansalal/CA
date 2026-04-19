import { Bell, Search, User, Settings, LogOut, ChevronDown, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { cn } from '../../utils/cn';
import { useUIStore, useAuthStore } from '../../store';
import { useLogout } from '../../api/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface HeaderProps {
  title: string;
  description?: string;
}

export function Header({ title, description }: HeaderProps) {
  const collapsed = useUIStore((state) => state.sidebarCollapsed);
  const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-30 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 transition-all duration-300 ease-in-out',
        // desktop: offset by sidebar width
        collapsed ? 'md:left-[72px]' : 'md:left-64',
        // mobile: always full width
        'left-0'
      )}
    >
      {/* Left side */}
      <div className="flex items-center gap-3 md:gap-8 min-w-0">
        {/* Hamburger — mobile only */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all shrink-0"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page title */}
        <div className="flex flex-col min-w-0">
          <h1 className="text-base md:text-xl font-bold text-slate-900 tracking-tight truncate">{title}</h1>
          {description && (
            <p className="text-[10px] md:text-xs font-medium text-slate-500 mt-0.5 truncate hidden sm:block">{description}</p>
          )}
        </div>

        {/* Global Search — desktop only */}
        <div className="relative max-w-sm w-full hidden lg:block group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <Input
            placeholder="Search documents, users, or tasks..."
            className="pl-11 pr-4 h-11 w-[320px] bg-slate-100 border-transparent focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative w-9 h-9 md:w-11 md:h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
        >
          <Bell className="h-4 w-4 md:h-5 md:w-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full" />
        </Button>

        {/* Settings — sm+ only */}
        <Button
          variant="ghost"
          size="icon"
          className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all hidden sm:flex"
        >
          <Settings className="h-4 w-4 md:h-5 md:w-5" />
        </Button>

        {/* Divider */}
        <div className="h-8 w-px bg-slate-200 hidden sm:block" />

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1 pr-2 md:pr-3 rounded-2xl hover:bg-slate-100 transition-all group outline-none">
              <div className="relative">
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-900/10 text-sm">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none">{user?.name || 'Admin User'}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">{user?.role || 'Admin'}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors hidden sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-slate-200 shadow-xl shadow-slate-900/5">
            <DropdownMenuLabel className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">My Account</DropdownMenuLabel>
            <DropdownMenuItem className="rounded-xl px-3 py-2.5 focus:bg-slate-100 cursor-pointer">
              <User className="mr-3 h-4 w-4 text-slate-500" />
              <span className="font-medium text-slate-700">View Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl px-3 py-2.5 focus:bg-slate-100 cursor-pointer">
              <Settings className="mr-3 h-4 w-4 text-slate-500" />
              <span className="font-medium text-slate-700">Account Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 bg-slate-100" />
            <DropdownMenuItem
              onClick={() => logout.mutate()}
              className="rounded-xl px-3 py-2.5 focus:bg-red-50 text-red-600 cursor-pointer"
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span className="font-bold">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
