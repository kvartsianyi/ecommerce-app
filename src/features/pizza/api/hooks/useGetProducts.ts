import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

import { productApi } from '..';
import type { PaginatedApiResponse } from '@/shared/types';
import type { Product } from '../../types';

export const useGetProducts = (
  options?: Omit<
    UseQueryOptions<PaginatedApiResponse<Product[]>, Error>,
    'queryKey' | 'queryFn'
  >
) => {
  const query = useQuery({
    queryKey: ['products'],
    queryFn: productApi.fetchProducts,
    placeholderData: { data: [], meta: {} },
    ...options,
  });

  return {
    ...query,
    products: query.data!.data,
    meta: query.data!.meta,
  };
};
