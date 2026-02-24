import React from 'react';

import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { CartProvider } from '@/components/providers/CartProvider';

import { RouterProvider, createRouter } from '@tanstack/react-router';

import { routeTree } from '../routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <QueryProvider>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
              <RouterProvider router={router} />
              {children}
            </ThemeProvider>
          </QueryProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}
