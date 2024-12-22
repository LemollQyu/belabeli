"use client";
import OrderInformation from "@/app/components/seller/info-iklan";
import LayoutUtama from "@/app/layouts/layout-utama";
import Link from "next/link";

const orderDetail = {
  id: "1270511324",
  productName: "Sepatu Anak Sekolah SMP Semua Ukuran Murah dan Tahan Lama",
  variant: "Putih, XL",
  price: 600000,
  stock: 400,
  orderDate: "2 Oktober 2024",
  buyerName: "Annas",
  productImage: "/sepatu.jpg",
  quantity: 1, // Example, add this if needed
  submissionDate: "9 Oktober 2024",
};

const Pesanan = () => {
  return (
    <LayoutUtama>
      <div className="w-full h-screen max-w-[400px] mx-auto flex flex-col justify-between space-y-4 font-nunito">
        {/* Content above buttons */}
        <div className="flex-grow">
          <div className="flex justify-center items-center mt-4">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50.0002 91.6666C26.9883 91.6666 8.3335 73.0116 8.3335 49.9999C8.3335 26.988 26.9883 8.33325 50.0002 8.33325C73.0118 8.33325 91.6668 26.988 91.6668 49.9999C91.6668 73.0116 73.0118 91.6666 50.0002 91.6666ZM45.8443 66.6666L75.3072 37.2038L69.4147 31.3113L45.8443 54.8816L34.0594 43.0962L28.1668 48.9891L45.8443 66.6666Z"
                fill="url(#paint0_linear_4359_25073)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_4359_25073"
                  x1="8.3335"
                  y1="49.9999"
                  x2="91.6668"
                  y2="49.9999"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#83E69B" />
                  <stop offset="1" stopColor="#00BAE1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col items-center space-y-2 px-4 pb-2">
            <div className="font-nunito text-[24px] font-bold">
              Terima Kasih
            </div>
            <div className="font-nunito text-[14px]">
              Pesanan anda telah berhasil dibuat
            </div>
          </div>

          <OrderInformation orderDetail={orderDetail} />
        </div>

        {/* Footer buttons */}
        <div className="space-y-4 py-2 px-4 pb-6">
          <div className="px-4 border border-[#51d7b1] rounded-lg p-4 text-center text-[#51d7b1] text-xs font-semibold">
            <Link href="/seller/dashboard">Home</Link>
          </div>
          <div className="bg-[#51d7b1] rounded-lg text-white text-center p-4 text-sm font-bold">
            <Link href="/seller/dashboard/manajemen-iklan/lihat-promosi">
              Lihat Promosi
            </Link>
          </div>
        </div>
      </div>
    </LayoutUtama>
  );
};

export default Pesanan;
