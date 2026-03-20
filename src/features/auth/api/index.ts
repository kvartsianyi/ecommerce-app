import { api } from '@/shared/api';
import type { ApiResponse, TokenPair } from '@/shared/types';
import type { LoginBody, RegistrationBody } from '../types';
import type { User } from '@/shared/types';

export const authApi = {
  fetchMe: async (): Promise<User> => {
    const res = await api.get('/users/me');
    return res.data;
  },
  login: async (data: LoginBody): Promise<TokenPair> => {
    const res = await api.post('/auth/login', data);
    return res.data;
  },
  register: async (data: RegistrationBody): Promise<ApiResponse<User>> =>
    api.post('/users', data),
  refresh: async (refreshToken: string): Promise<ApiResponse<TokenPair>> =>
    api.post(
      '/auth/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    ),
};
