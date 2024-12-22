"use client";

import getProduct from "@/api/getProducts";
import ProductCard from "@/app/homepage/list-product/page";
import { useState, useEffect } from "react";

const EtalaseToko = (dataProduk: any, dataPage: number) => {
  console.log(dataProduk);
  return (
    <>
      <div className="border-b-[6px] border-[#f1f1f1] p-5">
        <div className="flex justify-between items-center">
          <h1 className="text-[12px] font-nunitoBold">Etalase toko</h1>

          {/*link lihat semua ulasan */}
          <div className="flex gap-1 items-center ">
            <h1 className="text-[10px] text-[#00BAE1] font-nunitoBold">
              Lihat Semua
            </h1>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.35466 4.27609C6.13903 4.44859 6.10407 4.76324 6.27658 4.97887L8.69337 7.99986L6.27658 11.0208C6.10407 11.2365 6.13903 11.5511 6.35466 11.7236C6.57029 11.8961 6.88494 11.8612 7.05745 11.6455L9.72411 8.3122C9.8702 8.12959 9.8702 7.87012 9.72411 7.68751L7.05745 4.35417C6.88494 4.13854 6.57029 4.10358 6.35466 4.27609Z"
                fill="#00BAE1"
              />
            </svg>
          </div>
        </div>
        <div className="mt-[10px] w-full h-20 border">
          <div className="grid grid-cols-2 gap-y-4 py-4 justify-items-center">
            {dataProduk.map((product: any, index: number) => {
              console.log(product);
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default EtalaseToko;
