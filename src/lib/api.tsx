import axios from 'axios';

import type { Product } from '@/types/product';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

type ApiResponse<T> = {
  data: T[];
};

export const fetchProducts = async (): Promise<ApiResponse<Product>> =>
  api.get('/products');
