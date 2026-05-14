export type PaymentMethod = 'card' | 'cash';

export type PickupMethod = 'delivery' | 'pickup';

export type CheckoutSessionDetails = {
  paymentUrl: string | null;
};
