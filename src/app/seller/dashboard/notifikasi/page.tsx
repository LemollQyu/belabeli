import React from 'react'
import Link from 'next/link'
import Header from '@/app/layouts/header'
import LayoutUtama from '@/app/layouts/layout-utama'
interface Notification {
  title: string
  description: string
  unreadCount?: number
}

function NotificationPage() {
  const notifications: Notification[] = [
    {
      title: 'Perlu Dikirim',
      description:
        'Order ID 2344789010 dan 50 lainnya menunggu untuk dikirim. Pastikan untuk memproses dan mengirim pesanan segera.',
      unreadCount: 2,
    },
    {
      title: 'Selesai',
      description:
        'Terdapat 60 transaksi yang telah berhasil diselesaikan. Periksa dan pastikan semua transaksi telah diproses dengan benar.',
      unreadCount: 60,
    },
    {
      title: 'Negosiasi',
      description:
        'Annas 123 dan Sanna231 mengajukan negosiasi untuk beberapa transaksi. Silakan periksa dan tanggapi negosiasi yang ada.',
      unreadCount: 2,
    },
    {
      title: 'Dikomplain',
      description:
        'Terdapat 2 produk yang dikomplain oleh pelanggan yang perlu Anda tangani. Segera periksa keluhan pelanggan dan beri tanggapan yang sesuai.',
      unreadCount: 2,
    },
    {
      title: 'Diulas',
      description:
        'Terdapat 2 produk yang mendapatkan ulasan baru. Periksa ulasan untuk mengetahui umpan balik dari pelanggan dan mengambil tindakan yang diperlukan.',
      unreadCount: 2,
    },
    {
      title: 'Dana Masuk',
      description:
        'Terdapat 2 transaksi dana masuk yang perlu Anda verifikasi. Pastikan untuk memeriksa status pembayaran dan memperbarui sistem Anda.',
      unreadCount: 2,
    },
  ]

  const lastNotifications: Notification[] = [
    {
      title: 'Anugrah Shoes',
      description: 'Lacak pengiriman',
    },
    {
      title: 'Anugrah Shoes',
      description: 'Lacak pengiriman',
    },
    {
      title: 'Anugrah Shoes',
      description: 'Lacak pengiriman',
    },
  ]

  return (
    <LayoutUtama>
      <Header title="Notifikasi" children={undefined} />

      <div className="container mx-auto p-4 font-nunito pt-24">
        {/* Wrapper untuk menambahkan layout yang lebih terpusat */}
        <ul className="mb-4 flex space-x-4">
          <li className="w-full h-[45px] flex items-center justify-center bg-[#E2F8F2] text-emerald-300 text-[14px] font-bold font-['Nunito'] leading-none rounded-lg cursor-pointer">
            Notifikasi Saya
          </li>
          <li className="w-full h-[45px] flex items-center justify-center bg-emerald-300 text-white text-[14px] font-bold font-['Nunito'] leading-none rounded-lg cursor-pointer">
            Notifikasi Toko
          </li>
        </ul>

        {/* List Notifikasi */}
        <ul className="mb-2 w-full">
          {notifications.map((notification, index) => (
            <li key={index} className="mb-2">
              <Link href={getLink(notification.title)}>
                <div className="flex items-center justify-between p-4 bg-white shadow rounded-lg cursor-pointer">
                  <div className="flex items-center">
                    {/* Icon */}
                    {getIcon(notification.title)}

                    {/* Text Content */}
                    <div className="ml-4">
                      {/* Judul */}
                      <p className="font-nunito text-[15px] text-sm font-bold text-gray-800 mb-1">
                        {notification.title}
                      </p>
                      {/* Deskripsi */}
                      <p
                        className="font-nunito text-[12px] text-xs font-semibold text-gray-500 truncate max-w-[200px]"
                        title={notification.description} // Tooltip saat hover
                      >
                        {notification.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Side (Icon atau Jumlah Notifikasi) */}
                  <div className="flex items-center">
                    {/* Unread Count (akan muncul jika ada) */}
                    {notification.unreadCount && (
                      <div className="flex items-center justify-center w-6 h-6 bg-emerald-200 text-emerald-700 rounded-full text-[12px] mr-2">
                        {notification.unreadCount}
                      </div>
                    )}
                    {/* Icon akan selalu muncul */}
                    <div className="text-gray-400 text-xs">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.1714 12.0001L8.22168 7.0503L9.63589 5.6361L15.9999 12.0001L9.63589 18.364L8.22168 16.9498L13.1714 12.0001Z"
                          fill="#7D848D"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Bagian Bawah */}
        <div className="flex justify-between items-center p-2">
          <p className="font-nunito text-[15px] font-bold text-gray-800">
            Semua Notifikasi
          </p>
          <button className="font-nunito text-[12px] text-[var(--warna-utama-70,#25A07D)] font-light leading-[150%] tracking-[-0.276px]">
            Tandai semua telah dibaca
          </button>
        </div>

        {/* List Notifikasi Terakhir */}
        <ul className="mt-4">
          {lastNotifications.map((notification, index) => (
            <li key={index} className="mb-2">
              <Link href="/lacak-pesanan">
                <div className="flex items-center justify-between p-4 bg-white shadow rounded-lg cursor-pointer">
                  <div className="flex items-center">
                    <div className="bg-emerald-200 p-2 rounded-full">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 13.2422V20H22V22H2V20H3V13.2422C1.79401 12.435 1 11.0602 1 9.5C1 8.67286 1.22443 7.87621 1.63322 7.19746L4.3453 2.5C4.52393 2.1906 4.85406 2 5.21132 2H18.7887C19.1459 2 19.4761 2.1906 19.6547 2.5L22.3575 7.18172C22.7756 7.87621 23 8.67286 23 9.5C23 11.0602 22.206 12.435 21 13.2422ZM19 13.9725C18.8358 13.9907 18.669 14 18.5 14C17.2409 14 16.0789 13.478 15.25 12.6132C14.4211 13.478 13.2591 14 12 14C10.7409 14 9.5789 13.478 8.75 12.6132C7.9211 13.478 6.75911 14 5.5 14C5.331 14 5.16417 13.9907 5 13.9725V20H19V13.9725ZM5.78865 4L3.35598 8.21321C3.12409 8.59843 3 9.0389 3 9.5C3 10.8807 4.11929 12 5.5 12C6.53096 12 7.44467 11.3703 7.82179 10.4295C8.1574 9.59223 9.3426 9.59223 9.67821 10.4295C10.0553 11.3703 10.969 12 12 12C13.031 12 13.9447 11.3703 14.3218 10.4295C14.6574 9.59223 15.8426 9.59223 16.1782 10.4295C16.5553 11.3703 17.469 12 18.5 12C19.8807 12 21 10.8807 21 9.5C21 9.0389 20.8759 8.59843 20.6347 8.19746L18.2113 4H5.78865Z"
                          fill="#2EC99D"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="font-nunito text-[15px] font-bold text-black mb-1">
                        {notification.title}
                      </p>
                      <p className="font-nunito text-[12px] font-semibold text-gray-500">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-400 text-s">
                    <svg
                      width="17"
                      height="18"
                      viewBox="0 0 12 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.00031 7.4015L8.47521 4.92664L9.18231 5.63374L6.00031 8.81575L2.81836 5.63374L3.52546 4.92664L6.00031 7.4015Z"
                        fill="#7D848D"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </LayoutUtama>
  )
}

// Fungsi untuk menampilkan ikon berdasarkan judul notifikasi dan link yang relevan
function getLink(title?: string): string {
  if (!title) {
    return '/'
  }

  switch (title) {
    case 'Perlu Dikirim':
      return '/seller/dashboard/notifikasi/perlu-dikirim';
    case 'Selesai':
      return '/seller/dashboard/notifikasi/selesai';
    case 'Negosiasi':
      return '/seller/dashboard/notifikasi/negosiasi';
    case 'Dikomplain':
      return '/seller/dashboard/notifikasi/dikomplain';
    case 'Diulas':
      return '/seller/dashboard/notifikasi/diulas';
      case 'Dana Masuk':
        return '/seller/dashboard/notifikasi/dana-masuk';
    default:
      return '/';
  }
}

// Fungsi untuk menampilkan ikon berdasarkan judul notifikasi
function getIcon(title: string) {
  switch (title) {
    case 'Perlu Dikirim':
      return (
        <div className="bg-emerald-100 p-2 rounded-full">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z"
              fill="#2EC99D"
            />
          </svg>
        </div>
      )
    case 'Selesai':
      return (
        <div className="bg-emerald-100 p-2 rounded-full">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"
              fill="#2EC99D"
            />
          </svg>
        </div>
      )
    case 'Negosiasi':
      return (
        <div className="bg-emerald-100 p-2 rounded-full">
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
      )
    case 'Dikomplain':
      return (
        <div className="bg-emerald-100 p-2 rounded-full">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"
              fill="#2EC99D"
            />
          </svg>
        </div>
      )
    case 'Diulas':
      return (
        <div className="bg-emerald-100 p-2 rounded-full">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 12H20V5H4V18.3851L5.76282 17H12V19H6.45455L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V12ZM14.145 19.071C14.0505 18.7301 14 18.371 14 18C14 17.629 14.0505 17.2699 14.145 16.929L13.1699 16.366L14.1699 14.634L15.1459 15.1975C15.6475 14.6867 16.2851 14.31 17 14.126V13H19V14.126C19.7149 14.31 20.3525 14.6867 20.8541 15.1975L21.8301 14.634L22.8301 16.366L21.855 16.929C21.9495 17.2699 22 17.629 22 18C22 18.371 21.9495 18.7301 21.855 19.071L22.8301 19.634L21.8301 21.366L20.8541 20.8025C20.3525 21.3133 19.7149 21.69 19 21.874V23H17V21.874C16.2851 21.69 15.6475 21.3133 15.1459 20.8025L14.1699 21.366L13.1699 19.634L14.145 19.071ZM18 20C19.1046 20 20 19.1046 20 18C20 16.8954 19.1046 16 18 16C16.8954 16 16 16.8954 16 18C16 19.1046 16.8954 20 18 20Z"
              fill="#2EC99D"
            />
          </svg>
        </div>
      )
    case 'Dana Masuk':
      return (
        <div className="bg-emerald-100 p-2 rounded-full">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.00391 3.00293H21.0039C21.5562 3.00293 22.0039 3.45064 22.0039 4.00293V20.0029C22.0039 20.5552 21.5562 21.0029 21.0039 21.0029H3.00391C2.45163 21.0029 2.00391 20.5552 2.00391 20.0029V4.00293C2.00391 3.45064 2.45163 3.00293 3.00391 3.00293ZM4.00391 5.00293V19.0029H20.0039V5.00293H4.00391ZM8.50391 14.0029H14.0039C14.28 14.0029 14.5039 13.7791 14.5039 13.5029C14.5039 13.2268 14.28 13.0029 14.0039 13.0029H10.0039C8.6232 13.0029 7.50391 11.8837 7.50391 10.5029C7.50391 9.12221 8.6232 8.00293 10.0039 8.00293H11.0039V6.00293H13.0039V8.00293H15.5039V10.0029H10.0039C9.72777 10.0029 9.50391 10.2268 9.50391 10.5029C9.50391 10.7791 9.72777 11.0029 10.0039 11.0029H14.0039C15.3846 11.0029 16.5039 12.1222 16.5039 13.5029C16.5039 14.8837 15.3846 16.0029 14.0039 16.0029H13.0039V18.0029H11.0039V16.0029H8.50391V14.0029Z"
              fill="#2EC99D"
            />
          </svg>
        </div>
      )
    default:
      return null
  }
}

export default NotificationPage
