import { Button } from '@/shared/ui/button';

type AuthButtonProps = {
  openLogin: () => void;
  openRegister: () => void;
};

export function AuthButtons({ openLogin, openRegister }: AuthButtonProps) {
  return (
    <>
      <Button size="lg" variant="outline" onClick={openLogin}>
        Увійти
      </Button>
      <Button size="lg" onClick={openRegister}>
        Реєстрація
      </Button>
    </>
  );
}
