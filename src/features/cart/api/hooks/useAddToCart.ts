import {
  type UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { cartApi } from '..';
import type { Cart } from '@/shared/types';
import type { AddToCartPayload } from '../../types';

export const useAddToCart = (
  options?: Omit<
    UseMutationOptions<Cart, Error, AddToCartPayload>,
    'mutationKey' | 'mutationFn' | 'onSuccess'
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['add-to-cart'],
    mutationFn: ({ id, quantity = 1 }: AddToCartPayload) =>
      cartApi.addToCart(id, quantity),
    onSuccess: (res) => queryClient.setQueryData(['cart'], res),
    ...options,
  });
};
