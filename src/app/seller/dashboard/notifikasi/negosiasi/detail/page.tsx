import LayoutUtama from "@/app/layouts/layout-utama";
import React from "react";

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
    productImage: "/sepatu.jpg", // Path ke gambar produk
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
                d="M49.9987 91.6663C26.9868 91.6663 8.33203 73.0113 8.33203 49.9997C8.33203 26.9878 26.9868 8.33301 49.9987 8.33301C73.0104 8.33301 91.6654 26.9878 91.6654 49.9997C91.6654 73.0113 73.0104 91.6663 49.9987 91.6663ZM45.8429 66.6663L75.3058 37.2036L69.4133 31.311L45.8429 54.8813L34.0579 43.0959L28.1653 48.9888L45.8429 66.6663Z"
                fill="url(#paint0_linear_6963_29580)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_6963_29580"
                  x1="8.33203"
                  y1="49.9997"
                  x2="91.6654"
                  y2="49.9997"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#83E69B" />
                  <stop offset="1" stopColor="#00BAE1" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Pesanan Masuk Header */}
          <div className="mt-4 text-center">
            <h1 className="font-bold text-[24px] text-black">
              Negosiasi Diterima
            </h1>
            <p className="text-sm text-black mt-4">
              Silakan Hubungi Pembeli Untuk Memberikan Informasi Lebih Lanjut.
            </p>
          </div>

          {/* Order Detail */}
          <div className="mt-6">
            <div className="bg-neutral-100 rounded-lg p-4 space-y-2">
              <div className="text-start font-nunito text-xs font-light">
                Order ID: {orderDetail.id}
              </div>
              <div className="h-px bg-[#d2d2d2]" />
              <div className="flex space-x-2">
                <img
                  className="w-[100px] h-[100px] rounded-md mr-3"
                  src="https://images.tokopedia.net/img/cache/700/VqbcmM/2023/3/7/1abd04f3-e85a-434e-82de-2ec36e34bf81.jpg"
                  alt="Anugrah Shoes"
                />
                <div className="flex flex-col space-y-1">
                  <div className="text-black text-[12px] font-nunito font-semibold">
                    {orderDetail.productName}{" "}
                  </div>
                  <div className="text-sm font-semibold">
                    Rp{" "}
                    {new Intl.NumberFormat("id-ID").format(orderDetail.price)}
                  </div>
                  <div className="text-[11px] font-nunito flex justify-between items-center">
                    <div className="flex items-center space-x-2">
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
                  </div>

                  <div className="text-[11px] font-nunito flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <svg
                        width="15"
                        height="16"
                        viewBox="0 0 10 11"
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
                  </div>
                  <div className="text-[11px] font-nunito flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.832031 4.58366H9.16537V8.33366C9.16537 8.56378 8.97882 8.75033 8.7487 8.75033H1.2487C1.01858 8.75033 0.832031 8.56378 0.832031 8.33366V4.58366ZM7.08203 1.25033H8.7487C8.97882 1.25033 9.16537 1.43688 9.16537 1.66699V3.75033H0.832031V1.66699C0.832031 1.43688 1.01858 1.25033 1.2487 1.25033H2.91536V0.416992H3.7487V1.25033H6.2487V0.416992H7.08203V1.25033Z"
                          fill="#51D7B1"
                        />
                      </svg>
                      <span>
                        <b>Tanggal Order:</b> {orderDetail.orderDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tombol */}
        <div className="flex gap-4 p-4 bg-white mt-auto">
          <button className="flex-1 py-3 px-4 bg-emerald-50 text-[#51D7B1] border border-[#51D7B1] rounded-lg text-sm font-semibold hover:bg-emerald-100">
            Chat Pemohon
          </button>
          <button className="flex-1 py-3 px-4 bg-[#51D7B1] text-white rounded-lg text-sm font-semibold hover:bg-emerald-700">
            Selesaikan
          </button>
        </div>
      </div>
    </LayoutUtama>
  );
};

export default NotificationDetailPage;
