"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/layouts/header";
import LayoutUtama from "@/app/layouts/layout-utama";

const RiwayatPencarian: React.FC = () => {
  // State untuk menyimpan riwayat pencarian dengan data awal yang bervariasi

    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        const historyJSON = localStorage.getItem('history');
        if (historyJSON) {
            const historyArray = JSON.parse(historyJSON);
            setSearchHistory(historyArray); // Update state with the history array from localStorage
        } else {
            console.log("No search history found in localStorage.");
        }
    }, []); // Empty dependency array ensures this runs once on component mount


  const handleRemoveItem = (itemToRemove: string) => {
    const historyJSON = localStorage.getItem('history');
    if (historyJSON) {
        let historyArray = JSON.parse(historyJSON);
        historyArray = historyArray.filter((item) => item !== itemToRemove);
        localStorage.setItem('history', JSON.stringify(historyArray));
        setSearchHistory(historyArray);
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('history'); // Remove from localStorage
    setSearchHistory([]); // Clear state
  };

  return (
    <LayoutUtama>
      {/* Header */}
      <Header title="Riwayat Pencarian" children={undefined} />

      {/* Konten Utama */}
      <div className="container w-full max-w-[400px] mx-auto p-4 font-nunito mt-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[16px] font-bold text-black">Pencarian Terakhir</h2>
          <button onClick={clearHistory} className="text-[#0095FF] font-semibold text-[14px]">
            Hapus Semua
          </button>
        </div>

        {/* Daftar Riwayat Pencarian */}
        {searchHistory.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {searchHistory.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {/* Ikon Jam */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400"
                  >
                    <path
                      d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1Z"
                      stroke="#949494"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 5V12L17 14"
                      stroke="#949494"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm text-[#5F5F5F]">{item}</span>
                </div>
                <button onClick={() => handleRemoveItem(item)}>
                  {/* Ikon Close */}
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_6729_3427)">
                      <path
                        d="M1 16L8.50002 8.50004M8.50002 8.50004L16 1M8.50002 8.50004L1 1M8.50002 8.50004L16 16"
                        stroke="#949494"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_6729_3427">
                        <rect width="17" height="17" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Tidak ada riwayat pencarian.</p>
        )}
      </div>
    </LayoutUtama>
  );
};

export default RiwayatPencarian;
