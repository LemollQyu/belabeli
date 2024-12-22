'use client'
import React, { useState } from 'react'
import Header from '@/app/layouts/header'
import LayoutUtama from '@/app/layouts/layout-utama'
import Filter from '@/app/components/seller/popup-filter'
import { useRouter } from 'next/navigation'

const SemuaProduk = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const router = useRouter()

  const openFilter = () => {
    setIsFilterOpen(true)
  }

  const closeFilter = () => {
    setIsFilterOpen(false)
  }

  return (
    <LayoutUtama>
      <Header title="Semua Produk" children={undefined} />
      <div className="container mx-auto p-4 font-nunito pt-24 flex flex-col min-h-screen">
        <div className="flex items-center gap-4 px-2 w-full mb-6">
          {/* Input pencarian */}
          <div className="flex items-center flex-grow min-h-[40px] border rounded-md px-2 bg-white shadow-md">
            <span className="p-2 text-gray-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                  fill="#51D7B1"
                ></path>
              </svg>
            </span>
            <input
              type="text"
              className="ml-2 w-full border-none focus:outline-none text-gray-700 font-nunito"
              placeholder="Pencarian"
              value={''}
            />
          </div>

          {/* Tombol Filter */}
          <button
            onClick={openFilter}
            className="w-[40px] h-[40px] rounded-md border flex justify-center items-center bg-white hover:bg-gray-50 transition shadow-md"
            title="Filter"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 7C5 6.17157 5.67157 5.5 6.5 5.5C7.32843 5.5 8 6.17157 8 7C8 7.82843 7.32843 8.5 6.5 8.5C5.67157 8.5 5 7.82843 5 7ZM6.5 3.5C4.567 3.5 3 5.067 3 7C3 8.933 4.567 10.5 6.5 10.5C8.433 10.5 10 8.933 10 7C10 5.067 8.433 3.5 6.5 3.5ZM12 8H20V6H12V8ZM16 17C16 16.1716 16.6716 15.5 17.5 15.5C18.3284 15.5 19 16.1716 19 17C19 17.8284 18.3284 18.5 17.5 18.5C16.6716 18.5 16 17.8284 16 17ZM17.5 13.5C15.567 13.5 14 15.067 14 17C14 18.933 15.567 20.5 17.5 20.5C19.433 20.5 21 18.933 21 17C21 15.067 19.433 13.5 17.5 13.5ZM4 16V18H12V16H4Z"
                fill="#51D7B1"
              ></path>
            </svg>
          </button>
        </div>

        {/* Konten Tidak Ada Produk */}
        <div className="flex flex-col items-center justify-center p-16 flex-grow">
          <div className=" mb-4">
            <svg
              width="107"
              height="106"
              viewBox="0 0 107 106"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M53.5 97.1668V88.3335H22.5833V17.6668H66.75V35.3335H84.4167V57.4168H93.2491V30.9168L71.1667 8.8335H18.16C15.7264 8.8335 13.75 10.7947 13.75 13.2139V92.7864C13.75 95.1559 15.7144 97.1668 18.1375 97.1668H53.5ZM95.6156 93.2855L86.2465 83.9164L95.6156 74.5473L89.3695 68.3013L80.0004 77.6703L70.6314 68.3013L64.3853 74.5473L73.7544 83.9164L64.3853 93.2855L70.6314 99.5315L80.0004 90.1624L89.3695 99.5315L95.6156 93.2855Z"
                fill="#D3D3D3"
              />
            </svg>
          </div>
          <p className="font-semibold text-black text-lg">Tidak Ada Produk</p>
          <p className="text-black text-sm mt-2 text-center">
            Klik tombol tambahkan produk untuk mulai berjualan.
          </p>
        </div>

        {/* Tombol Tambah Produk Baru */}
        <div className="mt-auto">
          <button
            onClick={() => router.push('semua-produk/tambah-produk')}
            className="w-full bg-[#51d7b1] text-white font-semibold py-3 rounded-md text-sm shadow-md hover:bg-emerald-600 transition"
          >
            Tambah Produk Baru
          </button>
        </div>

        {/* Komponen Filter */}
        <Filter isOpen={isFilterOpen} onClose={closeFilter} />
      </div>
    </LayoutUtama>
  )
}

export default SemuaProduk
