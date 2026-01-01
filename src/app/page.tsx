import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import type {
  LoginBody,
  RegistrationBody,
  RegistrationForm,
} from '@/types/auth';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/Hero';
import { Menu } from '@/components/Menu';
import { OrderDialog } from '@/components/dialogs/OrderDialog';
import { Cart } from '@/components/Cart';
import { RegisterDialog } from '@/components/dialogs/RegisterDialog';
import { LoginDialog } from '@/components/dialogs/LoginDialog';
import { authApi } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import type { Pizza } from '@/types/product';

export type CartItem = {
  id: number;
  title: string;
  picture: string;
  price: number;
  quantity: number;
};

export function Page() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const { user, isAuthenticated, login, logout } = useAuth();

  const addToCart = (pizza: Pizza, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === pizza.id);
      if (existing) {
        return prev.map((item) =>
          item.id === pizza.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...pizza, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const loginMutation = useMutation({
    mutationFn: (data: LoginBody) => authApi.login(data),
    onSuccess: async ({ data: tokens }) => {
      setIsLoginOpen(false);

      await login(tokens);
    },
    onError: () => {
      toast.error('Помилка входу', {
        description: 'Невірний email або пароль.',
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
    onError: (error) => {
      console.log(error);
      toast.error('Помилка реєстрації', {
        description: error.message,
      });
    },
  });

  const handleRegister = (userDetails: RegistrationForm) => {
    console.log('Register:', userDetails);
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

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen">
      <Header
        isAuthenticated={isAuthenticated}
        userName={user?.email || ''}
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
        onLogout={handleLogout}
        onCartClick={() => setIsCartOpen(true)}
        cartItemsCount={totalItems}
      />
      <Hero />
      <Menu onAddToCart={addToCart} />

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
        onOpenChange={setIsCartOpen}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      <OrderDialog
        open={isOrderOpen}
        onOpenChange={setIsOrderOpen}
        cart={cart}
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
