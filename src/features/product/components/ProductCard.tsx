import { useState } from 'react';

import type { Product } from '../types';
import { Counter } from '@/shared/ui/Counter';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardFooter } from '@/shared/ui/card';

import pizzaImage from '@/assets/pizza.png';

type ProductCardProps = {
  product: Product;
  OnAddToCart: (id: number, quantity: number) => void;
};

export function ProductCard({ product, OnAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <Card className="flex flex-col overflow-hidden py-0">
      <div className="aspect-square cursor-pointer overflow-hidden">
        <img
          src={product.picture ?? pizzaImage}
          alt={product.title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-auto flex-1" />
        <p className="mt-3 text-xl font-bold text-primary">
          {product.price / 100} ₴
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
        <Counter min={1} max={99} defaultValue={1} onChange={setQuantity} />
        <Button
          className="flex-1"
          onClick={() => OnAddToCart(product.id, quantity)}
        >
          + Додати в кошик
        </Button>
      </CardFooter>
    </Card>
  );
}
