import type z from 'zod';

import { formOptions } from '@tanstack/react-form';
import { PAYMENT_METHODS, PICKUP_METHODS } from '../../constants';
import { checkoutSchema } from '../../schemas';

type DefaultValues = z.infer<typeof checkoutSchema>;

const defaultValues: DefaultValues = {
  user: {
    firstName: '',
    lastName: '',
    phone: '',
  },
  deliveryAddress: '',
  pickupMethod: PICKUP_METHODS.DELIVERY,
  paymentMethod: PAYMENT_METHODS.CARD,
  comment: '',
};

export const CheckoutFormOpts = formOptions({
  defaultValues,
  validators: {
    onSubmit: checkoutSchema,
  },
});
