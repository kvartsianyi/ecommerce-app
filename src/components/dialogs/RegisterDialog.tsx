import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { registrationSchema } from '@/schemas/auth';
import { FormField } from '../FormField';
import { Spinner } from '../ui/spinner';
import type { RegistrationForm } from '@/types/auth';

type RegisterDialogProps = {
  open: boolean;
  isPendingSubmit: boolean;
  onOpenChange: (open: boolean) => void;
  onRegister: (userDetails: RegistrationForm) => void;
  onSwitchToLogin: () => void;
};

export function RegisterDialog({
  open,
  isPendingSubmit,
  onOpenChange,
  onRegister,
  onSwitchToLogin,
}: RegisterDialogProps) {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onChange: registrationSchema,
    },
    onSubmit: async ({ value }) => onRegister(value),
  });

  useEffect(() => {
    if (!open) form.reset();
  }, [form, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Реєстрація</DialogTitle>
          <DialogDescription>
            Створіть обліковий запис, щоб замовляти піцу
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="space-y-4"
        >
          <div className="flex gap-4 space-y-2">
            <form.Field
              name="firstName"
              children={(field) => (
                <FormField
                  field={field}
                  label="Ім'я"
                  placeholder="Ім'я"
                  required={true}
                />
              )}
            />
            <form.Field
              name="lastName"
              children={(field) => (
                <FormField
                  field={field}
                  label="Прізвище"
                  placeholder="Прізвище"
                  required={true}
                />
              )}
            />
          </div>
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
          <div className="space-y-2">
            <form.Field
              name="confirmPassword"
              children={(field) => (
                <FormField
                  field={field}
                  type="password"
                  label="Підтвердіть пароль"
                  placeholder="••••••••"
                  required={true}
                />
              )}
            />
          </div>
          <Button type="submit" className="w-full" onClick={form.handleSubmit}>
            {isPendingSubmit && <Spinner />} Зареєструватися
          </Button>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Вже є обліковий запис?{' '}
            </span>
            <Button
              type="button"
              variant="link"
              className="p-0"
              onClick={onSwitchToLogin}
            >
              Увійти
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
