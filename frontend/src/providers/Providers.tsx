import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { DialogProvider } from '../context/DialogContext';
import { SidebarProvider } from '../context/SidebarContext';
import { UserProvider } from '../context/UserContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 20,
    },
  },
});

type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <DialogProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </DialogProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};
