import { Banknote, CreditCard, Store, Truck } from 'lucide-react';

import type { PaymentMethod, PickupMethod } from '@/shared/types';
import type { RadioOption } from '@/shared/components/form/RadioGroupField';

export const PICKUP_METHODS = {
  DELIVERY: 'delivery',
  PICKUP: 'pickup',
} as const satisfies Record<string, PickupMethod>;

export const PICKUP_OPTIONS: RadioOption[] = [
  {
    value: PICKUP_METHODS.DELIVERY,
    label: 'Доставка додому',
    description: 'Доставимо за вашою адресою протягом 1 год',
    icon: Truck,
    rightSection: '99 грн',
  },
  {
    value: PICKUP_METHODS.PICKUP,
    label: 'Самовивіз',
    description: 'Заберіть з нашого закладу через 15 хв після замовлення',
    icon: Store,
    rightSection: 'Безкоштовно',
  },
] as const;

export const PAYMENT_METHODS = {
  STRIPE: 'stripe',
  CASH: 'cash',
} as const satisfies Record<string, PaymentMethod>;

export const PAYMENT_OPTIONS: RadioOption[] = [
  {
    value: PAYMENT_METHODS.STRIPE,
    label: 'Кредитна / Дебетова картка',
    description: 'Безпечна оплата карткою',
    icon: CreditCard,
  },
  {
    value: PAYMENT_METHODS.CASH,
    label: 'Оплата при отриманні',
    description: 'Оплатіть при отриманні замовлення',
    icon: Banknote,
  },
] as const;
