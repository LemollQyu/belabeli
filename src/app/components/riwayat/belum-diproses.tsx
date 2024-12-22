"use client";

import Link from "next/link";
import IconLocations from "../icon/location";
import IconSuperSeller from "../icon/super-seller";
import IconToko from "../icon/toko";
import IconWarna from "../icon/warna";
import IconHistory from "../icon/history";
import { useState } from "react";
import cancel from "@/api/riwayat/transaksi/putCancelOrder";
import { useRouter } from "next/navigation";
const BelumDiproses = ({ dataPending }: any) => {
  console.log("ini sudah di component data pending = ", dataPending);
  const router = useRouter();

  const handleBatalkan = (id: string, data: any) => {
    console.log(data);
    localStorage.setItem("batalkanData", JSON.stringify(data));
    router.push(`/transaksi/batalkan/${id}`);
  };

  return (
    <>
      {dataPending?.length > 0 ? null : (
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
      {dataPending?.map?.((itemPending: any, index: number) => {
        console.log("data order pending", itemPending);

        return (
          <div
            key={index}
            className="relative items-center py-3 text-sm transition-all duration-200 rounded-md cursor-pointer text-black-80 border-white-30 w-full max-w-[444px] bg-gray-100 mt-3"
          >
            {/* --- Header toko ----- */}
            <Link
              href={`/toko/${itemPending.merchant.name}?merchantId=${itemPending?.merchant.id}&merchantSlug=${itemPending?.merchant.slug}`}
            >
              <div className="flex items-center justify-between h-[38px]">
                <div className="flex items-center space-x-2 pl-4">
                  <IconToko></IconToko>
                  {itemPending?.merchant.super_seller ? (
                    <IconSuperSeller></IconSuperSeller>
                  ) : null}
                  <p className="text-base text-black-80 font-bold">
                    {itemPending?.merchant.name}
                  </p>
                </div>
                <div className="pr-4">
                  <button className="h-6 w-24 rounded-md border-2 border-[#EE443F] bg-[#FCDAD9] text-[#EE443F] text-[10px] font-bold">
                    {itemPending?.status}
                  </button>
                </div>
              </div>
            </Link>

            {/* --- Body toko ----- */}
            {itemPending?.order_items?.map?.((item: any, index: number) => {
              return (
                <Link
                  href={`/transaksi/detail/${itemPending?.uuid}?q=belum-diproses`}
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
                    <h3 className="font-semibold mb-1 text-sm">
                      {item.product.name}
                    </h3>

                    <div className="flex flex-wrap items-center mb-1">
                      <IconLocations></IconLocations>
                      <p className="text-xs">
                        {itemPending?.merchant.province},{" "}
                        {itemPending?.merchant.city}
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
                        Estimasi Tiba : {itemPending?.order_shipper.estimasi}{" "}
                        Hari
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
            <div className="mb-1 px-4 text-base font-bold flex items-center justify-between">
              <span>Total</span>
              <span>Rp. {itemPending?.total_amount}</span>
            </div>

            <div className="flex w-full justify-center mt-4">
              <Link
                href={`/pesan/marketplace?id=${itemPending.conversations_id}&toko=${itemPending?.merchant.name}`}
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
                onClick={() =>
                  handleBatalkan(itemPending.uuid, dataPending[index])
                }
                type="button"
                className="bg-[#EE443F] text-white font-semibold py-2 px-2 rounded-r-lg w-full text-[12px] border-l-4 border-white"
              >
                Batalkan
              </button>
            </div>
          </div>
        );
      })}
      {/* --- Card toko status : belum diproses----- */}

      {/* --- End card toko status : belum diproses --- */}
      <div></div>
    </>
  );
};

export default BelumDiproses;
