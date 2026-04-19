import { useQuery } from '@tanstack/react-query';
import { api } from '../client';
import type {
  DashboardData,
  GrowthAnalyticsResponse,
  ServiceAnalyticsResponse,
} from '../../types';

export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  growth: () => [...dashboardKeys.all, 'growth'] as const,
  services: () => [...dashboardKeys.all, 'services'] as const,
  revenue: () => [...dashboardKeys.all, 'revenue'] as const,
};

/** Stop polling when query is in error state (prevents 401 spam) */
function stopOnError(intervalMs: number) {
  return (query: { state: { error: unknown } }) =>
    query.state.error ? false : intervalMs;
}

// GET /api/admin/dashboard/stats
export const useDashboardStats = () => {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: async () => {
      const response = await api.get<DashboardData>('/admin/dashboard/stats');
      return response;
    },
    staleTime: 30_000,
    refetchInterval: stopOnError(60_000),
    retry: false,
  });
};

// GET /api/admin/analytics/growth
export const useGrowthAnalytics = () => {
  return useQuery({
    queryKey: dashboardKeys.growth(),
    queryFn: async () => {
      const response = await api.get<GrowthAnalyticsResponse>('/admin/analytics/growth');
      return response;
    },
    staleTime: 5 * 60_000,
    refetchInterval: false,
    retry: false,
  });
};

// GET /api/admin/analytics/services
export const useServicesAnalytics = () => {
  return useQuery({
    queryKey: dashboardKeys.services(),
    queryFn: async () => {
      const response = await api.get<ServiceAnalyticsResponse>('/admin/analytics/services');
      return response;
    },
    staleTime: 5 * 60_000,
    refetchInterval: false,
    retry: false,
  });
};

// GET /api/admin/analytics/revenue
export const useRevenueAnalytics = (period: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly') => {
  return useQuery({
    queryKey: [...dashboardKeys.revenue(), period],
    queryFn: async () => {
      const response = await api.get(`/admin/analytics/revenue?period=${period}`);
      return response;
    },
    staleTime: 5 * 60_000,
    refetchInterval: false,
    retry: false,
  });
};
