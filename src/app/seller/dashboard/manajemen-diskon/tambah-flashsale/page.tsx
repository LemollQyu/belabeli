'use client'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/navigation'
import Header from '@/app/layouts/header'
import LayoutUtama from '@/app/layouts/layout-utama'

const TambahFlashsale = () => {
  const router = useRouter()
  const [harga, setHarga] = useState('')

  const formatRupiah = (value: string): string => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '') // Menghapus semua karakter non-digit
    const formattedValue = formatRupiah(rawValue) // Memformat angka dengan titik setiap ribuan
    console.log('Formatted Value:', formattedValue); // Menampilkan nilai yang sudah diformat
    setHarga(formattedValue) // Menyimpan nilai yang sudah diformat
  }

  const handleContinue = () => {
    router.push('/seller/dashboard/setup-toko/pusat-bantuan') // Arahkan ke halaman rekening bank
  }

  const handleProduct = () => {
    router.push('tambah-flashsale/pilih-produk') // Arahkan ke halaman rekening bank
  }
  return (
    <LayoutUtama>
      <Header title="Manajemen Diskon" children={undefined} />
      <div className="container mx-auto p-4 font-nunito pt-24">
        {' '}
        <div className="mt-4">
          <button
            className="w-full text-left rounded-md py-4 px-4 text-black flex justify-between border-2 border-gray-300 bg-white "
            onClick={handleProduct}
          >
            Pilih Produk
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
          <div className="mt-4 w-full flex items-center border-2 rounded-md border-gray-300 bg-white px-4 py-3 focus-within:border-gray-600 focus-within:ring-1 focus-within:ring-gray-600">
            <span className="text-black mr-2">Rp</span>
            <input
              type="text"
              placeholder="Masukkan Harga Akhir"
              className="w-full text-black text-left focus:outline-none font-semibold"
              value={harga}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Bantuan */}
        {/* Box pertama */}
        <div className="mt-4 rounded-lg border-gray-300 bg-gray-100 shadow-md">
          <h2 className="text-left text-gray-700 font-bold py-3 px-4 border-b-2 border-gray-300">
            Butuh Bantuan?
          </h2>
          <div className="text-center p-3">
            <button
              className="w-full text-left py-2 px-2 text-gray-600 flex justify-between "
              onClick={handleContinue}
            >
              <div className="flex justify-between space-x-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0013 18.3337C5.39893 18.3337 1.66797 14.6027 1.66797 10.0003C1.66797 5.39795 5.39893 1.66699 10.0013 1.66699C14.6036 1.66699 18.3346 5.39795 18.3346 10.0003C18.3346 14.6027 14.6036 18.3337 10.0013 18.3337ZM9.16797 12.5003V14.167H10.8346V12.5003H9.16797ZM10.8346 11.1296C12.0394 10.771 12.918 9.65491 12.918 8.33366C12.918 6.72283 11.6121 5.41699 10.0013 5.41699C8.5863 5.41699 7.40661 6.42465 7.14073 7.76154L8.7753 8.08847C8.8893 7.51552 9.39489 7.08366 10.0013 7.08366C10.6916 7.08366 11.2513 7.6433 11.2513 8.33366C11.2513 9.02399 10.6916 9.58366 10.0013 9.58366C9.54105 9.58366 9.16797 9.95674 9.16797 10.417V11.667H10.8346V11.1296Z"
                    fill="black"
                  />
                </svg>
                <span className=" text-black">Pusat Bantuan</span>
              </div>

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
          </div>
        </div>
        {/* Tombol Aksi */}
        <div className="absolute bottom-0 left-0 w-full border-t-4 p-6 flex justify-between space-x-[10px]">
          <button
            className="flex-1 bg-white border border-[#51D7B1] text-[#51D7B1] font-semibold py-2 rounded-md"
            onClick={() =>
              router.push('tambah-flashsale/pilih-produk/lihat-harga')
            } // Arahkan ke halaman berikutnya
          >
            Lihat
          </button>
          <button
            className="flex-[100px] bg-[#51D7B1] text-white font-semibold py-2 rounded-md"
            onClick={() => {
              console.log('Data Berhasil Disimpan')
              router.push('tambah-flashsale/pilih-produk/lihat-harga/flashsale')
            }} // Arahkan ke halaman berikutnya
          >
            Simpan
          </button>
        </div>
      </div>
    </LayoutUtama>
  )
}

export default TambahFlashsale
