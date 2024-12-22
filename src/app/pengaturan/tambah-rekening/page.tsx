"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LayoutUtama from "@/app/layouts/layout-utama";
import Header from "@/app/layouts/header";
import bankData from "@/api/bank.json";
import kirimDataRekening from "@/api/settings/postRekening";

const TambahRekeningComponent: React.FC = () => {
  const router = useRouter();
  const [showSyaratDiscount, setShowSyarat] = useState(false);
  const syaratRef = useRef<HTMLDivElement>(null);

  const [rekeningList, setRekeningList] = useState<string[]>([]);
  const [nomorRekening, setNomorRekening] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");

  const [idBank, setIdBank] = useState<string>("");

  const [isBankTransferOpen, setIsBankTransferOpen] = useState<boolean>(false);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [bankList, setBankList] = useState<
    { kodeBank: string; namaBank: string }[]
  >([]);

  useEffect(() => {
    // Load bank list from local JSON
    if (bankData.status && bankData.data) {
      setBankList(bankData.data);
    } else {
      console.error(
        "Failed to load local bank data:",
        bankData.msg || "Unknown error"
      );
    }
  }, []);

  const handleToggleDropdown = () => {
    setIsBankTransferOpen(!isBankTransferOpen);
  };

  const handleBankSelect = (bank: string, kodeBank: string) => {
    setSelectedBank(bank);
    setIdBank(bank);
    setIsBankTransferOpen(false);
  };

  useEffect(() => {
    const storedRekeningList = localStorage.getItem("rekeningList");
    if (storedRekeningList) {
      setRekeningList(JSON.parse(storedRekeningList));
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        syaratRef.current &&
        !syaratRef.current.contains(event.target as Node)
      ) {
        setShowSyarat(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async () => {
    const response = await kirimDataRekening({
      bank_name: idBank,
      nomor_rekening: nomorRekening,
      full_name: fullName,
    });
    console.log("response request bank", response.error);
    console.log("response request bank", response.data);

    router.push("/pengaturan/rekening-bank");
  };

  return (
    <>
      <LayoutUtama>
        <Header title="Rekening" children={undefined} />
        <div className="w-full max-w-[400px] mx-auto py-6 font-nunito px-4 flex flex-col h-screen justify-between">
          <div>
            <h1 className="mt-6 pb-4 text-[16px] text-center font-nunito font-semibold">
              Pilih Rekening Bank
            </h1>
          </div>

          <div className="mb-4">
            <button
              className="relative flex items-center py-4 px-4 w-full bg-white border border-[#D3D3D3] rounded-lg"
              onClick={handleToggleDropdown}
            >
              <span className="py-4 absolute inset-0 flex items-center justify-center font-nunito font-bold text-[15px] text-black">
                {selectedBank || "Rekening Bank"}
              </span>
              <svg
                className={`w-4 h-4 transition-transform ml-auto text-black ${
                  isBankTransferOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isBankTransferOpen && (
              <div className="mt-2 bg-white border rounded-lg shadow-md">
                {bankList.length === 0 ? (
                  <div className="py-2 px-4 text-gray-500">
                    No banks available
                  </div>
                ) : (
                  bankList.map((bank) => (
                    <div
                      key={bank.kodeBank}
                      className="flex justify-between items-center py-2 px-2 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <span className="font-nunito text-[13px]">
                          {bank.namaBank}
                        </span>
                      </div>
                      <input
                        type="radio"
                        name="bank"
                        value={bank.namaBank}
                        checked={selectedBank === bank.namaBank}
                        onChange={() =>
                          handleBankSelect(bank.namaBank, bank.kodeBank)
                        }
                      />
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="text-[#949494] font-nunito text-[15px] font-semibold space-y-4"
          >
            <div className="relative">
              <input
                type="text"
                id="nomorRekening"
                placeholder=" "
                value={nomorRekening}
                onChange={(e) => setNomorRekening(e.target.value)}
                className="peer w-full px-4 py-3 bg-[#F1F1F1] rounded-lg border-gray-300 text-gray-900 focus:outline-none focus:border-emerald-500"
              />
              <label
                htmlFor="nomorRekening"
                className="absolute left-4 top-2 transform -translate-y-1/2 text-sm text-grey-500 transition-all duration-200
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-500
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500"
              >
                Nomor Rekening
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                id="fullName"
                placeholder=" "
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="peer w-full px-4 py-3 bg-[#F1F1F1] rounded-lg border-gray-300 text-gray-900 focus:outline-none focus:border-emerald-500"
              />
              <label
                htmlFor="nomorRekening"
                className="absolute left-4 top-2 transform -translate-y-1/2 text-sm text-grey-500 transition-all duration-200
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-500
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500"
              >
                Nama Lengkap
              </label>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-[400px] mx-auto font-nunito mt-[230px]">
                {/* Teks syarat dan ketentuan */}
                <div className="text-center text-[12px] mt-8 px-2">
                  Dengan klik tombol di bawah, anda menyetujui{" "}
                  <button
                    type="button"
                    onClick={handleOpenSyaratDiscount}
                    className="text-emerald-500"
                  >
                    Syarat & Ketentuan
                  </button>{" "}
                  serta{" "}
                  <a href="#" className="text-emerald-500">
                    Pemberitahuan Privasi
                  </a>{" "}
                  untuk menambahkan rekening.
                </div>

                {/* Popup Syarat dan Ketentuan */}
                {showSyaratDiscount && (
                  <div className="fixed inset-0 mt-[370px] flex items-center justify-center z-50">
                    {/* Background overlay */}
                    <div
                      className="fixed inset-0 bg-black opacity-50"
                      onClick={handleCloseSyaratDiscount}
                    ></div>

                    {/* Popup container */}
                    <div className="bg-white p-6 h-[400px] text-black rounded-t-[24px] w-full max-w-md shadow-lg z-50 animate-slide-up relative overflow-hidden">
                      {/* Header */}
                      <div className="flex justify-between items-center mb-4">
                        <h1 className="text-[16px] text-black font-semibold">
                          Syarat & Ketentuan serta Pemberitahuan Privasi{" "}
                        </h1>
                        <svg
                          onClick={handleCloseSyaratDiscount}
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          className="cursor-pointer"
                        >
                          <path
                            d="M6.99976 5.46871L12.362 0.106445L13.8941 1.63851L8.53181 7.00076L13.8941 12.3629L12.362 13.895L6.99976 8.53281L1.63754 13.895L0.105469 12.3629L5.46771 7.00076L0.105469 1.63851L1.63754 0.106445L6.99976 5.46871Z"
                            fill="black"
                          />
                        </svg>
                      </div>

                      {/* Isi Syarat dan Ketentuan */}
                      <ul className="w-full max-h-[260px] overflow-y-auto border text-[14px] rounded-[24px] font-medium rounded-md p-[12px]">
                        <li className="font-nunito mb-2">
                          <strong>1. Persetujuan Pengguna</strong>: Dengan
                          menambahkan rekening bank, Anda menyetujui untuk
                          memberikan informasi yang akurat dan terbaru, serta
                          memahami dan menerima semua ketentuan yang diatur
                          dalam Syarat & Ketentuan ini.
                        </li>
                        <li className="font-nunito mb-2">
                          <strong>2. Persyaratan Penambahan Rekening</strong>:
                          Anda harus memberikan informasi yang benar, termasuk
                          nama pemilik rekening, nomor rekening, dan bank yang
                          terdaftar. Rekening yang ditambahkan harus dimiliki
                          oleh pengguna yang sama dengan akun aplikasi atau
                          platform ini.
                        </li>
                        <li className="font-nunito mb-2">
                          <strong>
                            3. Penggunaan Rekening untuk Transaksi
                          </strong>
                          : Rekening yang ditambahkan akan digunakan untuk
                          memproses transaksi, baik untuk menerima pembayaran
                          maupun mengirimkan dana sesuai ketentuan yang berlaku.
                          Setiap transaksi yang melibatkan rekening bank Anda
                          tunduk pada aturan dan biaya bank yang berlaku, serta
                          kebijakan aplikasi atau platform ini.
                        </li>
                        <li className="font-nunito mb-2">
                          <strong>4. Keamanan Rekening</strong>: Kami
                          berkomitmen untuk menjaga kerahasiaan informasi
                          rekening Anda. Penggunaan rekening ini hanya sebatas
                          untuk keperluan transaksi sesuai persetujuan Anda.
                          Anda bertanggung jawab menjaga kerahasiaan dan
                          keamanan informasi login akun aplikasi untuk
                          menghindari akses yang tidak sah.
                        </li>
                        <li className="font-nunito mb-2">
                          <strong>5. Pembatasan Tanggung Jawab</strong>: Kami
                          tidak bertanggung jawab atas kerugian atau kerusakan
                          yang terjadi akibat: Penggunaan informasi rekening
                          yang tidak akurat oleh pengguna, gangguan atau
                          kegagalan layanan bank yang terkait dengan rekening,
                          dan akses yang tidak sah ke akun Anda akibat kelalaian
                          menjaga keamanan.
                        </li>
                        <li className="font-nunito mb-2">
                          <strong>6. Perubahan Syarat & Ketentuan</strong>: Kami
                          berhak untuk mengubah atau memperbarui Syarat &
                          Ketentuan ini sewaktu-waktu. Setiap perubahan akan
                          diberitahukan melalui notifikasi di aplikasi atau
                          melalui email.
                        </li>
                      </ul>
                      <button
                        onClick={handleCloseSyaratDiscount}
                        className="mt-4 w-full h-[45px] rounded-md bg-[#51D7B1] text-white flex justify-center items-center"
                      >
                        Oke
                      </button>
                    </div>
                  </div>
                )}
                <button
                  type="button"
                  className={`w-full py-3 mt-4 text-white rounded-lg ${
                    nomorRekening && selectedBank
                      ? "bg-[#51D7B1]"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!nomorRekening || !selectedBank}
                  onClick={handleSubmit}
                >
                  Tambah Rekening Bank
                </button>
              </div>
            </div>
          </form>
        </div>
      </LayoutUtama>
    </>
  );
};

export default TambahRekeningComponent;
