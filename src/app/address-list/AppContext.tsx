"use client";
import { createContext, useState, ReactNode } from "react";

// Define type for AppContext
interface AppContextType {
  isTrigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create AppContext
export const AppContext = createContext<AppContextType | null>(null);

// Provider Component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [isTrigger, setTrigger] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ isTrigger, setTrigger }}>
      {children}
    </AppContext.Provider>
  );
};
