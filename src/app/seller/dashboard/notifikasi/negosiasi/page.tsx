'use client'

import Header from '@/app/layouts/header'
import LayoutUtama from '@/app/layouts/layout-utama'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const notifications = [
  {
    id: 1,
    title: 'Annas123 Mengajukan Negosiasi!',
    time: '17:30',
    date: '2 Hari yang lalu',
    description:
      'Annas123 telah mengajukan negosiasi untuk produk Anda. Silakan tinjau tawaran mereka.',
    isRead: false,
  },
  {
    id: 2,
    title: 'FarinaS23 Mengajukan Negosiasi!',
    time: '17:30',
    date: '2 Hari yang lalu',
    description:
      'FarinaS23 telah mengajukan negosiasi untuk produk Anda. Silakan tinjau tawaran mereka.',
    isRead: false,
  },
  {
    id: 3,
    title: 'Naufal26 Mengajukan Negosiasi!',
    time: '17:30',
    date: '2 Hari yang lalu',
    description:
      'Naufal26 telah mengajukan negosiasi untuk produk Anda. Silakan tinjau tawaran mereka.',
    isRead: false,
  },
]

function NotifNegosiasi() {
  const router = useRouter()
  const [selectedFilter, setSelectedFilter] = useState('all') // 'all' or 'unread'
  const handleClick = () => {
    console.log('button di klik')
    router.push('/seller/dashboard/notifikasi/negosiasi/detail')
  }

  return (
    <LayoutUtama>
      <Header title="Negosiasi" children={undefined} />
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
                      d="M11.8611 2.39057C12.8495 1.73163 14.1336 1.71797 15.1358 2.35573L19.291 4.99994H20.9998C21.5521 4.99994 21.9998 5.44766 21.9998 5.99994V14.9999C21.9998 15.5522 21.5521 15.9999 20.9998 15.9999H19.4801C19.5396 16.9472 19.0933 17.9102 18.1955 18.4489L13.1021 21.505C12.4591 21.8907 11.6609 21.8817 11.0314 21.4974C10.3311 22.1167 9.2531 22.1849 8.47104 21.5704L3.33028 17.5312C2.56387 16.9291 2.37006 15.9003 2.76579 15.0847C2.28248 14.7057 2 14.1254 2 13.5109V6C2 5.44772 2.44772 5 3 5H7.94693L11.8611 2.39057ZM4.17264 13.6452L4.86467 13.0397C6.09488 11.9632 7.96042 12.0698 9.06001 13.2794L11.7622 16.2518C12.6317 17.2083 12.7903 18.6135 12.1579 19.739L17.1665 16.7339C17.4479 16.5651 17.5497 16.2276 17.4448 15.9433L13.0177 9.74551C12.769 9.39736 12.3264 9.24598 11.9166 9.36892L9.43135 10.1145C8.37425 10.4316 7.22838 10.1427 6.44799 9.36235L6.15522 9.06958C5.58721 8.50157 5.44032 7.69318 5.67935 7H4V13.5109L4.17264 13.6452ZM14.0621 4.04306C13.728 3.83047 13.3 3.83502 12.9705 4.05467L7.56943 7.65537L7.8622 7.94814C8.12233 8.20827 8.50429 8.30456 8.85666 8.19885L11.3419 7.45327C12.5713 7.08445 13.8992 7.53859 14.6452 8.58303L18.5144 13.9999H19.9998V6.99994H19.291C18.9106 6.99994 18.5381 6.89148 18.2172 6.68727L14.0621 4.04306ZM6.18168 14.5448L4.56593 15.9586L9.70669 19.9978L10.4106 18.7659C10.6256 18.3897 10.5738 17.9178 10.2823 17.5971L7.58013 14.6247C7.2136 14.2215 6.59175 14.186 6.18168 14.5448Z"
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

export default NotifNegosiasi
