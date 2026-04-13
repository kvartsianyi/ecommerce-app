import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';

import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { registrationSchema } from '../schemas';
import { FormField } from '@/shared/ui/FormField';
import { Spinner } from '@/shared/ui/spinner';
import { Input } from '@/shared/ui/input';
import { FieldGroup } from '@/shared/ui/field';
import { PhoneInput } from '@/shared/ui/PhoneInput';
import { normalizePhoneNumber } from '@/shared/utils';
import type { RegistrationBody } from '../types';

type RegisterDialogProps = {
  open: boolean;
  isPendingSubmit: boolean;
  onOpenChange: (open: boolean) => void;
  onRegister: (userDetails: RegistrationBody) => void;
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
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: registrationSchema,
    },
    onSubmit: async ({ value }) => {
      const { firstName, lastName, phone, email, password } = value;

      onRegister({
        firstName,
        lastName,
        email,
        password,
        phone: normalizePhoneNumber(phone),
      });
    },
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
          }}
          className="space-y-4"
        >
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <form.Field
                name="firstName"
                children={(field) => (
                  <FormField
                    field={field}
                    label="Ім'я"
                    required={true}
                    children={(control) => (
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={control.isInvalid}
                        placeholder="Олександр"
                      />
                    )}
                  />
                )}
              />
              <form.Field
                name="lastName"
                children={(field) => (
                  <FormField
                    field={field}
                    label="Прізвище"
                    required={true}
                    children={(control) => (
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={control.isInvalid}
                        placeholder="Шевченко"
                      />
                    )}
                  />
                )}
              />
            </div>
            <form.Field
              name="phone"
              children={(field) => (
                <FormField
                  field={field}
                  label="Номер телефону"
                  required={true}
                  children={(control) => (
                    <PhoneInput
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="(XX) XXX XX XX"
                      aria-invalid={control.isInvalid}
                      maxLength={9}
                      required={true}
                    />
                  )}
                />
              )}
            />
            <form.Field
              name="email"
              children={(field) => (
                <FormField
                  field={field}
                  label="Електронна пошта"
                  required={true}
                  children={(control) => (
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={control.isInvalid}
                      placeholder="example@email.com"
                    />
                  )}
                />
              )}
            />
            <form.Field
              name="password"
              children={(field) => (
                <FormField
                  field={field}
                  label="Пароль"
                  required={true}
                  children={(control) => (
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={control.isInvalid}
                      placeholder="●●●●●●●●"
                    />
                  )}
                />
              )}
            />
            <form.Field
              name="confirmPassword"
              children={(field) => (
                <FormField
                  field={field}
                  label="Підтвердіть пароль"
                  required={true}
                  children={(control) => (
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={control.isInvalid}
                      placeholder="●●●●●●●●"
                    />
                  )}
                />
              )}
            />
            <Button
              type="submit"
              className="w-full"
              onClick={form.handleSubmit}
              disabled={isPendingSubmit}
            >
              {isPendingSubmit ? (
                <>
                  <Spinner /> Реєстрація...
                </>
              ) : (
                'Зареєструватися'
              )}
            </Button>
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
