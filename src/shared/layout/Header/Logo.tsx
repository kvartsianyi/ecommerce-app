import { Link } from '@tanstack/react-router';
import { Pizza } from 'lucide-react';

type LogoProps = {
  to?: string;
};

export function Logo({ to = '/' }: LogoProps) {
  return (
    <Link to={to} className="flex items-center gap-2">
      <div className="flex size-11 items-center justify-center bg-primary text-primary-foreground shadow-lg">
        <Pizza className="size-5" />
      </div>
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.25em]">
          Pizza House
        </p>
        <h1 className="text-lg font-semibold">Меню смачної піци</h1>
      </div>
    </Link>
  );
}
