'use client'

import { useState } from 'react'
import LayoutUtama from '@/app/layouts/layout-utama'
import Header from '@/app/layouts/header'

const NotifikasiPage = () => {
  const [notifikasiAplikasi, setNotifikasiAplikasi] = useState({
    pesananBaru: false,
    pesananSudahTiba: false,
    pesananKomplain: true,
    transaksiSelesai: true,
    penghasilan: true,
    chat: true,
    promoKhususSeller: true,
  })

  const [notifikasiEmail, setNotifikasiEmail] = useState({
    pesananBaru: true,
    pesananSudahTiba: true,
    pesananKomplain: true,
    transaksiSelesai: true,
    promoKhususSeller: true,
  })

  const handleToggleAplikasi = (field: keyof typeof notifikasiAplikasi) => {
    setNotifikasiAplikasi((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleToggleEmail = (field: keyof typeof notifikasiEmail) => {
    setNotifikasiEmail((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <LayoutUtama>
      <Header title="Notifikasi" children={undefined} />
      <div className="container w-[400px] p-4 pt-24 font-nunito">
        <div className="px-4 mb-6">
          <h2 className="text-[16px] font-semibold mb-2">
            Notifikasi Aplikasi
          </h2>
          <p className="text-[14px] text-gray-500 mb-4">
            Setting bunyi notifikasi, info status pesanan, info keuangan,
            notifikasi chat, info voucher dan promo terbaru
          </p>
          <div className="space-y-1">
            {Object.entries(notifikasiAplikasi).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between pb-2 font-semibold text-[14px]"
              >
                <span className="capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={value}
                    onChange={() =>
                      handleToggleAplikasi(
                        key as keyof typeof notifikasiAplikasi,
                      )
                    }
                  />
                  <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-[#51D7B1] transition-colors"></div>
                  <div className="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-6"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t-8 border-gray-300 mb-8"></div>

        <div className="px-4">
          <h2 className="text-[16px] font-semibold mb-2">Notifikasi Email</h2>
          <p className="text-[14px] text-gray-500 mb-4">
            Info status pesanan, info promosi dan penawaran
          </p>
          <div className="space-y-1">
            {Object.entries(notifikasiEmail).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between pb-2 font-semibold text-[14px]"
              >
                <span className="capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={value}
                    onChange={() =>
                      handleToggleEmail(key as keyof typeof notifikasiEmail)
                    }
                  />
                  <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-[#51D7B1] transition-colors"></div>
                  <div className="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-6"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutUtama>
  )
}

export default NotifikasiPage
