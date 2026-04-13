import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../../utils/api';
import { AUTH_MODE, getUserToken, removeUserToken, setUserToken } from '../../utils/auth';

interface UserProfile {
  businessName?: string;
  gstNumber?: string;
  panNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  avatar?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  profile?: UserProfile;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User | undefined>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setUserData: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in on mount.
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const token = getUserToken();
        if (AUTH_MODE === 'bearer' && !token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const response = await api.get('/auth/me');
        setUser(response.data.user);
      } catch (err: any) {
        // Don't redirect on auth check failure - just clear user
        if (err.response?.status === 401 || err.response?.status === 403) {
          if (AUTH_MODE === 'bearer') {
            removeUserToken();
          }
          setUser(null);
        } else if (err.response?.status !== 401 && err.response?.status !== 403) {
          console.error('Network or system error during auth check:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<User | undefined> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/auth/login', { email, password });
      const data = response.data;
      if (data.token && AUTH_MODE === 'bearer') {
        setUserToken(data.token);
      }
      setUser(data.user);
      return data.user;
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || err.message || 'Login failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, phone: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/register', { name, email, phone, password });
      const data = response.data;
      if (data.token && AUTH_MODE === 'bearer') {
        setUserToken(data.token);
      }
      setUser(data.user);
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || err.message || 'Registration failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Logout request failed:', err);
    } finally {
      if (AUTH_MODE === 'bearer') {
        removeUserToken();
      }
      setUser(null);
      setError(null);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const setUserData = (user: User) => {
    setUser(user);
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    clearError,
    setUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};








