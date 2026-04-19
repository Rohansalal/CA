import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '../client';
import type { LeadChannel } from '../../types';

export const channelKeys = {
  all: ['lead-channels'] as const,
  lists: () => [...channelKeys.all, 'list'] as const,
  list: (f?: object) => [...channelKeys.lists(), f] as const,
};

export const useLeadChannels = (filters?: { search?: string }) =>
  useQuery({ queryKey: channelKeys.list(filters), queryFn: () => api.get('/admin/lead-channels', { params: filters }), staleTime: 60_000 });

export const useCreateLeadChannel = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<LeadChannel>) => api.post<LeadChannel>('/admin/lead-channels', data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: channelKeys.lists() }); toast.success('Channel created'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to create channel'),
  });
};

export const useUpdateLeadChannel = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<LeadChannel> & { id: number }) => api.put<LeadChannel>(`/admin/lead-channels/${id}`, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: channelKeys.lists() }); toast.success('Channel updated'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to update channel'),
  });
};

export const useDeleteLeadChannel = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/admin/lead-channels/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: channelKeys.lists() }); toast.success('Channel deleted'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to delete channel'),
  });
};
