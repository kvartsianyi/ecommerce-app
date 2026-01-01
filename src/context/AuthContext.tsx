import type { AuthTokens } from '@/types/auth';
import type { User } from '@/types/user';
import { createContext } from 'react';

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
