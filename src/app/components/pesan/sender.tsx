"use client"; 

import Link from "next/link";
import React, { useState } from "react";

const truncateNameProduct = (nameProduct: string) => {
  if (nameProduct.length > 50) {
    return nameProduct.slice(0, 50 - 3) + '...'; // Subtract 3 for "..."
  }
  return nameProduct;
};

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0, // No decimal places
    }).format(price);
};

const ProductCard = ({
  nameProduct,
  linkImage,
  priceAsli,
  discountPrice,
  star,
  sold,
  lokasi,
  linkHref,
  discount
}: any) => {

  return (

    <Link href={linkHref}>
        <div className="w-[175px] h-fit relative border-2 border-gray-200 shadow-md shadow-gray-200 bg-white rounded-xl">
            <div className="relative">
                <img className="rounded-t-xl w-[177px] h-[145px] object-cover" src={linkImage} alt="Sepatu"></img>
                <span className="absolute top-28 left-2 z-10 bg-red-500 text-white font-semibold text-[10px] px-2 py-1 rounded">Diskon Terbaik -{discount}%</span>
            </div>
            <div className="bg-transparent p-[10px] mb-1">
                <h3 className="text-xs font-bold pt-[4px] landing-[1.4 rem]">{truncateNameProduct(nameProduct)}</h3>
                <span className="flex flex-wrap justify-start items-center text-[10px]">
                    <p className="mr-1 font-semibold">{formatPrice(discountPrice)}</p> 
                    <s className="text-gray-400">{formatPrice(priceAsli)}</s>
                </span>
                <span className="flex flex-wrap justify-start items-center text-[10px]">
                    <svg width="10" height="10" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.99955 6.08406L1.6484 7.40013L2.17351 4.75736L0.195312 2.928L2.87099 2.61075L3.99955 0.164062L5.12808 2.61075L7.80375 2.928L5.82558 4.75736L6.35068 7.40013L3.99955 6.08406Z" fill="#FFCD29"/>
                    </svg>
                    <p className="ml-1"> {star} | </p>
                    <p className="text-gray-400"> {sold} terjual</p>
                </span>
                <span className="flex flex-wrap justify-start items-center text-[10px]">
                    <svg width="10" height="10" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.12133 5.7854L3 7.9067L0.87868 5.7854C-0.292893 4.6138 -0.292893 2.71432 0.87868 1.54274C2.05025 0.371169 3.94973 0.371169 5.12133 1.54274C6.2929 2.71432 6.2929 4.6138 5.12133 5.7854ZM3 4.33073C3.3682 4.33073 3.66667 4.03226 3.66667 3.66406C3.66667 3.29587 3.3682 2.9974 3 2.9974C2.6318 2.9974 2.33333 3.29587 2.33333 3.66406C2.33333 4.03226 2.6318 4.33073 3 4.33073Z" fill="#0095FF"/>
                    </svg>
                    <p className="ml-1">{lokasi}</p>
                </span>
            </div>
        </div>
    </Link>
  );
};

export default ProductCard;
