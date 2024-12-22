'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import LayoutUtama from '@/app/layouts/layout-utama'
import Header from '@/app/layouts/header'
import OrderInformation from '@/app/components/seller/info-order'
import PaymentSectionQris from '@/app/components/pembayaran/pembayaran-qris'
import PaymentSection from '@/app/components/pembayaran/pembayaran-va'
import Link from 'next/link'
import CaraMembayar from '@/app/components/pembayaran/cara-membayar'

const PaymentPage = () => {
  const searchParams = useSearchParams()
  const method = searchParams.get('method') // Mengambil metode pembayaran dari URL query
  const [isPaid, setIsPaid] = useState(true) // `false` berarti belum bayar, `true` berarti sudah bayar
  const [selectedMethod, setSelectedMethod] = useState<string>('')
  const [isPaymentSelected, setIsPaymentSelected] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // State untuk menyimpan metode pembayaran yang dipilih

  useEffect(() => {
    if (method) {
      setSelectedMethod(method)
    }
  }, [method])

  const orderDetail = {
    id: '1270511324',
    productName: 'Sepatu Anak Sekolah SMP Semua Ukuran Murah dan Tahan Lama',
    variant: 'Putih, XL',
    price: 600000,
    paymentMethod: 'Transfer Bank',
    orderDate: '2 Oktober 2024',
    buyerName: 'Annas',
    productImage: '/sepatu.jpg',
    quantity: 1, // Example, add this if needed
    submissionDate: '9 Oktober 2024',
  }

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

          {/* Render komponen sesuai dengan metode pembayaran yang dipilih */}
          {selectedMethod === 'QRIS' ? (
            <PaymentSectionQris />
          ) : (
            <PaymentSection />
          )}

          <CaraMembayar />

          <div className="px-4 mt-2">
            <Link href={isPaid ? '/seller/dashboard/manajemen-iklan/banner/pembayaran/laman-pembayaran/pesanan' : '#'}>
              {' '}
              {/* Jika belum bayar, tombol tidak aktif */}
              <button
                className={`font-nunito mt-4 w-full p-3 rounded-lg ${
                  isPaid ? 'bg-emerald-400' : 'bg-gray-400 cursor-not-allowed'
                } text-white`}
                disabled={!isPaid} // Disable tombol jika belum bayar
              >
                {isPaid ? 'Sudah Bayar' : 'Belum Bayar'}
              </button>
            </Link>
          </div>
        </div>
      </LayoutUtama>
    </>
  )
}

export default PaymentPage
