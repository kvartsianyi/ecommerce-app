import { Pizza } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { useGetProducts } from '../api/hooks';
import { useAuth } from '@/features/auth/api/hooks';
import { useModalStore } from '@/shared/store';
import { useAddToCart } from '@/features/cart/api/hooks';
import { Badge } from '@/shared/ui/badge';
import { Skeleton } from '@/shared/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from '@/shared/ui/select';
import { ProductGrid } from './ProductGrid';

const categories = [
  { id: 'all', label: 'Усі' },
  { id: 'classic', label: 'Класика' },
  { id: 'spicy', label: 'Гострі' },
  { id: 'vegetarian', label: 'Вегетаріанські' },
  { id: 'premium', label: 'Преміум' },
];

const isCategoriesLoading = false;

type CategoryFiltersProps = {
  selectedCategory: string;
  onSelect: (categoryId: string) => void;
  isLoading: boolean;
};

function CategoryFilters({
  selectedCategory,
  onSelect,
  isLoading,
}: CategoryFiltersProps) {
  if (isLoading) {
    return <Skeleton className="h-9 w-46" />;
  }

  return (
    <Select defaultValue={categories[0].id} onValueChange={onSelect}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Категорії</SelectLabel>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function Sorting() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Сортувати" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Сортування</SelectLabel>
          <SelectItem key="price-asc" value="price-asc">
            За ціною (зростання)
          </SelectItem>
          <SelectItem key="price-desc" value="price-desc">
            За ціною (спадання)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function Menu() {
  const openLogin = useModalStore((state) => state.openLogin);
  const openCart = useModalStore((state) => state.openCart);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const { isAuthenticated } = useAuth();
  const { data, isPending: isProductsLoading } = useGetProducts();
  const { mutateAsync: addToCart } = useAddToCart();

  const products = data?.data ?? [];

  const handleAddToCart = async (id: number, quantity = 1) => {
    if (!isAuthenticated) {
      openLogin();
      return;
    }

    try {
      await addToCart({ id, quantity });
      openCart();
    } catch {
      toast.error('Помилка додавання в кошик');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <Badge className="px-3 py-2 text-sm font-semibold uppercase tracking-[0.25em] [&>svg]:size-4">
            <Pizza className="text-yellow-600" />
            Меню
          </Badge>
          <div>
            <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Що ми готуємо
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Обирайте фірмові піци за категоріями та додавайте їх у кошик із
              потрібною кількістю та варіантом.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <CategoryFilters
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
            isLoading={isCategoriesLoading}
          />
          <Sorting />
        </div>
      </div>

      <ProductGrid
        items={products}
        onAddToCart={handleAddToCart}
        isLoading={isProductsLoading}
      />
    </div>
  );
}
