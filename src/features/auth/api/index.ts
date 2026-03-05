import { api } from '@/shared/api';
import type { ApiResponse, TokenPair } from '@/shared/types';
import type { LoginBody, RegistrationBody } from '../types';
import type { User } from '@/shared/types';

export const authApi = {
  fetchMe: async (): Promise<ApiResponse<User>> => api.get('/users/me'),
  login: async (data: LoginBody): Promise<ApiResponse<TokenPair>> =>
    api.post('/auth/login', data),
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
