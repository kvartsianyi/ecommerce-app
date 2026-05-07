import {
  Banknote,
  CreditCard,
  Store,
  Truck,
  type LucideIcon,
} from 'lucide-react';

import type { PaymentMethod, PickupMethod } from '@/shared/types';

export const PICKUP_METHODS = {
  DELIVERY: 'delivery',
  PICKUP: 'pickup',
} as const satisfies Record<string, PickupMethod>;

type PickupOption = {
  value: PickupMethod;
  label: string;
  description: string;
  icon: LucideIcon;
  price: string;
};

export const PICKUP_OPTIONS: PickupOption[] = [
  {
    value: PICKUP_METHODS.DELIVERY,
    label: 'Доставка додому',
    description: 'Доставимо за вашою адресою протягом 1 год',
    icon: Truck,
    price: '99 грн',
  },
  {
    value: PICKUP_METHODS.PICKUP,
    label: 'Самовивіз',
    description: 'Заберіть з нашого закладу через 15 хв після замовлення',
    icon: Store,
    price: 'Безкоштовно',
  },
] as const;

export const PAYMENT_METHODS = {
  CARD: 'card',
  CASH: 'cash',
} as const satisfies Record<string, PaymentMethod>;

type PaymentOption = {
  value: PaymentMethod;
  label: string;
  description: string;
  icon: LucideIcon;
};

export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    value: PAYMENT_METHODS.CARD,
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
