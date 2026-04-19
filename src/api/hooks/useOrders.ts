import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '../client';
import type { Order, OrdersListResponse, Payment } from '../../types';

export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (filters?: { status?: string; page?: number; limit?: number }) =>
    [...orderKeys.lists(), filters] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: number) => [...orderKeys.details(), id] as const,
  payments: () => [...orderKeys.all, 'payments'] as const,
};

// GET /api/admin/orders → { orders: Order[], count: number }
export const useOrders = (filters?: { status?: string; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: orderKeys.list(filters),
    queryFn: async () => {
      const response = await api.get<OrdersListResponse>('/admin/orders', { params: filters });
      return response;
    },
    staleTime: 30 * 1000,
  });
};

// GET /api/orders/:id (user-facing, for detail)
export const useOrder = (id: number) => {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: async () => {
      const response = await api.get<{ order: Order }>(`/orders/${id}`);
      return response.order;
    },
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};

interface UpdateOrderData {
  id: number;
  status: Order['status'];
  notes?: string;
}

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateOrderData) => {
      const response = await api.put<{ order: Order }>(`/admin/orders/${data.id}`, {
        status: data.status,
        notes: data.notes,
      });
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(variables.id) });
      toast.success('Order status updated');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to update order';
      toast.error('Update failed', { description: message });
    },
  });
};

// GET /api/payments → { payments: Payment[] } (admin)
export const usePayments = (filters?: { status?: string; page?: number }) => {
  return useQuery({
    queryKey: [...orderKeys.payments(), filters],
    queryFn: async () => {
      const response = await api.get<{ payments: Payment[]; count: number }>('/payments', {
        params: filters,
      });
      return response;
    },
    staleTime: 30 * 1000,
  });
};

interface VerifyPaymentData {
  paymentId: number;
  verified: boolean;
  notes?: string;
}

export const useVerifyManualPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: VerifyPaymentData) => {
      const response = await api.post('/payments/verify-manual', data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.payments() });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      toast.success('Payment verified successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to verify payment';
      toast.error('Verification failed', { description: message });
    },
  });
};
