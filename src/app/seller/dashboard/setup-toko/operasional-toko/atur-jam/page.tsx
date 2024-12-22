'use client'
import Header from '@/app/layouts/header'
import LayoutUtama from '@/app/layouts/layout-utama'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

export default function JamOperasionalPage() {
  const router = useRouter()
  const [openDay, setOpenDay] = useState<string | null>(null)
  const [selectedOption, setSelectedOption] = useState<{
    [key: string]: string
  }>({})
  const [time, setTime] = useState<{
    [key: string]: { open: string; close: string }
  }>({})

  const toggleDay = (day: string) => {
    setOpenDay(openDay === day ? null : day)
  }

  const handleOptionSelect = (day: string, option: string) => {
    setSelectedOption((prev) => ({ ...prev, [day]: option }))
  }

  const handleTimeChange = (
    day: string,
    timeType: 'open' | 'close',
    value: string,
  ) => {
    setTime((prev) => ({
      ...prev,
      [day]: { ...prev[day], [timeType]: value },
    }))
  }

  const handleButtonClick = () => {
    router.push('/seller/dashboard/setup-toko/operasional-toko')
  }

  return (
    <LayoutUtama>
      <Header title="Atur Jam Operasional" children={undefined} />
      <div className="container w-[400px] mx-auto p-4 pt-24 font-nunito">
        {days.map((day) => (
          <div key={day} className="border-b border-gray-300 pb-2 mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleDay(day)}
            >
              <span className="font-semibold">{day}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className={`w-5 h-5 transform ${
                  openDay === day ? 'rotate-180' : ''
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Display selected operational hours */}
            <div className="mt-2 text-gray-600">
              {selectedOption[day] === 'Buka 24 Jam' && <p>Buka 24 Jam</p>}
              {selectedOption[day] === 'Toko Libur' && <p>Toko Libur</p>}
              {selectedOption[day] === 'Atur Jam' &&
                time[day]?.open &&
                time[day]?.close && (
                  <p>
                    {`Jam Operasional: ${time[day].open} - ${time[day].close}`}
                  </p>
                )}
            </div>

            {openDay === day && (
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    id={`${day}-24jam`}
                    name={day}
                    checked={selectedOption[day] === 'Buka 24 Jam'}
                    onChange={() => handleOptionSelect(day, 'Buka 24 Jam')}
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor={`${day}-24jam`}
                    className={`cursor-pointer ${
                      selectedOption[day] === 'Buka 24 Jam'
                        ? 'text-green-600 font-semibold'
                        : ''
                    }`}
                  >
                    Buka 24 Jam
                  </label>
                </div>

                <div className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    id={`${day}-aturjam`}
                    name={day}
                    checked={selectedOption[day] === 'Atur Jam'}
                    onChange={() => handleOptionSelect(day, 'Atur Jam')}
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor={`${day}-aturjam`}
                    className={`cursor-pointer ${
                      selectedOption[day] === 'Atur Jam'
                        ? 'text-green-600 font-semibold'
                        : ''
                    }`}
                  >
                    Atur Jam
                  </label>
                </div>

                {selectedOption[day] === 'Atur Jam' && (
                  <div className="flex items-center space-x-4 mt-2">
                    <div>
                      <label className="text-sm mr-2">Buka</label>
                      <input
                        type="time"
                        value={time[day]?.open || ''}
                        onChange={(e) =>
                          handleTimeChange(day, 'open', e.target.value)
                        }
                        className="border border-gray-300 p-1 rounded-md text-center w-24"
                      />
                    </div>
                    <div>
                      <label className="text-sm mr-2">Tutup</label>
                      <input
                        type="time"
                        value={time[day]?.close || ''}
                        onChange={(e) =>
                          handleTimeChange(day, 'close', e.target.value)
                        }
                        className="border border-gray-300 p-1 rounded-md text-center w-24"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    id={`${day}-libur`}
                    name={day}
                    checked={selectedOption[day] === 'Toko Libur'}
                    onChange={() => handleOptionSelect(day, 'Toko Libur')}
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor={`${day}-libur`}
                    className={`cursor-pointer ${
                      selectedOption[day] === 'Toko Libur'
                        ? 'text-green-600 font-semibold'
                        : ''
                    }`}
                  >
                    Toko Libur
                  </label>
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          className="bg-[#51D7B1] text-white font-semibold w-full py-3 rounded-md mt-6"
          onClick={handleButtonClick}
        >
          Mulai
        </button>
      </div>
    </LayoutUtama>
  )
}
