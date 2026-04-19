import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '../client';
import type { FeeFinalization } from '../../types';

export const feeKeys = {
  all: ['fee-finalizations'] as const,
  lists: () => [...feeKeys.all, 'list'] as const,
  list: (f?: object) => [...feeKeys.lists(), f] as const,
  detail: (id: number) => [...feeKeys.all, 'detail', id] as const,
};

export const useFeeFinalizaions = (filters?: { search?: string; status?: string; page?: number; limit?: number }) =>
  useQuery({
    queryKey: feeKeys.list(filters),
    queryFn: () => api.get('/admin/fee-finalizations', { params: filters }),
    staleTime: 30_000,
  });

export const useFeeFinalization = (id: number) =>
  useQuery({ queryKey: feeKeys.detail(id), queryFn: () => api.get<FeeFinalization>(`/admin/fee-finalizations/${id}`), enabled: !!id });

export const useCreateFeeFinalization = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<FeeFinalization>) => api.post<FeeFinalization>('/admin/fee-finalizations', data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: feeKeys.lists() }); toast.success('Fee proposal created'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to create'),
  });
};

export const useUpdateFeeFinalization = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<FeeFinalization> & { id: number }) => api.put<FeeFinalization>(`/admin/fee-finalizations/${id}`, data),
    onSuccess: (_, v) => { qc.invalidateQueries({ queryKey: feeKeys.lists() }); qc.invalidateQueries({ queryKey: feeKeys.detail(v.id) }); toast.success('Fee proposal updated'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to update'),
  });
};

export const useDeleteFeeFinalization = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/admin/fee-finalizations/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: feeKeys.lists() }); toast.success('Fee proposal deleted'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to delete'),
  });
};
