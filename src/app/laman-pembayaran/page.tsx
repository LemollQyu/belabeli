"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CaraMembayar from "../components/pembayaran/cara-membayar";
import OrderInformation from "../components/pembayaran/info-order";
import PaymentSection from "../components/pembayaran/pembayaran-va";
import PaymentSectionQris from "../components/pembayaran/pembayaran-qris";
import Link from "next/link";
import LayoutUtama from "../layouts/layout-utama";
import Header from "../layouts/header";
import order from "@/api/pembayaran/getOrder";

type PaymentData = {
  id: number;
  merchants_id: number;
  name: string;
  qris_image_url: string;
  created_at: string;
  updated_at: string;
  uuid: string;
};

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const method = searchParams.get("method");
  const [isPaid, setIsPaid] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState<boolean>(false);
  const [dataOrder, setDataOrder] = useState<any>({});
  const [dataCheckout, setDataCheckout] = useState<PaymentData | null>(null);
  const [totalHarga, setTotalHarga] = useState<number | null>(null);
  const [productBuy, setProductBuy] = useState<any>({});
  const [dataPayment, setDataPayment] = useState<any>({});
  const [dataMerchant, setDataMerchant] = useState<any>({});
  const [pembayaranBerhasil, setPembayaranBerhasil] = useState<any>();
  const [dataAddress, setDataAddress] = useState<any>({});
  const [dataPengiriman, setDataPengiriman] = useState<any>({});

  console.log(
    "data pembayaran berhasil, sudah di upload pembayarannya = ",
    pembayaranBerhasil
  );

  const router = useRouter();

  useEffect(() => {
    setLoadingOrder(true);
    async function fetchData() {
      const response = await order({ orderId: dataCheckout?.uuid });

      setDataOrder(response.data);
      setProductBuy(response?.data?.data.order_items);
      console.log(" data payment = ", response?.data?.order_payment);
      setDataPayment(response?.data?.data.order_payment);
      setDataMerchant(response?.data?.data.merchant);
      setDataAddress(response?.data?.data.address);
      setDataPengiriman(response?.data?.data.order_shipper);
      if (response.error?.code == 401) {
        router.push("/authentikasi/login");
      }

      setLoadingOrder(false);
    }

    fetchData();
  }, [dataCheckout]);

  useEffect(() => {
    const paymentData = localStorage.getItem("paymentData");
    if (paymentData) {
      setDataCheckout(JSON.parse(paymentData));
    }
  }, []);

  useEffect(() => {
    const storedTotalHarga = localStorage.getItem("totalHarga");
    if (storedTotalHarga) {
      setTotalHarga(Number(storedTotalHarga));
    }
  }, []);

  const handleSelesaiPesanan = () => {
    localStorage.setItem("dataAddress", JSON.stringify(dataAddress));
    localStorage.setItem("productBuy", JSON.stringify(productBuy));
    localStorage.setItem("dataPengiriman", JSON.stringify(dataPengiriman));
    localStorage.setItem("orderCode", dataOrder?.data?.order_code);
    localStorage.setItem("dataMerchant", JSON.stringify(dataMerchant));
    console.log("Data berhasil disimpan ke localStorage");

    if (pembayaranBerhasil.code == 200) {
      router.push("/pesanan");
    }
  };

  console.log("data checkout = ", dataCheckout, "total harga = ", totalHarga);
  console.log("data order = ", dataOrder);
  console.log("data payment = ", dataPayment);

  console.log("alamat = ", dataAddress);
  console.log(productBuy, dataOrder?.data?.order_code);
  console.log("jasa pengiriman = ", dataPengiriman);

  return (
    <>
      <LayoutUtama>
        <Header title="Pembayaran" children={undefined} />
        <div className="w-full max-w-[400px] mx-auto py-4 space-y-6 mt-14">
          <OrderInformation
            product={productBuy}
            orderCode={dataOrder?.data?.order_code}
            merchant={dataOrder?.data?.merchant}
          />

          {/* Render komponen sesuai dengan metode pembayaran yang dipilih */}
          {(() => {
            const method = dataOrder?.data?.order_payment.payment_method;
            if (method === "qris") {
              return (
                <PaymentSectionQris
                  totalHarga={dataOrder?.data?.total_amount}
                  dataPayment={dataPayment}
                  merchant={dataMerchant}
                  uploadBerhasil={(e: any) => {
                    setPembayaranBerhasil(e);
                  }}
                />
              );
            } else if (method === "method") {
              return <PaymentSection />;
            } else {
              return null; // Tidak ada yang ditampilkan
            }
          })()}

          <CaraMembayar />

          <div className="px-4 mt-2">
            {" "}
            <button
              onClick={handleSelesaiPesanan}
              className={`font-nunito mt-4 w-full p-3 rounded-lg ${
                pembayaranBerhasil?.code == 200
                  ? "bg-emerald-400"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white`}
              disabled={!(pembayaranBerhasil?.code === 200)}
            >
              {pembayaranBerhasil?.code == 200 ? "Sudah Bayar" : "Belum Bayar"}
            </button>
          </div>
        </div>
      </LayoutUtama>
    </>
  );
};

export default PaymentPage;
