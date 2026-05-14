import { useEffect } from 'react';

import type { RegistrationBody } from '../types';
import type { ApiResponse, User } from '@/shared/types';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { registrationSchema } from '../schemas';
import { FieldGroup } from '@/shared/components/ui/field';
import { normalizePhoneNumber } from '@/shared/utils';
import { useAppForm } from '@/shared/components/form';

type RegisterDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRegister: (userDetails: RegistrationBody) => Promise<ApiResponse<User>>;
  onSwitchToLogin: () => void;
};

export function RegisterDialog({
  open,
  onOpenChange,
  onRegister,
  onSwitchToLogin,
}: RegisterDialogProps) {
  const form = useAppForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: registrationSchema,
    },
    onSubmit: async ({
      value: { firstName, lastName, phone, email, password },
    }) =>
      onRegister({
        firstName,
        lastName,
        email,
        password,
        phone: normalizePhoneNumber(phone),
      }),
  });

  useEffect(() => {
    if (!open) form.reset();
  }, [form, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md gap-8">
        <DialogHeader className=" sm:text-center">
          <DialogTitle className="text-3xl">Реєстрація</DialogTitle>
          <DialogDescription>
            Створіть аккаунт для швидкого замовлення
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
            <div className="grid grid-cols-2 gap-4">
              <form.AppField
                name="firstName"
                children={(field) => (
                  <field.TextField label="Ім'я" placeholder="Олександр" />
                )}
              />
              <form.AppField
                name="lastName"
                children={(field) => (
                  <field.TextField label="Прізвище" placeholder="Шевченко" />
                )}
              />
            </div>
            <form.AppField
              name="phone"
              children={(field) => (
                <field.PhoneField
                  label="Номер телефону"
                  placeholder="(XX) XXX XX XX"
                />
              )}
            />
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
                  type="password"
                  placeholder="●●●●●●●●"
                />
              )}
            />
            <form.AppField
              name="confirmPassword"
              children={(field) => (
                <field.TextField
                  label="Підтвердіть пароль"
                  type="password"
                  placeholder="●●●●●●●●"
                />
              )}
            />
            <form.AppForm>
              <form.SubmitButton className="w-full" loadingText="Реєстрація...">
                Зареєструватися
              </form.SubmitButton>
            </form.AppForm>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Вже є обліковий запис?{' '}
              </span>
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto"
                onClick={onSwitchToLogin}
              >
                Увійти
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
