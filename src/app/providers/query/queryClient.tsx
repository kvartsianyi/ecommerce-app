import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    mutations: {
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    onError: (err) => {
      toast.error('Щось пішло не так. Спробуйте ще раз.', {
        description: err.message,
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (err) => {
      toast.error('Щось пішло не так. Спробуйте ще раз.', {
        description: err.message,
      });
    },
  }),
});
