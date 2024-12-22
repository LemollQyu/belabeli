'use client'

import { useState } from 'react'
import LayoutUtama from '@/app/layouts/layout-utama'
import Header from '@/app/layouts/header'

interface Service {
  name: string
  logo: string
}

const LayananPengiriman = () => {
  const [selectedServices, setSelectedServices] = useState<Service[]>([])
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false)
  const [isSavedPopupVisible, setIsSavedPopupVisible] = useState<boolean>(false)

  const layananPengiriman: Service[] = [
    { name: 'JNT Express', logo: 'jnt' },
    { name: 'JNE Express', logo: 'jne' },
    { name: 'SICEPAT Ekpres', logo: 'sicepat' },
    { name: 'Pos Indonesia', logo: 'pos' },
  ]

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible)
  }

  const handleSelectService = (service: Service) => {
    setSelectedServices((prevSelectedServices) =>
      prevSelectedServices.some((s) => s.name === service.name)
        ? prevSelectedServices.filter((s) => s.name !== service.name)
        : [...prevSelectedServices, service],
    )
  }

  const closePopup = () => {
    setIsPopupVisible(false)
  }

  const handleContinue = () => {
    setIsPopupVisible(false)
    setIsSavedPopupVisible(true)
  }

  return (
    <LayoutUtama>
      <Header title="Pengiriman" children={undefined} />
      <div className="container w-[400px] mx-auto p-4 pt-20 font-nunito h-screen">
        <h2 className="text-[16px] font-semibold mb-4">Layanan Pengiriman</h2>
        <div className="border-b border-gray-300 pb-4 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-4">
              {selectedServices.length > 0 ? (
                selectedServices.map((service, index) => (
                  <div key={index} className="flex items-center">
                    <img
                      src={`/image/${service.logo.toLowerCase()}.jpg`}
                      alt={`${service.name} Logo`}
                      className="mr-4 border-2 rounded-[6px]"
                      style={{ width: '50px', height: '30px' }}
                    />
                    <span className="font-nunito font-semibold">
                      {service.name}
                    </span>
                  </div>
                ))
              ) : (
                <span className="ml-2">Pilih Layanan</span>
              )}
            </div>

            <button onClick={togglePopup} className="self-start mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="text-gray-500"
              >
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </button>
          </div>
        </div>

        {isPopupVisible && (
          <div
            className="fixed inset-0 z-50 flex justify-center items-end bg-black bg-opacity-50"
            onClick={closePopup}
          >
            <div
              className="bg-white w-full max-w-md h-auto p-6 rounded-t-[24px] shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-[16px] font-semibold mb-4 text-center">
                Layanan Pengiriman
              </h2>
              <div className="space-y-4">
                {layananPengiriman.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 border rounded-md"
                  >
                    <img
                      src={`/image/${service.logo.toLowerCase()}.jpg`}
                      alt={`${service.name} Logo`}
                      className="mr-4 border-2 rounded-[6px]"
                      style={{ width: '50px', height: '30px' }}
                    />
                    <span className="ml-2 font-nunito font-semibold">
                      {service.name}
                    </span>
                    <input
                      type="checkbox"
                      name="selectedService"
                      className="ml-auto"
                      checked={selectedServices.some(
                        (s) => s.name === service.name,
                      )}
                      onChange={() => handleSelectService(service)}
                    />
                  </div>
                ))}
              </div>
              <p className="text-[14px] text-red-500 mt-4 text-center">
                Pilih satu atau lebih provider pengiriman toko anda yang akan
                ditampilkan di pembeli
              </p>
              <button
                onClick={closePopup}
                className="w-full mt-4 bg-[#51D7B1] text-white p-3 rounded-lg"
              >
                Lanjutkan
              </button>
            </div>
          </div>
        )}
        <div className="flex items-center justify-center px-4 mb-4">
          <button
            className="w-full py-3 text-[#51D7B1] text-[16px] font-bold rounded-lg border border-[#51D7B1] bg-white hover:bg-[#f1f1f1] focus:outline-none focus:ring-2 focus:ring-[#51D7B1] absolute bottom-4 left-0"
            onClick={handleContinue}
          >
            Tambah Layanan Pengiriman
          </button>
        </div>
        {/* Pop-up setelah tersimpan */}
        {isSavedPopupVisible && (
          <div
            className="fixed inset-0 z-50 flex justify-center items-end bg-black bg-opacity-50"
            onClick={() => setIsSavedPopupVisible(false)}
          >
            <div
              className="bg-white w-full max-w-md h-[330px] p-6 rounded-t-[24px] shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center flex flex-col items-center">
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M60 110C32.3857 110 10 87.614 10 60C10 32.3857 32.3857 10 60 10C87.614 10 110 32.3857 110 60C110 87.614 87.614 110 60 110ZM55.013 80L90.3685 44.6447L83.2975 37.5736L55.013 65.858L40.871 51.7155L33.8 58.787L55.013 80Z"
                    fill="url(#paint0_linear_6848_29156)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_6848_29156"
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

                <h2 className="mt-2 text-[22px] font-nunitoBold text-black">
                  Tersimpan
                </h2>
                <p className="mt-2 text-[14px] text-gray-700 px-8 text-center">
                  Layanan pengiriman anda berhasil ditambahkan dan siap
                  digunakan
                </p>
              </div>

              <button
                onClick={() => setIsSavedPopupVisible(false)}
                className="w-full mt-6 bg-[#51D7B1] text-white p-3 rounded-lg"
              >
                Selesai
              </button>
            </div>
          </div>
        )}
      </div>
    </LayoutUtama>
  )
}

export default LayananPengiriman
