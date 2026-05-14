import { memo, useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
// import { Badge } from '@/shared/components/ui/badge';
import { Counter } from '@/shared/components/ui/Counter';
// import { CATEGORY_BADGE_CONFIG } from '../../constants';
import { Spinner } from '@/shared/components/ui/spinner';
import type { Product } from '../../types';
import defaultPizzaImage from '@/assets/pizza-image.avif';

// type Category = keyof typeof CATEGORY_BADGE_CONFIG;

// interface ProductCategoryBadgeProps {
//   category: Category;
// }

// function ProductBadge({ category }: ProductCategoryBadgeProps) {
//   const config = CATEGORY_BADGE_CONFIG[category];

//   if (!config) return null;

//   const Icon = config.icon;

//   return (
//     <Badge className={`text-sm ${config.className}`}>
//       <Icon className="size-3.5" />
//       {config.label}
//     </Badge>
//   );
// }

type ProductVisualProps = {
  image: string;
  title: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

function ProductVisual({
  image,
  title,
  isFavorite,
  onToggleFavorite,
}: ProductVisualProps) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
      <img
        src={image ?? defaultPizzaImage}
        alt={title}
        className="h-full w-full object-cover"
      />
      <Button
        aria-label={isFavorite ? 'Видалити з обраного' : 'Додати в обране'}
        className="border border-input bg-background/85 text-foreground absolute right-4 top-4 transition-colors hover:bg-background hover:text-red-600"
        onClick={onToggleFavorite}
      >
        <Heart
          className={`size-6 ${isFavorite ? 'fill-red-600 text-red-600' : ''}`}
        />
      </Button>
    </div>
  );
}

type ProductCardProps = {
  product: Product;
  onAddToCart: (id: number, quantity: number) => void;
  isAddProductLoading: boolean;
};

export const ProductCard = memo(function ProductCard({
  product,
  onAddToCart,
  isAddProductLoading,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <Card className="flex flex-col py-0">
      <ProductVisual
        image={product.picture}
        title={product.title}
        isFavorite={isFavourite}
        onToggleFavorite={() => setIsFavourite((prev) => !prev)}
      />

      {/* <CardHeader className="flex-1 space-y-3 border-b [.border-b]:pb-0"> */}
      <CardHeader className="flex-1 space-y-3">
        <CardTitle className="flex items-center justify-between">
          <h3 className="text-xl">{product.title}</h3>

          <div className="bg-primary text-primary-foreground shrink-0 whitespace-nowrap px-3 py-1.5 text-base">
            {product.price} ₴
          </div>
        </CardTitle>
        <CardDescription className="mb-3 text-sm leading-7">
          {product.description}
        </CardDescription>
      </CardHeader>

      {/* <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <ProductBadge category={product.category} />
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
      </CardContent> */}

      <CardFooter className="px-5 py-4 flex items-center justify-between gap-3 border-t">
        <Counter
          size="lg"
          min={1}
          max={99}
          defaultValue={1}
          onChange={setQuantity}
        />
        <Button
          className="h-12 px-5 text-base"
          disabled={isAddProductLoading}
          onClick={() => onAddToCart(product.id, quantity)}
        >
          {isAddProductLoading ? (
            <>
              <Spinner /> Додаємо...
            </>
          ) : (
            <>
              <ShoppingCart className="size-4" /> Додати
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
});
