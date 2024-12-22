"use client";
import claim from "@/api/voucher/claim";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

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

interface ChildComponentProps {
  setData: React.Dispatch<React.SetStateAction<string>>;
}

const VoucherToko = ({
  onApplyDiscount,
  data,
  setDataVoucher,
}: {
  onApplyDiscount: (discount: number) => void;
  data: any;
  setDataVoucher: any;
}) => {
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  console.log(data, "type data = ", typeof data);

  const handleClaim = async (id: number) => {
    console.log(id);

    try {
      const response = await claim({ discount_id: id });

      console.log(response.code);
      if (response.error.code == 401) {
        router.push("/authentikasi/login");
      }

      if (response.code == 200) {
        setShowPopup(true);
        console.log("pop up jalan");
      }

      data((v: any) =>
        v.map((item: any, i: number) =>
          item.id === id ? { ...item, is_claim: !item.is_claim } : item
        )
      );
    } catch (err: any) {
      console.log(err.response);
    }
  };

  const applyVoucher = (code: string) => {
    const selectedVoucher = availableVouchers.find(
      (voucher) => voucher.code === code
    );

    if (selectedVoucher) {
      setDiscount(selectedVoucher.discountAmount);
      onApplyDiscount(selectedVoucher.discountAmount);
      setErrorMessage("");
      setVoucherCode(code); // Set voucher yang dipilih
      setShowPopup(true); // Tampilkan pop-up
    } else {
      setDiscount(0);
      setErrorMessage("Kode voucher tidak valid.");
      onApplyDiscount(0);
      setShowPopup(false); // Sembunyikan pop-up jika kode salah
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Fungsi untuk menutup pop-up
  };

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Jika klik berada di luar area pop-up, tutup pop-up
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  return (
    <div>
      <label className="block text-[#0F0F0F] font-nunito text-md font-bold mb-2">
        Voucher
      </label>
      {/* List Voucher */}
      <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex gap-2 w-fit">
          {data?.map?.((voucher: any, index: number) => {
            // console.log(voucher);
            return (
              <div
                key={index}
                className="w-[212px] h-[64px] border rounded-lg bg-gradient-to-r from-[#83E69B] to-[#00BAE1] py-2 px-2"
              >
                <div className="flex w-full justify-between">
                  <h1 className="text-[14px] text-white font-nunitoBold">
                    Rp. {voucher.cashback_value}
                  </h1>
                  {/* Button Gunakan */}
                  <span className="text-white text-[12px] font-nunitoBold">
                    S&K
                  </span>
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
                  <div className="flex items-end gap-2 flex-col">
                    {voucher?.is_claim ? (
                      <button
                        onClick={() => console.log(voucher.id)}
                        className="w-[54px] h-[19px] rounded-md text-warnaShadeBase text-[10px] flex justify-center items-center bg-putihBase"
                      >
                        Digunakan
                      </button>
                    ) : (
                      <button
                        onClick={() => handleClaim(voucher.id)}
                        className="w-[54px] h-[19px] rounded-md text-warnaShadeBase text-[10px] flex justify-center items-center bg-putihBase"
                      >
                        Gunakan
                      </button>
                    )}
                    <h1 className="text-white text-[12px] font-nunitoLight">
                      S&K
                    </h1>
                  </div>
                  {/* Tulisan SK */}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pop-up */}
      {showPopup && (
        <div
          className="fixed h-screen w-full bg-black bg-opacity-50 flex justify-center font-nunito items-center z-[100]"
          onClick={handleOutsideClick} // Deteksi klik di luar pop-up
        >
          <div className="w-[310px] h-[250px] pl-[20px] pr-[20px] pt-[20px] pb-8 bg-white rounded-3xl flex flex-col items-center relative">
            {/* SVG berada di atas teks */}
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

export default VoucherToko;
