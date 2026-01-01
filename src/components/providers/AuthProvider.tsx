import { useEffect, useState } from 'react';

import { AuthContext } from '@/context/AuthContext';
import type { AuthTokens } from '@/types/auth';
import tokenManager from '@/lib/tokenManager';
import type { User } from '@/types/user';
import { usersApi } from '@/lib/api';
import { withMinDelay } from '@/lib/utils';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setInitialized] = useState(false);

  const isAuthenticated = !!user;

  // ---- helpers ----

  const fetchMe = async () => {
    const { data } = await usersApi.fetchMe();
    setUser(data);
  };

  const login = async (tokens: AuthTokens) => {
    tokenManager.setTokens(tokens);
    await fetchMe();
  };

  const logout = () => {
    tokenManager.clearTokens();
    setUser(null);
  };

  // ---- app init ----
  console.log('AuthProvider rendered');
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
