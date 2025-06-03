import React, { createContext, useContext, useState } from 'react';

interface User {
  aadharNumber: string;
  username?: string;
  isLoggedIn: boolean;
}

interface UserContextType {
  user: User | null;
  login: (aadharNumber: string) => void;
  signup: (aadharNumber: string, username: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (aadharNumber: string) => {
    setUser({
      aadharNumber,
      isLoggedIn: true,
    });
  };

  const signup = (aadharNumber: string, username: string) => {
    setUser({
      aadharNumber,
      username,
      isLoggedIn: true,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};