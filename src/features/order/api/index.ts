import { api } from '@/shared/api';

export const orderApi = {
  checkout: async (): Promise<{ paymentUrl: string }> => {
    const res = await api.post('orders');
    return res.data;
  },
};
