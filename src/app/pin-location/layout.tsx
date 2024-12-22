"use client";

import React from "react";
import { AddressProvider } from "./AddressContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border-2 border-red-400">
      <AddressProvider>{children}</AddressProvider>
    </div>
  );
}
