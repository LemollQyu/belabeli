'use client'
import Header from '@/app/layouts/header'
import LayoutUtama from '@/app/layouts/layout-utama'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const TambahProduk = () => {
  const router = useRouter()
  const [isVoucherOpen, setVoucherOpen] = useState(false)
  const [selectedButton, setSelectedButton] = useState<number | null>(null)
  const [isDiskonOpen, setIsDiskonOpen] = useState(false)
  const [isCashbackOpen, setIsCashbackOpen] = useState(false)
  const [isKuotaModalOpen, setKuotaModalOpen] = useState(false)
  const [kuota, setKuota] = useState(0)
  const [isMaxKlaimOpen, setMaxKlaimOpen] = useState(false)
  const [klaim, setKLaim] = useState(0)
  const [stateButtonId, setStateButtonId] = useState(1)
  const [isWaktuMulaiOpen, setWaktuMulaiOpen] = useState(false)
  const [isWaktuBerakhirOpen, setWaktuBerakhirOpen] = useState(false)
  const [waktuMulai, setWaktuMulai] = useState<Date | null>(null)
  const [waktuBerakhir, setWaktuBerakhir] = useState<Date | null>(null)

  const openWaktuMulai = () => setWaktuMulaiOpen(true)
  const closeWaktuMulai = () => setWaktuMulaiOpen(false)

  const openWaktuBerakhir = () => setWaktuBerakhirOpen(true)
  const closeWaktuBerakhir = () => setWaktuBerakhirOpen(false)

  const handleConfirmWaktuMulai = () => {
    console.log('Waktu Mulai:', waktuMulai)
    setWaktuMulaiOpen(false)
  }

  const handleConfirmWaktuBerakhir = () => {
    console.log('Waktu Berakhir:', waktuBerakhir)
    setWaktuBerakhirOpen(false)
  }

  const toggleVoucherDropdown = () => setVoucherOpen(!isVoucherOpen)
  const toggleDiskonDropdown = () => setIsDiskonOpen(!isDiskonOpen)
  const toggleCashbackDropdown = () => setIsCashbackOpen(!isCashbackOpen)

  const handleButtonClick = (buttonId: number) => {
    setSelectedButton(buttonId)
    setVoucherOpen(false)

    if (buttonId === 1) {
      setIsDiskonOpen(true)
      setIsCashbackOpen(false)
      setStateButtonId(buttonId)
    } else if (buttonId === 2) {
      setIsCashbackOpen(true)
      setIsDiskonOpen(false)
      setStateButtonId(buttonId)
    }
  }

  const openKuotaModal = () => setKuotaModalOpen(true)
  const closeKuotaModal = () => setKuotaModalOpen(false)
  const openMaxKlaim = () => setMaxKlaimOpen(true)
  const closeMaxKlaim = () => setMaxKlaimOpen(false)

  const handleConfirm = () => {
    console.log('Data Terkonfirmasi: Kuota', kuota)
    setKuotaModalOpen(false)
  }

  const handleMaxKlaim = () => {
    console.log('Data Terkonfirmasi: Klaim', klaim)
    setMaxKlaimOpen(false)
  }

  const handleContinue = () => {
    router.push('/seller/dashboard/setup-toko/pusat-bantuan') // Arahkan ke halaman rekening bank
  }

  return (
    <LayoutUtama>
      <Header title="Manajemen Diskon" children={undefined} />
      <div className="container mx-auto p-4 font-nunito pt-24">
        {/* Pilihan Voucher */}
        <div className="space-y-4">
          {/* Dropdown Pilih Voucher */}
          <button
            className="relative flex items-center py-6 px-4 w-full bg-white border-2 border-gray-300 rounded-[16px] shadow-md"
            onClick={toggleVoucherDropdown}
          >
            <span className="py-4 absolute inset-0 flex items-center justify-center font-nunito font-bold text-[15px] text-black">
              Pilih Voucher
            </span>
            <svg
              className={`w-4 h-4 transition-transform ml-auto text-black ${
                isVoucherOpen ? 'rotate-180' : 'rotate-0'
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

          {/* Dropdown Items */}
          {isVoucherOpen && (
            <div>
              {/* Item 1 */}
              <div className="flex items-center justify-between p-4 border border-[#d2d2d2]">
                <div>
                  <div className="text-[13px] font-semibold text-[#1b1e28]">
                    Voucher
                  </div>
                  <div className="text-sm font-bold text-[#6b6b6b]">Diskon</div>
                </div>
                <button
                  onClick={() => handleButtonClick(1)}
                  className={`${
                    selectedButton === 1
                      ? 'bg-gradient-to-r from-[#83E69B] to-[#00BAE1]'
                      : 'bg-gradient-to-r from-[#eaeaea] to-[#cacaca]'
                  } text-white text-[12px] font-semibold px-3 py-1.5 rounded shadow w-24`}
                >
                  Pilih
                </button>
              </div>

              {/* Item 2 */}
              <div className="flex items-center justify-between p-4 border border-[#d2d2d2]">
                <div>
                  <div className="text-[13px] font-semibold text-[#1b1e28]">
                    Voucher
                  </div>
                  <div className="text-sm font-bold text-[#6b6b6b]">
                    Cashback
                  </div>
                </div>
                <button
                  onClick={() => handleButtonClick(2)}
                  className={`${
                    selectedButton === 2
                      ? 'bg-gradient-to-r from-[#83E69B] to-[#00BAE1]'
                      : 'bg-gradient-to-r from-[#eaeaea] to-[#cacaca]'
                  } text-white text-[12px] font-semibold px-3 py-1.5 rounded shadow w-24`}
                >
                  Pilih
                </button>
              </div>
            </div>
          )}

          {/* Dropdown Pilih Voucher Diskon */}
          {(() => {
            if (stateButtonId == 1) {
              return (
                <>
                  <button
                    className="relative flex items-center py-6 px-4 w-full bg-white border-2 border-gray-300 rounded-[16px] shadow-md"
                    onClick={toggleDiskonDropdown}
                  >
                    <span className="py-4 absolute inset-0 flex items-center justify-center font-nunito font-bold text-[15px] text-black">
                      Pilih Voucher Diskon
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform ml-auto text-black ${
                        isDiskonOpen ? 'rotate-180' : 'rotate-0'
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

                  {isDiskonOpen && (
                    <div>
                      {/* Item 1 */}
                      <div className="flex items-center justify-between p-4 border border-[#d2d2d2]">
                        <div>
                          <div className="text-[13px] font-semibold text-[#1b1e28]">
                            Voucher Diskon
                          </div>
                          <div className="text-sm font-bold text-[#6b6b6b]">
                            5% Minimal Belanja 20.000
                          </div>
                        </div>
                        <button
                          onClick={() => handleButtonClick(3)}
                          className={`${
                            selectedButton === 3
                              ? 'bg-gradient-to-r from-[#83E69B] to-[#00BAE1]'
                              : 'bg-gradient-to-r from-[#eaeaea] to-[#cacaca]'
                          } text-white text-[12px] font-semibold px-3 py-1.5 rounded shadow w-24`}
                        >
                          Pilih
                        </button>
                      </div>

                      {/* Item 2 */}
                      <div className="flex items-center justify-between p-4 border border-[#d2d2d2]">
                        <div>
                          <div className="text-[13px] font-semibold text-[#1b1e28]">
                            Voucher Diskon
                          </div>
                          <div className="text-sm font-bold text-[#6b6b6b]">
                            10% Minimal Belanja 50.000
                          </div>
                        </div>
                        <button
                          onClick={() => handleButtonClick(4)}
                          className={`${
                            selectedButton === 4
                              ? 'bg-gradient-to-r from-[#83E69B] to-[#00BAE1]'
                              : 'bg-gradient-to-r from-[#eaeaea] to-[#cacaca]'
                          } text-white text-[12px] font-semibold px-3 py-1.5 rounded shadow w-24`}
                        >
                          Pilih
                        </button>
                      </div>

                      {/* Item 3 */}
                      <div className="flex items-center justify-between p-4 border border-[#d2d2d2]">
                        <div>
                          <div className="text-[13px] font-semibold text-[#1b1e28]">
                            Voucher Diskon
                          </div>
                          <div className="text-sm font-bold text-[#6b6b6b]">
                            15% Minimal Belanja 75.000
                          </div>
                        </div>
                        <button
                          onClick={() => handleButtonClick(5)}
                          className={`${
                            selectedButton === 5
                              ? 'bg-gradient-to-r from-[#83E69B] to-[#00BAE1]'
                              : 'bg-gradient-to-r from-[#eaeaea] to-[#cacaca]'
                          } text-white text-[12px] font-semibold px-3 py-1.5 rounded shadow w-24`}
                        >
                          Pilih
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )
            } else if (stateButtonId == 2) {
              return (
                <>
                  <button
                    className="relative flex items-center py-6 px-4 w-full bg-white border-2 border-gray-300 rounded-[16px] shadow-md"
                    onClick={toggleCashbackDropdown}
                  >
                    <span className="py-4 absolute inset-0 flex items-center justify-center font-nunito font-bold text-[15px] text-black">
                      Pilih Voucher Cashback
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform ml-auto text-black ${
                        isCashbackOpen ? 'rotate-180' : 'rotate-0'
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
                  {isCashbackOpen && (
                    <div>
                      <div className="flex items-center justify-between p-4 border border-[#d2d2d2]">
                        <div>
                          <div className="text-[12px] font-semibold text-[#1B1E28]">
                            Cashback hingga
                          </div>
                          <div className="text-md font-bold text-[#6B6B6B]">
                            Rp 5.000
                          </div>
                          <div className="text-[12px] font-semibold text-[#6B6B6B]">
                            Minimal Belanja 20.000
                          </div>
                        </div>
                        <button
                          onClick={() => handleButtonClick(6)}
                          className={`${
                            selectedButton === 6
                              ? 'bg-gradient-to-r from-[#83E69B] to-[#00BAE1]'
                              : 'bg-gradient-to-r from-[#eaeaea] to-[#cacaca]'
                          } text-white text-[12px] font-semibold px-3 py-1.5 rounded shadow w-24`}
                        >
                          Pilih
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-[#d2d2d2]">
                        <div>
                          <div className="text-[12px] font-semibold text-[#1B1E28]">
                            Cashback hingga
                          </div>
                          <div className="text-md font-bold text-[#6B6B6B]">
                            Rp 35.000
                          </div>
                          <div className="text-[12px] font-semibold text-[#6B6B6B]">
                            Minimal Belanja 200.000
                          </div>
                        </div>
                        <button
                          onClick={() => handleButtonClick(7)}
                          className={`${
                            selectedButton === 7
                              ? 'bg-gradient-to-r from-[#83E69B] to-[#00BAE1]'
                              : 'bg-gradient-to-r from-[#eaeaea] to-[#cacaca]'
                          } text-white text-[12px] font-semibold px-3 py-1.5 rounded shadow w-24`}
                        >
                          Pilih
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-[#d2d2d2]">
                        <div>
                          <div className="text-[12px] font-semibold text-[#1B1E28]">
                            Cashback hingga
                          </div>
                          <div className="text-md font-bold text-[#6B6B6B]">
                            Rp 25.000
                          </div>
                          <div className="text-[12px] font-semibold text-[#6B6B6B]">
                            Minimal Belanja 120.000
                          </div>
                        </div>
                        <button
                          onClick={() => handleButtonClick(8)}
                          className={`${
                            selectedButton === 8
                              ? 'bg-gradient-to-r from-[#83E69B] to-[#00BAE1]'
                              : 'bg-gradient-to-r from-[#eaeaea] to-[#cacaca]'
                          } text-white text-[12px] font-semibold px-3 py-1.5 rounded shadow w-24`}
                        >
                          Pilih
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-[#d2d2d2]">
                        <div>
                          <div className="text-[12px] font-semibold text-[#1B1E28]">
                            Cashback hingga
                          </div>
                          <div className="text-md font-bold text-[#6B6B6B]">
                            Rp 15.000
                          </div>
                          <div className="text-[12px] font-semibold text-[#6B6B6B]">
                            Minimal Belanja 50.000
                          </div>
                        </div>
                        <button
                          onClick={() => handleButtonClick(9)}
                          className={`${
                            selectedButton === 9
                              ? 'bg-gradient-to-r from-[#83E69B] to-[#00BAE1]'
                              : 'bg-gradient-to-r from-[#eaeaea] to-[#cacaca]'
                          } text-white text-[12px] font-semibold px-3 py-1.5 rounded shadow w-24`}
                        >
                          Pilih
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )
            } else {
              return <></>
            }
          })()}
        </div>

        {/* Pengaturan Detail */}
        <div className="mt-4">
          <button
            className="w-full text-left py-4 px-4 text-black flex justify-between border-2 border-gray-300 bg-white "
            onClick={openKuotaModal}
          >
            Kuota Pemakaian
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.1724 12.0003L8.22266 7.05055L9.63687 5.63635L16.0009 12.0003L9.63687 18.3643L8.22266 16.95L13.1724 12.0003Z"
                fill="black"
              />
            </svg>
          </button>
          <button
            className="w-full text-left py-4 px-4 text-black flex justify-between border-2 border-gray-300 bg-white "
            onClick={openMaxKlaim}
          >
            Jumlah Maks Diklaim
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.1724 12.0003L8.22266 7.05055L9.63687 5.63635L16.0009 12.0003L9.63687 18.3643L8.22266 16.95L13.1724 12.0003Z"
                fill="black"
              />
            </svg>
          </button>
          <button
            className="w-full text-left py-4 px-4 text-black flex justify-between border-2 border-gray-300 bg-white "
            onClick={openWaktuMulai}
          >
            Waktu Mulai
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.1724 12.0003L8.22266 7.05055L9.63687 5.63635L16.0009 12.0003L9.63687 18.3643L8.22266 16.95L13.1724 12.0003Z"
                fill="black"
              />
            </svg>
          </button>
          <button
            className="w-full text-left py-4 px-4 text-black flex justify-between border-2 border-gray-300 bg-white "
            onClick={openWaktuBerakhir}
          >
            Waktu Berakhir
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.1724 12.0003L8.22266 7.05055L9.63687 5.63635L16.0009 12.0003L9.63687 18.3643L8.22266 16.95L13.1724 12.0003Z"
                fill="black"
              />
            </svg>
          </button>
        </div>

        {/* Bantuan */}
        {/* Box pertama */}
        <div className="mt-4 rounded-lg border-gray-300 bg-gray-100 shadow-md">
          <h2 className="text-left text-gray-700 font-bold py-3 px-4 border-b-2 border-gray-300">
            Butuh Bantuan?
          </h2>
          <div className="text-center p-3">
            <button
              className="w-full text-left py-2 px-2 text-gray-600 flex justify-between "
              onClick={handleContinue}
            >
              <div className="flex justify-between space-x-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0013 18.3337C5.39893 18.3337 1.66797 14.6027 1.66797 10.0003C1.66797 5.39795 5.39893 1.66699 10.0013 1.66699C14.6036 1.66699 18.3346 5.39795 18.3346 10.0003C18.3346 14.6027 14.6036 18.3337 10.0013 18.3337ZM9.16797 12.5003V14.167H10.8346V12.5003H9.16797ZM10.8346 11.1296C12.0394 10.771 12.918 9.65491 12.918 8.33366C12.918 6.72283 11.6121 5.41699 10.0013 5.41699C8.5863 5.41699 7.40661 6.42465 7.14073 7.76154L8.7753 8.08847C8.8893 7.51552 9.39489 7.08366 10.0013 7.08366C10.6916 7.08366 11.2513 7.6433 11.2513 8.33366C11.2513 9.02399 10.6916 9.58366 10.0013 9.58366C9.54105 9.58366 9.16797 9.95674 9.16797 10.417V11.667H10.8346V11.1296Z"
                    fill="black"
                  />
                </svg>
                <span className=" text-black">Pusat Bantuan</span>
              </div>

              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.1724 12.0003L8.22266 7.05055L9.63687 5.63635L16.0009 12.0003L9.63687 18.3643L8.22266 16.95L13.1724 12.0003Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="absolute bottom-0 left-0 w-full border-t-4 p-6 flex justify-between space-x-[10px]">
          <button
            className="flex-1 bg-white border border-[#51D7B1] text-[#51D7B1] font-semibold py-2 rounded-md"
            onClick={() => router.push('tambah-voucher/lihat-voucher')} // Arahkan ke halaman berikutnya
          >
            Lihat
          </button>
          <button
            className="flex-[100px] bg-[#51D7B1] text-white font-semibold py-2 rounded-md"
            onClick={() => {
              console.log("Data Sudah Tersimpan")
              router.push('tambah-voucher/lihat-voucher/voucher')
            }}
          >
            Simpan
          </button>
        </div>

        {/* Konten Popup */}
        {isKuotaModalOpen && (
          <div
            className="fixed inset-0 z-50 flex justify-center items-end"
            onClick={closeKuotaModal}
          >
            <div
              className="bg-white p-4 h-[300px] rounded-t-[24px] w-full max-w-md shadow-lg z-30 animate-slide-up font-nunito relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Popup */}
              <div className="flex justify-between items-center px-4 py-2 mb-4">
                <h3 className="text-[16px] font-bold">Kuota Pemakaian</h3>
                <button className="text-gray-500" onClick={closeKuotaModal}>
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

              {/* Konten Slider */}
              <div className="px-4 relative">
                <span className="font-semibold text-gray-500 text-[15px]">
                  Atur kuota pemakaian voucher Anda
                </span>

                {/* Menampilkan nilai kuota yang mengikuti posisi slider */}
                <div
                  className="absolute mt-6 font-bold text-lg text-gray-700"
                  style={{
                    left: `calc(${kuota}% - 1px)`, // Posisi nilai kuota berdasarkan slider
                    top: '-1px', // Menyesuaikan jarak nilai kuota dari slider
                  }}
                >
                  {kuota}
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={kuota}
                  onChange={(e) => setKuota(Number(e.target.value))}
                  className="w-full mt-8"
                />

                {/* Label batas slider */}
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>0</span>
                  <span>100</span>
                </div>
              </div>

              <div className="mt-4">
                <button
                  className="px-4 text-[#0F0F0F] font-nunito text-[16px] font-bold mt-4 w-full py-3 text-white rounded-lg"
                  style={{
                    background: 'var(--Warna-Utama, #51D7B1)',
                    borderRadius: '8px',
                  }}
                  onClick={handleConfirm}
                >
                  Konfirmasi
                </button>
              </div>
            </div>
          </div>
        )}
        {isMaxKlaimOpen && (
          <div
            className="fixed inset-0 z-50 flex justify-center items-end"
            onClick={closeMaxKlaim}
          >
            <div
              className="bg-white p-4 h-[300px] rounded-t-[24px] w-full max-w-md shadow-lg z-30 animate-slide-up font-nunito relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Popup */}
              <div className="flex justify-between items-center px-4 py-2 mb-4">
                <h3 className="text-[16px] font-bold">Jumlah Maks Klaim</h3>
                <button className="text-gray-500" onClick={closeMaxKlaim}>
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

              {/* Konten Slider */}
              <div className="px-4 relative">
                <span className="font-semibold text-gray-500 text-[15px]">
                  Atur maksimal klaim voucher Anda
                </span>

                {/* Menampilkan nilai kuota yang mengikuti posisi slider */}
                <div
                  className="absolute mt-6 font-bold text-lg text-gray-700"
                  style={{
                    left: `calc(${klaim}% - 1px)`, // Posisi nilai kuota berdasarkan slider
                    top: '-1px', // Menyesuaikan jarak nilai kuota dari slider
                  }}
                >
                  {klaim}
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={klaim}
                  onChange={(e) => setKLaim(Number(e.target.value))}
                  className="w-full mt-8"
                />

                {/* Label batas slider */}
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>0</span>
                  <span>100</span>
                </div>
              </div>

              <div className="mt-4">
                <button
                  className="px-4 text-[#0F0F0F] font-nunito text-[16px] font-bold mt-4 w-full py-3 text-white rounded-lg"
                  style={{
                    background: 'var(--Warna-Utama, #51D7B1)',
                    borderRadius: '8px',
                  }}
                  onClick={handleMaxKlaim}
                >
                  Konfirmasi
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Modal Waktu Mulai */}
        {isWaktuMulaiOpen && (
          <div
            className="fixed inset-0 z-50 flex justify-center items-end"
            onClick={closeWaktuMulai}
          >
            <div
              className="bg-white p-4 h-[300px] rounded-t-[24px] w-full max-w-md shadow-lg z-30 animate-slide-up font-nunito relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Popup */}
              <div className="flex justify-between items-center px-4 py-2 mb-4">
                <h3 className="text-[16px] font-bold">Waktu Mulai</h3>
                <button className="text-gray-500" onClick={closeWaktuMulai}>
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

              {/* Konten Waktu Mulai dengan Kalender */}
              <div className="px-4">
                <label className="font-semibold text-gray-500 text-[15px] mb-2 block">
                  Pilih waktu mulai:
                </label>
                <DatePicker
                  selected={waktuMulai}
                  onChange={(date: Date | null) => setWaktuMulai(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
              </div>

              <div className="mt-4">
                <button
                  className="px-4 text-[#0F0F0F] font-nunito text-[16px] font-bold mt-4 w-full py-3 text-white rounded-lg"
                  style={{
                    background: 'var(--Warna-Utama, #51D7B1)',
                    borderRadius: '8px',
                  }}
                  onClick={handleConfirmWaktuMulai}
                >
                  Konfirmasi
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Waktu Berakhir */}
        {isWaktuBerakhirOpen && (
          <div
            className="fixed inset-0 z-50 flex justify-center items-end"
            onClick={closeWaktuBerakhir}
          >
            <div
              className="bg-white p-4 h-[300px] rounded-t-[24px] w-full max-w-md shadow-lg z-30 animate-slide-up font-nunito relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Popup */}
              <div className="flex justify-between items-center px-4 py-2 mb-4">
                <h3 className="text-[16px] font-bold">Waktu Berakhir</h3>
                <button className="text-gray-500" onClick={closeWaktuBerakhir}>
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

              {/* Konten Waktu Berakhir dengan Kalender */}
              <div className="px-4">
                <label className="font-semibold text-gray-500 text-[15px] mb-2 block">
                  Pilih waktu berakhir:
                </label>
                <DatePicker
                  selected={waktuBerakhir}
                  onChange={(date: Date | null) => setWaktuBerakhir(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
              </div>

              <div className="mt-4">
                <button
                  className="px-4 text-[#0F0F0F] font-nunito text-[16px] font-bold mt-4 w-full py-3 text-white rounded-lg"
                  style={{
                    background: 'var(--Warna-Utama, #51D7B1)',
                    borderRadius: '8px',
                  }}
                  onClick={handleConfirmWaktuBerakhir}
                >
                  Konfirmasi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutUtama>
  )
}

export default TambahProduk
