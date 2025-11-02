// src/context/UserContext.tsx
"use client"; // অবশ্যই Client Component

import { iUser } from "@/interfaces/user.interfaces";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

// Context Type
interface UserContextType {
  user: iUser | null;
  setUser: Dispatch<SetStateAction<iUser | null>>;
}

// Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider Props
interface UserProviderProps {
  children: ReactNode;
  initialUser?: iUser | null;
}

// Provider Component
export const UserProvider = ({ children, initialUser = null }: UserProviderProps) => {
  const [user, setUser] = useState<iUser | null>(initialUser);

  // Stable value with useMemo
  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom Hook
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
