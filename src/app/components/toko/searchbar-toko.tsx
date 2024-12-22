import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

interface HeaderProps {
  keyword?: string; // Make the title prop optional
}

const SearchbarToko: React.FC<HeaderProps> = ({ keyword }: any) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]); // State untuk menyimpan array pencarian
  const params = useParams();
  const toko = Array.isArray(params.toko) ? params.toko[0] : params.toko;

  // Muat searchHistory dari localStorage ketika komponen pertama kali dimuat
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory)); // Mengubah JSON string menjadi array
    }
  }, []);

  // Simpan searchHistory ke localStorage setiap kali searchHistory berubah
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }
  }, [searchHistory]);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    router.back();
  };

  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter" && inputValue.trim()) {
      // Tambahkan inputValue ke searchHistory jika belum ada
      setSearchHistory((prevHistory) => {
        if (!prevHistory.includes(inputValue.trim())) {
          const updatedHistory = [...prevHistory, inputValue.trim()];
          return updatedHistory;
        }
        return prevHistory;
      });

      // Navigasi ke halaman hasil pencarian
      router.push(`/toko/${toko}/hasil?q=${inputValue}`);
      setInputValue(""); // Reset input
    }
  };

  const handleClearHistory = () => {
    setSearchHistory([]); // Menghapus semua riwayat pencarian
  };

  const handleRemoveSearch = (index: number) => {
    setSearchHistory((prevHistory) =>
      prevHistory.filter((_, i) => i !== index)
    ); // Menghapus item berdasarkan indeks
  };

  console.log(searchHistory);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex flex-wrap px-5 py-2 items-center justify-between bg-white text-white transition duration-300 min-h-[75px] max-h-[75px]">
        <div className="flex flex-wrap items-center justify-between mx-auto w-full max-w-[400px] gap-1">
          <div>
            <a
              onClick={handleBack}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center bg-gray-100 rounded-full p-2"
            >
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.88421 0.414315C6.19994 0.673072 6.25112 1.14504 5.99855 1.46849L2.45993 5.99997L5.99855 10.5314C6.25112 10.8549 6.19993 11.3269 5.88421 11.5856C5.56849 11.8444 5.10779 11.7919 4.85521 11.4685L0.950737 6.46849C0.736839 6.19457 0.736839 5.80536 0.950737 5.53145L4.85521 0.531445C5.10779 0.207999 5.56849 0.155558 5.88421 0.414315Z"
                  fill="#1B1E28"
                />
              </svg>
            </a>
          </div>
          <div
            onClick={() => {
              router.push(`/toko/${toko}/pencarian`);
            }}
            className="flex items-center min-w-[70px] min-h-[40px] border rounded-md px-2 bg-white shadow-sm"
          >
            <span className="p-2 text-gray-500">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                  fill="#51D7B1"
                ></path>
              </svg>
            </span>
            <input
              type="text"
              className="ml-2 w-[150px] border-none focus:outline-none text-gray-700 font-nunito"
              placeholder={`Pencarian di ${toko}`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className="px-2 py-2 flex"></div>
        </div>
      </header>

      {/* Menampilkan daftar pencarian */}
      {/* <div className="mx-auto w-[400px]   mt-20 px-5">
        <h2 className="font-bold">Riwayat Pencarian:</h2>
        <ul>
          {searchHistory.map((search, index) => (
            <li
              key={index}
              className="text-gray-700 flex justify-between items-center"
            >
              <span>{search}</span>
              <button
                onClick={() => handleRemoveSearch(index)}
                className="text-red-500 ml-2"
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
        <button onClick={handleClearHistory} className="text-blue-500 mt-2">
          Hapus Semua Riwayat
        </button>
      </div> */}
    </>
  );
};

export default SearchbarToko;
