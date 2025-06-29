import { useEffect, useState, type ReactNode } from 'react';
import { UserContext } from '../hooks/useUser';

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<{ full_name: string } | null>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('loggedin');
    if (currentUser && !user) {
      try {
        const parsedUser = JSON.parse(currentUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('loggedin');
      }
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem('loggedin');
    setUser(null);
    location.href = '/login';
  };

  return (
    <UserContext.Provider value={{ user, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
