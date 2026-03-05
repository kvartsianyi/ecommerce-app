import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import type {
  LoginBody,
  RegistrationBody,
  RegistrationForm,
} from '@/features/auth/types';
import { Header } from '@/shared/layout/Header';
import { Footer } from '@/shared/layout/Footer';
import { Hero } from '@/features/pizza/components/Hero';
import { Menu } from '@/features/pizza/components/Menu';
import { OrderDialog } from '@/features/order/dialogs/OrderDialog';
import { Cart } from '@/features/cart/api/components/Cart';
import { RegisterDialog } from '@/features/auth/dialogs/RegisterDialog';
import { LoginDialog } from '@/features/auth/dialogs/LoginDialog';
import { authApi } from '@/features/auth/api';
import { useAuth } from '@/app/providers/auth/useAuth';
import { useCart } from '@/app/providers/cart/useCart';

export function HomePage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { user, isAuthenticated, login, logout } = useAuth();
  const {
    items: cartItems,
    totalAmount,
    fetchCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const handleAddToCart = async (id: number, quantity = 1) => {
    if (!isAuthenticated) {
      setIsLoginOpen(true);
      return;
    }

    try {
      await addToCart(id, quantity);
      setIsCartOpen(true);
    } catch {
      toast.error('Помилка додавання в кошик');
    }
  };

  const handleRemoveFromCart = async (id: number) => {
    try {
      await removeFromCart(id);
    } catch {
      toast.error('Помилка видалення з кошика');
    }
  };

  const handleUpdateQuantity = async (id: number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }

    try {
      await updateQuantity(id, quantity);
    } catch {
      toast.error('Помилка оновлення кількості');
    }
  };

  const loginMutation = useMutation({
    mutationFn: (data: LoginBody) => authApi.login(data),
    onSuccess: async ({ data: tokens }) => {
      setIsLoginOpen(false);

      await login(tokens);
      await fetchCart();
    },
    onError: (err) => {
      toast.error('Помилка входу', {
        description: err.message,
      });
    },
  });

  const handleLogin = (credentials: LoginBody) =>
    loginMutation.mutate(credentials);

  const registrationMutation = useMutation({
    mutationFn: (data: RegistrationBody) => authApi.register(data),
    onSuccess: async () => {
      setIsRegisterOpen(false);

      toast.success('Реєстрація успішна', {
        description:
          'Перевірте вашу електронну пошту для підтвердження облікового запису.',
      });
    },
    onError: (err) => {
      toast.error('Помилка реєстрації', {
        description: err.message,
      });
    },
  });

  const handleRegister = (userDetails: RegistrationForm) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...restUserDetails } = userDetails;

    registrationMutation.mutate(restUserDetails);
  };

  const handleLogout = () => {
    clearCart();
    logout();
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsOrderOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header
        isAuthenticated={isAuthenticated}
        userName={user?.email || ''}
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
        onLogout={handleLogout}
        onCartClick={() => setIsCartOpen(true)}
        cartItemsCount={cartItems.length}
      />
      <Hero />
      <Menu onAddToCart={handleAddToCart} />

      <LoginDialog
        open={isLoginOpen}
        isPendingSubmit={loginMutation.isPending}
        onOpenChange={setIsLoginOpen}
        onLogin={handleLogin}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <RegisterDialog
        open={isRegisterOpen}
        isPendingSubmit={registrationMutation.isPending}
        onOpenChange={setIsRegisterOpen}
        onRegister={handleRegister}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <Cart
        open={isCartOpen}
        items={cartItems}
        totalAmount={totalAmount}
        onOpenChange={setIsCartOpen}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <OrderDialog
        open={isOrderOpen}
        onOpenChange={setIsOrderOpen}
        cart={cartItems}
        onOrderComplete={clearCart}
        isAuthenticated={isAuthenticated}
        onLoginRequired={() => {
          setIsOrderOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <Footer />
    </div>
  );
}
