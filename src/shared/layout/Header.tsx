import { ShoppingCart, User, LogOut } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { useAuth } from '@/app/providers/auth/useAuth';
import { useCart } from '@/features/cart/api/hooks';
import { useModalStore } from '@/shared/store';

export function Header() {
  const openLogin = useModalStore((state) => state.openLogin);
  const openRegister = useModalStore((state) => state.openRegister);
  const openCart = useModalStore((state) => state.openCart);

  const { user, isAuthenticated, logout } = useAuth();
  const { data, isLoading } = useCart();

  const items = data?.items ?? [];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-2xl text-primary-foreground">🍕</span>
          </div>
          <span className="text-xl font-bold">Pizza House</span>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              disabled={isLoading}
              onClick={openCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {items.length}
                </span>
              )}
            </Button>
          )}

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem disabled>
                  <span className="font-medium">{user?.email}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Вийти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" onClick={openLogin}>
                Увійти
              </Button>
              <Button onClick={openRegister}>Реєстрація</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
