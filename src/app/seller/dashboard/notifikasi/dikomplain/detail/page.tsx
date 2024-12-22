"use client";
import LayoutUtama from "@/app/layouts/layout-utama";
import React from "react";
import { useRouter } from "next/navigation";

const NotificationDetailPage = () => {
  // Data dummy untuk halaman ini
  const orderDetail = {
    id: "1270511324",
    productName: "Sepatu Anak Sekolah SMP Semua Ukuran Murah dan Tahan Lama",
    variant: "Putih, XL",
    price: 600000,
    paymentMethod: "Transfer Bank",
    orderDate: "2 Oktober 2024",
    buyerName: "Annas",
    productImage: "/sepatu.jpg",
    quantity: 1, // Example, add this if needed
    submissionDate: "4 Oktober 2024",
  };
  const router = useRouter();
  const handleComplain = () => {
    console.log("button di klik");
    router.push("/seller/dashboard/notifikasi/dikomplain/rincian");
  };

  return (
    <LayoutUtama>
      <div className="flex flex-col min-h-screen font-nunito">
        {/* Container Konten */}
        <div className="container mx-auto p-4 flex-grow">
          {/* Icon Success */}
          <div className="flex justify-center">
            <svg
              width="120"
              height="120"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M49.9987 91.6663C26.9868 91.6663 8.33203 73.0113 8.33203 49.9997C8.33203 26.9878 26.9868 8.33301 49.9987 8.33301C73.0104 8.33301 91.6654 26.9878 91.6654 49.9997C91.6654 73.0113 73.0104 91.6663 49.9987 91.6663ZM45.832 62.4997V70.833H54.1654V62.4997H45.832ZM45.832 29.1663V54.1663H54.1654V29.1663H45.832Z"
                fill="#FFCD29"
              />
            </svg>
          </div>

          {/* Pesanan Masuk Header */}
          <div className="mt-4 text-center">
            <h1 className="font-bold text-[24px] text-black">
              Pesanan Dikomplain
            </h1>
            <p className="text-sm text-black mt-4">
              Silakan Hubungi Pembeli Untuk Melihat Informasi Pesanan yang
              dikomplain.{" "}
            </p>
          </div>

          {/* Order Detail */}
          <div className="mt-6">
            <div className="bg-neutral-100 rounded-lg p-4">
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <div className="text-xs font-nunito text-gray-500">
                  Order ID:{" "}
                  <span className="font-bold text-gray-700">
                    {orderDetail.id}
                  </span>
                </div>
                <div className="text-[16px] font-semibold text-black">
                  Rp {new Intl.NumberFormat("id-ID").format(orderDetail.price)}
                </div>
              </div>
              <div className="h-px bg-gray-300 mb-3" />

              {/* Main Content */}
              <div className="flex items-start space-x-4">
                <img
                  className="w-[100px] h-[100px] rounded-md object-cover"
                  src={orderDetail.productImage}
                  alt="Product Image"
                />
                <div className="flex flex-col space-y-1">
                  <div className="text-black text-[12px] font-nunito font-semibold">
                    {orderDetail.productName}
                  </div>

                  {/* Variants */}
                  <div className="flex items-center text-xs text-gray-600 space-x-1 mb-2">
                    <svg
                      width="15"
                      height="16"
                      viewBox="0 0 10 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_10330_7835)">
                        <path
                          d="M6.90374 3.84511C7.0184 3.58691 7.08211 3.30106 7.08211 3.00033C7.08211 1.84973 6.14936 0.916992 4.99878 0.916992C3.84819 0.916992 2.91545 1.84973 2.91545 3.00033C2.91545 4.07641 3.7313 4.96195 4.77819 5.07212C5.28461 4.35045 6.07219 3.92026 6.90374 3.84511ZM5.47978 7.97791C5.83053 7.22016 5.85178 6.32287 5.47999 5.52341C6.09882 4.67191 7.27349 4.40817 8.20536 4.9462C9.20178 5.52153 9.54319 6.79558 8.9679 7.79199C8.39261 8.78845 7.11844 9.12987 6.12203 8.55458C5.86165 8.40424 5.64603 8.20624 5.47978 7.97791ZM2.61266 4.6782C3.09355 5.36083 3.85999 5.82783 4.73828 5.90558C5.16619 6.86728 4.80724 8.01649 3.87535 8.55453C2.87891 9.12982 1.60476 8.78841 1.02946 7.79199C0.454165 6.79553 0.795573 5.52137 1.79201 4.94608C2.05241 4.79574 2.33176 4.70799 2.61266 4.6782Z"
                          fill="#51D7B1"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_10330_7835">
                          <rect
                            width="10"
                            height="10"
                            fill="white"
                            transform="translate(0 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <span>
                      <b>Varian:</b> {orderDetail.variant}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 space-x-1 mb-2">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.08317 3.33325H8.33317L9.58317 5.02313V7.49992H8.73509C8.63396 8.20663 8.02617 8.74992 7.2915 8.74992C6.55684 8.74992 5.94905 8.20663 5.84792 7.49992H3.73507C3.63398 8.20663 3.02619 8.74992 2.2915 8.74992C1.55682 8.74992 0.949029 8.20663 0.847937 7.49992H0.416504V2.49992C0.416504 2.2698 0.603054 2.08325 0.833171 2.08325H6.6665C6.89663 2.08325 7.08317 2.2698 7.08317 2.49992V3.33325ZM7.08317 4.16659V5.41659H8.74984V5.29784L7.91304 4.16659H7.08317Z"
                        fill="#51D7B1"
                      />
                    </svg>
                    <span className="">Standar (Semarang - Gresik)</span>
                  </div>
                  {/* Payment Method */}
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    {/* Metode Bayar */}
                    <div className="flex items-center space-x-1">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.16928 4.66667V8.83334C9.16928 9.06346 8.98274 9.25 8.75261 9.25H1.2526C1.02249 9.25 0.835938 9.06346 0.835938 8.83334V4.66667H9.16928ZM9.16928 3.83333H0.835938V2.16667C0.835938 1.93655 1.02249 1.75 1.2526 1.75H8.75261C8.98274 1.75 9.16928 1.93655 9.16928 2.16667V3.83333ZM6.25261 7.16667V8H7.91928V7.16667H6.25261Z"
                          fill="#51D7B1"
                        />
                      </svg>
                      <span>
                        <b>Metode Bayar:</b> {orderDetail.paymentMethod}
                      </span>
                    </div>
                    {/* Kuantitas */}
                    <div className="mr-1 text-white border-2 bg-[#A9A9A9] border-[#A9A9A9] py-1 px-2 rounded-md">
                      {orderDetail.quantity}
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-300 my-3" />

              {/* Footer */}
              <div className="flex justify-between text-xs text-gray-600 font-nunito">
                <div>
                  <b>Tanggal Order</b>
                  <div>{orderDetail.orderDate}</div>
                </div>
                <div className="mt-4 items-center">
                  <svg
                    width="71"
                    height="2"
                    viewBox="0 0 71 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 1L71 1.00001"
                      stroke="#878787"
                      stroke-width="2"
                      stroke-dasharray="4 4"
                    />
                  </svg>
                </div>
                <div>
                  <b>Tanggal Pengajuan</b>
                  <div className="text-right">{orderDetail.submissionDate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tombol */}
        <div className="flex gap-4 p-4 bg-white mt-auto">
          <button
            className="flex-1 py-3 px-4 bg-[#51D7B1] text-white rounded-lg text-sm font-semibold hover:bg-emerald-700"
            onClick={handleComplain}
          >
            Lihat Komplain
          </button>
        </div>
      </div>
    </LayoutUtama>
  );
};

export default NotificationDetailPage;
