"use client";
import React, { useState } from "react";
import Header from "@/app/layouts/header";
import LayoutUtama from "@/app/layouts/layout-utama";
import Filter from "@/app/components/seller/popup-filter";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  orderId: string;
  imageUrl: string;
  name: string;
  shippingInfo: string;
  variant: string;
  price: string;
  sales: number;
  rating: number;
  stock: number;
};

const ProductSelection = () => {
  const router = useRouter();
  const products: Product[] = [
    {
      id: 1,
      orderId: "1270511324",
      imageUrl:
        "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/3/7/1abd04f3-e85a-434e-82de-2ec36e34bf81.jpg",
      name: "Sepatu Anak Sekolah SMP Semua Ukuran | Murah dan Berkualitas.",
      shippingInfo: "Standar (Semarang - Gresik)",
      variant: "5 Varian",
      price: "600.000",
      sales: 120,
      rating: 4.1,
      stock: 30,
    },
    {
      id: 2,
      orderId: "1270511325",
      imageUrl:
        "https://down-id.img.susercontent.com/file/id-11134207-7r990-ln9jxwgu7xfd26",
      name: "Jaket Hoodie Polos Unisex - Nyaman dan Hangat",
      shippingInfo: "Express (Jakarta - Bandung)",
      variant: "5 Varian",
      price: "250.000",
      sales: 200,
      rating: 4.7,
      stock: 50,
    },
    {
      id: 3,
      orderId: "1270511326",
      imageUrl:
        "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//92/MTA-9402903/no_brand_topi_pria_kasual_-_topi_golf_-_topi_baseball_-_topi_snapback_-_topi_casual_full01_tuu5zfhy.jpg",
      name: "Topi Baseball Kasual | Warna dan Ukuran Lengkap",
      shippingInfo: "Reguler (Surabaya - Malang)",
      variant: "5 Varian",
      price: "100.000",
      sales: 80,
      rating: 4.3,
      stock: 100,
    },
    {
      id: 4,
      orderId: "1270511327",
      imageUrl:
        "https://down-id.img.susercontent.com/file/id-11134207-7qukw-ljmgd01f568o51",
      name: "Tas Ransel Anak Sekolah | Tahan Air dan Ringan",
      shippingInfo: "Standar (Medan - Palembang)",
      variant: "5 Varian",
      price: "300.000",
      sales: 150,
      rating: 4.5,
      stock: 40,
    },
    {
      id: 5,
      orderId: "1270511328",
      imageUrl:
        "https://s1.bukalapak.com/img/67422963222/s-400-400/data.jpeg.webp",
      name: "Kacamata Anti Radiasi untuk Komputer dan HP",
      shippingInfo: "Express (Bandung - Jakarta)",
      variant: "5 Varian",
      price: "150.000",
      sales: 250,
      rating: 4.9,
      stock: 20,
    },
    {
      id: 6,
      orderId: "1270511329",
      imageUrl:
        "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-133415986/rd-basic_09_rdbasic_kaos_polos_basic_tshirt_pria_wanita_cotton_combed_30s_premium_full01_ua9fcqib.jpg",
      name: "Baju Kaos Polos Pria Wanita | 100% Katun",
      shippingInfo: "Reguler (Bali - Lombok)",
      variant: "5 Varian",
      price: "80.000",
      sales: 300,
      rating: 4.6,
      stock: 75,
    },
    {
      id: 7,
      orderId: "1270511330",
      imageUrl:
        "https://upload.jaknot.com/2022/12/images/products/3d7271/original/skmei-jam-tangan-digital-led-touchscreen-display-waterproof-watch-1827.jpg",
      name: "Jam Tangan Digital LED Pria Wanita | Anti Air",
      shippingInfo: "Standar (Makassar - Manado)",
      variant: "5 Varian",
      price: "450.000",
      sales: 90,
      rating: 4.2,
      stock: 60,
    },
    {
      id: 8,
      orderId: "1270511331",
      imageUrl:
        "https://down-id.img.susercontent.com/file/id-11134207-7qul2-litzcyey4yvq35",
      name: "Celana Jeans Pria Skinny Fit | Trendy dan Nyaman",
      shippingInfo: "Reguler (Bogor - Depok)",
      variant: "5 Varian",
      price: "350.000",
      sales: 170,
      rating: 4.4,
      stock: 35,
    },
  ];

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const openFilter = () => {
    setIsFilterOpen(true);
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
  };

  const toggleProductSelection = (productId: number) => {
    setSelectedProductId((prevSelectedId) =>
      prevSelectedId === productId ? null : productId
    );
    console.log(`Product selected: ${productId}`);
    router.push("/seller/dashboard/ulasan-produk");
  };

  return (
    <LayoutUtama>
      <Header title="Ulasan Produk" children={undefined} />
      <div className="container mx-auto p-4 font-nunito pt-24">
        <div className="flex items-center gap-4 px-2 w-full">
          <div className="flex items-center flex-grow min-h-[40px] border rounded-md px-2 bg-white shadow-md">
            <span className="p-2 text-gray-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                  fill="#51D7B1"
                ></path>
              </svg>
            </span>
            <input
              type="text"
              className="ml-2 w-full border-none focus:outline-none text-gray-700 font-nunito"
              placeholder="Pencarian"
              value={""}
            />
          </div>
          <button
            onClick={openFilter}
            className="w-[40px] h-[40px] rounded-md border flex justify-center items-center bg-white hover:bg-gray-50 transition shadow-md"
            title="Filter"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 7C5 6.17157 5.67157 5.5 6.5 5.5C7.32843 5.5 8 6.17157 8 7C8 7.82843 7.32843 8.5 6.5 8.5C5.67157 8.5 5 7.82843 5 7ZM6.5 3.5C4.567 3.5 3 5.067 3 7C3 8.933 4.567 10.5 6.5 10.5C8.433 10.5 10 8.933 10 7C10 5.067 8.433 3.5 6.5 3.5ZM12 8H20V6H12V8ZM16 17C16 16.1716 16.6716 15.5 17.5 15.5C18.3284 15.5 19 16.1716 19 17C19 17.8284 18.3284 18.5 17.5 18.5C16.6716 18.5 16 17.8284 16 17ZM17.5 13.5C15.567 13.5 14 15.067 14 17C14 18.933 15.567 20.5 17.5 20.5C19.433 20.5 21 18.933 21 17C21 15.067 19.433 13.5 17.5 13.5ZM4 16V18H12V16H4Z"
                fill="#51D7B1"
              ></path>
            </svg>
          </button>

          {/* FilterPopup Component */}
          <Filter isOpen={isFilterOpen} onClose={closeFilter} />
        </div>

        <div className="px-2 mt-8 space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-lg p-4 shadow-md cursor-pointer border ${
                selectedProductId === product.id
                  ? "border-emerald-500"
                  : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-[13px] font-nunito font-light text-gray-600">
                  ID: {product.orderId}
                </div>
              </div>
              <div className="h-px bg-gray-200 mb-3" />
              <div className="flex space-x-4">
                <img
                  className="w-[100px] h-[100px] rounded-md object-cover"
                  src={product.imageUrl}
                  alt={product.name}
                />
                <div className="flex flex-col justify-between flex-grow">
                  <div className="text-sm font-semibold text-gray-800 font-nunito leading-tight">
                    {product.name}
                  </div>
                  <div className="mt-1 text-[15px] font-bold text-gray-900 font-nunito">
                    Rp {product.price.toLocaleString()}
                  </div>
                  <div className="mt-1 flex items-center space-x-9 text-xs text-gray-600 font-nunito">
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
                      <span className="flex items-center">
                        <span className="text-gray-800 font-semibold">
                          Terjual:
                        </span>
                        <span className="ml-1 font-normal">
                          {product.sales}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg
                        width="15"
                        height="16"
                        viewBox="0 0 10 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.00179 7.58366L2.55269 9.07958L3.21857 6.28808L1.03906 4.42109L3.8997 4.19175L5.00179 1.54199L6.10391 4.19175L8.96454 4.42109L6.78504 6.28808L7.45091 9.07958L5.00179 7.58366Z"
                          fill="#51D7B1"
                        />
                      </svg>
                      <span className="flex items-center">
                        <span className="text-gray-800 font-semibold">
                          Rating:
                        </span>
                        <span className="ml-1 font-normal">
                          {product.rating}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center space-x-4 text-xs text-gray-600 font-nunito">
                    <div className="flex items-center space-x-1">
                      <svg
                        width="15"
                        height="16"
                        viewBox="0 0 10 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_10462_13980)">
                          <path
                            d="M6.90569 3.84511C7.02035 3.58691 7.08406 3.30106 7.08406 3.00033C7.08406 1.84973 6.15131 0.916992 5.00073 0.916992C3.85014 0.916992 2.9174 1.84973 2.9174 3.00033C2.9174 4.07641 3.73325 4.96195 4.78015 5.07212C5.28656 4.35045 6.07415 3.92026 6.90569 3.84511ZM5.48173 7.97791C5.83248 7.22016 5.85373 6.32287 5.48194 5.52341C6.10077 4.67191 7.27544 4.40817 8.20731 4.9462C9.20373 5.52153 9.54515 6.79558 8.96986 7.79199C8.39456 8.78845 7.1204 9.12987 6.12398 8.55458C5.86361 8.40424 5.64798 8.20624 5.48173 7.97791ZM2.61461 4.6782C3.09551 5.36083 3.86195 5.82783 4.74023 5.90558C5.16815 6.86728 4.80919 8.01649 3.8773 8.55453C2.88086 9.12982 1.60671 8.78841 1.03141 7.79199C0.456118 6.79553 0.797526 5.52137 1.79397 4.94608C2.05436 4.79574 2.33372 4.70799 2.61461 4.6782Z"
                            fill="#51D7B1"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_10462_13980">
                            <rect
                              width="10"
                              height="10"
                              fill="white"
                              transform="translate(0 0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <span className="flex items-center">
                        <span className="text-gray-800 font-semibold">
                          Varian:
                        </span>
                        <span className="ml-1 font-normal">
                          {product.variant}
                        </span>
                      </span>{" "}
                    </div>
                    <div className="flex items-center space-x-1">
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
                        <span className="text-gray-800 font-semibold">
                          Stok:
                        </span>
                        <span className="ml-1 font-normal">
                          {product.stock}
                        </span>
                      </span>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-px bg-gray-200 mt-3 mb-2" />
              <div
                className="py-2 text-right text-[13px] font-nunito font-light text-[#0095FF] hover:underline"
                onClick={() => toggleProductSelection(product.id)}
              >
                Lihat Semua Ulasan
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutUtama>
  );
};

export default ProductSelection;
