"use client";

import React from "react";
import Link from "next/link";

// Definisikan tipe untuk data produk
interface Product {
  title?: string;
  discountedPrice?: string;
  originalPrice?: string;
  discountLabel?: string;
  rating?: string;
  soldCount?: string;
  location?: string;
  imageUrl?: string;
  linkHref?: string;
  page?: number;
  [key: string]: any; // Tambahkan ini jika properti dinamis
}

// const ListProduct = () => {
//   const productData: Product = {
// title: 'Sepatu Anak Sekolah SMP Semua Ukuran | Murah d...',
// discountedPrice: 'Rp 195.000',
// originalPrice: 'Rp 300.000',
// discountLabel: '-65%',
// rating: '4.7',
// soldCount: '1.3k',
// location: 'Semarang, Jawa Tengah',
// imageUrl: '/sepatu.jpg',
//   };

//   return (
//     <div>
//       <ProductCard product={productData} />
//     </div>
//   );
// };

const ProductCard = (props: Product) => {
  const {
    title,
    discountedPrice = "0", // fallback jika undefined atau null
    originalPrice = "0", // fallback jika undefined atau null
    discountLabel,
    rating,
    soldCount,
    location,
    imageUrl,
    linkHref,
    page,
  } = props;

  return (
    <Link
      href={`${linkHref}?page=${page}`}
      style={{ width: 146, height: 190, position: "relative" }}
    >
      <div
        style={{
          width: 146,
          height: 190,
          position: "relative",
          background: "white",
          borderRadius: 12,
        }}
        className="shadow-md"
      >
        <div
          className="absolute w-[145px] h-[109px] bg-white shadow-md rounded-t-lg"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div
          style={{
            width: 83,
            height: 19,
            position: "absolute",
            top: 85,
            left: 10,
            background: "#EE443F",
            borderRadius: 6,
            border: "1px solid #EE443F",
            padding: "2px 2px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              color: "#FFF",
              fontSize: 7,
              fontFamily: "Nunito",
              fontWeight: 700,
              lineHeight: "12px",
              wordWrap: "break-word",
            }}
          >
            Diskon Terbaik {discountLabel}
          </div>
        </div>

        <div
          style={{
            width: 119,
            position: "absolute",
            top: 113,
            left: 14,
            color: "black",
            fontSize: 9,
            fontFamily: "Nunito",
            fontWeight: 700,
            lineHeight: "14px",
            wordWrap: "break-word",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            position: "absolute",
            top: 143,
            left: 14,
          }}
        >
          <div
            style={{
              color: "#1B1E28",
              fontSize: 8,
              fontFamily: "Nunito",
              fontWeight: 600,
              lineHeight: "12px",
              textAlign: "center",
              wordWrap: "break-word",
            }}
          >
            {discountedPrice
              ? discountedPrice.toLocaleString()
              : "Harga Tidak Tersedia"}
          </div>

          <div
            style={{
              color: "#1B1E28",
              fontSize: 8,
              fontFamily: "Nunito",
              fontWeight: 600,
              lineHeight: "12px",
              textAlign: "center",
              wordWrap: "break-word",
              textDecoration: "line-through",
            }}
          >
            {originalPrice
              ? originalPrice.toLocaleString()
              : "Harga Tidak Tersedia"}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 154,
            left: 14,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path
              d="M4.00022 6.0865L1.64907 7.40257L2.17418 4.7598L0.195984 2.93044L2.87166 2.61319L4.00022 0.166504L5.12875 2.61319L7.80442 2.93044L5.82625 4.7598L6.35135 7.40257L4.00022 6.0865Z"
              fill="#FFCD29"
            />
          </svg>
          <div
            style={{
              color: "#727272",
              fontSize: 8,
              fontFamily: "Nunito",
              fontWeight: 600,
              lineHeight: "12px",
            }}
          >
            {rating}
          </div>

          <div
            style={{
              color: "#727272",
              fontSize: 8,
              fontFamily: "Nunito",
              fontWeight: 600,
              lineHeight: "14px",
              marginLeft: 2,
            }}
          >
            | {soldCount} Terjual
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 166,
            left: 14,
            display: "flex",
            alignItems: "center",
            gap: 4,
            color: "#1B1E28",
            fontSize: 8,
            fontFamily: "Nunito",
            fontWeight: 600,
            lineHeight: "12px",
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path
              d="M6.12133 5.78784L4 7.90914L1.87868 5.78784C0.707107 4.61624 0.707107 2.71676 1.87868 1.54518C3.05025 0.373611 4.94973 0.373611 6.12133 1.54518C7.2929 2.71676 7.2929 4.61624 6.12133 5.78784ZM4 4.33317C4.3682 4.33317 4.66667 4.0347 4.66667 3.6665C4.66667 3.29831 4.3682 2.99984 4 2.99984C3.6318 2.99984 3.33333 3.29831 3.33333 3.6665C3.33333 4.0347 3.6318 4.33317 4 4.33317Z"
              fill="#0095FF"
            />
          </svg>
          {location}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
