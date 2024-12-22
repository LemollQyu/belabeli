'use client'

import Header from '@/app/layouts/header'
import LayoutUtama from '@/app/layouts/layout-utama'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const notifications = [
  {
    id: 1,
    username: 'Annas123',
    reviewId: '127',
    time: '15:15',
    date: 'Baru saja',
    description:
      'Ulasan produk sangat membantu! Pastikan untuk memberikan respons cepat kepada pelanggan.',
    isRead: false,
  },
  {
    id: 2,
    username: 'UserX',
    reviewId: '128',
    time: '14:10',
    date: '1 Hari yang lalu',
    description:
      'Pelanggan memberikan ulasan positif pada produk Anda. Respon sekarang!',
    isRead: false,
  },
  {
    id: 3,
    username: 'Rahman99',
    reviewId: '129',
    time: '10:45',
    date: '1 Minggu yang lalu',
    description:
      'Ulasan ini memberikan saran yang baik. Lihat dan tingkatkan kualitas produk.',
    isRead: true,
  },
]

function Ulasan() {
  const router = useRouter()
  const [selectedFilter, setSelectedFilter] = useState('all') // 'all' or 'unread'
  const handleClick = () => {
    console.log('button di klik')
    router.push('/seller/dashboard/notifikasi/diulas/detail')
  }

  return (
    <LayoutUtama>
      <Header title="Ulasan" children={undefined} />
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
                  {/* Replacing the truck icon */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8ZM17 10V13H21V12.715L18.9917 10H17Z"
                      fill="#2EC99D"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p
                    className="font-nunito text-[13px] font-semibold text-black truncate max-w-[250px]"
                    style={{
                      color: 'var(--Light-Text-Color, #1B1E28)',
                      letterSpacing: '-0.2px',
                      fontFamily: 'Nunito',
                    }}
                    
                  >
                    {notification.username} Mengirimkan Ulasan ID{' '}
                    {notification.reviewId}
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

export default Ulasan
