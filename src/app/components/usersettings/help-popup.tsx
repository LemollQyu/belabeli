'use client'
import { useState } from 'react'
import Link from 'next/link'

const categories = [
  {
    label: 'Pesanan',
    href: '/user-settings/pusat-bantuan/bantuan',
    icon: (
      <Link href="/user-settings/pusat-bantuan/bantuan">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 2H4C3.44772 2 3 2.44772 3 3V21C3 21.5523 3.44772 22 4 22H12.2547C11.4638 20.8662 11 19.4872 11 18C11 14.134 14.134 11 18 11C19.0736 11 20.0907 11.2417 21 11.6736V7L16 2ZM13.7857 15.3269C13.8246 14.5997 14.3858 14.0083 15.11 13.9313L15.9807 13.8389C16.0841 13.8279 16.1815 13.7845 16.2589 13.715L16.9102 13.1299C17.4519 12.6431 18.2669 12.6218 18.8334 13.0795L19.5145 13.6298C19.5954 13.6951 19.6949 13.7333 19.7988 13.7389L20.6731 13.7857C21.4003 13.8246 21.9917 14.3858 22.0687 15.11L22.1611 15.9807C22.1721 16.0841 22.2155 16.1815 22.285 16.2589L22.8701 16.9102C23.3569 17.4519 23.3782 18.2669 22.9205 18.8334L22.3702 19.5145C22.3049 19.5954 22.2667 19.6949 22.2611 19.7988L22.2143 20.6731C22.1754 21.4003 21.6142 21.9917 20.89 22.0687L20.0193 22.1611C19.9159 22.1721 19.8185 22.2155 19.7411 22.285L19.0898 22.8701C18.5481 23.3569 17.7331 23.3782 17.1666 22.9205L16.4855 22.3702C16.4046 22.3049 16.3051 22.2667 16.2012 22.2611L15.3269 22.2143C14.5997 22.1754 14.0083 21.6142 13.9313 20.89L13.8389 20.0193C13.8279 19.9159 13.7845 19.8185 13.715 19.7411L13.1299 19.0898C12.6431 18.5481 12.6218 17.733 13.0795 17.1666L13.6298 16.4855C13.6951 16.4046 13.7333 16.3051 13.7389 16.2012L13.7857 15.3269ZM21.0303 17.0303L19.9697 15.9697L17.5 18.4393L16.0303 16.9697L14.9697 18.0303L16.9697 20.0303L17.5 20.5607L18.0303 20.0303L21.0303 17.0303Z"
            fill="#51D7B1"
          />
        </svg>
      </Link>
    ),
  },
  {
    label: 'Pengiriman',
    href: '/user-settings/pusat-bantuan/bantuan',
    icon: (
      <Link href="/user-settings/pusat-bantuan/bantuan">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8ZM17 10V13H21V12.715L18.9917 10H17Z"
            fill="#51D7B1"
          />
        </svg>
      </Link>
    ),
  },
  {
    label: 'Pembayaran',
    href: '/user-settings/pusat-bantuan/bantuan',
    icon: (
      <Link href="/user-settings/pusat-bantuan/bantuan">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.0049 2L18.3032 4.28071C18.7206 4.41117 19.0049 4.79781 19.0049 5.23519V7H21.0049C21.5572 7 22.0049 7.44772 22.0049 8V10H9.00488V8C9.00488 7.44772 9.4526 7 10.0049 7H17.0049V5.97L11.0049 4.094L5.00488 5.97V13.3744C5.00488 14.6193 5.58406 15.7884 6.56329 16.5428L6.75154 16.6793L11.0049 19.579L14.7869 17H10.0049C9.4526 17 9.00488 16.5523 9.00488 16V12H22.0049V16C22.0049 16.5523 21.5572 17 21.0049 17L17.7848 17.0011C17.3982 17.5108 16.9276 17.9618 16.3849 18.3318L11.0049 22L5.62486 18.3318C3.98563 17.2141 3.00488 15.3584 3.00488 13.3744V5.23519C3.00488 4.79781 3.28913 4.41117 3.70661 4.28071L11.0049 2Z"
            fill="#51D7B1"
          />
        </svg>
      </Link>
    ),
  },
  {
    label: 'Promosi',
    href: '/user-settings/pusat-bantuan/bantuan',
    icon: (
      <Link href="/user-settings/pusat-bantuan/bantuan">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.0049 12.0029V14.0029C23.0049 17.3167 18.08 20.0029 12.0049 20.0029C6.03824 20.0029 1.18114 17.4117 1.00957 14.1799L1.00488 14.0029V12.0029C1.00488 15.3167 5.92975 18.0029 12.0049 18.0029C18.08 18.0029 23.0049 15.3167 23.0049 12.0029ZM12.0049 4.00293C18.08 4.00293 23.0049 6.68922 23.0049 10.0029C23.0049 13.3167 18.08 16.0029 12.0049 16.0029C5.92975 16.0029 1.00488 13.3167 1.00488 10.0029C1.00488 6.68922 5.92975 4.00293 12.0049 4.00293Z"
            fill="#51D7B1"
          />
        </svg>
      </Link>
    ),
  },
  {
    label: 'Lainnya',
    icon: (
      <Link href="/user-settings/pusat-bantuan/bantuan">
        <svg
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 12H18V14H0V12ZM0 6H3V9H0V6ZM5 6H8V9H5V6ZM0 0H3V3H0V0ZM10 0H13V3H10V0ZM15 0H18V3H15V0ZM10 6H13V9H10V6ZM15 6H18V9H15V6ZM5 0H8V3H5V0Z"
            fill="#51D7B1"
          />
        </svg>
      </Link>
    ),
  },
]

// SVG icons as inline components
const icons = {
  security: {
    icon: (
      <Link href="/user-settings/pusat-bantuan/bantuan">
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 8H17C17.5523 8 18 8.4477 18 9V19C18 19.5523 17.5523 20 17 20H1C0.44772 20 0 19.5523 0 19V9C0 8.4477 0.44772 8 1 8H2V7C2 3.13401 5.13401 0 9 0C12.866 0 16 3.13401 16 7V8ZM14 8V7C14 4.23858 11.7614 2 9 2C6.23858 2 4 4.23858 4 7V8H14ZM8 12V16H10V12H8Z"
            fill="#51D7B1"
          />
        </svg>
      </Link>
    ),
    label: 'Keamanan',
  },
  account: {
    icon: (
      <Link href="/user-settings/pusat-bantuan/bantuan">
        <svg
          width="16"
          height="21"
          viewBox="0 0 16 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 21H0V19C0 16.2386 2.23858 14 5 14H11C13.7614 14 16 16.2386 16 19V21ZM8 12C4.68629 12 2 9.3137 2 6C2 2.68629 4.68629 0 8 0C11.3137 0 14 2.68629 14 6C14 9.3137 11.3137 12 8 12Z"
            fill="#51D7B1"
          />
        </svg>
      </Link>
    ),
    label: 'Akun',
  },
  refund: {
    icon: (
      <Link href="/user-settings/pusat-bantuan/bantuan">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.0049 0C15.5277 0 20.0049 4.47715 20.0049 10C20.0049 15.5228 15.5277 20 10.0049 20C7.57847 20 5.3539 19.1358 3.62216 17.6985L3.37815 17.4892L4.27949 15.5875C5.73229 17.0759 7.76067 18 10.0049 18C14.4232 18 18.0049 14.4183 18.0049 10C18.0049 5.58172 14.4232 2 10.0049 2C5.66997 2 2.14034 5.44784 2.00869 9.7508L2.00488 10H4.50488L1.79854 15.7161C0.667959 14.096 0.004879 12.1254 0.004879 10C0.004879 4.47715 4.48204 0 10.0049 0ZM11.0049 4V6H13.5049V8H8.0049C7.72874 8 7.50488 8.2239 7.50488 8.5C7.50488 8.7455 7.68176 8.9496 7.91501 8.9919L8.0049 9H12.0049C13.3856 9 14.5049 10.1193 14.5049 11.5C14.5049 12.8807 13.3856 14 12.0049 14H11.0049V16H9.0049V14H6.50488V12H12.0049C12.281 12 12.5049 11.7761 12.5049 11.5C12.5049 11.2545 12.328 11.0504 12.0948 11.0081L12.0049 11H8.0049C6.62417 11 5.50488 9.8807 5.50488 8.5C5.50488 7.11929 6.62417 6 8.0049 6H9.0049V4H11.0049Z"
            fill="#51D7B1"
          />
        </svg>
      </Link>
    ),
    label: 'Refund',
  },
  return: {
    icon: (
      <Link href="/user-settings/pusat-bantuan/bantuan">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2C12.7486 2 15.1749 3.38626 16.6156 5.5H14V7.5H20V1.5H18V3.99936C16.1762 1.57166 13.2724 0 10 0C4.47715 0 0 4.47715 0 10H2C2 5.58172 5.58172 2 10 2ZM18 10C18 14.4183 14.4183 18 10 18C7.25144 18 4.82508 16.6137 3.38443 14.5H6V12.5H0V18.5H2V16.0006C3.82381 18.4283 6.72764 20 10 20C15.5228 20 20 15.5228 20 10H18Z"
            fill="#51D7B1"
          />
        </svg>
      </Link>
    ),
    label: 'Return',
  },
  balance: {
    icon: (
      <Link href="/user-settings/pusat-bantuan/bantuan">
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.0049 7V17C20.0049 17.5523 19.5572 18 19.0049 18H1.00488C0.452603 18 0.00488281 17.5523 0.00488281 17V7H20.0049ZM20.0049 5H0.00488281V1C0.00488281 0.44771 0.452603 0 1.00488 0H19.0049C19.5572 0 20.0049 0.44771 20.0049 1V5ZM13.0049 13V15H17.0049V13H13.0049Z"
            fill="#51D7B1"
          />
        </svg>
      </Link>
    ),
    label: 'Saldo',
  },
  withdrawal: {
    icon: (
      <Link href="/user-settings/pusat-bantuan/bantuan">
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.00488 0.00292969H19.0049C19.5572 0.00292969 20.0049 0.45064 20.0049 1.00293V17.0029C20.0049 17.5552 19.5572 18.0029 19.0049 18.0029H1.00488C0.452599 18.0029 0.004879 17.5552 0.004879 17.0029V1.00293C0.004879 0.45064 0.452599 0.00292969 1.00488 0.00292969ZM6.50488 11.0029V13.0029H9.0049V15.0029H11.0049V13.0029H12.0049C13.3856 13.0029 14.5049 11.8837 14.5049 10.5029C14.5049 9.12218 13.3856 8.00288 12.0049 8.00288H8.0049C7.72874 8.00288 7.50488 7.77908 7.50488 7.50288C7.50488 7.22678 7.72874 7.00288 8.0049 7.00288H13.5049V5.00293H11.0049V3.00293H9.0049V5.00293H8.0049C6.62417 5.00293 5.50488 6.12221 5.50488 7.50288C5.50488 8.88368 6.62417 10.0029 8.0049 10.0029H12.0049C12.281 10.0029 12.5049 10.2268 12.5049 10.5029C12.5049 10.7791 12.281 11.0029 12.0049 11.0029H6.50488Z"
            fill="#51D7B1"
          />
        </svg>
      </Link>
    ),
    label: 'Tarik Dana',
  },
  complaint: {
    icon: (
      <Link href="/user-settings/pusat-bantuan/bantuan">
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 5.99374C0 2.68349 2.67654 0 6.00066 0H13.9993C17.3134 0 20 2.69478 20 5.99374V18H6.00066C2.68659 18 0 15.3052 0 12.0063V5.99374ZM12 8V10H14V8H12ZM6 8V10H8V8H6Z"
            fill="#51D7B1"
          />
        </svg>
      </Link>
    ),
    label: 'Komplain',
  },
  promotion: {
    icon: (
      <Link href="/user-settings/pusat-bantuan/bantuan">
        <svg
          width="22"
          height="16"
          viewBox="0 0 22 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.0049 8.00288V10.0029C22.0049 13.3167 17.08 16.0029 11.0049 16.0029C5.03824 16.0029 0.181139 13.4117 0.00956905 10.1799L0.004879 10.0029V8.00288C0.004879 11.3167 4.92975 14.0029 11.0049 14.0029C17.08 14.0029 22.0049 11.3167 22.0049 8.00288ZM11.0049 0.00292969C17.08 0.00292969 22.0049 2.68922 22.0049 6.00288C22.0049 9.31668 17.08 12.0029 11.0049 12.0029C4.92975 12.0029 0.004879 9.31668 0.004879 6.00288C0.004879 2.68922 4.92975 0.00292969 11.0049 0.00292969Z"
            fill="#51D7B1"
          />
        </svg>
      </Link>
    ),
    label: 'Promosi',
  },
  voucher: {
    icon: (
      <Link href="/user-settings/pusat-bantuan/bantuan">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.9461 1.09411C11.8248 0.138549 10.1756 0.138559 9.0544 1.0941L7.70636 2.24286C7.54619 2.37935 7.34705 2.46183 7.13728 2.47857L5.3718 2.61946C3.90327 2.73665 2.73714 3.90278 2.61995 5.3713L2.47907 7.13678C2.46234 7.34654 2.37983 7.54573 2.24334 7.70589L1.09458 9.0539C0.139038 10.1752 0.139048 11.8243 1.0946 12.9455L2.24336 14.2936C2.37983 14.4538 2.46232 14.6529 2.47906 14.8627L2.61997 16.6281C2.73716 18.0966 3.9033 19.2627 5.37184 19.3799L7.13729 19.5209C7.34705 19.5376 7.54615 19.6201 7.70631 19.7566L9.0543 20.9053C10.1756 21.8608 11.8248 21.8609 12.9461 20.9053L14.2941 19.7566C14.4542 19.6201 14.6533 19.5376 14.8631 19.5208L16.6286 19.3799C18.0971 19.2628 19.2632 18.0967 19.3805 16.6281L19.5213 14.8627C19.538 14.6529 19.6206 14.4537 19.757 14.2935L20.9058 12.9456C21.8614 11.8243 21.8614 10.1751 20.9058 9.0539L19.757 7.70585C19.6205 7.54568 19.5381 7.34654 19.5214 7.13679L19.3805 5.37131C19.2633 3.9028 18.0971 2.73663 16.6286 2.61945L14.8631 2.47856C14.6533 2.46182 14.4542 2.37935 14.2941 2.24286L12.9461 1.09411ZM13.8284 6.75718L15.2426 8.1714L8.17151 15.2425L6.7573 13.8282L13.8284 6.75718ZM9.2322 9.232C8.64638 9.8178 7.69664 9.8178 7.11085 9.232C6.52506 8.6463 6.52506 7.69652 7.11085 7.11073C7.69664 6.52494 8.64638 6.52494 9.2322 7.11073C9.818 7.69652 9.818 8.6463 9.2322 9.232ZM12.7677 14.8889C12.1819 14.3031 12.1819 13.3534 12.7677 12.7676C13.3535 12.1818 14.3032 12.1818 14.889 12.7676C15.4748 13.3534 15.4748 14.3031 14.889 14.8889C14.3032 15.4747 13.3535 15.4747 12.7677 14.8889Z"
            fill="#51D7B1"
          />
        </svg>
      </Link>
    ),
    label: 'Voucher',
  },
  negotiation: {
    icon: (
      <Link href="/user-settings/pusat-bantuan/bantuan">
        <svg
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 0V4H0V0H9ZM13 14V18H0V14H13ZM19 7V11H0V7H19Z"
            fill="#51D7B1"
          />
        </svg>
      </Link>
    ),
    label: 'Negosiasi',
  },
}

export default function HelpPopup() {
  const [isOpen, setIsOpen] = useState(false)

  const openPopup = () => setIsOpen(true)
  const closePopup = () => setIsOpen(false)

  const navigateToHelp = () => {}

  return (
    <>
      <div className="flex justify-around mt-4 space-x-2 font-nunito mb-6">
        {categories.map((category) => (
          <div key={category.label} className="flex flex-col items-center">
            <Link
              href={category.href || '#'} // Gunakan "#" sebagai nilai fallback
              className="flex items-center justify-center w-[50px] h-[50px] rounded-[12px] bg-white shadow-md"
              style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)' }}
              onClick={() => category.label === 'Lainnya' && setIsOpen(true)}
            >
              <div className="p-2 text-[#51D7B1]">{category.icon}</div>
            </Link>
            <span className="text-xs mt-2 font-medium text-black">
              {category.label}
            </span>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-end justify-center z-50">
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closePopup}
          ></div>

          {/* Popup container */}
          <div className="bg-white p-6 h-[300px] rounded-t-[24px] w-full max-w-md shadow-lg z-50 animate-slide-up relative">
            {/* Title */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Pilih Bantuan Sesuai Topik
              </h2>
              <button
                onClick={closePopup}
                className="text-2xl font-bold text-gray-600"
              >
                &times;
              </button>
            </div>

            {/* Icons Grid */}
            <div className="grid grid-cols-5 gap-2 justify-items-center mt-4 font-nunito mb-6">
              {Object.entries(icons).map(([key, { icon, label }]) => (
                <div key={key} className="flex flex-col items-center">
                  <button
                    type="button"
                    className="flex items-center justify-center w-[55px] h-[55px] rounded-[12px] bg-white shadow-md"
                    style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)' }}
                  >
                    <div className="p-2 text-[#51D7B1]">{icon}</div>
                  </button>
                  <span className="text-xs mt-2 font-medium text-black">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
