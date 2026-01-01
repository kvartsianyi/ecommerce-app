import { useState } from 'react';
import { Heart, ShoppingBasket } from 'lucide-react';

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
import type { Pizza } from '@/types/product';
import { Counter } from '../Counter';
import { cn } from '@/lib/utils';

export function ProductCard({
  className,
  product,
}: {
  className?: string;
  product: Pizza;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <Card
      className={cn('flex flex-col rounded-none', className)}
      key={product.id}
    >
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
        <CardDescription className="text-base">
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <p className="text-lg text-foreground">
          <span className="text-2xl font-semibold">
            {Math.round(product.price / 100)}грн
          </span>
          <span className="text-base text-muted-foreground"> / 350гр</span>
        </p>
        <div className="flex w-full gap-4 pt-4">
          <Counter value={quantity} onChange={setQuantity} max={99} />
          <Button className="flex-1 cursor-pointer text-base font-semibold">
            В кошик <ShoppingBasket className="size-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
