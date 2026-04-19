import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '../client';
import type { Payment } from '../../types';

export const paymentKeys = {
  all: ['payments'] as const,
  lists: () => [...paymentKeys.all, 'list'] as const,
  list: (filters?: any) => [...paymentKeys.lists(), filters] as const,
};

export const usePayments = (filters?: { page?: number; limit?: number; status?: string; userId?: number }) => {
  return useQuery({
    queryKey: paymentKeys.list(filters),
    queryFn: async () => {
      const response = await api.get<{ payments: Payment[]; count: number }>('/admin/payments', {
        params: filters,
      });
      return {
        data: response.payments,
        pagination: {
          total: response.count,
          page: filters?.page || 1,
          limit: filters?.limit || 10,
          totalPages: Math.ceil(response.count / (filters?.limit || 10)),
        },
      };
    },
    staleTime: 60 * 1000,
  });
};

export const useVerifyPayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { id: number; status: string; notes?: string }) => {
      const { id, ...updateData } = data;
      const response = await api.post<{ payment: Payment }>(`/admin/payments/${id}/verify`, updateData);
      return response.payment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.lists() });
      toast.success('Payment verified successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to verify payment';
      toast.error('Verification failed', { description: message });
    },
  });
};
