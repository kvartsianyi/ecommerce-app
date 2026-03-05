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

import { Providers } from './app/providers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <Toaster position="top-right" richColors />
    </Providers>
  </StrictMode>
);
