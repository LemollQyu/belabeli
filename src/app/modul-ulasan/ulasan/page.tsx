"use client";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import detailUlasan from "@/api/ulasan/detailUlasan";
import Header from "@/app/layouts/header";
import LayoutUtama from "@/app/layouts/layout-utama";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/app/components/loading";
import postLikeUlasan from "@/api/ulasan/like";
import BackNav from "@/app/components/back";
import getDetailProduct from "@/api/detailProduct";
import postProductStock from "@/api/product/stockProduct";
import postCart from "@/api/cart/addCart";
const Ulasan = () => {
  const [dataDetailUlasan, setDataDetailUlasan] = useState<any>({});
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(1);
  const searchParams = useSearchParams();
  const idUlasanParams = Number(searchParams.get("id"));
  const productSlug = searchParams.get("product");
  const router = useRouter();
  const [loadingDetailUlasan, setLoadingDetailUlasan] =
    useState<boolean>(false);
  const [adaKeranjang, setAdaKeranjang] = useState<boolean>(false);
  const [adaBlackScreen, setAdaBlackScreen] = useState<boolean>(false);
  const [idVariasiUkuranProduk, setIdVariasiUkuranProduk] = useState<
    number | null
  >(null);
  const [idVariasiWarnaProduk, setIdVariasiWarnaProduk] = useState<
    number | null
  >(null);
  const [berhasiKeranjang, setBerhasilKeranjang] = useState<boolean>(false);

  async function handleVariantColor(e: any) {
    e.preventDefault();

    setIdVariasiWarnaProduk(Number(e.target.id));
  }

  // id variasi ukuran produk

  async function handleVariantUkuran(e: any) {
    e.preventDefault();

    setIdVariasiUkuranProduk(Number(e.target.id));
  }

  const [confirmedVariant, setConfirmedVariant] = useState<number[]>([]);

  useEffect(() => {
    setConfirmedVariant([
      idVariasiUkuranProduk || 0,
      idVariasiWarnaProduk || 0,
    ]);
  }, [idVariasiUkuranProduk, idVariasiWarnaProduk]);

  async function tambahKeranjang(e: any) {
    setBerhasilKeranjang(true);
    setAdaBlackScreen(true);

    const response = await postCart({
      merchants_id: dataDetailProduct?.merchants_id,
      products_id: dataDetailProduct?.id,
      quantity: count,
      variation_items_id: confirmedVariant,
    });

    console.log(response);

    if (response.data.code == 201) {
      setAdaKeranjang(false);

      setBerhasilKeranjang(true);
      setAdaBlackScreen(true);

      console.log("data telah masuk keranjang");
    }

    if (response?.error?.code == 401) {
      router.push("/authentikasi/login");
    }

    console.log(
      "data keranjang : ",
      confirmedVariant,
      dataDetailProduct?.merchants_id,
      dataDetailProduct?.id,
      count || 0
    );

    console.log("Tambah Keranjang");
  }

  useEffect(() => {
    setLoadingDetailUlasan(true);
    async function fetchData() {
      try {
        const response = await detailUlasan({
          ulasanId: idUlasanParams,
        });

        setDataDetailUlasan(response.data);
        setLoadingDetailUlasan(false);

        if (response.data == null || response.error?.code === 401) {
          router.push("/authentikasi/login");
        }
      } catch (err: any) {
        console.log(err.response);
      }
    }

    fetchData();
  }, [idUlasanParams]);

  const totalSlides = dataDetailUlasan.data?.media_ulasan?.length || 0;

  const handleLike = async (data: number) => {
    try {
      const response = await postLikeUlasan({ ulasan_id: data });
      setDataDetailUlasan((prevData: any) => {
        if (!prevData.data) return prevData;
        return {
          ...prevData,
          data: {
            ...prevData.data,
            is_user_like: !prevData.data.is_user_like,
            number_of_likes: prevData.data.is_user_like
              ? prevData.data.number_of_likes - 1
              : prevData.data.number_of_likes + 1,
          },
        };
      });
    } catch (error: any) {
      console.log(error?.response || error.message);
      console.log(error.message);
      if (error.message == "Request failed with status code 401") {
        router.push("/authentikasi/login");
      }
    }
  };

  function FormatTanggal(date: string) {
    // Parsing tanggal dari format ISO
    const parsedDate = new Date(date);

    // Mengonversi ke format tanggal dan bulan dengan bahasa Indonesia
    const formattedDate = parsedDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
    });

    return formattedDate;
  }

  const [dataDetailProduct, setDataDetailProduct] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [galleryUrl, setGalleryUrl] = useState<string>("");

  const [count, setCount] = useState<number>(1);
  const [dataStock, setDataStock] = useState<any>();
  console.log(idVariasiUkuranProduk, idVariasiWarnaProduk);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(false);
      const dataDetailProduct = await getDetailProduct({
        productSlug: productSlug,
      });

      setDataDetailProduct(dataDetailProduct.data);
      setGalleryUrl(dataDetailProduct.data.gallery_product[0].gallery_url);
      setIsLoading(true);
    }

    fetchData();
  }, []);

  console.log(dataDetailProduct);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await postProductStock({
          variant_items_id_1: idVariasiWarnaProduk,
          variant_items_id_2: idVariasiUkuranProduk,
        });

        setDataStock(response.data);
      } catch (err: any) {
        console.log(err.response);
      }
    }

    fetchData();
  }, [idVariasiUkuranProduk, idVariasiWarnaProduk]);

  console.log("data stock = ", dataStock);

  // Inisialisasi variabel untuk menampung hasil
  // Inisialisasi variabel untuk menampung hasil
  let variationNames = [];
  let variationUrlImage = [];

  console.log(
    `${
      dataDetailProduct?.all_variant_product?.[0]?.variation_items
        ? dataDetailProduct.all_variant_product[0].variation_items.length
        : null
    }`
  );

  // Pastikan bahwa dataDetailProduct, all_variant_product[0], dan variation_items tidak undefined
  if (dataDetailProduct?.all_variant_product?.[0]?.variation_items) {
    for (
      let index = 0;
      index < dataDetailProduct.all_variant_product[0].variation_items.length;
      index++
    ) {
      variationNames.push(
        dataDetailProduct.all_variant_product[0].variation_items[index].name
      );
    }
  }

  let variationSentence = variationNames.join(" - ");

  const handleMin = () => {
    if (count != 0) {
      setCount(count - 1);
    } else {
      setCount(0);
    }
  };

  const handlePlus = () => {
    setCount(count + 1);
  };

  function handleShare() {
    console.log("share");
  }

  return (
    <>
      <LayoutUtama>
        {/* <Header title="Detail Ulasan" children={undefined} /> */}

        {/* Custom Pagination */}
        <div className="justify-center items-center flex relative h-[40px] border  mb-4">
          <div className="absolute left-5 top-1/2 -translate-y-1/2">
            <BackNav />
          </div>
          {loadingDetailUlasan ? (
            <div className="font-nunitoBold text-[14px]">
              {Number.isNaN(activeSlideIndex) ? 1 : activeSlideIndex}/
              {totalSlides}
            </div>
          ) : (
            <div className="font-nunitoBold text-[14px]">
              {Number.isNaN(activeSlideIndex) ? 1 : activeSlideIndex}/
              {totalSlides}
            </div>
          )}
        </div>

        {loadingDetailUlasan ? (
          <div className="relative border flex justify-center items-center w-full h-[500px] bg-buttonGrey overflow-hidden rounded-lg mx-auto">
            <Loading />
          </div>
        ) : (
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={5}
            slidesPerView={1}
            loop={true}
            onSlideChange={(swiper) =>
              setActiveSlideIndex(swiper.realIndex + 1)
            }
            className="rounded-lg border w-full h-[500px]"
          >
            {dataDetailUlasan.data?.media_ulasan.map(
              (url: any, index: number) => (
                <SwiperSlide key={index}>
                  {url.type === "image" ? (
                    <div className="relative border w-full h-[500px] bg-buttonGrey overflow-hidden rounded-lg mx-auto">
                      <img
                        src={`${process.env.NEXT_PUBLIC_BASE_API_URL_2}/storage/${url.media_url}`}
                        alt="gambar ulasan"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div
                      className="relative w-[312px] h-[312px] overflow-hidden rounded-lg mx-auto"
                      onClick={(e) => {
                        const video = e.currentTarget.querySelector("video");
                        if (video) {
                          video.paused ? video.play() : video.pause();
                        }
                      }}
                    >
                      <video className="w-full h-full object-cover">
                        <source src={url.media_url} type="video/mp4" />
                        {/* <source src={`${process.env.NEXT_PUBLIC_BASE_API_URL_2}/storage/${url.media_url}`} type="video/mp4" /> */}
                        browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </SwiperSlide>
              )
            )}
          </Swiper>
        )}
        <div className="px-5 pb-5">
          <div className="w-full flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <div className="w-[18px] h-[18px] rounded-full overflow-hidden bg-buttonGrey">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_API_URL_2}/storage/${dataDetailUlasan.data?.user?.photo}`}
                  // height={500}
                  // width={500}
                  alt="gambar username"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="font-nunitoBold text-[12px]">
                {dataDetailUlasan.data?.user?.username}
              </h1>
            </div>
            <button onClick={() => handleLike(dataDetailUlasan.data?.id)}>
              {dataDetailUlasan.data?.is_user_like ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"
                    fill="#51D7B1"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z"
                    fill="#0F0F0F"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="flex justify-between items-center pr-1">
            <div className="flex gap-2 items-center">
              <span className="text-yellow-500 mb-1">
                {"★".repeat(dataDetailUlasan.data?.star)}
                {"☆".repeat(5 - dataDetailUlasan.data?.star)}
              </span>
              <p className="text-[8px] font-nunitoLight">
                {FormatTanggal(dataDetailUlasan.data?.created_at)}
              </p>
            </div>
            <p className="text-[8px] font-nunitoBold">
              ({dataDetailUlasan.data?.number_of_likes || " "})
            </p>
          </div>

          <div className="w-full flex justify-between items-center">
            <p className="font-nunitoLight text-[12px]">
              {dataDetailUlasan.data?.ulasan}
            </p>

            <div
              onClick={handleShare}
              className="flex gap-[1.5px] items-center justify-between"
            >
              <div className="w-[5px] h-[5px] rounded-full bg-black"></div>
              <div className="w-[5px] h-[5px] rounded-full bg-black"></div>
              <div className="w-[5px] h-[5px] rounded-full bg-black"></div>
            </div>
          </div>

          <div className="w-full mt-3 h-[50px] border bg-warnaUtama text-white rounded-lg flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="w-[34px] h-[34px] rounded-md overflow-hidden border">
                <img
                  src={galleryUrl}
                  height={500}
                  width={500}
                  alt="gambar"
                  className="w-full h-full object-cover "
                />
              </div>
              <div>
                <h1 className="font-nunitoBold text-[12px]">
                  {dataDetailProduct?.name}
                </h1>
                <h2 className="font-nunitoLight text-[12px]">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(dataDetailProduct?.first_price_sell || 0)}
                </h2>
              </div>
            </div>
            <div className="flex  justify-around gap-2 items-center flex-row-reverse">
              <svg
                className="cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                onClick={() => {
                  console.log("masukan keranjang");
                  setAdaKeranjang(true);
                  setAdaBlackScreen(true);
                }}
              >
                <path
                  d="M2.01709 3.34988L0 1.36546L0.879713 0.5L2.8968 2.48442H12.3779C12.7215 2.48442 13 2.75841 13 3.09639C13 3.15595 12.9912 3.21519 12.9738 3.27224L11.4809 8.16804C11.4019 8.42691 11.1597 8.6042 10.885 8.6042H3.26119V9.82815H10.1038V11.0521H2.63914C2.29559 11.0521 2.01709 10.7781 2.01709 10.4401V3.34988ZM3.26119 3.70837V7.38025H10.4222L11.5419 3.70837H3.26119ZM2.95017 13.5C2.43484 13.5 2.01709 13.089 2.01709 12.582C2.01709 12.075 2.43484 11.6641 2.95017 11.6641C3.4655 11.6641 3.88325 12.075 3.88325 12.582C3.88325 13.089 3.4655 13.5 2.95017 13.5ZM10.4148 13.5C9.89945 13.5 9.48174 13.089 9.48174 12.582C9.48174 12.075 9.89945 11.6641 10.4148 11.6641C10.9301 11.6641 11.3479 12.075 11.3479 12.582C11.3479 13.089 10.9301 13.5 10.4148 13.5Z"
                  fill="#F7F7F9"
                />
              </svg>
              <button className="px-[3px]  text-warnaUtama bg-buttonGrey font-nunitoBold rounded-md text-[12px]">
                Beli sekarang
              </button>
            </div>
          </div>
        </div>

        {/* keranjang */}
        {adaBlackScreen && (
          <div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-55"></div>
        )}

        {adaKeranjang && (
          <div
            className={`w-full sm:w-[400px] z-30 fixed bottom-0 border rounded-md  h-[420px] bg-[#fff] transition-all duration-1000 overflow-hiden`}
          >
            <div className="px-5 border-b-2  w-full h-[288px]">
              <div className="flex w-full h-10  items-center justify-between ">
                <h1 className="font-nunitoBold text-[16px]">Variant Tesedia</h1>

                <div
                  className=""
                  onClick={() => {
                    setAdaKeranjang(false);
                    setAdaBlackScreen(false);
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.99976 5.46871L12.362 0.106445L13.8941 1.63851L8.53181 7.00076L13.8941 12.3629L12.362 13.895L6.99976 8.53281L1.63754 13.895L0.105469 12.3629L5.46771 7.00076L0.105469 1.63851L1.63754 0.106445L6.99976 5.46871Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>

              {/* variant warna */}

              <div>
                <p className="font-nunitoLight font-bold text-[12px]">
                  Warna : {variationSentence}
                </p>
              </div>

              {/* tutup variant warna */}

              {/* gambar variant */}

              {dataDetailProduct?.all_variant_product.map(
                (url: any, index: number) => {
                  // console.log(url);
                  if (url.show_image == 1) {
                    return (
                      <div
                        key={index}
                        className=" h-[80px] flex gap-3 mt-[6px]"
                        onClick={handleVariantColor}
                      >
                        {url.variation_items.map(
                          (variasi: any, index: number) => {
                            // console.log(variasi);
                            return (
                              <div
                                key={index}
                                id={variasi.variation_items_id}
                                className="w-[80px] h-[80px] rounded-md overflow-hidden"
                              >
                                <Image
                                  id={variasi.variation_items_id}
                                  className={`w-full h-full object-cover ${
                                    idVariasiWarnaProduk ==
                                    variasi.variation_items_id
                                      ? `border-[#51d7b1] border-2 opacity-90`
                                      : ``
                                  }   hover:opacity-75 :border-2 focus:border-[#51d7b1] hover:border-2 hover:border-[#51D7B1]`}
                                  src={`${variasi.image_url}`}
                                  width={100}
                                  height={100}
                                  alt="Picture of the author"
                                />
                              </div>
                            );
                          }
                        )}
                      </div>
                    );
                  }
                }
              )}

              {/* tutup variant gambar */}

              {/* variant Ukuran */}

              <div className="w-full mt-5">
                <p className="text-[12px] font-nunito">Ukuran</p>
              </div>

              <div>
                {dataDetailProduct?.all_variant_product.map(
                  (variant: any, index: number) => {
                    // console.log(variant.show_image);
                    if (variant.show_image == 0) {
                      return (
                        <div
                          onClick={handleVariantUkuran}
                          className="w-full gap-2 flex mt-5  items-center"
                        >
                          {variant.variation_items.map(
                            (size: any, index: number) => {
                              return (
                                <>
                                  <div
                                    id={size.variation_items_id}
                                    className={`${
                                      idVariasiUkuranProduk ==
                                      size.variation_items_id
                                        ? "border-[#51d7b1] bg-[#51d7b1] text-white"
                                        : "border-[#51d7b1] text-black"
                                    } px-2 h-[30px] text-[16px] border-2  rounded flex justify-center items-center cursor-pointer`}
                                  >
                                    {size.name}
                                  </div>
                                </>
                              );
                            }
                          )}
                        </div>
                      );
                    }
                  }
                )}
              </div>

              <div className=" mt-[18px]">
                <p className="font-nunitoBold text-[12px] pb-[16px]">
                  Stok : {dataStock?.quantity == null ? 0 : dataStock.quantity}
                </p>
              </div>
            </div>

            <div className="flex justify-between px-5 mt-[26px]">
              {/* kuantitas */}
              <h1 className="font-nunito text-[12px]">Kuantitas</h1>
              {/* tutup kuantitas */}

              {/* count produk */}
              <div className=" flex gap-2 items-center">
                <div
                  onClick={handleMin}
                  className="flex justify-center items-center  w-[18px] h-[18px] bg-[#08A9A8]"
                >
                  <span className="inline-block bg-white w-1/2 h-[2px] "></span>
                </div>

                <div className="w-[20px] h-[20px] rounded-sm border border-[#08A9A8] flex justify-center items-center">
                  <p className="font-nunito text-[10px] text-[#08A9A8]">
                    {count}
                  </p>
                </div>

                <div
                  onClick={handlePlus}
                  className="flex justify-center items-center relative  w-[18px] h-[18px] bg-[#08A9A8]"
                >
                  <span className="inline-block bg-white w-1/2 h-[2px] "></span>
                  <span className="absolute inline-block bg-white w-1/2 h-[2px] rotate-90"></span>
                </div>
              </div>

              {/* Akhir count produk */}
            </div>
            {/* harga kuantias */}
            <h1 className="pl-5 font-nunito text-[14px]">
              {/* {dataStock?.price_sell != null
               ? formatRupiah(Number(dataStock?.price_sell))
               : "0"} */}
            </h1>

            {/* tutup harga kuantitas */}

            {/* button beli sekarang*/}
            <div className="w-full flex justify-center mt-[20px]">
              <button
                onClick={tambahKeranjang}
                className="w-[312px] bg-[#51D7B1] h-[48px] rounded-md text-center font-nunitoBold text-[#fff] "
              >
                Tambah Keranjang
              </button>
            </div>

            {/* tutup beli sekarang */}
          </div>
        )}

        {/* tutup keranjang */}

        {/* pop up berhasil keanjang */}

        {berhasiKeranjang && (
          <div
            className={`w-[360px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[382px] z-20  rounded-md bg-white border px-5 flex flex-col justify-center gap-2 items-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="absolute top-5 right-5"
              onClick={() => {
                setBerhasilKeranjang(false);
                setAdaBlackScreen(false);
              }}
            >
              <path
                d="M6.99976 5.46871L12.362 0.106445L13.8941 1.63851L8.53181 7.00076L13.8941 12.3629L12.362 13.895L6.99976 8.53281L1.63754 13.895L0.105469 12.3629L5.46771 7.00076L0.105469 1.63851L1.63754 0.106445L6.99976 5.46871Z"
                fill="black"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
            >
              <path
                d="M60 110C32.3857 110 10 87.614 10 60C10 32.3857 32.3857 10 60 10C87.614 10 110 32.3857 110 60C110 87.614 87.614 110 60 110ZM55.013 80L90.3685 44.6447L83.2975 37.5736L55.013 65.858L40.871 51.7155L33.8 58.787L55.013 80Z"
                fill="url(#paint0_linear_4359_20948)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_4359_20948"
                  x1="10"
                  y1="60"
                  x2="110"
                  y2="60"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#83E69B" />
                  <stop offset="1" stopColor="#00BAE1" />
                </linearGradient>
              </defs>
            </svg>

            <h1 className="text-[24px] font-nunitoBold ">Berhasil !</h1>
            <p className="text-[14px] font-nunito text-center ">
              Produk telah berhasil ditambahkan ke keranjang anda
            </p>
          </div>
        )}
        {/* tutup pop up keranjang */}
      </LayoutUtama>
    </>
  );
};

export default Ulasan;
