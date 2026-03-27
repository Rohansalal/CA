import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import api from '../../utils/api';

interface SuperAdminUser {
  id: number;
  email: string;
  role: string;
  name?: string;
}

interface SuperAdminContextType {
  adminUser: SuperAdminUser | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  verifyAccess: () => Promise<boolean>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const SuperAdminContext = createContext<SuperAdminContextType | undefined>(undefined);

export const SuperAdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<SuperAdminUser | null>(() => {
    const saved = localStorage.getItem('superAdminData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(() => !!localStorage.getItem('superAdminToken'));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem('superAdminToken')) {
        setLoading(true);
        try {
          const response = await api.get('/super-admin/profile');
          if (response.data.success) {
            setAdminUser(response.data.data);
          }
        } catch (err) {
          console.error('Session check failed', err);
          localStorage.removeItem('superAdminToken');
          localStorage.removeItem('superAdminData');
        } finally {
          setLoading(false);
        }
      }
    };
    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/admin/login', { email, password });
      const data = response.data;

      if (data.admin && data.admin.role !== 'SUPER_ADMIN') {
        throw new Error('Access denied. Super Admin only.');
      }

      if (data.token) {
        localStorage.setItem('superAdminToken', data.token);
      }
      const userData = {
        id: data.admin?.id,
        email: data.admin?.email,
        role: data.admin?.role,
        name: data.admin?.name
      };
      localStorage.setItem('superAdminData', JSON.stringify(userData));
      setAdminUser(userData);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.message || 'Login failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('superAdminToken');
    localStorage.removeItem('superAdminData');
    setAdminUser(null);
  }, []);

  const verifyAccess = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      const token = localStorage.getItem('superAdminToken');
      if (!token) return false;

      const response = await api.get('/super-admin/profile');
      if (response.data.success) {
        setAdminUser(response.data.data);
        return true;
      }
      return false;
    } catch (err) {
      logout();
      return false;
    } finally {
      setLoading(false);
    }
  }, [logout]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = useMemo<SuperAdminContextType>(() => ({
    adminUser, loading, error, isAuthenticated: !!adminUser, verifyAccess, login, logout, clearError
  }), [adminUser, loading, error, verifyAccess, login, logout, clearError]);

  return <SuperAdminContext.Provider value={value}>{children}</SuperAdminContext.Provider>;
};

export const useSuperAdmin = () => {
  const context = useContext(SuperAdminContext);
  if (context === undefined) {
    throw new Error('useSuperAdmin must be used within a SuperAdminProvider');
  }
  return context;
};
