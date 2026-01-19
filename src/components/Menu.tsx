import { useState } from 'react';

import type { Pizza } from '@/types/product';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/lib/api';
import { PizzaCard } from './features/PizzaCard';

const categories = [
  { id: 'all', nameUk: 'Всі' },
  { id: 'classic', nameUk: 'Класичні' },
  { id: 'premium', nameUk: 'Преміум' },
  { id: 'spicy', nameUk: 'Гострі' },
  { id: 'vegetarian', nameUk: 'Вегетаріанські' },
];

type MenuProps = {
  onAddToCart: (pizza: Pizza, quantity: number) => void;
};

export function Menu({ onAddToCart }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const getQuantity = (pizzaId: number) => quantities[pizzaId] || 1;

  const changeQuantity = (pizzaId: number, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [pizzaId]: quantity,
    }));
  };

  const handleAddToCart = (pizza: Pizza) => {
    const quantity = getQuantity(pizza.id);
    onAddToCart(pizza, quantity);
    setQuantities((prev) => ({
      ...prev,
      [pizza.id]: 1,
    }));
  };

  const initialProducts = { data: [] };

  const { data: { data: pizzas } = initialProducts } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.fetchProducts,
  });

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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pizzas.map((pizza) => (
            <PizzaCard
              key={pizza.id}
              pizza={pizza}
              quantity={getQuantity(pizza.id)}
              OnQuantityChange={changeQuantity}
              OnAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
