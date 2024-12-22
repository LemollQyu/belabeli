"use client";
import Link from "next/link";
import Header from "@/app/layouts/header";
import React, { useState, useEffect } from "react";
import IconToko from "@/app/components/icon/toko";
import IconSuperSeller from "@/app/components/icon/super-seller";
import IconLocations from "@/app/components/icon/location";
import IconHistory from "@/app/components/icon/history";
import IconWarna from "@/app/components/icon/warna";
import { useParams, usePathname } from "next/navigation";
import order from "@/api/pembayaran/getOrder";
import cencel from "@/api/riwayat/transaksi/putCancelOrder";
import { useRouter } from "next/navigation";

const BatalkanPesanan = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [dataProductOrderDibatalkan, setDataProductOrderDibatalkan] =
    useState<any>(null);
  const [valueLainnya, setValueLainnya] = useState<string>("");
  const [valueYangDipilih, setValueYangDipilih] = useState<any>(null);

  const pathname = usePathname(); // Mendapatkan URL path
  const segments = pathname.split("/"); // Memisahkan path berdasarkan "/"
  const transaksiId = segments[segments.length - 1]; // Ambil segmen terakhir (UUID)
  const router = useRouter();

  console.log("uuid orderId = ", transaksiId);
  console.log("alasan = ", selectedOption);

  console.log("data order yang dibatalkan = ", dataProductOrderDibatalkan);

  const options = [
    "Ingin mengubah pesanan",
    "Ingin mengubah pengiriman",
    "Kendala penjual",
    "Lainnya",
  ]; // Replace with your actual options

  const handleSelect = (option: React.SetStateAction<string>) => {
    setSelectedOption(option);
    setIsOpen(false);
    setIsDisabled(false);
  };

  useEffect(() => {
    if (selectedOption === "Lainnya") {
      setValueYangDipilih(valueLainnya);
    } else {
      setValueYangDipilih(selectedOption);
    }
  }, [selectedOption, valueLainnya]);

  console.log("alasan di batalakan = ", valueYangDipilih);

  const handleAjukanPembayaran = async () => {
    console.log("uuid orderId = ", transaksiId);
    console.log("alasan = ", selectedOption);
    console.log("value yang lainnya = ", valueYangDipilih);

    const response = await cencel({
      orderId: transaksiId,
      alesan: valueYangDipilih,
    });

    console.log("data dibatalkan = ", response);

    if (response?.data?.code == 200) {
      router.push(`/transaksi/batalkan/${transaksiId}/rincian?q=pending`);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await order({ orderId: transaksiId });

      console.log(response);
      setDataProductOrderDibatalkan(response.data?.data);
    }

    fetchData();
  }, []);

  let { batalkan } = useParams();

  if (Array.isArray(batalkan)) {
    batalkan = batalkan[0]; // If `toko` is an array, use the first element
  }

  return (
    <>
      <Header title="Batalkan Pesanan" children={undefined} />
      <div className="px-4 font-nunito absolute pt-20 items-center h-screen pb-20 border w-[400px] left-1/2 -translate-x-1/2">
        {/* --- Card toko status : diproses----- */}
        <div className="relative items-center py-3 text-sm transition-all duration-200 rounded-md cursor-pointer text-black-80 border-white-30 w-full max-w-[444px] bg-gray-100 mt-3">
          {/* --- Header toko ----- */}
          <div className="flex items-center justify-between h-[38px]">
            <div className="flex items-center space-x-2 pl-4">
              <Link
                href={`/toko/${dataProductOrderDibatalkan?.merchant.name}?merchantId=${dataProductOrderDibatalkan?.merchant.id}&merchantSlug=${dataProductOrderDibatalkan?.merchant.slug}`}
              >
                <IconToko></IconToko>
              </Link>
              {dataProductOrderDibatalkan?.merchant.super_seller && (
                <IconSuperSeller></IconSuperSeller>
              )}

              <Link
                href={`/toko/${dataProductOrderDibatalkan?.merchant.name}?merchantId=${dataProductOrderDibatalkan?.merchant.id}&merchantSlug=${dataProductOrderDibatalkan?.merchant.slug}`}
                className="text-base text-black-80 font-bold"
              >
                {dataProductOrderDibatalkan?.merchant.name}
              </Link>
            </div>
            <div className="pr-4">
              <p className="font-light text-xs text-black">
                Order ID: {dataProductOrderDibatalkan?.order_code}
              </p>
            </div>
          </div>

          {/* --- Body toko ----- */}
          {dataProductOrderDibatalkan?.order_items?.map(
            (item: any, index: number) => {
              return (
                <div className="mt-2 p-3 border-t-2 flex justify-start gap-3">
                  <div className="w-2/6">
                    <img
                      className="object-cover w-full h-full rounded-md"
                      src="/image/image.png"
                    ></img>
                  </div>
                  <div className="w-4/6">
                    <h3 className="font-semibold mb-1 text-sm">
                      {item.product.name}
                    </h3>
                    <div className="flex flex-wrap items-center mb-1">
                      <IconLocations></IconLocations>
                      <p className="text-xs">Semarang, Sampangan</p>
                    </div>

                    <div className="flex flex-wrap items-center mb-1">
                      <IconWarna></IconWarna>
                      <p className="text-xs">
                        {item.product_stock.variation_item_1.name},{" "}
                        {item.product_stock.variation_item_2.name}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
          <div className="mb-1 text-base px-4 font-bold flex items-center justify-between">
            <span>Total</span>
            <span>Rp{dataProductOrderDibatalkan?.total_amount}</span>
          </div>
        </div>
        {/* --- End card toko status : diproses --- */}

        <div>
          <p className="text-sm text-black font-semibold my-3">
            Mengapa anda ingin membatalkan pesanan ini ?
          </p>
          <div className="relative w-full">
            <div
              className="border border-gray-400 p-4 rounded-lg flex justify-between items-center cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span
                className={`${
                  selectedOption ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {selectedOption || "Pilih Alasan"}
              </span>
              <span className="text-gray-500">{isOpen ? "▲" : "▼"}</span>
            </div>
            {isOpen && (
              <div className="absolute top-full left-0 w-full border border-gray-300 rounded bg-white mt-1 z-10">
                {options.map((option) => (
                  <div
                    key={option}
                    className="p-4 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}

            {selectedOption === "Lainnya" && (
              <div>
                <label className="block text-sm text-black font-semibold my-3">
                  Masukkan detail pembatalan pesanan
                </label>
                <input
                  type="text"
                  value={valueLainnya}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValueLainnya(e.target.value);
                  }}
                  className="mt-1 block w-full border border-gray-400 rounded-lg p-4"
                  placeholder="Ketik detail disini ..."
                />
              </div>
            )}
          </div>
        </div>

        {/* <Link href={`/transaksi/batalkan/${batalkan}/rincian?q=pending`}> */}
        <button
          onClick={handleAjukanPembayaran}
          disabled={isDisabled}
          className={`mb-16 rounded-lg mt-16 w-full p-4 text-white text-center font-semibold ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#51D7B1] cursor-pointer"
          }`}
        >
          Ajukan Pembatalan
        </button>
        {/* </Link> */}
      </div>
    </>
  );
};

export default BatalkanPesanan;
