'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import LayoutUtama from '@/app/layouts/layout-utama'
import Header from '@/app/layouts/header'
import PaymentSectionQris from '@/app/components/pembayaran/pembayaran-qris'
import PaymentSection from '@/app/components/pembayaran/pembayaran-va'
import CaraMembayar from '@/app/components/pembayaran/cara-membayar'
import OrderInformation from '@/app/components/seller/info-order'
import PaymentDropdown from '@/app/components/seller/metode-pembayaran'


const PaymentPage = () => {
  const searchParams = useSearchParams()
  const method = searchParams.get('method') // Mengambil metode pembayaran dari URL query
  const [isPaid, setIsPaid] = useState(false) // `false` berarti belum bayar, `true` berarti sudah bayar
  const [selectedMethod, setSelectedMethod] = useState<string>('')
  const [isPaymentSelected, setIsPaymentSelected] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // State untuk menyimpan metode pembayaran yang dipilih

  const orderDetail = {
    id: '1270511324',
    productName: 'Sepatu Anak Sekolah SMP Semua Ukuran Murah dan Tahan Lama',
    variant: 'Putih, XL',
    price: 600000,
    stock: 500,
    orderDate: '2 Oktober 2024',
    buyerName: 'Annas',
    productImage: '/sepatu.jpg',
    quantity: 1, // Example, add this if needed
    submissionDate: '9 Oktober 2024',
  }


  useEffect(() => {
    if (method) {
      setSelectedMethod(method)
    }
  }, [method])

  const handlePaymentSelection = (method: string) => {
    setIsPaymentSelected(true);
    setSelectedPaymentMethod(method); // Update state dengan metode pembayaran yang dipilih
  };
  return (
    <>
      <LayoutUtama>
        <Header title="Pembayaran" children={undefined} />
        <div className="w-full max-w-[400px] mx-auto py-4 space-y-4 pt-24">
        <OrderInformation orderDetail={orderDetail} />
        <PaymentDropdown onPaymentSelect={handlePaymentSelection} />
          <CaraMembayar />

          <div className="px-4 mt-4">
            {isPaymentSelected ? (
              <Link href={`/seller/dashboard/manajemen-iklan/banner/pembayaran/laman-pembayaran?method=${selectedPaymentMethod}`}>
                <button className="font-nunito font-semibold mt-4 w-full p-3 rounded-lg bg-emerald-400 text-white">
                  Selesaikan Pembayaran
                </button>
              </Link>
            ) : (
              <button
                className="font-nunito font-semibold mt-4 w-full p-3 rounded-lg bg-gray-300 text-gray-500"
                disabled
              >
                Selesaikan Pembayaran
              </button>
            )}
          </div>
        </div>
      </LayoutUtama>
    </>
  )
}

export default PaymentPage
