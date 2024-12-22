'use client'
import React from 'react'
import Header from '@/app/layouts/header'
import LayoutUtama from '@/app/layouts/layout-utama'

const ManajemenProduk = () => {
  return (
    <LayoutUtama>
      <Header title="Pusat Edukasi" children={undefined} />
      <div className="container w-[400px] pt-24 font-nunito">
        <h2 className="text-xl font-semibold mb-4 px-6">
          Manajemen Produk Yang Baik
        </h2>

        {/* Video Section */}
        <div className="w-[350px] h-[200px] mx-auto  overflow-hidden mb-6 border rounded-lg">
          <iframe
          className='w-full h-full object-cover'
            src="https://www.youtube.com/embed/T9Kffd3Dda0"
            title="Manajemen Produk Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Description */}
        <div className="text-black mb-6 w-full space-y-4 px-6 text-justify">
          <p>
            Selamat datang di Pusat Edukasi untuk Manajemen Produk, tempat di
            mana Anda dapat belajar cara mengelola produk di toko Anda dengan
            lebih efektif! Di sini, kami akan membimbing Anda melalui
            langkah-langkah praktis untuk mengatur, memperbarui, dan
            mengoptimalkan daftar produk Anda, sehingga Anda bisa menarik lebih
            banyak pembeli dan meningkatkan penjualan.
          </p>
          <p>
            Pelajari tips dan trik untuk membuat deskripsi produk yang menarik,
            menentukan harga yang kompetitif, serta mengelola stok barang secara
            efisien agar toko Anda selalu siap memenuhi permintaan pelanggan.
            Kami juga menyediakan panduan tentang strategi promosi produk yang
            dapat membantu meningkatkan visibilitas dan popularitas barang
            dagangan Anda di platform Bela Beli.
          </p>
          <p>
            Dengan manajemen produk yang baik, Anda dapat memastikan bahwa
            setiap produk yang Anda tawarkan mendapatkan perhatian yang layak
            dari calon pembeli. Mari maksimalkan potensi penjualan Anda bersama
            kami!
          </p>
        </div>
        <div className="w-full border-t-8 border-[#D7D7D7] mb-6"></div>

        {/* Recommended Section */}
        <h3 className="text-lg font-semibold mb-4 px-6">Anda Mungkin Suka</h3>
        <div className="space-y-4 mb-6">
          {/* Video Item 1 */}
          <div className="flex items-center gap-4 px-6 cursor-pointer">
            <iframe
              src="https://www.youtube.com/embed/heBdAQAfyLU"
              className="w-[105px] h-[74px] rounded-lg object-cover"
              title="Cara Cepat Menjadi Super Seller"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <span className="text-[15px] font-semibold">
              Cara Cepat Menjadi Super Seller
            </span>
          </div>

          {/* Video Item 2 */}
          <div className="flex items-center gap-4 px-6 cursor-pointer">
            <iframe
              src="https://www.youtube.com/embed/ebZ8VnLAD8w"
              className="w-[105px] h-[74px] rounded-lg object-cover"
              title="Cara agar produk dilihat oleh banyak orang"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <span className="text-[15px] font-semibold">
              Cara agar produk dilihat oleh banyak orang
            </span>
          </div>

          {/* Video Item 3 */}
          <div className="flex items-center gap-4 px-6 cursor-pointer pb-8">
            <iframe
              src="https://www.youtube.com/embed/lzi6giG3NkM"
              className="w-[105px] h-[74px] rounded-lg object-cover"
              title="Bagaimana cara mengatasi pengembalian Produk"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <span className="text-[15px] font-semibold">
              Bagaimana cara mengatasi pengembalian Produk
            </span>
          </div>
        </div>
      </div>
    </LayoutUtama>
  )
}

export default ManajemenProduk
