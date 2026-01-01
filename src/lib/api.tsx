import axios from 'axios';

import type { Product } from '@/types/product';
// import tokenManager from './tokenManager';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

const refreshApi = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
  // async (error) => {
  //   const originalRequest = error.config;

  //   if (error.response.status === 401 && !originalRequest._retry) {
  //     const refreshToken = tokenManager.getRefreshToken();
  //     originalRequest._retry = true;

  //     try {
  //       const { data } = await refreshApi.post(
  //         '/auth/refresh',
  //         {},
  //         { headers: { Authorization: `Bearer ${refreshToken}` } }
  //       );

  //       tokenManager.setTokens(data);
  //       api.defaults.headers.common['Authorization'] =
  //         `Bearer ${data.accessToken}`;

  //       return api(originalRequest);
  //     } catch (refreshError) {
  //       console.error('Refresh token err:', refreshError);
  //       tokenManager.clearTokens();

  //       return Promise.reject(refreshError);
  //     }
  //   }
  //   return Promise.reject(error);
  // }
);

type ApiResponse<T> = {
  data: T[];
};

export const fetchProducts = async (): Promise<ApiResponse<Product>> =>
  api.get('/products');
