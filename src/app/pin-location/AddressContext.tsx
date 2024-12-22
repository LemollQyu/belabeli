import React, { createContext, useContext, useState, ReactNode } from "react";

// Tipe data context
export interface AddressContextType {
  address: any;
  setAddress: (address: string) => void;
  dataAlamat: any;
  setDataAlamat: React.Dispatch<React.SetStateAction<any>>;
}

// Inisialisasi context
const AddressContext = createContext<AddressContextType | undefined>(undefined);

// Provider untuk membungkus aplikasi
export const AddressProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [address, setAddress] = useState<string>("");
  const [dataAlamat, setDataAlamat] = useState<any>({});

  return (
    <AddressContext.Provider
      value={{ address, setAddress, dataAlamat, setDataAlamat }}
    >
      {children}
    </AddressContext.Provider>
  );
};

// Hook untuk menggunakan context
export const useAddress = (): AddressContextType => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};
