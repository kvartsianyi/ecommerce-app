import type z from 'zod';

import { formOptions } from '@tanstack/react-form';
import { PAYMENT_METHODS, PICKUP_METHODS } from '../../constants';
import { checkoutSchema } from '../../schemas';

type DefaultValues = z.infer<typeof checkoutSchema>;

const defaultValues: DefaultValues = {
  recipientName: '',
  recipientPhone: '',
  deliveryAddress: '',
  pickupMethod: PICKUP_METHODS.DELIVERY,
  paymentMethod: PAYMENT_METHODS.STRIPE,
  comment: '',
};

export const CheckoutFormOpts = formOptions({
  defaultValues,
  validators: {
    onSubmit: checkoutSchema,
  },
});
