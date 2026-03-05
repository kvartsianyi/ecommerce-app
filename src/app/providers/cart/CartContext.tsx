import { createContext } from 'react';

import type { CartItem } from '@/shared/types';

export type CartContextType = {
  items: CartItem[];
  totalAmount: number;
  isFetching: boolean;
  fetchCart: () => void;
  addToCart: (id: number, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
