"use client";
import { createContext, useState, ReactNode } from "react";
import ActionPage from "@/app/pengaturan/tambah-alamat/actionPage";

// Define type for AppContext2
interface AppContext2Type {
  isTrigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create AppContext2 with initial value null or the expected type
export const AppContext2 = createContext<AppContext2Type | null>(null);

export default function AddressList() {
  const [isTrigger, setTrigger] = useState<boolean>(false);

  return (
    <AppContext2.Provider
      value={{
        isTrigger,
        setTrigger,
      }}
    >
      <ActionPage />
    </AppContext2.Provider>
  );
}
