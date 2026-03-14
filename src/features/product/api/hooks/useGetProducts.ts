import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

import { productApi } from '..';
import type { PaginatedApiResponse } from '@/shared/types';
import type { Product } from '../../types';

export const useGetProducts = (
  options?: Omit<
    UseQueryOptions<PaginatedApiResponse<Product[]>, Error>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['products'],
    queryFn: productApi.fetchProducts,
    ...options,
  });
