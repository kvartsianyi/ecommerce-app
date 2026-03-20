import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/shared/ui/button';
import { PizzaCard } from './ProductCard';
import { Spinner } from '@/shared/ui/spinner';
import { useGetProducts } from '../api/hooks';
import { useAuth } from '@/features/auth/api/hooks';
import { useModalStore } from '@/shared/store';
import { useAddToCart } from '@/features/cart/api/hooks';

const categories = [
  { id: 'all', nameUk: 'Всі' },
  { id: 'classic', nameUk: 'Класичні' },
  { id: 'premium', nameUk: 'Преміум' },
  { id: 'spicy', nameUk: 'Гострі' },
  { id: 'vegetarian', nameUk: 'Вегетаріанські' },
];

export function Menu() {
  const openLogin = useModalStore((state) => state.openLogin);
  const openCart = useModalStore((state) => state.openCart);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const { isAuthenticated } = useAuth();
  const { data, isPending } = useGetProducts();
  const { mutateAsync: addToCart } = useAddToCart();

  const products = data?.data ?? [];

  const handleAddToCart = async (id: number, quantity = 1) => {
    if (!isAuthenticated) {
      openLogin();
      return;
    }

    try {
      await addToCart({ id, quantity });
      openCart();
    } catch {
      toast.error('Помилка додавання в кошик');
    }
  };

  return (
    <section id="menu" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Наше меню
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Оберіть свою улюблену піцу з нашого великого асортименту
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.nameUk}
            </Button>
          ))}
        </div>

        {isPending && (
          <div className="flex justify-center pt-4">
            <Spinner className="size-8" />
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((pizza) => (
            <PizzaCard
              key={pizza.id}
              pizza={pizza}
              OnAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
