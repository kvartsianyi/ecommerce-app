import { Link } from '@tanstack/react-router';
import { Pizza } from 'lucide-react';

type LogoProps = {
  to?: string;
  title?: string;
};

export function Logo({ to = '/', title = 'Меню смачної піци' }: LogoProps) {
  return (
    <Link to={to} className="flex items-center gap-2">
      <div className="flex size-11 items-center justify-center bg-primary text-primary-foreground shadow-lg">
        <Pizza className="size-5" />
      </div>
      <div>
        <p className="eyebrow">Pizza House</p>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
    </Link>
  );
}
