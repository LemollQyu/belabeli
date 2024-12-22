'use client'
import React, { useState } from 'react'
import LayoutUtama from '@/app/layouts/layout-utama'
import Header from '@/app/layouts/header' // Import Header
import Link from 'next/link'

function HapusToko() {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <LayoutUtama>
      <Header title="Hapus Akun" children={undefined} />

      <div className="container mx-auto px-4 py-6 pt-24 font-nunito">
        <div className="bg-white shadow-md border-2 rounded-[20px] p-4">
          {/* Flex container for avatar, user info, and settings icon */}
          <div className="mt-2 text-gray-700">
            <h3 className="flex items-center text-base font-semibold mb-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"
                  fill="black"
                />
              </svg>
              Ketentuan Hapus Toko
            </h3>
            <p className='text-[14px]'>Syarat dan Ketentuan Penghapusan Toko</p>
            <div className="h-[360px] overflow-y-auto">
              <ol className="list-decimal pl-8 space-y-2 text-sm">
                <li>
                  <strong>Pemilik Toko</strong>: Penghapusan toko hanya dapat
                  dilakukan oleh pemilik toko atau akun yang memiliki otoritas
                  penuh terhadap toko tersebut.
                </li>
                <li>
                  <strong>Tidak Ada Transaksi yang Tertunda</strong>: Toko hanya
                  dapat dihapus jika tidak ada transaksi yang masih berlangsung
                  atau tertunda, termasuk pesanan yang belum diproses,
                  pengiriman yang belum diterima, atau pengembalian barang yang
                  sedang diproses.
                </li>
                <li>
                  <strong>Tidak Ada Hutang atau Tagihan yang Tersisa</strong>:
                  Toko tidak boleh memiliki hutang atau tagihan yang belum
                  dibayar kepada platform atau pengguna lain sebelum dapat
                  dihapus.
                </li>
                <li>
                  <strong>Penghapusan Data</strong>: Dengan menghapus toko,
                  semua data terkait toko, termasuk produk yang dijual, riwayat
                  transaksi, ulasan, dan informasi lain yang berkaitan, akan
                  dihapus secara permanen dan tidak dapat dipulihkan.
                </li>
                <li>
                  <strong>Tidak Ada Tindakan Penipuan atau Pelanggaran</strong>:
                  Toko yang sedang dalam investigasi atau terlibat dalam
                  tindakan penipuan, pelanggaran ketentuan layanan, atau keluhan
                  pengguna tidak dapat dihapus hingga masalah tersebut
                  diselesaikan.
                </li>
                <li>
                  <strong>Pengembalian Dana</strong>: Jika ada saldo atau dana
                  yang belum ditarik, pemilik toko wajib menarik dana tersebut
                  sebelum toko dihapus. Setelah penghapusan, akses ke dana atau
                  saldo tersebut akan hilang.
                </li>
                <li>
                  <strong>Konsekuensi Penghapusan Toko</strong>: Penghapusan
                  toko bersifat permanen. Setelah dihapus, pemilik toko tidak
                  dapat memulihkan kembali toko dan semua produk yang diunggah
                  sebelumnya akan hilang dari platform.
                </li>
                <li>
                  <strong>Notifikasi Penghapusan</strong>: Platform akan
                  memberikan notifikasi konfirmasi kepada pemilik toko melalui
                  email atau notifikasi dalam aplikasi sebelum proses
                  penghapusan selesai. Toko akan dianggap terhapus setelah
                  konfirmasi diterima.
                </li>
                <li>
                  <strong>Waktu Pemrosesan</strong>: Proses penghapusan toko
                  membutuhkan waktu hingga 7 hari kerja sejak permintaan
                  diterima dan semua persyaratan di atas terpenuhi.
                </li>
                <li>
                  <strong>Penutupan Akses Toko</strong>: Setelah permintaan
                  penghapusan diterima, toko akan ditutup dari publik sehingga
                  pengguna lain tidak bisa lagi melihat produk atau melakukan
                  transaksi di toko tersebut.
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center">
          <div
            className="w-[24px] h-[24px] flex justify-center items-center"
            onClick={() => setIsChecked(!isChecked)}
          >
            {isChecked ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
                  fill="#51D7B1"
                />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9C16.5 13.1421 13.1421 16.5 9 16.5ZM9 15C12.3137 15 15 12.3137 15 9C15 5.68629 12.3137 3 9 3C5.68629 3 3 5.68629 3 9C3 12.3137 5.68629 15 9 15ZM8.25195 12L5.06999 8.81805L6.13066 7.75732L8.25195 9.8787L12.4946 5.63604L13.5553 6.6967L8.25195 12Z"
                  fill="black"
                />
              </svg>
            )}
          </div>
          <label htmlFor="agreement" className="text-sm text-gray-700 ml-2">
          Saya Setuju dan Mengerti Syarat dan Ketentuan Hapus Toko          </label>
        </div>

        <div className="text-left mt-4">
          <h2 className="text-lg font-semibold">Hapus Toko</h2>
          <p className="text-sm text-gray-600">
            Klik “Hapus Toko" akan menghapus Toko
          </p>
        </div>
        <Link href="hapus-toko/kata-sandi">
          <button
            className={`mt-4 w-full py-3 rounded-md font-semibold ${
              isChecked
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
            onClick={() => {}}
            disabled={!isChecked}
          >
            Hapus Toko
          </button>
        </Link>
      </div>
    </LayoutUtama>
  )
}

export default HapusToko
