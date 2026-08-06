import type { PaymentMethod, PickupMethod } from '@/shared/types';

export interface CheckoutBody {
  recipientName: string;
  recipientPhone: string;
  pickupMethod: PickupMethod;
  paymentMethod: PaymentMethod;
  deliveryAddress?: string;
  comment?: string;
}

export interface CheckoutResponse {
  orderId: number;
  paymentUrl: string;
}

export interface OrderDetailsItem {
  id: number;
  orderId: number;
  productId: number;
  productTitle: string;
  productDescription: string;
  productImage: string | null;
  quantity: number;
  unitPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDetails {
  id: number;
  recipientName: string;
  recipientPhone: string;
  pickupMethod: PickupMethod;
  paymentMethod: PaymentMethod;
  deliveryAddress?: string;
  items: OrderDetailsItem[];
  totalAmount: number;
  status: string;
  userId: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}
