import { useAuth } from '@/features/auth/api/hooks';
import { useCart } from '@/features/cart/api/hooks';
import { useModalStore } from '@/shared/store';
import { Logo } from './Logo';
import { logout } from '@/features/auth/logout';
import { AuthButtons } from './AuthButtons';
import { UserActions } from './UserActions';

export function Header() {
  const openLogin = useModalStore((state) => state.openLogin);
  const openRegister = useModalStore((state) => state.openRegister);
  const openCart = useModalStore((state) => state.openCart);

  const { user, isAuthenticated } = useAuth();
  const { data } = useCart();

  const items = data?.items ?? [];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Logo />

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <UserActions
              userName={user?.email || 'unknown'}
              count={items.length}
              onOpenCart={openCart}
              onLogout={logout}
            />
          ) : (
            <AuthButtons openLogin={openLogin} openRegister={openRegister} />
          )}
        </div>
      </div>
    </header>
  );
}
