import { createContext } from 'react';

export type Theme = 'dark' | 'light' | 'system';

export type ThemeProviderState = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: 'system',
  toggleTheme: () => null,
});
