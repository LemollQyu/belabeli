"use client";

import Link from "next/link";
import IconHistory from "../icon/history";
import IconLocations from "../icon/location";
import IconSuperSeller from "../icon/super-seller";
import IconToko from "../icon/toko";
import IconWarna from "../icon/warna";
import { useState } from "react";
import { data } from "framer-motion/client";
import accept from "@/api/riwayat/transaksi/putPesananDiterimaBuyer";

const Diproses = ({ dataProcess, dataOrderProcess, dataShipped }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const closeModal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsAnimating(true);
  };

  const handleDiterima = async (uuid) => {
    console.log("diterima", uuid);
    console.log("hallo");

    const response = await accept({ orderId: uuid });
    console.log("pesanan diterima buyer = ", response);
  };

  console.log("data proses yang sudah di component ", dataProcess);
  console.log("data order_process di component ", dataOrderProcess);
  console.log("data shipped di component ", dataShipped);

  return (
    <>
      {dataProcess?.length > 0 ||
      dataOrderProcess?.length > 0 ||
      dataShipped?.length > 0 ? null : (
        <div className=" w-full h-56  flex items-center justify-center flex-col px-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="107"
            height="106"
            viewBox="0 0 107 106"
            fill="none"
          >
            <path
              d="M53.5 97.1663V88.333H22.5833V17.6663H66.75V35.333H84.4167V57.4163H93.2491V30.9163L71.1667 8.83301H18.16C15.7264 8.83301 13.75 10.7942 13.75 13.2135V92.7859C13.75 95.1554 15.7144 97.1663 18.1375 97.1663H53.5ZM95.6156 93.285L86.2465 83.9159L95.6156 74.5468L89.3695 68.3008L80.0004 77.6698L70.6314 68.3008L64.3853 74.5468L73.7544 83.9159L64.3853 93.285L70.6314 99.531L80.0004 90.1619L89.3695 99.531L95.6156 93.285Z"
              fill="#D3D3D3"
            />
          </svg>
          <h1 className="font-nunito text-center mt-5 font-bold text-[16px]">
            Tidak ada pesanan
          </h1>
          <p className="font-nunito text-center text-[12px]">
            Anda belum mempunya transaksi pemesanan
          </p>
        </div>
      )}
      {dataProcess?.map?.((dataProses: any, index: number) => {
        console.log("data proses = ", dataProses);
        return (
          <div
            key={index}
            className="relative items-center py-3 text-sm transition-all duration-200 rounded-md cursor-pointer text-black-80 border-white-30 w-full max-w-[444px] bg-gray-100 mt-3"
          >
            {/* --- Header toko ----- */}
            <Link
              href={`/toko/${dataProses.merchant.name}?merchantId=${dataProses?.merchant.id}&merchantSlug=${dataProses?.merchant.slug}`}
            >
              <div className="flex items-center justify-between h-[38px]">
                <div className="flex items-center space-x-2 pl-4">
                  <IconToko></IconToko>
                  {dataProses?.merchant.super_seller && (
                    <IconSuperSeller></IconSuperSeller>
                  )}
                  <p className="text-base text-black-80 font-bold">
                    {dataProses?.merchant.name}
                  </p>
                </div>
                <div className="pr-4">
                  <button className="h-6 w-24 rounded-md border-2 border-[#51DC73] bg-[#EAFBEE] text-[#51DC73] text-[10px] font-bold">
                    {dataProses?.status}
                  </button>
                </div>
              </div>
            </Link>

            {dataProses.order_items?.map?.((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="mt-2 p-3 border-t-2 flex justify-start gap-3"
                >
                  <div className="w-2/6">
                    <img
                      className="object-cover w-full h-[100px] rounded-md"
                      src="/image/image.png"
                    ></img>
                  </div>
                  <div className="w-4/6">
                    <Link
                      href={`/transaksi/detail/${dataProses?.uuid}?q=diproses`}
                    >
                      <h3 className="font-semibold mb-1 text-sm">
                        {item.product.name}
                      </h3>
                      <div className="flex flex-wrap items-center mb-1">
                        <IconLocations></IconLocations>
                        <p className="text-xs">
                          {dataProses.merchant.city},{" "}
                          {dataProses.merchant.province}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center mb-1">
                        <IconWarna></IconWarna>
                        <p className="text-xs">
                          {item.product_stock.variation_item_1.name},{" "}
                          {item.product_stock.variation_item_2.name}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center mb-1">
                        <IconHistory></IconHistory>
                        <p className="text-xs">
                          Estimasi Tiba : {dataProses?.order_shipper.estimasi}{" "}
                          Hari
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}

            <div className="mb-1 px-4 text-base font-bold flex items-center justify-between">
              <span>Total</span>
              <span>Rp {dataProses?.total_amount}</span>
            </div>
            <div className="flex w-full justify-center mt-4">
              <Link
                href={`/pesan/marketplace?id=${dataProses.conversations_id}&toko=${dataProses?.merchant.name}`}
                className="w-full"
              >
                <button
                  type="button"
                  className="bg-[#51D7B1] text-white font-semibold py-2 px-2 rounded-l-lg w-full text-[12px]"
                >
                  Hub Penjual
                </button>
              </Link>
              <button
                type="button"
                onClick={() => handleDiterima(dataProses.uuid)}
                className="bg-[#51D7B1] text-white font-semibold py-2 px-2 rounded-r-lg w-full text-[12px] border-l-4 border-white"
              >
                Diterima
              </button>
            </div>
          </div>
        );
      })}
      {dataOrderProcess?.map?.((dataOrderProcess: any, index: number) => {
        // console.log("data proses = ", dataProses);
        return (
          <div
            key={index}
            className="relative items-center py-3 text-sm transition-all duration-200 rounded-md cursor-pointer text-black-80 border-white-30 w-full max-w-[444px] bg-gray-100 mt-3"
          >
            {/* --- Header toko ----- */}
            <Link
              href={`/toko/${dataOrderProcess?.merchant.name}?merchantId=${dataOrderProcess?.merchant.id}&merchantSlug=${dataOrderProcess?.merchant.slug}`}
            >
              <div className="flex items-center justify-between h-[38px]">
                <div className="flex items-center space-x-2 pl-4">
                  <IconToko></IconToko>
                  {dataOrderProcess?.merchant.super_seller && (
                    <IconSuperSeller></IconSuperSeller>
                  )}
                  <p className="text-base text-black-80 font-bold">
                    {dataOrderProcess?.merchant.name}
                  </p>
                </div>
                <div className="pr-4">
                  <button className="h-6 w-24 rounded-md border-2 border-[#51DC73] bg-[#EAFBEE] text-[#51DC73] text-[10px] font-bold">
                    {dataOrderProcess?.status}
                  </button>
                </div>
              </div>
            </Link>

            {dataOrderProcess.order_items?.map?.((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="mt-2 p-3 border-t-2 flex justify-start gap-3"
                >
                  <div className="w-2/6">
                    <img
                      className="object-cover w-full h-[100px] rounded-md"
                      src="/image/image.png"
                    ></img>
                  </div>
                  <div className="w-4/6">
                    <Link
                      href={`/transaksi/detail/${dataOrderProcess?.uuid}?q=diproses`}
                    >
                      <h3 className="font-semibold mb-1 text-sm">
                        {item.product.name}
                      </h3>
                      <div className="flex flex-wrap items-center mb-1">
                        <IconLocations></IconLocations>
                        <p className="text-xs">
                          {dataOrderProcess.merchant.city},{" "}
                          {dataOrderProcess.merchant.province}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center mb-1">
                        <IconWarna></IconWarna>
                        <p className="text-xs">
                          {item.product_stock.variation_item_1.name},{" "}
                          {item.product_stock.variation_item_2.name}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center mb-1">
                        <IconHistory></IconHistory>
                        <p className="text-xs">
                          Estimasi Tiba :{" "}
                          {dataOrderProcess?.order_shipper.estimasi} Hari
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}

            <div className="mb-1 px-4 text-base font-bold flex items-center justify-between">
              <span>Total</span>
              <span>Rp {dataOrderProcess?.total_amount}</span>
            </div>
            <div className="flex w-full justify-center mt-4">
              <Link
                href={`/pesan/marketplace?id=${dataOrderProcess.conversations_id}&toko=${dataOrderProcess?.merchant?.name}`}
                className="w-full"
              >
                <button
                  type="button"
                  className="bg-[#51D7B1] text-white font-semibold py-2 px-2 rounded-l-lg w-full text-[12px]"
                >
                  Hub Penjual
                </button>
              </Link>
              <button
                type="button"
                onClick={() => handleDiterima(dataOrderProcess?.uuid)}
                className="bg-[#51D7B1] text-white font-semibold py-2 px-2 rounded-r-lg w-full text-[12px] border-l-4 border-white"
              >
                Diterima
              </button>
            </div>
          </div>
        );
      })}
      {dataShipped?.map?.((itemShipped: any, index: number) => {
        // console.log("data proses = ", dataProses);
        return (
          <div
            key={index}
            className="relative items-center py-3 text-sm transition-all duration-200 rounded-md cursor-pointer text-black-80 border-white-30 w-full max-w-[444px] bg-gray-100 mt-3"
          >
            {/* --- Header toko ----- */}
            <Link
              href={`/toko/${itemShipped?.merchant.name}?merchantId=${itemShipped?.merchant.id}&merchantSlug=${itemShipped?.merchant.slug}`}
            >
              <div className="flex items-center justify-between h-[38px]">
                <div className="flex items-center space-x-2 pl-4">
                  <IconToko></IconToko>
                  {itemShipped?.merchant.super_seller && (
                    <IconSuperSeller></IconSuperSeller>
                  )}
                  <p className="text-base text-black-80 font-bold">
                    {itemShipped?.merchant.name}
                  </p>
                </div>
                <div className="pr-4">
                  <button className="h-6 w-24 rounded-md border-2 border-[#51DC73] bg-[#EAFBEE] text-[#51DC73] text-[10px] font-bold">
                    {itemShipped?.status}
                  </button>
                </div>
              </div>
            </Link>

            {itemShipped.order_items?.map?.((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="mt-2 p-3 border-t-2 flex justify-start gap-3"
                >
                  <div className="w-2/6">
                    <img
                      className="object-cover w-full h-[100px] rounded-md"
                      src="/image/image.png"
                    ></img>
                  </div>
                  <div className="w-4/6">
                    <Link
                      href={`/transaksi/detail/${dataShipped?.uuid}?q=diproses`}
                    >
                      <h3 className="font-semibold mb-1 text-sm">
                        {item.product.name}
                      </h3>
                      <div className="flex flex-wrap items-center mb-1">
                        <IconLocations></IconLocations>
                        <p className="text-xs">
                          {itemShipped.merchant.city},{" "}
                          {itemShipped.merchant.province}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center mb-1">
                        <IconWarna></IconWarna>
                        <p className="text-xs">
                          {item.product_stock.variation_item_1.name},{" "}
                          {item.product_stock.variation_item_2.name}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center mb-1">
                        <IconHistory></IconHistory>
                        <p className="text-xs">
                          Estimasi Tiba : {itemShipped?.order_shipper.estimasi}{" "}
                          Hari
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}

            <div className="mb-1 px-4 text-base font-bold flex items-center justify-between">
              <span>Total</span>
              <span>Rp {itemShipped?.total_amount}</span>
            </div>
            <div className="flex w-full justify-center mt-4">
              <Link
                href={"/pesan/marketplace/anugrah-store"}
                className="w-full"
              >
                <button
                  type="button"
                  className="bg-[#51D7B1] text-white font-semibold py-2 px-2 rounded-l-lg w-full text-[12px]"
                >
                  Hub Penjual
                </button>
              </Link>
              <button
                type="button"
                onClick={() => handleDiterima(itemShipped?.uuid)}
                className="bg-[#51D7B1] text-white font-semibold py-2 px-2 rounded-r-lg w-full text-[12px] border-l-4 border-white"
              >
                Diterima
              </button>
            </div>
          </div>
        );
      })}{" "}
    </>
  );
};

export default Diproses;
