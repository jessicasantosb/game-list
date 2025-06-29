import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { DialogProvider } from '../context/DialogContext';
import { SidebarProvider } from '../context/SidebarContext';

import type { ReactNode } from 'react';

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
      <DialogProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </DialogProvider>
    </QueryClientProvider>
  );
};
