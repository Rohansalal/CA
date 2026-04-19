import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '../client';
import type { User, UsersListResponse, UserFilters } from '../../types';

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: UserFilters) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

// GET /api/admin/users → { users: User[], count: number }
export const useUsers = (filters: UserFilters = {}) => {
  return useQuery({
    queryKey: userKeys.list(filters),
    queryFn: async () => {
      const response = await api.get<UsersListResponse>('/admin/users', { params: filters });
      return response;
    },
    staleTime: 30 * 1000,
  });
};

// GET /api/admin/users/:id → { user: User & { payments, documents, tickets } }
export const useUser = (id: number) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const response = await api.get<{ user: User }>(`/admin/users/${id}`);
      return response.user;
    },
    enabled: !!id && !isNaN(id),
    staleTime: 60 * 1000,
  });
};

// DELETE /api/admin/users/:id
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/admin/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success('User deleted successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to delete user';
      toast.error('Delete failed', { description: message });
    },
  });
};
