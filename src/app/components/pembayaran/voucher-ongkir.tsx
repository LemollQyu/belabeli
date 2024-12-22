"use client";
import RedeemCode from "@/api/voucher/postReddemCode";
import React, { ChangeEvent, useState } from "react";

type Discount = {
  id: number;
  merchants_id: number;
  type: string;
  discount_value: number;
  cashback_value: number;
  max_discount: string;
  minimum_purchase: string;
  max_claim: number | null;
  times_claim: number;
  usage_limit: number;
  expiry_date: string;
  start_date: string;
  active: number;
  is_claim: boolean;
};

// Daftar voucher yang tersedia
const availableVouchers = [
  {
    code: "DISCOUNT20",
    discountAmount: 20000,
    minPurchase: 200000,
    expiryDate: "30 November",
  },
  {
    code: "FREESHIP",
    discountAmount: 15000,
    minPurchase: 150000,
    expiryDate: "30 September",
  },
  {
    code: "BIGSALE",
    discountAmount: 50000,
    minPurchase: 300000,
    expiryDate: "30 September",
  },
  {
    code: "BIGPROMO",
    discountAmount: 100000,
    minPurchase: 500000,
    expiryDate: "5 Oktober",
  },
];

const VoucherOngkir = ({
  onApplyDiscount,
  dataVoucher,
  selectedVoucher,
}: {
  onApplyDiscount: (discount: number) => void;
  dataVoucher: Discount[];
  selectedVoucher: any;
}) => {
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [cekCapital, setCekCapital] = useState<boolean>(false);
  const [selectVoucher, setSelectVoucher] = useState<Discount | null>(null);
  const [use, setUse] = useState<number | null>(null);

  console.log("voucher = ", dataVoucher);

  // console.log("voucher yang terselect = ", selectVoucher);

  selectedVoucher(selectVoucher);

  const applyVoucher = async (code: string) => {
    console.log(code);

    const isAllUpperCase = /^[A-Z0-9]+$/.test(code);

    if (isAllUpperCase) {
      console.log("code  masuk");

      const response = await RedeemCode({ code });

      console.log(response);
    } else {
      console.log("CODE HARUS CAPITAL SEMUA");
    }

    // const selectedVoucher = availableVouchers.find(
    //   (voucher) => voucher.code === code
    // );

    // if (selectedVoucher) {
    //   setDiscount(selectedVoucher.discountAmount);
    //   onApplyDiscount(selectedVoucher.discountAmount);
    //   setErrorMessage("");
    //   setVoucherCode(code); // Set voucher yang dipilih
    //   setShowPopup(true); // Tampilkan pop-up
    // } else {
    //   setDiscount(0);
    //   setErrorMessage("Kode voucher tidak valid.");
    //   onApplyDiscount(0);
    //   setShowPopup(false); // Sembunyikan pop-up jika kode salah
    // }
  };

  const closePopup = () => {
    setShowPopup(false); // Fungsi untuk menutup pop-up
  };

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setVoucherCode(value);

    // console.log(value);

    //  data untuk huruf kapital

    const capitalRegex = /[A-Z]/;
    console.log("apakah ada huruf kapital", capitalRegex.test(value));
    setCekCapital(capitalRegex.test(value));
  }

  console.log("use saat ini = ", use);

  return (
    <div className="px-4 py-4">
      <label className="block text-[#0F0F0F] font-nunito text-[15px] font-bold mb-2">
        Voucher Ongkir
      </label>
      <div className="flex space-x-5">
        <input
          type="text"
          className="font-nunito text-[13px] flex-grow h-9 p-2 border border-gray-300 rounded-lg"
          value={voucherCode}
          onChange={handleInputChange}
          placeholder="Masukkan kode voucher"
        />

        <button
          onClick={() => applyVoucher(voucherCode)}
          className="bg-warnaUtama font-nunito text-[12px] font-medium text-white px-5 rounded-lg"
        >
          Gunakan
        </button>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-[12px] font-nunito mt-2">
          {errorMessage}
        </p>
      )}

      <div className="mt-[21px] w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex gap-2 w-[1000px]">
          {dataVoucher?.map((voucher, index: number) => {
            if (voucher.type == "cashback") {
              return (
                <div
                  key={index}
                  className="w-[212px] h-[64px] border rounded-lg bg-gradient-to-r from-[#83E69B] to-[#00BAE1] py-2 px-2"
                >
                  <div className="flex w-full justify-between">
                    <h1 className="text-[14px] text-white font-nunitoBold">
                      Rp {voucher.cashback_value}
                    </h1>
                    {/* Button Gunakan */}
                    <button
                      // onClick={() => applyVoucher(voucher.code)}
                      className={`border rounded-md px-1 ${
                        use == index
                          ? " bg-buttonGrey text-gray-950"
                          : "bg-white text-emerald-500"
                      }  text-[11px] font-nunito font-medium`}
                      onClick={() => {
                        if (use == index) {
                          console.log(use, "ini pencet lagi");
                          setSelectVoucher(null);
                          setUse(null);
                        } else {
                          setSelectVoucher(voucher);
                          setShowPopup(true);
                          setUse(index);
                        }
                      }}
                    >
                      {use == index ? "Digunakan" : "Gunakan"}
                    </button>
                  </div>
                  <div className="flex justify-between mt-1">
                    <div>
                      <p className="text-[8px] font-nunitoLight text-white">
                        Belanja Min {voucher.minimum_purchase}
                      </p>
                      <p className="text-[8px] font-nunitoLight text-white">
                        Berlaku hingga {voucher.expiry_date}
                      </p>
                    </div>
                    <span className="text-white text-[12px] font-nunitoBold">
                      S&K
                    </span>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className="w-[212px] h-[64px] border rounded-lg bg-gradient-to-r from-[#83E69B] to-[#00BAE1] py-2 px-2"
                >
                  <div className="flex w-full justify-between">
                    <h1 className="text-[14px] text-white font-nunitoBold">
                      Discount {voucher.discount_value}%
                    </h1>
                    {/* Button Gunakan */}
                    <button
                      // onClick={() => applyVoucher(voucher.code)}
                      className={`border rounded-md px-1 ${
                        use == index
                          ? " bg-buttonGrey text-gray-950"
                          : "bg-white text-emerald-500"
                      }  text-[11px] font-nunito font-medium`}
                      onClick={() => {
                        if (use == index) {
                          console.log(use, "ini pencet lagi");
                          setSelectVoucher(null);
                          setUse(null);
                        } else {
                          setSelectVoucher(voucher);
                          setShowPopup(true);
                          setUse(index);
                        }
                      }}
                    >
                      {use == index ? "Digunakan" : "Gunakan"}
                    </button>
                  </div>
                  <div className="flex justify-between mt-1">
                    <div>
                      <p className="text-[8px] font-nunitoLight text-white">
                        Belanja Min {voucher.minimum_purchase}
                      </p>
                      <p className="text-[8px] font-nunitoLight text-white">
                        Berlaku hingga {voucher.expiry_date}
                      </p>
                    </div>
                    <span className="text-white text-[12px] font-nunitoBold">
                      S&K
                    </span>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      {/* 
      <div className="mt-[21px] w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex gap-2 w-[1000px]">
          {availableVouchers.map((voucher) => (
            <div
              key={voucher.code}
              className="w-[212px] h-[64px] border rounded-lg bg-gradient-to-r from-[#83E69B] to-[#00BAE1] py-2 px-2"
            >
              <div className="flex w-full justify-between">
                <h1 className="text-[14px] text-white font-nunitoBold">
                  Rp. {voucher.discountAmount.toLocaleString()}
                </h1>
              
                <button
                  onClick={() => applyVoucher(voucher.code)}
                  className="border rounded-md px-1 bg-white text-emerald-500 text-[11px] font-nunito font-medium"
                >
                  Gunakan
                </button>
              </div>
              <div className="flex justify-between mt-1">
                <div>
                  <p className="text-[8px] font-nunitoLight text-white">
                    Belanja Min {voucher.minPurchase.toLocaleString()}
                  </p>
                  <p className="text-[8px] font-nunitoLight text-white">
                    Berlaku hingga {voucher.expiryDate}
                  </p>
                </div>
                <span className="text-white text-[12px] font-nunitoBold">
                  S&K
                </span>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Pop-up */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center font-nunito items-center z-50"
          onClick={handleOutsideClick}
        >
          <div className="w-[310px] h-[250px] pl-[20px] pr-[20px] pt-[20px] pb-8 bg-white rounded-3xl flex flex-col items-center relative">
            <svg
              width="101"
              height="100"
              viewBox="0 0 101 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-4"
            >
              <path
                d="M50.5002 91.6666C27.4883 91.6666 8.8335 73.0116 8.8335 49.9999C8.8335 26.988 27.4883 8.33325 50.5002 8.33325C73.5118 8.33325 92.1668 26.988 92.1668 49.9999C92.1668 73.0116 73.5118 91.6666 50.5002 91.6666ZM46.3443 66.6666L75.8072 37.2038L69.9147 31.3113L46.3443 54.8816L34.5594 43.0962L28.6668 48.9891L46.3443 66.6666Z"
                fill="url(#paint0_linear_4359_24975)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_4359_24975"
                  x1="8.8335"
                  y1="49.9999"
                  x2="92.1668"
                  y2="49.9999"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#83E69B" />
                  <stop offset="1" stopColor="#00BAE1" />
                </linearGradient>
              </defs>
            </svg>

            <div className="text-center text-black text-[20px] font-bold leading-[30px] mb-2">
              Voucher Berhasil Digunakan
            </div>
            <div className="text-center text-black text-[12px] px-3 font-medium leading-[18px]">
              Voucher anda telah berhasil digunakan dan silahkan lanjutkan
              penyelesaian pembayaran{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherOngkir;
