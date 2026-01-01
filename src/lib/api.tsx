import axios from 'axios';

import type { Pizza } from '@/types/product';
import type { LoginBody, TokenPair } from '@/types/auth';
import tokenManager from './tokenManager';
import type { User } from '@/types/user';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

const refreshApi = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    const exeptionUrls = ['/auth/login', '/auth/refresh'];
    if (
      error.response.status === 401 &&
      !exeptionUrls.includes(originalRequest.url) &&
      !originalRequest._retry
    ) {
      const refreshToken = tokenManager.getRefreshToken();
      originalRequest._retry = true;

      try {
        const { data } = await refreshApi.post(
          '/auth/refresh',
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );

        tokenManager.setTokens(data);
        api.defaults.headers.common['Authorization'] =
          `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        tokenManager.clearTokens();

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const token = tokenManager.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

type ApiResponse<T> = {
  data: T;
};

export const authApi = {
  login: async (data: LoginBody): Promise<ApiResponse<TokenPair>> =>
    api.post('/auth/login', data),
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

export const productsApi = {
  fetchProducts: async (): Promise<ApiResponse<Pizza[]>> =>
    api.get('/products'),
};

export const usersApi = {
  fetchMe: async (): Promise<ApiResponse<User>> => api.get('/users/me'),
};
