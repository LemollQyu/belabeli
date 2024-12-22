import React, { useState } from 'react'

const StatistikRingkasanProduk = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const products = [
    // Stok Barang
    {
      id: '1270512224',
      name: 'Tas Anak Sekolah Murah dan Berkualitas Tinggi',
      price: 'Rp 580.000',
      variant: 'XL, Putih',
      rincian: 'Stok Barang',
      views: 10,
      image: '/tas.jpg',
    },
    {
      id: '1270513324',
      name: 'Jaket Musim Dingin Anak-Anak Premium',
      price: 'Rp 750.000',
      variant: 'M, Abu-Abu',
      rincian: 'Stok Barang',
      views: 15,
      image: '/image/produk/g.jpeg',
    },
    {
      id: '1270514424',
      name: 'Mainan Edukasi Kayu untuk Anak Pintar',
      price: 'Rp 150.000',
      variant: 'Satu Ukuran',
      rincian: 'Stok Barang',
      views: 8,
      image: '/image/produk/d.jpeg',
    },

    // Produk Terjual
    {
      id: '1270611324',
      name: 'Sepatu Olahraga Pria Semua Ukuran Keren',
      price: 'Rp 650.000',
      variant: '42, Hitam',
      rincian: 'Produk Terjual',
      views: 300,
      image: '/image/produk/sepatu.jpg',
    },
    {
      id: '1270612324',
      name: 'Kemeja Kerja Pria Lengan Panjang Formal',
      price: 'Rp 250.000',
      variant: 'L, Biru',
      rincian: 'Produk Terjual',
      views: 150,
      image: '/image/produk/k.jpg',
    },
    {
      id: '1270613324',
      name: 'Gelang Emas untuk Wanita Elegan dan Stylish',
      price: 'Rp 1.200.000',
      variant: '16 cm',
      rincian: 'Produk Terjual',
      views: 120,
      image: '/image/produk/b.jpeg',
    },

    // Produk Dilihat
    {
      id: '1270511324',
      name: 'Sepatu Anak Sekolah SMP Semua Ukuran Nyaman',
      price: 'Rp 580.000',
      variant: 'XL, Putih',
      rincian: 'Produk Dilihat',
      views: 200,
      image: '/sepatu.jpg',
    },
    {
      id: '1276611324',
      name: 'Headphone Kekinian Murah dan Berkualitas Tinggi',
      price: 'Rp 580.000',
      variant: 'XL, Putih',
      rincian: 'Produk Dilihat',
      views: 30,
      image: '/headphone.jpg',
    },
    {
      id: '1270578324',
      name: 'Baju Anak Perempuan Lucu dan Berkualitas Premium',
      price: 'Rp 580.000',
      variant: 'XL, Putih',
      rincian: 'Produk Dilihat',
      views: 100,
      image: '/baju-anak.jpg',
    },

    // Produk Masuk Keranjang
    {
      id: '1270711324',
      name: 'Tas Ransel Laptop Multifungsi Anti Air',
      price: 'Rp 450.000',
      variant: '17 Inch, Abu-Abu',
      rincian: 'Produk Masuk Keranjang',
      views: 80,
      image: '/image/produk/e.jpeg',
    },
    {
      id: '1270712324',
      name: 'Lampu Hias LED dengan Remote Kontrol',
      price: 'Rp 120.000',
      variant: '24 Watt, Putih',
      rincian: 'Produk Masuk Keranjang',
      views: 70,
      image: '/image/produk/h.jpeg',
    },
    {
      id: '1270713324',
      name: 'Topi Baseball Polos Kualitas Premium',
      price: 'Rp 100.000',
      variant: 'Hitam',
      rincian: 'Produk Masuk Keranjang',
      views: 60,
      image: '/image/produk/i.jpeg',
    },

    // Produk Diretur
    {
      id: '1270811324',
      name: 'Celana Jeans Wanita Modis dan Nyaman Dipakai',
      price: 'Rp 350.000',
      variant: 'M, Biru Tua',
      rincian: 'Produk Diretur',
      views: 25,
      image: '/image/produk/q.jpeg',
    },
    {
      id: '1270812324',
      name: 'Jam Tangan Digital Anak-Anak dengan Alarm',
      price: 'Rp 200.000',
      variant: 'Merah',
      rincian: 'Produk Diretur',
      views: 15,
      image: '/jam.jpg',
    },
    {
      id: '1270813324',
      name: 'Kipas Angin Mini Portabel untuk Perjalanan',
      price: 'Rp 85.000',
      variant: 'Pink',
      rincian: 'Produk Diretur',
      views: 10,
      image: '/image/produk/f.jpeg',
    },

    // Produk Direfund
    {
      id: '1270911324',
      name: 'Casing Handphone Anti Shock untuk Keamanan',
      price: 'Rp 50.000',
      variant: 'Samsung Galaxy S21',
      rincian: 'Produk Direfund',
      views: 20,
      image: '/image/produk/c.jpeg',
    },
    {
      id: '1270912324',
      name: 'Mouse Gaming RGB untuk Pengalaman Bermain',
      price: 'Rp 250.000',
      variant: 'Hitam',
      rincian: 'Produk Direfund',
      views: 18,
      image: '/image/produk/m.jpg',
    },
    {
      id: '1270913324',
      name: 'Matras Yoga Anti Slip untuk Olahraga Nyaman',
      price: 'Rp 300.000',
      variant: 'Hijau',
      rincian: 'Produk Direfund',
      views: 12,
      image: '/image/produk/j.png',
    },

    // Produk Dikomplain
    {
      id: '1271011324',
      name: 'Kompor Gas Portable untuk Perjalanan dan Camping',
      price: 'Rp 600.000',
      variant: '2 Tungku',
      rincian: 'Produk Dikomplain',
      views: 22,
      image: '/image/produk/p.png',
    },
    {
      id: '1271012324',
      name: 'Dispenser Air Panas-Dingin Hemat Energi',
      price: 'Rp 850.000',
      variant: 'Putih',
      rincian: 'Produk Dikomplain',
      views: 20,
      image: '/image/produk/n.jpg',
    },
    {
      id: '1271013324',
      name: 'Rice Cooker Mini Praktis untuk Kebutuhan Sehari-Hari',
      price: 'Rp 400.000',
      variant: '1 Liter, Merah',
      rincian: 'Produk Dikomplain',
      views: 18,
      image: '/image/produk/g.jpeg',
    },
  ]

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.rincian === selectedCategory)
    : products
  const stats = [
    {
      label: 'Stok Barang',
      value: 'Total stok barang 98 produk',
      icon: (
        <svg
          className="icon hover:text-white"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.498 20H19.498V16H15.498V14H19.498V6H17.498V11L13.498 9.4V20ZM11.498 20V9.4L7.49805 11V6H5.49805V20H11.498ZM7.49805 4V3H17.498V4H20.498C21.0503 4 21.498 4.44772 21.498 5V21C21.498 21.5523 21.0503 22 20.498 22H4.49805C3.94576 22 3.49805 21.5523 3.49805 21V5C3.49805 4.44772 3.94576 4 4.49805 4H7.49805ZM12.498 8L15.998 5H8.99805L12.498 8Z"
            className="group-hover:fill-white fill-black"
          />
        </svg>
      ),
    },
    {
      label: 'Produk Terjual',
      value: '200 terjual',
      icon: (
        <svg
          className="icon hover:text-white"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 22C2.5 17.5817 6.08172 14 10.5 14C14.9183 14 18.5 17.5817 18.5 22H16.5C16.5 18.6863 13.8137 16 10.5 16C7.18629 16 4.5 18.6863 4.5 22H2.5ZM10.5 13C7.185 13 4.5 10.315 4.5 7C4.5 3.685 7.185 1 10.5 1C13.815 1 16.5 3.685 16.5 7C16.5 10.315 13.815 13 10.5 13ZM10.5 11C12.71 11 14.5 9.21 14.5 7C14.5 4.79 12.71 3 10.5 3C8.29 3 6.5 4.79 6.5 7C6.5 9.21 8.29 11 10.5 11ZM18.7837 14.7028C21.5644 15.9561 23.5 18.752 23.5 22H21.5C21.5 19.564 20.0483 17.4671 17.9628 16.5271L18.7837 14.7028ZM18.0962 3.41321C20.0944 4.23703 21.5 6.20361 21.5 8.5C21.5 11.3702 19.3042 13.7252 16.5 13.9776V11.9646C18.1967 11.7222 19.5 10.264 19.5 8.5C19.5 7.11935 18.7016 5.92603 17.541 5.35635L18.0962 3.41321Z"
            className="group-hover:fill-white fill-black"
          />
        </svg>
      ),
    },
    {
      label: 'Produk Dilihat',
      value: '500 produk dilihat',
      icon: (
        <svg
          className="icon hover:text-white"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5003 3C17.8924 3 22.3784 6.87976 23.3189 12C22.3784 17.1202 17.8924 21 12.5003 21C7.10812 21 2.62215 17.1202 1.68164 12C2.62215 6.87976 7.10812 3 12.5003 3ZM12.5003 19C16.7359 19 20.3603 16.052 21.2777 12C20.3603 7.94803 16.7359 5 12.5003 5C8.2646 5 4.64022 7.94803 3.72278 12C4.64022 16.052 8.2646 19 12.5003 19ZM12.5003 16.5C10.015 16.5 8.00026 14.4853 8.00026 12C8.00026 9.51472 10.015 7.5 12.5003 7.5C14.9855 7.5 17.0003 9.51472 17.0003 12C17.0003 14.4853 14.9855 16.5 12.5003 16.5ZM12.5003 14.5C13.881 14.5 15.0003 13.3807 15.0003 12C15.0003 10.6193 13.881 9.5 12.5003 9.5C11.1196 9.5 10.0003 10.6193 10.0003 12C10.0003 13.3807 11.1196 14.5 12.5003 14.5Z"
            className="group-hover:fill-white fill-black"
          />
        </svg>
      ),
    },
    {
      label: 'Produk Masuk Keranjang',
      value: '190 produk',
      icon: (
        <svg
          className="icon hover:text-white"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.50436 6.41662L1.26172 3.17398L2.67593 1.75977L5.91857 5.00241H21.1603C21.7126 5.00241 22.1603 5.45013 22.1603 6.00241C22.1603 6.09973 22.1461 6.19654 22.1182 6.28976L19.7182 14.2898C19.5913 14.7128 19.2019 15.0025 18.7603 15.0025H6.50436V17.0025H17.5044V19.0025H5.50436C4.95207 19.0025 4.50436 18.5547 4.50436 18.0025V6.41662ZM6.50436 7.00241V13.0025H18.0163L19.8163 7.00241H6.50436ZM6.00436 23.0025C5.17593 23.0025 4.50436 22.3309 4.50436 21.5025C4.50436 20.674 5.17593 20.0025 6.00436 20.0025C6.83279 20.0025 7.50436 20.674 7.50436 21.5025C7.50436 22.3309 6.83279 23.0025 6.00436 23.0025ZM18.0044 23.0025C17.1759 23.0025 16.5044 22.3309 16.5044 21.5025C16.5044 20.674 17.1759 20.0025 18.0044 20.0025C18.8328 20.0025 19.5044 20.674 19.5044 21.5025C19.5044 22.3309 18.8328 23.0025 18.0044 23.0025Z"
            className="group-hover:fill-white fill-black"
          />
        </svg>
      ),
    },
    {
      label: 'Produk Diretur',
      value: '5 produk diretur',
      icon: (
        <svg
          className="icon hover:text-white"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 22V20H5.5V4H15.5V8H19.5V13H21.4998V7L16.5 2H4.4985C3.94749 2 3.5 2.44405 3.5 2.9918V21.0082C3.5 21.5447 3.94476 22 4.4934 22H12.5ZM22.0356 21.1212L19.9143 18.9999L22.0356 16.8786L20.6214 15.4644L18.5001 17.5857L16.3788 15.4644L14.9646 16.8786L17.0859 18.9999L14.9646 21.1212L16.3788 22.5354L18.5001 20.4141L20.6214 22.5354L22.0356 21.1212Z"
            className="group-hover:fill-white fill-black"
          />
        </svg>
      ),
    },
    {
      label: 'Produk Direfund',
      value: '5 produk direfund',
      icon: (
        <svg
          className="icon hover:text-white"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.5039 6H15.5039C12.1902 6 9.50391 8.68629 9.50391 12C9.50391 15.3137 12.1902 18 15.5039 18H22.5039V20C22.5039 20.5523 22.0562 21 21.5039 21H3.50391C2.95163 21 2.50391 20.5523 2.50391 20V4C2.50391 3.44771 2.95163 3 3.50391 3H21.5039C22.0562 3 22.5039 3.44771 22.5039 4V6ZM15.5039 8H23.5039V16H15.5039C13.2947 16 11.5039 14.2091 11.5039 12C11.5039 9.79086 13.2947 8 15.5039 8ZM15.5039 11V13H18.5039V11H15.5039Z"
            className="group-hover:fill-white fill-black"
          />
        </svg>
      ),
    },
    {
      label: 'Produk Dikomplain',
      value: '10 produk dikomplain',
      icon: (
        <svg
          className="icon hover:text-white"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.5 12H20.5V5H4.5V18.3851L6.26282 17H12.5V19H6.95455L2.5 22.5V4C2.5 3.44772 2.94772 3 3.5 3H21.5C22.0523 3 22.5 3.44772 22.5 4V12ZM14.645 19.071C14.5505 18.7301 14.5 18.371 14.5 18C14.5 17.629 14.5505 17.2699 14.645 16.929L13.6699 16.366L14.6699 14.634L15.6459 15.1975C16.1475 14.6867 16.7851 14.31 17.5 14.126V13H19.5V14.126C20.2149 14.31 20.8525 14.6867 21.3541 15.1975L22.3301 14.634L23.3301 16.366L22.355 16.929C22.4495 17.2699 22.5 17.629 22.5 18C22.5 18.371 22.4495 18.7301 22.355 19.071L23.3301 19.634L22.3301 21.366L21.3541 20.8025C20.8525 21.3133 20.2149 21.69 19.5 21.874V23H17.5V21.874C16.7851 21.69 16.1475 21.3133 15.6459 20.8025L14.6699 21.366L13.6699 19.634L14.645 19.071ZM18.5 20C19.6046 20 20.5 19.1046 20.5 18C20.5 16.8954 19.6046 16 18.5 16C17.3954 16 16.5 16.8954 16.5 18C16.5 19.1046 17.3954 20 18.5 20Z"
            className="group-hover:fill-white fill-black"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="pt-4 ">
      <span className="px-4 text-md font-semibold">
        Ringkasan Statistik Produk
      </span>
      <div className="mt-4 grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-2 px-4 ">
        {stats.map((stat, index) => (
          <button
            key={index}
            className={`group flex flex-col items-center justify-start p-2 rounded-md border-2 hover:bg-[#51D7B1] hover:text-white transition-colors`}
            onClick={() => setSelectedCategory(stat.label)}
          >
            <div className="text-xl group-hover:text-white transition-colors">
              {stat.icon}
            </div>
            <div className="text-center text-xs font-semibold mt-2 group-hover:text-white transition-colors">
              {stat.label}
            </div>
            <div className="text-center text-xs text-gray-500 mt-1 group-hover:text-white transition-colors">
              {stat.value}
            </div>
          </button>
        ))}
      </div>

      <div className="pt-8 mx-auto p-1 border-b-8 border-[#D7D7D7] w-full"></div>

      <div className="pt-4">
        <span className="text-md font-semibold px-4">Rincian Produk</span>

        {/* Tabel rincian produk */}
        <div className="mt-4 space-y-4 pb-8 px-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-start bg-[#F7F7F9] border rounded-md p-4 shadow-sm bg-white"
            >
              <div className="text-sm text-black">ID: {product.id}</div>
              <div className="text-sm border-b-2 w-full my-3 border-gray-300" />
              <div className="flex">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[80px] h-[70px] rounded-md object-cover"
                />
                <div className="ml-4 flex-0.5">
                  <div className="text-sm font-semibold">{product.name}</div>
                  <div className="flex items-center text-xs text-black space-x-1">
                    <svg
                      width="12"
                      height="13"
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
                    <span className="text-xs">
                      <b>Varian :</b> {product.variant}
                    </span>
                  </div>
                  <div className="text-md font-semibold text-black">
                    {product.price}
                  </div>
                  <div className="flex justify-between items-center w-full text-sm text-gray-700 font-bold">
                    <span>{product.rincian}</span>
                    <div className="flex items-center justify-center text-white bg-[#A9A9A9] border-[#A9A9A9] border px-1 rounded-md">
                      {product.views}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatistikRingkasanProduk
