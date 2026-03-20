import { api } from '@/shared/api';
import type { TokenPair } from '@/shared/types';

export const usersApi = {
  emailVerification: async (token: string): Promise<TokenPair> => {
    const res = await api.post('/users/verify-email', { token });
    return res.data;
  },
};
