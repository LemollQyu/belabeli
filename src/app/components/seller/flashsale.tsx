'use client'

import React from 'react'

interface ProductFlashsaleProps {
  imageUrl: string
  productName: string
  price: string
  sold: number // Number of items sold
  stock: number // Total stock of items
}

const ProductFlashsale = ({
  imageUrl,
  productName,
  price,
  sold,
  stock,
}: ProductFlashsaleProps) => {
  const soldPercentage = (sold / stock) * 100 // Calculate sold percentage

  return (
    <div className="w-[150px] h-auto rounded-lg overflow-hidden">
      {/* Container Gambar dan Label Diskon */}
      <div className="relative bg-white">
        {/* Gambar Produk */}
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-[154px] rounded-md object-cover"
        />

        {/* Label Diskon */}
        <div className="absolute top-32 left-10 text-white text-xs px-2 py-1 rounded">
          {/* Jumlah Terjual dan Progress Bar */}
          <div className="w-[100px] bg-gray-300 rounded-full h-[12px] mt-0.5 relative font-nunito">
            {/* Text for sold */}
            <div className="absolute inset-0 flex items-center justify-center text-[8px] text-white font-semibold">
              {sold} Terjual
            </div>

            {/* Progress Bar */}
            <div
              className="bg-[#FF3D00] h-[12px] rounded-full"
              style={{ width: `${soldPercentage}%` }}
            ></div>

            {/* Icon indicating the progress */}
            <div
              className="absolute -top-2 left-1/2 flex items-center justify-center"
              style={{ left: `calc(${soldPercentage}% - 12.5px)` }}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.80277 4.95286C4.51335 4.3261 5.76881 3.21874 5.72441 1.14454C7.0481 2.0645 7.98564 2.96438 8.31026 3.93825C8.65068 4.9595 8.33384 6.13332 6.85858 7.60858L6.51716 7.95H7H7.00234C7.25687 7.95 7.59922 7.95 8.0398 7.78255C8.42431 7.63642 8.87302 7.36727 9.40764 6.87867C9.49172 7.16403 9.55 7.45467 9.55 7.75C9.55 9.71059 7.96059 11.3 6 11.3C4.03939 11.3 2.45 9.71059 2.45 7.75C2.45 6.73052 2.87947 5.8117 3.56794 5.16397L3.4309 5.0183L3.56794 5.16396C3.6356 5.10031 3.71503 5.03025 3.80277 4.95286Z"
                  fill="#FFCD29"
                  stroke="white"
                  strokeWidth="0.4"
                />
                <path
                  d="M6 11.6667C4.61929 11.6667 3.5 10.5474 3.5 9.16667C3.5 8.44873 3.80262 7.8015 4.28726 7.34553C4.73468 6.92458 5.83333 6.1665 5.66667 4.5C7.66667 5.83333 8.66667 7.16667 6.66667 9.16667C7 9.16667 7.5 9.16667 8.33333 8.3432C8.42323 8.60107 8.5 8.87817 8.5 9.16667C8.5 10.5474 7.3807 11.6667 6 11.6667Z"
                  fill="#FF7A00"
                />
              </svg>
            </div>
          </div>
          {' '}
        </div>
      </div>

      {/* Deskripsi Produk (di luar border gambar) */}
      <div className="p-2 text-center">
        <h3 className="text-sm font-bold text-black">{productName}</h3>
        <p className="text-md font-semibold text-black">{price}</p>
      </div>
    </div>
  )
}

export default ProductFlashsale
