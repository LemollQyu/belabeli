import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./layouts/_navbar";
import Nav from "./layouts/navigasi/nav";

export const metadata: Metadata = {
  title: "Bela Beli",
  description: "Membela Negara dengan Membeli Produk Lokal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        {/* <NavBar /> */}
        <Nav />
      </body>
    </html>
  );
}
