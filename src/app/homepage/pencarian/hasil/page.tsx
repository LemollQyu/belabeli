"use client";
import ProductCard from "@/app/components/pencarian/product-card";
import CategoryHorizontal from "@/app/components/pencarian/category-h-bar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HasilPencarian = () => {
  const kategori = [
    "Pria",
    "Wanita",
    "Elektronik",
    "Fashion",
    "Harian",
    "Mainan",
    "Olahraga",
    "Hewan",
    "Obat",
  ];

  const [keyword, setKeyword] = useState<string>("");
  // Gunakan useEffect untuk mengakses localStorage hanya di sisi klien
  useEffect(() => {
    const history = localStorage.getItem("slug") || "";
    setKeyword(history);
  }, []); // Empty dependency array, hanya dijalankan sekali setelah komponen dimuat

  function goToPencarian() {
    window.location.replace("/homepage/pencarian");
  }

  const back = useRouter();

  const handleBack = (e: any) => {
    e.preventDefault();
    back.back();
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex flex-wrap px-5 py-2 items-center justify-between bg-white text-white transition duration-300 min-h-[75px] max-h-[75px]">
        <div className="flex flex-wrap items-center justify-between mx-auto w-full max-w-[400px] gap-1">
          <div>
            <a
              onClick={handleBack}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center bg-gray-100 rounded-full p-2"
            >
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.88421 0.414315C6.19994 0.673072 6.25112 1.14504 5.99855 1.46849L2.45993 5.99997L5.99855 10.5314C6.25112 10.8549 6.19993 11.3269 5.88421 11.5856C5.56849 11.8444 5.10779 11.7919 4.85521 11.4685L0.950737 6.46849C0.736839 6.19457 0.736839 5.80536 0.950737 5.53145L4.85521 0.531445C5.10779 0.207999 5.56849 0.155558 5.88421 0.414315Z"
                  fill="#1B1E28"
                />
              </svg>
            </a>
          </div>
          <Link href="/homepage/pencarian">
            <div className="flex items-center min-w-[40px] min-h-[40px] border rounded-md px-2 bg-white shadow-sm">
              <span className="p-2 text-gray-500">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                    fill="#51D7B1"
                  ></path>
                </svg>
              </span>
              <input
                type="text"
                className="ml-2 w-[150px] border-none focus:outline-none text-gray-700 font-nunito"
                placeholder="Pencarian"
                value={keyword}
                onClick={goToPencarian} // Trigger search on key up
              />
            </div>
          </Link>
          <div className="px-2 py-2 flex">
            <Link href="/homepage/filter">
              <button className="w-[36px] h-[36px] rounded-md border flex justify-center items-center bg-white hover:bg-gray-50 transition shadow-sm">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7C5 6.17157 5.67157 5.5 6.5 5.5C7.32843 5.5 8 6.17157 8 7C8 7.82843 7.32843 8.5 6.5 8.5C5.67157 8.5 5 7.82843 5 7ZM6.5 3.5C4.567 3.5 3 5.067 3 7C3 8.933 4.567 10.5 6.5 10.5C8.433 10.5 10 8.933 10 7C10 5.067 8.433 3.5 6.5 3.5ZM12 8H20V6H12V8ZM16 17C16 16.1716 16.6716 15.5 17.5 15.5C18.3284 15.5 19 16.1716 19 17C19 17.8284 18.3284 18.5 17.5 18.5C16.6716 18.5 16 17.8284 16 17ZM17.5 13.5C15.567 13.5 14 15.067 14 17C14 18.933 15.567 20.5 17.5 20.5C19.433 20.5 21 18.933 21 17C21 15.067 19.433 13.5 17.5 13.5ZM4 16V18H12V16H4Z"
                    fill="#51D7B1"
                  ></path>
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </header>
      <div className="flex flex-wrap">
        <div className="px-4 font-nunito absolute top-20 items-center w-[400px] left-1/2 -translate-x-1/2">
          <CategoryHorizontal array={kategori}></CategoryHorizontal>
          {/* Product Grid */}
          <div className="product-grid grid grid-cols-2 gap-y-8 gap-x-8 py-4 mx-auto justify-items-center">
            <ProductCard
              nameProduct="Sepatu Anak Sekolah SMP Semua Ukuran | Murah Tahan Lama Berkualitas"
              linkImage="/image/produk/sepatu.jpg"
              priceAsli={199000}
              discountPrice={99000}
              star={4.4}
              sold={120}
              discount={14}
              lokasi="Sampangan, Semarang"
              linkHref="/product/90129"
              vertical={false}
            ></ProductCard>

            <ProductCard
              nameProduct="Sepatu Anak Sekolah SMP Semua Ukuran | Murah Tahan Lama Berkualitas"
              linkImage="/image/produk/o.jpg"
              priceAsli={200000}
              discountPrice={175000}
              star={4.4}
              sold={120}
              discount={18}
              lokasi="Sampangan, Semarang"
              linkHref="/product/90129"
              vertical={false}
            ></ProductCard>

            <ProductCard
              nameProduct="Sepatu Anak Sekolah SMP Semua Ukuran | Murah Tahan Lama Berkualitas"
              linkImage="/image/produk/image.png"
              priceAsli={90000}
              discountPrice={87000}
              star={4.4}
              sold={120}
              discount={18}
              lokasi="Sampangan, Semarang"
              linkHref="/product/90129"
              vertical={false}
            ></ProductCard>

            <ProductCard
              nameProduct="Sepatu Anak Sekolah SMP Semua Ukuran | Murah Tahan Lama Berkualitas"
              linkImage="/image/produk/h.jpeg"
              priceAsli={2000}
              discountPrice={1750}
              star={4.4}
              sold={120}
              discount={18}
              lokasi="Sampangan, Semarang"
              linkHref="/product/90129"
              vertical={false}
            ></ProductCard>

            <ProductCard
              nameProduct="Sepatu Anak Sekolah SMP Semua Ukuran | Murah Tahan Lama Berkualitas"
              linkImage="/image/produk/sepatu.jpg"
              priceAsli={199000}
              discountPrice={99000}
              star={4.4}
              sold={120}
              discount={14}
              lokasi="Sampangan, Semarang"
              linkHref="/product/90129"
              vertical={false}
            ></ProductCard>

            <ProductCard
              nameProduct="Sepatu Anak Sekolah SMP Semua Ukuran | Murah Tahan Lama Berkualitas"
              linkImage="/image/produk/o.jpg"
              priceAsli={200000}
              discountPrice={175000}
              star={4.4}
              sold={120}
              discount={18}
              lokasi="Sampangan, Semarang"
              linkHref="/product/90129"
              vertical={false}
            ></ProductCard>

            <ProductCard
              nameProduct="Sepatu Anak Sekolah SMP Semua Ukuran | Murah Tahan Lama Berkualitas"
              linkImage="/image/produk/image.png"
              priceAsli={90000}
              discountPrice={87000}
              star={4.4}
              sold={120}
              discount={18}
              lokasi="Sampangan, Semarang"
              linkHref="/product/90129"
              vertical={false}
            ></ProductCard>

            <ProductCard
              nameProduct="Sepatu Anak Sekolah SMP Semua Ukuran | Murah Tahan Lama Berkualitas"
              linkImage="/image/produk/h.jpeg"
              priceAsli={2000}
              discountPrice={1750}
              star={4.4}
              sold={120}
              discount={18}
              lokasi="Sampangan, Semarang"
              linkHref="/product/90129"
              vertical={false}
            ></ProductCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default HasilPencarian;
