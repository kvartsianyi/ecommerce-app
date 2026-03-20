import { queryClient } from '@/app/providers/query/queryClient';
import { router } from '@/app/providers/router';
import { tokenManager } from '@/shared/lib';

export const logout = async () => {
  tokenManager.clearTokens();

  await queryClient.setQueryData(['me'], null);

  router.navigate({ to: '/', replace: true });
};
