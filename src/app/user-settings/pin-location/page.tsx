"use client";
import React, { useState } from 'react'; // Import useState
import { useRouter } from 'next/navigation'
import PinLocation from '@/app/components/usersettings/pin-location';
import Header from '@/app/layouts/header';
import LayoutUtama from '@/app/layouts/layout-utama';

const LocationPage = () => {
  const router = useRouter()
  const [showPopup, setShowPopup] = useState(false);

  // Handler untuk menutup popup atau melanjutkan ke halaman berikutnya
  const handleClosePopup = () => {
    setShowPopup(false)
    router.push('/pengaturan/tambah-alamat') // Ganti dengan halaman berikutnya
  }

  const handleConfirmLocation = () => {
    setShowPopup(true);
  };


  return (
    <LayoutUtama>
      <Header title="Pin Lokasi" children={undefined}/>
      <div className="homepage w-[400px] mx-auto py-4 font-nunito">
        {/* Memanggil komponen PinLocation */}
        <PinLocation />
        <div className='px-4'>
        <button
          onClick={handleConfirmLocation}
          className="w-full bg-[#51D7B1] text-white p-3 rounded-lg"
        >
          Pilih Lokasi dan Simpan
        </button>
        </div>
        {showPopup && (
            <div
              className="fixed inset-0 z-50 flex justify-center items-end"
              onClick={handleClosePopup}
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

                  <h2 className="mt-4 text-[22px] font-bold text-[#51D7B1]">
                    Lokasi Berhasil Dipilih
                  </h2>
                  <p className="mt-4 text-[14px] text-gray-500">
                    Lokasi Anda telah berhasil dipilih. Anda dapat mengubahnya
                    kapan saja.
                  </p>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleClosePopup}
                    className="w-full mt-6 bg-[#51D7B1] text-white p-3 rounded-lg"
                  >
                    Lanjutkan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      {/* </div> */}
    </LayoutUtama>
  );
};

export default LocationPage;
