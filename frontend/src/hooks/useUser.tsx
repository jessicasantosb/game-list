import { createContext, useContext, type Dispatch } from 'react';

type User = { full_name: string };

type UserContextProps = {
  user: User | null;
  setUser: Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
};

export const UserContext = createContext<UserContextProps | undefined>(
  undefined,
);

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
