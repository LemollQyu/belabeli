"use client";

import Header from "@/app/layouts/header";
import LayoutUtama from "@/app/layouts/layout-utama";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function NotifKomplain() {
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

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const [isSecondPopupOpen, setIsSecondPopupOpen] = useState(false); // Popup kedua
  const [isThirdPopupOpen, setIsThirdPopupOpen] = useState(false); // Popup kedua
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const openFirstPopup = () => {
    setIsPopupOpen(true);
  };

  const closeFirstPopup = () => {
    setIsPopupOpen(false);
    setIsCheckboxChecked(false); // Reset checkbox
  };

  const openSecondPopup = () => {
    setIsSecondPopupOpen(true);
    setIsPopupOpen(false);
  };

  const closeSecondPopup = () => {
    setIsSecondPopupOpen(false);
  };

  const openThirdPopup = () => {
    setIsThirdPopupOpen(true);
    setIsSecondPopupOpen(false);
  };

  const closeThirdPopup = () => {
    setIsThirdPopupOpen(false);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
    if (e.target.value === "Barang Terbukti Rusak") {
      openFirstPopup(); // Open first popup if "Barang Terbukti Rusak" is selected
    } else if (e.target.value === "Barang Terbukti Tidak Rusak") {
      openThirdPopup();
      setIsPopupOpen(false);
      // Open third popup if "Barang Terbukti Tidak Rusak" is selected
    }
  };

  const handleConfirm = () => {
    console.log("Opsi Terpilih:", selectedOption);
    closeSecondPopup();
    router.push("/seller/dashboard/notifikasi/dikomplain/rincian/konfirmasi");
  };

  return (
    <LayoutUtama>
      <Header title="Refund Dana" children={undefined} />
      <div className="container mx-auto p-4 font-nunito pt-24">
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
        {/* Informasi Komplain */}
        <div className="mt-6 h-30 bg-white border border-neutral-300 rounded-lg grid grid-cols-3 grid-rows-3">
          {/* Alasan Komplain */}
          <div className="col-span-1 row-start-1 px-2.5 py-2 border-b border-neutral-300 flex items-center">
            <div className="text-black text-xs font-semibold font-['Nunito'] text-center">
              Alasan Komplain
            </div>
          </div>
          <div className="col-span-2 row-start-1 px-3 py-2 bg-gray-200 border-b border-neutral-400 flex items-center">
            <div className="text-neutral-600 text-xs font-bold font-['Nunito']">
              Barang rusak
            </div>
          </div>

          {/* Pilihan Pengembalian */}
          <div className="col-span-1 row-start-2 px-2.5 py-2 border-b border-neutral-300 flex items-center">
            <div className="text-black text-xs font-semibold font-['Nunito']">
              Pilihan Pengembalian
            </div>
          </div>
          <div className="col-span-2 row-start-2 px-3 py-2 bg-gray-200 border-b border-neutral-400 flex items-center">
            <div className="text-neutral-600 text-xs font-bold font-['Nunito']">
              Refund
            </div>
          </div>

          {/* Deskripsi Komplain */}
          <div className="col-span-1 row-start-3 px-2.5 py-2 flex items-center">
            <div className="text-black text-xs font-semibold font-['Nunito']">
              Deskripsi Komplain
            </div>
          </div>
          <div className="col-span-2 row-start-3 px-3 py-2 bg-gray-200 flex items-center">
            <div className="text-neutral-600 text-xs font-semibold font-['Nunito'] leading-3">
              Sepatunya bau tidak sesuai dengan gambar dan terlihat menyedihkan
            </div>
          </div>
        </div>

        {/* Bukti Kerusakan Barang */}
        <div className="mt-6 bg-neutral-100 rounded-lg border border-neutral-400 w-full max-w-[400px] mx-auto">
          {/* Header */}
          <div className="py-2.5 px-3 bg-white border-b border-neutral-400 rounded-t-lg">
            <h2 className="text-sm font-semibold text-neutral-800">
              Bukti Kerusakan Barang
            </h2>
          </div>

          {/* Kontainer Gambar */}
          <div className="p-4 grid grid-cols-2 gap-3">
            {/* Gambar 1 */}
            <div className="relative w-full h-36 bg-neutral-200 rounded-lg overflow-hidden border border-neutral-300">
              <img
                src="/image/sepatu-rusak.jpg"
                alt="Bukti kerusakan"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gambar 2 */}
            <div className="relative w-full h-36 bg-neutral-200 rounded-lg overflow-hidden border border-neutral-300">
              <img
                src="/image/sepatu-rusak.jpg"
                alt="Bukti kerusakan"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gambar 3 */}
            <div className="relative w-full h-36 bg-neutral-200 rounded-lg overflow-hidden border border-neutral-300">
              <img
                src="/image/sepatu-rusak.jpg"
                alt="Bukti kerusakan"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gambar 4 dengan Tombol Play */}
            {/* <div className="relative w-full h-36 bg-neutral-200 rounded-lg overflow-hidden border border-neutral-300">
              <img
                src="/image/sepatu-rusak.jpg"
                alt="Bukti kerusakan"
                className="w-full h-full object-cover"
              />
              <button className="absolute inset-0 flex items-center justify-center bg-neutral-700/40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div> */}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-400">
            {/* Tombol Konfirmasi */}
            <button
              className="px-4 py-2 text-sm font-semibold text-white bg-emerald-400 rounded-md"
              onClick={openFirstPopup}
            >
              Konfirmasi Persetujuan
            </button>

            {/* Informasi Pengirim */}
            <div className="text-right">
              <p className="text-xs font-semibold text-neutral-600">
                Dikirim Oleh: @Jamila123
              </p>
              <p className="text-xs text-neutral-500">20 Oktober 2024</p>
            </div>
          </div>

          {/* Popup */}
          {isPopupOpen && (
            <div
              className="fixed inset-0 z-50 flex justify-center items-end"
              onClick={closePopup}
            >
              <div
                className="bg-white p-4 h-[300px] rounded-t-[24px] w-full max-w-md shadow-lg z-30 animate-slide-up font-nunito relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header Popup */}
                <div className="flex justify-between items-center px-4 mb-4">
                  <h3 className="text-[16px] font-bold">
                    Konfirmasi Kerusakan Barang
                  </h3>
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

                {/* Konten Popup */}
                <div className="px-4">
                  <div className="p-4 border-2 border-[#D3D3D3] rounded-lg ">
                    <p className="flex items-center text-sm font-semibold text-neutral-800 mb-4">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"
                          fill="black"
                        />
                      </svg>
                      <span className="ml-2">
                        Apakah Produk Terbukti Rusak ?
                      </span>
                    </p>
                    <div className="border-b border-[#D3D3D3] mb-4"></div>

                    <div className="space-y-3 px-2">
                      <label className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-neutral-800">
                          Barang Terbukti Rusak
                        </span>
                        <input
                          type="radio"
                          name="verifikasi"
                          value="Barang Terbukti Rusak"
                          checked={selectedOption === "Barang Terbukti Rusak"}
                          onChange={handleRadioChange}
                          className="form-radio text-emerald-400"
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-neutral-800">
                          Barang Terbukti Tidak Rusak
                        </span>
                        <input
                          type="radio"
                          name="verifikasi"
                          value="Barang Terbukti Tidak Rusak"
                          checked={
                            selectedOption === "Barang Terbukti Tidak Rusak"
                          }
                          onChange={handleRadioChange}
                          className="form-radio text-emerald-400"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-4 px-4">
                  <button
                    className="w-full px-4 py-3 text-sm font-bold text-white bg-[#51D7B1] rounded-lg"
                    onClick={openSecondPopup}
                    disabled={!selectedOption}
                  >
                    Konfirmasi
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Popup Kedua */}
          {isSecondPopupOpen && (
            <div
              className="fixed inset-0 z-50 flex justify-center items-end"
              onClick={closeSecondPopup}
            >
              <div
                className="bg-white p-4 rounded-lg w-full max-w-md shadow-lg relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header Popup */}
                <div className="flex justify-between items-center px-4 mb-4">
                  <h3 className="text-[16px] font-bold">
                    Barang Terbukti Rusak
                  </h3>
                  <button className="text-gray-500" onClick={closeSecondPopup}>
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

                {/* Konten Popup */}
                <div className="px-4">
                  <div className="p-4 border-2 border-[#D3D3D3] rounded-lg">
                    <p className="flex items-center text-sm font-semibold text-neutral-800 mb-2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"
                          fill="black"
                        />
                      </svg>
                      <span className="ml-2">
                        Ketentuan Jika Barang Terbukti Rusak
                      </span>
                    </p>
                    <div className="border-b border-[#D3D3D3] mb-4"></div>

                    <div className="h-24 overflow-y-scroll text-sm">
                      {/* Ketentuan Retur Barang */}
                      <h2 className="text-sm font-semibold text-neutral-800 mb-2">
                        Tanggung Jawab PENJUAL dalam Proses Retur Barang:
                      </h2>
                      <ul className="list-decimal list-inside text-sm text-neutral-700 space-y-2">
                        <li>
                          Pastikan barang yang akan diretur telah siap untuk
                          dikirim. Barang tidak boleh dalam keadaan stok kosong.
                        </li>
                        <li>
                          Seller bertanggung jawab untuk mengemas barang secara
                          mandiri sebelum dikirimkan ke penyedia layanan
                          pengiriman (shipment provider).
                        </li>
                        <li>
                          Seller wajib mengambil foto barang saat diserahkan
                          kepada shipment provider sebagai bukti pengiriman.
                        </li>
                        <li>
                          Setelah menerima nomor resi dari shipment provider,
                          seller wajib menginputkan nomor resi tersebut ke dalam
                          platform yang tersedia.
                        </li>
                        <li>
                          Setelah foto barang dan nomor resi berhasil diunggah,
                          seller harus menekan tombol{" "}
                          <strong>Selesaikan</strong> untuk menyelesaikan proses
                          retur.
                        </li>
                      </ul>
                      <p className="mt-4 text-sm text-neutral-600">
                        Dengan mematuhi ketentuan ini, seller dapat memastikan
                        proses pengembalian berjalan dengan lancar.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 px-4">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={isCheckboxChecked}
                      onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                      className="form-checkbox text-emerald-400 mr-2"
                    />
                    <span>
                      Saya Setuju dan Mengerti Syarat dan Ketentuan Retur Barang
                    </span>
                  </label>
                  <button
                    className={`w-full px-4 py-3 text-sm font-bold text-white rounded-lg mt-4 ${
                      isCheckboxChecked ? "bg-[#51D7B1]" : "bg-gray-300"
                    }`}
                    onClick={handleConfirm}
                    disabled={!isCheckboxChecked}
                  >
                    Konfirmasi
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Popup Ketiga */}
          {isThirdPopupOpen && (
            <div
              className="fixed inset-0 z-50 flex justify-center items-end"
              onClick={closeThirdPopup}
            >
              <div
                className="bg-white p-4 rounded-lg w-full max-w-md shadow-lg relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center px-4 mb-4">
                  <h3 className="text-[16px] font-bold">
                    Barang Bukti Tidak Rusak
                  </h3>
                  <button className="text-gray-500" onClick={closeThirdPopup}>
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
                <div className="flex flex-col items-center justify-center text-center text-sm space-y-3">
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M60 110C32.3857 110 10 87.614 10 60C10 32.3857 32.3857 10 60 10C87.614 10 110 32.3857 110 60C110 87.614 87.614 110 60 110ZM55.013 80L90.3685 44.6447L83.2975 37.5736L55.013 65.858L40.871 51.7155L33.8 58.787L55.013 80Z"
                      fill="url(#paint0_linear_6998_32731)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_6998_32731"
                        x1="10"
                        y1="60"
                        x2="110"
                        y2="60"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#83E69B" />
                        <stop offset="1" stopColor="#00BAE1" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <b className="mt-6 text-[20px]">Konfirmasi Terkirim</b>
                  <h1>
                    Terima kasih telah mengkonfirmasi, notifikasi penolakan akan
                    dikirmkan ke pemohon.{" "}
                  </h1>
                </div>
                <button
                  className="w-full px-4 py-3 text-sm font-bold text-white bg-[#51D7B1] rounded-lg mt-4"
                  onClick={closeThirdPopup}
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </LayoutUtama>
  );
}

export default NotifKomplain;
