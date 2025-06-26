import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import App from './App.tsx';

import { Providers } from './providers/Providers.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <ToastContainer position='top-right' autoClose={3000} />
      <App />
    </Providers>
  </StrictMode>,
);
