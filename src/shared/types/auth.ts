import type { Nullable } from './utils';

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

export type AuthTokens = Nullable<TokenPair>;

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  isEmailConfirmed: boolean;
  createdAt: string;
  updatedAt: string;
};
