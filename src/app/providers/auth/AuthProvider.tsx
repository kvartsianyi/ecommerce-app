import { useEffect, useState } from 'react';

import { queryClient } from '../query/queryClient';
import { AuthContext } from './AuthContext';
import { tokenManager } from '@/shared/lib';
import type { AuthTokens, User } from '@/shared/types';
import { authApi } from '@/features/auth/api';
import { withMinDelay } from '@/shared/utils';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setInitialized] = useState(false);

  const isAuthenticated = !!user;

  // ---- helpers ----

  const fetchMe = async () => {
    const { data } = await authApi.fetchMe();
    setUser(data);
  };

  const login = async (tokens: AuthTokens) => {
    tokenManager.setTokens(tokens);
    await fetchMe();
  };

  const clearCart = () => queryClient.removeQueries({ queryKey: ['cart'] });

  const logout = () => {
    tokenManager.clearTokens();
    setUser(null);
    clearCart();
  };

  // ---- app init ----
  useEffect(() => {
    const init = async () => {
      try {
        const { accessToken, refreshToken } = tokenManager.getTokens();

        if (!accessToken && !refreshToken) return;

        const MIN_DELAY_MS = 120;
        await withMinDelay(fetchMe(), MIN_DELAY_MS);
      } catch {
        logout();
      } finally {
        setInitialized(true);
      }
    };

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isInitialized,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
