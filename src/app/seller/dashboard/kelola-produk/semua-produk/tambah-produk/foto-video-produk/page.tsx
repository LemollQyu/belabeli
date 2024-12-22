'use client'
import React, { useRef, useState } from 'react'
import Header from '@/app/layouts/header'
import LayoutUtama from '@/app/layouts/layout-utama'
import { useRouter } from 'next/navigation'

const FotoAtauVideoPage: React.FC = () => {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showUploadSection, setShowUploadSection] = useState(false) // Mengatur apakah tampilan berubah
  const [productPhotoFile, setProductPhotoFile] = useState<File | null>(null)
  const productPhotoInputRef = useRef<HTMLInputElement | null>(null)
  const [limitUpload, setLimitUpload] = useState<number>(5)

  // Fungsi untuk menangani perubahan file
  const handleProductPhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      setProductPhotoFile(file)
    }
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleIconClick = () => {
    setShowUploadSection(true)
  }

  const handleButtonClick = () => {
    setLimitUpload((prev) => (prev > 0 ? prev - 1 : prev))
  }

  return (
    <LayoutUtama>
      <Header title="Informasi Produk" children={undefined} />
      <div className="container mx-auto px-4 pt-24 pb-8 font-nunito">
        {/* Header Informasi */}
        <div className="bg-green-100 text-green-600 text-xs p-3 rounded-md mb-6 flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.00065 1.16683C10.2223 1.16683 12.834 3.77853 12.834 7.00016C12.834 10.2218 10.2223 12.8335 7.00065 12.8335C3.77902 12.8335 1.16732 10.2218 1.16732 7.00016C1.16732 3.77853 3.77902 1.16683 7.00065 1.16683ZM7.58399 5.25016L7.58399 4.0835L6.41732 4.0835L6.41732 5.25016L7.58399 5.25016ZM7.58398 9.91683L7.58398 6.41683L6.41732 6.41683L6.41732 9.91683L7.58398 9.91683Z"
              fill="#1C785E"
            />
          </svg>
          Foto Yang Pertama Kali Di Upload Akan Menjadi Thumbnail Slider
          Foto/Video di Detail Produk
        </div>
        {/* Area Thumbnail Foto */}
        <div className="border-2 border-gray-300 bg-white rounded-lg shadow-md p-3">
          {/* Header Bagian Foto Thumbnail */}
          <h2 className="text-md border-b-2 border-gray-300 p-2 font-semibold mb-4">
            Foto Thumbnail
          </h2>

          {/* Bagian Foto Preview */}
          <div className="rounded-lg p-2 flex justify-center items-center">
            <div className="h-[300px] w-full border border-gray-300 bg-gray-300 rounded-lg flex justify-center items-center overflow-hidden shadow-md">
              {/* Jika file sudah dipilih, tampilkan preview; jika belum, tampilkan ikon */}
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-2">
                  {/* Area untuk ikon upload foto */}
                  <div
                    className="cursor-pointer flex justify-center items-center"
                    onClick={triggerFileInput}
                  >
                    <span className="text-gray-500 text-4xl flex justify-center items-center">
                      <svg
                        width="80"
                        height="80"
                        viewBox="0 0 80 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M36.666 36.6665V23.3332H43.3327V36.6665H56.666V43.3332H43.3327V56.6665H36.666V43.3332H23.3327V36.6665H36.666ZM39.9994 73.3332C21.5898 73.3332 6.66602 58.4092 6.66602 39.9998C6.66602 21.5903 21.5898 6.6665 39.9994 6.6665C58.4087 6.6665 73.3327 21.5903 73.3327 39.9998C73.3327 58.4092 58.4087 73.3332 39.9994 73.3332ZM39.9994 66.6665C54.727 66.6665 66.666 54.7275 66.666 39.9998C66.666 25.2722 54.727 13.3332 39.9994 13.3332C25.2717 13.3332 13.3327 25.2722 13.3327 39.9998C13.3327 54.7275 25.2717 66.6665 39.9994 66.6665Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </div>

                  {/* Input file yang tersembunyi */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  {/* Jika foto dipilih, tampilkan sebagai preview */}
                  {selectedFile && (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        className="h-[200px] w-[200px] object-cover rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Tombol Ganti Foto */}
          <div className="mt-4 border-t-2 border-gray-300" />

          <div className=" flex justify-end py-2">
            <button
              className="w-[150px] text-xs bg-[#51d7b1] text-white py-2 rounded-lg"
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              Ganti Foto
            </button>
          </div>

          {/* Input File (disembunyikan tetapi aktif) */}
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {(() => {
          const items = []
          for (let index = 0; index < 5 - limitUpload; index++) {
            items.push(
              // Bagian Upload Foto dan Preview
              <div
                key={index}
                className="mt-6 border-2 border-gray-300 rounded-lg shadow-md p-3"
              >
                {/* Header Bagian Foto Produk */}
                <h2 className="text-md border-b-2 border-gray-300 p-2 font-semibold mb-4">
                  Foto Produk
                </h2>

                {/* Bagian Foto Preview */}
                <div className="rounded-lg p-2 flex justify-center items-center">
                  <div className="h-[300px] w-full border border-gray-300 bg-gray-300 rounded-lg flex justify-center items-center overflow-hidden shadow-md">
                    {productPhotoFile ? (
                      <img
                        src={URL.createObjectURL(productPhotoFile)}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-2">
                        {/* Ikon Upload Foto */}
                        <div
                          className="cursor-pointer flex justify-center items-center"
                          onClick={() => productPhotoInputRef.current?.click()}
                        >
                          <span className="text-gray-500 text-4xl flex justify-center items-center">
                            <svg
                              width="80"
                              height="80"
                              viewBox="0 0 80 80"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M36.666 36.6665V23.3332H43.3327V36.6665H56.666V43.3332H43.3327V56.6665H36.666V43.3332H23.3327V36.6665H36.666ZM39.9994 73.3332C21.5898 73.3332 6.66602 58.4092 6.66602 39.9998C6.66602 21.5903 21.5898 6.6665 39.9994 6.6665C58.4087 6.6665 73.3327 21.5903 73.3327 39.9998C73.3327 58.4092 58.4087 73.3332 39.9994 73.3332ZM39.9994 66.6665C54.727 66.6665 66.666 54.7275 66.666 39.9998C66.666 25.2722 54.727 13.3332 39.9994 13.3332C25.2717 13.3332 13.3327 25.2722 13.3327 39.9998C13.3327 54.7275 25.2717 66.6665 39.9994 66.6665Z"
                                fill="white"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tombol Ganti Foto */}
                <div className="mt-4 border-t-2 border-gray-300" />
                <div className="flex justify-end py-2">
                  <button
                    className="w-[150px] text-xs bg-[#51d7b1] text-white py-2 rounded-lg"
                    onClick={() => productPhotoInputRef.current?.click()}
                  >
                    Ganti Foto
                  </button>
                </div>

                {/* Input File (disembunyikan tetapi aktif) */}
                <input
                  type="file"
                  ref={productPhotoInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleProductPhotoChange}
                />
              </div>,
            )
          }

          return items
        })()}

        {limitUpload !== 0 ? (
          <div
            className="mt-6 flex justify-center items-center border border-gray-300 bg-white rounded-lg p-6 cursor-pointer hover:bg-gray-100 hover:shadow-lg transition"
            onClick={handleButtonClick}
          >
            <span className="text-gray-500 text-4xl flex justify-center items-center">
              <svg
                width="34"
                height="35"
                viewBox="0 0 34 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.584 16.0835V7.5835H18.4173V16.0835H26.9173V18.9168H18.4173V27.4168H15.584V18.9168H7.08398V16.0835H15.584Z"
                  fill="#A9A9A9"
                />
              </svg>
            </span>
          </div>
        ) : (
          ''
        )}
        <button
          onClick={() =>
            router.push(
              '/seller/dashboard/kelola-produk/semua-produk/tambah-produk',
            )
          }
          className={`w-full max-w-[400px] mx-auto mt-6 py-3 text-white rounded-lg ${
            selectedFile && productPhotoFile
              ? 'bg-[#51d7b1] hover:bg-emerald-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!selectedFile || !productPhotoFile}
        >
          Simpan
        </button>
      </div>
    </LayoutUtama>
  )
}

export default FotoAtauVideoPage
