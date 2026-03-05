import { api } from '@/shared/api';
import type { ApiResponse } from '@/shared/types';
import type { Pizza } from '../types';

export const pizzaApi = {
  fetchProducts: async (): Promise<ApiResponse<Pizza[]>> =>
    api.get('/products'),
};
