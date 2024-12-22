// pages/account.tsx

'use client'
import { useState } from 'react'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LayoutUtama from '@/app/layouts/layout-utama'
import Header from '@/app/layouts/header'

const SellerSettings: React.FC = () => {
  const router = useRouter()

  const [stats, setStats] = useState({
    posts: 30,
    followers: 200,
    following: 1218,
  })

  const handleBack = () => {
    router.back()
  }

  return (
    <>
      <LayoutUtama>
        <Header title="Akun Saya" children={undefined} />
        <div className="container w-[400px] mx-auto p-4 mt-20 font-nunito">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src="/profile.jpg"
                alt="User Avatar"
                className="w-[100px] h-[100px] rounded-full"
              />
              {/* Button Plus */}
              <Link href="/user-settings/profile">
                <div className="absolute bottom-0 right-0 bg-[#51D7B1] w-6 h-6 rounded-full flex items-center justify-center cursor-pointer">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V13V17V7V11Z"
                      fill="#FDFDFD"
                    />
                    <path
                      d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"
                      fill="#51D7B1"
                    />
                  </svg>
                </div>
              </Link>
            </div>
            {/* User Name */}
            <p className="text-[16px] font-semibold text-center">Annas Aulya</p>
            {/* Stats Section */}
            <div className="flex w-full justify-center space-x-16 text-center">
              <div>
                <p className="text-[16px] font-semibold">{stats.posts}</p>
                <p className="text-[14px] text-gray-500">Postingan</p>
              </div>
              <div>
                <p className="text-[16px] font-semibold">{stats.followers}</p>
                <p className="text-[14px] text-gray-500">Pengikut</p>
              </div>
              <div>
                <p className="text-[16px] font-semibold">{stats.following}</p>
                <p className="text-[14px] text-gray-500">Mengikuti</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}               
           <Link href="/seller/dashboard">
          <div className="flex justify-between mt-6 space-x-3">
              <button className="flex-1 bg-[#51D7B1] rounded-lg p-2 mr-2 flex items-center justify-between px-4">
                {/* Icon Toko */}
                <div className="flex items-center space-x-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 20V22H2V20H3V13.2422C1.79401 12.435 1 11.0602 1 9.5C1 8.67286 1.22443 7.87621 1.63322 7.19746L4.3453 2.5C4.52393 2.1906 4.85406 2 5.21132 2H18.7887C19.1459 2 19.4761 2.1906 19.6547 2.5L22.3575 7.18172C22.7756 7.87621 23 8.67286 23 9.5C23 11.0602 22.206 12.435 21 13.2422V20H22ZM5.78865 4L3.35598 8.21321C3.12409 8.59843 3 9.0389 3 9.5C3 10.8807 4.11929 12 5.5 12C6.53096 12 7.44467 11.3703 7.82179 10.4295C8.1574 9.59223 9.3426 9.59223 9.67821 10.4295C10.0553 11.3703 10.969 12 12 12C13.031 12 13.9447 11.3703 14.3218 10.4295C14.6574 9.59223 15.8426 9.59223 16.1782 10.4295C16.5553 11.3703 17.469 12 18.5 12C19.8807 12 21 10.8807 21 9.5C21 9.0389 20.8759 8.59843 20.6347 8.19746L18.2113 4H5.78865Z"
                      fill="#FDFDFD"
                    />
                  </svg>
                  {/* Text Toko Saya */}
                  <span
                    className="text-center"
                    style={{
                      color: 'var(--Light-Text-Color, #FDFDFD)',
                      fontFamily: 'Nunito',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      lineHeight: '150%',
                      letterSpacing: '-0.276px',
                    }}
                  >
                    Toko Saya
                  </span>
                </div>

                {/* Icon Panah di End */}
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5332 11.9999L8.71289 7.05006L10.0901 5.63586L16.2878 11.9999L10.0901 18.3638L8.71289 16.9496L13.5332 11.9999Z"
                    fill="white"
                  />
                </svg>
              </button>
            {/* </Link> */}
          </div>
          </Link>

          {/* User Activities */}
          <div className="bg-white rounded-lg border-2 mt-6 p-4 shadow-md">
            <h3
              className="text-sm font-semibold mb-3"
              style={{
                color: 'var(--Light-Text-Color, #1B1E28)',
                fontFamily: 'Nunito',
                fontSize: '16px',
                fontWeight: 700,
                lineHeight: '150%', // 24px
                letterSpacing: '-0.368px',
              }}
            >
              Aktivitas Saya
            </h3>
            <div className="flex flex-col space-y-2">
              <Link href="/user-settings/profile">
                <ActivityItem
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                        fill="black"
                      />
                    </svg>
                  }
                  label="Akun Sosial Media"
                />
              </Link>
              <Link href="/user-settings/profile">
                <ActivityItem
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.7279 9.57628L14.3137 8.16207L5 17.4758V18.89H6.41421L15.7279 9.57628ZM17.1421 8.16207L18.5563 6.74786L17.1421 5.33364L15.7279 6.74786L17.1421 8.16207ZM7.24264 20.89H3V16.6473L16.435 3.21232C16.8256 2.8218 17.4587 2.8218 17.8492 3.21232L20.6777 6.04075C21.0682 6.43127 21.0682 7.06444 20.6777 7.45496L7.24264 20.89Z"
                        fill="black"
                      />
                    </svg>
                  }
                  label="Informasi Akun"
                />
              </Link>
              <Link href="/transaksi/riwayat">
                <ActivityItem
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 8V12H19V9H14V4H5V20H11V22H3.9934C3.44495 22 3 21.556 3 21.0082V2.9918C3 2.45531 3.4487 2 4.00221 2H14.9968L21 8ZM13.7857 15.3269C13.8246 14.5997 14.3858 14.0083 15.11 13.9313L15.9807 13.8389C16.0841 13.8279 16.1815 13.7845 16.2589 13.715L16.9102 13.1299C17.4519 12.6431 18.2669 12.6218 18.8334 13.0795L19.5145 13.6298C19.5954 13.6951 19.6949 13.7333 19.7988 13.7389L20.6731 13.7857C21.4003 13.8246 21.9917 14.3858 22.0687 15.11L22.1611 15.9807C22.1721 16.0841 22.2155 16.1815 22.285 16.2589L22.8701 16.9102C23.3569 17.4519 23.3782 18.2669 22.9205 18.8334L22.3702 19.5145C22.3049 19.5954 22.2667 19.6949 22.2611 19.7988L22.2143 20.6731C22.1754 21.4003 21.6142 21.9917 20.89 22.0687L20.0193 22.1611C19.9159 22.1721 19.8185 22.2155 19.7411 22.285L19.0898 22.8701C18.5481 23.3569 17.7331 23.3782 17.1666 22.9205L16.4855 22.3702C16.4046 22.3049 16.3051 22.2667 16.2012 22.2611L15.3269 22.2143C14.5997 22.1754 14.0083 21.6142 13.9313 20.89L13.8389 20.0193C13.8279 19.9159 13.7845 19.8185 13.715 19.7411L13.1299 19.0898C12.6431 18.5481 12.6218 17.733 13.0795 17.1666L13.6298 16.4855C13.6951 16.4046 13.7333 16.3051 13.7389 16.2012L13.7857 15.3269ZM21.0303 17.0303L19.9697 15.9697L17.5 18.4393L16.0303 16.9697L14.9697 18.0303L17.5 20.5607L21.0303 17.0303Z"
                        fill="black"
                      />
                    </svg>
                  }
                  label="Riwayat Transaksi"
                />
              </Link>
              <Link href="user-settings/ulasan">
                <ActivityItem
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17ZM11.9998 14.6564L14.8165 16.3769L14.0507 13.1664L16.5574 11.0192L13.2673 10.7554L11.9998 7.70792L10.7323 10.7554L7.44228 11.0192L9.94893 13.1664L9.18311 16.3769L11.9998 14.6564Z"
                        fill="black"
                      />
                    </svg>
                  }
                  label="Ulasan"
                />
              </Link>
              <Link href="user-settings/riwayat-pencarian">
                <ActivityItem
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                        fill="black"
                      />
                    </svg>
                  }
                  label="Riwayat Pencarian"
                />
              </Link>
              <Link href="user-settings/terakhir-dilihat">
                <ActivityItem
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"
                        fill="black"
                      />
                    </svg>
                  }
                  label="Terakhir Dilihat"
                />
              </Link>
              <Link href="user-settings/toko-diikuti">
                <ActivityItem
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 13.2422V20H22V22H2V20H3V13.2422C1.79401 12.435 1 11.0602 1 9.5C1 8.67286 1.22443 7.87621 1.63322 7.19746L4.3453 2.5C4.52393 2.1906 4.85406 2 5.21132 2H18.7887C19.1459 2 19.4761 2.1906 19.6547 2.5L22.3575 7.18172C22.7756 7.87621 23 8.67286 23 9.5C23 11.0602 22.206 12.435 21 13.2422ZM19 13.9725C18.8358 13.9907 18.669 14 18.5 14C17.2409 14 16.0789 13.478 15.25 12.6132C14.4211 13.478 13.2591 14 12 14C10.7409 14 9.5789 13.478 8.75 12.6132C7.9211 13.478 6.75911 14 5.5 14C5.331 14 5.16417 13.9907 5 13.9725V20H19V13.9725ZM5.78865 4L3.35598 8.21321C3.12409 8.59843 3 9.0389 3 9.5C3 10.8807 4.11929 12 5.5 12C6.53096 12 7.44467 11.3703 7.82179 10.4295C8.1574 9.59223 9.3426 9.59223 9.67821 10.4295C10.0553 11.3703 10.969 12 12 12C13.031 12 13.9447 11.3703 14.3218 10.4295C14.6574 9.59223 15.8426 9.59223 16.1782 10.4295C16.5553 11.3703 17.469 12 18.5 12C19.8807 12 21 10.8807 21 9.5C21 9.0389 20.8759 8.59843 20.6347 8.19746L18.2113 4H5.78865Z"
                        fill="black"
                      />
                    </svg>
                  }
                  label="Toko yang diikuti"
                />
              </Link>
              <Link href="/general-settings">
                <ActivityItem
                  icon={
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.89603 19.8335C3.39174 18.96 3.01323 18.0485 2.75488 17.1197C3.88943 16.5408 4.66634 15.3612 4.66634 14.0001C4.66634 12.6402 3.8906 11.4612 2.75745 10.8819C3.27862 9.00251 4.26833 7.25223 5.67553 5.82159C6.74415 6.51477 8.15424 6.59781 9.333 5.91725C10.5118 5.23669 11.1449 3.97399 11.0789 2.70196C13.0215 2.19862 15.0321 2.21663 16.9203 2.70497C16.8554 3.97599 17.4884 5.23722 18.6663 5.91725C19.8451 6.59779 21.2551 6.51477 22.3237 5.82167C22.9988 6.50975 23.599 7.29334 24.1033 8.16683C24.6076 9.0403 24.9861 9.95187 25.2444 10.8806C24.1099 11.4595 23.333 12.6391 23.333 14.0001C23.333 15.3602 24.1087 16.5391 25.2419 17.1184C24.7207 18.9978 23.731 20.748 22.3238 22.1787C21.2551 21.4856 19.8451 21.4025 18.6663 22.083C17.4875 22.7636 16.8545 24.0264 16.9204 25.2984C14.9779 25.8017 12.9673 25.7837 11.079 25.2953C11.1439 24.0243 10.5108 22.7631 9.333 22.083C8.15427 21.4025 6.74425 21.4855 5.67564 22.1786C5.00053 21.4905 4.40034 20.707 3.89603 19.8335ZM10.4997 20.0624C11.7729 20.7975 12.6874 21.9597 13.1253 23.2935C13.7067 23.3488 14.2919 23.3496 14.8734 23.2953C15.3111 21.9609 16.2258 20.7978 17.4996 20.0624C18.7735 19.3268 20.2382 19.1163 21.6127 19.4044C21.9504 18.9279 22.2423 18.4206 22.485 17.8896C21.549 16.8434 20.9996 15.4704 20.9996 14.0001C20.9996 12.5299 21.549 11.157 22.485 10.1108C22.3636 9.84717 22.2294 9.58784 22.0825 9.33349C21.9357 9.07914 21.7782 8.83331 21.6105 8.59641C20.2366 8.8838 18.7729 8.67308 17.4996 7.93797C16.2263 7.20286 15.312 6.04054 14.8739 4.70689C14.2927 4.65158 13.7074 4.65079 13.126 4.70499C12.6882 6.03941 11.7735 7.2025 10.4997 7.93797C9.22576 8.67347 7.76119 8.88401 6.38666 8.59595C6.04899 9.0724 5.75707 9.57962 5.51432 10.1107C6.45028 11.1569 6.99967 12.5299 6.99967 14.0001C6.99967 15.4704 6.4503 16.8433 5.51432 17.8895C5.63578 18.1531 5.76991 18.4125 5.91677 18.6668C6.06362 18.9212 6.22113 19.167 6.3888 19.4039C7.76273 19.1166 9.22644 19.3273 10.4997 20.0624ZM13.9996 17.5001C12.0667 17.5001 10.4997 15.9332 10.4997 14.0001C10.4997 12.0672 12.0667 10.5002 13.9996 10.5002C15.9327 10.5002 17.4996 12.0672 17.4996 14.0001C17.4996 15.9332 15.9327 17.5001 13.9996 17.5001ZM13.9996 15.1668C14.644 15.1668 15.1663 14.6445 15.1663 14.0001C15.1663 13.3558 14.644 12.8335 13.9996 12.8335C13.3553 12.8335 12.833 13.3558 12.833 14.0001C12.833 14.6445 13.3553 15.1668 13.9996 15.1668Z"
                        fill="black"
                      />
                    </svg>
                  }
                  label="Pengaturan Akun"
                />
              </Link>
            </div>
          </div>

          {/* Help Center */}
          <div className="bg-white rounded-lg border-2 mt-6 p-4 mb-6 mb-16 shadow-md">
            <h3
              className="text-sm font-semibold mb-3"
              style={{
                color: 'var(--Light-Text-Color, #1B1E28)',
                fontFamily: 'Nunito',
                fontSize: '16px',
                fontWeight: 700,
                lineHeight: '150%', // 24px
                letterSpacing: '-0.368px',
              }}
            >
              Pusat Bantuan
            </h3>
            <div className="flex flex-col space-y-2">
              <Link href="user-settings/pusat-bantuan">
                <ActivityItem
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM13 13.3551V14H11V12.5C11 11.9477 11.4477 11.5 12 11.5C12.8284 11.5 13.5 10.8284 13.5 10C13.5 9.17157 12.8284 8.5 12 8.5C11.2723 8.5 10.6656 9.01823 10.5288 9.70577L8.56731 9.31346C8.88637 7.70919 10.302 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10C15.5 11.5855 14.4457 12.9248 13 13.3551Z"
                        fill="black"
                      />
                    </svg>
                  }
                  label="Pusat Bantuan"
                />
              </Link>
              <Link href="user-settings/live-chat">
                <ActivityItem
                  icon={
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 7C21.1046 7 22 7.89543 22 9V13C22 14.1046 21.1046 15 20 15H18.9381C18.446 18.9463 15.0796 22 11 22V20C14.3137 20 17 17.3137 17 14V8C17 4.68629 14.3137 2 11 2C7.68629 2 5 4.68629 5 8V15H2C0.89543 15 0 14.1046 0 13V9C0 7.89543 0.89543 7 2 7H3.06189C3.55399 3.05369 6.92038 0 11 0C15.0796 0 18.446 3.05369 18.9381 7H20ZM6.75944 14.7849L7.81958 13.0887C8.74161 13.6662 9.8318 14 11 14C12.1682 14 13.2584 13.6662 14.1804 13.0887L15.2406 14.7849C14.0112 15.5549 12.5576 16 11 16C9.4424 16 7.98882 15.5549 6.75944 14.7849Z"
                        fill="black"
                      />
                    </svg>
                  }
                  label="Live Chat"
                />
              </Link>
              <Link href="user-settings/hapus-akun">
                <ActivityItem
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.74462 21.7446C5.30798 20.7219 2 16.7473 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 16.7473 18.692 20.7219 14.2554 21.7446L12 24L9.74462 21.7446ZM7.01173 18.2567C7.92447 18.986 9.00433 19.5215 10.1939 19.7957L10.7531 19.9246L12 21.1716L13.2469 19.9246L13.8061 19.7957C15.0745 19.5033 16.2183 18.9139 17.1676 18.1091C15.8965 16.8078 14.1225 16 12.1597 16C10.1238 16 8.29083 16.8692 7.01173 18.2567ZM5.61562 16.8214C7.25644 15.0841 9.58146 14 12.1597 14C14.644 14 16.8931 15.0065 18.5216 16.634C19.4563 15.3185 20 13.7141 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.7964 4.59708 15.4722 5.61562 16.8214ZM12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13ZM12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z"
                        fill="black"
                      />
                    </svg>
                  }
                  label="Hapus Akun"
                />
              </Link>
            </div>
          </div>
        </div>
      </LayoutUtama>
    </>
  )
}

// Reusable component for activity/help items with types
interface ActivityItemProps {
  icon: React.ReactNode
  label: string
}

const ActivityItem: React.FC<ActivityItemProps> = ({ icon, label }) => (
  <div className="flex items-center text-sm text-gray-700 hover:bg-gray-100 rounded-lg p-2 cursor-pointer">
    <span className="mr-3">{icon}</span>
    {label}
  </div>
)

export default SellerSettings
