import { useEffect, useState } from 'react';

import { CartContext } from './CartContext';
import { cartApi } from '@/features/cart/api';
import type { CartItem } from '@/shared/types';
import { useAuth } from '../auth';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  const [items, setItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  // ---- helpers ----

  const fetchCart = async () => {
    setIsFetching(true);

    try {
      const { data } = await cartApi.fetchCart();

      setItems(data.items);
      setTotalAmount(data.totalAmount);
    } finally {
      setIsFetching(false);
    }
  };

  const addToCart = async (id: number, quantity = 1) => {
    setIsFetching(true);

    try {
      const { data } = await cartApi.addToCart(id, quantity);

      setItems(data.items);
      setTotalAmount(data.totalAmount);
    } finally {
      setIsFetching(false);
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    setIsFetching(true);

    try {
      const { data } = await cartApi.updateQuantity(id, quantity);

      setItems(data.items);
      setTotalAmount(data.totalAmount);
    } finally {
      setIsFetching(false);
    }
  };

  const removeFromCart = async (id: number) => {
    setIsFetching(true);

    try {
      await cartApi.removeFromCart(id);
      await fetchCart();
    } finally {
      setIsFetching(false);
    }
  };

  const clearCart = () => {
    setItems([]);
    setTotalAmount(0);
  };

  // ---- Cart init ----
  useEffect(() => {
    const init = async () => {
      if (!isAuthenticated) return;

      try {
        await fetchCart();
      } catch {
        setItems([]);
      }
    };

    init();
  }, [isAuthenticated]);

  return (
    <CartContext.Provider
      value={{
        items,
        totalAmount,
        isFetching,
        fetchCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
