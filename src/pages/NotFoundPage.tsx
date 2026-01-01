import { ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <section className="h-screen flex  items-center justify-center flex-col gap-4">
      <p className="text-3xl font-bold">Помилка 404</p>
      <p className="text-3xl">Контент не знайдень</p>
      <Button variant="link" asChild>
        <Link to="/">
          <ArrowLeft /> Повернутись додому
        </Link>
      </Button>
    </section>
  );
}
