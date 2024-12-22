"use client";

import React from "react";
import Header from "@/app/layouts/header";
import LayoutUtama from "@/app/layouts/layout-utama";
import { useRouter } from "next/navigation";

const TambahProdukPage = () => {
  const router = useRouter();

  // Fungsi navigasi
  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <LayoutUtama>
      <Header title="Tambah Produk" children={undefined} />
      <div className="container mx-auto p-4 font-nunito pt-24 flex flex-col min-h-screen">
        {/* List Menu */}
        <div className="space-y-4">
          <button
            onClick={() => handleNavigate("tambah-produk/informasi-produk")}
            className="w-full border border-gray-300 rounded-md flex justify-between items-center py-3 px-6 bg-white shadow hover:bg-gray-50 transition"
          >
            <span className="text-gray-700 font-semibold text-sm">
              Informasi Produk
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="#4A5568"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => handleNavigate("tambah-produk/foto-video-produk")}
            className="w-full border border-gray-300 rounded-md flex justify-between items-center py-3 px-6 bg-white shadow hover:bg-gray-50 transition"
          >
            <span className="text-gray-700 font-semibold text-sm">
              Foto atau Video Produk
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="#4A5568"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => handleNavigate("tambah-produk/varian")}
            className="w-full border border-gray-300 rounded-md flex justify-between items-center py-3 px-6 bg-white shadow hover:bg-gray-50 transition"
          >
            <span className="text-gray-700 font-semibold text-sm">Varian</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="#4A5568"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => handleNavigate("tambah-produk/atur-stok")}
            className="w-full border border-gray-300 rounded-md flex justify-between items-center py-3 px-6 bg-white shadow hover:bg-gray-50 transition"
          >
            <span className="text-gray-700 font-semibold text-sm">
              Atur Stok
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="#4A5568"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Tombol Upload Produk */}
        <div className="mt-auto">
          <button
            onClick={() =>
              router.push("/seller/dashboard/kelola-produk/semua-produk")
            }
            className="w-full bg-[#51d7b1] text-white font-semibold  py-3 rounded-md text-sm shadow-md hover:bg-emerald-600 transition"
          >
            Upload Produk
          </button>
        </div>
      </div>
    </LayoutUtama>
  );
};

export default TambahProdukPage;
