import React from 'react'
import Link from 'next/link'

interface OrderDetail {
  orderId: string
  product: {
    imageUrl: string
    name: string
    price: string
    sold: number
    stock: number
    variant: string
    quantity: number
  }
  orderInfo: {
    label: string
    value: string
    note?: string
    statusColor?: string
    icon?: boolean
  }[]
}
export default function PerluDikirim() {
  const orderDetailData: OrderDetail = {
    orderId: '1270511324',
    product: {
      imageUrl: '/sepatu.jpg',
      name: 'Sepatu Anak Sekolah SMP Semua Ukuran | Murah dan Berkualitas.',
      price: 'Rp 600.000',
      sold: 120,
      stock: 40,
      variant: 'XL, Putih',
      quantity: 1,
    },
    orderInfo: [
      {
        label: 'Tanggal Order',
        value: '2 Oktober 2024',
        note: 'Updated 2/10/2024 12:30 PM',
      },
      {
        label: 'Metode Pembayaran',
        value: 'QRIS',
      },
      {
        label: 'Lihat Bukti',
        value: 'Lihat',
        icon: true,
      },
      {
        label: 'Catatan Pembeli',
        value: 'Jangan dibanting dan dibuang ya',
      },
      {
        label: 'Status',
        value: 'Perlu Dikirim',
        statusColor: 'text-[#ee443f] font-semibold',
      },
    ],
  }

  console.log(orderDetailData)
  const orders = [
    {
      orderId: '1270511324',
      product: {
        imageUrl: '/sepatu.jpg',
        name: 'Sepatu Anak Sekolah SMP Semua Ukuran | Murah dan Berkualitas.',
        price: 'Rp 600.000',
        sold: 120,
        stock: 40,
        variant: 'XL, Putih',
        quantity: 1,
      },
      orderDetails: [
        {
          label: 'Tanggal Order',
          value: '2 Oktober 2024',
          note: 'Updated 2/10/2024 12:30 PM',
        },
        { label: 'Metode Pembayaran', value: 'QRIS' },
        { label: 'Lihat Bukti', value: 'Lihat', icon: true },
        { label: 'Catatan Pembeli', value: 'Jangan dibanting dan dibuang ya' },
        {
          label: 'Status',
          value: 'Perlu Dikirim',
          statusColor: 'text-[#ee443f] font-semibold',
        },
      ],
    },
    {
      orderId: '1270511325',
      product: {
        imageUrl: '/tshirt.jpg',
        name: 'Kaos Distro Pria Lengan Pendek Premium | Nyaman dan Stylish.',
        price: 'Rp 150.000',
        sold: 200,
        stock: 80,
        variant: 'L, Hitam',
        quantity: 2,
      },
      orderDetails: [
        {
          label: 'Tanggal Order',
          value: '3 Oktober 2024',
          note: 'Updated 3/10/2024 2:15 PM',
        },
        { label: 'Metode Pembayaran', value: 'Bank Transfer' },
        { label: 'Lihat Bukti', value: 'Lihat', icon: true },
        { label: 'Catatan Pembeli', value: 'Harap segera dikirim' },
        {
          label: 'Status',
          value: 'Perlu Dikirim',
          statusColor: 'text-[#ee443f] font-semibold',
        },
      ],
    },
    {
      orderId: '1270511326',
      product: {
        imageUrl: '/tas.jpg',
        name: 'Tas Ransel Wanita Stylish | Multifungsi dan Trendy.',
        price: 'Rp 350.000',
        sold: 75,
        stock: 30,
        variant: 'M, Merah',
        quantity: 1,
      },
      orderDetails: [
        {
          label: 'Tanggal Order',
          value: '4 Oktober 2024',
          note: 'Updated 4/10/2024 3:00 PM',
        },
        { label: 'Metode Pembayaran', value: 'Virtual Account' },
        { label: 'Lihat Bukti', value: 'Lihat', icon: true },
        { label: 'Catatan Pembeli', value: 'Terima kasih atas pengirimannya' },
        {
          label: 'Status',
          value: 'Perlu Dikirim',
          statusColor: 'text-[#ee443f] font-semibold',
        },
      ],
    },
  ]

  return (
    <div className="w-full mx-auto space-y-4">
      {/* Daftar Pesanan */}
      {orders.map((order, idx) => (
        <div
          key={idx}
          className="flex flex-col gap-4 p-3 rounded-lg bg-[#f7f7f9] shadow-md"
        >
          {/* Header */}
          <div className="w-full pb-2 border-b border-[#d3d3d3] text-[#222b45] text-sm font-semibold">
            Order ID : {order.orderId}
          </div>

          {/* Product Card */}
          <div className="flex gap-3 p-3 border border-[#d3d3d3] rounded-lg bg-white">
            <img
              src={order.product.imageUrl}
              alt="Product"
              className="w-[6.5rem] h-[6.5rem] rounded-md object-cover"
            />
            <div className="flex flex-col justify-between">
              <div className="text-black text-xs font-bold leading-[150%]">
                {order.product.name}
              </div>
              <div className="text-[#1b1e28] text-md font-bold leading-[150%]">
                {order.product.price}
              </div>
              <div className="mt-1 justify-between flex items-center space-x-4 text-xs text-gray-600 font-nunito">
                <div className="flex items-center text-xs space-x-1">
                  <svg
                    width="15"
                    height="16"
                    viewBox="0 0 10 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.08463 3.83301H8.33463L9.58463 5.52288V7.99967H8.73655C8.63543 8.70638 8.02763 9.24967 7.29297 9.24967C6.5583 9.24967 5.95051 8.70638 5.84939 7.99967H3.73653C3.63544 8.70638 3.02765 9.24967 2.29297 9.24967C1.55829 9.24967 0.950494 8.70638 0.849402 7.99967H0.417969V2.99967C0.417969 2.76956 0.604519 2.58301 0.834635 2.58301H6.66797C6.89809 2.58301 7.08463 2.76956 7.08463 2.99967V3.83301ZM7.08463 4.66634V5.91634H8.7513V5.79759L7.91451 4.66634H7.08463Z"
                      fill="#51D7B1"
                    />
                  </svg>
                  <span className="flex items-center">
                    <span className="text-gray-800 font-semibold">
                      Terjual :
                    </span>
                    <span className="ml-1 font-normal">
                      {order.product.sold}{' '}
                    </span>
                  </span>
                </div>
                <div className="flex items-center text-xs space-x-1">
                  <svg
                    width="15"
                    height="16"
                    viewBox="0 0 10 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.33203 1.75L9.16537 3.41667V8.83333C9.16537 9.06346 8.97882 9.25 8.7487 9.25H1.2487C1.01858 9.25 0.832031 9.06346 0.832031 8.83333V3.41814L1.66536 1.75H8.33203ZM4.9987 4.66667L3.33203 6.33333H4.58203V8H5.41536V6.33333H6.66536L4.9987 4.66667ZM7.81703 2.58333H2.18036L1.76411 3.41667H8.2337L7.81703 2.58333Z"
                      fill="#51D7B1"
                    />
                  </svg>
                  <span className="flex items-center">
                    <span className="text-gray-800 font-semibold">Stok :</span>
                    <span className="ml-1 font-normal">
                      {order.product.stock}
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-600 font-nunito space-y-2">
                <div className="flex items-center space-x-1">
                  <svg
                    width="15"
                    height="16"
                    viewBox="0 0 10 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_10330_7835)">
                      <path
                        d="M6.90374 3.84511C7.0184 3.58691 7.08211 3.30106 7.08211 3.00033C7.08211 1.84973 6.14936 0.916992 4.99878 0.916992C3.84819 0.916992 2.91545 1.84973 2.91545 3.00033C2.91545 4.07641 3.7313 4.96195 4.77819 5.07212C5.28461 4.35045 6.07219 3.92026 6.90374 3.84511ZM5.47978 7.97791C5.83053 7.22016 5.85178 6.32287 5.47999 5.52341C6.09882 4.67191 7.27349 4.40817 8.20536 4.9462C9.20178 5.52153 9.54319 6.79558 8.9679 7.79199C8.39261 8.78845 7.11844 9.12987 6.12203 8.55458C5.86165 8.40424 5.64603 8.20624 5.47978 7.97791ZM2.61266 4.6782C3.09355 5.36083 3.85999 5.82783 4.73828 5.90558C5.16619 6.86728 4.80724 8.01649 3.87535 8.55453C2.87891 9.12982 1.60476 8.78841 1.02946 7.79199C0.454165 6.79553 0.795573 5.52137 1.79201 4.94608C2.05241 4.79574 2.33176 4.70799 2.61266 4.6782Z"
                        fill="#51D7B1"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_10330_7835">
                        <rect
                          width="10"
                          height="10"
                          fill="white"
                          transform="translate(0 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="flex text-xs items-center">
                    <span className="text-gray-800 font-semibold">
                      Varian :
                    </span>
                    <span className="ml-1 font-normal">
                      {order.product.variant}
                    </span>
                  </span>
                </div>
                <div className="text-white font-semibold border-2 bg-gray-400 border-gray-400 px-1.5 rounded-md">
                  {order.product.quantity}
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="p-2 bg-white rounded-lg border border-[#d3d3d3] shadow-md">
            {order.orderDetails.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center border-b last:border-0 py-2 px-1 ${
                  idx % 2 !== 0 ? 'bg-[#f7f7f7]' : 'bg-white'
                }`}
              >
                {/* Kiri: Label */}
                <div className="w-[100px] text-xs font-semibold text-[#222b45] mr-2">
                  {item.label}
                </div>
                {/* Kanan: Value */}
                <div className="flex w-[200px] font-semibold flex items-center justify-between text-xs text-[#545454]">
                  <div className="w-full flex items-center justify-between">
                    <span className={item.statusColor || ''}>{item.value}</span>
                    {item.note && (
                      <span className="block text-[8px] text-[#a1a1a1]">
                        {item.note}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/transaksi/refund/${order.orderId}/bukti-transfer`}
                  >
                    {item.icon && (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.23225 7.4999L5.13863 4.40634L6.0225 3.52246L10 7.4999L6.0225 11.4774L5.13863 10.5935L8.23225 7.4999Z"
                          fill="#5F5F5F"
                        />
                      </svg>
                    )}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="w-1/2 py-2 rounded-lg bg-[#51d7b1] text-white text-sm font-bold">
            <Link href="/pesan/obrolan">
                Hubungi Pembeli
              </Link>
            </button>
            <button className="w-1/2 py-2 rounded-lg bg-[#51d7b1] text-white text-sm font-bold">
            <Link href={`/seller/dashboard/manajemen-penjualan/siapkan-pengiriman`}>
            Proses Pesanan
            </Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
