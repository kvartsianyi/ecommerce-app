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
import { Input } from '@/components/ui/input';
import { loginSchema } from '@/schemas/auth';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Spinner } from '../ui/spinner';

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
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Електронна пошта
                    </FieldLabel>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      required
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </div>
          <div className="space-y-2">
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Пароль</FieldLabel>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      required
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
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
              className="cursor-pointer p-0"
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
