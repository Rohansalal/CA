import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '../client';
import type { Service, ServiceCategory, ServicePlan, ServicesListResponse } from '../../types';

// Query keys
export const serviceKeys = {
  all: ['services'] as const,
  lists: () => [...serviceKeys.all, 'list'] as const,
  list: (filters?: { categoryId?: number }) => [...serviceKeys.lists(), filters] as const,
  details: () => [...serviceKeys.all, 'detail'] as const,
  detail: (id: number) => [...serviceKeys.details(), id] as const,
  categories: () => [...serviceKeys.all, 'categories'] as const,
  plans: (serviceId: number) => [...serviceKeys.all, 'plans', serviceId] as const,
};

// ============================================
// GET SERVICES HOOK
// ============================================

export const useServices = (filters?: { page?: number; limit?: number; categoryId?: number; search?: string }) => {
  return useQuery({
    queryKey: serviceKeys.list(filters),
    queryFn: async () => {
      const response = await api.get<{ services: Service[]; count: number }>('/admin/services', {
        params: filters,
      });
      return { items: response.services || [], count: response.count || 0 };
    },
    staleTime: 60 * 1000,
  });
};

// ============================================
// GET SERVICE BY ID HOOK
// ============================================

export const useServiceDetail = (id: number, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: serviceKeys.detail(id),
    queryFn: async () => {
      const response = await api.get<{ service: Service }>(`/admin/services/${id}`);
      return response.service;
    },
    enabled: options?.enabled !== false && !!id,
    staleTime: 60 * 1000,
  });
};

// ============================================
// CREATE SERVICE HOOK
// ============================================

interface CreateServiceData {
  categoryId: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  parentServiceId?: number;
  isActive?: boolean;
  order?: number;
  price?: number | string;
  plans?: Partial<ServicePlan>[];
}

export const useCreateService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateServiceData) => {
      const response = await api.post<{ service: Service }>('/admin/services', data);
      return response.service;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.lists() });
      toast.success('Service created successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to create service';
      toast.error('Create failed', { description: message });
    },
  });
};

// ============================================
// UPDATE SERVICE HOOK
// ============================================

interface UpdateServiceData extends Partial<CreateServiceData> {
  id: number;
}

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: UpdateServiceData) => {
      const { id, ...updateData } = data;
      const response = await api.put<{ service: Service }>(`/admin/services/${id}`, updateData);
      return response.service;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: serviceKeys.detail(variables.id) });
      toast.success('Service updated successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to update service';
      toast.error('Update failed', { description: message });
    },
  });
};

// ============================================
// DELETE SERVICE HOOK
// ============================================

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/admin/services/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.lists() });
      toast.success('Service deleted successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to delete service';
      toast.error('Delete failed', { description: message });
    },
  });
};

// ============================================
// GET CATEGORIES HOOK
// ============================================

export const useCategories = (filters?: { page?: number; limit?: number; search?: string }) => {
  return useQuery({
    queryKey: [...serviceKeys.categories(), filters],
    queryFn: async () => {
      const response = await api.get<{ categories: ServiceCategory[]; count: number }>('/admin/categories', {
        params: filters,
      });
      return { items: response.categories || [], count: response.count || 0 };
    },
    staleTime: 5 * 60 * 1000,
  });
};

// ============================================
// CREATE CATEGORY HOOK
// ============================================

interface CreateCategoryData {
  name: string;
  slug?: string;
  description?: string;
  icon?: string;
  order?: number;
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateCategoryData) => {
      const response = await api.post<{ category: ServiceCategory }>('/admin/categories', data);
      return response.category;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.categories() });
      toast.success('Category created successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to create category';
      toast.error('Create failed', { description: message });
    },
  });
};

// ============================================
// UPDATE CATEGORY HOOK
// ============================================

interface UpdateCategoryData extends Partial<CreateCategoryData> {
  id: number;
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: UpdateCategoryData) => {
      const { id, ...updateData } = data;
      const response = await api.put<{ category: ServiceCategory }>(`/admin/categories/${id}`, updateData);
      return response.category;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.categories() });
      toast.success('Category updated successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to update category';
      toast.error('Update failed', { description: message });
    },
  });
};

// ============================================
// DELETE CATEGORY HOOK
// ============================================

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/admin/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.categories() });
      toast.success('Category deleted successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to delete category';
      toast.error('Delete failed', { description: message });
    },
  });
};

// ============================================
// GET SERVICE PLANS HOOK
// ============================================

export const useServicePlans = (serviceId: number, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: serviceKeys.plans(serviceId),
    queryFn: async () => {
      const response = await api.get<{ plans: ServicePlan[] }>(`/admin/services/${serviceId}/plans`);
      return response.plans;
    },
    enabled: options?.enabled !== false && !!serviceId,
    staleTime: 60 * 1000,
  });
};

// ============================================
// UPDATE SINGLE PLAN (individual endpoint)
// ============================================

export const useUpdateSinglePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      planId: number;
      serviceId: number;
      price: number;
      discountedPrice: number | null;
      shortTitle: string;
      scopeSummary: string;
      isActive: boolean;
      scopes: { id?: number; title: string; isIncluded: boolean }[];
    }) => {
      const { planId, serviceId, ...body } = data;
      const response = await api.put<{ message: string; plan: ServicePlan }>(
        `/admin/plans/${planId}`,
        body
      );
      return { plan: response.plan, serviceId };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.plans(result.serviceId) });
      toast.success('Plan updated');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to update plan';
      toast.error('Update failed', { description: message });
    },
  });
};

// ============================================
// ADD A NEW PLAN TO A SERVICE
// ============================================

export const useAddServicePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { serviceId: number; planType: string }) => {
      const response = await api.post<{ message: string; plan: ServicePlan }>(
        `/admin/services/${data.serviceId}/plans`,
        { planType: data.planType, price: 0, isActive: true }
      );
      return { plan: response.plan, serviceId: data.serviceId };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.plans(result.serviceId) });
      toast.success('Plan added');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to add plan';
      toast.error('Add failed', { description: message });
    },
  });
};

// ============================================
// DELETE A PLAN
// ============================================

export const useDeleteServicePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { planId: number; serviceId: number }) => {
      await api.delete(`/admin/plans/${data.planId}`);
      return data.serviceId;
    },
    onSuccess: (serviceId) => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.plans(serviceId) });
      toast.success('Plan removed');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to delete plan';
      toast.error('Delete failed', { description: message });
    },
  });
};

// ============================================
// TOGGLE PLAN ACTIVE/INACTIVE
// ============================================

export const useToggleServicePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { planId: number; serviceId: number }) => {
      const response = await api.patch<{ message: string; isActive: boolean }>(
        `/admin/plans/${data.planId}/toggle`
      );
      return { isActive: response.isActive, serviceId: data.serviceId };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.plans(result.serviceId) });
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to toggle plan';
      toast.error('Toggle failed', { description: message });
    },
  });
};

// ============================================
// UPDATE SERVICE PLANS BULK (kept for compatibility, now upsert-only)
// ============================================

export const useUpdateServicePlansBulk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { serviceId: number; plans: ServicePlan[] }) => {
      const response = await api.put<{ message: string; plans: ServicePlan[] }>(
        `/admin/services/${data.serviceId}/plans`,
        { plans: data.plans }
      );
      return response.plans;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.plans(variables.serviceId) });
      toast.success('Pricing plans updated');
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Failed to update plans';
      toast.error('Update failed', { description: message });
    },
  });
};
