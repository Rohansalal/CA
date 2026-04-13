import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '../utils/api';

// ── Key factory ─────────────────────────────────────────────────────────────
export const submissionKeys = {
  all: ['submissions'] as const,
  mine: () => [...submissionKeys.all, 'mine'] as const,
  detail: (id: number) => [...submissionKeys.all, 'detail', id] as const,
};

export interface Submission {
  id: number;
  userId: number;
  serviceId: number;
  planId: number;
  orderItemId?: number;
  status: string;
  formData: Record<string, any>;
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
}

export interface SubmissionDoc {
  id: number;
  submissionId: number;
  docKey: string;
  fileName: string;
  fileType?: string;
  r2Key: string;
  fileSize?: number;
}

// GET /api/submissions/:id
export const useSubmission = (id: number) => {
  return useQuery({
    queryKey: submissionKeys.detail(id),
    queryFn: async () => {
      const res = await api.get<{
        submission: Submission;
        documents: SubmissionDoc[];
        deliverables: any[];
      }>(`/submissions/${id}`);
      return res.data;
    },
    enabled: !!id,
    staleTime: 30_000,
  });
};

// POST /api/submissions → create DRAFT
export const useCreateSubmission = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      serviceId,
      planId,
      orderItemId,
    }: {
      serviceId: number;
      planId: number;
      orderItemId: number;
    }) => {
      const res = await api.post<{ submission: Submission }>('/submissions', {
        serviceId,
        planId,
        orderItemId,
      });
      return res.data.submission;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: submissionKeys.mine() });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Failed to create submission');
    },
  });
};

// PUT /api/submissions/:id → save form data (progressive merge)
export const useSaveSubmission = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: number;
      formData: Record<string, any>;
    }) => {
      const res = await api.put(`/submissions/${id}`, { formData });
      return res.data;
    },
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: submissionKeys.detail(id) });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Failed to save');
    },
  });
};

// POST /api/submissions/:id/documents (multipart)
export const useUploadDocument = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      submissionId,
      docKey,
      file,
    }: {
      submissionId: number;
      docKey: string;
      file: File;
    }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('docKey', docKey);
      const res = await api.post(`/submissions/${submissionId}/documents`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
    onSuccess: (_, { submissionId }) => {
      qc.invalidateQueries({ queryKey: submissionKeys.detail(submissionId) });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Upload failed');
    },
  });
};

// POST /api/submissions/:id/submit → submit for review
export const useSubmitForReview = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.post(`/submissions/${id}/submit`);
      return res.data;
    },
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: submissionKeys.detail(id) });
      qc.invalidateQueries({ queryKey: submissionKeys.mine() });
    },
    onError: (err: any) => {
      const data = err.response?.data;
      if (data?.missingFields?.length) {
        toast.error(`Missing: ${data.missingFields.map((f: any) => f.label).join(', ')}`);
      } else if (data?.missingDocs?.length) {
        toast.error(`Missing docs: ${data.missingDocs.map((d: any) => d.label).join(', ')}`);
      } else {
        toast.error(data?.error || 'Submission failed');
      }
    },
  });
};
