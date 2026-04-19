import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '../client';
import type { Lead, LeadPipelineStats } from '../../types';

// Query keys
export const leadKeys = {
  all: ['leads'] as const,
  lists: () => [...leadKeys.all, 'list'] as const,
  list: (filters?: { status?: string; page?: number; limit?: number }) => 
    [...leadKeys.lists(), filters] as const,
  stats: () => [...leadKeys.all, 'stats'] as const,
  details: () => [...leadKeys.all, 'detail'] as const,
  detail: (id: number) => [...leadKeys.details(), id] as const,
};

// ============================================
// GET LEADS HOOK
// ============================================

export const useLeads = (filters?: { status?: string; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: leadKeys.list(filters),
    queryFn: async () => {
      // Backend: GET /api/leads → { leads: Lead[], count: number }
      const response = await api.get<{ leads: Lead[]; count: number } | Lead[]>('/leads', { params: filters });
      const leads = Array.isArray(response) ? response : (response as any).leads || [];
      const count = Array.isArray(response) ? response.length : (response as any).count || leads.length;
      return { items: leads, count };
    },
    staleTime: 30 * 1000,
  });
};

// ============================================
// GET LEAD STATS HOOK
// ============================================

export const useLeadStats = () => {
  return useQuery({
    queryKey: leadKeys.stats(),
    queryFn: async () => {
      const response = await api.get<{
        stats: { total: number; new: number; followUp: number; converted: number; feeFinalization?: number; closedWon?: number; lost?: number };
        bySources: Record<string, number>;
      }>('/leads/stats');
      const s = (response as any).stats || response || {};
      const total = s.total || 0;
      const converted = (s.converted || 0) + (s.closedWon || 0);
      return {
        total,
        new: s.new || 0,
        followUp: s.followUp || 0,
        feeFinalization: s.feeFinalization || 0,
        converted: s.converted || 0,
        closedWon: s.closedWon || 0,
        lost: s.lost || 0,
        conversionRate: total > 0 ? (converted / total) * 100 : 0,
        bySources: (response as any).bySources || {},
      };
    },
    staleTime: 60_000,
    retry: false,
  });
};

// ============================================
// GET LEAD BY ID HOOK
// ============================================

export const useLead = (id: number) => {
  return useQuery({
    queryKey: leadKeys.detail(id),
    queryFn: async () => {
      const response = await api.get<Lead>(`/leads/${id}`);
      return response;
    },
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};

// ============================================
// CREATE LEAD HOOK
// ============================================

interface CreateLeadData {
  name: string;       // backend field is 'name'
  email?: string;
  phone?: string;
  source?: string;
  interestedService?: string;
  notes?: string;
}

export const useCreateLead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateLeadData) => {
      const response = await api.post<Lead>('/leads', data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leadKeys.lists() });
      queryClient.invalidateQueries({ queryKey: leadKeys.stats() });
      toast.success('Lead created successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to create lead';
      toast.error('Create failed', { description: message });
    },
  });
};

// ============================================
// UPDATE LEAD HOOK
// ============================================

interface UpdateLeadData extends Partial<CreateLeadData> {
  id: number;
  status?: Lead['status'];
}

export const useUpdateLead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: UpdateLeadData) => {
      const { id, ...updateData } = data;
      const response = await api.put<Lead>(`/leads/${id}`, updateData);
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: leadKeys.lists() });
      queryClient.invalidateQueries({ queryKey: leadKeys.stats() });
      queryClient.invalidateQueries({ queryKey: leadKeys.detail(variables.id) });
      toast.success('Lead updated successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to update lead';
      toast.error('Update failed', { description: message });
    },
  });
};

// ============================================
// DELETE LEAD HOOK
// ============================================

export const useDeleteLead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/leads/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leadKeys.lists() });
      queryClient.invalidateQueries({ queryKey: leadKeys.stats() });
      toast.success('Lead deleted successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to delete lead';
      toast.error('Delete failed', { description: message });
    },
  });
};
