import { AxiosError } from 'axios';

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
