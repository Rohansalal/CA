import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '../client';
import type { Party } from '../../types';

export const partyKeys = {
  all: ['parties'] as const,
  lists: () => [...partyKeys.all, 'list'] as const,
  list: (f?: object) => [...partyKeys.lists(), f] as const,
  detail: (id: number) => [...partyKeys.all, 'detail', id] as const,
};

export const useParties = (filters?: { search?: string; clientId?: number; page?: number; limit?: number }) =>
  useQuery({ queryKey: partyKeys.list(filters), queryFn: () => api.get('/admin/parties', { params: filters }), staleTime: 30_000 });

export const useParty = (id: number) =>
  useQuery({ queryKey: partyKeys.detail(id), queryFn: () => api.get<Party>(`/admin/parties/${id}`), enabled: !!id });

export const useCreateParty = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Party>) => api.post<Party>('/admin/parties', data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: partyKeys.lists() }); toast.success('Party added'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to add party'),
  });
};

export const useUpdateParty = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Party> & { id: number }) => api.put<Party>(`/admin/parties/${id}`, data),
    onSuccess: (_, v) => { qc.invalidateQueries({ queryKey: partyKeys.lists() }); qc.invalidateQueries({ queryKey: partyKeys.detail(v.id) }); toast.success('Party updated'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to update party'),
  });
};

export const useDeleteParty = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/admin/parties/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: partyKeys.lists() }); toast.success('Party deleted'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to delete party'),
  });
};
