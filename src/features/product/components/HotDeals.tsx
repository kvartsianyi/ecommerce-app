import { Flame } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { useGetProducts } from '../api/hooks';
import type { Product } from '../types';

const SKELETON_COUNT = 3;

type ProductCardProps = {
  item: Product;
};

function ProductCard({ item }: ProductCardProps) {
  return (
    <Card className="py-0">
      <CardContent className="flex items-center justify-between gap-4 p-4">
        <div>
          <p className="text-sm font-semibold text-foreground">{item.title}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
            Класика
          </p>
        </div>
        <Badge className="px-3 py-1.5 text-base font-semibold">
          {item.price} ₴
        </Badge>
      </CardContent>
    </Card>
  );
}

function ProductCardSkeleton() {
  return (
    <Card className="py-0">
      <CardContent className="flex items-center justify-between gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-10 w-24" />
      </CardContent>
    </Card>
  );
}

export function HotDeals() {
  const { data, isPending: isProductPending } = useGetProducts();
  const products = data?.data ?? [];

  const featuredProducts = products.slice(0, 3);

  return (
    <div className="flex flex-col space-y-4">
      <Badge className="px-3 py-2 text-sm font-semibold uppercase tracking-[0.25em] [&>svg]:size-4">
        <Flame className="text-amber-500" /> Cпеціальні пропозиції
      </Badge>

      <p className="max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
        Обирайте спеціальні пропозиції та додавайте їх у кошик за вигідною
        ціною.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {isProductPending
          ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : featuredProducts.map((product) => (
              <ProductCard key={product.id} item={product} />
            ))}
      </div>
    </div>
  );
}
