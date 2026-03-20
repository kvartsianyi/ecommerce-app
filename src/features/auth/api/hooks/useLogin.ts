import {
  type UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { authApi } from '..';
import type { LoginBody } from '../../types';
import type { TokenPair } from '@/shared/types';
import { tokenManager } from '@/shared/lib';
import { useModalStore } from '@/shared/store';

export const useLogin = (
  options?: Omit<
    UseMutationOptions<TokenPair, Error, LoginBody>,
    'mutationKey' | 'mutationFn' | 'onSuccess'
  >
) => {
  const queryClient = useQueryClient();
  const closeLogin = useModalStore((state) => state.closeLogin);

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginBody) => authApi.login(data),
    onSuccess: async (tokens) => {
      closeLogin();
      tokenManager.setTokens(tokens);

      await queryClient.invalidateQueries({ queryKey: ['me'], exact: true });
      await queryClient.invalidateQueries({ queryKey: ['cart'], exact: true });
    },
    ...options,
  });
};
