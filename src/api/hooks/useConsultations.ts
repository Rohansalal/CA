import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '../client';
import type { Consultation, ConsultationsListResponse } from '../../types';

// Query keys
export const consultationKeys = {
  all: ['consultations'] as const,
  lists: () => [...consultationKeys.all, 'list'] as const,
  list: (filters?: { status?: string; page?: number; limit?: number }) => 
    [...consultationKeys.lists(), filters] as const,
  details: () => [...consultationKeys.all, 'detail'] as const,
  detail: (id: number) => [...consultationKeys.details(), id] as const,
};

// ============================================
// GET CONSULTATIONS HOOK
// ============================================

export const useConsultations = (filters?: { status?: string; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: consultationKeys.list(filters),
    queryFn: async () => {
      // Backend returns: { consultations: Consultation[], count: number }
      const response = await api.get<ConsultationsListResponse>('/admin/consultations', {
        params: filters,
      });
      return { items: response.consultations || [], count: response.count || 0 };
    },
    staleTime: 30 * 1000,
  });
};

// ============================================
// UPDATE CONSULTATION STATUS HOOK
// ============================================

interface UpdateConsultationData {
  id: number;
  status: Consultation['status'];
  fullName?: string;
  email?: string;
  mobile?: string;
  city?: string;
  description?: string;
}

export const useUpdateConsultation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: UpdateConsultationData) => {
      const { id, ...updateData } = data;
      const response = await api.put<{ consultation: Consultation }>(`/admin/consultations/${id}/status`, updateData);
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: consultationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: consultationKeys.detail(variables.id) });
      toast.success('Consultation updated successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to update consultation';
      toast.error('Update failed', { description: message });
    },
  });
};

// ============================================
// DELETE CONSULTATION HOOK
// ============================================

export const useDeleteConsultation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/admin/consultations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: consultationKeys.lists() });
      toast.success('Consultation deleted successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to delete consultation';
      toast.error('Delete failed', { description: message });
    },
  });
};
