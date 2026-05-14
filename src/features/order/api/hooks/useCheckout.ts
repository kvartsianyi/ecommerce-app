import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { orderApi } from '..';
import type { CheckoutSessionDetails } from '@/shared/types';

export const useCheckout = (
  options?: Omit<
    UseMutationOptions<CheckoutSessionDetails, Error, void>,
    'mutationKey' | 'mutationFn' | 'onSuccess'
  >
) =>
  useMutation({
    mutationKey: ['checkout'],
    mutationFn: () => orderApi.checkout(),
    onSuccess: ({ paymentUrl }) => window.location.replace(paymentUrl),
    ...options,
  });
