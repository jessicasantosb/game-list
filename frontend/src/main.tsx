import { StrictMode } from 'react';

import App from './App.tsx';

import { ToastContainer } from 'react-toastify';
import { CategoryProvider } from './context/CategoryContext.tsx';
import { createRoot } from 'react-dom/client';
import { DialogProvider } from './context/DialogContext.tsx';
import { GameProvider } from './context/GameContext.tsx';
import { PlatformProvider } from './context/PlatformContext.tsx';
import { SidebarProvider } from './context/SidebarContext.tsx';
import { UserProvider } from './context/UserContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <DialogProvider>
        <SidebarProvider>
          <GameProvider>
            <CategoryProvider>
              <PlatformProvider>
                <ToastContainer position='top-right' autoClose={3000} />
                <App />
              </PlatformProvider>
            </CategoryProvider>
          </GameProvider>
        </SidebarProvider>
      </DialogProvider>
    </UserProvider>
  </StrictMode>,
);
