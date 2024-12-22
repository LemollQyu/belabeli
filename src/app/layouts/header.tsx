"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface HeaderProps {
  children: React.ReactNode;
  title?: string; // Make the title prop optional
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    router.back();
  };

  let { toko } = useParams();

  if (Array.isArray(toko)) {
    toko = toko[0]; // If `toko` is an array, use the first element
  }

  function convertToSlug(input: string) {
    return decodeURIComponent(input) // Decode %20 menjadi spasi
      .toLowerCase() // Ubah huruf menjadi kecil
      .replace(/\s+/g, "-") // Ganti spasi dengan "-"
      .replace(/[^a-z0-9-]/g, ""); // Hapus karakter yang bukan alfanumerik atau "-"
  }

  const slugToko = convertToSlug(toko);
  // console.log(slug); // Output: "zulauf-inc"

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex flex-wrap px-5 py-2 items-center justify-between bg-white text-white transition duration-300 min-h-[75px] max-h-[75px] border-b-2 border-gray-200">
        <div className="flex flex-wrap items-center justify-between mx-auto w-full max-w-[400px]">
          <div>
            <a
              onClick={handleBack}
              className="cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center bg-gray-100 rounded-full p-2"
            >
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.88421 0.414315C6.19994 0.673072 6.25112 1.14504 5.99855 1.46849L2.45993 5.99997L5.99855 10.5314C6.25112 10.8549 6.19993 11.3269 5.88421 11.5856C5.56849 11.8444 5.10779 11.7919 4.85521 11.4685L0.950737 6.46849C0.736839 6.19457 0.736839 5.80536 0.950737 5.53145L4.85521 0.531445C5.10779 0.207999 5.56849 0.155558 5.88421 0.414315Z"
                  fill="#1B1E28"
                />
              </svg>
            </a>
          </div>
          <h6 className="inline-block text-base text-black font-semibold font-nunito">
            {" "}
            {title}{" "}
          </h6>
          <div className="min-w-[40px] min-h-[40px] flex items-center justify-center">
            {title === "Toko" && (
              <Link href={`/toko/${slugToko}/pencarian/`}>
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z"
                    fill="#51D7B1"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
