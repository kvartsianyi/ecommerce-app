import { useState, memo } from 'react';
import {
  Flame,
  Heart,
  Leaf,
  Minus,
  Pizza,
  Plus,
  ShoppingCart,
  Sparkles,
} from 'lucide-react';

import type { Product } from '../types';
// import { ProductCard } from './ProductCard';

import pizzaImage from '@/assets/pizza-image.avif';
import { Button } from '@/shared/ui/button';
import {
  CardContent,
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/shared/ui/card';
import { Counter } from '@/shared/ui/Counter';
import { Skeleton } from '@/shared/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Badge } from '@/shared/ui/badge';

const GRID_SKELETON_COUNT = 8;

function ProductVisual({
  image,
  label,
  title,
  isFavorite,
  onToggleFavorite,
  isLoading,
}) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
      {isLoading ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <>
          <img src={image} alt={title} className="h-full w-full object-cover" />
          <div className="absolute left-4 top-4 bg-background/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
            {label}
          </div>
          <button
            type="button"
            aria-label={isFavorite ? 'Видалити з обраного' : 'Додати в обране'}
            className="border-input bg-background/85 text-foreground hover:bg-background absolute right-4 top-4 flex size-10 items-center justify-center border transition-colors hover:text-red-600"
            onClick={onToggleFavorite}
          >
            <Heart
              className={`size-6 ${isFavorite ? 'fill-red-600 text-red-600' : ''}`}
            />
          </button>
        </>
      )}
    </div>
  );
}

type ProductCardProps = {
  product: Product;
  onAddToCart: (id: number, quantity: number) => void;
};

// export function ProductCard({ product, onAddToCart }: ProductCardProps) {
//   const [quantity, setQuantity] = useState(1);

//   return (
//     <Card className="flex flex-col overflow-hidden py-0">
//       <div className="aspect-square cursor-pointer overflow-hidden">
//         <img
//           src={product.picture ?? pizzaImage}
//           alt={product.title}
//           className="h-full w-full object-cover transition-transform hover:scale-105"
//         />
//       </div>
//       <CardContent className="flex flex-1 flex-col p-4">
//         <h3 className="text-lg font-semibold">{product.title}</h3>
//         <p className="mt-1 text-sm text-muted-foreground">
//           {product.description}
//         </p>
//         <div className="mt-auto flex-1" />
//         <p className="mt-3 text-xl font-bold text-primary">
//           {product.price / 100} ₴
//         </p>
//       </CardContent>
//       <CardFooter className="p-4 pt-0 gap-2">
//         <Counter min={1} max={99} defaultValue={1} onChange={setQuantity} />
//         <Button
//           className="flex-1"
//           onClick={() => onAddToCart(product.id, quantity)}
//         >
//           + Додати в кошик
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }

export const ProductCard = memo(function ProductCard({ product, onAddToCart }) {
  const isLoading = false;
  const selectedVariants = [];
  const quantities = [];

  const categories = ['classic', 'spicy', 'vegetarian', 'premium'];

  product.variants = [
    { label: 'Стандарт', price: product.price },
    { label: 'Велика', price: product.price + 20 },
  ];
  product.category = categories[Math.floor(Math.random() * categories.length)];

  return (
    <Card
      key={product.id}
      className="flex flex-col py-0"
    >
      <ProductVisual
        image={product.image ?? pizzaImage}
        label="Класика"
        title={product.title}
        isFavorite={false}
        onToggleFavorite={() => {}}
        isLoading={isLoading}
      />

      <CardHeader className="flex-1 space-y-3 border-b border-card-border/80 [.border-b]:pb-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-5 w-32 rounded-none" />
                <Skeleton className="h-3 w-full rounded-none" />
                <Skeleton className="h-3 w-5/6 rounded-none" />
              </div>
            ) : (
              <>
                <CardTitle className="text-xl">{product.title}</CardTitle>
                <CardDescription className="mt-2 text-sm leading-7">
                  {product.description}
                </CardDescription>
              </>
            )}
          </div>
          {isLoading ? (
            <Skeleton className="h-8 w-16 shrink-0 rounded-none" />
          ) : (
            <div className="bg-primary text-primary-foreground shrink-0 whitespace-nowrap px-3 py-1.5 text-base font-semibold">
              {product.price} ₴
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20 rounded-none" />
              <Skeleton className="h-5 w-24 rounded-none" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-20 rounded-none" />
              <Skeleton className="h-12 w-full rounded-none" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2">
              {product.category === 'spicy' && (
                <Badge className="bg-red-100 text-sm text-red-700 dark:bg-red-950/60 dark:text-red-200">
                  <Flame className="size-3.5" />
                  Гостра
                </Badge>
              )}
              {product.category === 'vegetarian' && (
                <Badge className="bg-green-100 text-sm text-green-700 dark:bg-green-950/60 dark:text-green-200">
                  <Leaf className="size-3.5" />
                  Вегетаріанська
                </Badge>
              )}
              {product.category === 'premium' && (
                <Badge className="bg-amber-100 text-sm text-amber-700 dark:bg-amber-950/60 dark:text-amber-200">
                  <Sparkles className="size-3.5" />
                  Преміум
                </Badge>
              )}
              {product.category === 'classic' && (
                <Badge className="bg-muted text-sm text-foreground">
                  <Pizza className="size-3.5" />
                  Класика
                </Badge>
              )}
            </div>

            <label className="grid gap-2">
              <span className="eyebrow opacity-80">Варіант</span>
              <Select
                value={selectedVariants[product.id] ?? ''}
                onValueChange={(value) => {}}
              >
                <SelectTrigger className="h-12 w-full rounded-none px-3 text-sm shadow-none">
                  <SelectValue placeholder="Оберіть варіант" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  {product?.variants.map((variant, index) => (
                    <SelectItem key={index} value={index}>
                      {variant.label} · {variant.price} ₴
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
          </>
        )}
      </CardContent>

      <CardFooter className="mt-auto px-5 py-4 flex items-center justify-between gap-3 border-t border-card-border/80 bg-muted/80">
        {isLoading ? (
          <>
            <Skeleton className="h-12 w-36 rounded-none" />
            <Skeleton className="h-12 w-28 rounded-none" />
          </>
        ) : (
          <>
            <div className="border border-input bg-background flex items-center">
              <button
                type="button"
                aria-label={`Зменшити кількість для ${product.title}`}
                className="flex items-center justify-center text-foreground transition-colors hover:bg-muted size-12"
                onClick={() => {}}
              >
                <Minus className="size-4" />
              </button>
              <div className="flex items-center justify-center border-input text-base font-semibold text-foreground h-12 min-w-12 border-x px-4">
                {quantities[product.id] ?? 1}
              </div>
              <button
                type="button"
                aria-label={`Збільшити кількість для ${product.title}`}
                className="flex items-center justify-center text-foreground transition-colors hover:bg-muted size-12"
                onClick={() => {}}
              >
                <Plus className="size-4" />
              </button>
            </div>
            <Button
              className="h-12 rounded-none px-5 text-base"
              onClick={() =>
                onAddToCart(
                  product.id,
                  selectedVariants[product.id],
                  quantities[product.id] ?? 1
                )
              }
            >
              <ShoppingCart className="size-4" />
              Додати
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
});

export function ProductCardSkeleton() {
  return <></>;
}

type ProductGridProps = {
  items: Product[];
  onAddToCart: (id: number, quantity: number) => void;
  isLoading: boolean;
};

export function ProductGrid({
  items,
  isLoading,
  onAddToCart,
}: ProductGridProps) {
  return (
    // Maybe 3 in a row will be better for desktop?
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {isLoading
        ? Array.from({ length: GRID_SKELETON_COUNT }, (_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        : items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
    </div>
  );
}
