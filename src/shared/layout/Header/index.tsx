import { useAuth } from '@/features/auth/api/hooks';
import { useCart } from '@/features/cart/api/hooks';
import { useModalStore } from '@/shared/store';
import { logout } from '@/features/auth/logout';
import { AuthButtons } from './AuthButtons';
import { UserActions } from './UserActions';
import { Logo } from './Logo';
import { ThemeButton } from './ThemeButton';

export function Header() {
  const openLogin = useModalStore((state) => state.openLogin);
  const openRegister = useModalStore((state) => state.openRegister);
  const openCart = useModalStore((state) => state.openCart);

  const { isAuthenticated } = useAuth();
  const { data } = useCart();

  const items = data?.items ?? [];

  return (
    <header className="section flex items-center justify-between sm:px-6">
      <Logo />

      <div className="flex items-center gap-3">
        <ThemeButton />

        {isAuthenticated ? (
          <UserActions
            count={items.length}
            onOpenCart={openCart}
            onLogout={logout}
          />
        ) : (
          <AuthButtons openLogin={openLogin} openRegister={openRegister} />
        )}
      </div>
    </header>
  );
}
