import { useRouter } from "next/navigation";
import React from "react";

interface SHistoryProps {
  status?: Boolean; // Make the title prop optional
  data: any;
}

const Searchhistory: React.FC<SHistoryProps> = ({ status, data }: any) => {
  const router = useRouter();

  console.log("data pencarian = ", data);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    router.back();
  };

  if (status) {
    return (
      <>
        <div className="flex flex-wrap py-1 justify-between">
          <span className="font-bold">Pencarian Terakhir</span>
          <span className="font-bold text-sm text-[#51D7B1]">Hapus Semua</span>
        </div>

        <div className="flex flex-wrap justify-between py-2 cursor-pointer">
          <a className="flex flex-wrap items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.72656 4.6001V10.0001H14.9624"
                stroke="#5F5F5F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.72633 19C14.5457 19 18.4527 14.9705 18.4527 10C18.4527 5.02943 14.5457 1 9.72633 1C4.90691 1 1 5.02943 1 10C1 14.9705 4.90691 19 9.72633 19Z"
                stroke="#5F5F5F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span className="font-light text-gray-600 text-center ml-4">
              Sepatu Wanita
            </span>
          </a>

          <a>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 16L8.50002 8.50004M8.50002 8.50004L16 1M8.50002 8.50004L1 1M8.50002 8.50004L16 16"
                stroke="#949494"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="flex flex-wrap justify-between py-2 cursor-pointer">
          <a className="flex flex-wrap items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.72656 4.6001V10.0001H14.9624"
                stroke="#5F5F5F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.72633 19C14.5457 19 18.4527 14.9705 18.4527 10C18.4527 5.02943 14.5457 1 9.72633 1C4.90691 1 1 5.02943 1 10C1 14.9705 4.90691 19 9.72633 19Z"
                stroke="#5F5F5F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span className="font-light text-gray-600 text-center ml-4">
              Tas Selempang
            </span>
          </a>

          <a>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 16L8.50002 8.50004M8.50002 8.50004L16 1M8.50002 8.50004L1 1M8.50002 8.50004L16 16"
                stroke="#949494"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="flex flex-wrap justify-between py-2 cursor-pointer">
          <a className="flex flex-wrap items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.72656 4.6001V10.0001H14.9624"
                stroke="#5F5F5F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.72633 19C14.5457 19 18.4527 14.9705 18.4527 10C18.4527 5.02943 14.5457 1 9.72633 1C4.90691 1 1 5.02943 1 10C1 14.9705 4.90691 19 9.72633 19Z"
                stroke="#5F5F5F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span className="font-light text-gray-600 text-center ml-4">
              Tas Ransel Wanita
            </span>
          </a>

          <a>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 16L8.50002 8.50004M8.50002 8.50004L16 1M8.50002 8.50004L1 1M8.50002 8.50004L16 16"
                stroke="#949494"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="flex flex-wrap justify-between py-2 cursor-pointer">
          <a className="flex flex-wrap items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.72656 4.6001V10.0001H14.9624"
                stroke="#5F5F5F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.72633 19C14.5457 19 18.4527 14.9705 18.4527 10C18.4527 5.02943 14.5457 1 9.72633 1C4.90691 1 1 5.02943 1 10C1 14.9705 4.90691 19 9.72633 19Z"
                stroke="#5F5F5F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span className="font-light text-gray-600 text-center ml-4">
              Baju Koko
            </span>
          </a>

          <a>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 16L8.50002 8.50004M8.50002 8.50004L16 1M8.50002 8.50004L1 1M8.50002 8.50004L16 16"
                stroke="#949494"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="flex flex-wrap justify-center py-2">
          <a className="flex flex-wrap items-center justify-center">
            <span className="font-light text-gray-400 text-center ml-4">
              Lihat Lainnya
            </span>
          </a>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-wrap py-1 justify-between">
          <span className="font-bold">Pencarian Terakhir</span>
        </div>

        <div className="flex flex-wrap justify-center py-2">
          <a className="flex flex-wrap items-center justify-center">
            <span className="font-light text-gray-400 text-center ml-4">
              Tidak ada riwayat pencarian
            </span>
          </a>
        </div>
      </>
    );
  }
};

export default Searchhistory;
