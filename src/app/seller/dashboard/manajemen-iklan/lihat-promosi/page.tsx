"use client";
import React, { useState } from "react";
import Header from "@/app/layouts/header";
import LayoutUtama from "@/app/layouts/layout-utama";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  orderId: string;
  imageUrl: string;
  name: string;
  price: string;
  sales: number;
  rating: number;
  stock: number;
  variantCount: number;
  status: string;
  metode: string;
};

const ProductSelection = () => {
  const products: Product[] = [
    {
      id: 1,
      orderId: "1270511324",
      imageUrl:
        "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/3/7/1abd04f3-e85a-434e-82de-2ec36e34bf81.jpg",
      name: "Sepatu Anak Sekolah SMP Semua Ukuran | Murah dan Berkualitas.",
      variantCount: 4,
      price: "600.000",
      sales: 120,
      rating: 4.1,
      stock: 30,
      status: "Berlangsung",
      metode: "Banner",
    },
    {
      id: 2,
      orderId: "1270511325",
      imageUrl:
        "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/zoom/4a9ad703cbf7dfae497945a5c77ff7483481f8a6_xxl-1.jpg",
      name: "Jaket Hoodie Polos Unisex - Nyaman dan Hangat",
      variantCount: 6,
      price: "250.000",
      sales: 200,
      rating: 4.7,
      stock: 50,
      status: "Selesai",
      metode: "Banner",
    },
    {
      id: 3,
      orderId: "1270511326",
      imageUrl:
        "https://triplejeans.id/cdn/shop/files/CAPS22DNM_1.jpg?v=1716956726&width=416",
      name: "Topi Baseball Kasual | Warna dan Ukuran Lengkap",
      variantCount: 5,
      price: "100.000",
      sales: 80,
      rating: 4.3,
      stock: 100,
      status: "Berlangsung",
      metode: "Pencarian",
    },
    {
      id: 4,
      orderId: "1270511327",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEeo8DowQd2Bn0D321uwLjbmKWw46nWeVlkg&s",
      name: "Tas Ransel Anak Sekolah | Tahan Air dan Ringan",
      variantCount: 3,
      price: "300.000",
      sales: 150,
      rating: 4.5,
      stock: 40,
      status: "Selesai",
      metode: "Pencarian",
    },
    {
      id: 5,
      orderId: "1270511328",
      imageUrl:
        "https://media.karousell.com/media/photos/products/2024/3/26/kacamata_anti_radiasi_hp_dan_k_1711477119_3a85d51c_progressive.jpg",
      name: "Kacamata Anti Radiasi untuk Komputer dan HP",
      variantCount: 3,
      price: "150.000",
      sales: 250,
      rating: 4.9,
      stock: 20,
      status: "Selesai",
      metode: "Banner",
    },
    {
      id: 6,
      orderId: "1270511329",
      imageUrl:
        "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/12/26/bf7caade-3d9d-4304-af3d-f571d2724c99.jpg",
      name: "Baju Kaos Polos Pria Wanita | 100% Katun",
      variantCount: 6,
      price: "80.000",
      sales: 300,
      rating: 4.6,
      stock: 75,
      status: "Selesai",
      metode: "Banner",
    },
    {
      id: 7,
      orderId: "1270511330",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcy4gf-BemVT-bevPm0RI48BYNM30WhtxXeQ&s",
      name: "Jam Tangan Digital LED Pria Wanita | Anti Air",
      variantCount: 3,
      price: "450.000",
      sales: 90,
      rating: 4.2,
      stock: 60,
      status: "Berlangsung",
      metode: "Banner",
    },
    {
      id: 8,
      orderId: "1270511331",
      imageUrl:
        "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2023/6/9/5fe4c05d-5a5d-44e2-8183-c5a9b0d24e50.jpg",
      name: "Celana Jeans Pria Skinny Fit | Trendy dan Nyaman",
      variantCount: 3,
      price: "350.000",
      sales: 170,
      rating: 4.4,
      stock: 35,
      status: "Selesai",
      metode: "Pencarian",
    },
  ];

  const [activeTab, setActiveTab] = useState<"Berlangsung" | "Selesai">(
    "Berlangsung"
  );

  // Filter produk berdasarkan tab aktif
  const filteredProducts = products.filter(
    (product) => product.status === activeTab
  );
  const router = useRouter();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const toggleProductSelection = (productId: number) => {
    const selectedProduct = products.find(
      (product) => product.id === productId
    );

    if (!selectedProduct) {
      console.error("Produk tidak ditemukan.");
      return;
    }

    const route =
      selectedProduct.metode === "Banner"
        ? "/seller/dashboard/manajemen-iklan/banner/diiklankan"
        : "/seller/dashboard/manajemen-iklan/pencarian/diiklankan";

    setSelectedProductId((prevSelectedId) =>
      prevSelectedId === productId ? null : productId
    );
    console.log(`Product selected: ${productId}`);
    router.push(route);
  };

  const handleActivateProduct = (productId: number) => {
    console.log(`Aktifkan produk dengan ID: ${productId}`);
    // Arahkan ke halaman banner
    router.push("/seller/dashboard/manajemen-iklan");
  };

  return (
    <LayoutUtama>
      <Header title="Diiklankan" children={undefined} />
      <div className="container mx-auto font-nunito pt-24">
        {/* Tabs Header */}
        <div className="flex border-b relative mb-4">
          <button
            className={`flex-1 text-sm font-semibold py-2 text-center ${
              activeTab === "Berlangsung"
                ? "text-black border-b-2 border-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Berlangsung")}
          >
            Berlangsung
          </button>
          <button
            className={`flex-1 text-sm font-semibold py-2 text-center ${
              activeTab === "Selesai"
                ? "text-black border-b-2 border-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Selesai")}
          >
            Selesai
          </button>
        </div>

        {/* Produk */}
        <div className="space-y-4 pb-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-lg p-4 shadow-md cursor-pointer border ${
                selectedProductId === product.id
                  ? "border-emerald-500"
                  : "border-gray-200"
              }`}
              // onClick={() => toggleProductSelection(product.id)}
            >
              <div className="flex justify-between items-center mb-2">
                {/* Order ID */}
                <div className="flex items-center text-[14px] space-x-2 font-semibold font-nunito text-gray-500">
                  <span>ID: {product.orderId}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(product.orderId);
                      alert("Order ID berhasil disalin!");
                    }}
                    className="text-[16px] font-semibold text-black"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.08322 3.50033V1.75033C4.08322 1.42816 4.34439 1.16699 4.66655 1.16699H11.6666C11.9887 1.16699 12.2499 1.42816 12.2499 1.75033V9.91699C12.2499 10.2392 11.9887 10.5003 11.6666 10.5003H9.91655V12.2498C9.91655 12.5723 9.65411 12.8337 9.32925 12.8337H2.33722C2.01284 12.8337 1.75 12.5743 1.75 12.2498L1.75152 4.08417C1.75157 3.76172 2.01404 3.50033 2.33883 3.50033H4.08322ZM2.91808 4.66699L2.91678 11.667H8.74988V4.66699H2.91808ZM5.24988 3.50033H9.91655V9.33366H11.0832V2.33366H5.24988V3.50033ZM4.08333 6.41699H7.58333V7.58366H4.08333V6.41699ZM4.08333 8.75033H7.58333V9.91699H4.08333V8.75033Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </div>
                {/* Metode */}
                {activeTab === "Selesai" ? (
                  <button
                    className="px-4 py-1 text-[12px] font-semibold text-white bg-[#51d7b1] rounded-md"
                    onClick={() => handleActivateProduct(product.id)}
                  >
                    Aktifkan Lagi
                  </button>
                ) : (
                  <div
                    className="px-4 py-1 text-[12px] font-semibold text-[#51D7B1] bg-[#E6FAF6] rounded-md"
                    onClick={() => toggleProductSelection(product.id)}
                  >
                    Metode: {product.metode}
                  </div>
                )}
              </div>

              <div className="h-px bg-gray-200 mb-3"></div>
              <div className="flex space-x-4">
                <img
                  className="w-[100px] h-[100px] rounded-md object-cover"
                  src={product.imageUrl}
                  alt={product.name}
                />
                <div className="flex flex-col justify-between flex-grow">
                  <div className="text-xs font-semibold text-gray-900 font-nunito">
                    {product.name}
                  </div>
                  <div className="text-[16px] font-bold text-gray-900 font-nunito mt-1">
                    Rp {product.price.toLocaleString()}
                  </div>
                  <div className="mt-1 grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-gray-600 font-nunito">
                    {/* Terjual */}
                    <div className="flex items-center space-x-0.5">
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
                        <span className="ml-1 font-semibold">
                          {product.sales}
                        </span>
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-0.5">
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
                        <span className="ml-1 font-semibold">
                          {product.rating}
                        </span>
                      </span>
                    </div>

                    {/* Varian */}
                    <div className="flex items-center space-x-0.5">
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
                        <span className="ml-1 font-semibold">
                          {product.variantCount} Varian
                        </span>
                      </span>
                    </div>

                    {/* Stok */}
                    <div className="flex items-center space-x-0.5">
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
                        <span className="ml-1 font-semibold">
                          {product.stock}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutUtama>
  );
};

export default ProductSelection;
