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
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load admin session on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const savedAdmin = localStorage.getItem('adminData');

    if (token && savedAdmin) {
      try {
        const userData = JSON.parse(savedAdmin);
        setAdminUser({
          id: userData.id,
          userId: userData.id,
          role: userData.role,
          isAdmin: true,
          name: userData.name,
          email: userData.email,
        });
      } catch (err) {
        console.error('Error parsing admin data:', err);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
      }
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
          body: JSON.stringify({ email, password })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Admin login failed');
      }

      // Save token and admin data (Separate from User)
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminData', JSON.stringify(data.admin));

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

  const adminLogout = useCallback(() => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setAdminUser(null);
  }, []);

  const verifyAdminAccess = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');

      if (!token) {
        setAdminUser(null);
        return false;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/verify-token`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        // Token invalid or expired
        adminLogout();
        return false;
      }

      const data = await response.json();

      if (data.valid && data.user) {
        setAdminUser({
          id: data.user.id,
          userId: data.user.id,
          role: data.user.role,
          isAdmin: true,
          name: data.user.name,
          email: data.user.email,
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
