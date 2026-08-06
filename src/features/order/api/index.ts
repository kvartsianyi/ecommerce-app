import { api } from '@/shared/api';
import type { CheckoutBody, CheckoutResponse, OrderDetails } from '../types';

export const orderApi = {
  checkout: async (data: CheckoutBody): Promise<CheckoutResponse> => {
    const res = await api.post('orders', data);
    return res.data;
  },
  getOrderDetails: async (orderId: number): Promise<OrderDetails> => {
    const res = await api.get(`orders/${orderId}`);
    return res.data;
  },
};
