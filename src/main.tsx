import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';

import '@fontsource/geist/400.css';
import '@fontsource/geist/500.css';
import '@fontsource/geist/600.css';
import '@fontsource/geist/700.css';

import '@fontsource/geist-mono/400.css';
import '@fontsource/geist-mono/500.css';

import './index.css';

import App from './App.tsx';
import { Providers } from './app/providers.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
    <Toaster position="top-right" richColors />
  </StrictMode>
);
