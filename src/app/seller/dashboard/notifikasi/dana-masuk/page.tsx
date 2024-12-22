'use client'

import Header from '@/app/layouts/header'
import LayoutUtama from '@/app/layouts/layout-utama'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const notifications = [
  {
    id: 1,
    title: 'Dana Rp. 600.000 masuk dari ID Pesanan 2344789010',
    time: '15:15',
    date: 'Baru saja',
    description:
      'Dana sebesar Rp. 600.000 telah masuk ke rekening Anda dari pembelian ID Pesanan 2344789010. Silakan cek saldo Anda.',
    isRead: false,
  },
  {
    id: 2,
    title: 'Dana Rp. 300.000 masuk dari ID Pesanan 2344000010',
    time: '15:15',
    date: '1 Hari yang lalu',
    description:
      'Dana sebesar Rp. 300.000 telah masuk ke rekening Anda dari pembelian ID Pesanan 2344000010. Silakan cek saldo Anda.',
    isRead: false,
  },
  {
    id: 3,
    title: 'Dana Rp. 450.000 masuk dari ID Pesanan 2344789020',
    time: '15:15',
    date: '1 Minggu yang lalu',
    description:
      'Dana sebesar Rp. 450.000 telah masuk ke rekening Anda dari pembelian ID Pesanan 2344789020. Silakan cek saldo Anda.',
    isRead: true,
  },
]

function DanaMasuk() {
  const router = useRouter()
  const [selectedFilter, setSelectedFilter] = useState('all') // 'all' or 'unread'
  const handleClick = () => {
    console.log('button di klik')
    router.push('/seller/dashboard/notifikasi/dana-masuk/detail')
  }

  return (
    <LayoutUtama>
      <Header title="Dana" children={undefined} />
      <div className="container mx-auto p-4 font-nunito pt-20">
        {/* Filter Section */}
        <div className="py-2 flex items-center justify-between pb-2 mb-4">
          <p
            className="text-black font-bold text-base leading-[25px] font-nunito"
            style={{ letterSpacing: '-0.322px' }}
          >
            Semua Notifikasi
          </p>
          <button
            className="text-[12px] font-light leading-[20px]"
            style={{
              color: 'var(--Warna-Utama, #51D7B1)',
              letterSpacing: '-0.2px',
              fontFamily: 'Nunito',
            }}
          >
            Tandai semua telah dibaca
          </button>
        </div>

        {/* Notification List */}
        <ul>
          {notifications.map((notification) => (
            <div
              onClick={handleClick}
              key={notification.id}
              className="flex items-center justify-between p-4 mb-4 bg-white shadow rounded-lg"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  {/* Replacing the dollar icon */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.00391 3.00293H21.0039C21.5562 3.00293 22.0039 3.45064 22.0039 4.00293V20.0029C22.0039 20.5552 21.5562 21.0029 21.0039 21.0029H3.00391C2.45163 21.0029 2.00391 20.5552 2.00391 20.0029V4.00293C2.00391 3.45064 2.45163 3.00293 3.00391 3.00293ZM8.50391 14.0029V16.0029H11.0039V18.0029H13.0039V16.0029H14.0039C15.3846 16.0029 16.5039 14.8837 16.5039 13.5029C16.5039 12.1222 15.3846 11.0029 14.0039 11.0029H10.0039C9.72777 11.0029 9.50391 10.7791 9.50391 10.5029C9.50391 10.2268 9.72777 10.0029 10.0039 10.0029H15.5039V8.00293H13.0039V6.00293H11.0039V8.00293H10.0039C8.6232 8.00293 7.50391 9.12221 7.50391 10.5029C7.50391 11.8837 8.6232 13.0029 10.0039 13.0029H14.0039C14.28 13.0029 14.5039 13.2268 14.5039 13.5029C14.5039 13.7791 14.28 14.0029 14.0039 14.0029H8.50391Z"
                      fill="#2EC99D"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p
                    className="font-nunito text-[13px] font-semibold text-black truncate max-w-[220px]"
                    style={{
                      color: 'var(--Light-Text-Color, #1B1E28)',
                      letterSpacing: '-0.2px',
                      fontFamily: 'Nunito',
                    }}
                  >
                    {notification.title}
                  </p>

                  <p
                    className="font-nunito text-[12px] text-xs font-semibold text-gray-500 truncate max-w-[200px]"
                    title={notification.description} // Tooltip saat hover
                  >
                    {notification.description}
                  </p>
                  <p
                    className="font-semibold leading-[18px] text-[11px]"
                    style={{
                      color: '#000',
                      letterSpacing: '-0.184px',
                      fontFamily: 'Nunito',
                    }}
                  >
                    {notification.date}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p
                  className="font-semibold leading-[18px] text-[10px]"
                  style={{
                    color: '#51D7B1',
                    textAlign: 'right',
                    letterSpacing: '-0.276px',
                    fontFamily: 'Nunito',
                  }}
                >
                  {notification.time}
                </p>
                <div className="flex flex-col items-end">
                  {!notification.isRead && (
                    <div
                      className="w-2 h-2 text-white rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: '#51D7B1',
                        letterSpacing: '-0.276px',
                        fontSize: '12px',
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </ul>
       
      </div>
    </LayoutUtama>
  )
}

export default DanaMasuk
