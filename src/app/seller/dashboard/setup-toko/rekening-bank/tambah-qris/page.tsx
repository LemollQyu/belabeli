'use client'

import { useState } from 'react'
import Popup from '@/app/components/seller/popup-sk' // Pastikan pathnya sesuai dengan struktur folder Anda
import LayoutUtama from '@/app/layouts/layout-utama'
import Header from '@/app/layouts/header'
import { useRouter } from 'next/navigation'

const UploadQRIS = () => {
    const router = useRouter()
    const [namaQRIS, setNamaQRIS] = useState('')
    const [qrisImage, setQrisImage] = useState<string | null>(null)
    const [savedData, setSavedData] = useState<{ namaQRIS: string; qrisImage: string | null } | null>(null)
  
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        setQrisImage(URL.createObjectURL(file))
      }
    }
  
    const handleSave = () => {
      setSavedData({
        namaQRIS,
        qrisImage,
      })
      showPopup() // Tampilkan popup setelah data disimpan
    }

  const [showTermsPopup, setShowTermsPopup] = useState(false)
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false)

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Fungsi untuk menampilkan dan menutup popup
  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const handleContinue = () => {
    // Fungsi untuk tindakan lanjutan setelah tombol 'Lanjutkan' ditekan
    closePopup();
    router.push('/seller/dashboard/setup-toko/rekening-bank')  };
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
    <LayoutUtama>
      <Header title="Rekening" children={undefined} />
      <div className="container w-[400px] mx-auto p-4 pt-20 font-nunito h-screen flex flex-col justify-between">
        <div className="px-2">
          <h2 className="text-center font-semibold text-[16px] mb-6">
            Upload QRIS Anda
          </h2>

          {/* Upload Button */}
          <div className="flex flex-col items-center mb-6">
            <label className="border border-[#51D7B1] text-[#51D7B1] w-full rounded-md py-3 text-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              Upload QRIS
            </label>
          </div>

          {/* QRIS Preview */}
          {qrisImage && (
            <div className="flex justify-center mb-6">
              <img
                src={qrisImage}
                alt="QRIS Preview"
                className="w-[200px] h-[200px] object-cover rounded-md"
              />
            </div>
          )}

          {/* Nama QRIS Input */}
          <div className="mb-6">
            <label htmlFor="namaQRIS" className="block text-sm font-semibold text-gray-700 mb-2">
              Nama QRIS
            </label>
            <input
              type="text"
              id="namaQRIS"
              value={namaQRIS}
              onChange={(e) => setNamaQRIS(e.target.value)}
              placeholder="Masukkan Nama QRIS"
              className="border border-gray-300 w-full py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-[#51D7B1]"
            />
          </div>
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
          <button className="bg-[#51D7B1] text-white w-full py-3 rounded-md font-bold" onClick={handleSave}>
          Upload
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
                QRIS anda tersimpan sebagai rekening pembayaran
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
  )
}

export default UploadQRIS
