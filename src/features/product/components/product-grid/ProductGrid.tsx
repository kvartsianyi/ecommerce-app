import { ProductCardSkeleton } from './ProductCardSkeleton';
import { ProductCard } from './ProductCard';
import type { Product } from '../../types';

const GRID_SKELETON_COUNT = 9;

type ProductGridProps = {
  items: Product[];
  onAddToCart: (id: number, quantity: number) => void;
  isLoading: boolean;
  addProductId: number | null;
};

export function ProductGrid({
  items,
  isLoading,
  onAddToCart,
  addProductId,
}: ProductGridProps) {
  return (
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
              isAddProductLoading={addProductId === product.id}
            />
          ))}
    </div>
  );
}
