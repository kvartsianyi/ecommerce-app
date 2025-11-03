import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import PizzaImage from '@/assets/pizza.png';
import type { Product } from '@/types/product';
import { Counter } from '../Counter';
import { cn } from '@/lib/utils';

export function ProductCard({
  className,
  product,
}: {
  className?: string;
  product: Product;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <Card className={cn('flex flex-col', className)} key={product.id}>
      <CardHeader>
        <div className="relative">
          <img
            className="rounded-lg cursor-pointer"
            src={product.picture ?? PizzaImage}
            alt="Product Image"
          />
          <Heart className="absolute top-0 right-0 size-7 cursor-pointer stroke-primary fill-transparent hover:fill-primary transition-[fill] duration-[300ms]" />
        </div>
        <CardTitle className="text-3xl font-bold">{product.title}</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <CardDescription>
          <p className="mb-4 text-lg text-foreground">
            Ціна:
            <span className="text-2xl ml-2 font-semibold">
              {Math.round(product.price / 100)}грн
            </span>
            <span className="text-base text-muted-foreground"> / 350гр</span>
          </p>
          <p>{product.description}</p>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Counter value={quantity} onChange={setQuantity} max={99} />
        <Button className="flex-1 cursor-pointer">
          <ShoppingCart />В корзину
        </Button>
      </CardFooter>
    </Card>
  );
}
