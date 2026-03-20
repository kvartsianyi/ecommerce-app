import axios from 'axios';

import { tokenManager } from '@/shared/lib';
import { normalizeAxiosError } from '@/shared/utils';
import { logout } from '@/features/auth';

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
        logout();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(normalizeAxiosError(error));
  }
);

api.interceptors.request.use((config) => {
  const token = tokenManager.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
