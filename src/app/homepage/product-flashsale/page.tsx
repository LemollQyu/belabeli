"use client";

import React from "react";
import Link from "next/link";

interface ProductFlashsaleProps {
  imageUrl: string;
  productName: string;
  discount: string;
  price: string;
  linkHref: string;
  [key: string]: unknown; // Menangani properti tambahan
}

const ProductFlashsale = ({
  linkHref = "#",
  imageUrl = "/placeholder-image.png", // Default image jika tidak tersedia
  productName = "Produk Tidak Ditemukan",
  discount = "0%",
  price = "Rp 0",
}: ProductFlashsaleProps) => {
  return (
    <Link href={linkHref} className="w-[122px] h-auto">
      {/* Container Gambar dan Label Diskon */}
      <div className="relative bg-white rounded-lg shadow-md">
        {/* Gambar Produk */}
        <img
          src={imageUrl}
          alt={productName}
          className="w-[122px] h-[97px] object-cover rounded-lg"
        />

        {/* Label Diskon */}
        <div
          className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded"
          style={{
            textAlign: "center",
            color: "#FFF",
            fontSize: 8,
            fontFamily: "Nunito",
            fontWeight: 700,
            lineHeight: "10px",
            wordWrap: "break-word",
          }}
        >
          {discount}
        </div>
      </div>

      {/* Deskripsi Produk (di luar border gambar) */}
      <div className="p-2 text-center">
        <h3
          style={{
            textAlign: "center",
            color: "#000",
            fontSize: 10,
            fontFamily: "Nunito",
            fontWeight: 700,
            lineHeight: "20px",
            wordWrap: "break-word",
          }}
        >
          {productName}
        </h3>
        <p
          style={{
            margin: 5,
            textAlign: "center",
            color: "#000",
            fontSize: 12,
            fontFamily: "Nunito",
            fontWeight: 700,
            lineHeight: "10px",
            wordWrap: "break-word",
          }}
        >
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductFlashsale;
