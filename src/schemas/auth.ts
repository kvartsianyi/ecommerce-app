import * as z from 'zod';

const emailValidator = z.email('Невірний формат електронної пошти.');
const phoneValidator = z.string().regex(/^\d{9}$/, 'Невірний номер телефону');
const passwordValidator = z
  .string()
  .min(8, 'Пароль повинен містити не менше 8 символів.')
  .max(100, 'Пароль повинен містити не більше 100 символів.');

export const loginSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});

export const registrationSchema = z
  .object({
    firstName: z
      .string()
      .min(3, "Ім'я повинно містити не менше 3 символів.")
      .max(30, "Ім'я повинно містити не більше 30 символів."),
    lastName: z
      .string()
      .min(3, 'Прізвище повинно містити не менше 3 символів.')
      .max(30, 'Прізвище повинно містити не більше 30 символів.'),
    phone: phoneValidator,
    email: emailValidator,
    password: passwordValidator,
    confirmPassword: passwordValidator,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не співпадають.',
    path: ['confirmPassword'],
  });
