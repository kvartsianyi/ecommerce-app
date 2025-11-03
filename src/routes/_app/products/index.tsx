import { ProductsPage } from '@/pages/ProductsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/products/')({
  component: ProductsPage,
});
