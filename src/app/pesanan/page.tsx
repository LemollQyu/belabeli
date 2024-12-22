"use client";
import Link from "next/link";
import LayoutUtama from "../layouts/layout-utama";
import { useEffect, useState } from "react";

interface AlamatProps {
  name: string;
  phone: string;
  address: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
}

interface DataState {
  dataAddress: Record<string, any> | null;
  productBuy: Record<string, any> | null;
  orderCode: string;
  dataPengiriman: Record<string, any> | null;
  dataMerchant: Record<string, any> | null;
}

const Alamat = ({
  name,
  address,
  district,
  city,
  province,
  postalCode,
  phone,
}: AlamatProps) => {
  const [data, setData] = useState<DataState>({
    dataAddress: null,
    productBuy: null,
    orderCode: "",
    dataPengiriman: null,
    dataMerchant: null,
  });

  useEffect(() => {
    // Ambil data dari localStorage
    const dataAddress = JSON.parse(localStorage.getItem("dataAddress") || "{}");
    const productBuy = JSON.parse(localStorage.getItem("productBuy") || "{}");
    const orderCode = localStorage.getItem("orderCode") || "";
    const dataPengiriman = JSON.parse(
      localStorage.getItem("dataPengiriman") || "{}"
    );
    const dataMerchant = JSON.parse(
      localStorage.getItem("dataMerchant") || "{}"
    );

    // Simpan ke state
    setData({
      dataAddress,
      productBuy,
      orderCode,
      dataPengiriman,
      dataMerchant,
    });

    // Log data setelah pembaruan
    console.log("pesanan yang berhasil = ", {
      dataAddress,
      productBuy,
      orderCode,
      dataMerchant,
    });
  }, []);
  return (
    <div className="mt-4 px-2">
      <div className="bg-white p-4 rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] flex items-start">
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
        <div className="ml-6 flex-grow">
          <h2 className="text-[#0F0F0F] font-nunito text-[14px] font-bold">
            {data?.dataAddress?.full_name}
          </h2>
          <p className="mt-2 text-[#1B1E28] font-nunito text-[12px]">
            {data?.dataAddress?.street}, {data?.dataAddress?.subdistrict}
          </p>
          <p className="text-[#1B1E28] font-nunito text-[12px]">
            {data?.dataAddress?.city}
          </p>
          <p className="text-[#1B1E28] font-nunito text-[12px]">
            {data?.dataAddress?.province}
          </p>
          <p className="text-[#1B1E28] font-nunito text-[12px]">
            {data?.dataAddress?.postal_code}
          </p>
        </div>
      </div>
    </div>
  );
};

export const addressData = [
  {
    key: 1,
    name: "Annas Aulia Rahman",
    phone: "081234567890",
    address: "Jl. Kanjeng Sepuh No. 1 ",
    district: "Kecamatan Kauman",
    city: "Kabupaten Gresik",
    province: "Jawa Timur",
    postalCode: "61153",
  },
];
const Pesanan = () => {
  const [data, setData] = useState<DataState>({
    dataAddress: null,
    productBuy: null,
    orderCode: "",
    dataPengiriman: null,
    dataMerchant: null,
  });

  useEffect(() => {
    // Ambil data dari localStorage
    const dataAddress = JSON.parse(localStorage.getItem("dataAddress") || "{}");
    const productBuy = JSON.parse(localStorage.getItem("productBuy") || "{}");
    const orderCode = localStorage.getItem("orderCode") || "";
    const dataPengiriman = JSON.parse(
      localStorage.getItem("dataPengiriman") || "{}"
    );
    const dataMerchant = JSON.parse(
      localStorage.getItem("dataMerchant") || "{}"
    );

    // Simpan ke state
    setData({
      dataAddress,
      productBuy,
      orderCode,
      dataPengiriman,
      dataMerchant,
    });

    // Log data setelah pembaruan
    console.log("pesanan yang berhasil = ", {
      dataAddress,
      productBuy,
      orderCode,
      dataPengiriman,
      dataMerchant,
    });
  }, []);
  return (
    <>
      <LayoutUtama>
        <div className="w-full max-w-[400px] mx-auto py-4 px-2 space-y-6 font-nunito">
          <div className="flex justify-center items-center mt-4">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50.0002 91.6666C26.9883 91.6666 8.3335 73.0116 8.3335 49.9999C8.3335 26.988 26.9883 8.33325 50.0002 8.33325C73.0118 8.33325 91.6668 26.988 91.6668 49.9999C91.6668 73.0116 73.0118 91.6666 50.0002 91.6666ZM45.8443 66.6666L75.3072 37.2038L69.4147 31.3113L45.8443 54.8816L34.0594 43.0962L28.1668 48.9891L45.8443 66.6666Z"
                fill="url(#paint0_linear_4359_25073)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_4359_25073"
                  x1="8.3335"
                  y1="49.9999"
                  x2="91.6668"
                  y2="49.9999"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#83E69B" />
                  <stop offset="1" stopColor="#00BAE1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col items-center space-y-2 px-4">
            <div className="font-nunito text-[24px] font-bold">
              Terima Kasih
            </div>
            <div className="font-nunito text-[14px]">
              Pesanan anda telah berhasil dibuat
            </div>
          </div>
          <div className="px-2">
            <div className="bg-neutral-100 rounded-lg p-4 space-y-2">
              <div className="text-start font-nunito text-xs font-light">
                Order ID: {data?.orderCode}
              </div>
              <div className="h-px bg-[#d2d2d2]" />
              {data?.productBuy?.map?.((product: any, number: any) => {
                return (
                  <div key={number} className="flex space-x-2">
                    <img
                      className="w-[100px] h-[100px] rounded-md mr-3"
                      src="https://images.tokopedia.net/img/cache/700/VqbcmM/2023/3/7/1abd04f3-e85a-434e-82de-2ec36e34bf81.jpg"
                      alt="Anugrah Shoes"
                    />
                    <div className="flex flex-col space-y-1.5">
                      <div className="text-black text-[12px] font-nunito font-semibold">
                        {product.product.name}
                      </div>
                      <div className="text-[10px] font-nunito flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.08317 3.33325H8.33317L9.58317 5.02313V7.49992H8.73509C8.63396 8.20663 8.02617 8.74992 7.2915 8.74992C6.55684 8.74992 5.94905 8.20663 5.84792 7.49992H3.73507C3.63398 8.20663 3.02619 8.74992 2.2915 8.74992C1.55682 8.74992 0.949029 8.20663 0.847937 7.49992H0.416504V2.49992C0.416504 2.2698 0.603054 2.08325 0.833171 2.08325H6.6665C6.89663 2.08325 7.08317 2.2698 7.08317 2.49992V3.33325ZM7.08317 4.16659V5.41659H8.74984V5.29784L7.91304 4.16659H7.08317Z"
                              fill="#51D7B1"
                            />
                          </svg>
                          <span>
                            {data?.dataPengiriman?.description}{" "}
                            {`(${data.dataMerchant?.city} - ${
                              data?.dataAddress
                                ? data.dataAddress.city
                                : "No address"
                            })`}
                          </span>
                        </div>
                      </div>

                      <div className="text-[10px] font-nunito flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <svg
                            width="15"
                            height="16"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_4559_12524)">
                              <path
                                d="M6.90471 3.84487C7.01938 3.58666 7.08309 3.30081 7.08309 3.00008C7.08309 1.84949 6.15034 0.916748 4.99975 0.916748C3.84917 0.916748 2.91642 1.84949 2.91642 3.00008C2.91642 4.07617 3.73227 4.96171 4.77917 5.07187C5.28559 4.3502 6.07317 3.92002 6.90471 3.84487ZM5.48075 7.97766C5.8315 7.21991 5.85275 6.32262 5.48096 5.52316C6.0998 4.67166 7.27446 4.40793 8.20634 4.94596C9.20275 5.52129 9.54417 6.79533 8.96888 7.79175C8.39359 8.78821 7.11942 9.12962 6.123 8.55433C5.86263 8.404 5.647 8.206 5.48075 7.97766ZM2.61363 4.67796C3.09453 5.36058 3.86097 5.82758 4.73925 5.90533C5.16717 6.86704 4.80821 8.01625 3.87632 8.55429C2.87988 9.12958 1.60573 8.78816 1.03044 7.79175C0.455141 6.79529 0.79655 5.52112 1.79299 4.94583C2.05338 4.7955 2.33274 4.70775 2.61363 4.67796Z"
                                fill="#51D7B1"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_4559_12524">
                                <rect
                                  width="10"
                                  height="10"
                                  fill="white"
                                  transform="translate(0 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <span>
                            Varian:{" "}
                            {product.product_stock.variation_item_1.name},{" "}
                            {product.product_stock.variation_item_2.name}
                          </span>
                        </div>
                      </div>

                      <div className="font-nunito font-bold text-[#1b1e28]">
                        Rp {product.price}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="px-2 font-nunito text-[14px] font-bold ">
            Diantar Ke:
          </div>
          {addressData.map((address, index) => (
            <Alamat
              key={index}
              name={address.name}
              phone={address.phone}
              address={address.address}
              district={address.district}
              city={address.city}
              province={address.province}
              postalCode={address.postalCode}
            />
          ))}

          <div className="space-y-4 px-2">
            <div className="bg-[#51d7b1] rounded-lg text-white text-center p-3 text-sm font-bold">
              <Link href="/lacak-pesanan">Lacak Pesanan</Link>
            </div>

            <div className="px-4 border border-[#25a07d] rounded-xl p-3 text-center text-[#25a07d] text-xs font-semibold">
              <Link href="/">Lanjutkan Belanja</Link>
            </div>
          </div>
        </div>
      </LayoutUtama>
    </>
  );
};

export default Pesanan;
