import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '../client';
import type { Entity } from '../../types';

export const entityKeys = {
  all: ['entities'] as const,
  lists: () => [...entityKeys.all, 'list'] as const,
  list: (f?: object) => [...entityKeys.lists(), f] as const,
  detail: (id: number) => [...entityKeys.all, 'detail', id] as const,
};

export const useEntities = (filters?: { search?: string; clientId?: number; status?: string; page?: number; limit?: number }) =>
  useQuery({ queryKey: entityKeys.list(filters), queryFn: () => api.get('/admin/entities', { params: filters }), staleTime: 30_000 });

export const useEntity = (id: number) =>
  useQuery({ queryKey: entityKeys.detail(id), queryFn: () => api.get<Entity>(`/admin/entities/${id}`), enabled: !!id });

export const useCreateEntity = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Entity>) => api.post<Entity>('/admin/entities', data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: entityKeys.lists() }); toast.success('Entity created'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to create entity'),
  });
};

export const useUpdateEntity = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Entity> & { id: number }) => api.put<Entity>(`/admin/entities/${id}`, data),
    onSuccess: (_, v) => { qc.invalidateQueries({ queryKey: entityKeys.lists() }); qc.invalidateQueries({ queryKey: entityKeys.detail(v.id) }); toast.success('Entity updated'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to update entity'),
  });
};

export const useDeleteEntity = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/admin/entities/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: entityKeys.lists() }); toast.success('Entity deleted'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to delete entity'),
  });
};
