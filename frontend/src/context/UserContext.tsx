import { useState, type ReactNode } from 'react';

import { UserContext } from '../hooks/useUser';

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<{ full_name: string } | null>(null);

  const currentUser = localStorage.getItem('accessToken');
  if (currentUser && !user) {
    try {
      const parsedUser = JSON.parse(currentUser);
      setUser(parsedUser);
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error);
      localStorage.removeItem('accessToken');
    }
  }

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
