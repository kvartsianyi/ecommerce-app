import { useState } from 'react';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/Hero';
import { Menu } from '@/components/Menu';
import { OrderModal } from '@/components/modals/order-modal';
import { Cart } from '@/components/cart';
import { RegisterModal } from '@/components/modals/register-modal';
import { LoginModal } from '@/components/modals/login-modal';

export type Pizza = {
  id: string;
  name: string;
  nameUk: string;
  description: string;
  descriptionUk: string;
  price: number;
  image?: string;
  category: string;
};

export type CartItem = {
  id: string;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Ivan');

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

  const handleLogin = (email: string, password: string) => {
    console.log('Login:', email, password);
    setIsLoggedIn(true);
    setUserName(email.split('@')[0]);
    setIsLoginOpen(false);
  };

  const handleRegister = (name: string, email: string, password: string) => {
    console.log('Register:', name, email, password);
    setIsLoggedIn(true);
    setUserName(name);
    setIsRegisterOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    clearCart();
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsOrderOpen(true);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen">
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
        onLogout={handleLogout}
        onCartClick={() => setIsCartOpen(true)}
        cartItemsCount={totalItems}
      />
      <Hero />
      <Menu onAddToCart={addToCart} />

      <LoginModal
        open={isLoginOpen}
        onOpenChange={setIsLoginOpen}
        onLogin={handleLogin}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <RegisterModal
        open={isRegisterOpen}
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

      <OrderModal
        open={isOrderOpen}
        onOpenChange={setIsOrderOpen}
        cart={cart}
        onOrderComplete={clearCart}
        isLoggedIn={isLoggedIn}
        onLoginRequired={() => {
          setIsOrderOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <Footer />
    </div>
  );
}
