import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '../client';
import type { Partner } from '../../types';

export const partnerKeys = {
  all: ['partners'] as const,
  lists: () => [...partnerKeys.all, 'list'] as const,
  list: (f?: object) => [...partnerKeys.lists(), f] as const,
  detail: (id: number) => [...partnerKeys.all, 'detail', id] as const,
};

export const usePartners = (filters?: { search?: string; status?: string; page?: number; limit?: number }) =>
  useQuery({ queryKey: partnerKeys.list(filters), queryFn: () => api.get('/admin/partners', { params: filters }), staleTime: 30_000 });

export const usePartner = (id: number) =>
  useQuery({ queryKey: partnerKeys.detail(id), queryFn: () => api.get<Partner>(`/admin/partners/${id}`), enabled: !!id });

export const useCreatePartner = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Partner>) => api.post<Partner>('/admin/partners', data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: partnerKeys.lists() }); toast.success('Partner added'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to add partner'),
  });
};

export const useUpdatePartner = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Partner> & { id: number }) => api.put<Partner>(`/admin/partners/${id}`, data),
    onSuccess: (_, v) => { qc.invalidateQueries({ queryKey: partnerKeys.lists() }); qc.invalidateQueries({ queryKey: partnerKeys.detail(v.id) }); toast.success('Partner updated'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to update partner'),
  });
};

export const useDeletePartner = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/admin/partners/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: partnerKeys.lists() }); toast.success('Partner deleted'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to delete partner'),
  });
};
