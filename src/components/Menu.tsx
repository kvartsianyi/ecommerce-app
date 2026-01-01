import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/lib/api';
import type { Pizza } from '@/app/page';

// const pizzas = [
//   {
//     id: '1',
//     name: 'Margherita',
//     nameUk: 'Маргарита',
//     description: 'Tomato sauce, mozzarella, basil',
//     descriptionUk: 'Томатний соус, моцарела, базилік',
//     price: 180,
//     image: '/margherita-pizza.jpg',
//     category: 'classic',
//   },
// ];

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
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // const filteredPizzas =
  //   selectedCategory === 'all'
  //     ? pizzas
  //     : pizzas.filter((pizza) => pizza.category === selectedCategory);

  const getQuantity = (pizzaId: string) => quantities[pizzaId] || 1;

  const incrementQuantity = (pizzaId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [pizzaId]: (prev[pizzaId] || 1) + 1,
    }));
  };

  const decrementQuantity = (pizzaId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [pizzaId]: Math.max(1, (prev[pizzaId] || 1) - 1),
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

  const initialFetchProducts = { data: [] };

  const { data: { data: pizzas = [] } = initialFetchProducts, isPending } =
    useQuery({
      queryKey: ['products'],
      queryFn: fetchProducts,
    });

  console.log(pizzas);

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
            <Card key={pizza.id} className="flex flex-col overflow-hidden py-0">
              <div className="aspect-square cursor-pointer overflow-hidden">
                <img
                  src={
                    pizza.picture ||
                    '/pepperoni-pizza.png' ||
                    '/placeholder.svg'
                  }
                  alt={pizza.title}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-semibold">{pizza.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {pizza.description}
                </p>
                <div className="mt-auto flex-1" />
                <p className="mt-3 text-xl font-bold text-primary">
                  {pizza.price / 100} ₴
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="flex w-full items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-9 w-9 bg-transparent"
                      onClick={() => decrementQuantity(pizza.id)}
                      disabled={getQuantity(pizza.id) <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {getQuantity(pizza.id)}
                    </span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-9 w-9 bg-transparent"
                      onClick={() => incrementQuantity(pizza.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    className="flex-1"
                    onClick={() => handleAddToCart(pizza)}
                  >
                    Додати в кошик
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
