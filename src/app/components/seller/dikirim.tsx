import React from 'react'
import Link from 'next/link'

export default function Dikirim() {
  const orders = [
    {
      orderId: '1270511326',
      product: {
        imageUrl: '/tas.jpg',
        name: 'Tas Ransel Wanita Stylish | Multifungsi dan Trendy.',
        price: 'Rp 350.000',
        variant: 'M, Merah',
        quantity: 1,
      },
      orderDetails: [
        {
          label: 'Tanggal Order',
          value: '4 Oktober 2024',
          note: 'Updated 4/10/2024 3:00 PM',
        },
        { label: 'Metode Pembayaran', value: 'QRIS' },
        { label: 'Status', value: 'Dikirim', statusColor: 'text-[#00b140]' },
        { label: 'Tanggal Pengiriman', value: '5 Oktober 2024' },
        { label: 'Provider Pengiriman', value: 'JNT' },
        { label: 'Nomor Resi', value: 'JX0833200279' },
      ],
    },
    {
      orderId: '1270511327',
      product: {
        imageUrl: '/sepatu.jpg',
        name: 'Sepatu Sneakers Pria | Nyaman dan Tahan Lama.',
        price: 'Rp 450.000',
        variant: '42, Hitam',
        quantity: 2,
      },
      orderDetails: [
        {
          label: 'Tanggal Order',
          value: '5 Oktober 2024',
          note: 'Updated 5/10/2024 4:00 PM',
        },
        { label: 'Metode Pembayaran', value: 'Virtual Account - BNI' },
        { label: 'Status', value: 'Dikirim', statusColor: 'text-[#00b140]' },
        { label: 'Tanggal Pengiriman', value: '7 Oktober 2024' },
        { label: 'Provider Pengiriman', value: 'SiCepat' },
        { label: 'Nomor Resi', value: 'CT123476789' },
      ],
    },
    {
      orderId: '1270511328',
      product: {
        imageUrl: '/baju.jpg',
        name: 'Kemeja Casual Wanita Korean Look | Bahan Premium.',
        price: 'Rp 250.000',
        variant: 'L, Biru',
        quantity: 3,
      },
      orderDetails: [
        {
          label: 'Tanggal Order',
          value: '6 Oktober 2024',
          note: 'Updated 6/10/2024 1:00 PM',
        },
        { label: 'Metode Pembayaran', value: 'Bank Transfer - Mandiri' },
        { label: 'Status', value: 'Dikirim', statusColor: 'text-[#00b140]' },
        { label: 'Tanggal Pengiriman', value: '7 Oktober 2024' },
        { label: 'Provider Pengiriman', value: 'SiCepat' },
        { label: 'Nomor Resi', value: 'SC123456789' },
      ],
    },
  ];
  

  return (
    <div className="w-full mx-auto space-y-4">
      {/* Daftar Pesanan */}
      {orders.map((order, idx) => (
          <Link
          href={`/seller/dashboard/notifikasi`}
          key={order.orderId} // Menggunakan orderId sebagai key yang unik
          legacyBehavior
        >
        <div
          key={idx}
          className="flex flex-col gap-4 p-3 rounded-lg bg-[#f7f7f9] shadow-md"
        >
          <div className="w-full pb-2 border-b border-[#d3d3d3] text-[#222b45] text-sm font-semibold">
            Order ID : {order.orderId}
          </div>

          <div className="flex items-start space-x-4">
            <img
              className="w-[100px] h-[100px] rounded-md object-cover"
              src={order.product.imageUrl}
              alt="Product Image"
            />
            <div className="flex flex-col space-y-1">
              <div className="text-black text-[12px] font-nunito font-semibold">
                {order.product.name}
              </div>

              <div className="flex items-center text-xs text-gray-600 space-x-1 mb-2">
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
                <span className="text-[11px]">
                  <b>Varian:</b> {order.product.variant}
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-600 space-x-1 mb-2">
                <div className="flex items-center space-x-1">
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
                  <span className="text-[11px]">
                    <b>Standar </b> (Gresik)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <div className="flex items-center space-x-1 text-[16px] font-semibold text-black">
                {order.product.price}
                </div>
                <div className="text-white border-2 bg-[#A9A9A9] border-[#A9A9A9] py-0.5 px-1.5 rounded-md">
                  {order.product.quantity}
                </div>
              </div>
            </div>
          </div>

          <div className="p-2 bg-white rounded-lg border border-[#d3d3d3] shadow-md">
            {order.orderDetails.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center border-b last:border-0 py-2 px-1 ${
                  idx % 2 !== 0 ? 'bg-[#f7f7f7]' : 'bg-white'
                }`}
              >
                <div className="w-[100px] text-xs font-semibold text-[#222b45] mr-2">
                  {item.label}
                </div>
                <div className="flex w-[200px] font-semibold flex items-center justify-between text-xs text-[#545454]">
                  <div className="w-full flex items-center justify-between">
                    <span className={item.statusColor || ''}>{item.value}</span>
                    {item.note && (
                      <span className="block text-[8px] text-[#a1a1a1]">
                        {item.note}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
       </Link>
      ))}

    </div>
  )
}
