// app/dashboard/layout.tsx
"use client";
import BackNav from "@/app/components/backNavigasi";
import LayoutUtama from "@/app/layouts/layout-utama";
import { Suspense } from "react";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [pathActive, setPathActive] = useState("");

  useEffect(() => {
    if (pathname == "/authentikasi/lupa-sandi") {
      setPathActive("right-3/4");
    } else if (pathname == "/authentikasi/lupa-sandi/kode-otp") {
      setPathActive("right-1/2");
    } else {
      setPathActive("right-1");
      console.log(pathActive);
    }
  }, [pathname]);

  return (
    <>
      <LayoutUtama>
        <BackNav />
        <div className="absolute top-9 left-1/2 -translate-x-1/2 w-[200px] h-[16px] rounded-full bg-[#a9a9a9]">
          <div
            className={`rounded-xl absolute  top-1 bottom-1 left-1 ${pathActive} transition-all duration-600 bg-[#51D7B1]`}
          ></div>
        </div>
        <main className="mt-[160px] px-5">{children}</main>
      </LayoutUtama>
    </>
  );
}
