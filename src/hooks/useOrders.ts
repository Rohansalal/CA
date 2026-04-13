import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '../utils/api';

// ── Key factory ─────────────────────────────────────────────────────────────
export const orderKeys = {
  all: ['orders'] as const,
  mine: () => [...orderKeys.all, 'mine'] as const,
  item: (id: number) => [...orderKeys.all, 'item', id] as const,
};

export interface OrderItem {
  id: number;
  orderId: number;
  serviceId: number;
  planId: number;
  serviceName: string;
  planType: string;
  price: number;
  orderNumber: string;
  orderStatus: string;
}

// GET /api/orders/items/:orderItemId
export const useOrderItem = (orderItemId: number) => {
  return useQuery({
    queryKey: orderKeys.item(orderItemId),
    queryFn: async () => {
      const res = await api.get<{ orderItem: OrderItem }>(`/orders/items/${orderItemId}`);
      return res.data.orderItem;
    },
    enabled: !!orderItemId,
    staleTime: 60_000,
  });
};

// POST /api/orders/create → { order: { id, items: [{ id, planType, ... }] } }
export const useCreateOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ serviceId, planId }: { serviceId: number; planId: number }) => {
      const res = await api.post<{ message: string; order: { id: number; items: OrderItem[] } }>(
        '/orders/create',
        { serviceId, planId },
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: orderKeys.mine() });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Failed to create order');
    },
  });
};
