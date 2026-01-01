// import { Link, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
// import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
// import { useAuth } from '@/hooks/useAuth';
// import { authApi } from '@/lib/api';
// import type { LoginBody } from '@/types/auth';
// import { useForm } from '@tanstack/react-form';
// import { loginSchema } from '@/schemas/auth';
// import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
// import { Input } from '../ui/input';
import { Spinner } from '../ui/spinner';

// TODO: need to finish this dialog and also do register dialog

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export function LoginDialog({ open, onOpenChange }: Props) {
  // const navigate = useNavigate();
  // const { setTokens } = useAuth();

  // const loginMutation = useMutation({
  //   // mutationFn: (data: LoginBody) => authApi.login(data),
  //   // onSuccess: ({ data: tokens }) => {
  //   //   setTokens(tokens);
  //   //   navigate({ to: '/products' });
  //   // },
  //   onError: () =>
  //     toast.error('Помилка входу', {
  //       description: 'Невірний email або пароль.',
  //     }),
  // });

  // const form = useForm({
  //   defaultValues: {
  //     email: '',
  //     password: '',
  //   },
  //   validators: {
  //     // onChange: loginSchema,
  //   },
  //   onSubmit: async ({ value }) => {
  //     console.log('Form Submitted', value);

  //     // await loginMutation.mutateAsync(value);
  //   },
  // });

  return (
    <></>
    // <Dialog open={open} onOpenChange={onOpenChange}>
    //   <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle>Увійти</DialogTitle>
    //       <DialogDescription>
    //         Введіть ваш логін і пароль щоб увійти в акаунт
    //       </DialogDescription>
    //       <form
    //         onSubmit={(e) => {
    //           e.preventDefault();
    //           e.stopPropagation();
    //         }}
    //       >
    //         {/* <FieldGroup>
    //           <form.Field
    //             name="email"
    //             children={(field) => {
    //               const isInvalid =
    //                 field.state.meta.isTouched && !field.state.meta.isValid;

    //               return (
    //                 <Field>
    //                   <FieldLabel htmlFor={field.name}>Email</FieldLabel>
    //                   <Input
    //                     type="email"
    //                     placeholder="example@example.com"
    //                     required
    //                     id={field.name}
    //                     name={field.name}
    //                     value={field.state.value}
    //                     onBlur={field.handleBlur}
    //                     onChange={(e) => field.handleChange(e.target.value)}
    //                     aria-invalid={isInvalid}
    //                   />
    //                   {isInvalid && (
    //                     <FieldError errors={field.state.meta.errors} />
    //                   )}
    //                 </Field>
    //               );
    //             }}
    //           />
    //           <form.Field
    //             name="password"
    //             children={(field) => {
    //               const isInvalid =
    //                 field.state.meta.isTouched && !field.state.meta.isValid;
    //               return (
    //                 <Field>
    //                   <div className="flex items-center">
    //                     <FieldLabel htmlFor={field.name}>Пароль</FieldLabel>
    //                     <Link
    //                       to="/register"
    //                       className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
    //                     >
    //                       Забули пароль?
    //                     </Link>
    //                   </div>
    //                   <Input
    //                     type="password"
    //                     placeholder="********"
    //                     required
    //                     id={field.name}
    //                     name={field.name}
    //                     value={field.state.value}
    //                     onBlur={field.handleBlur}
    //                     onChange={(e) => field.handleChange(e.target.value)}
    //                     aria-invalid={isInvalid}
    //                   />
    //                   {isInvalid && (
    //                     <FieldError errors={field.state.meta.errors} />
    //                   )}
    //                 </Field>
    //               );
    //             }}
    //           />
    //         </FieldGroup> */}
    //       </form>
    //     </DialogHeader>
    //     <DialogFooter className="sm:flex-col">
    //       <Button
    //         className="cursor-pointer"
    //         onClick={form.handleSubmit}
    //         disabled={loginMutation.isPending}
    //       >
    //         {loginMutation.isPending && <Spinner />} Увійти
    //       </Button>
    //       <div className="flex justify-center items-center text-sm underline-offset-4">
    //         Немає акаунта?
    //         <Button variant="link" className="cursor-pointer">
    //           Зареєструватись
    //         </Button>
    //       </div>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
  );
}
