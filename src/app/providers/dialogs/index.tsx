import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { toast } from 'sonner';

import { LoginDialog, RegisterDialog } from '@/features/auth/dialogs';
import { OrderDialog } from '@/features/order/dialogs';
import { Cart } from '@/features/cart/components';
import { useModalStore } from '@/shared/store';
import { useAuth } from '@/app/providers/auth';
import { useCart } from '@/features/cart/api/hooks';
import { useLogin, useRegistration } from '@/features/auth/api/hooks';

export function DialogsProvider() {
  const { isLoginOpen, openLogin, closeLogin } = useModalStore(
    useShallow((state) => ({
      isLoginOpen: state.isLoginOpen,
      openLogin: state.openLogin,
      closeLogin: state.closeLogin,
    }))
  );

  const { isRegisterOpen, openRegister, closeRegister } = useModalStore(
    useShallow((state) => ({
      isRegisterOpen: state.isRegisterOpen,
      openRegister: state.openRegister,
      closeRegister: state.closeRegister,
    }))
  );

  const { isCartOpen, closeCart } = useModalStore(
    useShallow((state) => ({
      isCartOpen: state.isCartOpen,
      closeCart: state.closeCart,
    }))
  );

  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const { isAuthenticated, login } = useAuth();
  const { data, refetch: fetchCart } = useCart();

  const items = data?.items ?? [];

  const onLoginOpenChange = (open: boolean) =>
    useModalStore.setState({
      isLoginOpen: open,
    });

  const onRegisterOpenChange = (open: boolean) =>
    useModalStore.setState({
      isRegisterOpen: open,
    });

  const onCartOpenChange = (open: boolean) =>
    useModalStore.setState({
      isCartOpen: open,
    });

  const { mutate: handleLogin, isPending: isLoginPending } = useLogin({
    onSuccess: async ({ data: tokens }) => {
      closeLogin();

      await login(tokens);
      await fetchCart();
    },
  });

  const { mutate: handleRegistration, isPending: isRegistrationPending } =
    useRegistration({
      onSuccess: async () => {
        closeRegister();

        toast.success('Реєстрація успішна', {
          description:
            'Перевірте вашу електронну пошту для підтвердження облікового запису.',
        });
      },
    });

  const handleCheckout = () => {
    closeCart();
    setIsOrderOpen(true);
  };

  return (
    <>
      <LoginDialog
        open={isLoginOpen}
        isPendingSubmit={isLoginPending}
        onOpenChange={onLoginOpenChange}
        onLogin={handleLogin}
        onSwitchToRegister={openRegister}
      />

      <RegisterDialog
        open={isRegisterOpen}
        isPendingSubmit={isRegistrationPending}
        onOpenChange={onRegisterOpenChange}
        onRegister={handleRegistration}
        onSwitchToLogin={openLogin}
      />

      <Cart
        open={isCartOpen}
        onOpenChange={onCartOpenChange}
        onCheckout={handleCheckout}
      />

      <OrderDialog
        open={isOrderOpen}
        onOpenChange={setIsOrderOpen}
        cart={items}
        onOrderComplete={() => {}}
        isAuthenticated={isAuthenticated}
        onLoginRequired={() => {
          setIsOrderOpen(false);
          openLogin();
        }}
      />
    </>
  );
}
