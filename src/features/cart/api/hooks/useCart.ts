import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

import { cartApi } from '..';
import type { Cart } from '@/shared/types';
import { useAuth } from '@/features/auth/api/hooks';

export const useCart = (
  options?: Omit<UseQueryOptions<Cart, Error, Cart>, 'queryKey' | 'queryFn'>
) => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['cart'],
    queryFn: cartApi.fetchCart,
    enabled: isAuthenticated,
    ...options,
  });
};
