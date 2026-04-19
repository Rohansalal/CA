import { useQuery } from '@tanstack/react-query';
import { api } from '../client';
import type { Document } from '../../types';

export const documentKeys = {
  all: ['documents'] as const,
  lists: () => [...documentKeys.all, 'list'] as const,
  list: (filters?: any) => [...documentKeys.lists(), filters] as const,
};

export const useDocuments = (filters?: { page?: number; limit?: number; userId?: number }) => {
  return useQuery({
    queryKey: documentKeys.list(filters),
    queryFn: async () => {
      const response = await api.get<{ documents: Document[]; count: number }>('/documents', {
        params: filters,
      });
      return { items: response.documents || [], count: response.count || 0 };
    },
    staleTime: 60 * 1000,
  });
};

export const downloadDocument = async (id: number) => {
  const response = await api.get(`/documents/${id}/download`, { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([response as any]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `document_${id}`);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
};
