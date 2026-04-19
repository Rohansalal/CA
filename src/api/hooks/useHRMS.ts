import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '../client';
import type { Timesheet, EDiaryEntry, StipendLog } from '../../types';

export const hrmsKeys = {
  all: ['hrms'] as const,
  timesheets: () => [...hrmsKeys.all, 'timesheets'] as const,
  timesheetList: (filters?: any) => [...hrmsKeys.timesheets(), filters] as const,
  eDiary: () => [...hrmsKeys.all, 'e-diary'] as const,
  eDiaryList: (filters?: any) => [...hrmsKeys.eDiary(), filters] as const,
  stipends: () => [...hrmsKeys.all, 'stipends'] as const,
  stipendList: (filters?: any) => [...hrmsKeys.stipends(), filters] as const,
};

// ── Timesheets ─────────────────────────────────────────────────────────────

// GET /api/hrms/timesheets/all → array of timesheets (admin)
export const useTimesheets = (filters?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: hrmsKeys.timesheetList(filters),
    queryFn: async () => {
      const response = await api.get<Timesheet[] | { timesheets: Timesheet[] }>('/hrms/timesheets/all', {
        params: filters,
      });
      const items = Array.isArray(response) ? response : (response as any).timesheets || [];
      return { items, count: items.length };
    },
    staleTime: 30 * 1000,
  });
};

export const useMyTimesheets = () => {
  return useQuery({
    queryKey: [...hrmsKeys.timesheets(), 'my'],
    queryFn: async () => {
      const response = await api.get<Timesheet[] | { timesheets: Timesheet[] }>('/hrms/timesheets');
      const items = Array.isArray(response) ? response : (response as any).timesheets || [];
      return { items, count: items.length };
    },
    staleTime: 30 * 1000,
  });
};

interface LogTimesheetData {
  clientId?: number;
  taskId?: number;
  orderId?: number;
  date: string;
  hoursWorked: number;
  description?: string;
  billable?: boolean;
  billableRate?: number;
  category?: string;
}

export const useLogTimesheet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: LogTimesheetData) => {
      return api.post('/hrms/timesheets', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: hrmsKeys.timesheets() });
      toast.success('Timesheet entry logged successfully');
    },
    onError: (error: any) => {
      toast.error('Error', { description: error.response?.data?.error || 'Failed to log timesheet' });
    },
  });
};

export const useApproveTimesheet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, approved }: { id: number; approved: boolean }) => {
      return api.put(`/hrms/timesheets/${id}/approve`, { approved });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: hrmsKeys.timesheets() });
      toast.success('Timesheet updated');
    },
    onError: (error: any) => {
      toast.error('Error', { description: error.response?.data?.error || 'Failed to update timesheet' });
    },
  });
};

// ── E-Diary ────────────────────────────────────────────────────────────────

// GET /api/hrms/e-diary → array (admin's own) | GET /api/hrms/e-diary/pending (admin)
export const useEDiaryEntries = (filters?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: hrmsKeys.eDiaryList(filters),
    queryFn: async () => {
      const response = await api.get<EDiaryEntry[] | { entries: EDiaryEntry[] }>('/hrms/e-diary', {
        params: filters,
      });
      const items = Array.isArray(response) ? response : (response as any).entries || [];
      return { items, count: items.length };
    },
    staleTime: 30 * 1000,
  });
};

export const useMyEDiaryEntries = () => {
  return useQuery({
    queryKey: [...hrmsKeys.eDiary(), 'my'],
    queryFn: async () => {
      const response = await api.get<EDiaryEntry[] | { entries: EDiaryEntry[] }>('/hrms/e-diary');
      const items = Array.isArray(response) ? response : (response as any).entries || [];
      return { items, count: items.length };
    },
    staleTime: 30 * 1000,
  });
};

interface LogDiaryEntryData {
  date: string;
  taskDescription: string;
  area?: string;
  hoursSpent: number;
  clientId?: number;
  remarks?: string;
}

export const useLogDiaryEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: LogDiaryEntryData) => {
      return api.post('/hrms/e-diary', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: hrmsKeys.eDiary() });
      toast.success('Diary entry logged successfully');
    },
    onError: (error: any) => {
      toast.error('Error', { description: error.response?.data?.error || 'Failed to log diary entry' });
    },
  });
};

export const useApproveDiaryEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: number; approved: boolean }) => {
      return api.put(`/hrms/e-diary/${id}/approve`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: hrmsKeys.eDiary() });
      toast.success('Diary entry approved');
    },
    onError: (error: any) => {
      toast.error('Error', { description: error.response?.data?.error || 'Failed to approve diary entry' });
    },
  });
};

// ── Stipends ───────────────────────────────────────────────────────────────

// GET /api/hrms/stipends → array (admin)
export const useStipendLogs = (filters?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: hrmsKeys.stipendList(filters),
    queryFn: async () => {
      const response = await api.get<StipendLog[] | { stipends: StipendLog[] }>('/hrms/stipends', {
        params: filters,
      });
      const items = Array.isArray(response) ? response : (response as any).stipends || [];
      return { items, count: items.length };
    },
    staleTime: 60 * 1000,
  });
};

interface RecordStipendData {
  articleId: number;
  month: string;
  amount: number;
  paymentMethod?: string;
}

export const useRecordStipend = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RecordStipendData) => {
      return api.post('/hrms/stipends', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: hrmsKeys.stipends() });
      toast.success('Stipend payment recorded successfully');
    },
    onError: (error: any) => {
      toast.error('Error', { description: error.response?.data?.error || 'Failed to record stipend' });
    },
  });
};
