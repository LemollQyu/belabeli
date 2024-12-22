'use client'
import { useState } from 'react'
import Header from '@/app/layouts/header'
import LayoutUtama from '@/app/layouts/layout-utama'
import { useRouter } from 'next/navigation'
const ManajemenDiskon = () => {
  const router = useRouter()
  const [selectedBanner, setSelectedBanner] = useState<string | File | null>(
    null,
  )
  const [showBannerOptions, setShowBannerOptions] = useState(false)

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedBanner(file)
    }
    setIsBannerUploaded(true)
  }
  const [isBannerUploaded, setIsBannerUploaded] = useState(false)
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null)

  const handleDurationSelect = (durasi: string) => {
    setSelectedDuration(durasi)
  }

  const uploadedBanners = [
    { id: 1, url: '/image/banner.jpg', name: 'Banner 1' },
    { id: 2, url: '/image/toko/logo.jpg', name: 'Banner 2' },
    { id: 3, url: '/image/toko/toko.png', name: 'Banner 3' },
  ]

  const handleSelectExistingBanner = (banner: { id: number; url: string }) => {
    setSelectedBanner(banner.url) // Tetapkan URL string
    setIsBannerUploaded(true)
    setShowBannerOptions(false)
  }

  const getPrice = () => {
    switch (selectedDuration) {
      case '1 Minggu':
        return 100000
      case '2 Minggu':
        return 200000
      case '3 Minggu':
        return 300000
      case '4 Minggu':
        return 400000
      default:
        return 0
    }
  }

  const isButtonDisabled = !(isBannerUploaded && selectedDuration)
  const handleBeli = () => {
    router.push('/seller/dashboard/manajemen-iklan/banner/pembayaran')
  }
  return (
    <LayoutUtama>
      <Header title="Manajemen Iklan" children={undefined} />
      <div className="container mx-auto font-nunito pt-20 ">
        {/* Informasi Toko */}
        <div className="flex justify-between items-center w-full p-4">
          <div className="flex items-center gap-4">
            <img
              className="border w-[50px] h-[50px] rounded-md"
              src="/image/toko/logo.jpg"
              alt="Store Logo"
            />
            <div>
              <div className="flex items-center gap-2">
                <div className="px-2 py-0.5 bg-[#09cbca] rounded flex items-center">
                  <div className="text-white text-[10px] font-bold">SS</div>
                </div>
                <span className="text-[#1b1e28] text-sm font-bold">
                  Toko Annas
                </span>
              </div>
              <p className="text-[#949494] text-xs">
                Dibuat: 25 September 2024
              </p>
            </div>
          </div>
        </div>

        <div className="p-2 border-b-8 border-[#F1F1F1] w-full" />

        <div className="py-6 px-4">
          {/* Metode Banner */}
          <div className="p-6 w-full bg-neutral-100 rounded-lg shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold text-slate-800">
                Metode Banner
              </h3>
              <p className="text-lg font-bold text-black">
                Rp {getPrice().toLocaleString()}
              </p>{' '}
            </div>
            <div className="border-b border-neutral-300 mb-4"></div>

            {/* Konten */}
            <div className="flex gap-2">
              <div className="flex flex-col items-center gap-2">
                <span className="text-[14px] font-semibold text-black">
                  Unggah Banner
                </span>
                {/* <div className="w-24 h-24 border-2 border-dashed border-emerald-300 rounded-md flex items-center justify-center relative"> */}

                <div className="w-24 h-24 border-2 border border-emerald-300 rounded-md flex items-center justify-center relative">
                  {selectedBanner ? (
                    <img
                      src={
                        typeof selectedBanner === 'string'
                          ? selectedBanner
                          : URL.createObjectURL(selectedBanner)
                      }
                      alt="Banner"
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                        fill="#51D7B1"
                      />
                    </svg>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>

                <button
                  className="w-[160px] text-[11px] font-semibold text-emerald-500 border border-emerald-300 rounded-md p-2"
                  onClick={() => setShowBannerOptions(!showBannerOptions)}
                >
                  Tambahkan yang sudah ada
                </button>
              </div>

              {/* Deskripsi */}
              <p className="text-sm font-normal text-black leading-tight max-w-[220px]">
                Tingkatkan penjualan dengan menampilkan produk di banner
                homepage yang dilihat oleh semua pengunjung.
              </p>
            </div>

            {/* Durasi */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {['1 Minggu', '2 Minggu', '3 Minggu', '4 Minggu'].map(
                (durasi, index) => (
                  <button
                    key={index}
                    onClick={() => handleDurationSelect(durasi)}
                    className={`px-4 py-2 text-xs font-bold border rounded-md ${
                      selectedDuration === durasi
                        ? 'bg-emerald-300 text-white'
                        : 'border-emerald-300 text-stone-950'
                    }`}
                  >
                    {durasi}
                  </button>
                ),
              )}
            </div>

            {/* Dropdown Banner Options */}
            {showBannerOptions && (
              <div className="mt-4 bg-white border rounded-md shadow-md p-4">
                <h4 className="text-sm font-bold mb-2">Pilih Banner:</h4>
                <ul>
                  {uploadedBanners.map((banner) => (
                    <li
                      key={banner.id}
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                      onClick={() => handleSelectExistingBanner(banner)}
                    >
                      <img
                        src={banner.url}
                        alt={banner.name}
                        className="w-16 h-16 object-cover rounded-md mr-2 inline-block"
                      />
                      <span className="text-sm">{banner.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Footer */}
            <div className="border-t border-neutral-300 pt-4 mt-4">
              <div className="flex justify-between text-xs text-neutral-600 ">
                <div>
                  <p className="font-bold">Tanggal Order</p>
                  <p>2 Oktober 2024</p>
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
                <div className="text-right">
                  <p className="font-bold">Tanggal Pengajuan</p>
                  <p>3 Oktober 2024</p>
                </div>
              </div>
              {/* "Beli" Button */}
              <div className="mt-4 flex justify-end">
                <button
                  disabled={isButtonDisabled}
                  className={`px-6 py-2 text-xs font-bold rounded-md ${
                    isButtonDisabled
                      ? 'text-emerald-400 border border-emerald-400 bg-white'
                      : 'bg-[#51D7B1] text-white'
                  }`}
                  onClick={handleBeli}
                >
                  Beli
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutUtama>
  )
}

export default ManajemenDiskon
