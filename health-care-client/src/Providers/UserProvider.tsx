"use client";

import { iUser } from "@/interfaces/user.interfaces";
import { JwtPayload } from "jsonwebtoken";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

type tUser = iUser | JwtPayload | null;

// Context Type
interface UserContextType {
  user: tUser;
  setUser: Dispatch<SetStateAction<tUser>>;
}

// Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider Props
interface UserProviderProps {
  children: ReactNode;
  initialUser?: tUser;
}

// Provider Component
export const UserProvider = ({ children, initialUser = null }: UserProviderProps) => {
  const [user, setUser] = useState<tUser>(initialUser);

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
