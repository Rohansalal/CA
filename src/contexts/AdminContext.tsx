import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface AdminUser {
  id: number;
  userId: number;
  role: string;
  isAdmin: boolean;
  name: string;
  email: string;
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
        const token = localStorage.getItem('adminToken');
        const headers: HeadersInit = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/profile`, {
          headers,
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          const admin = data.admin || data;
          setAdminUser({
            id: admin.id,
            userId: admin.id,
            role: admin.role,
            isAdmin: true,
            name: admin.name,
            email: admin.email,
          });
        }
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
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admin/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include'
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Admin login failed');
      }

      // Save admin data
      localStorage.setItem('adminData', JSON.stringify(data.admin));
      if (data.token) {
        localStorage.setItem('adminToken', data.token);
      }

      setAdminUser({
        id: data.admin.id,
        userId: data.admin.id,
        role: data.admin.role,
        isAdmin: true,
        name: data.admin.name,
        email: data.admin.email,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Admin login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const adminLogout = useCallback(async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout failed:', err);
    }
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setAdminUser(null);
  }, []);

  const verifyAdminAccess = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const headers: HeadersInit = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/profile`, // Updated verify endpoint
        {
          method: 'GET',
          headers,
          credentials: 'include'
        }
      );

      if (!response.ok) {
        adminLogout();
        return false;
      }

      const data = await response.json();
      const admin = data.admin || data;

      if (admin) {
        setAdminUser({
          id: admin.id,
          userId: admin.id,
          role: admin.role,
          isAdmin: true,
          name: admin.name,
          email: admin.email,
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
