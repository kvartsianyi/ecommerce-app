import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { authApi } from '..';
import type { User } from '@/shared/types';
import { tokenManager } from '@/shared/lib';

export const useAuth = (
  options?: Omit<
    UseQueryOptions<User, Error, User>,
    'queryKey' | 'queryFn' | 'retry'
  >
) => {
  const isAuthenticated = tokenManager.hasAuthToken();

  const query = useQuery({
    queryKey: ['me'],
    queryFn: authApi.fetchMe,
    retry: false,
    enabled: isAuthenticated,
    ...options,
  });

  return {
    ...query,
    user: query.data,
    isAuthenticated,
  };
};
