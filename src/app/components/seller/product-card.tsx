'use client'

import Link from 'next/link'
import React, { useState } from 'react'

const ProductCard = ({
  nameProduct,
  linkImage,
  priceAsli,
  discountPrice,
  star,
  lokasi,
  terjual,
  linkHref,
}: any) => {
  const [count, setCount] = useState(1)

  return (
    <Link href={linkHref}>
      <div className="relative w-[146px] h-[190px]">
        {/* Outer Card */}
        <div className="relative w-[150px] h-[195px] bg-white border-2 border-gray-300 rounded-lg">
          {/* Outer Container */}
          <div
            className="absolute w-[145px] h-[109px] bg-cover bg-center rounded-t-lg "
            style={{
              backgroundImage: `url(${linkImage})`,
            }}
          ></div>

          {/* Discount Label */}
          <div className="absolute top-[85px] left-[10px] w-[85px] h-[19px] bg-[#EE443F] border border-[#EE443F] rounded-md flex items-center justify-center px-1 py-1">
            <div className="text-center text-white text-[8px] font-bold font-nunito leading-[10px]">
              Diskon Terbaik -45%
            </div>
          </div>

          {/* Product Title */}
          <div className="absolute top-[118px] left-[10px] w-[119px] text-black text-[10px] font-semibold font-nunito leading-[15px] break-words">
            {nameProduct}
          </div>

          {/* Price Section */}
          <div className="absolute top-[148px] left-[10px] text-[9px] justify-center flex items-center gap-[4px]">
            {/* Discounted Price */}
            <div className="text-[#1B1E28] font-semibold font-nunito leading-[12px] text-center">
              <p>Rp. {discountPrice}</p>
            </div>

            {/* Original Price */}
            <div className="text-[#A9A9A9] font-semibold font-nunito leading-[12px] text-center line-through">
              <p>Rp. {priceAsli}</p>
            </div>
          </div>

          {/* Rating Section */}
          <div className="absolute top-[159px] left-[10px] flex items-center gap-1">
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_929_3175)">
                <path
                  d="M4.00022 6.0865L1.64907 7.40257L2.17418 4.7598L0.195984 2.93044L2.87166 2.61319L4.00022 0.166504L5.12875 2.61319L7.80442 2.93044L5.82625 4.7598L6.35135 7.40257L4.00022 6.0865Z"
                  fill="#FFCD29"
                />
              </g>
              <defs>
                <clipPath id="clip0_929_3175">
                  <rect width="8" height="8" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <div className="text-[#727272] text-[9px] font-semibold font-nunito leading-[12px] text-center">
              {star} | {terjual} Terjual
            </div>
          </div>

          {/* Location Section */}
          <div className="absolute top-[170px] left-[10px] flex items-center gap-1 text-[#1B1E28] text-[9px] font-semibold font-nunito leading-[12px]">
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.12133 5.78784L4 7.90914L1.87868 5.78784C0.707107 4.61624 0.707107 2.71676 1.87868 1.54518C3.05025 0.373611 4.94973 0.373611 6.12133 1.54518C7.2929 2.71676 7.2929 4.61624 6.12133 5.78784ZM4 4.33317C4.3682 4.33317 4.66667 4.0347 4.66667 3.6665C4.66667 3.29831 4.3682 2.99984 4 2.99984C3.6318 2.99984 3.33333 3.29831 3.33333 3.6665C3.33333 4.0347 3.6318 4.33317 4 4.33317Z"
                fill="#0095FF"
              />
            </svg>
            <div className="text-center">{lokasi}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
