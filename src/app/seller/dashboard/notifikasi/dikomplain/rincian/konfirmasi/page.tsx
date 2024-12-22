"use client";

import Header from "@/app/layouts/header";
import LayoutUtama from "@/app/layouts/layout-utama";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function KonfirmasiRefund() {
  const router = useRouter();
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

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [catatan, setCatatan] = useState(""); // State untuk input catatan

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCatatan(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Catatan yang dimasukkan: ${catatan}`);
    openPopup();
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleButtonClick = () => {
    if (selectedOption === "Tidak") {
      router.push("konfirmasi/detail"); // Navigasi ke halaman konfirmasi-selesai
    } else if (selectedOption === "Ya") {
      setIsPopupOpen(false); // Tutup popup
    }
  };

  return (
    <LayoutUtama>
      <Header title="Konfirmasi" children={undefined} />
      <div className="container mx-auto p-4 font-nunito pt-24 ">
        {/* Order Detail */}
        <div className="bg-neutral-100 rounded-lg p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <div className="text-xs font-nunito text-gray-500">
              Order ID:{" "}
              <span className="font-bold text-gray-700">{orderDetail.id}</span>
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
        <form onSubmit={handleFormSubmit}>
          <div className="mt-4 space-y-2">
            <label className="block text-[#0F0F0F] font-nunito text-[15px] font-bold mb-2">
              Catatan Ke Pemohon
            </label>
            <h1 className="text-[13px]">
              Catatan diisi bila ada kendala stok barang retur, Lewati jika
              tidak ada kendala.
            </h1>
            <input
              type="text"
              className="w-full h-[80px] p-2 font-nunito text-[13px] border border-gray-300 rounded-md"
              placeholder="Jelaskan Kendala Yang Dialami"
              value={catatan}
              onChange={handleInputChange}
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full mb-6 px-4">
            <button
              type="submit"
              className="bg-[#51D7B1] text-white py-3 w-full rounded-md"
            >
              Lanjutkan
            </button>
          </div>
        </form>
        {isPopupOpen && (
          <div
            className="fixed inset-0 z-50 flex justify-center items-end"
            onClick={closePopup}
          >
            <div
              className="bg-white p-4 h-[250px] rounded-t-[24px] w-full max-w-md shadow-lg z-30 animate-slide-up font-nunito relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-4 mb-4">
                <h3 className="text-[16px] font-bold">Apakah Ada Kendala </h3>
                <button className="text-gray-500" onClick={closePopup}>
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.9998 11.4687L18.362 6.10645L19.8941 7.63851L14.5318 13.0008L19.8941 18.3629L18.362 19.895L12.9998 14.5328L7.63754 19.895L6.10547 18.3629L11.4677 13.0008L6.10547 7.63851L7.63754 6.10645L12.9998 11.4687Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
              <div className="border-b border-[#D3D3D3] mb-4"></div>
              <div className="space-y-3 p-4">
                <label className="flex items-center justify-between">
                  <span className="text-[16px] font-semibold text-neutral-800">
                    Ya
                  </span>
                  <input
                    type="radio"
                    name="verifikasi"
                    value="Ya"
                    checked={selectedOption === "Ya"}
                    onChange={handleRadioChange}
                    className="form-radio text-emerald-400"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-[16px] font-semibold text-neutral-800">
                    Tidak
                  </span>
                  <input
                    type="radio"
                    name="verifikasi"
                    value="Tidak"
                    checked={selectedOption === "Tidak"}
                    onChange={handleRadioChange}
                    className="form-radio text-emerald-400"
                  />
                </label>
              </div>
              <div className="mt-4 px-4">
                <button
                  className="w-full px-4 py-3 text-sm font-bold text-white bg-[#51D7B1] rounded-lg"
                  disabled={!selectedOption}
                  onClick={handleButtonClick}
                >
                  Lanjutkan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutUtama>
  );
}

export default KonfirmasiRefund;
