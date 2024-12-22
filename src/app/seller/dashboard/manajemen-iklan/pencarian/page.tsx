'use client'
import { useEffect, useState } from 'react'
import Header from '@/app/layouts/header'
import LayoutUtama from '@/app/layouts/layout-utama'
import { useRouter } from 'next/navigation'
const ManajemenIklan = () => {
  const router = useRouter()
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null)
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  )
  const handleDurationSelect = (durasi: string) => {
    setSelectedDuration(durasi)
  }

  const uploadedBanners = [
    { id: 1, url: '/image/banner.jpg', name: 'Banner 1' },
    { id: 2, url: '/image/toko/logo.jpg', name: 'Banner 2' },
    { id: 3, url: '/image/toko/toko.png', name: 'Banner 3' },
  ]

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
  const handleProduct = () => {
    router.push('pencarian/pilih-produk') // Arahkan ke halaman rekening bank
  }

  useEffect(() => {
    const storedProductId = localStorage.getItem('selectedProductId')
    if (storedProductId) {
      setSelectedProductId(Number(storedProductId))
    }
  }, [])

  const isButtonDisabled = !(selectedProductId && selectedDuration)

  const handleBeli = () => {
    router.push('/seller/dashboard/manajemen-iklan/pencarian/pembayaran')
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

        <div className="border-t border-neutral-300 pt-4 mt-4"></div>
        <div className="py-6 px-4">
          {/* Metode Banner */}
          <div className="p-6 w-full bg-neutral-100 rounded-lg shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold text-slate-800">
                Metode Pencarian
              </h3>
              <p className="text-lg font-bold text-black">
                Rp {getPrice().toLocaleString()}
              </p>{' '}
            </div>
            <div className="border-b border-neutral-300 mb-4"></div>

            <button
              className="w-full text-left text-[14px] text-black flex justify-between items-center"
              onClick={handleProduct}
            >
              {selectedProductId
                ? `Produk ID: ${selectedProductId}`
                : 'Pilih Produk'}
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

            {/* Durasi */}

            <div className="flex flex-col border-y-4 py-4 mt-4">
              <div className="w-full  text-sm text-black text-center">
                Produk akan dipromosikan secara efektif melalui pencarian dan
                rekomendasi, memperbesar peluang untuk ditemukan oleh lebih
                banyak pelanggan
              </div>
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
            </div>

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

export default ManajemenIklan
