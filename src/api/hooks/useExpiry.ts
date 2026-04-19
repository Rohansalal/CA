import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '../client';
import type { TradeLicense, EmiratesID, PassportRecord, TaxReturn } from '../../types';

// ─── Query keys ──────────────────────────────────────────────────────────────
export const expiryKeys = {
  summary: () => ['expiry', 'summary'] as const,
  tradeLicenses: (f?: object) => ['expiry', 'trade-licenses', f] as const,
  emiratesIds: (f?: object) => ['expiry', 'emirates-ids', f] as const,
  passports: (f?: object) => ['expiry', 'passports', f] as const,
  taxReturns: (f?: object) => ['expiry', 'tax-returns', f] as const,
};

// ─── Summary ─────────────────────────────────────────────────────────────────
export const useExpirySummary = () =>
  useQuery({
    queryKey: expiryKeys.summary(),
    queryFn: () => api.get('/admin/expiry/summary'),
    staleTime: 60_000,
  });

// ─── Trade Licenses ───────────────────────────────────────────────────────────
export const useTradeLicenses = (filters?: { days?: number; clientId?: number; page?: number; limit?: number }) =>
  useQuery({
    queryKey: expiryKeys.tradeLicenses(filters),
    queryFn: () => api.get('/admin/trade-licenses', { params: { ...filters, expiringSoon: filters?.days ?? 90 } }),
    staleTime: 30_000,
  });

export const useCreateTradeLicense = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<TradeLicense>) => api.post<TradeLicense>('/admin/trade-licenses', data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['expiry'] }); toast.success('Trade license added'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to add trade license'),
  });
};

export const useUpdateTradeLicense = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<TradeLicense> & { id: number }) => api.put<TradeLicense>(`/admin/trade-licenses/${id}`, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['expiry'] }); toast.success('Trade license updated'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to update'),
  });
};

export const useDeleteTradeLicense = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/admin/trade-licenses/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['expiry'] }); toast.success('Trade license deleted'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to delete'),
  });
};

// ─── Emirates IDs ─────────────────────────────────────────────────────────────
export const useEmiratesIDs = (filters?: { days?: number; page?: number; limit?: number }) =>
  useQuery({
    queryKey: expiryKeys.emiratesIds(filters),
    queryFn: () => api.get('/admin/emirates-ids', { params: { ...filters, expiringSoon: filters?.days ?? 90 } }),
    staleTime: 30_000,
  });

export const useCreateEmiratesID = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<EmiratesID>) => api.post<EmiratesID>('/admin/emirates-ids', data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['expiry'] }); toast.success('Emirates ID added'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to add'),
  });
};

// ─── Passports ────────────────────────────────────────────────────────────────
export const usePassports = (filters?: { days?: number; page?: number; limit?: number }) =>
  useQuery({
    queryKey: expiryKeys.passports(filters),
    queryFn: () => api.get('/admin/passports', { params: { ...filters, expiringSoon: filters?.days ?? 90 } }),
    staleTime: 30_000,
  });

export const useCreatePassport = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<PassportRecord>) => api.post<PassportRecord>('/admin/passports', data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['expiry'] }); toast.success('Passport record added'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to add'),
  });
};

// ─── Tax Returns ──────────────────────────────────────────────────────────────
export const useTaxReturns = (filters?: { days?: number; page?: number; limit?: number }) =>
  useQuery({
    queryKey: expiryKeys.taxReturns(filters),
    queryFn: () => api.get('/admin/tax-returns', { params: { ...filters, dueSoon: filters?.days ?? 90 } }),
    staleTime: 30_000,
  });

export const useCreateTaxReturn = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<TaxReturn>) => api.post<TaxReturn>('/admin/tax-returns', data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['expiry'] }); toast.success('Tax return added'); },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to add'),
  });
};
