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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { fetchProducts } from '@/lib/api';

export function ProductsPage() {
  const initialFetchProducts = { data: [] };

  const { data: { data: products } = initialFetchProducts } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const productsTotal = 124;

  return (
    <section className="flex-1 flex gap-4">
      {/* <div className="w-64">
        <div className="bg-secondary p-4 rounded-lg">
          <ProductFilters />
        </div>
      </div> */}
      <div className="flex-1 flex flex-col p-4 rounded-lg">
        <div className="flex justify-between items-end mb-4">
          <p className="text-muted-foreground">Знайдено {productsTotal}</p>
          <Select>
            <SelectTrigger className="w-[180px] data-[placeholder]:text-foreground">
              <SelectValue placeholder="Відсортувати" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Fruits</SelectLabel> */}
                <SelectItem value="lowest_price">Від найнижчої</SelectItem>
                <SelectItem value="highest_price">Від найвищої</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 mb-4">
          {products.map((product) => (
            <ProductCard
              className="hover:scale-[1.1] transition-transform"
              key={product.id}
              product={product}
            />
          ))}
        </div>
        <Pagination>
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
      </div>
    </section>
  );
}
