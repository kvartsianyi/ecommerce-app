import {
  type UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { cartApi } from '..';
import type { ApiResponse, Cart } from '@/shared/types';

type RemoveItemContext = {
  previousValue: Cart | undefined;
};

export const useRemoveFromCart = (
  options?: Omit<
    UseMutationOptions<ApiResponse<void>, Error, number, RemoveItemContext>,
    'mutationKey' | 'mutationFn'
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-from-cart'],
    mutationFn: (id: number) => cartApi.removeFromCart(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['cart'], exact: true }),
    ...options,
  });
};
