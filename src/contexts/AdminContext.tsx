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
  clearError: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
