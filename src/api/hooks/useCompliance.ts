import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '../client';
import type { ComplianceItem } from '../../types';

// Query keys
export const complianceKeys = {
  all: ['compliance'] as const,
  lists: () => [...complianceKeys.all, 'list'] as const,
  list: (filters?: { userId?: number; status?: string; dueBefore?: string; dueAfter?: string }) => 
    [...complianceKeys.lists(), filters] as const,
  my: () => [...complianceKeys.all, 'my'] as const,
  details: () => [...complianceKeys.all, 'detail'] as const,
  detail: (id: number) => [...complianceKeys.details(), id] as const,
};

// ============================================
// GET COMPLIANCE ITEMS HOOK
// ============================================

export const useComplianceItems = (filters?: { status?: string }) => {
  return useQuery({
    queryKey: complianceKeys.list(filters),
    queryFn: async () => {
      // Backend: GET /api/compliance-calendar → { events: ComplianceItem[] }
      const response = await api.get<ComplianceItem[] | { events: ComplianceItem[] }>('/compliance-calendar', {
        params: filters,
      });
      const items = Array.isArray(response) ? response : (response as any).events || [];
      return { items, count: items.length };
    },
    staleTime: 30 * 1000,
  });
};

// ============================================
// GET MY COMPLIANCE ITEMS HOOK
// ============================================

export const useMyComplianceItems = () => {
  return useQuery({
    queryKey: complianceKeys.my(),
    queryFn: async () => {
      const response = await api.get<ComplianceItem[] | { events: ComplianceItem[] }>('/compliance-calendar');
      const items = Array.isArray(response) ? response : (response as any).events || [];
      return { items, count: items.length };
    },
    staleTime: 30 * 1000,
  });
};

// ============================================
// CREATE COMPLIANCE ITEM HOOK
// ============================================

interface CreateComplianceData {
  userId?: number;
  title: string;
  description?: string;
  complianceType: ComplianceItem['complianceType'];
  dueDate: string;
  isRecurring?: boolean;
  recurringPeriod?: 'MONTHLY' | 'QUARTERLY' | 'ANNUALLY';
}

export const useCreateComplianceItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateComplianceData) => {
      const response = await api.post<ComplianceItem>('/compliance', data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: complianceKeys.lists() });
      toast.success('Compliance item created successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to create compliance item';
      toast.error('Create failed', { description: message });
    },
  });
};

// ============================================
// UPDATE COMPLIANCE ITEM HOOK
// ============================================

interface UpdateComplianceData extends Partial<CreateComplianceData> {
  id: number;
  status?: ComplianceItem['status'];
}

export const useUpdateComplianceItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: UpdateComplianceData) => {
      const { id, ...updateData } = data;
      const response = await api.put<ComplianceItem>(`/compliance/${id}`, updateData);
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: complianceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: complianceKeys.my() });
      queryClient.invalidateQueries({ queryKey: complianceKeys.detail(variables.id) });
      toast.success('Compliance item updated successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to update compliance item';
      toast.error('Update failed', { description: message });
    },
  });
};

// ============================================
// DELETE COMPLIANCE ITEM HOOK
// ============================================

export const useDeleteComplianceItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/compliance/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: complianceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: complianceKeys.my() });
      toast.success('Compliance item deleted successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to delete compliance item';
      toast.error('Delete failed', { description: message });
    },
  });
};
