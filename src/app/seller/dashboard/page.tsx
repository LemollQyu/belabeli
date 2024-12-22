'use client'
import { useState } from 'react'
import LayoutUtama from '@/app/layouts/layout-utama'
import Header from '@/app/layouts/header'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Link from 'next/link'
import { Line } from 'react-chartjs-2'
import { useRouter } from 'next/navigation'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export default function DashboardToko() {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [isShopSetup, setIsShopSetup] = useState(false) // State untuk tracking apakah toko sudah disetup
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  // Fungsi untuk mensimulasikan setup toko selesai
  const handleSetupShop = () => {
    setIsShopSetup(true) // Ubah state menjadi true setelah setup selesai
    // router.push('/seller/dashboard/setup-toko') // Arahkan ke halaman setup toko
  }

  const data = {
    labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sabt', 'Ming'],
    datasets: [
      {
        label: 'Rating Penjualan',
        // data: [1, 2, 1, 3, 2, 4, 5], // Dummy data rating
        data: [], // Dummy data rating
        borderColor: '#222b45',
        backgroundColor: '#222b45',
        borderWidth: 1,
        pointRadius: 3,
        pointBackgroundColor: '#222b45',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1,
        max: 5,
        ticks: {
          callback: (value: string | number) => `Rating ${value}`, // Perbaikan tipe parameter callback
        },
      },
    },
  }

  return (
    <LayoutUtama>
      <Header title="Dashboard Toko" children={undefined} />

      <div className="container mx-auto p-4 font-nunito pt-20">
        {/* Store Info Section */}
        <div className="border-2 h-[140px] p-4 bg-[#f6f6f8] rounded-lg flex flex-col gap-2.5">
          {/* Store Details */}
          <div className="h-[104px] flex flex-col justify-between gap-2.5 w-full">
            <div className="flex justify-between items-start w-full">
              <div className="flex items-center gap-2.5 h-[42px]">
                <img
                  className="w-[42px] h-[42px] rounded"
                  src="/image/toko/logo.jpg"
                  alt="Store Logo"
                />
                <div className="flex flex-col gap-1 w-[169px]">
                  <div className="flex items-center gap-2.5">
                    <div className="px-1.5 py-0.5 bg-[#09cbca] rounded flex items-center">
                      <div className="text-white text-[10px] font-bold">SS</div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="text-[#1b1e28] text-[14px] font-bold">
                        Toko Annas
                      </div>
                      <div className="flex items-center gap-1 text-black text-[11px] font-semibold">
                        <svg
                          width="13"
                          height="12"
                          viewBox="0 0 11 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.49748 7.10898L2.55855 8.75407L3.21493 5.45061L0.742188 3.1639L4.08679 2.76734L5.49748 -0.291016L6.90815 2.76734L10.2527 3.1639L7.78003 5.45061L8.4364 8.75407L5.49748 7.10898Z"
                            fill="#FFCD29"
                          />
                        </svg>
                        4.8
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-[5px] text-[#949494] text-[12px] font-light">
                    <span>Online</span>
                    <span className="font-bold">|</span>
                    <div className="flex items-center gap-[5px] text-[#7f7f7f] text-[10px] font-semibold">
                      <svg
                        width="13"
                        height="12"
                        viewBox="0 0 13 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.5 11C1.5 8.79085 3.29086 7 5.5 7C7.70915 7 9.5 8.79085 9.5 11H1.5ZM5.5 6.5C3.8425 6.5 2.5 5.1575 2.5 3.5C2.5 1.8425 3.8425 0.5 5.5 0.5C7.1575 0.5 8.5 1.8425 8.5 3.5C8.5 5.1575 7.1575 6.5 5.5 6.5ZM9.1814 7.6166C10.7241 8.01085 11.884 9.36175 11.9918 11H10.5C10.5 9.6951 10.0001 8.50695 9.1814 7.6166ZM8.17005 6.47845C8.9864 5.7461 9.5 4.68303 9.5 3.5C9.5 2.79133 9.3157 2.12571 8.99245 1.54843C10.1376 1.77698 11 2.78732 11 4C11 5.38125 9.88125 6.5 8.5 6.5C8.38815 6.5 8.278 6.49265 8.17005 6.47845Z"
                          fill="#7F7F7F"
                        />
                      </svg>
                      Pengikut: 0 orang
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative w-[24px] h-[23px] flex items-center">
                <Link href ="/seller/dashboard/notifikasi">
                <svg
                  width="28"
                  height="27"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 1.5C13.228 1.5 16.25 4.53261 16.25 8.27355V15H2.75V8.27355C2.75 4.53261 5.77208 1.5 9.5 1.5ZM7.625 15.75H11.375C11.375 16.7855 10.5355 17.625 9.5 17.625C8.46448 17.625 7.625 16.7855 7.625 15.75Z"
                    fill="#51D7B1"
                  />
                </svg>
                </Link>
                <div className="absolute -top-1 -right-1 w-[14px] h-[14px] bg-[#ee443f] rounded-full flex justify-center items-center text-white text-[8px] font-bold">
                  6
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col gap-1.5 w-38">
                <div className="h-[23px] px-2 py-1 bg-[#fdfdfd] rounded border border-[#51d7b1] flex items-center justify-center mt-2">
                  <span className="text-[#25a07d] text-[10px] font-semibold">
                    Status Toko: Super Seller
                  </span>
                </div>
                <div className="h-[23px] px-2 py-1 bg-[#51d7b1] rounded flex items-center justify-center">
                  <span className="text-white text-[10px] font-semibold">
                    Pintasan Chat
                  </span>
                </div>
              </div>
              <div className="text-[#25a07d] text-[11px] font-semibold flex flex-col items-center text-center">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4999 3C14.9933 3 18.7317 6.23313 19.5154 10.5C18.7317 14.7668 14.9933 18 10.4999 18C6.00644 18 2.26813 14.7668 1.48438 10.5C2.26813 6.23313 6.00644 3 10.4999 3ZM10.4999 16.3333C14.0296 16.3333 17.0499 13.8767 17.8144 10.5C17.0499 7.12336 14.0296 4.66667 10.4999 4.66667C6.97018 4.66667 3.94986 7.12336 3.18533 10.5C3.94986 13.8767 6.97018 16.3333 10.4999 16.3333ZM10.4999 14.25C8.42883 14.25 6.74989 12.5711 6.74989 10.5C6.74989 8.42893 8.42883 6.75 10.4999 6.75C12.5709 6.75 14.2499 8.42893 14.2499 10.5C14.2499 12.5711 12.5709 14.25 10.4999 14.25ZM10.4999 12.5833C11.6505 12.5833 12.5833 11.6506 12.5833 10.5C12.5833 9.34942 11.6505 8.41667 10.4999 8.41667C9.34934 8.41667 8.41656 9.34942 8.41656 10.5C8.41656 11.6506 9.34934 12.5833 10.4999 12.5833Z"
                    fill="#25A07D"
                  />
                </svg>
                Lihat Toko
              </div>
            </div>
          </div>
        </div>

        {/* Date Range Picker and Review Button */}
        <div className="flex items-center gap-2 mb-4 mt-4 w-full">
          <DatePicker
            selected={startDate ?? undefined}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate ?? undefined}
            endDate={endDate ?? undefined}
            dateFormat="dd/MM/yyyy"
            className="border rounded px-3 py-2 text-sm w-full max-w-[150px]"
            placeholderText="Tanggal Mulai"
          />
          <DatePicker
            selected={endDate ?? undefined}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate ?? undefined}
            endDate={endDate ?? undefined}
            minDate={startDate ?? undefined}
            dateFormat="dd/MM/yyyy"
            className="border rounded px-3 py-2 text-sm w-full max-w-[150px]"
            placeholderText="Tanggal Akhir"
          />
          <button className="bg-red-500 text-white px-4 py-2 rounded text-sm">
            Tinjau
          </button>
        </div>

        {/* Performance Chart */}
        <div className="w-full h-[250px] bg-neutral-100 rounded-lg p-4 relative border-2">
          {/* Judul */}
          <h3 className="text-center text-[#222b45] text-[12px] font-semibold font-['Nunito'] mb-2">
            Performa Toko
          </h3>
          <div className="absolute top-[36px] left-0 w-full h-px bg-[#d2d2d2]" />
          {/* Grafik Rating */}
          <div className="absolute top-[50px] w-[340px] h-[400px] font-nunito text-black">
            <Line data={data} options={options} />
          </div>
        </div>

        {/* Setup Warning */}
        {!isShopSetup && (
          <div className="mt-4 flex items-center gap-2 p-2 rounded-lg bg-[#fcdad9]">
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99935 18.3327C5.39697 18.3327 1.66602 14.6017 1.66602 9.99935C1.66602 5.39697 5.39697 1.66602 9.99935 1.66602C14.6017 1.66602 18.3327 5.39697 18.3327 9.99935C18.3327 14.6017 14.6017 18.3327 9.99935 18.3327ZM9.99935 16.666C13.6813 16.666 16.666 13.6813 16.666 9.99935C16.666 6.31745 13.6813 3.33268 9.99935 3.33268C6.31745 3.33268 3.33268 6.31745 3.33268 9.99935C3.33268 13.6813 6.31745 16.666 9.99935 16.666ZM9.16602 12.4993H10.8327V14.166H9.16602V12.4993ZM9.16602 5.83268H10.8327V10.8327H9.16602V5.83268Z"
                fill="#EE443F"
              />
            </svg>
            <div className="text-[#ee443f] font-['Nunito'] text-[10px] font-bold w-full">
              Mohon Setup Toko Anda Terlebih Dahulu Untuk Dapat Akses Menu Lain
            </div>
          </div>
        )}

        {/* Menu Section */}
        <div className="text-sm font-semibold m-4 text-left">Menu</div>
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap items-center gap-5 justify-center">
            {/* Setup Toko */}
            <div
              onClick={handleSetupShop}
              className="group flex flex-col items-center gap-1 p-2.5 w-[5.625rem] h-[6.5rem] rounded-md border border-[#d3d3d3] bg-white cursor-pointer opacity-90 hover:bg-[#51D7B1]"
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:fill-white"
              >
                <path
                  d="M45.832 41.666V45.8327H4.16536V41.666H6.2487V27.5873C3.73622 25.9056 2.08203 23.0414 2.08203 19.791C2.08203 18.0678 2.54959 16.4081 3.40124 14.9941L9.05141 5.20768C9.42355 4.5631 10.1113 4.16602 10.8556 4.16602H39.1418C39.886 4.16602 40.5739 4.5631 40.946 5.20768L46.5768 14.9613C47.4479 16.4081 47.9154 18.0678 47.9154 19.791C47.9154 23.0414 46.2612 25.9056 43.7487 27.5873V41.666H45.832ZM12.0584 8.33268L6.99032 17.1102C6.50722 17.9127 6.2487 18.8304 6.2487 19.791C6.2487 22.6675 8.58055 24.9993 11.457 24.9993C13.6049 24.9993 15.5084 23.6875 16.2941 21.7275C16.9933 19.9832 19.4625 19.9832 20.1616 21.7275C20.9472 23.6875 22.8508 24.9993 24.9987 24.9993C27.1466 24.9993 29.0502 23.6875 29.8358 21.7275C30.535 19.9832 33.0041 19.9832 33.7033 21.7275C34.4889 23.6875 36.3925 24.9993 38.5404 24.9993C41.4168 24.9993 43.7487 22.6675 43.7487 19.791C43.7487 18.8304 43.4902 17.9127 42.9877 17.0774L37.9389 8.33268H12.0584Z"
                  className="fill-[#51D7B1] group-hover:fill-white"
                />
              </svg>
              <div className="text-[#51d7b1] text-center font-['Nunito'] text-[10px] font-bold leading-[150%] group-hover:text-white">
                Setup Toko
              </div>
            </div>

            {/* Manajemen Kelola Produk */}
            <div
              onClick={() =>
                isShopSetup && handleNavigate('/seller/dashboard/kelola-produk')
              }
              className={`flex flex-col items-center gap-1 p-2.5 w-[5.625rem] rounded-md border border-[#d3d3d3] bg-white ${
                isShopSetup
                  ? 'group cursor-pointer opacity-90 hover:bg-[#51D7B1]'
                  : 'cursor-not-allowed opacity-50'
              }`}
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  isShopSetup
                    ? 'fill-[#51D7B1] group-hover:fill-white'
                    : 'fill-[#51D7B1]'
                }`}
              >
                <path d="M41.668 6.25L45.8346 14.5833V41.6667C45.8346 42.8173 44.9019 43.75 43.7513 43.75H6.2513C5.10072 43.75 4.16797 42.8173 4.16797 41.6667V14.5907L8.33464 6.25H41.668ZM25.0013 20.8333L16.668 29.1667H22.918V37.5H27.0846V29.1667H33.3346L25.0013 20.8333ZM39.093 10.4167H10.9096L8.82839 14.5833H41.1763L39.093 10.4167Z" />
              </svg>
              <div
                className={`text-center font-['Nunito'] text-[10px] font-bold leading-[150%] ${
                  isShopSetup
                    ? 'text-[#51d7b1] group-hover:text-white'
                    : 'text-[#51d7b1]'
                }`}
              >
                Manajemen Kelola Produk
              </div>
            </div>

            {/* Manajemen Penjualan */}
            <div
              onClick={() =>
                isShopSetup &&
                handleNavigate('/seller/dashboard/manajemen-penjualan')
              }
              className={`flex flex-col items-center gap-1 p-2.5 w-[5.625rem] rounded-md border border-[#d3d3d3] bg-white ${
                isShopSetup
                  ? 'group cursor-pointer opacity-90 hover:bg-[#51D7B1]'
                  : 'cursor-not-allowed opacity-50'
              }`}
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  isShopSetup
                    ? 'fill-[#51D7B1] group-hover:fill-white'
                    : 'fill-[#51D7B1]'
                }`}
              >
                <path d="M35.4154 16.666H41.6654L47.9154 25.1154V37.4993H43.6749C43.1693 41.0329 40.1304 43.7493 36.457 43.7493C32.7837 43.7493 29.7447 41.0329 29.2391 37.4993H18.6749C18.1694 41.0329 15.1304 43.7493 11.457 43.7493C7.78362 43.7493 4.74466 41.0329 4.2392 37.4993H2.08203V12.4993C2.08203 11.3488 3.01478 10.416 4.16536 10.416H33.332C34.4827 10.416 35.4154 11.3488 35.4154 12.4993V16.666ZM35.4154 20.8327V27.0827H43.7487V26.4889L39.5647 20.8327H35.4154Z" />
              </svg>
              <div
                className={`text-center font-['Nunito'] text-[10px] font-bold leading-[150%] ${
                  isShopSetup
                    ? 'text-[#51d7b1] group-hover:text-white'
                    : 'text-[#51d7b1]'
                }`}
              >
                Manajemen Penjualan
              </div>
            </div>

            {/* Manajemen Iklan */}
            <div
              onClick={() =>
                isShopSetup &&
                handleNavigate('/seller/dashboard/manajemen-iklan')
              }
              className={`flex flex-col items-center gap-1 p-2.5 w-[5.625rem] rounded-md border border-[#d3d3d3] bg-white ${
                isShopSetup
                  ? 'group cursor-pointer opacity-90 hover:bg-[#51D7B1]'
                  : 'cursor-not-allowed opacity-50'
              }`}
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  isShopSetup
                    ? 'fill-[#51D7B1] group-hover:fill-white'
                    : 'fill-[#51D7B1]'
                }`}
              >
                <path d="M12.4974 4.16602H37.4974C38.648 4.16602 39.5807 5.09877 39.5807 6.24935V43.7494C39.5807 44.9 38.648 45.8327 37.4974 45.8327H12.4974C11.3468 45.8327 10.4141 44.9 10.4141 43.7494V6.24935C10.4141 5.09877 11.3468 4.16602 12.4974 4.16602ZM24.9974 35.416C23.8468 35.416 22.9141 36.3487 22.9141 37.4994C22.9141 38.65 23.8468 39.5827 24.9974 39.5827C26.148 39.5827 27.0807 38.65 27.0807 37.4994C27.0807 36.3487 26.148 35.416 24.9974 35.416Z" />
              </svg>

              <div
                className={`text-center font-['Nunito'] text-[10px] font-bold leading-[150%] ${
                  isShopSetup
                    ? 'text-[#51d7b1] group-hover:text-white'
                    : 'text-[#51d7b1]'
                }`}
              >
                Manajemen Iklan
              </div>
            </div>

            {/* Analitik */}
            <div
              onClick={() =>
                isShopSetup && handleNavigate('/seller/dashboard/analitik')
              }
              className={`flex flex-col items-center gap-1 p-4 w-[5.625rem] rounded-md border border-[#d3d3d3] bg-white ${
                isShopSetup
                  ? 'group cursor-pointer opacity-90 hover:bg-[#51D7B1]'
                  : 'cursor-not-allowed opacity-50'
              }`}
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  isShopSetup
                    ? 'fill-[#51D7B1] group-hover:fill-white'
                    : 'fill-[#51D7B1]'
                }`}
              >
                <path d="M4.16797 27.0833H16.668V43.75H4.16797V27.0833ZM33.3346 16.6667H45.8346V43.75H33.3346V16.6667ZM18.7513 6.25H31.2513V43.75H18.7513V6.25ZM8.33464 31.25V39.5833H12.5013V31.25H8.33464ZM22.918 10.4167V39.5833H27.0846V10.4167H22.918ZM37.5013 20.8333V39.5833H41.668V20.8333H37.5013Z" />
              </svg>
              <div
                className={`text-center font-['Nunito'] text-[10px] font-bold leading-[150%] ${
                  isShopSetup
                    ? 'text-[#51d7b1] group-hover:text-white'
                    : 'text-[#51d7b1]'
                }`}
              >
                Analitik
              </div>
            </div>

            {/* Managemen Diskon */}
            <div
              onClick={() =>
                isShopSetup &&
                handleNavigate('/seller/dashboard/manajemen-diskon')
              }
              className={`flex flex-col items-center gap-1 p-2.5 w-[5.625rem] rounded-md border border-[#d3d3d3] bg-white ${
                isShopSetup
                  ? 'group cursor-pointer opacity-90 hover:bg-[#51D7B1]'
                  : 'cursor-not-allowed opacity-50'
              }`}
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  isShopSetup
                    ? 'fill-[#51D7B1] group-hover:fill-white'
                    : 'fill-[#51D7B1]'
                }`}
              >
                <path d="M29.0548 4.36317C26.7187 2.37242 23.2829 2.37245 20.9471 4.36315L18.1387 6.7564C17.805 7.04076 17.3901 7.21259 16.9531 7.24747L13.275 7.54099C10.2155 7.78513 7.78611 10.2146 7.54197 13.274L7.24847 16.9521C7.21361 17.3891 7.04172 17.8041 6.75736 18.1377L4.36411 20.9461C2.3734 23.2821 2.37342 26.7177 4.36415 29.0536L6.7574 31.8621C7.04172 32.1959 7.21357 32.6107 7.24845 33.0477L7.54201 36.7257C7.78615 39.785 10.2156 42.2144 13.2751 42.4586L16.9531 42.7523C17.3901 42.7871 17.8049 42.959 18.1386 43.2434L20.9469 45.6365C23.2829 47.6271 26.7187 47.6273 29.0548 45.6365L31.8631 43.2434C32.1967 42.959 32.6114 42.7871 33.0485 42.7521L36.7267 42.4586C39.786 42.2146 42.2154 39.7852 42.4598 36.7257L42.7531 33.0477C42.7879 32.6107 42.96 32.1957 43.2442 31.8619L45.6375 29.0538C47.6283 26.7177 47.6283 23.2819 45.6375 20.9461L43.2442 18.1376C42.9598 17.8039 42.7881 17.3891 42.7533 16.9521L42.4598 13.274C42.2156 10.2146 39.786 7.78509 36.7267 7.54097L33.0485 7.24745C32.6114 7.21257 32.1967 7.04076 31.8631 6.7564L29.0548 4.36317ZM30.8929 16.1612L33.8392 19.1075L19.1077 33.839L16.1614 30.8925L30.8929 16.1612ZM21.3175 21.3171C20.097 22.5375 18.1184 22.5375 16.898 21.3171C15.6776 20.0969 15.6776 18.1182 16.898 16.8978C18.1184 15.6774 20.097 15.6774 21.3175 16.8978C22.5379 18.1182 22.5379 20.0969 21.3175 21.3171ZM28.6831 33.1023C27.4627 31.8819 27.4627 29.9034 28.6831 28.6829C29.9035 27.4625 31.8821 27.4625 33.1025 28.6829C34.3229 29.9034 34.3229 31.8819 33.1025 33.1023C31.8821 34.3227 29.9035 34.3227 28.6831 33.1023Z" />
              </svg>
              <div
                className={`text-center font-['Nunito'] text-[10px] font-bold leading-[150%] ${
                  isShopSetup
                    ? 'text-[#51d7b1] group-hover:text-white'
                    : 'text-[#51d7b1]'
                }`}
              >
                Managemen Diskon
              </div>
            </div>

            {/* Ulasan Produk */}
            <div
              onClick={() =>
                isShopSetup && handleNavigate('/seller/dashboard/ulasan-produk')
              }
              className={`flex flex-col items-center gap-1 p-2.5 w-[5.625rem] h-[6.5rem] rounded-md border border-[#d3d3d3] bg-white ${
                isShopSetup
                  ? 'group cursor-pointer opacity-90 hover:bg-[#51D7B1]'
                  : 'cursor-not-allowed opacity-50'
              }`}
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  isShopSetup
                    ? 'fill-[#51D7B1] group-hover:fill-white'
                    : 'fill-[#51D7B1]'
                }`}
              >
                <path d="M43.7513 6.25C44.9019 6.25 45.8346 7.18275 45.8346 8.33333V37.5C45.8346 38.6506 44.9019 39.5833 43.7513 39.5833H13.4492L4.16797 46.875V8.33333C4.16797 7.18275 5.10072 6.25 6.2513 6.25H43.7513ZM21.9082 15.4408C18.1852 17.0559 15.6263 20.3238 15.6263 23.9692C15.6263 26.0417 16.2025 27.3202 17.2757 28.4594C17.9513 29.1767 19.0202 29.6875 20.1379 29.6875C22.1515 29.6875 23.7838 28.0552 23.7838 26.0417C23.7838 24.124 22.3023 22.581 20.4229 22.4069C20.0869 22.3756 19.7477 22.3815 19.4246 22.426L19.4251 22.2352C19.4362 21.3171 19.6311 18.611 22.838 16.8758L21.9082 15.4408ZM32.3248 15.4408C28.6019 17.0559 26.043 20.3238 26.043 23.9692C26.043 26.0417 26.6192 27.3202 27.6923 28.4594C28.368 29.1767 29.4369 29.6875 30.5546 29.6875C32.5682 29.6875 34.2005 28.0552 34.2005 26.0417C34.2005 24.124 32.719 22.581 30.8396 22.4069C30.5036 22.3756 30.1644 22.3815 29.8413 22.426L29.8417 22.2352C29.8528 21.3171 30.0478 18.611 33.2546 16.8758L32.3248 15.4408Z" />
              </svg>
              <div
                className={`text-center font-['Nunito'] text-[10px] font-bold leading-[150%] ${
                  isShopSetup
                    ? 'text-[#51d7b1] group-hover:text-white'
                    : 'text-[#51d7b1]'
                }`}
              >
                Ulasan Produk
              </div>
            </div>

            {/* Program Super Seller */}
            <div
              onClick={() =>
                isShopSetup && handleNavigate('/seller/dashboard/super-seller')
              }
              className={`flex flex-col items-center gap-1 p-2.5 w-[5.625rem] rounded-md border border-[#d3d3d3] bg-white ${
                isShopSetup
                  ? 'group cursor-pointer opacity-90 hover:bg-[#51D7B1]'
                  : 'cursor-not-allowed opacity-50'
              }`}
            >
              <div
                className={`flex justify-center items-center w-12 h-12 rounded-xl ${
                  isShopSetup
                    ? 'bg-[#51d7b1] group-hover:bg-white text-[#fdfdfd] group-hover:text-[#51d7b1]'
                    : 'bg-[#51d7b1] text-[#fdfdfd]'
                } text-2xl font-bold`}
              >
                SS
              </div>
              <div
                className={`text-center font-['Nunito'] text-[10px] font-bold leading-[150%] ${
                  isShopSetup
                    ? 'text-[#51d7b1] group-hover:text-white'
                    : 'text-[#51d7b1]'
                }`}
              >
                Program Super Seller
              </div>
            </div>
          </div>
        </div>

        {/* Help Center */}
        <div className="bg-white rounded-lg border-2 mt-6 p-4 mb-6 ">
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
            Pusat Edukasi
          </h3>
          <div className="flex flex-col space-y-2">
            <Link href="dashboard/setup-toko/pusat-bantuan">
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
            <Link href="dashboard/setup-toko/live-chat">
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
          </div>
        </div>
      </div>
    </LayoutUtama>
  )
}

interface ActivityItemProps {
  icon: React.ReactNode
  label: string
}

const ActivityItem: React.FC<ActivityItemProps> = ({ icon, label }) => (
  <div className="flex items-center text-sm text-gray-700 hover:bg-gray-100 rounded-lg p-2 cursor allowed opacity-90">
    <span className="mr-3">{icon}</span>
    {label}
  </div>
)
