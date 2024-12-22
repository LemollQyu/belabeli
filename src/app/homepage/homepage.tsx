"use client";

export const dynamic = "force-dynamic";

import ProductCard from "./list-product/page";
import Link from "next/link";
import ProductFlashsale from "./product-flashsale/page";
import LayoutUtama from "../layouts/layout-utama";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/app/actionPage";
import getCategory from "@/api/getCategory";
import { useSearchParams } from "next/navigation";
import getProduct from "@/api/getProducts";
import Loading from "@/app/components/loading";
import productFlashale from "@/api/product/flashale/productFlashale";
import CountdownTimer from "../components/homepage/clockFlashale";
import SweeperHomepage from "../components/homepage/swipperHompage";
import useNotification from "@/api/notification/useNotification";
import notification from "@/api/notitifkasi/getNotification";
import markAllNotificationsAsRead from "@/api/notitifkasi/putReadNotification";
import useNotificationPesan from "@/api/notification/useNotificationPesan";

type DataContext = {
  access_token: string;
  refresh_token: string;
  account: Account;
};

type Account = {
  username: string;
  phone: string;
  email: string;
};

const Homepage: React.FC = () => {
  const { notifications, error, isLoading } = useNotification();
  const notificationPesanData = useNotificationPesan();

  console.log("data notif lonceng = ", notifications);
  console.log("data notif pesan = ", notificationPesanData);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [idCategory, setIdCategory] = useState<string>("");

  const [loadingHomePage, setLoadingHomePage] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false);

  const [products, setProducts] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);
  const [loadingCategory, setLoadingCategory] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [countNotification, setCountNotification] = useState<number>(0);
  const [jumlahNotif, setJumlahNotif] = useState<number>(0);
  const [jumlahPromo, setJumlahPromo] = useState<number>(0);
  const [jumlahKeuangan, setJumlahKeuangan] = useState<number>(0);

  //   useEffect(() => {
  //     setIsClient(true);
  //   }, []);

  //   if (!isClient) {
  //     return null; // Render nothing during SSR
  //   }

  //state untuk page infinite scroll
  const [page, setPage] = useState<number>(2);

  const searchParams = useSearchParams();
  const categoryParams = searchParams.get("category");

  const context = useContext(AppContext);

  const dataId: any[] = [];

  if (!context) {
    return <div>Loading...</div>;
  }

  const { access_token, refresh_token, account }: DataContext = context;

  useEffect(() => {
    setLoadingCategory(true);
    async function fetchData() {
      const dataCategory = await getCategory();
      setCategory(dataCategory.data);

      console.log({ category });
      setLoadingCategory(false);

      console.log({
        dataCategory,
      });
    }

    fetchData();
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await getAllNotificationBuyer();

  //     console.log(response);
  //     setCountNotification(response?.data?.data);
  //   }

  //   fetchData();
  // }, []);

  // console.log("data notifikasi ", countNotification);

  async function fetchData(currentPage: number) {
    setLoadingHomePage(true);

    const dataProduct = await getProduct({
      page: page,
      category: `${idCategory}`,
    });

    // setProducts(dataProduct.data.data_product);
    setProducts((prevData: any) => [
      ...prevData,
      ...dataProduct.data.data_product,
    ]);
    setHasMore(dataProduct.data.current_page < dataProduct.data.last_page);
    setPage(currentPage);

    setLoadingHomePage(false);
  }

  console.log(page, idCategory);

  useEffect(() => {
    fetchData(page);
  }, [idCategory]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loadingHomePage
    ) {
      return;
    }
    if (hasMore) {
      fetchData(page + 1); // Fetch next page
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loadingHomePage, hasMore]);

  useEffect(() => {
    setIsClient(true);
    console.log({
      access_token,
      refresh_token,
      account,
    });
  }, []);

  const handleClick = (id: any) => {
    setIdCategory(id);
    console.log(id);
  };

  console.log(idCategory);
  console.log(products);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const [expiredFlashsale, setExpiredFlashsale] = useState<number>(0);

  const [dataFlashale, setDataFlashale] = useState<any>({});
  const [loadingFlashale, setLoadingFlashale] = useState<boolean>(false);
  const [pageFlashsale, setPageFlashsale] = useState<number>(1);

  useEffect(() => {
    localStorage.removeItem("search");
    setLoadingFlashale(true);
    async function fetchData() {
      const response = await productFlashale({ page: pageFlashsale });

      setDataFlashale(response.data);
      setExpiredFlashsale(response.data.data?.expired_in);
      setLoadingFlashale(false);
    }

    fetchData();
  }, []);

  function goToPencarian() {
    window.location.replace("/homepage/pencarian");
  }

  console.log(expiredFlashsale);
  console.log(dataFlashale?.code);

  useEffect(() => {
    async function fetchNotification() {
      const response = await notification();

      console.log(response?.data?.data);
      setJumlahNotif(response?.data?.data.all_notification.length);
      setJumlahPromo(response?.data?.data?.promo.jumlah);
      setJumlahKeuangan(response.data?.data?.keuangan.jumlah);
      console.log(
        "jumlah notif = ",
        response?.data?.data.all_notification.length +
          response.data?.data?.keuangan.jumlah +
          response?.data?.data?.promo.jumlah
      );
    }

    fetchNotification();
  }, [jumlahNotif, jumlahPromo, jumlahKeuangan]);

  const jumlahNotifikasi = jumlahKeuangan + jumlahNotif + jumlahPromo;
  console.log("jumlah notifikasi = ", jumlahNotifikasi);

  const markAllAsRead = async () => {
    const response = await markAllNotificationsAsRead();
    console.log(response);
  };

  return (
    <>
      <LayoutUtama>
        {/* Promo Banner and Search Bar */}

        <div
          className="promo-banner sm:w-[360px] z-20 w-full h-[340px] bg-cover object-cover bg-center text-white  shadow-lg relative bg-blend-darken"
          // style={{
          //   backgroundImage: "url(/image/banner.jpg)",
          //   backgroundPosition: "50%",
          //   backgroundSize: "cover",
          //   backgroundRepeat: "no-repeat",
          //   backgroundColor: "lightgray",
          // }}
        >
          <div className="rounded-md flex justify-between items-center mx-auto pt-4 w-[360px] z-20">
            <div className="flex items-center w-[192px] h-[36px]  rounded-md px-2 bg-white ml-6 shadow-lg">
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
                />
              </svg>
              <input
                onClick={goToPencarian}
                className="font-nunito ml-2 w-full h-full border-none focus:outline-none text-gray-700"
                type="text"
                placeholder="Pencarian"
              />
            </div>

            {/* Icons Container */}
            <div className="px-4 py-2 flex gap-2">
              {/* Icon Chat */}
              <Link href="/pesan">
                <div className="w-[36px] h-[36px] rounded-md border flex justify-center items-center bg-white hover:bg-gray-50 transition relative cursor-pointer shadow-md">
                  {notificationPesanData?.notifications2?.data &&
                  notificationPesanData?.notifications2?.data !== 0 ? (
                    <div className="w-[20px] h-[20px] absolute -top-2 bg-red-500 text-white font-nunitoBold -right-2 flex items-center justify-center rounded-full">
                      {notificationPesanData.notifications2?.data}
                    </div>
                  ) : null}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2 13.7025 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.2975 22 8.6944 21.5746 7.29117 20.8242ZM7.58075 18.711L8.23428 19.0605C9.38248 19.6745 10.6655 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.3345 4.32549 14.6175 4.93949 15.7657L5.28896 16.4192L4.63416 19.3658L7.58075 18.711Z"
                      fill="#51D7B1"
                    />
                  </svg>
                </div>
              </Link>

              {/* Icon Filter */}
              <Link href="/homepage/filter">
                <div className="w-[36px] h-[36px] rounded-md border flex justify-center items-center bg-white hover:bg-gray-50 transition cursor-pointer shadow-md">
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
                    />
                  </svg>
                </div>
              </Link>

              {/* Icon Notifikasi */}
              <Link href="/homepage/notifikasi">
                <div className="w-[36px] h-[36px] rounded-md border flex justify-center items-center bg-white hover:bg-gray-50 transition cursor-pointer relative shadow-md">
                  {notifications?.data && notifications?.data !== 0 ? (
                    <div className="w-[20px] h-[20px] absolute -top-2 bg-red-500 text-white font-nunitoBold -right-2 flex items-center justify-center rounded-full">
                      {notifications?.data}
                    </div>
                  ) : null}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C16.9706 2 21 6.04348 21 11.0314V20H3V11.0314C3 6.04348 7.02944 2 12 2ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"
                      fill="#51D7B1"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <SweeperHomepage />

        <div className="px-4">
          {/* Categories Section */}
          {loadingCategory ? (
            <div className="px-2 flex justify-around gap-2.5 mt-4 bg-white rounded-md overflow-x-scroll scrollbar-hide">
              <div className="px-8 bg-buttonGrey py-4  rounded-md"></div>
              <div className="px-8 bg-buttonGrey py-4  rounded-md"></div>
              <div className="px-8 bg-buttonGrey py-4  rounded-md"></div>
              <div className="px-8 bg-buttonGrey py-4  rounded-md"></div>
              <div className="px-8 bg-buttonGrey py-4  rounded-md"></div>
            </div>
          ) : (
            <div className="px-2 flex justify-around gap-2.5 mt-4 bg-white rounded-md overflow-x-scroll scrollbar-hide">
              {category.map((collect: any, index: number) => (
                <button
                  key={collect.id} // Pastikan setiap elemen memiliki key
                  onClick={() => handleClick(collect.id)}
                  className={`px-4 py-2 font-nunito font-semibold border rounded-md text-xs flex items-center justify-center transition-all duration-200 ${
                    idCategory === collect.id
                      ? "bg-gradient-to-r from-[#83E69B] to-[#00BAE1] text-white shadow-md"
                      : "bg-white text-[#08A9A8]"
                  }`}
                >
                  <p className="text-xs">{collect.name}</p>
                </button>
              ))}
            </div>
          )}

          {/* Flash Sale Section */}
          {dataFlashale?.code == 404 ? null : (
            <div className="px-4 mt-4">
              <section
                className=" px-4 py-4 rounded-lg shadow-md"
                style={{
                  background:
                    "linear-gradient(180deg, #FFBC3B 0%, #FFF 104.24%)",
                }}
              >
                <div className="flex justify-between items-center mb-1">
                  <h2 className="text-black font-nunito text-[13px] font-semibold leading-[18px] tracking-[-0.276px]">
                    Penawaran Hari Ini
                  </h2>
                  <Link href="/homepage/flashsale" legacyBehavior>
                    <a className="flex items-center gap-1 text-black font-nunito text-[13px] font-semibold leading-[18px] tracking-[-0.276px]">
                      <span>Lihat Semua</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.5858 5.99995L4.1109 3.5251L4.818 2.81799L8 5.99995L4.818 9.18195L4.1109 8.47485L6.5858 5.99995Z"
                          fill="black"
                        />
                      </svg>
                    </a>
                  </Link>
                </div>

                {/* Bagian hitung mundur */}
                <div
                  className="px-2 py-2 bg-red-500 text-white rounded-md w-fit mb-2"
                  style={{
                    textAlign: "center",
                    color: "#FFF",
                    fontSize: 10,
                    fontFamily: "Nunito",
                    fontWeight: 700,
                    lineHeight: "12px",
                    wordWrap: "break-word",
                  }}
                >
                  <span>
                    {" "}
                    {loadingFlashale ? (
                      <span className="font-nunitoBold text-[10px]">
                        00:00:00
                      </span>
                    ) : (
                      <CountdownTimer initialTime={expiredFlashsale} />
                    )}
                  </span>
                </div>

                {/* Grid Produk Flashsale */}
                <div className="product-grid grid grid-cols-2 gap-y-4 py-4 justify-items-center">
                  {loadingFlashale ? (
                    <>
                      <div className="w-[120px] h-[90px] border bg-buttonGrey rounded-lg flex justify-center items-center">
                        <Loading />
                      </div>
                      <div className="w-[120px] h-[90px] border bg-buttonGrey rounded-lg flex justify-center items-center">
                        <Loading />
                      </div>
                      <div className="w-[120px] h-[90px] border bg-buttonGrey rounded-lg flex justify-center items-center">
                        <Loading />
                      </div>
                      <div className="w-[120px] h-[90px] border bg-buttonGrey rounded-lg flex justify-center items-center">
                        <Loading />
                      </div>
                    </>
                  ) : (
                    dataFlashale?.data?.flashsale.map(
                      (data: any, index: number) => {
                        console.log(data);
                        return (
                          <ProductFlashsale
                            key={index}
                            linkHref={`/product/${data.slug}`}
                            imageUrl={data?.image_product[0]?.gallery_url || ""}
                            productName={data?.name || "Produk Tidak Tersedia"}
                            discount={`${Math.round(
                              Number(data?.discount2) || 0
                            )}% - ${Math.round(Number(data?.discount1) || 0)}%`}
                            price={`Rp.${Math.round(
                              Number(data?.first_price_sell) || 0
                            )}`}
                          />
                        );
                      }
                    )
                  )}
                </div>
              </section>
            </div>
          )}
          {/* Product Grid */}

          <div className="product-grid grid grid-cols-2 gap-y-4 py-4 justify-items-center">
            {products?.map((product: any, index: number) => {
              return (
                <ProductCard
                  key={index}
                  title={product.name}
                  imageUrl={product.image_product[0]?.gallery_url}
                  originalPrice={product.first_price_sell.toLocaleString(
                    "id-ID",
                    {
                      style: "currency",
                      currency: "IDR",
                    }
                  )}
                  discountLabel={product.discount}
                  rating={product.rating_product.rating}
                  location={`${product.merchant.city}, ${product.merchant.country}`}
                  // linkHref={`${product.id}`}
                  discountedPrice={product.first_price_after_discount}
                  soldCount={product.sold_quantity}
                  linkHref={`/product/${product.slug}`}
                  page={page}
                />
              );
            })}
            {loadingHomePage && (
              <>
                <div className="bg-buttonGrey rounded-lg flex justify-center items-center w-[140px] h-[190px]">
                  <Loading />
                </div>
                <div className="bg-buttonGrey rounded-lg flex justify-center items-center w-[140px] h-[190px]">
                  <Loading />
                </div>
                <div className="bg-buttonGrey rounded-lg flex justify-center items-center w-[140px] h-[190px]">
                  <Loading />
                </div>
                <div className="bg-buttonGrey rounded-lg flex justify-center items-center w-[140px] h-[190px]">
                  <Loading />
                </div>
                <div className="bg-buttonGrey rounded-lg flex justify-center items-center w-[140px] h-[190px]">
                  <Loading />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="w-full h-[70px]"></div>
      </LayoutUtama>
    </>
  );
};

export default Homepage;
