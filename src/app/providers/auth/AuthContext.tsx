import { createContext } from 'react';

import type { AuthTokens, User } from '@/shared/types';

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (tokens: AuthTokens) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
