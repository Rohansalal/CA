import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '../utils/api';
import { orderKeys } from './useOrders';

// POST /api/payments/manual-payment (multipart)
// FormData: orderId, method (MANUAL_QR | PAY_LATER), proof? (file)
export const useSubmitPayment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      method,
      proofFile,
    }: {
      orderId: number;
      method: 'MANUAL_QR' | 'PAY_LATER';
      proofFile?: File;
    }) => {
      const formData = new FormData();
      formData.append('orderId', String(orderId));
      formData.append('method', method === 'MANUAL_QR' ? 'MANUAL_QR' : 'PAY_LATER');
      if (method === 'MANUAL_QR' && proofFile) {
        formData.append('proof', proofFile);
      }
      const res = await api.post('/payments/manual-payment', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: orderKeys.mine() });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || 'Payment submission failed');
    },
  });
};
