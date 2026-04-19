import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '../client';
import type { WorkflowTemplate } from '../../types';

export const workflowKeys = {
  all: ['workflow-templates'] as const,
  lists: () => [...workflowKeys.all, 'list'] as const,
  list: (f?: object) => [...workflowKeys.lists(), f] as const,
  detail: (id: number) => [...workflowKeys.all, 'detail', id] as const,
};

export const useWorkflowTemplates = (filters?: { search?: string; serviceId?: number }) =>
  useQuery({
    queryKey: workflowKeys.list(filters),
    queryFn: () => api.get('/admin/workflow-templates', { params: filters }),
    staleTime: 60_000,
  });

export const useWorkflowTemplate = (id: number) =>
  useQuery({ queryKey: workflowKeys.detail(id), queryFn: () => api.get<WorkflowTemplate>(`/admin/workflow-templates/${id}`), enabled: !!id });

export const useCreateWorkflowTemplate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<WorkflowTemplate>) => api.post<WorkflowTemplate>('/admin/workflow-templates', data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: workflowKeys.lists() }); toast.success('Template created'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to create template'),
  });
};

export const useUpdateWorkflowTemplate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<WorkflowTemplate> & { id: number }) =>
      api.put<WorkflowTemplate>(`/admin/workflow-templates/${id}`, data),
    onSuccess: (_, v) => {
      qc.invalidateQueries({ queryKey: workflowKeys.lists() });
      qc.invalidateQueries({ queryKey: workflowKeys.detail(v.id) });
      toast.success('Template updated');
    },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to update template'),
  });
};

export const useDeleteWorkflowTemplate = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/admin/workflow-templates/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: workflowKeys.lists() }); toast.success('Template deleted'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to delete template'),
  });
};
