import { Button } from '@/shared/ui/button';

type AuthButtonProps = {
  openLogin: () => void;
  openRegister: () => void;
};

export function AuthButtons({ openLogin, openRegister }: AuthButtonProps) {
  return (
    <>
      <Button variant="ghost" onClick={openLogin}>
        Увійти
      </Button>
      <Button onClick={openRegister}>Реєстрація</Button>
    </>
  );
}
