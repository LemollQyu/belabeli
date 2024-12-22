"use client";
import LayoutUtama from "../layouts/layout-utama";
import Header from "../layouts/header";
import { AppProvider } from "./AppContext"; // Import AppProvider
import ActionPage from "./actionPage"; // Import ActionPage

export default function AddressList() {
  return (
    <AppProvider>
      <LayoutUtama>
        <Header title="Ganti Alamat" children={undefined} />
        <ActionPage />
      </LayoutUtama>
    </AppProvider>
  );
}
