import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AdminUser } from '../types';

// ============================================
// AUTH STORE
// ============================================

interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: AdminUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (user: AdminUser) => void;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      
      login: (user) => set({ 
        user, 
        isAuthenticated: true, 
        error: null,
        isLoading: false 
      }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false, 
        error: null,
        isLoading: false 
      }),
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'admin-auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

// ============================================
// UI STORE
// ============================================

interface UIState {
  sidebarCollapsed: boolean;
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  notifications: Notification[];
  
  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      sidebarOpen: true,
      theme: 'system',
      notifications: [],
      
      toggleSidebar: () => set((state) => ({ 
        sidebarCollapsed: !state.sidebarCollapsed 
      })),
      
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      
      setTheme: (theme) => set({ theme }),
      
      addNotification: (notification) => set((state) => ({
        notifications: [...state.notifications, notification],
      })),
      
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      })),
    }),
    {
      name: 'admin-ui-storage',
      partialize: (state) => ({ 
        sidebarCollapsed: state.sidebarCollapsed, 
        theme: state.theme 
      }),
    }
  )
);

// ============================================
// PERMISSIONS STORE
// ============================================

export const PERMISSIONS = {
  USERS: {
    VIEW: 'users:view',
    CREATE: 'users:create',
    UPDATE: 'users:update',
    DELETE: 'users:delete',
  },
  SERVICES: {
    VIEW: 'services:view',
    CREATE: 'services:create',
    UPDATE: 'services:update',
    DELETE: 'services:delete',
  },
  ORDERS: {
    VIEW: 'orders:view',
    UPDATE: 'orders:update',
    DELETE: 'orders:delete',
  },
  CONSULTATIONS: {
    VIEW: 'consultations:view',
    UPDATE: 'consultations:update',
    DELETE: 'consultations:delete',
  },
  TICKETS: {
    VIEW: 'tickets:view',
    UPDATE: 'tickets:update',
    DELETE: 'tickets:delete',
  },
  HRMS: {
    VIEW: 'hrms:view',
    MANAGE: 'hrms:manage',
  },
  COMPLIANCE: {
    VIEW: 'compliance:view',
    MANAGE: 'compliance:manage',
  },
  ANALYTICS: {
    VIEW: 'analytics:view',
  },
  SETTINGS: {
    VIEW: 'settings:view',
    UPDATE: 'settings:update',
  },
} as const;

interface PermissionsState {
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
}

export const usePermissions = (): PermissionsState => {
  const { user } = useAuthStore();
  
  const userPermissions = user?.permissions || [];
  const userRole = user?.role;
  
  // Super admin has all permissions
  const isSuperAdmin = userRole === 'SUPER_ADMIN';
  
  return {
    hasPermission: (permission: string) => {
      if (isSuperAdmin) return true;
      return userPermissions.includes(permission);
    },
    
    hasAnyPermission: (permissions: string[]) => {
      if (isSuperAdmin) return true;
      return permissions.some((p) => userPermissions.includes(p));
    },
    
    hasAllPermissions: (permissions: string[]) => {
      if (isSuperAdmin) return true;
      return permissions.every((p) => userPermissions.includes(p));
    },
  };
};
