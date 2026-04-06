import { ArrowRight, Clock3, Leaf, MapPin, Star } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Skeleton } from '@/shared/ui/skeleton';
import { useGetProducts } from '../api/hooks';
import type { Product } from '../types';

const features = [
  {
    title: '24 хв',
    text: 'Середній час доставки',
    icon: <Clock3 className="size-5 text-orange-700" />,
  },
  {
    title: 'Рейтинг 4.9',
    text: 'Нас люблять у місті',
    icon: <Star className="size-5 text-amber-500" />,
  },
  {
    title: 'По всьому місту',
    text: 'Швидкі доставки',
    icon: <MapPin className="size-5 text-red-600" />,
  },
];

const BEST_SELLER_SKELETON_COUNT = 3;

const defaultImage =
  'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80';

const bestSellerClasses =
  'border border-card-border bg-muted/30 grid grid-cols-[92px_1fr_auto] items-center gap-4 p-3';

type BestSellerCardProps = {
  item: Product;
};

function BestSellerCard({ item }: BestSellerCardProps) {
  return (
    <div className={bestSellerClasses}>
      <img
        src={defaultImage}
        alt={item.title}
        className="h-20 w-[92px] object-cover"
      />
      <div>
        <p className="text-sm font-semibold text-foreground">{item.title}</p>
        <p className="mt-1 text-xs leading-6 text-muted-foreground">
          {item.description}
        </p>
      </div>
      <div className="text-right">
        <p className="text-base font-semibold text-foreground">
          {item.price} ₴
        </p>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
          Класика
        </p>
      </div>
    </div>
  );
}

function BestSellerCardSkeleton() {
  return (
    <div className={bestSellerClasses}>
      <Skeleton className="h-20 w-[92px]" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      <div className="justify-self-end space-y-2">
        <Skeleton className="h-5 w-14" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

function HeroProduct({ item }: { item: Product }) {
  return (
    <>
      <div className="flex justify-end">
        <Badge className="px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em]">
          {item.title}
        </Badge>
      </div>
      <img
        src={defaultImage}
        alt={item.title}
        className="h-[18rem] w-full object-cover shadow-lg"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="border border-input/80 bg-background/70 p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
            Тісто
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">
            Ручна робота та дріжджова піца.
          </p>
        </div>
        <div className="border border-primary bg-primary p-3 text-primary-foreground">
          <p className="text-xs uppercase tracking-[0.18em] text-primary-foreground/65">
            Доставка
          </p>
          <p className="mt-1 text-sm font-medium">
            Безкоштовно. Самовивіз за 15 хв.
          </p>
        </div>
      </div>
    </>
  );
}

function HeroProductSkeleton() {
  return (
    <>
      <div className="flex justify-end">
        <Skeleton className="h-6 w-28" />
      </div>

      <Skeleton className="h-[18rem] w-full" />

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="border border-input/80 space-y-2 bg-background/70 p-3">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="border border-input/80 space-y-2 bg-background/70 p-3">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </>
  );
}

type FeatureCardProps = {
  title: string;
  text: string;
  icon: React.ReactNode;
};

function FeatureCard({ title, text, icon }: FeatureCardProps) {
  return (
    <Card className="py-0">
      <CardContent className="flex items-center gap-3 p-4">
        {icon}
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{text}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function Hero() {
  const { data, isPending: isProductPending } = useGetProducts();
  const products = data?.data ?? [];

  const featuredProducts = products.slice(0, 3);
  const heroProduct = {
    ...products[0],
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[2fr_3fr] xl:items-start">
      <div className="space-y-5">
        <Badge className="px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em]">
          <Leaf className="text-green-700" /> Свіжо сьогодні
        </Badge>
        <div className="space-y-4">
          <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Піца з печі, яку легко замовити за кілька секунд.
          </h2>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Головна сторінка сфокусована на продуктах, швидкому виборі та
            переході до оформлення замовлення.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/" hash="menu">
            <Button size="lg" className="h-12 w-full px-7 text-base sm:w-auto">
              Переглянути меню
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link to="/" hash="delivery">
            <Button
              variant="outline"
              size="lg"
              className="h-12 w-full px-7 text-base sm:w-auto"
            >
              Доставка
            </Button>
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {features.map(({ title, text, icon }) => (
            <FeatureCard key={title} title={title} text={text} icon={icon} />
          ))}
        </div>
      </div>
      <Card className="py-0">
        <CardContent className="grid px-0 lg:grid-cols-2">
          <div className="space-y-4 p-5 lg:p-6">
            <p className="eyebrow">Топ замовлення</p>
            <div className="grid gap-3">
              {isProductPending
                ? Array.from({ length: BEST_SELLER_SKELETON_COUNT }).map(
                    (_, i) => <BestSellerCardSkeleton key={i} />
                  )
                : featuredProducts.map((item) => (
                    <BestSellerCard key={item.id} item={item} />
                  ))}
            </div>
          </div>

          <div className="flex flex-col gap-5 bg-warm-surface border-t p-5 lg:border-t-0 lg:border-l lg:p-6">
            {isProductPending ? (
              <HeroProductSkeleton />
            ) : (
              <HeroProduct item={heroProduct} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
