import { api } from '@/shared/api';
import type { ApiResponse, Cart } from '@/shared/types';

export const cartApi = {
  fetchCart: async (): Promise<ApiResponse<Cart>> => api.get('/cart'),
  addToCart: async (id: number, quantity: number): Promise<ApiResponse<Cart>> =>
    api.post('/cart/items', { productId: id, quantity }),
  updateQuantity: async (
    id: number,
    quantity: number
  ): Promise<ApiResponse<Cart>> => api.patch(`/cart/items/${id}`, { quantity }),
  removeFromCart: async (id: number): Promise<ApiResponse<void>> =>
    api.delete(`/cart/items/${id}`),
};
