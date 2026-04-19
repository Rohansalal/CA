import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '../client';
import type { Ticket } from '../../types';

// Query keys
export const ticketKeys = {
  all: ['tickets'] as const,
  lists: () => [...ticketKeys.all, 'list'] as const,
  list: (filters?: { status?: string; priority?: string; page?: number; limit?: number }) => 
    [...ticketKeys.lists(), filters] as const,
  details: () => [...ticketKeys.all, 'detail'] as const,
  detail: (id: number) => [...ticketKeys.details(), id] as const,
};

// ============================================
// GET TICKETS HOOK
// ============================================

export const useTickets = (filters?: { status?: string; priority?: string; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ticketKeys.list(filters),
    queryFn: async () => {
      // Backend GET /api/tickets/all returns array directly
      const response = await api.get<Ticket[] | { tickets: Ticket[] }>('/tickets/all', { params: filters });
      // Handle both array and wrapped response
      const tickets = Array.isArray(response) ? response : (response as any).tickets || [];
      return { tickets, count: tickets.length };
    },
    staleTime: 30 * 1000,
  });
};

// ============================================
// GET TICKET BY ID HOOK
// ============================================

export const useTicket = (id: number) => {
  return useQuery({
    queryKey: ticketKeys.detail(id),
    queryFn: async () => {
      const response = await api.get<Ticket>(`/tickets/${id}`);
      return response;
    },
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};

// ============================================
// UPDATE TICKET STATUS HOOK
// ============================================

interface UpdateTicketData {
  id: number;
  status: Ticket['status'];
  priority?: Ticket['priority'];
}

export const useUpdateTicket = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: UpdateTicketData) => {
      const response = await api.put<Ticket>(`/tickets/${data.id}/status`, {
        status: data.status,
        priority: data.priority,
      });
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ticketKeys.detail(variables.id) });
      toast.success('Ticket updated successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to update ticket';
      toast.error('Update failed', { description: message });
    },
  });
};

// ============================================
// DELETE TICKET HOOK
// ============================================

export const useDeleteTicket = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/tickets/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.lists() });
      toast.success('Ticket deleted successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to delete ticket';
      toast.error('Delete failed', { description: message });
    },
  });
};
