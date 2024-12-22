'use client'
import Header from '@/app/layouts/header'
import LayoutUtama from '@/app/layouts/layout-utama'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ManajemenDiskon = () => {
  const [activeTab, setActiveTab] = useState('Voucher')
  const router = useRouter()
  const [activeEvent, setActiveEvent] = useState(false) // Track if an event is active or not
  const [isFollowing, setIsFollowing] = useState(false) // tracks follow status

  const handleFollow = () => {
    setIsFollowing(!isFollowing) // toggle follow status
  }
  const handleTambahFlashsaleClick = () => {
    router.push('/seller/dashboard/manajemen-diskon/tambah-flashsale')
  }
  const handleTambahProdukClick = () => {
    router.push('/seller/dashboard/manajemen-diskon/tambah-voucher')
  }

  const handleTambahHargaClick = () => {
    router.push('/seller/dashboard/manajemen-diskon/tambah-harga')
  }

  return (
    <LayoutUtama>
      <Header title="Manajemen Diskon" children={undefined} />
      <div className="container mx-auto p-4 font-nunito pt-20">
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
              <div className="rounded-lg border-2 border-gray-300 bg-gray-100 shadow-md">
                <h2 className="bg-white text-left text-gray-600 font-semibold py-3 px-4 border-b-2 border-gray-300">
                  Voucher Aktif
                </h2>
                <div className="text-center text-gray-400 py-2 border-b border-gray-300">
                  Kosong
                </div>
                <div className="text-center p-4">
                  <button
                    onClick={handleTambahProdukClick}
                    className="w-full bg-[#51D7B1] text-white py-2 px-6 rounded-md"
                  >
                    Tambahkan Produk
                  </button>
                </div>
              </div>

              <div className="rounded-lg border-2 border-gray-300 bg-gray-100 shadow-md">
                <h2 className="bg-white text-left text-gray-600 font-semibold py-3 px-4 border-b-2 border-gray-300">
                  Kode Voucher Aktif
                </h2>
                <div className="text-center text-gray-400 py-2 border-b border-gray-300">
                  Kosong
                </div>
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
            <div className="rounded-lg border-2 border-gray-300 bg-gray-100 shadow-md">
              <h2 className="bg-white text-left text-gray-600 font-semibold py-3 px-4 border-b-2 border-gray-300">
                Harga Aktif
              </h2>
              <div className="text-center text-gray-400 py-2 border-b border-gray-300">
                Kosong
              </div>
              <div className="text-center p-4">
                <button
                  onClick={handleTambahHargaClick}
                  className="w-full bg-[#51D7B1] text-white py-2 px-6 rounded-md"
                >
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
                    activeEvent
                      ? 'text-gray-700 font-semibold'
                      : 'text-gray-400'
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

export default ManajemenDiskon
