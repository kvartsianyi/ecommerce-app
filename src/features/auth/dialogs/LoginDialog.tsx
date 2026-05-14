import { useEffect } from 'react';
import { useStore } from '@tanstack/react-form';

import type { LoginBody } from '../types';
import type { TokenPair } from '@/shared/types/auth';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { loginSchema } from '../schemas';
import { FieldGroup, FieldSeparator } from '@/shared/components/ui/field';
import { GoogleIcon } from '@/shared/components/ui/GoogleIcon';
import { useAppForm } from '@/shared/components/form';

type LoginDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (data: LoginBody) => Promise<TokenPair>;
  onSwitchToRegister: () => void;
};

export function LoginDialog({
  open,
  onOpenChange,
  onLogin,
  onSwitchToRegister,
}: LoginDialogProps) {
  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => onLogin(value),
  });

  const isSubmitting = useStore(
    form.store,
    (state) => state.isSubmitting
  );

  useEffect(() => {
    if (!open) form.reset();
  }, [form, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="sm:text-center">
          <DialogTitle className="text-3xl">Вхід</DialogTitle>
          <DialogDescription>
            Увійдіть у свій обліковий запис, щоб оформити замовлення
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <FieldGroup>
            <form.AppField
              name="email"
              children={(field) => (
                <field.TextField
                  label="Електронна пошта"
                  type="email"
                  placeholder="example@email.com"
                />
              )}
            />
            <form.AppField
              name="password"
              children={(field) => (
                <field.TextField
                  label="Пароль"
                  labelAction={
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto"
                      onClick={onSwitchToRegister}
                    >
                      Забули пароль?
                    </Button>
                  }
                  type="password"
                  placeholder="●●●●●●●●"
                />
              )}
            />
            <form.AppForm>
              <form.SubmitButton className="w-full" loadingText="Вхід...">
                Увійти
              </form.SubmitButton>
            </form.AppForm>
            <FieldSeparator>АБО</FieldSeparator>
            <Button
              variant="outline"
              className="w-full"
              disabled={isSubmitting}
            >
              <GoogleIcon className="w-5 h-5" /> Увійти через Google
            </Button>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Немає облікового запису?{' '}
              </span>
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto"
                onClick={onSwitchToRegister}
              >
                Зареєструватися
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
