'use client'

import Header from '@/app/layouts/header'
import LayoutUtama from '@/app/layouts/layout-utama'
import { useRouter } from 'next/navigation'

const ManajemenDiskon = () => {
  const router = useRouter()

  const handleIklanBanner = () => {
    router.push('/seller/dashboard/manajemen-iklan/banner')
  }

  const handleIklanPencarian = () => {
    router.push('/seller/dashboard/manajemen-iklan/pencarian')
  }

  return (
    <LayoutUtama>
      <Header title="Manajemen Diskon" children={undefined} />
      <div className="container mx-auto font-nunito pt-20">
        {/* Informasi Toko */}
        <div className="flex justify-between items-start w-full p-4">
          <div className="flex items-center gap-2.5 h-[60px]">
          <img
              className="w-[50px] h-[50px] rounded-md"
              src="/image/toko/logo.jpg"
              alt="Store Logo"
            />
            <div className="flex flex-col gap-1 w-[169px]">
              <div className="flex items-center gap-2.5">
                <div className="px-2 py-0.5 bg-[#09cbca] rounded flex items-center">
                  <div className="text-white text-[10px] font-bold">SS</div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="text-[#1b1e28] text-[14px] font-bold">
                    Toko Annas
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-[5px] text-[#949494] text-[12px] font-light">
                <span>Dibuat 24September 2024</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto p-1 border-b-8 border-[#D7D7D7] w-full"></div>

        {/* Pilihan Metode Promosi */}
        <div className="mt-6 px-4">
          <h3 className="text-center text-black text-[16px] font-semibold mb-4">
            Pilih Metode Promosi
          </h3>
          <div className="space-y-3">
            <button
              className="w-full bg-[#51D7B1] text-white font-bold py-4 text-[14px] rounded-md shadow-md hover:bg-emerald-600 transition"
              onClick={handleIklanBanner}
            >
              Banner
            </button>
            <button
              className="w-full bg-[#51D7B1] text-white font-bold py-4 text-[14px] rounded-md shadow-md hover:bg-emerald-600 transition"
              onClick={handleIklanPencarian}
            >
              Rekomendasi dan Pencarian
            </button>
          </div>
        </div>
      </div>
    </LayoutUtama>
  )
}

export default ManajemenDiskon
