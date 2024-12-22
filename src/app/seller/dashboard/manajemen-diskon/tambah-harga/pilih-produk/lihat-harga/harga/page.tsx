'use client'
import { useState } from 'react'
import LayoutUtama from '@/app/layouts/layout-utama'
import Header from '@/app/layouts/header'
import Popup from '@/app/components/seller/popup-sk'
import { useRouter } from 'next/navigation'
import ProductCard from '@/app/components/seller/product-card'
const DiskonPage = () => {
  const [activeTab, setActiveTab] = useState('Voucher')
  const [showTermsPopup, setShowTermsPopup] = useState(false)
  const router = useRouter()
  const [activeEvent, setActiveEvent] = useState(false); // Track if an event is active or not
  const [isFollowing, setIsFollowing] = useState(false); // tracks follow status

  const handleFollow = () => {
    setIsFollowing(!isFollowing); // toggle follow status
  };
  const handleTambahFlashsaleClick = () => {
    router.push('/seller/dashboard/manajemen-diskon/tambah-flashsale')
  }
  const handleTambahHargaClick = () => {
    router.push('/seller/dashboard/manajemen-diskon/tambah-harga')
  }
  const [discounts, setDiscounts] = useState([
    {
      title: 'Diskon Terbaik',
      code: 'BRIBOS',
      discount: 'Diskon 15% Min. Pembelian Rp 300.000',
      expiry: 'Sampai Dengan 26 Oktober 2024',
      stock: 99,
      description:
        'Meningkatkan Penjualan. Diskon dapat memicu pembelian impulsif atau menarik pelanggan yang sebelumnya ragu untuk membeli produk. Ini bisa meningkatkan volume penjualan dalam periode tertentu.',
    },
    {
      title: 'Diskon Terbaik',
      code: 'BRIBOS',
      discount: 'Diskon 15% Min. Pembelian Rp 300.000',
      expiry: 'Sampai Dengan 26 Oktober 2024',
      stock: 99,
      description:
        'Meningkatkan Penjualan. Diskon dapat memicu pembelian impulsif atau menarik pelanggan yang sebelumnya ragu untuk membeli produk. Ini bisa meningkatkan volume penjualan dalam periode tertentu.',
    },
  ])

  const [activeCodes, setActiveCodes] = useState([
    {
      title: 'Diskon Hari Ini',
      code_voucher: 'ANAS_VI16D',
      discount: 'Diskon 10% Min. Pembelian Rp 100.000',
      expiry: 'Sampai Dengan 31 Desember 2024',
      stock: 50,
      description:
        'Voucher ini memberikan potongan 10% dengan minimal pembelian tertentu. Cocok untuk pelanggan yang ingin mencoba produk baru atau berbelanja rutin.',
    },
    {
      title: 'Diskon Hari Ini',
      code_voucher: 'ANAS_VI16D',
      discount: 'Diskon 10% Min. Pembelian Rp 100.000',
      expiry: 'Sampai Dengan 31 Desember 2024',
      stock: 50,
      description:
        'Voucher ini memberikan potongan 10% dengan minimal pembelian tertentu. Cocok untuk pelanggan yang ingin mencoba produk baru atau berbelanja rutin.',
    },
  ])

  const [products, setProducts] = useState([
    {
      nameProduct: 'Laptop Gaming HP Victus Ryzen 5 16GB',
      linkImage:
        'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/107/MTA-138956534/hp_hp_victus_laptop_15_fb0009ax_ryzen_5_5600h_16gb_512gb_rtx_3050_144hz_full07_gh8cdrus.jpg',
      priceAsli: '15.000.000',
      discountPrice: '13.500.000',
      star: '4.8',
      lokasi: 'Yogyakarta, Indonesia',
      description:
        'Meningkatkan Penjualan. Diskon dapat memicu pembelian impulsif atau menarik pelanggan yang sebelumnya ragu untuk membeli produk. Ini bisa meningkatkan volume penjualan dalam periode tertentu.',
      linkHref: '/product/laptop-gaming-ghi',
    },
    {
      nameProduct: 'ASUS ROG Strix G15 Gaming Laptop',
      linkImage:
        'https://images.tokopedia.net/img/cache/700/VqbcmM/2021/8/26/f0bc3abf-d3ca-4389-858d-71109878e0ba.jpg',
      priceAsli: '20.000.000',
      discountPrice: '18.000.000',
      star: '4.9',
      lokasi: 'Jakarta, Indonesia',
      description:
        'Meningkatkan Penjualan, Diskon dapat memicu pembelian impulsif atau menarik pelanggan yang sebelumnya ragu untuk membeli produk. Ini bisa meningkatkan volume penjualan dalam periode tertentu.',
      linkHref: '/product/laptop-gaming-asus-rog',
    },
  ])

  const handleTambahProdukClick = () => {
    router.push('/seller/dashboard/manajemen-diskon/tambah-voucher')
  }

  const termsContent = (
    <div className="text-black text-sm space-y-2">
      <p>Syarat dan Ketentuan Penggunaan Voucher</p>
      <ol className="list-disc pl-4 space-y-2 text-black">
        <li>
          Masa Berlaku: Voucher berlaku dari 24 Oktober 2024 hingga 30 Oktober
          2024. Tidak dapat digunakan setelah masa berlaku habis.
        </li>
        <li>
          Minimal Pembelian: Berlaku untuk transaksi minimal Rp200.000 (tidak
          termasuk ongkir dan pajak).
        </li>
        <li>
          Produk yang Berlaku: Voucher berlaku untuk semua produk kecuali
          Kategori Wanita.
        </li>
        <li>
          Penggunaan: Satu voucher per transaksi, tidak bisa digabung dengan
          promosi lain, Masukkan kode voucher saat checkout.
        </li>
        <li>
          Nilai Voucher: 20.000 Rupiah. Tidak bisa ditukar dengan uang tunai.
        </li>
        <li>
          Pembatalan: Jika transaksi dibatalkan atau ada pengembalian, nilai
          voucher tidak akan dikembalikan.
        </li>
        <li>
          Perubahan: Kami berhak mengubah syarat dan ketentuan tanpa
          pemberitahuan.
        </li>
      </ol>
    </div>
  )

  return (
    <LayoutUtama>
      <Header title="Manajemen Diskon" children={undefined} />
      <div className="container w-[400px] mx-auto p-4 pt-20 font-nunito">
        {/* Tabs */}
        <div className="flex border-b relative">
          <button
            className={`flex-1 py-2 font-semibold ${
              activeTab === 'Voucher' ? 'text-black' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('Voucher')}
          >
            Voucher
          </button>
          <button
            className={`flex-1 py-2 font-semibold ${
              activeTab === 'Harga' ? 'text-black' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('Harga')}
          >
            Harga
          </button>
          <button
            className={`flex-1 py-2 font-semibold ${
              activeTab === 'Flash Sale' ? 'text-black' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('Flash Sale')}
          >
            Flash Sale
          </button>

          {/* Garis Bawah Aktif */}
          <span
            className="absolute bottom-0 h-0.5 bg-black transition-all duration-300"
            style={{
              width: '33.33%',
              transform: `translateX(${
                activeTab === 'Voucher'
                  ? '0%'
                  : activeTab === 'Harga'
                  ? '100%'
                  : '200%'
              })`,
            }}
          />
        </div>

        {/* Konten berdasarkan tab yang aktif */}
        <div className="mt-6 space-y-6">
          {activeTab === 'Voucher' && (
            <>
              {/* Diskon Aktif */}
              <div className="rounded-lg border-2 border-gray-300 bg-gray-100 shadow-md">
                <h2 className="bg-white text-left text-gray-600 font-semibold py-3 px-4 border-b-2 border-gray-300">
                  Voucher Aktif
                </h2>
                {discounts.length > 0 ? (
                  discounts.map((discount, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm"
                    >
                      <div
                        className="p-4"
                        style={{
                          borderRadius: '8px',
                          background:
                            'linear-gradient(90deg, rgba(131, 230, 155, 0.80) 0%, rgba(0, 186, 225, 0.80) 80%)',
                        }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex justify-between items-center space-x-2">
                            <span className="bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded-md">
                              {discount.title}
                            </span>
                            <h3 className="text-[14px] font-bold text-white">
                              {discount.code}
                            </h3>
                          </div>
                          <span className="text-sm text-white">
                            Stock: {discount.stock}
                          </span>
                        </div>
                        <p className="text-sm text-white">
                          {discount.discount}
                        </p>
                        <div className="flex justify-between items-center space-x-2">
                          <p className="text-xs text-white">
                            {discount.expiry}
                          </p>
                          <a
                            href="#"
                            className="text-[13px] text-white font-semibold mt-2 inline-block"
                            onClick={() => setShowTermsPopup(true)}
                          >
                            S&K
                          </a>
                        </div>
                      </div>

                      {/* Popup Syarat & Ketentuan */}
                      {showTermsPopup && (
                        <Popup
                          title="Syarat & Ketentuan"
                          content={termsContent}
                          onClose={() => setShowTermsPopup(false)}
                        />
                      )}

                      <p className="border-2 border-gray-300 rounded-md p-2 bg-white text-sm text-gray-600 mt-2">
                        {discount.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400 py-2 border-b border-gray-300">
                    Kosong
                  </div>
                )}
                <div className="text-center p-4">
                  <button
                    onClick={handleTambahProdukClick}
                    className="w-full bg-[#51D7B1] text-white py-2 px-6 rounded-md"
                  >
                    Tambahkan Produk
                  </button>
                </div>
              </div>

              {/* Kode Voucher Aktif */}
              <div className="rounded-lg border-2 border-gray-300 bg-gray-100 shadow-md">
                <h2 className="bg-white text-left text-gray-600 font-semibold py-3 px-4 border-b-2 border-gray-300">
                  Kode Voucher Aktif
                </h2>
                {activeCodes.length > 0 ? (
                  activeCodes.map((code, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm"
                    >
                      <div
                        className="p-4"
                        style={{
                          borderRadius: '8px',
                          background:
                            'linear-gradient(90deg, rgba(131, 230, 155, 0.80) 0%, rgba(0, 186, 225, 0.80) 80%)',
                        }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded-md">
                            {code.title}
                          </span>
                          <div className="flex flex-col items-end ml-4">
                            <span className="text-[11px] text-white">
                              Stock: {code.stock}
                            </span>
                            <h3 className="text-[10px] font-semibold text-white">
                              {code.code_voucher}
                            </h3>
                          </div>
                        </div>

                        <p className="text-sm text-white">{code.discount}</p>
                        <div className="flex justify-between items-center space-x-2">
                          <p className="text-xs text-white">{code.expiry}</p>
                          <a
                            href="#"
                            className="text-[13px] text-white font-semibold mt-2 inline-block"
                            onClick={() => setShowTermsPopup(true)}
                          >
                            S&K
                          </a>
                        </div>
                      </div>
                      <p className="border-2 border-gray-300 rounded-md p-2 bg-white text-sm text-gray-600 mt-2">
                        {code.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400 py-2 border-b border-gray-300">
                    Kosong
                  </div>
                )}
                <div className="text-center p-4">
                  <button
                    onClick={handleTambahProdukClick}
                    className="w-full bg-[#51D7B1] text-white py-2 px-6 rounded-md"
                  >
                    Tambahkan Produk
                  </button>
                </div>
              </div>
            </>
          )}
          {activeTab === 'Harga' && (
            <div className="rounded-lg border border-gray-300 bg-gray-50 shadow-md">
              <h2 className="bg-white text-left text-gray-600 font-semibold py-3 px-4 border-b border-gray-300">
                Harga Aktif
              </h2>
              <div className="space-y-4">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 flex space-x-4"
                  >
                    {/* Kartu Produk */}
                    <ProductCard
                      nameProduct={product.nameProduct}
                      linkImage={product.linkImage}
                      priceAsli={product.priceAsli}
                      discountPrice={product.discountPrice}
                      star={product.star}
                      lokasi={product.lokasi}
                      linkHref={product.linkHref}
                    />
                    {/* Deskripsi Diskon dengan Styling */}
                    <div className="inline-flex flex-col items-center p-3.5 pt-2 pb-3.5 rounded-lg border-2 border-gray-300 bg-white text-[12px] text-gray-700">
                      {product.description}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center p-4">
                <button className="w-full bg-[#51D7B1] text-white py-2 px-6 rounded-md"
                onClick={handleTambahHargaClick}>
                  Tambahkan Produk
                </button>
              </div>
            </div>
          )}

{activeTab === 'Flash Sale' && (
            <>
              {/* Conditional rendering for Flash Sale */}
              <div className="rounded-lg border-2 border-gray-300 bg-gray-100 shadow-md">
      <h2 className="bg-white text-left text-gray-600 font-semibold py-3 px-4 border-b-2 border-gray-300">
        Event FlashSale
      </h2>
      <div
        className={`text-center py-2 border-b border-gray-300 ${
          activeEvent ? 'text-gray-700 font-semibold' : 'text-gray-400'
        }`}
      >
        {activeEvent ? 'Event 11.11' : 'Tidak ada acara yang aktif'}
      </div>
      <div className="text-center p-4">
        <button
          onClick={handleFollow}
          disabled={!activeEvent}
          className={`w-full py-2 px-6 rounded-md font-semibold transition-colors duration-300 ${
            activeEvent
              ? isFollowing
                ? 'bg-gray-400 text-white hover:bg-gray-500'
                : 'bg-[#51D7B1] text-white hover:bg-[#3ab38e]'
              : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
        >
          {isFollowing ? 'Mengikuti' : 'Ikuti'}
        </button>
      </div>
    </div>
              <div className="rounded-lg border-2 border-gray-300 bg-gray-100 shadow-md">
                <h2 className="bg-white text-left text-gray-600 font-semibold py-3 px-4 border-b-2 border-gray-300">
                  Flash Sale Aktif
                </h2>
                <div className="text-center text-gray-400 py-2 border-b border-gray-300">
                  Kosong
                </div>
                <div className="text-center p-4">
                  <button
                    onClick={handleTambahFlashsaleClick}
                    className="w-full bg-[#51D7B1] text-white py-2 px-6 rounded-md"
                  >
                    Tambahkan Produk
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </LayoutUtama>
  )
}

export default DiskonPage
