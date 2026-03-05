import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { authApi } from '..';
import type { LoginBody } from '../../types';
import type { ApiResponse, TokenPair } from '@/shared/types';

export const useLogin = (
  options?: Omit<
    UseMutationOptions<ApiResponse<TokenPair>, Error, LoginBody>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginBody) => authApi.login(data),
    ...options,
  });
