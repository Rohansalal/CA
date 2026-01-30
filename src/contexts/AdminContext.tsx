import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
}

interface AdminContextType {
  adminUser: AdminUser | null;
  loading: boolean;
  error: string | null;
  isAdminAuthenticated: boolean;
  verifyAdminAccess: () => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<void>;
  clearError: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Note: We don't automatically load admin user on mount to enforce strict verification via verifyAdminAccess
  // But we can check if there's an existing token and user role
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        const userData = JSON.parse(user);
        if (userData.role === 'ADMIN' || userData.role === 'SUPER_ADMIN') {
          setAdminUser({
            id: userData.id,
            userId: userData.id,
            role: userData.role,
            isAdmin: true
          });
        }
      } catch (err) {
        console.error('Error parsing user data:', err);
      }
    }
  }, []);

  const adminLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/login`,
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

      // Save token and user data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setAdminUser({
        id: data.user.id,
        userId: data.user.id,
        role: data.user.role,
        isAdmin: true
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Admin login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyAdminAccess = async (): Promise<boolean> => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');

      if (!token) {
        setError('No authentication token');
        return false;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/verify`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        setError('Admin access denied');
        return false;
      }

      const data = await response.json();

      if (data.isAdmin && (data.role === 'ADMIN' || data.role === 'SUPER_ADMIN')) {
        setAdminUser({
          id: data.userId,
          userId: data.userId,
          role: data.role,
          isAdmin: true
        });
        return true;
      }

      return false;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Verification failed';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AdminContextType = {
    adminUser,
    loading,
    error,
    isAdminAuthenticated: !!adminUser && adminUser.isAdmin,
    verifyAdminAccess,
    adminLogin,
    clearError
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
