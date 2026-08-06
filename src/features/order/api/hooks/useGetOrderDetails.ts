import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

import { orderApi } from '..';
import type { OrderDetails } from '../../types';

export const useGetOrderDetails = (
  orderId: number,
  options?: Omit<UseQueryOptions<OrderDetails, Error>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderApi.getOrderDetails(orderId),
    ...options,
  });
