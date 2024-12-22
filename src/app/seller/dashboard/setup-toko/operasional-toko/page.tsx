'use client'
import React, { useState } from 'react'
import Header from '@/app/layouts/header'
import LayoutUtama from '@/app/layouts/layout-utama'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'

export default function JamOperasionalPage() {
  const router = useRouter()
  // State for date range with type Date | undefined
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [showCalendar, setShowCalendar] = useState(false)

  // Fungsi untuk memformat tanggal menjadi range
  const formatDateRange = (start: Date | undefined, end: Date | undefined) => {
    if (start && end) {
      return `${format(start, "d MMMM")} - ${format(end, "d MMMM yyyy")}`;
    } else if (start) {
      return `${format(start, "d MMMM yyyy")}`;
    } else {
      return "Pilih Tanggal";
    }
  };

  

  // Fungsi untuk menangani klik pada ikon SVG
  const handleButtonClick = () => {
    setShowCalendar((prev) => !prev) // Toggle tampilkan kalender
  }

  const handleClick = () => {
    router.push('/seller/dashboard/setup-toko/operasional-toko/atur-jam')
  }

  return (
    <LayoutUtama>
      <Header title="Jam Operasional" children={undefined} />
      <div className="container w-[400px] mx-auto py-4 mt-20 font-nunito">
        {/* Atur Jam Operasional Section */}
        <div className="border-b border-gray-300 pb-2 mb-8 mx-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Atur Jam Operasional</h2>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleClick} // Menambahkan event handler
              className="cursor-pointer" // Menambahkan class untuk pointer ketika ikon diklik
            >
              <path
                d="M15.7279 9.5758L14.3137 8.16158L5 17.4753V18.8895H6.41421L15.7279 9.5758ZM17.1421 8.16158L18.5563 6.74738L17.1421 5.33316L15.7279 6.74738L17.1421 8.16158ZM7.24264 20.8895H3V16.6468L16.435 3.21184C16.8256 2.82132 17.4587 2.82132 17.8492 3.21184L20.6777 6.04027C21.0682 6.43079 21.0682 7.06395 20.6777 7.45447L7.24264 20.8895Z"
                fill="#51D7B1"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-500">
            Atur jadwal toko buka, toko tutup dan beroperasi rutin setiap hari
          </p>
          <div className="mt-2 flex justify-between items-center">
            <span className="font-semibold">Senin - Sabtu</span>
            <span className="text-sm text-gray-500">24 Jam</span>
          </div>
        </div>

        <div className="border-t-8 border-gray-300 mb-8"></div>
        {/* Atur Toko Libur Section with Date Picker */}
        <div className="border-b border-gray-300 pb-4 mb-8 mx-4">
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-lg font-bold">Atur Toko Libur</h2>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleButtonClick} // Menambahkan event klik
          className="cursor-pointer" // Menambahkan class untuk pointer ketika diklik
        >
          <path
            d="M15.7279 9.5758L14.3137 8.16158L5 17.4753V18.8895H6.41421L15.7279 9.5758ZM17.1421 8.16158L18.5563 6.74738L17.1421 5.33316L15.7279 6.74738L17.1421 8.16158ZM7.24264 20.8895H3V16.6468L16.435 3.21184C16.8256 2.82132 17.4587 2.82132 17.8492 3.21184L20.6777 6.04027C21.0682 6.43079 21.0682 7.06395 20.6777 7.45447L7.24264 20.8895Z"
            fill="#51D7B1"
          />
        </svg>
      </div>
      <p className="text-sm text-gray-500">
        Atur jadwal toko buka, toko tutup dan beroperasi rutin setiap hari
      </p>

      {/* Date Range Picker in a Single Frame */}
      <div className="mt-2 border border-gray-300 rounded-md p-2 flex flex-col space-y-2">
        {/* Display formatted date range */}
        <span className="text-sm font-semibold">
        {formatDateRange(startDate, endDate)}
        </span>

        {/* Date pickers */}
        {showCalendar && (
          <div className="flex items-center space-x-2">
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) =>
                setStartDate(date || undefined)
              }
              startDate={startDate}
              endDate={endDate}
              selectsStart
              placeholderText="Pilih Tanggal Mulai"
              className="text-sm w-full focus:outline-none"
              dateFormat="dd-MM-yyyy"
            />
            <span className="text-gray-500">-</span>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date || undefined)}
              startDate={startDate}
              endDate={endDate}
              selectsEnd
              placeholderText="Pilih Tanggal Selesai"
              className="text-sm w-full focus:outline-none"
              dateFormat="dd-MM-yyyy"
            />
          </div>
        )}
      </div>
    </div>
        <div className="border-t-8 border-gray-300 mb-8"></div>
      </div>
    </LayoutUtama>
  )
}
