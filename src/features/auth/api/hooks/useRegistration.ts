import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { authApi } from '..';
import type { RegistrationBody } from '../../types';
import type { ApiResponse, User } from '@/shared/types';

export const useRegistration = (
  options?: Omit<
    UseMutationOptions<ApiResponse<User>, Error, RegistrationBody>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['registration'],
    mutationFn: (data: RegistrationBody) => authApi.register(data),
    ...options,
  });
