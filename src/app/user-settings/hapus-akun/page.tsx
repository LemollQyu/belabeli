'use client'
import React, { useEffect, useState } from 'react'
import LayoutUtama from '@/app/layouts/layout-utama'
import Header from '@/app/layouts/header' // Import Header
import Link from 'next/link'
import getUserProfile from '@/api/settings/getUserProfile'
import deleteAccount from '@/api/settings/deleteAccount'
import requestOTPHapusAkun from '@/api/settings/postRequestOTPHapusAkun'

function HapusAkun() {
  const [isChecked, setIsChecked] = useState(false)
  const [image, setImage] = useState<string | null>(null);
  const [loadingImaage, setLoadingImage] = useState<boolean>(false);
    
  const [name, setName] = useState("Loading...");
  const [email, setEmail] = useState("Loading...");
  const [phone, setPhone] = useState("Loading...");

  useEffect(() => {
    setLoadingImage(true)
    async function HandleGetDataUserProfile() {
      const response = await getUserProfile();
      console.log("get user data", response.data);
      setName(response.data?.name ? response.data?.name : "Belum diatur");
      setEmail(response.data?.email? response.data?.email : "Belum diatur");
      setPhone(response.data?.phone? response.data?.phone : "Belum diatur");
      setImage(response.data?.photo);
      setLoadingImage(false)
    }
    HandleGetDataUserProfile();
  }, []);

  return (
    <LayoutUtama>
      <Header title="Hapus Akun" children={undefined} />

      <div className="container mx-auto px-4 py-6 mt-16 font-nunito">
        <div className="bg-white shadow-md border-2 rounded-[20px] p-4">
          {/* Flex container for avatar, user info, and settings icon */}
          <div className="flex items-center justify-between w-full">
            {/* Avatar */}
            <div className="flex items-center">
              
              <img
                    src={
                      loadingImaage
                        ? '/1488.gif'
                        : image === 'https://picsum.photos/500/500'
                        ? image
                        : `${process.env.NEXT_PUBLIC_BASE_API_URL_2}/storage/${image}`
                    }
                    className="rounded-full"
                    alt="User Avatar"
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
            </div>

            {/* User Information */}
            <div className="flex-1 mx-6">
              <h2 className="text-[#1B1E28] font-nunito text-[16px] font-bold leading-[150%] tracking-[-0.368px]">
                {name}
              </h2>
              <p className="text-[#1B1E28] font-nunito text-[13px] font-light leading-[150%] tracking-[-0.276px]">
                {phone}
              </p>
              <p className="text-[#1B1E28] font-nunito text-[13px] font-light leading-[150%] tracking-[-0.276px]">
                {email}
              </p>
            </div>
          </div>
          <div className="mt-4 text-gray-700">
            <h3 className="text-base font-semibold mb-2">
              Persetujuan Penghapusan Akun :
            </h3>
            <ol className="list-decimal pl-8 space-y-2 text-sm">
              <li>
                Penghapusan Permanen: Akun dan semua data (informasi pribadi,
                riwayat, konten) akan dihapus secara permanen tanpa bisa
                dipulihkan.
              </li>
              <li>
                Tanggung Jawab Pengguna: Pengguna harus mencadangkan data
                penting sebelum mengajukan penghapusan.
              </li>
              <li>
                Proses Penghapusan: Permintaan diproses dalam 7 hari kerja
                setelah diajukan melalui [saluran yang ditentukan].
              </li>
              <li>
                Akses Sementara: Pengguna akan kehilangan akses setelah
                permintaan diajukan, meskipun data mungkin disimpan sementara
                sesuai hukum.
              </li>
              <li>
                Kepatuhan Hukum: Beberapa data dapat disimpan untuk kepentingan
                hukum atau keamanan.
              </li>
              <li>
                Kebijakan Privasi: Penghapusan diatur oleh kebijakan privasi
                [Nama Perusahaan/Platform].
              </li>
            </ol>
          </div>
        </div>
        <div className="mt-6 flex items-center">
          <div
            className="w-[24px] h-[24px] flex justify-center items-center"
            onClick={() => setIsChecked(!isChecked)}
          >
            {isChecked ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
                  fill="#51D7B1"
                />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9C16.5 13.1421 13.1421 16.5 9 16.5ZM9 15C12.3137 15 15 12.3137 15 9C15 5.68629 12.3137 3 9 3C5.68629 3 3 5.68629 3 9C3 12.3137 5.68629 15 9 15ZM8.25195 12L5.06999 8.81805L6.13066 7.75732L8.25195 9.8787L12.4946 5.63604L13.5553 6.6967L8.25195 12Z"
                  fill="black"
                />
              </svg>
            )}
          </div>
          <label htmlFor="agreement" className="text-sm text-gray-700 ml-2">
            Dengan melanjutkan, Anda telah menyetujui penghapusan akun Anda
          </label>
        </div>
        <Link href="/user-settings/hapus-akun/input-password">
        <button
        className={`mt-4 w-full py-2 rounded-md font-semibold ${
          isChecked ? 'bg-[#51D7B1] hover:bg-emerald-400 text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'
        }`}
        disabled={!isChecked}
      >
        Lanjutkan
      </button>
      </Link>
      </div>
    </LayoutUtama>
  )
}

export default HapusAkun
