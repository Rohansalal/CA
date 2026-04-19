import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../client';

export const submissionKeys = {
  all: ['submissions'] as const,
  lists: () => [...submissionKeys.all, 'list'] as const,
  list: (filters?: Record<string, any>) => [...submissionKeys.lists(), filters] as const,
  details: () => [...submissionKeys.all, 'detail'] as const,
  detail: (id: number) => [...submissionKeys.details(), id] as const,
};

export interface OrderInfo {
  orderId: number;
  orderNumber: string;
  totalAmount: number;
  paymentMode: 'PAY_NOW' | 'PAY_LATER';
  orderStatus: string;
  createdAt?: string;
}

export interface PaymentInfo {
  paymentId: number;
  status: string;
  amount: number;
  paymentProof?: string;
  createdAt?: string;
}

export interface AdminSubmission {
  id: number;
  userId: number;
  serviceId: number;
  planId: number;
  orderItemId?: number;
  status: string;
  formData: Record<string, any>;
  serviceName: string;
  planType: string;
  planTitle?: string;
  planPrice?: number;
  userName: string;
  userEmail: string;
  userPhone?: string;
  documentsCount: number;
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
  assignedTo?: string;
  order?: OrderInfo | null;
  payment?: PaymentInfo | null;
}

export interface SubmissionDocument {
  id: number;
  submissionId: number;
  docKey: string;
  fileName: string;
  fileType?: string;
  r2Key: string;
  fileSize?: number;
  uploadedBy: string;
  createdAt: string;
}

export interface FormSchemaField {
  id: number;
  fieldKey: string;
  fieldLabel: string;
  fieldType: string;
  fieldGroup?: string;
  minPlan: string;
  isRequired: boolean;
}

export interface AdminSubmissionDetail extends AdminSubmission {
  serviceSlug?: string;
  reviewedAt?: string;
  completedAt?: string;
}

// List all submissions (admin)
export const useAdminSubmissions = (filters?: { status?: string; serviceId?: number; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: submissionKeys.list(filters),
    queryFn: async () => {
      const res = await api.get<{
        submissions: AdminSubmission[];
        total: number;
        page: number;
        limit: number;
      }>('/admin/submissions', { params: filters });
      return res;
    },
    staleTime: 30_000,
  });
};

// Get single submission detail (admin)
export const useAdminSubmission = (id: number) => {
  return useQuery({
    queryKey: submissionKeys.detail(id),
    queryFn: async () => {
      const res = await api.get<{
        submission: AdminSubmissionDetail;
        documents: SubmissionDocument[];
        deliverables: any[];
        formSchema: FormSchemaField[];
        order: OrderInfo | null;
        payment: PaymentInfo | null;
      }>(`/admin/submissions/${id}`);
      return res;
    },
    enabled: !!id,
    staleTime: 30_000,
  });
};

// Update submission status
export const useUpdateSubmissionStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status, adminNotes }: { id: number; status: string; adminNotes?: string }) => {
      return api.put(`/admin/submissions/${id}/status`, { status, adminNotes });
    },
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: submissionKeys.lists() });
      qc.invalidateQueries({ queryKey: submissionKeys.detail(id) });
    },
  });
};

// Save admin notes
export const useSaveAdminNotes = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, notes }: { id: number; notes: string }) => {
      return api.post(`/admin/submissions/${id}/notes`, { notes });
    },
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: submissionKeys.detail(id) });
    },
  });
};
