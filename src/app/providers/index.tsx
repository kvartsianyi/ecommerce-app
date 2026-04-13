import React from 'react';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { ThemeProvider } from './theme';
import { QueryProvider } from './query';
import { router, RouterWithContextProvider } from './router';

export function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <QueryProvider>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <RouterWithContextProvider />
          <TanStackRouterDevtools router={router} />
          {children}
        </ThemeProvider>
      </QueryProvider>
    </>
  );
}
