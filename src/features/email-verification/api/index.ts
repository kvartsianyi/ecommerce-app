import { api } from '@/shared/api';
import type { ApiResponse, TokenPair } from '@/shared/types';

export const usersApi = {
  emailVerification: async (token: string): Promise<ApiResponse<TokenPair>> =>
    api.post('/users/verify-email', { token }),
};
