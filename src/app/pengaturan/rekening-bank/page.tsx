"use client";

import { useState, useEffect, Component } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LayoutUtama from "@/app/layouts/layout-utama";
import Header from "@/app/layouts/header";
import getRekening from "@/api/settings/getRekening";
import deleteRekening from "@/api/settings/deleteRekening";
import Alert from "@/app/components/Alert";

interface Rekening {
  id: string;
  namaPemilik: string;
  nomorRekening: string;
  bank: string;
}

const RekeningBank = () => {
  const router = useRouter();
  const [rekeningList, setRekeningList] = useState<Rekening[]>([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await deleteRekening({ id });
      console.log("Rekening successfully deleted");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete rekening:", error);
    }
  };

  useEffect(() => {
    setLoadingImage(true);

    async function HandleGetNomorRekening() {
      try {
        const response = await getRekening(); // Assume this fetches API response
        console.log("get data rekening", response.data);

        // Map the API data to match the `Rekening[]` structure
        const transformedData = response.data.map((item: any) => ({
          namaPemilik: item.full_name,
          nomorRekening: item.no_rekening,
          bank: item.bank_name,
          id: item.id,
        }));

        // Set the transformed data into the state
        setRekeningList(transformedData);
      } catch (error) {
        console.error("Failed to fetch rekening data", error);
      } finally {
        setLoadingImage(false);
      }
    }

    HandleGetNomorRekening();
  }, []);

  return (
    <>
      <LayoutUtama>
        <Header title="Rekening" children={undefined} />
        <div className="flex flex-col min-h-screen">
          <div className="container w-[400px] mx-auto p-4 pt-20 flex-grow">
            {rekeningList.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-center text-[14px] font-nunito font-semibold">
                  Belum Ada Rekening Tersimpan
                </h1>
                <Link href="/pengaturan/tambah-rekening" className="w-full">
                  <div className="flex items-center justify-center mt-[300px]">
                    <button
                      className="text-[#0F0F0F] font-nunito text-[15px] font-bold w-full p-3 text-white rounded-lg"
                      style={{
                        background: "var(--Warna-Utama, #51D7B1)",
                        borderRadius: "8px",
                      }}
                    >
                      Tambah Rekening Bank
                    </button>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="px-4 mt-4 font-nunito">
                <h2 className="text-[16px] font-semibold mb-4">
                  Daftar Rekening:
                </h2>
                <ul className="space-y-2">
                  {rekeningList.map((rekening, index) => (
                    <li
                      key={index}
                      className="flex items-center bg-white p-4 rounded-lg shadow-sm border border-gray-300"
                    >
                      <div className="flex-shrink-0 mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5.121 17.804A8.001 8.001 0 0112 15c2.31 0 4.386.982 5.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-[14px] text-black">
                          {rekening.namaPemilik}
                        </p>
                        <p className="text-gray-500 text-[12px]">
                          {rekening.nomorRekening} ({rekening.bank})
                        </p>
                      </div>
                      <a
                        className="ml-auto"
                        onClick={() => handleDelete(rekening.id)}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 6H18V19C18 19.5523 17.5523 20 17 20H3C2.44772 20 2 19.5523 2 19V6ZM5 3V1C5 0.44772 5.44772 0 6 0H14C14.5523 0 15 0.44772 15 1V3H20V5H0V3H5ZM7 2V3H13V2H7ZM7 10V16H9V10H7ZM11 10V16H13V10H11Z"
                            fill="red"
                          />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>

                <Link href="/pengaturan/tambah-rekening" className="w-full">
                  <div className="flex items-center justify-center mt-[300px]">
                    <button
                      className="text-[#0F0F0F] font-nunito text-[15px] font-bold w-full p-3 text-white rounded-lg"
                      style={{
                        background: "var(--Warna-Utama, #51D7B1)",
                        borderRadius: "8px",
                      }}
                    >
                      Tambah Rekening Bank
                    </button>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </LayoutUtama>
    </>
  );
};

export default RekeningBank;
