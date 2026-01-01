import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { ProductCard } from '@/components/features/ProductCard';
// import { ProductFilters } from '@/components/features/ProductFilters';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { fetchProducts } from '@/lib/api';
import { LoginDialog } from '@/components/features/LoginDialog';

export function ProductsPage() {
  const initialFetchProducts = { data: [] };

  const { data: { data: products } = initialFetchProducts, isPending } =
    useQuery({
      queryKey: ['products'],
      queryFn: fetchProducts,
    });

  const [isOpenLogin, setIsOpenLogin] = useState(false);

  return (
    <>
      <section className="flex-1 flex flex-col">
        {isPending && <div className="text-center">Завантаження...</div>}
        {products.length && (
          <div className="grid xl:grid-cols-3 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                className="hover:scale-[1.1] transition-transform"
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>

      <LoginDialog open={isOpenLogin} onOpenChange={setIsOpenLogin} />
    </>
  );
}
