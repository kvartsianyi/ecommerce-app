import z from 'zod';

import {
  firstNameValidator,
  lastNameValidator,
  phoneValidator,
} from '@/features/auth/schemas';
import { PAYMENT_METHODS, PICKUP_METHODS } from '../constants';

export const checkoutSchema = z.object({
  user: z.object({
    firstName: firstNameValidator,
    lastName: lastNameValidator,
    phone: phoneValidator,
  }),
  deliveryAddress: z
    .string()
    .min(3, 'Адреса повинно містити не менше 3 символів.')
    .max(30, 'Адреса повинно містити не більше 30 символів.'),
  pickupMethod: z.enum(Object.values(PICKUP_METHODS)),
  paymentMethod: z.enum(Object.values(PAYMENT_METHODS)),
  comment: z
    .string()
    .min(3, 'Коментар повинен містити не менше 3 символів.')
    .max(100, 'Коментар повинен містити не більше 100 символів.')
    .optional()
    .or(z.literal('')),
});
