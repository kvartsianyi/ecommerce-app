import { Link } from '@tanstack/react-router';

type LogoProps = {
  to?: string;
};

export function Logo({ to = '/' }: LogoProps) {
  return (
    <Link to={to} className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
        <span className="text-2xl text-primary-foreground">🍕</span>
      </div>
      <span className="text-xl font-bold">Pizza House</span>
    </Link>
  );
}
