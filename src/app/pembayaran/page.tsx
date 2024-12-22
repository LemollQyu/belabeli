"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DetailProduk from "../components/pembayaran/detail-produk";
import Pengiriman from "../components/pembayaran/pengiriman";
import PaymentDropdown from "../components/pembayaran/metode-pembayaran";
import Alamat from "../components/pembayaran/alamat";
// import { addressData } from "../address-list/page";
import VoucherOngkir from "../components/pembayaran/voucher-ongkir";
import Header from "../layouts/header";
import LayoutUtama from "../layouts/layout-utama";
import { useRouter, useSearchParams } from "next/navigation";
import getAddress from "@/api/address/getAddress";
import getPaymentSession from "@/api/pembayaran/getPaymentSession";
import getUserVoucher from "@/api/pembayaran/getVoucherPembayaran";
import { valueOrDefault } from "chart.js/helpers";
import postCheckout from "@/api/pembayaran/postCheckout";
import Loading from "../components/loading";

type Discount = {
  active: number;
  discount_value: number;
  cashback_value: number;
  expiry_date: string;
  id: number;
  is_claim: boolean;
  max_claim: number | null;
  max_discount: string;
  merchants_id: number;
  minimum_purchase: string;
  start_date: string;
  times_claim: number;
  type: string;
  usage_limit: number;
};

type PaymentData = {
  id: string;
  merchants_id: number;
  name: string;
  qris_image_url: string;
  created_at: string;
  updated_at: string;
};

const Pembayaran = () => {
  // const selectedAddress = addressData.find((address:any) => address.key === 1);

  const [subtotal, setSubtotal] = useState(600000);
  const router = useRouter();
  const [shippingCost, setShippingCost] = useState(8000);
  const [shippingName, setShippingName] = useState<string>("Standar");
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [isPaymentSelected, setIsPaymentSelected] = useState(false);
  const [catatan, setCatatan] = useState<string>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // State untuk menyimpan metode pembayaran yang dipilih

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  const [dataAlamat, setDataAlamat] = useState<any>({});
  const [isUse, setIsUse] = useState<string>("");

  const [dataBuyProduct, setDataBuyProduct] = useState<any>({});
  const [dataPengiriman, setDataPengiriman] = useState<any>({});

  const [dataSelectPengiriman, setDataSelectPengiriman] = useState<any>();
  const [dataVoucher, setDataVoucher] = useState<Discount[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<Discount | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [dataCheckout, setDataCheckout] = useState<PaymentData | null>(null);

  const [loadingSelesaikanPembayaran, setLoadingSelesaikanPembayaran] =
    useState<boolean>(false);

  console.log(dataBuyProduct);

  console.log("data select voucher = ", selectedVoucher);
  console.log("data select PaymentMethod = ", paymentMethod);

  const [codeVoucher, setCodeVoucher] = useState<number>(0);
  const [potonganDiscount, setPotonganDiscount] = useState<number>(0);

  useEffect(() => {
    if (selectedVoucher != null) {
      if (selectedVoucher.type === "cashback") {
        setPotonganDiscount(selectedVoucher?.cashback_value);
      } else {
        setPotonganDiscount(selectedVoucher?.discount_value);
      }
    } else {
      setCodeVoucher(0);
    }
  }, [selectedVoucher]);

  console.log("potongan yang diterima = ", codeVoucher);

  // hitung jumlah dari product yang dibeli
  const totalQuantity = Array.isArray(dataBuyProduct)
    ? dataBuyProduct.reduce(
        (sum: number, order: any) => sum + order.quantity,
        0
      )
    : 0; // Jika bukan array, totalnya 0

  console.log(totalQuantity);

  const totalHargaPembelian = Array.isArray(dataBuyProduct)
    ? dataBuyProduct.reduce((acc: any, item: any) => {
        const price = parseInt(item.product_stock.price_sell || "0", 10);
        const quantity = item.quantity || 0;
        return acc + price * quantity;
      }, 0)
    : 0;

  // console.log(totalHargaPembelian);

  // Proses menghitung harga setelah negosiasi
  const dataWithHargaSetelahNego = dataBuyProduct?.map?.((item: any) => {
    // Ambil harga jual dan harga negosiasi
    const priceSell = item.product_stock?.price_sell || 0;
    const priceNegosiasi = item.price_negosiasi || 0;

    // Hitung harga setelah negosiasi
    const hargaSetelahNego = priceSell - priceNegosiasi;

    // Tambahkan ke objek baru
    return {
      harga_setelah_nego: hargaSetelahNego,
    };
  });

  // Output hasil
  // console.log("Data dengan Harga Setelah Negosiasi:", dataWithHargaSetelahNego);

  const potonganHargaNego = dataBuyProduct?.map?.((item: any) => {
    return {
      potongan_harga_nego: item.price_negosiasi * item.quantity,
    };
  });

  console.log("Potongan Harga Nego:", potonganHargaNego);

  const totalPotonganHargaNego = Array.isArray(potonganHargaNego)
    ? potonganHargaNego?.reduce?.((acc: number, item: any) => {
        return acc + item.potongan_harga_nego;
      }, 0)
    : 0;

  console.log("Total Potongan Harga Nego:", totalPotonganHargaNego);

  useEffect(() => {
    // setLoadingAlamat(true);
    async function fetchData() {
      const response = await getAddress();
      setDataAlamat(response.data?.data);

      // setLoadingAlamat(false);
    }

    fetchData();
  }, []);

  console.log(dataAlamat);

  useEffect(() => {
    if (dataAlamat?.length > 0) {
      const item = dataAlamat.find((item: any) => item.use === 1);
      if (item && isUse !== item.id) {
        setIsUse(item.id);
      }
    }
  }, [dataAlamat]);

  console.log("lokasi aktif idnya = ", isUse);

  // Simpan ke localStorage
  if (sessionId !== null) {
    localStorage.setItem("myData", sessionId);
  } else {
    console.error("sessionId is null and cannot be stored in localStorage.");
  }

  const savedSession = localStorage.getItem("myData");
  if (savedSession) {
    console.log("Data yang tersimpan:", savedSession);
  } else {
    console.log("Data tidak ditemukan di localStorage.");
  }
  // console.log("Data telah disimpan ke localStorage.");

  // console.log(dataBuyProduct[0].product.merchant.id);

  useEffect(() => {
    if (isUse) {
      // Pastikan isUse sudah memiliki nilai sebelum fetch data
      async function fetchData() {
        try {
          const response = await getPaymentSession({
            paymentSessionId: savedSession,
            addressId: isUse,
          });
          console.log("data get payment session = ", response);
          setDataBuyProduct(response.data.data.payment_item_session);
          setDataPengiriman(response.data.data.shippers.results);
        } catch (error) {
          console.error("Error fetching payment session:", error);
        }
      }

      fetchData();
    }
  }, [isUse]);

  console.log("data pengiriman = ", dataPengiriman);

  console.log("merchant id = ", dataBuyProduct[0]?.product.merchant.id);

  useEffect(() => {
    // Pastikan isUse sudah memiliki nilai sebelum fetch data
    async function fetchData() {
      console.log("data voucher");
      try {
        const response = await getUserVoucher({
          merchantId: dataBuyProduct[0]?.product.merchant.id,
        });
        setDataVoucher(response.data.data);
      } catch (error) {
        console.error("data user voucher:", error);
      }
    }

    fetchData();
  }, [dataBuyProduct[0]?.product.merchant.id]);

  useEffect(() => {
    const calculatedTotal = subtotal + shippingCost - voucherDiscount;
    setTotal(calculatedTotal);
  }, [subtotal, shippingCost, voucherDiscount]);

  const handleApplyDiscount = (discount: number) => {
    setVoucherDiscount(discount);
  };

  const handleShippingChange = (cost: number, name: string) => {
    setShippingCost(cost);
    setShippingName(name);
  };

  // Fungsi untuk menangani pemilihan metode pembayaran
  const handlePaymentSelection = (method: string) => {
    setIsPaymentSelected(true);
    setSelectedPaymentMethod(method); // Update state dengan metode pembayaran yang dipilih
  };

  console.log("kurir pembayaran selected", dataSelectPengiriman);

  // data total pembayaran

  const total_harga_pembelian =
    dataBuyProduct[0]?.price_negosiasi !== 0 &&
    dataBuyProduct[0]?.price_negosiasi !== null &&
    dataBuyProduct[0]?.price_negosiasi !== undefined
      ? totalHargaPembelian - totalPotonganHargaNego
      : totalHargaPembelian;

  useEffect(() => {
    if (selectedVoucher != null) {
      if (selectedVoucher.type === "cashback") {
        setCodeVoucher(selectedVoucher?.cashback_value);
      } else {
        setCodeVoucher(
          parseInt(
            (
              (selectedVoucher?.discount_value / 100) *
              total_harga_pembelian
            ).toString()
          ) || 0
        );
      }
    } else {
      setCodeVoucher(0);
    }
  }, [selectedVoucher]);

  const total_semua =
    total_harga_pembelian -
    codeVoucher +
    (dataSelectPengiriman != undefined
      ? dataSelectPengiriman?.cost[0].value
      : 0);

  async function handleCheckout(e: any) {
    setLoadingSelesaikanPembayaran(true);
    const response = await postCheckout({
      addresses_id: isUse,
      catatan: catatan,
      payment_method: paymentMethod,
      payment_sessions_id: savedSession,
      service: dataSelectPengiriman.service,
      description: dataSelectPengiriman.description,
      value: dataSelectPengiriman.cost[0].value,
      estimasi: dataSelectPengiriman.cost[0].etd,
      merchants_uuid: dataBuyProduct[0].product.merchant.uuid,
      voucher_merchants_id: selectedVoucher?.id || null,
    });

    console.log("checkout = ", response.data?.data);
    setDataCheckout(response.data?.data);

    if (response.data?.code == 201) {
      localStorage.setItem("paymentData", JSON.stringify(response.data?.data));
      localStorage.setItem("totalHarga", total_semua.toString());

      router.push("/laman-pembayaran");
      setLoadingSelesaikanPembayaran(false);
    }

    console.log({
      addresses_id: isUse,
      catatan: catatan,
      payment_method: paymentMethod,
      payment_sessions_id: savedSession,
      service: dataSelectPengiriman.service,
      description: dataSelectPengiriman.description,
      value: dataSelectPengiriman.cost[0].value,
      estimasi: dataSelectPengiriman.cost[0].etd,
      merchants_uuid: dataBuyProduct[0].product.merchant.uuid,
      voucher_merchants_id: selectedVoucher?.id || null,
    });

    // console.log(
    //   "data = ",
    //   isUse,
    //   paymentMethod,
    //   catatan,
    //   "session id = ",
    //   savedSession,
    //   "service jasa = ",
    //   dataSelectPengiriman.service,
    //   dataSelectPengiriman.description,
    //   dataSelectPengiriman.cost[0].etd,
    //   "value",
    //   dataSelectPengiriman.cost[0].value,
    //   "merchants_uuid = ",
    //   dataBuyProduct[0].product.merchant.uuid
    // );
  }

  console.log("data checkout pembayaran = ", dataCheckout);

  return (
    <>
      <LayoutUtama>
        <Header title="Pembayaran" children={undefined} />
        <div className="homepage w-[400px] mx-auto py-[80px]">
          {dataAlamat?.map?.((alamat: any, index: number) => {
            if (alamat.use == 1) {
              console.log(alamat);
              return (
                <>
                  <div className="mt-4 px-4">
                    <div
                      className="bg-white p-4 rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] flex items-start relative"
                      onClick={() => {
                        router.push("/address-list");
                      }}
                    >
                      {/* Icon maps */}
                      <div className="flex-shrink-0">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          // onClick={handleClick}
                          className="cursor-pointer"
                        >
                          <path
                            d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"
                            fill="#0095FF"
                          />
                        </svg>
                      </div>

                      {/* Informasi Alamat */}
                      <div className="ml-6 cursor-default flex-grow">
                        <h2 className="text-[#0F0F0F] font-nunito text-[14px] font-bold">
                          {alamat.full_name}
                        </h2>
                        <p className="mt-2 text-[#1B1E28] font-nunito text-[12px]">
                          {alamat.street}, {alamat.instructions},{" "}
                          {alamat.subdistrict}, {alamat.city}
                        </p>
                        <p className="text-[#1B1E28] font-nunito text-[12px]">
                          {alamat.province}
                        </p>
                        <p className="text-[#1B1E28] font-nunito text-[12px]">
                          {alamat.postal_code}
                        </p>
                        <p className="text-[#1B1E28] font-nunito text-[12px]">
                          No Telp : {alamat.no_telepon}
                        </p>
                      </div>

                      {/* Icon arrow-up-s-line */}
                      <div className="flex-shrink-0">
                        <svg
                          // onClick={handleClick}
                          className="cursor-pointer"
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
                </>
              );
            }

            return <></>;
          })}

          <DetailProduk
            dataProduct={dataBuyProduct}
            dataWithNego={dataWithHargaSetelahNego}
          />
          <div
            className="pb-[19px]"
            style={{ borderBottom: "2px solid var(--putih-60, #D3D3D3)" }}
          ></div>

          <div className="p-4">
            <label className="block text-[#0F0F0F] font-nunito text-[15px] font-bold mb-2">
              Catatan untuk penjual
            </label>
            <input
              type="text"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="w-full h-10 p-2 font-nunito text-[13px] border border-gray-300 rounded-md"
              placeholder="Tambahkan catatan untuk penjual"
            />
          </div>

          <div
            className="pb-[9px] -mt-1 mb-3"
            style={{ borderBottom: "8px solid var(--Button-Grey, #F1F1F1)" }}
          ></div>

          <Pengiriman
            onShippingChange={handleShippingChange}
            dataPengiriman={dataPengiriman}
            chooseDataJasaPengiriman={(e: any) => setDataSelectPengiriman(e)}
          />

          <div
            className="pb-[19px]"
            style={{ borderBottom: "8px solid var(--Button-Grey, #F1F1F1)" }}
          ></div>

          {dataSelectPengiriman != undefined ? (
            <>
              <PaymentDropdown
                selectedPaymentMethod={(e: any) => {
                  setPaymentMethod(e);
                }}
                onPaymentSelect={handlePaymentSelection}
              />
              <div
                className="pb-[8px] mb-3"
                style={{
                  borderBottom: "8px solid var(--Button-Grey, #F1F1F1)",
                }}
              ></div>{" "}
            </>
          ) : null}

          <VoucherOngkir
            onApplyDiscount={handleApplyDiscount}
            dataVoucher={dataVoucher}
            selectedVoucher={(e: any) => setSelectedVoucher(e)}
          />
          <div
            className="pb-[19px]"
            style={{ borderBottom: "8px solid var(--Button-Grey, #F1F1F1)" }}
          ></div>

          <div className="p-4 bg-white">
            <h2 className="block text-[#0F0F0F] font-nunito text-[15px] font-bold mb-2">
              Rincian Pesanan
            </h2>
            <div className="font-nunito flex justify-between mb-2">
              <span className="text-gray-600 text-[14px]">
                Subtotal ( {totalQuantity} produk )
              </span>
              <span className="text-[#0F0F0F] font-bold text-[14px]">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(total_harga_pembelian)}
              </span>
            </div>
          </div>

          <div
            className="pb-[3px]"
            style={{ borderBottom: "2px solid var(--putih-60, #D3D3D3)" }}
          ></div>

          <div className="px-4 bg-white mt-3">
            <h2 className="block text-[#0F0F0F] font-nunito text-[15px] font-bold mb-2">
              Pengiriman
            </h2>
            {}
            <div className="font-nunito flex justify-between mb-2">
              <span className="text-gray-600 text-[14px]">
                {dataSelectPengiriman != undefined
                  ? dataSelectPengiriman?.description
                  : "Pilih Pengiriman"}
              </span>
              <span className="text-[#0F0F0F] font-bold text-[14px]">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(
                  dataSelectPengiriman != undefined
                    ? dataSelectPengiriman?.cost[0].value
                    : 0
                )}
              </span>
            </div>

            <div className="font-nunito flex justify-between mb-4">
              <span className="text-gray-600 text-[14px]">Kode Voucher</span>
              <span className="text-[#0F0F0F] font-bold text-[14px]">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(codeVoucher)}
              </span>
            </div>
          </div>

          <div
            className="pb-[6px]"
            style={{ borderBottom: "2px solid var(--putih-60, #D3D3D3)" }}
          ></div>

          <div className="px-4 font-nunito flex justify-between mt-4">
            <span className="text-[#0F0F0F] font-bold">
              Total{" "}
              <span className="ml-2 text-gray-600 font-normal text-[15px]">
                (Termasuk Voucher)
              </span>
            </span>
            <span className="text-[#0F0F0F] font-bold">
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(total_semua)}
            </span>
          </div>

          <div className="px-4 mt-4">
            {isPaymentSelected ? (
              // <Link href={`/laman-pembayaran?method=${selectedPaymentMethod}`}>
              //   <button className="font-nunito mt-4 w-full p-3 rounded-lg bg-emerald-400 text-white">
              //     Selesaikan Pembayaran
              //   </button>
              // </Link>
              <>
                {loadingSelesaikanPembayaran ? (
                  <div className="font-nunito mt-4 w-full p-3 flex items-center justify-center rounded-lg bg-emerald-400 text-white">
                    <Loading />
                  </div>
                ) : (
                  <button
                    onClick={handleCheckout}
                    className="font-nunito mt-4 w-full p-3 rounded-lg bg-emerald-400 text-white"
                  >
                    Selesaikan Pembayaran
                  </button>
                )}
              </>
            ) : (
              <button
                className="font-nunito mt-4 w-full p-3 rounded-lg bg-gray-300 text-gray-500"
                disabled
              >
                Selesaikan Pembayaran
              </button>
            )}
          </div>
        </div>
      </LayoutUtama>
    </>
  );
};

export default Pembayaran;
