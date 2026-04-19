import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '../client';
import type { Client } from '../../types';

export const clientKeys = {
  all: ['clients'] as const,
  lists: () => [...clientKeys.all, 'list'] as const,
  list: (f?: object) => [...clientKeys.lists(), f] as const,
  detail: (id: number) => [...clientKeys.all, 'detail', id] as const,
};

export const useClients = (filters?: { search?: string; status?: string; page?: number; limit?: number }) =>
  useQuery({
    queryKey: clientKeys.list(filters),
    queryFn: () => api.get('/admin/clients', { params: filters }),
    staleTime: 30_000,
  });

export const useClient = (id: number) =>
  useQuery({
    queryKey: clientKeys.detail(id),
    queryFn: () => api.get<Client>(`/admin/clients/${id}`),
    enabled: !!id,
  });

export const useCreateClient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Client>) => api.post<Client>('/admin/clients', data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: clientKeys.lists() }); toast.success('Client created'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to create client'),
  });
};

export const useUpdateClient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Client> & { id: number }) => api.put<Client>(`/admin/clients/${id}`, data),
    onSuccess: (_, v) => {
      qc.invalidateQueries({ queryKey: clientKeys.lists() });
      qc.invalidateQueries({ queryKey: clientKeys.detail(v.id) });
      toast.success('Client updated');
    },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to update client'),
  });
};

export const useDeleteClient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/admin/clients/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: clientKeys.lists() }); toast.success('Client deleted'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to delete client'),
  });
};
