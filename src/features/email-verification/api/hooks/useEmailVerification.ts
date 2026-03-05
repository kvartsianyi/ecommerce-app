import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { usersApi } from '..';
import type { ApiResponse, TokenPair } from '@/shared/types';

export const useEmailVerification = (
  options?: Omit<
    UseMutationOptions<ApiResponse<TokenPair>, Error, string>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['email-verification'],
    mutationFn: (data: string) => usersApi.emailVerification(data),
    ...options,
  });
