import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import { useQuery } from '@tanstack/react-query';
import { pizzaApi } from '@/features/pizza/api';
import { PizzaCard } from './PizzaCard';
import { Spinner } from '@/shared/ui/spinner';

const categories = [
  { id: 'all', nameUk: 'Всі' },
  { id: 'classic', nameUk: 'Класичні' },
  { id: 'premium', nameUk: 'Преміум' },
  { id: 'spicy', nameUk: 'Гострі' },
  { id: 'vegetarian', nameUk: 'Вегетаріанські' },
];

type MenuProps = {
  onAddToCart: (id: number, quantity: number) => void;
};

export function Menu({ onAddToCart }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const initialProducts = { data: [] };

  const { data: { data: pizzas } = initialProducts, isPending } = useQuery({
    queryKey: ['products'],
    queryFn: pizzaApi.fetchProducts,
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

        {isPending && (
          <div className="flex justify-center pt-4">
            <Spinner className="size-8" />
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pizzas.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} OnAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}
