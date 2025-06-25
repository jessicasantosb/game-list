import { StrictMode } from 'react';

import App from './App.tsx';

import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { CategoryProvider } from './context/CategoryContext.tsx';
import { DialogProvider } from './context/DialogContext.tsx';
import { GameProvider } from './context/GameContext.tsx';
import { PlatformProvider } from './context/PlatformContext.tsx';
import { SidebarProvider } from './context/SidebarContext.tsx';
import { UserProvider } from './context/UserContext.tsx';
import { Providers } from './providers/Providers.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <DialogProvider>
        <SidebarProvider>
          <GameProvider>
            <CategoryProvider>
              <PlatformProvider>
                <Providers>
                  <ToastContainer position='top-right' autoClose={3000} />
                  <App />
                </Providers>
              </PlatformProvider>
            </CategoryProvider>
          </GameProvider>
        </SidebarProvider>
      </DialogProvider>
    </UserProvider>
  </StrictMode>,
);
