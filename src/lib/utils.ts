import { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function withMinDelay<T>(task: Promise<T>, ms = 300): Promise<T> {
  const [result] = await Promise.all([task, sleep(ms)]);
  return result;
}

export function getAxiosErrorMessage(
  error: unknown,
  fallback = 'Щось пішло не так. Спробуйте ще раз.'
): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.error?.message || fallback;
  }

  return fallback;
}

export function normalizeAxiosError(error: unknown) {
  const message = getAxiosErrorMessage(error);

  if (error instanceof AxiosError) {
    return {
      ...error,
      message,
    };
  }

  return { message };
}

export function normalizePhoneNumber(input: string) {
  const digits = input.replace(/\D/g, '');

  return !digits.startsWith('+380') ? `+380${digits}` : digits;
}
