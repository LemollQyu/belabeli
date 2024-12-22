'use client'
import React, { useState } from 'react'
import Header from '@/app/layouts/header' // pastikan ini mengarah ke file LayoutUtama
import LayoutUtama from '@/app/layouts/layout-utama'
import BannerUpload from '@/app/components/usersettings/banner'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const TokoDashboard = () => {
  const router = useRouter()
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProfileImage(imageUrl)
    }
  }

    // Fungsi navigasi ke halaman hapus-toko
    const handleHapusToko = () => {
      router.push('setup-toko/hapus-toko')
    }
  return (
    <LayoutUtama>
      <Header title="Toko Annas" children={undefined} />

      <div className="container w-[400px] mx-auto p-4 pt-20 font-nunito">
        {/* Bagian Profile Toko */}
        <div className="w-full max-w-md bg-gray-100 rounded-lg shadow-md p-4">
          {/* Profil Toko */}
          <div className="relative">
            <Link href="/seller/informasi-toko">
              {/* Hanya menampilkan BannerUpload tanpa tombol Upload */}
              <BannerUpload />  
            </Link>
            {/* Profil Overlay */}
            <div className="absolute top-2 flex items-center bg-white bg-opacity-80 rounded-full p-2 shadow-lg">
              <label
                htmlFor="profileImageInput"
                className="flex items-center cursor-pointer"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-teal-500 rounded-full overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12zm0 1.5c-3.315 0-6 2.685-6 6 0 .828.672 1.5 1.5 1.5h9c.828 0 1.5-.672 1.5-1.5 0-3.315-2.685-6-6-6z" />
                    </svg>
                  )}
                </div>
                <input
                  id="profileImageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <p className="ml-3 font-semibold text-gray-800">Toko Annas</p>
            </div>
          </div>


          {/* Bagian Penghasilan dan Pesanan */}
          <div className="flex justify-around mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Penghasilan</p>
              <p className="text-[16px] font-semibold">Rp. -</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Pesanan</p>
              <p className="text-[16px] font-semibold">- barang terjual</p>
            </div>
          </div>
          </div>

        {/* Bagian Profil Toko */}
        <div className="bg-white rounded-lg border mt-6 p-4 shadow-md">
          <h3 className="text-[16px] font-nunito font-semibold text-[#1B1E28] mb-3 leading-[1.5] tracking-[-0.368px]">
            Profil Toko
          </h3>
          <div className="flex flex-col space-y-2">
            <Link href="/seller/informasi-toko">
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
                label="Informasi Toko"
              />
            </Link>
            <Link href="setup-toko/operasional-toko">
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
                      d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"
                      fill="black"
                    />
                  </svg>
                }
                label="Jam Operasional Toko"
              />
            </Link>
            <Link href="setup-toko/riwayat-pesanan">
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
                      d="M4.00436 6.41662L0.761719 3.17398L2.17593 1.75977L5.41857 5.00241H20.6603C21.2126 5.00241 21.6603 5.45013 21.6603 6.00241C21.6603 6.09973 21.6461 6.19654 21.6182 6.28976L19.2182 14.2898C19.0913 14.7128 18.7019 15.0025 18.2603 15.0025H6.00436V17.0025H17.0044V19.0025H5.00436C4.45207 19.0025 4.00436 18.5547 4.00436 18.0025V6.41662ZM6.00436 7.00241V13.0025H17.5163L19.3163 7.00241H6.00436ZM5.50436 23.0025C4.67593 23.0025 4.00436 22.3309 4.00436 21.5025C4.00436 20.674 4.67593 20.0025 5.50436 20.0025C6.33279 20.0025 7.00436 20.674 7.00436 21.5025C7.00436 22.3309 6.33279 23.0025 5.50436 23.0025ZM17.5044 23.0025C16.6759 23.0025 16.0044 22.3309 16.0044 21.5025C16.0044 20.674 16.6759 20.0025 17.5044 20.0025C18.3328 20.0025 19.0044 20.674 19.0044 21.5025C19.0044 22.3309 18.3328 23.0025 17.5044 23.0025Z"
                      fill="black"
                    />
                  </svg>
                }
                label="Riwayat Pesanan"
              />
            </Link>
            <Link href="dashboard/setup-toko/pengikut-toko">
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
                      d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"
                      fill="black"
                    />
                  </svg>
                }
                label="Pengikut"
              />
            </Link>
          </div>
        </div>

        {/* Bagian Pengaturan Akun */}
        <div className="bg-white rounded-lg border mt-4 p-4 shadow-md">
          <h3 className="text-[16px] font-nunito font-semibold text-[#1B1E28] mb-3 leading-[1.5] tracking-[-0.368px]">
            Pengaturan Akun
          </h3>
          <div className="flex flex-col space-y-2">
            <Link href="setup-toko/rekening-bank">
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
                      d="M22.0039 7H23.0039V17H22.0039V20C22.0039 20.5523 21.5562 21 21.0039 21H3.00391C2.45163 21 2.00391 20.5523 2.00391 20V4C2.00391 3.44771 2.45163 3 3.00391 3H21.0039C21.5562 3 22.0039 3.44771 22.0039 4V7ZM20.0039 17H14.0039C11.2425 17 9.00391 14.7614 9.00391 12C9.00391 9.23857 11.2425 7 14.0039 7H20.0039V5H4.00391V19H20.0039V17ZM21.0039 15V9H14.0039C12.347 9 11.0039 10.3431 11.0039 12C11.0039 13.6568 12.347 15 14.0039 15H21.0039ZM14.0039 11H17.0039V13H14.0039V11Z"
                      fill="black"
                    />
                  </svg>
                }
                label="Rekening Bank"
              />
            </Link>
            <Link href="setup-toko/alamat-toko">
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
                      d="M12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995L16.9497 15.9497ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"
                      fill="black"
                    />
                  </svg>
                }
                label="Alamat Toko"
              />
            </Link>
            <Link href="setup-toko/layanan-pengiriman">
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
                      d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z"
                      fill="black"
                    />
                  </svg>
                }
                label="Layanan Pengiriman"
              />
            </Link>
            <Link href="setup-toko/notifikasi">
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
                      d="M5 18H19V11.0314C19 7.14806 15.866 4 12 4C8.13401 4 5 7.14806 5 11.0314V18ZM12 2C16.9706 2 21 6.04348 21 11.0314V20H3V11.0314C3 6.04348 7.02944 2 12 2ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"
                      fill="black"
                    />
                  </svg>
                }
                label="Notifikasi"
              />
            </Link>
          </div>
        </div>

        {/* Help Center */}
        <div className="bg-white rounded-lg border mt-4 p-4 shadow-md">
          <h3 className="text-[16px] font-nunito font-semibold text-[#1B1E28] mb-3 leading-[1.5] tracking-[-0.368px]">
            Pusat Edukasi
          </h3>
          <div className="flex flex-col space-y-2">
            <Link href="setup-toko/pusat-bantuan">
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
            <Link href="setup-toko/live-chat">
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
            <Link href="setup-toko/edukasi-seller">
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
                label="Edukasi Seller"
              />
            </Link>
          </div>
        </div>

        {/* Tombol Hapus Toko */}
      
        <button 
                onClick={handleHapusToko}
                className="flex items-center justify-center w-full mt-4 mb-2 p-3 text-red-500 border-2 shadow-md rounded-lg">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9ZM9 12V18H11V12H9ZM13 12V18H15V12H13Z"
              fill="#EE443F"
            />
          </svg>
          <span className="ml-2 font-semibold">Hapus Toko</span>
        </button>
      </div>
    </LayoutUtama>
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
    <span className="font-semibold">{label}</span>
  </div>
)

export default TokoDashboard
