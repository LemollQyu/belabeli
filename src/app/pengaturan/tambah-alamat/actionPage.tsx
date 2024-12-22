"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Alamat from "@/app/components/pembayaran/alamat-settings"; // Import Alamat
import LayoutUtama from "@/app/layouts/layout-utama";
import Header from "@/app/layouts/header";
import getAddress from "@/api/address/getAddress";
import Loading from "@/app/components/loading";
import { AppContext2 } from "./page";
import { useRouter, useSearchParams } from "next/navigation";

// Exporting addressData

const ActionPage = () => {
  const [dataAlamat, setDataAlamat] = useState<any>({});
  const [loadingAlamat, setLoadingAlamat] = useState<boolean>(false);
  const context = useContext(AppContext2);

  const [isUse, setIsUse] = useState<string>("");
  const router = useRouter();

  if (!context) {
    throw new Error("AppContext2 must be used within AddressList");
  }

  const { isTrigger, setTrigger } = context;

  useEffect(() => {
    setLoadingAlamat(true);
    async function fetchData() {
      const response = await getAddress();
      setDataAlamat(response.data);

      setLoadingAlamat(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await getAddress();
      setDataAlamat(response.data);
    }

    fetchData();
  }, [isTrigger]);

  // console.log("data ", dataAlamat);

  useEffect(() => {
    if (dataAlamat?.data?.length > 0) {
      const item = dataAlamat.data.find((item: any) => item.use === 1);
      if (item && isUse !== item.id) {
        setIsUse(item.id);
      }
    }
  }, [dataAlamat, isUse]);

  return (
    <>
      <LayoutUtama>
        <Header title="Ganti Alamat" children={undefined} />
        <div className="container w-[400px] mx-auto">
          <div className="mt-24 space-y-4">
            {/* Pemetaan data alamat dengan komponen Alamat */}
            {loadingAlamat ? (
              <div className="mt-4 px-4 flex flex-col items-center justify-between gap-4">
                <div
                  className={`bg-white w-full border p-4 rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] flex items-start`}
                >
                  {/* Icon maps */}
                  <div className="flex-shrink-0">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"
                        fill="#0095FF"
                      />
                    </svg>
                  </div>

                  {/* Informasi Alamat */}
                  <div className="ml-6 flex-grow"></div>

                  {/* Icon arrow-up-s-line */}
                  <div className="flex-shrink-0">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.1716 11.9999L8.2218 7.0502L9.636 5.63599L16 11.9999L9.636 18.3639L8.2218 16.9497L13.1716 11.9999Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </div>

                <div className="bg-white w-full p-4 rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] flex items-start">
                  {/* Icon maps */}
                  <div className="flex-shrink-0">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"
                        fill="#0095FF"
                      />
                    </svg>
                  </div>

                  {/* Informasi Alamat */}
                  <div className="ml-6 flex-grow"></div>

                  {/* Icon arrow-up-s-line */}
                  <div className="flex-shrink-0">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.1716 11.9999L8.2218 7.0502L9.636 5.63599L16 11.9999L9.636 18.3639L8.2218 16.9497L13.1716 11.9999Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </div>

                <div className="bg-white w-full p-4 rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] flex items-start">
                  {/* Icon maps */}
                  <div className="flex-shrink-0">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"
                        fill="#0095FF"
                      />
                    </svg>
                  </div>

                  {/* Informasi Alamat */}
                  <div className="ml-6 flex-grow"></div>

                  {/* Icon arrow-up-s-line */}
                  <div className="flex-shrink-0">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.1716 11.9999L8.2218 7.0502L9.636 5.63599L16 11.9999L9.636 18.3639L8.2218 16.9497L13.1716 11.9999Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              dataAlamat?.data?.map?.((address: any, index: number) => {
                // console.log("key = ", index, "use = ", address.use);
                return (
                  <div
                    className={`mx-4 rounded-lg ${
                      address.use == 0
                        ? "border-2"
                        : "border-2 border-warnaUtama  shadow-warnaUtama"
                    }`}
                  >
                    <Alamat
                      key={index}
                      idKey={index}
                      name={address.full_name}
                      phone={address.no_telepon}
                      street={address.street}
                      address={address.instructions}
                      district={address.subdistrict}
                      city={address.city}
                      province={address.province}
                      postalCode={address.postal_code}
                      idAddress={address.id}
                    />
                  </div>
                );
              })
            )}
          </div>

          <Link href="/pengaturan/tambah-alamat/address-form">
            <button className="text-[#0F0F0F] font-nunito text-[14px] font-bold mt-4 flex items-center ml-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"
                  fill="black"
                />
              </svg>
              <span className="px-2">Tambah Alamat Baru</span>
            </button>
          </Link>
          {isUse != "" ? (
            <div
              onClick={() => {
                console.log("cek");

                console.log(isUse);
                router.push("/pembayaran");
              }}
              className={`flex items-center justify-center mt-[180px] px-4`}
            >
              <button
                className="text-white font-nunito text-[16px] font-bold mt-6 w-full py-3  rounded-lg "
                style={{
                  background: "var(--Warna-Utama, #51D7B1)",
                  borderRadius: "8px",
                }}
              >
                Lanjutkan
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center mt-[180px] px-4">
              <button
                className={`text-[#0F0F0F] font-nunito text-[16px] font-bold mt-6 w-full py-3 bg-buttonGrey rounded-lg`}
                style={{
                  borderRadius: "8px",
                }}
              >
                Lanjutkan
              </button>
            </div>
          )}
        </div>
      </LayoutUtama>
    </>
  );
};

export default ActionPage;
