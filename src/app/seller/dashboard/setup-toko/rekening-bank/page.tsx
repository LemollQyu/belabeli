'use client'

import { useState } from 'react'
import Link from 'next/link'
import LayoutUtama from '@/app/layouts/layout-utama'
import Header from '@/app/layouts/header'

interface Rekening {
  namaPemilik: string
  nomorRekening: string
  bank: string
}

interface Qris {
  namaQris: string
}

const RekeningBank = () => {
  const [rekeningList, setRekeningList] = useState<Rekening[]>([])
  const [qris, setQris] = useState<Qris | null>(null)

  const handleQrisUpload = (namaQris: string) => {
    setQris({ namaQris })
  }

  const handleRekeningUpload = (rekening: Rekening) => {
    setRekeningList([...rekeningList, rekening])
  }

  return (
    <LayoutUtama>
      <Header title="Rekening" children={undefined} />
      <div className="container w-[400px] mx-auto p-4 h-screen flex flex-col justify-between pt-14">
        {qris ? (
          <div className="flex items-center justify-center flex-grow">
            <div className="text-center">
              <h2 className="text-[16px] font-semibold">QRIS Aktif:</h2>
              <p className="text-[14px] text-gray-700">{qris.namaQris}</p>
            </div>
          </div>
        ) : rekeningList.length === 0 ? (
          <div className="flex items-center justify-center flex-grow">
            <h1 className="text-center text-[14px] font-nunito font-semibold">
              Belum Ada Rekening Tersimpan
            </h1>
          </div>
        ) : (
          <div className="px-4 mt-4 font-nunito flex-grow">
            <h2 className="text-[16px] font-semibold mb-4">Daftar Rekening:</h2>
            <ul className="space-y-2">
              {rekeningList.map((rekening, index) => (
                <li
                  key={index}
                  className="flex items-center bg-white p-4 rounded-lg shadow-sm border border-gray-300"
                >
                  <div className="flex-shrink-0 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 17.804A8.001 8.001 0 0112 15c2.31 0 4.386.982 5.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[14px] text-black">
                      {rekening.namaPemilik}
                    </p>
                    <p className="text-gray-500 text-[12px]">
                      {rekening.nomorRekening} ({rekening.bank})
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tombol Tambah Rekening Bank dan QRIS */}
        <div className="flex space-x-4">
          <Link href="rekening-bank/tambah-qris" className="w-1/2">
            <button
              onClick={() => handleQrisUpload('QRIS - Merchant A')}
              className="w-full p-3 text-[#51D7B1] font-nunito text-[15px] font-bold bg-white border border-[#51D7B1] rounded-[12px]
                       hover:bg-[#51D7B1] hover:text-white transition duration-200"
            >
              {qris ? 'Ubah QRIS' : 'Gunakan QRIS'}
            </button>
          </Link>
          <Link href="rekening-bank/tambah-rekening" className="w-1/2">
            <button
              onClick={() => handleRekeningUpload({ namaPemilik: 'John Doe', nomorRekening: '12345678', bank: 'BCA' })}
              className="w-full p-3 text-[#51D7B1] font-nunito text-[15px] font-bold bg-white border border-[#51D7B1] rounded-[12px]
                       hover:bg-[#51D7B1] hover:text-white transition duration-200"
            >
              Tambah Rekening
            </button>
          </Link>
        </div>
      </div>
    </LayoutUtama>
  )
}

export default RekeningBank
