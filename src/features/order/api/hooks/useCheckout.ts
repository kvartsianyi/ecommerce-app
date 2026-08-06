import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { orderApi } from '..';
import type { CheckoutSessionDetails } from '@/shared/types';
import type { CheckoutBody } from '../../types';
import { router } from '@/app/providers/router';

export const useCheckout = (
  options?: Omit<
    UseMutationOptions<CheckoutSessionDetails, Error, CheckoutBody>,
    'mutationKey' | 'mutationFn' | 'onSuccess'
  >
) =>
  useMutation({
    mutationKey: ['checkout'],
    mutationFn: (data: CheckoutBody) => orderApi.checkout(data),
    onSuccess: ({ paymentUrl, orderId }) => {
      if (!paymentUrl) {
        return router.navigate({ to: '/thank-you', search: { orderId } });
      }

      window.location.replace(paymentUrl);
    },
    ...options,
  });
