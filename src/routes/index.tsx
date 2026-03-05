import { HomePage } from '@/features/pizza/pages/HomePage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});
