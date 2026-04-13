import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';

// ── Key factory ─────────────────────────────────────────────────────────────
export const serviceKeys = {
  all: ['services'] as const,
  lists: () => [...serviceKeys.all, 'list'] as const,
  list: (params?: Record<string, any>) => [...serviceKeys.lists(), params] as const,
  bySlug: (slug: string) => [...serviceKeys.all, 'slug', slug] as const,
  byId: (id: number) => [...serviceKeys.all, 'id', id] as const,
  formSchema: (id: number, planType: string) => [...serviceKeys.all, 'schema', id, planType] as const,
};

export interface ServicePlan {
  id: number;
  planType: string;
  price: string;
  discountedPrice?: string;
  shortTitle?: string;
  scopeSummary?: string;
  scopes: { id: number; title: string; isIncluded: boolean }[];
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  description?: string;
  category?: string;
  plans: ServicePlan[];
}

// GET /api/services/slug/:slug → { service }
export const useServiceBySlug = (slug: string) => {
  return useQuery({
    queryKey: serviceKeys.bySlug(slug),
    queryFn: async () => {
      const res = await api.get<{ service: Service }>(`/services/slug/${slug}`);
      return res.data.service;
    },
    enabled: !!slug,
    staleTime: 60_000,
  });
};

// GET /api/services/:id/form-schema/:planType
export const useFormSchema = (serviceId: number, planType: string) => {
  return useQuery({
    queryKey: serviceKeys.formSchema(serviceId, planType),
    queryFn: async () => {
      const res = await api.get(`/services/${serviceId}/form-schema/${planType}`);
      return res.data;
    },
    enabled: !!serviceId && !!planType,
    staleTime: 300_000,
  });
};
