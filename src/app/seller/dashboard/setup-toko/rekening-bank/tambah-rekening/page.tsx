'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import LayoutUtama from '@/app/layouts/layout-utama'
import Header from '@/app/layouts/header'
import Popup from '@/app/components/seller/popup-sk'

interface RekeningDropdownProps {
  onBankSelect: (bank: string) => void
}

const RekeningDropdown: React.FC<RekeningDropdownProps> = ({
  onBankSelect,
}) => {
  const [isBankTransferOpen, setIsBankTransferOpen] = useState<boolean>(false)
  const [selectedBank, setSelectedBank] = useState<string>('')

  const handleToggleDropdown = () => {
    setIsBankTransferOpen(!isBankTransferOpen)
  }

  const handleBankSelect = (bank: string) => {
    setSelectedBank(bank)
    onBankSelect(bank)
  }

  return (
    <div className="mb-4">
      <button
        className="relative flex items-center py-4 px-4 w-full bg-white border border-[#D3D3D3] rounded-lg"
        onClick={handleToggleDropdown}
      >
        <span className="py-4 absolute inset-0 flex items-center justify-center font-nunito font-bold text-[15px] text-black">
          Rekening Bank
        </span>
        <svg
          className={`w-4 h-4 transition-transform ml-auto text-black ${
            isBankTransferOpen ? 'rotate-180' : 'rotate-0'
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
          {['BCA', 'Mandiri', 'BNI', 'BRI'].map((bank) => (
            <div
              key={bank}
              className="flex justify-between items-center py-2 px-2 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <img
                  src={`/${bank.toLowerCase()}.jpg`}
                  alt={`${bank} Logo`}
                  className="mr-2"
                  style={{ width: '36.7px', height: '12px' }}
                />
                <span className="font-nunito text-[13px]">
                  {bank} Bank Account
                </span>
              </div>
              <input
                type="radio"
                name="bank"
                value={`${bank} Bank Account`}
                checked={selectedBank === `${bank} Bank Account`}
                onChange={() => handleBankSelect(`${bank} Bank Account`)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const TambahRekeningComponent: React.FC = () => {
  const router = useRouter()
  const [showSyaratDiscount, setShowSyarat] = useState(false)
  const syaratRef = useRef<HTMLDivElement>(null)

  const [rekeningList, setRekeningList] = useState<string[]>([])
  const [namaPemilik, setNamaPemilik] = useState<string>('')
  const [nomorRekening, setNomorRekening] = useState<string>('')
  const [selectedBank, setSelectedBank] = useState<string>('')
  const [isPopupVisible, setIsPopupVisible] = useState(false) // State untuk pop-up
  const [showTermsPopup, setShowTermsPopup] = useState(false)
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false)

  useEffect(() => {
    const storedRekeningList = localStorage.getItem('rekeningList')
    if (storedRekeningList) {
      setRekeningList(JSON.parse(storedRekeningList))
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        syaratRef.current &&
        !syaratRef.current.contains(event.target as Node)
      ) {
        setShowSyarat(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newRekening = `${selectedBank}: ${nomorRekening} (${namaPemilik})`
    const updatedRekeningList = [...rekeningList, newRekening]
    localStorage.setItem('rekeningList', JSON.stringify(updatedRekeningList))
    setRekeningList(updatedRekeningList)
    setNamaPemilik('')
    setNomorRekening('')
    setSelectedBank('')
  }

  const handleCloseSyarat = () => {
    setShowSyarat(false)
  }

  const showPopup = () => {
    setIsPopupVisible(true)
  }

  // Fungsi untuk menutup pop-up
  const closePopup = () => {
    setIsPopupVisible(false)
  }

  // Fungsi untuk menangani tombol "Lanjutkan" pada pop-up
  const handleContinue = () => {
    router.push('/seller/dashboard/setup-toko/rekening-bank') // Arahkan ke halaman rekening bank
    setIsPopupVisible(false)
  }

  // Fungsi untuk menangani tombol "Batal" pada pop-up
  const handleCancel = () => {
    setIsPopupVisible(false)
  }

  const termsContent = (
    <ul>
      <li>
        <strong>1. Persetujuan Pengguna:</strong> Dengan menambahkan rekening
        bank, Anda menyetujui...
      </li>
      <li>
        <strong>2. Persyaratan Penambahan Rekening:</strong> Anda harus
        memberikan informasi yang benar...
      </li>
      <li>
        <strong>3. Penggunaan Rekening untuk Transaksi:</strong> Rekening yang
        ditambahkan akan digunakan...
      </li>
      <li>
        <strong>4. Keamanan Rekening:</strong> Kami berkomitmen untuk menjaga
        kerahasiaan informasi...
      </li>
      <li>
        <strong>5. Pembatasan Tanggung Jawab:</strong> Kami tidak bertanggung
        jawab atas kerugian...
      </li>
      <li>
        <strong>6. Perubahan Syarat & Ketentuan:</strong> Kami berhak untuk
        mengubah atau memperbarui...
      </li>
    </ul>
  )

  const privacyContent = (
    <ul>
      <li>
        <strong>1. Informasi Pribadi:</strong> Kami mengumpulkan informasi
        pribadi yang Anda berikan...
      </li>
      <li>
        <strong>2. Penggunaan Informasi:</strong> Informasi pribadi yang Anda
        berikan akan digunakan...
      </li>
      <li>
        <strong>3. Perlindungan Data:</strong> Kami melindungi informasi pribadi
        Anda dari akses yang...
      </li>
      <li>
        <strong>4. Perubahan Kebijakan:</strong> Kami berhak untuk memperbarui
        kebijakan privasi kapan saja...
      </li>
    </ul>
  )

  return (
    <>
      <LayoutUtama>
        <Header title="Rekening" children={undefined} />
        <div className="w-full max-w-[400px] mx-auto py-6 font-nunito px-4 flex flex-col h-screen justify-between">
          <div>
            <h1 className="mt-6 pb-4 text-[16px] text-center font-nunito font-semibold">
              Pilih Rekening Bank
            </h1>
            <RekeningDropdown onBankSelect={setSelectedBank} />

            <form
              onSubmit={handleSubmit}
              className="text-[#949494] font-nunito text-[15px] font-semibold space-y-4"
            >
              <div className="relative">
                <input
                  type="text"
                  id="namaPemilik"
                  placeholder=" "
                  value={namaPemilik}
                  onChange={(e) => setNamaPemilik(e.target.value)}
                  className="peer w-full px-4 py-3 bg-[#F1F1F1] rounded-lg border-gray-300 text-gray-900 focus:outline-none focus:border-emerald-500"
                />
                <label
                  htmlFor="namaPemilik"
                  className="absolute left-4 top-2 transform -translate-y-1/2 text-sm text-grey-500 transition-all duration-200
                peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-500
                peer-focus:top-2 peer-focus:text-sm peer-focus:text-grey-500"
                >
                  Nama Pemilik
                </label>
              </div>
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
            </form>
          </div>

          {/* Agreement Text and Upload Button at the Bottom */}
        <div className="text-center mb-4">
          <p className="text-gray-500 text-[12px] mb-6">
            Dengan klik tombol di bawah, anda menyetujui{' '}
            <span
              className="text-[#51D7B1] cursor-pointer"
              onClick={() => setShowTermsPopup(true)}
            >
              Syarat & Ketentuan
            </span>{' '}
            serta{' '}
            <span
              className="text-[#51D7B1] cursor-pointer"
              onClick={() => setShowPrivacyPopup(true)}
            >
              Pemberitahuan Privasi
            </span>{' '}
            untuk menambahkan rekening.
          </p>
          <div className="flex justify-center">
          <button
              type="button" // Menggunakan type="button" agar tidak submit form
              onClick={showPopup} // Menggunakan onClick, bukan onSubmit
              className={`text-[14px] w-full py-3 text-white rounded-lg ${
                namaPemilik && nomorRekening && selectedBank
                  ? 'bg-[#51D7B1]'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!namaPemilik || !nomorRekening || !selectedBank}
            >
              Tambah Rekening Bank
            </button>
      </div>

      {/* Pop-up */}
      {isPopupVisible && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-end"
          onClick={closePopup}
        >
          <div
            className="bg-white w-full max-w-md h-[330px] p-6 rounded-t-[24px] shadow-lg transform transition-transform duration-300 ease-out translate-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center flex flex-col items-center">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M60 110C32.3857 110 10 87.614 10 60C10 32.3857 32.3857 10 60 10C87.614 10 110 32.3857 110 60C110 87.614 87.614 110 60 110ZM55.013 80L90.3685 44.6447L83.2975 37.5736L55.013 65.858L40.871 51.7155L33.8 58.787L55.013 80Z"
                  fill="url(#paint0_linear_6848_29156)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_6848_29156"
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

              <h2 className="mt-2 text-[22px] font-nunitoBold text-black">
                Tersimpan
              </h2>
              <p className="mt-2 text-[14px] text-gray-700 px-16">
                Rekening anda tersimpan sebagai rekening pembayaran
              </p>
            </div>

            <div className="flex justify-center space-x-6">
              <button
                onClick={handleContinue}
                className="w-full mt-6 bg-[#51D7B1] text-white p-3 rounded-lg"
              >
                Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}

          {/* Popups */}
          {showTermsPopup && (
            <Popup
              title="Syarat & Ketentuan"
              content={termsContent}
              onClose={() => setShowTermsPopup(false)}
            />
          )}
          {showPrivacyPopup && (
            <Popup
              title="Pemberitahuan Privasi"
              content={privacyContent}
              onClose={() => setShowPrivacyPopup(false)}
            />
          )}
        </div>
        </div>
      </LayoutUtama>
     </>
  )
}

export default TambahRekeningComponent
