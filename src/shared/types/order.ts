export type PaymentMethod = 'stripe' | 'cash';

export type PickupMethod = 'delivery' | 'pickup';

export type CheckoutSessionDetails = {
  paymentUrl: string | null;
};
