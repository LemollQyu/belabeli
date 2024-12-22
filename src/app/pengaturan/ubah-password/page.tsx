"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LayoutUtama from '@/app/layouts/layout-utama';
import Header from '@/app/layouts/header';
import requestOTPGantiSandi from '@/api/settings/postRequestOTPGantiSandi';

const UbahPassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const router = useRouter();
  

  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const HandleRequestOTPEmail = async () => {
    const response = await requestOTPGantiSandi({ kata_sandi: oldPassword });
    console.log("response request email otp", response.error);
    console.log("response request email otp success", response.data);
    router.push(`/pengaturan/verif-otp?p=${oldPassword}&expires=${response.data.expires_in}`);
  };

  // Fungsi untuk menutup pop-up
  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const handleContinue = () => {
    router.push('/verif-otp');
  };

  return (
    <LayoutUtama>
      <Header title="" children={undefined} />
      <div className="container w-[400px] mx-auto p-4 font-nunito mt-20">
      <div className="flex flex-col gap-2 items-center">
        <div className="w-[190px] h-[18px] relative mb-4">
          <div className="w-[190px] h-[18px] left-0 top-0 absolute bg-[#d9d9d9] rounded-xl" />
          <div className="w-[64px] h-3.5 left-[2px] top-[2px] absolute bg-[#51D7B1] rounded-xl" />
        </div>
          <h1 className="mt-10 text-xl text-center font-nunitoBold">Masukkan Kata Sandi Lama</h1>
          <span className="w-full text-center text-md mt-2 px-8 text-gray-500">
            <p className="font-nunito">Masukkan kata sandi lama untuk mengamankan akun</p>
          </span>
        </div>

        <form className="space-y-4">
          {/* Form Kata Sandi */}
          <div className="relative mt-12">
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="oldPassword"
              value={oldPassword}
              onChange={handleOldPasswordChange}
              placeholder=" "
              className="peer w-full px-4 py-3 bg-gray-100 rounded-lg border-gray-300 text-gray-900 focus:outline-none focus:border-emerald-500"
            />
            <label
              htmlFor="newPassword"
              className="absolute left-4 top-2 transform -translate-y-1/2 text-xs text-gray-500 transition-all duration-200
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-500
              peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500"
            >
              Kata Sandi Lama
            </label>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-4 font-nunito"
            >
              {passwordVisible ? (
                // Icon untuk menampilkan kata sandi
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3.0658C17.3924 3.0658 21.8784 6.94556 22.8189 12.0658C21.8784 17.186 17.3924 21.0658 12 21.0658C6.60812 21.0658 2.12215 17.186 1.18164 12.0658C2.12215 6.94556 6.60812 3.0658 12 3.0658ZM12 19.0658C16.2359 19.0658 19.8603 16.1178 20.7777 12.0658C19.8603 8.01383 16.2359 5.0658 12 5.0658C7.7646 5.0658 4.14022 8.01383 3.22278 12.0658C4.14022 16.1178 7.7646 19.0658 12 19.0658ZM12 16.5658C9.51498 16.5658 7.50026 14.5511 7.50026 12.0658C7.50026 9.58052 9.51498 7.5658 12 7.5658C14.4855 7.5658 16.5003 9.58052 16.5003 12.0658C16.5003 14.5511 14.4855 16.5658 12 16.5658ZM12 14.5658C13.381 14.5658 14.5003 13.4465 14.5003 12.0658C14.5003 10.6851 13.381 9.5658 12 9.5658C10.6196 9.5658 9.50026 10.6851 9.50026 12.0658C9.50026 13.4465 10.6196 14.5658 12 14.5658Z" fill="black" />
                </svg>
              ) : (
                // Icon untuk menyembunyikan kata sandi
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62283 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12 5.00016C11.1544 5.00016 10.3329 5.10311 9.56342 5.30009L11.9277 7.66435C12.6214 7.33166 13.396 7.18442 14.2338 7.18442C16.4403 7.18442 18.5 9.24415 18.5 12.0002C18.5 13.0937 18.1719 14.0865 17.6541 14.9151L20.8068 16.5925Z" fill="black" />
                </svg>
              )}
            </button>
          </div>

        </form>
      </div>
      <div className="flex justify-center mt-12 px-4">
        <button
          type="button" // Mengubah ini menjadi "button" untuk mencegah form submission
          onClick={HandleRequestOTPEmail}
          className="w-full bg-[#51D7B1] hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg"
        >
          Request OTP
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
              <div className="text-center">
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto mb-4"
                >
                  <path
                    d="M60 110C32.3857 110 10 87.614 10 60C10 32.3857 32.3857 10 60 10C87.614 10 110 32.3857 110 60C110 87.614 87.614 110 60 110ZM55.013 80L90.3685 44.6447L83.2975 37.5736L55.013 65.858L40.871 51.7155L33.8 58.787L55.013 80Z"
                    fill="url(#paint0_linear_1851_7486)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1851_7486"
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

                <h2 className="mt-4 text-[22px] font-nunitoBold text-[#51D7B1]">
                  Kata Sandi Berhasil Diganti
                </h2>
                <p className="mt-4 text-[14px] text-gray-500">
                Kata sandi Anda telah berhasil diperbarui. Anda dapat menggunakan kata sandi baru untuk login.
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleContinue}
                  className="w-full mt-6 bg-[#51D7B1] text-white p-3 rounded-lg"
                >
                  Lanjutkan
                </button>
              </div>
            </div>
          </div>
        )}
    </LayoutUtama>
  );
};

export default UbahPassword;
