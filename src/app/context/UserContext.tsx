'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/user';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  checkUser: () => boolean;
}

// Create User Context
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);

  // Set user both in the context and cache it
  const setUser = (user: User | null) => {
    if (user) {
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    setUserState(user);
  };

  // Function to check if a user is logged in
  const checkUser = () => {
    return user !== null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      setUserState(JSON.parse(cachedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout, checkUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the User Context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
