import {
  type UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { cartApi } from '..';
import type { Cart } from '@/shared/types';
import type { UpdateCartItemPayload } from '../../types';
import { useDebouncedCallback } from '@/shared/hooks';

type UpdateQuantityContext = {
  previousValue: Cart | undefined;
};

export const useUpdateQuantity = (
  options?: Omit<
    UseMutationOptions<
      Cart,
      Error,
      UpdateCartItemPayload,
      UpdateQuantityContext
    >,
    'mutationKey' | 'mutationFn'
  >
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['cart-item-quantity'],
    mutationFn: ({ id, quantity = 1 }: UpdateCartItemPayload) =>
      cartApi.updateQuantity(id, quantity),
    onSuccess: (res) => queryClient.setQueryData(['cart'], res),
    onMutate: () => {
      const previousValue = queryClient.getQueryData<Cart>(['cart']);

      return { previousValue };
    },
    onError: (_, __, context) => {
      if (context?.previousValue) {
        queryClient.setQueryData(['cart'], context.previousValue);
      }
    },
    ...options,
  });

  const debouncedMutation = useDebouncedCallback(mutation.mutate, 300);

  const updateQuantity = async ({
    id,
    quantity = 1,
  }: UpdateCartItemPayload) => {
    queryClient.setQueryData<Cart>(['cart'], (old) => {
      if (!old) return;

      return {
        ...old,
        items: old?.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    });

    debouncedMutation({ id, quantity });
  };

  return {
    ...mutation,
    updateQuantity,
  };
};
