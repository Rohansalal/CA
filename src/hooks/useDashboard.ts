import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const dashboardKeys = {
  all: ['dashboard'] as const,
  services: () => [...dashboardKeys.all, 'services'] as const,
  profile: () => [...dashboardKeys.all, 'profile'] as const,
  notifications: () => [...dashboardKeys.all, 'notifications'] as const,
};

export interface UserService {
  id: number;
  orderId: number;
  orderItemId: number;
  serviceName: string;
  planType: string;
  price: number;
  orderNumber: string;
  status: string;
  createdAt: string;
  service?: {
    id: number;
    name: string;
    slug: string;
    description?: string;
    category?: string;
  };
}

// GET /api/orders/my-services → list of user's ordered services
export const useMyServices = () => {
  return useQuery({
    queryKey: dashboardKeys.services(),
    queryFn: async () => {
      const res = await api.get<{ services: UserService[] }>('/orders/my-services');
      return res.data.services || [];
    },
    staleTime: 30_000,
  });
};

// GET /api/users/profile → user profile
export const useProfile = () => {
  return useQuery({
    queryKey: dashboardKeys.profile(),
    queryFn: async () => {
      const res = await api.get('/users/profile');
      return res.data.user || res.data;
    },
    staleTime: 60_000,
  });
};
