'use client'
import { useState } from 'react'
import LayoutUtama from '@/app/layouts/layout-utama'
import Header from '@/app/layouts/header'
import HelpPopup from '@/app/components/usersettings/help-popup'


const helpTopics = [
  {
    title: 'Penghapusan Akun',
    description: 'Informasi tentang cara menghapus akun.',
  },
  {
    title: 'Pendaftaran Toko',
    description: 'Informasi tentang cara mendaftar toko.',
  },
  {
    title: 'Retur Barang',
    description: 'Informasi tentang cara melakukan retur barang.',
  },
  {
    title: 'Refund Dana',
    description: 'Informasi tentang cara mendapatkan refund.',
  },
  {
    title: 'Ganti Kata Sandi',
    description: 'Informasi tentang cara mengganti kata sandi.',
  },
  {
    title: 'Program Affiliate',
    description: 'Informasi tentang program affiliate.',
  },
  {
    title: 'Pembatalan Pesanan',
    description: 'Informasi tentang cara membatalkan pesanan.',
  },
  { title: 'Voucher', description: 'Informasi tentang penggunaan voucher.' },
]

const PusatBantuan = () => {
  const [showSizePopup, setShowSizePopup] = useState(false)

  return (
    <LayoutUtama>
      <Header title="Pusat Bantuan" children={undefined} />
      <div className="container mx-auto p-4 font-nunito mt-20">
        <h1 className="text-center text-lg font-bold">
          Hai, Apa yang bisa kami bantu ?
        </h1>

        {/* Input pencarian */}
        <div className="relative mt-4">
          {/* Ikon pencarian */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            <path
              d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
              fill="#7F7F7F"
            />
          </svg>

          {/* Input pencarian */}
          <input
            type="text"
            placeholder="Coba Cari"
            className="w-full border border-[#A9A9A9] rounded-md pl-12 pr-4 py-3 text-sm focus:outline-none"
          />
        </div>

        <h2 className="mt-6 text-sm font-semibold">Temukan bantuan</h2>

        {/* Daftar Topik Bantuan */}
        <div className="mt-4 space-y-3">
          {helpTopics.map((topic) => (
            <HelpDetail
              key={topic.title}
              title={topic.title}
              description={topic.description}
            />
          ))}
        </div>

        <h2 className="mt-6 text-sm font-semibold">
          Pilih Bantuan Sesuai Topik
        </h2>

        <HelpPopup/>
      </div>
    </LayoutUtama>
  )
}

// Komponen untuk bagian detail bantuan
const HelpDetail = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-[#A9A9A9] rounded-lg">
      <button
        className="flex justify-between items-center w-full px-4 py-3 text-left text-sm font-semibold"
        onClick={() => setOpen(!open)}
      >
        {title}
        <span>
          {open ? (
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9997 10.8284L7.04995 15.7782L5.63574 14.364L11.9997 8L18.3637 14.364L16.9495 15.7782L11.9997 10.8284Z"
                fill="#0F0F0F"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9999 13.1716L16.9496 8.2218L18.3638 9.636L11.9999 16L5.63586 9.636L7.05006 8.2218L11.9999 13.1716Z"
                fill="#0F0F0F"
              />
            </svg>
          )}
        </span>
      </button>
      {open && <div className="p-4 text-black text-sm">{description}</div>}
    </div>
  )
}

export default PusatBantuan
