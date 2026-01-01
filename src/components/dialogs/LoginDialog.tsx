import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';

import type { LoginBody } from '@/types/auth';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { loginSchema } from '@/schemas/auth';
import { Spinner } from '../ui/spinner';
import { FormField } from '../FormField';

type LoginDialogProps = {
  open: boolean;
  isPendingSubmit: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: ({ email, password }: LoginBody) => void;
  onSwitchToRegister: () => void;
};

export function LoginDialog({
  open,
  isPendingSubmit,
  onOpenChange,
  onLogin,
  onSwitchToRegister,
}: LoginDialogProps) {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => onLogin(value),
  });

  useEffect(() => {
    if (!open) form.reset();
  }, [form, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Вхід</DialogTitle>
          <DialogDescription>
            Увійдіть у свій обліковий запис, щоб оформити замовлення
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <form.Field
              name="email"
              children={(field) => (
                <FormField
                  field={field}
                  type="email"
                  label="Електронна пошта"
                  placeholder="your@email.com"
                  required={true}
                />
              )}
            />
          </div>
          <div className="space-y-2">
            <form.Field
              name="password"
              children={(field) => (
                <FormField
                  field={field}
                  type="password"
                  label="Пароль"
                  placeholder="••••••••"
                  required={true}
                />
              )}
            />
          </div>
          <Button type="submit" className="w-full" onClick={form.handleSubmit}>
            {isPendingSubmit && <Spinner />} Увійти
          </Button>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Немає облікового запису?{' '}
            </span>
            <Button
              type="button"
              variant="link"
              className="p-0"
              onClick={onSwitchToRegister}
            >
              Зареєструватися
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
