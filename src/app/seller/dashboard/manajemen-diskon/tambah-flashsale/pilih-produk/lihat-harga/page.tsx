'use client'
import React from 'react'
import LayoutUtama from '@/app/layouts/layout-utama'
import Header from '@/app/layouts/header'
import ProductFlashsale from '@/app/components/seller/flashsale'
import { useRouter } from 'next/navigation'

const DetailHargaPage = () => {
  const router = useRouter()

  return (
    <LayoutUtama>
      {/* Header */}
      <Header title="Detail Harga" children={undefined} />

      {/* Konten Utama */}
      <div className="container mx-auto font-nunito pt-20 space-y-6">
        <div className="border-b-8 justify-center items-center flex flex-col p-8 ">
          {/* Kartu Produk */}
          <ProductFlashsale
            imageUrl="/sepatu.jpg"
            productName="Machine 56 Jacket"
            price="Rp 100.000"
            sold={50}
            stock={100}
          />
        </div>
        {/* Waktu Mulai */}
        <div className="flex items-center justify-between px-4">
          <label className="text-gray-600 font-semibold">Waktu Mulai</label>
          <input
            type="text"
            value="24 September 2024"
            className="w-[180px] border border-gray-300 rounded-md p-2 text-center"
            readOnly
          />
        </div>

        {/* Waktu Berakhir */}
        <div className="flex items-center justify-between px-4">
          <label className="text-gray-600 font-semibold">Waktu Berakhir</label>
          <input
            type="text"
            value="24 Oktober 2024"
            className="w-[180px] border border-gray-300 rounded-md p-2 text-center"
            readOnly
          />
        </div>

        {/* Diskon */}
        <div className="relative flex items-center justify-between px-4 py-2">
          <label className="text-gray-600 font-semibold">
            Diskon Akan Menjadi
          </label>

          {/* Label Diskon */}
          <div className="absolute right-16 bg-[#EE443F] text-white text-xs px-8 py-2 rounded-[8px] font-semibold">
            50%
          </div>
        </div>

        {/* Tombol */}
        <div className="absolute bottom-0 left-0 w-full border-t-4 p-4 px-6 space-y-4">
          <div className="flex justify-between space-x-[10px]">
            <button
              className="flex-1 bg-white border border-[#51D7B1] text-[#51D7B1] font-semibold py-2 rounded-md"
              onClick={() => router.back()} // Kembali ke halaman sebelumnya
            >
              Kembali
            </button>
            <button
              className="flex-[100px] bg-[#51D7B1] text-white font-semibold py-2 rounded-md"
              onClick={() => {
                console.log('Data Berhasil Disimpan')
                router.push('lihat-harga/flashsale')}} // Arahkan ke halaman berikutnya
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </LayoutUtama>
  )
}

export default DetailHargaPage
