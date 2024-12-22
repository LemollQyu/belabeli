'use client'
import React from 'react'
import LayoutUtama from '@/app/layouts/layout-utama'
import Header from '@/app/layouts/header'
import ProductCard from '@/app/components/seller/product-card'
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
          <ProductCard
            nameProduct="Laptop Gaming HP Victus Ryzen 5 16GB"
            linkImage="https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/107/MTA-138956534/hp_hp_victus_laptop_15_fb0009ax_ryzen_5_5600h_16gb_512gb_rtx_3050_144hz_full07_gh8cdrus.jpg"
            priceAsli="15.000.000"
            discountPrice="13.500.000"
            star="4.8"
            terjual="120"
            lokasi="Yogyakarta, Indonesia"
            linkHref="/product/laptop-gaming-ghi"
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
                console.log('Data Berhasil Tersimpan')
                router.push('lihat-harga/harga')
              }} // Arahkan ke halaman berikutnya
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
