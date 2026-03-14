import { api } from '@/shared/api';
import type { ApiResponse, Cart } from '@/shared/types';

export const cartApi = {
  fetchCart: async (): Promise<Cart> => {
    const res = await api.get('/cart');
    return res.data;
  },
  addToCart: async (id: number, quantity: number): Promise<Cart> => {
    const res = await api.post('/cart/items', { productId: id, quantity });
    return res.data;
  },
  updateQuantity: async (id: number, quantity: number): Promise<Cart> => {
    const res = await api.patch(`/cart/items/${id}`, { quantity });
    return res.data;
  },
  removeFromCart: async (id: number): Promise<ApiResponse<void>> =>
    api.delete(`/cart/items/${id}`),
};
