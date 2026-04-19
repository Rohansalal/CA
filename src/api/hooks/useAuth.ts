import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '../client';
import { useAuthStore } from '../../store';
import type { AdminUser, LoginCredentials } from '../../types';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
};

// ============================================
// LOGIN HOOK
// ============================================

interface LoginResponse {
  token: string;
  admin: AdminUser;
  message?: string;
}

export const useLogin = () => {
  const loginStore = useAuthStore((state) => state.login);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await api.post<LoginResponse>('/auth/admin/login', credentials);
      return response;
    },
    onSuccess: (data) => {
      // Store token in localStorage for API requests
      localStorage.setItem('adminToken', data.token);
      // Add full permissions to admin user
      const adminWithPermissions = {
        ...data.admin,
        permissions: ['all']
      };
      localStorage.setItem('adminUser', JSON.stringify(adminWithPermissions));
      // Store user in auth state
      loginStore(adminWithPermissions);
      queryClient.setQueryData(authKeys.user(), adminWithPermissions);
      toast.success('Login successful', {
        description: `Welcome back, ${data.admin.name}!`,
      });
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Login failed';
      toast.error('Login failed', { description: message });
    },
  });
};

// ============================================
// LOGOUT HOOK
// ============================================

export const useLogout = () => {
  const logoutStore = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout');
    },
    onSuccess: () => {
      // Clear token from localStorage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      logoutStore();
      queryClient.clear(); // Clear all cached data
      toast.success('Logged out successfully');
      window.location.href = '/login';
    },
    onError: () => {
      // Even if the API call fails, clear local state
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      logoutStore();
      queryClient.clear();
      window.location.href = '/login';
    },
  });
};

// ============================================
// GET PROFILE HOOK
// ============================================

export const useProfile = () => {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: async () => {
      const response = await api.get<{ admin: AdminUser }>('/admin/profile');
      return response.admin;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// ============================================
// UPDATE PROFILE HOOK
// ============================================

interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);
  
  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const response = await api.put<{ admin: AdminUser }>('/admin/profile', data);
      return response.admin;
    },
    onSuccess: (data) => {
      setUser(data);
      queryClient.setQueryData(authKeys.user(), data);
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
      toast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to update profile';
      toast.error('Update failed', { description: message });
    },
  });
};

// ============================================
// VERIFY SESSION HOOK
// ============================================

export const useVerifySession = () => {
  const loginStore = useAuthStore((state) => state.login);
  const logoutStore = useAuthStore((state) => state.logout);
  
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: async () => {
      try {
        const response = await api.get<{ admin: AdminUser }>('/admin/profile');
        loginStore(response.admin);
        return response.admin;
      } catch (error) {
        logoutStore();
        throw error;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
