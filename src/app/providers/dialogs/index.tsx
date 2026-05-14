import { useShallow } from 'zustand/react/shallow';
import { toast } from 'sonner';

import { LoginDialog, RegisterDialog } from '@/features/auth/dialogs';
import { Cart } from '@/features/cart/components';
import { useModalStore } from '@/shared/store';
import { useLogin, useRegistration } from '@/features/auth/api/hooks';
import { router } from '../router';

export function DialogsProvider() {
  const { isLoginOpen, openLogin } = useModalStore(
    useShallow((state) => ({
      isLoginOpen: state.isLoginOpen,
      openLogin: state.openLogin,
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

  const { mutateAsync: handleLogin } = useLogin();

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
    router.navigate({ to: '/checkout' });
  };

  return (
    <>
      <LoginDialog
        open={isLoginOpen}
        onOpenChange={onLoginOpenChange}
        onLogin={handleLogin}
        onSwitchToRegister={openRegister}
      />

      <RegisterDialog
        open={isRegisterOpen}
        isSubmitting={isRegistrationPending}
        onOpenChange={onRegisterOpenChange}
        onRegister={handleRegistration}
        onSwitchToLogin={openLogin}
      />

      <Cart
        open={isCartOpen}
        onOpenChange={onCartOpenChange}
        onCheckout={handleCheckout}
      />
    </>
  );
}
