"use client";
import Link from "next/link";
import Searchcategory from "@/app/components/pencarian/searchcategory";
import Popularcategory from "@/app/components/pencarian/popularcategory";
import Searchhistory from "@/app/components/pencarian/searchhistory";
import Searchresult from "@/app/components/pencarian/searchresult";
import SearchbarToko from "@/app/components/toko/searchbar-toko";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import searchEtalase from "@/api/toko/getSearchEtalase";

interface HeaderProps {
  toko?: string; // Make the title prop optional
}

const PencarianToko: React.FC<HeaderProps> = () => {
  const params = useParams(); // Mengambil parameter dari URL
  const toko = params.toko;

  const [dataPencarian, setDataPencarian] = useState<any>({});
  const [historyPencarian, setHistoryPencarian] = useState<any>([]);
  const [searchHistory, setSearchHistory] = useState<any>(null);

  useEffect(() => {
    fetchData();

    async function fetchData() {
      const response = await searchEtalase({ merchantSlug: toko });

      console.log(response);
      setDataPencarian(response?.data?.data);
    }
  }, []);

  // console.log(toko);
  console.log(dataPencarian);

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory)); // Mengubah JSON string menjadi array
    }
  }, []);

  console.log("data pecarian = ", searchHistory);

  // Menghapus semua riwayat pencarian dan update localStorage
  const handleClearHistory = () => {
    setSearchHistory([]); // Menghapus semua riwayat pencarian
    localStorage.removeItem("searchHistory"); // Menghapus riwayat pencarian dari localStorage
  };

  // Menghapus riwayat pencarian berdasarkan indeks dan update localStorage
  const handleRemoveSearch = (index: number) => {
    const updatedHistory = searchHistory.filter(
      (_: any, i: number) => i !== index
    ); // Menghapus item berdasarkan indeks
    setSearchHistory(updatedHistory); // Memperbarui state
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory)); // Memperbarui localStorage
  };

  return (
    <>
      <SearchbarToko />
      <div className="flex flex-wrap">
        <div className="px-4 font-nunito absolute pt-20 items-center w-[400px] left-1/2 -translate-x-1/2">
          {/* <Searchhistory data={dataPencarian} status={false}></Searchhistory> */}
          <div className="flex flex-wrap py-1 justify-between">
            <span className="font-bold">Pencarian Terakhir</span>
            <span
              onClick={handleClearHistory}
              className="font-bold text-sm text-[#51D7B1]"
            >
              Hapus Semua
            </span>
          </div>

          {searchHistory?.map((search: any, index: number) => (
            <div className="flex flex-wrap justify-between py-2 cursor-pointer">
              <Link
                className="flex flex-wrap items-center justify-center"
                href={`/toko/${toko}/hasil?q=${search}`}
              >
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
                  {search}
                </span>
              </Link>

              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => handleRemoveSearch(index)}
              >
                <path
                  d="M1 16L8.50002 8.50004M8.50002 8.50004L16 1M8.50002 8.50004L1 1M8.50002 8.50004L16 16"
                  stroke="#949494"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="mx-auto w-[400px]   mt-20 px-5">
        <h2 className="font-bold">Riwayat Pencarian:</h2>
        <ul>
          {searchHistory.map((search: any, index: number) => (
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

export default PencarianToko;
