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
import { FormField } from '../ui/FormField';
import { FieldGroup, FieldSeparator } from '../ui/field';
import { Input } from '../ui/input';
import { GoogleIcon } from '../ui/GoogleIcon';

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
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => onLogin(value),
  });

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
          }}
          className="space-y-4"
        >
          <FieldGroup>
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
                      placeholder="your@email.com"
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
              {isPendingSubmit && <Spinner data-icon="inline-start" />} Увійти
            </Button>
            <FieldSeparator>АБО</FieldSeparator>
            <Button
              variant="outline"
              className="w-full"
              disabled={isPendingSubmit}
            >
              {isPendingSubmit ? (
                <Spinner data-icon="inline-start" />
              ) : (
                <GoogleIcon className="w-5 h-5" />
              )}{' '}
              Увійти через Google
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
