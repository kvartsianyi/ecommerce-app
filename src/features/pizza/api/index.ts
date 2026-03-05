import { api } from '@/shared/api';
import type { PaginatedApiResponse } from '@/shared/types';
import type { Product } from '../types';

export const productApi = {
  fetchProducts: async (): Promise<PaginatedApiResponse<Product[]>> =>
    api.get('/products'),
};
