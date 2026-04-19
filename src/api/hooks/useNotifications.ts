import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '../client';

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export const notificationKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationKeys.all, 'list'] as const,
};

export const useNotifications = () => {
  return useQuery({
    queryKey: notificationKeys.lists(),
    queryFn: async () => {
      const response = await api.get<{ notifications: Notification[] }>('/notifications/my');
      return response.notifications;
    },
    staleTime: 60 * 1000,
  });
};

export const useBroadcastNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { title: string; message: string; type: string }) => {
      await api.post('/notifications/admin/broadcast', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
      toast.success('Broadcast notification sent successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to broadcast notification';
      toast.error('Broadcast failed', { description: message });
    },
  });
};
