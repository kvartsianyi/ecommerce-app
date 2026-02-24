import { useState } from 'react';

import type { Pizza } from '@/types/product';
import { Counter } from '../Counter';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';

import pizzaImage from '../../assets/pizza.png';

type PizzaCardProps = {
  pizza: Pizza;
  OnAddToCart: (id: number, quantity: number) => void;
};

export function PizzaCard({ pizza, OnAddToCart }: PizzaCardProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <Card className="flex flex-col overflow-hidden py-0">
      <div className="aspect-square cursor-pointer overflow-hidden">
        <img
          src={pizza.picture ?? pizzaImage}
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
      <CardFooter className="p-4 pt-0 gap-2">
        <Counter max={999} value={quantity} onChange={setQuantity} />
        <Button
          className="flex-1"
          onClick={() => OnAddToCart(pizza.id, quantity)}
        >
          + Додати в кошик
        </Button>
      </CardFooter>
    </Card>
  );
}
