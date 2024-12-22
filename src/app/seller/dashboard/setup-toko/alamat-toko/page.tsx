'use client'

import React from 'react'
import Link from 'next/link'
import LayoutUtama from '@/app/layouts/layout-utama'
import Header from '@/app/layouts/header'
import Alamat from '@/app/components/pembayaran/alamat'

export const addressData = [
  {
    key: 1,
    name: 'Rumah Saya',
    address: 'Jl. Duduhan No. 28 RT 1 RW 5',
    district: 'Kecamatan Mijen',
    city: 'Kota Semarang',
    province: 'Jawa Tengah',
    postalCode: '50219',
  },
]

const AddressList = () => {
  return (
    <>
      <LayoutUtama>
        <Header title="Ganti Alamat" children={undefined} />
        <div className="container w-[400px] h-screen flex flex-col font-nunito">
          <div className="pt-20 space-y-2 flex-grow">
            {/* Pemetaan data alamat dengan komponen Alamat */}
            {addressData.map((address, index) => (
              <Alamat
                key={index}
                name={address.name}
                address={address.address}
                district={address.district}
                city={address.city}
                province={address.province}
                postalCode={address.postalCode}
              />
            ))}
          </div>

          <Link href="alamat-toko/address-form">
            <div className="flex items-center justify-center px-4 mb-4">
              <button className="w-full py-3 text-[#51D7B1] text-[16px] font-bold rounded-lg border border-[#51D7B1] bg-white hover:bg-[#f1f1f1] focus:outline-none focus:ring-2 focus:ring-[#51D7B1]">
                Ubah Alamat Toko
              </button>
            </div>
          </Link>
        </div>
      </LayoutUtama>
    </>
  )
}

export default AddressList
