'use client'
import React, { useState } from 'react'
import LayoutUtama from '@/app/layouts/layout-utama'
import Header from '@/app/layouts/header'
import { useRouter, useSearchParams } from 'next/navigation'
import LogoutAfterCP from '@/api/logoutAfterChangePass'
import deleteToken from '@/cookie/deleteToken'
import deleteAccount from '@/api/settings/deleteAccount'

export default function HapusAkun() {
  const searchParams = useSearchParams();

  const [isChecked, setIsChecked] = useState(false)
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  const router = useRouter();

  const handleDeleteAccount = async () => {
    // Logic for account deletion should be implemented here.
    setIsPopupVisible(true)
  };

  const closePopup = async () => {
    setIsPopupVisible(false);
    const otpId = searchParams.get("otpId") || '';
    const deletingAccount = await deleteAccount({otps_id : otpId})
    const logout = await LogoutAfterCP()
    if (!logout.error) {
      await deleteToken();
      router.push(`/authentikasi/login`);
    }
  };

  return (
    <LayoutUtama>
      <Header title="Hapus Akun" children={undefined} />
      <div className="container mx-auto p-4 font-nunito mt-20">
        <div className="text-left mb-4">
          <h2 className="text-lg font-semibold">Hapus Akun</h2>
          <p className="text-sm text-gray-600">
            Klik “Hapus Akun” akan menghapus akun Anda
          </p>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="confirmDelete"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="confirmDelete" className="text-gray-600">
            Saya yakin ingin menghapus akun saya
          </label>
        </div>

        <button
          className={`mt-4 w-full py-2 rounded-md font-semibold ${
            isChecked
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
          onClick={handleDeleteAccount}
          disabled={!isChecked}
          type="button"
        >
          Hapus Akun
        </button>
      </div>

      {/* Pop-up Konfirmasi */}
      {isPopupVisible && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-end"
          onClick={closePopup}
        >
          <div
            className="bg-white w-full max-w-md h-[340px] p-6 rounded-t-[24px] shadow-lg transform transition-transform duration-300 ease-out translate-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 40H100V105C100 107.761 97.7615 110 95 110H25C22.2386 110 20 107.761 20 105V40ZM35 25V15C35 12.2386 37.2386 10 40 10H80C82.7615 10 85 12.2386 85 15V25H110V35H10V25H35ZM45 20V25H75V20H45ZM45 60V90H55V60H45ZM65 60V90H75V60H65Z"
                  fill="url(#paint0_linear_4359_29569)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_4359_29569"
                    x1="10"
                    y1="60"
                    x2="110"
                    y2="60"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#83E69B" />
                    <stop offset="1" stopColor="#00BAE1" />
                  </linearGradient>
                </defs>
              </svg>

              <h2 className="mt-4 text-[22px] font-nunitoBold text-black px-16">
                Akun Anda Berhasil dihapus
              </h2>
            </div>

            <div className="flex justify-center">
              <button
                onClick={closePopup}
                className="w-full mt-6 bg-[#51D7B1] text-white p-3 rounded-lg"
              >
                Oke
              </button>
            </div>
          </div>
        </div>
      )}
    </LayoutUtama>
  )
}
