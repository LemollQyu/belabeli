'use client'
import LayoutUtama from '@/app/layouts/layout-utama'
import Header from '@/app/layouts/header'
import React, { useState } from 'react'
import Popup from '@/app/components/seller/popup-sk'
import { useRouter } from 'next/navigation'

export default function LihatVoucher() {
  const [showTermsPopup, setShowTermsPopup] = useState(false)
  const router = useRouter()

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
      {/* Header */}
      <Header title="Detail Voucher" children={undefined} />

      {/* Konten Utama */}
      <div className="container mx-auto font-nunito pt-24">
        {/* Informasi Voucher */}
        <div className="w-[330px] mx-auto border border-gray-300 px-4 py-2">
          <div className="flex justify-between items-center mb-2">
            <div className="flex justify-between items-center  space-x-2">
              <span className="bg-white border-2 border-gray-300 text-gray-500 text-[12px] font-semibold py-1 px-3 rounded-md">
                Diskon Terbaik
              </span>
              <h2 className="text-[16px] text-gray-500 font-semibold">
                BRIBOS
              </h2>
            </div>
            <span className="text-gray-500 text-sm">Stock : 99</span>
          </div>
          <div className="flex justify-between items-center space-x-2">
            <p className="text-gray-600 text-[11px] font-semibold">
              Diskon 15% Min. Pembelian Rp 300.000 <br />
              Sampai Dengan 26 Oktober 2024
            </p>
            <a
              href="#"
              className="text-[13px] font-semibold mt-2 inline-block"
              onClick={() => setShowTermsPopup(true)}
            >
              S&K
            </a>
          </div>
        </div>

        <div className="mt-8 left-0 border-t-8 w-full">
          {/* Detail Kuota dan Waktu */}
          <div className="mt-6 space-y-4 px-6">
            {/* Kuota Pemakaian */}
            <div className="flex items-center justify-between">
              <label className="text-gray-600 font-semibold">
                Kuota Pemakaian
              </label>
              <input
                type="text"
                value="100"
                className="w-[100px] border border-gray-300 rounded-md p-2 text-center"
                readOnly
              />
            </div>

            {/* Jumlah Maks Pembeli */}
            <div className="flex items-center justify-between">
              <label className="text-gray-600 font-semibold">
                Jumlah Maks Pembeli
              </label>
              <input
                type="text"
                value="100"
                className="w-[100px] border border-gray-300 rounded-md p-2 text-center"
                readOnly
              />
            </div>

            {/* Waktu Mulai */}
            <div className="flex items-center justify-between">
              <label className="text-gray-600 font-semibold">Waktu Mulai</label>
              <input
                type="text"
                value="24 September 2024"
                className="w-[180px] border border-gray-300 rounded-md p-2 text-center"
                readOnly
              />
            </div>

            {/* Waktu Berakhir */}
            <div className="flex items-center justify-between">
              <label className="text-gray-600 font-semibold">
                Waktu Berakhir
              </label>
              <input
                type="text"
                value="24 Oktober 2024"
                className="w-[180px] border border-gray-300 rounded-md p-2 text-center"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="absolute bottom-0 left-0 w-full border-t-4 p-4 px-6 space-y-4">
          {/* Kode Voucher */}
          <div className="flex justify-between items-center">
            <span className="text-black font-medium">Kode Voucher</span>
            <span className="border px-2 text-gray-500 font-semibold">
              ANAS OV12D
            </span>
          </div>

          {/* Tombol */}
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
                console.log('Data telah tersimpan:', {
                  termsPopupVisible: showTermsPopup,
                  voucherCode: 'ANAS OV12D', // Sesuaikan dengan data yang relevan
                })
                router.push('lihat-voucher/voucher')
              }}
            >
              Simpan
            </button>
          </div>
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
    </LayoutUtama>
  )
}
