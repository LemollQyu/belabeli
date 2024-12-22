"use client";
import Link from "next/link";
import Header from "@/app/layouts/header";
import React, { useState, useEffect } from "react";
import IconToko from "@/app/components/icon/toko";
import IconSuperSeller from "@/app/components/icon/super-seller";
import IconLocations from "@/app/components/icon/location";
import IconHistory from "@/app/components/icon/history";
import IconWarna from "@/app/components/icon/warna";
import { useParams } from "next/navigation";
import IconBankCard from "@/app/components/icon/bank-card";
import IconCalender from "@/app/components/icon/calender";
import FileUploadPengembalian from "@/app/components/modul-ulasan/file-upload-pengembalian";
import { Inter } from "next/font/google";
import Image from "next/image";
// import { ExclamationCircle } from "react-bootstrap-icons";
// import { CheckCircleFill } from "react-bootstrap-icons";
import IconCheckedGradation from "@/app/components/icon/checked-gradation";

const KomplainPesanan = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<(File | null)[]>([]);
  const [ada, setAda] = useState<boolean>(false);
  const [tinggiSyaratDiscount, setTinggiSyaratDiscount] =
    useState<string>("h-0 opacity-0");

  const [tinggiPengajuanDikirim, setTinggiPengajuanDikirim] =
    useState<string>("h-0 opacity-0");

  function konfirmasiSnK() {
    setAgreed((prevAgreed) => !prevAgreed); // Toggle the agreed state
  }

  let { batalkan } = useParams();

  if (Array.isArray(batalkan)) {
    batalkan = batalkan[0];
  }

  const handleFilesChange = (files: (File | null)[]) => {
    setUploadedFiles(files);
  };

  function handleCloseSyaratDiscount() {
    setAda(false);
    setTinggiSyaratDiscount("h-0 opacity-0");
  }

  function handleDiscount(e: any) {
    e.preventDefault();
    setTinggiSyaratDiscount("h-[440px] opacity-100");
    setAda(true);
  }

  function handlePengajuanDikirim(e: any) {
    e.preventDefault();
    setTinggiSyaratDiscount("h-0 opacity-0");
    setTinggiPengajuanDikirim("h-[440px] opacity-100");
    setAda(true);
  }

  function handleClosePengajuanDikirim() {
    setAda(false);
    setTinggiPengajuanDikirim("h-0 opacity-0");
  }

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
  };

  let { komplain } = useParams();

  if (Array.isArray(komplain)) {
    komplain = komplain[0]; // If `toko` is an array, use the first element
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const closeModal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const maxWords = 50;

  const handleChangeText = (event: { target: { value: string } }) => {
    const inputText = event.target.value;
    const words = inputText
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const currentWordCount = words.length;

    if (currentWordCount <= maxWords) {
      setText(inputText);
      setWordCount(currentWordCount);
    } else {
      setIsModalOpen(true);
      setIsAnimating(true);
    }
  };

  return (
    <>
      <Header title="Komplain Barang" children={undefined} />
      {ada ? (
        <div className="z-10 h-[200vh] top-0 left-0 right-0 bottom-0 absolute bg-black opacity-50"></div>
      ) : null}
      <div className="px-4 font-nunito absolute py-20 mb-20 items-center w-[400px] left-1/2 -translate-x-1/2">
        <div className="relative items-center pt-3 text-sm transition-all duration-200 rounded-md cursor-pointer text-black-80 border-white-30 w-full max-w-[444px] bg-gray-100 mt-3">
          {/* --- Header toko ----- */}
          <div className="flex items-center justify-between h-fit">
            <div className="flex items-center space-x-2 pl-4">
              <p className="font-light text-sm text-black">
                Order ID: 1270511324
              </p>
            </div>
            <div className="pr-4">
              <p className="text-base text-black-80 font-bold">Rp 580.000</p>
            </div>
          </div>

          {/* --- Body toko ----- */}
          <div className="mt-2 p-3 border-t-2 flex justify-start gap-3">
            <div className="w-2/6">
              <img
                className="object-cover w-full h-[100px] rounded-md"
                src="/image/image.png"
              ></img>
            </div>
            <div className="w-4/6">
              <h3 className="font-semibold mb-1 text-sm">
                Sepatu Anak Sekolah SMP Semua Ukuran | Murah dan Berkualitas.
              </h3>

              <div className="flex flex-wrap items-center mb-1">
                <IconWarna></IconWarna>
                <p className="mx-2 text-xs font-semibold">Varian :</p>
                <p className="text-xs font-light">Putih, 34</p>
              </div>

              <div className="flex flex-wrap items-center mb-1">
                <IconBankCard></IconBankCard>
                <p className="ml-3 mr-2 text-xs font-semibold">
                  Metode Bayar :
                </p>
                <p className="text-xs font-light">Transfer Bank</p>
              </div>

              <div className="flex flex-wrap items-center mb-1">
                <IconCalender></IconCalender>
                <p className="ml-3 mr-2 text-xs font-semibold">
                  Tanggal Order :
                </p>
                <p className="text-xs font-light">2 Oktober 2024</p>
              </div>

              <div className="flex justify-end">
                <div className="py-1 w-3 px-3 bg-[#A9A9A9] text-xs rounded-md font-medium text-white flex justify-center">
                  <span className="w-3">1</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-gray-200 mt-2 p-3 border-t-2 flex flex-col gap-y-2 justify-center items-center">
            <div className="w-full flex justify-center items-center">
              <div className="w-2/6">
                <p className="text-[12px] font-semibold">Cara Pengembalian</p>
              </div>
              <div className="w-4/6">
                <select
                  onChange={handleChange}
                  value={selectedOption}
                  className="w-full text-left rounded-md p-1 border-2 border-black text-xs"
                >
                  <option value="">Pilih Cara</option>
                  <option value="refund">Refund</option>
                  <option value="retur">Retur</option>
                </select>
              </div>
            </div>

            <div className="w-full flex justify-center items-center">
              <div className="w-2/6">
                <p className="text-[12px] leading-tight font-semibold">
                  Kondisi Barang
                </p>
              </div>
              <div className="w-4/6">
                <select className="w-full text-left rounded-md p-1 border-2 border-black text-xs">
                  <option value="">Pilih Kondisi</option>
                  <option value="Barang rusak">Barang rusak</option>
                  <option value="Baranag tidak sesuai rincian">
                    Barang tidak sesuai rincian
                  </option>
                </select>
              </div>
            </div>

            <div className="w-full flex justify-center items-center">
              <div className="w-2/6">
                <p className="text-[12px] leading-tight font-semibold">
                  Deskripsi
                </p>
              </div>
              <div className="w-4/6">
                <textarea
                  value={text}
                  onChange={handleChangeText}
                  rows={9}
                  className={`w-full border-2 border-black rounded-md text-xs p-1`}
                  placeholder="Tulis keterangan pengembalian..."
                ></textarea>
                <p className="text-[10px] text-gray-500 -mt-1">
                  {wordCount}/{maxWords} kata
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-x-2 border-t-2 border-gray-200 items-center pt-3 text-sm transition-all duration-200 rounded-md cursor-pointer text-black-80 border-white-30 w-full max-w-[444px] bg-white mt-3">
          {/* --- Header toko ----- */}
          <div className="flex text-left h-fit mb-3">
            <div className="flex items-center space-x-2 pl-4">
              <p className="font-semibold text-sm text-black">
                Upload Bukti Kerusakan
              </p>
            </div>
          </div>

          {/* --- Body toko ----- */}
          <div className="p-5 border-t-2 border-gray-300 bg-gray-100 flex justify-start">
            <div className="w-full flex flex-row">
              <FileUploadPengembalian
                maxFiles={4}
                w={"[150px]"}
                h={"[150px]"}
                onFilesChange={handleFilesChange}
              />
            </div>
          </div>

          <div className="flex text-left w-full p-3 border-t-2 border-b-2 rounded-br-md rounded-bl-md border-gray-300">
            <button
              type="button"
              onClick={handleDiscount}
              className="bg-[#51D7B1] text-white text-sm font-semibold rounded-md w-full py-2"
            >
              Kirim Komplain
            </button>
          </div>
        </div>
      </div>

      <div
        className={`w-[360px] rounded-t-3xl left-1/2 -translate-x-1/2 fixed bottom-[50px] ${tinggiSyaratDiscount} z-30 bg-white p-5 transition-all duration-1000 overflow-hidden`}
      >
        <div className="flex justify-between  items-center">
          <h1 className="text-base font-bond font-nunitoBold">
            Barang Terbukti Rusak
          </h1>

          {/* close syarat discount */}
          <svg
            onClick={handleCloseSyaratDiscount}
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M6.99976 5.46871L12.362 0.106445L13.8941 1.63851L8.53181 7.00076L13.8941 12.3629L12.362 13.895L6.99976 8.53281L1.63754 13.895L0.105469 12.3629L5.46771 7.00076L0.105469 1.63851L1.63754 0.106445L6.99976 5.46871Z"
              fill="black"
            />
          </svg>
          {/* tutup close syarat discount */}
        </div>

        <div className="w-[312px] h-[265px] overflow-y-auto border rounded-md p-[12px] mt-[12px]">
          <h3 className="text-md font-semibold flex gap-2 bg-red-200 rounded-lg p-2 text-red-600">
            <ExclamationCircle size={20} />
            Ketentuan Jika Barang Terbukti Rusak
          </h3>

          <div className="p-4">
            <p className="pb-2">
              Tanggung Jawab PEMBELI dalam Proses Retur Barang, meliputi :{" "}
            </p>
            <ul className="list-decimal">
              <li>
                Pastikan barang yang akan diretur dalam kondisi asli, tidak
                rusak, dan lengkap sesuai dengan ketentuan retur.
              </li>
              <li>{`Pembeli bertanggung jawab untuk mengemas barang secara mandiri sebelum dikirimkan ke penyedia layanan pengiriman (shipment provider).`}</li>
              <li>
                Pembeli wajib mengambil foto barang saat diserahkan kepada
                shipment provider sebagai bukti pengiriman.
              </li>
              <li>
                Setelah menerima nomor resi dari shipment provider, pembeli
                wajib menginputkan nomor resi tersebut ke dalam platform yang
                tersedia.
              </li>
              <li>
                Setelah foto barang dan nomor resi berhasil diunggah, pembeli
                harus menekan tombol Selesaikan untuk menyelesaikan proses
                retur.
              </li>
              <li>
                Dengan mematuhi ketentuan ini, pembeli dapat memastikan proses
                retur berjalan dengan lancar.
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-2 text-xs flex gap-2">
          <button onClick={konfirmasiSnK}>
            <CheckCircleFill
              size={20}
              className={agreed ? "text-green-500" : "text-gray-400"}
            />
          </button>
          Saya Setuju dan Mengerti Syarat dan Ketentuan Retur Barang
        </p>
        <button
          onClick={handlePengajuanDikirim}
          type="button"
          className={`mt-[10px] w-[312px] h-[42px] rounded-md ${
            agreed ? "bg-[#51D7B1]" : "bg-gray-400"
          } flex justify-center items-center text-[#fff]`}
        >
          Konfirmasi
        </button>
      </div>

      <div
        className={`w-[360px] rounded-t-3xl left-1/2 -translate-x-1/2 fixed bottom-[50px] ${tinggiPengajuanDikirim} z-30 bg-white p-5 transition-all duration-1000 overflow-hidden`}
      >
        <div className="flex justify-between  items-center">
          <h1 className="text-base font-bond font-nunitoBold">
            Pengajuan Pengembalian
          </h1>
          <svg
            onClick={handleClosePengajuanDikirim}
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M6.99976 5.46871L12.362 0.106445L13.8941 1.63851L8.53181 7.00076L13.8941 12.3629L12.362 13.895L6.99976 8.53281L1.63754 13.895L0.105469 12.3629L5.46771 7.00076L0.105469 1.63851L1.63754 0.106445L6.99976 5.46871Z"
              fill="black"
            />
          </svg>
        </div>

        <div className="flex justify-center items-center py-10">
          <IconCheckedGradation></IconCheckedGradation>
        </div>

        <div className="justify-center flex-col items-center text-center mb-24">
          <h2 className="!font-nunito font-semibold text-xl">
            Pengajuan Dikirim
          </h2>
          <p className="!font-nunito font-light text-xs pt-3 px-6 leading-tight">
            Pengajuan pengembalian barang Anda telah dikirim ke Seller. <br />{" "}
            Silakan tunggu konfirmasi selanjutnya
          </p>
        </div>
        <Link
          href={`/transaksi/komplain/${komplain}/detail?p=${selectedOption}&q=pending`}
        >
          <button
            type="button"
            onClick={handleClosePengajuanDikirim}
            className="mt-[10px] w-[312px] h-[42px] rounded-md bg-[#51D7B1] flex justify-center items-center text-[#fff]"
          >
            Oke
          </button>
        </Link>
      </div>

      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          <div
            id="modal"
            className="font-nunito fixed inset-y-1/2 flex justify-center items-center z-[100] w-[360px] left-1/2 -translate-x-1/2 shadow-lg"
          >
            <div
              className={`bg-white w-full max-w-lg rounded-xl p-6 absolute bottom-0 inset-y-auto ${
                isAnimating ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold font-nunito">Perhatian</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="flex items-center mb-6 gap-5">
                <p>Anda telah mencapai maksimum kata penginputan</p>
              </div>

              <div className="flex flex-row gap-3 mt-6">
                <button
                  onClick={closeModal}
                  className="w-full bg-[#EE443F] text-white font-bold py-3 rounded-lg"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default KomplainPesanan;
