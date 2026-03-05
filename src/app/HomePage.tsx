import { toast } from 'sonner';

import { Hero } from '@/features/pizza/components/Hero';
import { Menu } from '@/features/pizza/components/Menu';
import { useAuth } from '@/app/providers/auth/useAuth';
import { useCart } from '@/app/providers/cart/useCart';
import { useModalStore } from '@/shared/store';

export function HomePage() {
  const openLogin = useModalStore((state) => state.openLogin);
  const openCart = useModalStore((state) => state.openCart);

  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = async (id: number, quantity = 1) => {
    if (!isAuthenticated) {
      openLogin();
      return;
    }

    try {
      await addToCart(id, quantity);
      openCart();
    } catch {
      toast.error('Помилка додавання в кошик');
    }
  };

  return (
    <>
      <Hero />
      <Menu onAddToCart={handleAddToCart} />
    </>
  );
}
