"use client";

import productFlashale from "@/api/product/flashale/productFlashale";
import CountdownTimer from "@/app/components/homepage/clockFlashale";
import Loading from "@/app/components/loading";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/app/layouts/header";
//gunakan debounce dari lodash

// Debounce handleScroll agar tidak terlalu sering dipanggil

interface ProductFlashsaleProps {
  imageUrl: string;
  productName: string;
  discount: string;
  oldPrice: string;
  price: string;
  sold: number;
  stock: number;
  isLimited: boolean;
  linkHref: string;
}

const ProductFlashsale = ({
  linkHref,
  imageUrl,
  productName,
  discount,
  oldPrice,
  price,
  sold,
  stock,
  isLimited,
}: ProductFlashsaleProps) => {
  // Menghitung persentase barang terjual
  const soldPercentage = (sold / stock) * 100;
  const remainingStock = stock - sold;

  console.log(remainingStock);
  console.log(`w-[${soldPercentage}%]`);

  return (
    <Link
      href={linkHref}
      className="flex items-center border-b border-gray-300 py-2 px-2"
    >
      {/* Gambar Produk */}
      <div className="w-[115px] h-[115px] flex-shrink-0">
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Informasi Produk */}
      <div className="ml-3 flex flex-col flex-grow">
        {/* Nama Produk */}
        <h3
          className="text-black font-nunito text-[14px] font-semibold leading-4 mb-0.5"
          style={{ wordWrap: "break-word" }}
        >
          {productName}
        </h3>

        {/* Harga lama dan diskon */}
        <div className="font-nunito flex items-center text-[11px] font-normal">
          <span className="line-through text-gray-400 mr-0.5">{oldPrice}</span>
          <span className="text-red-500 flex items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_3546_17574"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="25"
                height="25"
              >
                <rect
                  x="0.148438"
                  y="0.102173"
                  width="24"
                  height="24"
                  fill="#D9D9D9"
                />
              </mask>
              <g mask="url(#mask0_3546_17574)">
                <path
                  d="M10.6984 18.3022L15.8734 12.1022H11.8734L12.5984 6.42717L7.97344 13.1022H11.4484L10.6984 18.3022ZM8.14844 22.1022L9.14844 15.1022H4.14844L13.1484 2.10217H15.1484L14.1484 10.1022H20.1484L10.1484 22.1022H8.14844Z"
                  fill="red"
                />
              </g>
            </svg>
            {discount}
          </span>
        </div>

        {/* Harga */}
        <span className="text-red-500 font-semibold text-[14px]">{price}</span>

        {/* Label segera habis */}
        {isLimited && (
          <div className="flex items-center mt-0.5">
            <span className="text-emerald-500 text-[12px] font-semibold">
              Stok Terbatas
            </span>
          </div>
        )}

        {/* Jumlah terjual dan stok */}
        <div className="w-full bg-gray-300 rounded-full h-[12px] mt-0.5 relative font-nunito">
          {/* Tulisan sold */}
          <div className="absolute inset-0 flex items-center justify-center text-[8px] text-white font-semibold">
            {sold} Terjual
          </div>

          {/* Progress bar */}
          <div
            className="bg-[#FF3D00] h-[12px] rounded-full"
            style={{ width: `${soldPercentage}%` }}
          ></div>

          {/* Icon */}
          <div
            className="absolute -top-2 left-1/2 flex items-center justify-center"
            style={{ left: `calc(${soldPercentage}% - 12.5px)` }}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.80277 4.95286C4.51335 4.3261 5.76881 3.21874 5.72441 1.14454C7.0481 2.0645 7.98564 2.96438 8.31026 3.93825C8.65068 4.9595 8.33384 6.13332 6.85858 7.60858L6.51716 7.95H7H7.00234C7.25687 7.95 7.59922 7.95 8.0398 7.78255C8.42431 7.63642 8.87302 7.36727 9.40764 6.87867C9.49172 7.16403 9.55 7.45467 9.55 7.75C9.55 9.71059 7.96059 11.3 6 11.3C4.03939 11.3 2.45 9.71059 2.45 7.75C2.45 6.73052 2.87947 5.8117 3.56794 5.16397L3.4309 5.0183L3.56794 5.16396C3.6356 5.10031 3.71503 5.03025 3.80277 4.95286Z"
                fill="#FFCD29"
                stroke="white"
                strokeWidth="0.4"
              />
              <path
                d="M6 11.6667C4.61929 11.6667 3.5 10.5474 3.5 9.16667C3.5 8.44873 3.80262 7.8015 4.28726 7.34553C4.73468 6.92458 5.83333 6.1665 5.66667 4.5C7.66667 5.83333 8.66667 7.16667 6.66667 9.16667C7 9.16667 7.5 9.16667 8.33333 8.3432C8.42323 8.60107 8.5 8.87817 8.5 9.16667C8.5 10.5474 7.3807 11.6667 6 11.6667Z"
                fill="#FF7A00"
              />
            </svg>
          </div>
        </div>

        <span className="font-nunito text-[12px] text-gray-500 mt-0.5">
          {remainingStock === 0
            ? "Stok Habis"
            : `Sisa ${remainingStock} barang`}
        </span>
      </div>

      {/* Tombol Beli */}
      {/* <button className="bg-emerald-300 text-white px-3 py-1 rounded-lg ml-3 text-[12px] font-semibold">
        Beli
      </button> */}
    </Link>
  );
};

const FlashSale = () => {
  const [dataFlashale, setDataFlashale] = useState<any>({});
  const [dataAllFlashsale, setDataAllFlashsale] = useState<any>([]);
  const [loadingFlashale, setLoadingFlashale] = useState<boolean>(false);
  const [pageFlashsale, setPageFlashsale] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Fungsi debounce sederhana
  function debounce(func: Function, delay: number) {
    let timer: ReturnType<typeof setTimeout>;
    return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }

  const handleScroll = debounce(() => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const offsetHeight = document.documentElement.offsetHeight;

    if (
      windowHeight + scrollTop >= offsetHeight - 20 &&
      hasMore &&
      !loadingFlashale
    ) {
      fetchData(pageFlashsale + 1); // Fetch next page
    }
  }, 200); // 200 ms delay

  async function fetchData(currentPage: number) {
    try {
      setLoadingFlashale(true);
      const response = await productFlashale({ page: currentPage });

      if (response && response.data && response.data.data) {
        const flashsaleData = response.data.data.all_flashsale;

        setDataFlashale(response.data);
        setDataAllFlashsale((prevData: any) => [
          ...prevData,
          ...(flashsaleData?.data_product || []),
        ]);
        setHasMore(flashsaleData.current_page < flashsaleData.last_page);
        setPageFlashsale(currentPage);
      }
    } catch (error) {
      console.error("Error fetching flash sale data:", error);
      // Handle error gracefully, e.g., show an error message to the user
    } finally {
      setLoadingFlashale(false);
    }
  }

  useEffect(() => {
    fetchData(pageFlashsale);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageFlashsale, loadingFlashale, hasMore]);

  console.log(dataFlashale?.data);

  return (
    <div className="homepage w-[400px] mx-auto pt-16 pb-20">
      <Header children={undefined} title="Penawaran hari ini" />
      <section className="mt-3 rounded-md shadow-md p-4 bg-white">
        {/* <div className="px-2 py-1 flex justify-between items-center mb-1">
          <h2 className="ml-2 text-black font-nunito text-[18px] font-semibold leading-[18px] tracking-[-0.276px]">
            Flash Sale
          </h2>
        </div> */}

        {/* Bagian hitung mundur */}
        <div className="ml-4 px-2 py-1 bg-red-500 text-white rounded-md w-fit">
          <span
            style={{
              textAlign: "center",
              color: "#FFF",
              fontSize: 12,
              fontFamily: "Nunito",
              fontWeight: 700,
              lineHeight: "12px",
              wordWrap: "break-word",
            }}
          >
            <span>
              {loadingFlashale ? (
                <div className="font-nunitoBold text-[10px]">
                  <p>00:00:00</p>
                </div>
              ) : (
                <CountdownTimer initialTime={dataFlashale?.data?.expired_in} />
              )}
            </span>
          </span>
        </div>

        {/* Grid Produk Flashsale */}
        <div className="font-nunito product-list space-y-4 px-2 mt-4">
          {dataAllFlashsale?.map((product: any, index: number) => {
            console.log(product);
            return (
              <>
                <ProductFlashsale
                  linkHref={`/product/${product.slug}`}
                  imageUrl={product.image_product[0].gallery_url}
                  productName={product.name}
                  oldPrice={`Rp ${Number(product.first_price_sell)} `}
                  // discount={`${product.discount1}`}
                  discount={`${parseInt(product.discount1)}%`}
                  price={`Rp. ${Number(product.first_price_after_discount)}`}
                  sold={product.sold_quantity}
                  stock={product.total_stock}
                  isLimited={true}
                />
              </>
            );
          })}
          {loadingFlashale && (
            <>
              <div className="w-full h-[100px] bg-buttonGrey flex justify-center rounded-md items-center">
                <Loading />
              </div>
              <div className="w-full h-[100px] bg-buttonGrey flex justify-center rounded-md items-center">
                <Loading />
              </div>
              <div className="w-full h-[100px] bg-buttonGrey flex justify-center rounded-md items-center">
                <Loading />
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default FlashSale;
