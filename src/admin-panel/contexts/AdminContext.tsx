import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import api from '../../utils/api';

interface AdminUser {
  id: number;
  userId: number;
  role: string;
  isAdmin: boolean;
  name: string;
  email: string;
  avatar?: string;
}

interface AdminContextType {
  adminUser: AdminUser | null;
  loading: boolean;
  error: string | null;
  isAdminAuthenticated: boolean;
  verifyAdminAccess: () => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<void>;
  adminLogout: () => void;
  clearError: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('adminData');
    if (saved) {
      try {
        const admin = JSON.parse(saved);
        return {
          id: admin.id,
          userId: admin.id,
          role: admin.role,
          isAdmin: true,
          name: admin.name,
          email: admin.email,
          avatar: admin.avatar,
        };
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(() => !!localStorage.getItem('adminToken'));
  const [error, setError] = useState<string | null>(null);

  // Load admin session on mount
  useEffect(() => {
    const checkAdminAuth = async () => {
      setLoading(true);
      try {
        const response = await api.get('/admin/profile');
        const data = response.data;
        const admin = data.admin || data;
        setAdminUser({
          id: admin.id,
          userId: admin.id,
          role: admin.role,
          isAdmin: true,
          name: admin.name,
          email: admin.email,
          avatar: admin.avatar,
        });
      } catch (err) {
        console.error('Admin session check failed', err);
      } finally {
        setLoading(false);
      }
    };

    // We can also check if adminData exists in localStorage as a hint
    if (localStorage.getItem('adminData')) {
      checkAdminAuth();
    }
  }, []);

  const adminLogin = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // The admin login route in the backend is actually under /api/auth/admin/login
      const response = await api.post('/auth/admin/login', { email, password });
      const data = response.data;

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminData', JSON.stringify(data.admin));
      setAdminUser({
        id: data.admin.id,
        userId: data.admin.id,
        role: data.admin.role,
        isAdmin: true,
        name: data.admin.name,
        email: data.admin.email,
        avatar: data.admin.avatar,
      });
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Admin login failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const adminLogout = useCallback(() => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setAdminUser(null);
  }, []);

  const verifyAdminAccess = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await api.get('/admin/profile');
      const data = response.data;
      const admin = data.admin || data;

      if (admin) {
        setAdminUser({
          id: admin.id,
          userId: admin.id,
          role: admin.role,
          isAdmin: true,
          name: admin.name,
          email: admin.email,
          avatar: admin.avatar,
        });
        return true;
      }

      adminLogout();
      return false;
    } catch (err) {
      console.error('Verification error', err);
      adminLogout();
      return false;
    } finally {
      setLoading(false);
    }
  }, [adminLogout]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = useMemo<AdminContextType>(() => ({
    adminUser,
    loading,
    error,
    isAdminAuthenticated: !!adminUser,
    verifyAdminAccess,
    adminLogin,
    adminLogout,
    clearError
  }), [adminUser, loading, error, verifyAdminAccess, adminLogin, adminLogout, clearError]);

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};










