import type { Nullable } from './utils';

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

export type AuthTokens = Nullable<TokenPair>;

export type LoginBody = {
  email: string;
  password: string;
};
