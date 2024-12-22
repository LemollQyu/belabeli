"use client";
import OrderInformation from "@/app/components/seller/info-order";
import LayoutUtama from "@/app/layouts/layout-utama";
import Link from "next/link";

interface AlamatProps {
  name: string;
  phone: string;
  address: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
}

const Alamat = ({
  name,
  address,
  district,
  city,
  province,
  postalCode,
  phone,
}: AlamatProps) => {
  return (
    <div className="mt-4 px-2">
      <div className="bg-white p-4 rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] flex items-start">
        {/* Icon maps */}
        <div className="flex-shrink-0">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"
              fill="#0095FF"
            />
          </svg>
        </div>

        {/* Informasi Alamat */}
        <div className="ml-6 flex-grow">
          <h2 className="text-[#0F0F0F] font-nunito text-[14px] font-bold">
            {name}
          </h2>
          <p className="mt-2 text-[#1B1E28] font-nunito text-[12px]">
            {address}, {district}
          </p>
          <p className="text-[#1B1E28] font-nunito text-[12px]">{city}</p>
          <p className="text-[#1B1E28] font-nunito text-[12px]">{province}</p>
          <p className="text-[#1B1E28] font-nunito text-[12px]">{postalCode}</p>
        </div>
      </div>
    </div>
  );
};

export const addressData = [
  {
    key: 1,
    name: "Annas Aulia Rahman",
    phone: "081234567890",
    address: "Jl. Kanjeng Sepuh No. 1 ",
    district: "Kecamatan Kauman",
    city: "Kabupaten Gresik",
    province: "Jawa Timur",
    postalCode: "61153",
  },
];

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
    <>
      <LayoutUtama>
        <div className="w-full max-w-[400px] mx-auto space-y-2 font-nunito">
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
    </>
  );
};

export default Pesanan;
