"use client";
import Link from "next/link";
import Header from "../../layouts/header";
import React, { useActionState, useEffect, useState } from "react";
import Sweeper from "@/app/components/toko/sweeper";
import ProductCard from "@/app/components/pencarian/product-card";
import VoucherToko from "@/app/components/toko/voucher-toko";
import ProdukUnggulan from "@/app/components/toko/produk-unggulan";
import IconSuperSeller from "@/app/components/icon/super-seller";
import { div } from "framer-motion/client";
import getCategory from "@/api/getCategory";
import { useSearchParams } from "next/navigation";
import getEtalase from "@/api/etalase/getEtalase";
import getProductBaru from "@/api/toko/getProductBaru";
import { usePathname } from "next/navigation";
import getToko from "@/api/toko/getToko";
import postFollow from "@/api/toko/follow";
import Loading from "@/app/components/loading";
import getProductUnggulan from "@/api/etalase/getProductUnggulan";
import getVoucher from "@/api/voucher/getVoucher";
import getAllProductToko from "@/api/toko/getAllProductToko";
import getProductCategoryEtalase from "@/api/etalase/getProductCategoryEtalase";

type FilterState = [boolean, boolean, "asc" | null, "desc" | null];
type StarFilter = 5 | 4 | 3 | 2 | 1 | null;

const Toko = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingToko, setLoadingToko] = useState<boolean>(false);
  const [dataToko, setDataToko] = useState<any>({});

  const [openModal, setOpenModal] = useState<number | null>(null); // openModal can be a number or null
  const [isAnimating, setIsAnimating] = useState(false);

  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [isDiikuti, setDiikuti] = useState(false);
  const [dataEtalase, setDataEtalase] = useState<any | null>({});
  const [loadingEtalase, setLoadingEtalase] = useState<boolean>(false);
  const [dataProdukBaru, setDataProdukBaru] = useState<any>({});
  const [loadingProdukBaru, setLoadingProductBaru] = useState<boolean>(false);
  const [loadingProductToko, setLoadingProductToko] = useState<boolean>(false);

  const [dataProductUnggulan, setDataProductUnggulan] = useState<any>({});
  const [loadingProductUnggulan, setLoadingProductUnggulan] =
    useState<boolean>(false);

  const [dataVoucher, setDataVoucher] = useState<any>({});
  const [loadingVoucher, setLoadingVoucher] = useState<boolean>(false);
  const [dataAllProductToko, setDataAllProductToko] = useState<any>({});

  const [isDataCategory, setIsDataCategory] = useState<boolean>(false);
  // const [dataToko, setDataToko] = useSate<any>(null)

  // mendapatkan id toko
  const searchParams = useSearchParams();
  const idToko = Number(searchParams.get("merchantId"));
  // console.log(idToko, typeof idToko);

  const slugToko = searchParams.get("merchantSlug");
  // console.log(slugToko, typeof slugToko);

  const page = searchParams.get("page");

  const pathname = usePathname();

  const [filter, setFilter] = useState<FilterState>([false, false, null, null]);
  // const [ada, setAda] = useState<string>("hidden");
  // const [ada1, setAda1] = useState<string>("hidden");
  // const [ada2, setAda2] = useState<string>("hidden");
  const [starFilter, setStarFilter] = useState<StarFilter>(null);

  console.log("data tokonya = ", dataToko);

  const handleFilterChange = (
    type: "terbaru" | "terlaris" | "asc" | "desc"
  ) => {
    switch (type) {
      case "terbaru":
        setFilter([true, false, null, null]);
        break;
      case "terlaris":
        setFilter([false, true, null, null]);
        break;
      case "asc":
        setFilter([false, false, "asc", null]);
        break;
      case "desc":
        setFilter([false, false, null, "desc"]);
        break;
    }
    setStarFilter(null); // Reset star filter
  };

  const handleStarChange = (value: StarFilter) => {
    setFilter([false, false, null, null]); // Reset other filters
    setStarFilter(value);
  };

  const closeModal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setOpenModal(null); // Close the modal by setting it back to null
    }, 300);
  };

  const [dataCategoryPerProduct, setDataCategoryPerPodoct] = useState<any>({});
  const [loadingDataCategory, setLoadingDataCategory] =
    useState<boolean>(false);
  const [nameCategory, setNameCategory] = useState<string>("");

  const handleClickEtalase = async (dataId: number, nameCategory: string) => {
    console.log("data category id = ", dataId, " name = ", nameCategory);
    setNameCategory(nameCategory);

    try {
      setLoadingDataCategory(true);
      const response = await getProductCategoryEtalase({ etalaseId: dataId });
      // setIsDataCategory(true);

      console.log(`data Produk di etalase ${nameCategory}`, response);
      console.log("data = ", response.data);

      if (response?.data?.code == 200) {
        console.log("untuk tampilkan data produk yang dietalase");
      }

      setDataCategoryPerPodoct(response.data);
      setLoadingDataCategory(false);
    } catch (err: any) {
      console.log(err);
    }
  };

  console.log(isDataCategory);
  console.log("data per category product = ", dataCategoryPerProduct);

  const onDiikuti = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = event.currentTarget.value;
    // if (buttonValue) {
    //   setDiikuti(buttonValue === "true");
    // } else {
    //   setDiikuti(buttonValue === "false");
    // }

    try {
      const response = await postFollow({ merchant_id: idToko });

      console.log(response);
      setDataToko((v: any) => ({
        ...v,
        is_user_follow: !v.is_user_follow,
      }));
    } catch (err: any) {
      console.log(err);
    }
    // Toggle the value based on the current state
  };

  const segments = pathname.split("/").filter(Boolean);
  const dynamicSegment = segments.slice(1);

  console.log(decodeURIComponent(dynamicSegment[0]));

  const openModalById = (modalId: number) => {
    setOpenModal(modalId); // Set modalId as the open modal
    setIsAnimating(true);
    // console.log("data etalaseId =  ", dataEtalase.id);
  };

  const handleApplyDiscount = (discount: number) => {
    setVoucherDiscount(discount);
  };

  useEffect(() => {
    async function fetchData() {
      setLoadingProductUnggulan(true);
      const response = await getProductUnggulan({ merchantSlug: slugToko });

      setDataProductUnggulan(response.data);

      // console.log(response);

      setLoadingProductUnggulan(false);
    }

    fetchData();
  }, [slugToko]);

  // console.log(" Product Unggulan = ", dataProductUnggulan);

  useEffect(() => {
    async function fetchData() {
      setLoadingEtalase(true);
      const response = await getEtalase({ merchantId: idToko });

      console.log(response);

      setDataEtalase(response.data);
      setLoadingEtalase(false);
    }

    fetchData();
  }, []);

  console.log("Etalase yang teredia = ", dataEtalase);

  useEffect(() => {
    async function fetchData() {
      setLoadingProductBaru(true);
      const response = await getProductBaru({
        merchantSlug: slugToko,
      });

      console.log(response);

      setDataProdukBaru(response.data);
      setLoadingProductBaru(false);
    }

    fetchData();
  }, []);

  // console.log(dataProdukBaru);
  // console.log(loadingProdukBaru);

  useEffect(() => {
    async function data() {
      setLoadingToko(true);
      const response = await getToko({ merchantSlug: slugToko });
      setDataToko(response.data);

      console.log(response);

      setLoadingToko(false);
    }

    data();
  }, []);

  // console.log(dataToko);

  useEffect(() => {
    setLoadingVoucher(true);

    async function fetchData() {
      const response = await getVoucher({ merchantId: idToko });

      setDataVoucher(response.data);

      setLoadingVoucher(false);
    }

    fetchData();
  }, []);

  // console.log("data voucher cashback toko: ", dataVoucher);

  useEffect(() => {
    setLoadingProductToko(true);

    async function fetchData() {
      const response = await getAllProductToko({
        merchantSlug: slugToko,
        price: filter[2] == "asc" ? filter[2] : filter[3],
        star: starFilter,
        terbaru: filter[0],
        terlaris: filter[1],
      });

      console.log("data semua product toko: ", response);
      setDataAllProductToko(response.data);
      setLoadingProductToko(false);

      // setLoadingVoucher(false);
    }

    fetchData();
  }, [filter[0], filter[2], filter[1], filter[3], starFilter]);

  // console.log("data semua produk ", dataAllProductToko);

  const tabs = ["Utama", "Produk Baru", "Etalase"];

  const productCards: React.JSX.Element[] = [];
  for (let i = 0; i < 10; i++) {
    productCards.push(
      <ProductCard
        key={i} // Unique key for each item
        nameProduct="Sepatu Anak Sekolah SMP Semua Ukuran | Murah Tahan Lama Berkualitas"
        linkImage="/image/produk/sepatu.jpg"
        priceAsli={199000}
        discountPrice={99000}
        star={4.4}
        sold={120}
        discount={14}
        lokasi="Sampangan Semarang"
        linkHref="/product/90129"
      />
    );
  }

  // console.log(
  //   "Terbaru = ",
  //   filter[0],
  //   " Terlaris = ",
  //   filter[1],
  //   `Terendah = ${filter[2]} `,
  //   `Tertinggi = ${filter[3]} `,
  //   " Star = ",
  //   starFilter
  // );

  const renderSlideContent = () => {
    switch (activeIndex) {
      case 0:
        return (
          <>
            <Sweeper />
            <div>
              <p className="font-semibold mb-3">Produk Unggulan</p>
            </div>
            <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide mb-3">
              {loadingProductUnggulan ? (
                <div className="w-full h-[50px] justify-center items-center">
                  <Loading />
                </div>
              ) : (
                <div className="flex gap-2 w-full product-grid">
                  {/* {productUnggulan} */}

                  {dataProductUnggulan?.map?.((data: any, index: number) => {
                    // console.log(data);
                    return (
                      <ProductCard
                        key={index} // Unique key for each item
                        nameProduct={data.name}
                        linkImage={data.image_product[0].gallery_url}
                        priceAsli={data.first_price_sell}
                        discountPrice={data.first_price_after_discount}
                        star={data.rating_product.rating}
                        sold={120}
                        discount={data.discount}
                        lokasi={`${data.merchant.city}, ${data.merchant.province}`}
                        linkHref={`/product/${data.slug}?page=${page}`}
                      />
                    );
                  })}
                </div>
              )}
            </div>
            {/* {dataVoucher?.map?.((voucher: any, index: number) => {
              console.log(voucher);
            })} */}
            {loadingVoucher ? (
              <div className="w-full h-[70px] justify-center flex items-center">
                <Loading />
              </div>
            ) : (
              <VoucherToko
                data={dataVoucher}
                onApplyDiscount={handleApplyDiscount}
                setDataVoucher={undefined}
              />
            )}
            <div className="mt-3">
              <p className="font-semibold flex items-center">
                Semua Produk &nbsp;
                <span className="text-xs font-light">- 23 Produk</span>
              </p>
              <div className="flex py-4 mx-auto justify-center gap-3">
                <button
                  onClick={() => openModalById(1)}
                  className="shadow-md border-2 bg-white py-3 px-6 rounded-lg hover:bg-[#51D7B1] hover:border-transparent active:bg-[#51D7B1] active:border-transparent"
                >
                  <svg
                    width="20"
                    height="17"
                    viewBox="0 0 20 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-[#2EC99D] hover:fill-[#fff] active:fill-[#fff]"
                  >
                    <path d="M16 0L20 5H17V17H15V5H12L16 0ZM11 15V17H0V15H11ZM11 8V10H0V8H11ZM9 1V3H0V1H9Z" />
                  </svg>
                </button>

                <button
                  onClick={() => openModalById(2)}
                  className="shadow-md border-2 bg-white py-3 px-6 rounded-lg hover:bg-[#51D7B1] hover:border-transparent active:bg-[#51D7B1] active:border-transparent"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-[#2EC99D] hover:fill-[#fff] active:fill-[#fff]"
                  >
                    <path d="M2 4C2 3.17157 2.67157 2.5 3.5 2.5C4.32843 2.5 5 3.17157 5 4C5 4.82843 4.32843 5.5 3.5 5.5C2.67157 5.5 2 4.82843 2 4ZM3.5 0.5C1.567 0.5 0 2.067 0 4C0 5.933 1.567 7.5 3.5 7.5C5.433 7.5 7 5.933 7 4C7 2.067 5.433 0.5 3.5 0.5ZM9 5H17V3H9V5ZM13 14C13 13.1716 13.6716 12.5 14.5 12.5C15.3284 12.5 16 13.1716 16 14C16 14.8284 15.3284 15.5 14.5 15.5C13.6716 15.5 13 14.8284 13 14ZM14.5 10.5C12.567 10.5 11 12.067 11 14C11 15.933 12.567 17.5 14.5 17.5C16.433 17.5 18 15.933 18 14C18 12.067 16.433 10.5 14.5 10.5ZM1 13V15H9V13H1Z" />
                  </svg>
                </button>

                <button
                  onClick={() => openModalById(3)}
                  className="shadow-md border-2 bg-white py-3 px-6 rounded-lg hover:bg-[#51D7B1] hover:border-transparent active:bg-[#51D7B1] active:border-transparent"
                >
                  <svg
                    width="20"
                    height="19"
                    viewBox="0 0 20 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-[#2EC99D] hover:fill-[#fff] active:fill-[#fff]"
                  >
                    <path d="M9.9998 15L4.12197 18.5902L5.72007 11.8906L0.489258 7.40983L7.35479 6.85942L9.9998 0.5L12.6449 6.85942L19.5104 7.40983L14.2796 11.8906L15.8777 18.5902L9.9998 15ZM9.9998 12.6564L12.8165 14.3769L12.0507 11.1664L14.5574 9.0192L11.2673 8.7554L9.9998 5.70792L8.7323 8.7554L5.44228 9.0192L7.94893 11.1664L7.18311 14.3769L9.9998 12.6564Z" />
                  </svg>
                </button>

                {/* <button
                  onClick={() => openModalById(4)}
                  className="shadow-md border-2 bg-white py-3 px-6 rounded-lg hover:bg-[#51D7B1] hover:border-transparent active:bg-[#51D7B1] active:border-transparent"
                >
                  <svg
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-[#2EC99D] hover:fill-[#fff] active:fill-[#fff]"
                  >
                    <path d="M11 2C13.2091 2 15 3.79086 15 6C15 6.54443 14.8917 7.06189 14.6958 7.53339C13.0548 7.70916 11.5038 8.55852 10.4804 9.96672C9.2212 9.80342 8.14476 9.05462 7.53417 7.99871C7.19462 7.41149 6.99998 6.72998 6.99998 6C6.99998 3.79086 8.79084 2 11 2ZM16.7635 7.67248C16.9175 7.14111 17 6.57976 17 6C17 2.68629 14.3137 1e-06 11 0C7.68627 -1e-06 4.99998 2.68629 4.99998 6C4.99998 6.57978 5.08247 7.14116 5.23647 7.67254C4.69935 7.80488 4.172 8.01411 3.66995 8.30397C0.800192 9.96082 -0.183058 13.6303 1.47379 16.5001C3.13065 19.3699 6.80019 20.3531 9.6699 18.6963C10.172 18.4064 10.6169 18.0543 11 17.6553C11.3832 18.0543 11.828 18.4063 12.33 18.6962C15.1998 20.353 18.8693 19.3698 20.5262 16.5C22.183 13.6303 21.1998 9.96072 18.33 8.30389C17.828 8.01404 17.3006 7.80481 16.7635 7.67248ZM12.1543 15.9343C12.8227 14.4252 12.8627 12.6572 12.1549 11.0668C12.9259 10.0578 14.1125 9.50002 15.3322 9.49922C16.0104 9.49882 16.6979 9.67102 17.33 10.0359C19.2432 11.1405 19.8987 13.5869 18.7941 15.5C17.6895 17.4132 15.2432 18.0687 13.33 16.9641C12.8586 16.692 12.4647 16.3396 12.1543 15.9343ZM10.3649 11.9669C10.8532 13.1391 10.7429 14.4457 10.1337 15.5024C9.7949 16.09 9.3021 16.5992 8.66995 16.9642C6.75678 18.0688 4.31042 17.4133 3.20585 15.5001C2.10128 13.5869 2.75678 11.1406 4.66995 10.036C5.14142 9.76382 5.64366 9.59882 6.1499 9.53272C7.12267 10.866 8.63373 11.7846 10.3649 11.9669Z" />
                  </svg>
                </button> */}
              </div>
            </div>
            {loadingProductToko ? (
              <div className="w-full h-[400px] flex justify-center items-center">
                <Loading />
              </div>
            ) : (
              <div className="product-grid grid grid-cols-2 gap-y-2 gap-x-8 py-4 mx-auto justify-items-center">
                {/* {productCards} */}
                {dataAllProductToko?.map?.((data: any, index: number) => {
                  return (
                    <ProductCard
                      key={index} // Unique key for each item
                      nameProduct={data.name}
                      linkImage={data.image_product[0].gallery_url}
                      priceAsli={data.first_price_sell}
                      discountPrice={data.first_price_after_discount}
                      star={data.rating_product.rating}
                      sold={120}
                      discount={data.discount}
                      lokasi={`${data.merchant.city}, ${data.merchant.province}`}
                      linkHref={`/product/${data.slug}?page=${page}`}
                    />
                  );
                })}
              </div>
            )}
          </>
        );
      case 1:
        return (
          <>
            <div>
              <p className="font-semibold">Produk Baru</p>
            </div>
            {loadingProdukBaru ? (
              <div className="w-full h-[300px] flex justify-center items-center border">
                <Loading />
              </div>
            ) : (
              <div className="product-grid w-full grid grid-cols-2 gap-y-4 gap-x-8 py-4 mx-auto  justify-items-center">
                {dataProdukBaru?.map((data: any, index: number) => {
                  // console.log(data);
                  return (
                    <ProductCard
                      key={index} // Unique key for each item
                      nameProduct={data.name}
                      linkImage={data.image_product[0].gallery_url}
                      priceAsli={data.first_price_sell}
                      discountPrice={data.first_price_after_discount}
                      star={data.rating_product.rating}
                      sold={120}
                      discount={data.discount}
                      lokasi={`${data.merchant.city}, ${data.merchant.province}`}
                      linkHref={`/product/${data.slug}?page=${page}`}
                    />
                  );
                })}
              </div>
            )}
          </>
        );
      case 2:
        console.log("case milik etalase");

        // console.log(dataEtalase);

        return (
          <>
            <div>
              {/* --- Card toko status : belum diproses----- */}
              {loadingEtalase ? (
                <div className="w-full h-[300px] flex items-center justify-center">
                  <Loading />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {dataEtalase?.map((data: any, index: number) => {
                    // console.log(data);
                    return (
                      <button
                        key={index}
                        className="group flex flex-col text-center hover:bg-warnaUtama transition-all duratution-600 gap-y-2 items-center shadow-md border-2 bg-white px-8 py-5 rounded-lg"
                        onClick={() => {
                          openModalById(6);
                          handleClickEtalase(data.id, data.name);
                        }}
                      >
                        <svg
                          width="39"
                          height="38"
                          viewBox="0 0 39 38"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="group-hover:fill-white fill-[#2EC99D]"
                        >
                          <path d="M2.83333 0.25H36.1667C37.3173 0.25 38.25 1.18275 38.25 2.33333V16.9167H0.75V2.33333C0.75 1.18275 1.68275 0.25 2.83333 0.25ZM0.75 21.0833H38.25V35.6667C38.25 36.8173 37.3173 37.75 36.1667 37.75H2.83333C1.68275 37.75 0.75 36.8173 0.75 35.6667V21.0833ZM9.08333 27.3333V31.5H15.3333V27.3333H9.08333ZM9.08333 6.5V10.6667H15.3333V6.5H9.08333Z" />
                        </svg>
                        <p className="text-xs group-hover:text-white  text-[#2EC99D] font-semibold">
                          {data.name}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* --- End card toko status : belum diproses --- */}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header title="Toko" children={undefined} />
      <div className="px-4 font-nunito absolute top-24 items-center w-[360px] left-1/2 -translate-x-1/2">
        <div className="flex items-center justify-between h-full">
          <div className="flex">
            <img
              className="h-12 w-14 object-cover rounded-lg"
              src="/image/toko/toko.png"
            />
          </div>
          <div className="w-full items-center space-y-1 pl-4">
            <div className="flex items-center">
              {dataToko?.super_seller ? (
                <IconSuperSeller></IconSuperSeller>
              ) : null}

              <p className="text-base text-black-80 font-bold ml-2">
                {decodeURIComponent(dynamicSegment[0])}
              </p>
              <span className="flex items-center justify-center pl-4">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.99748 8.11094L2.05855 9.75602L2.71493 6.45256L0.242188 4.16585L3.58679 3.7693L4.99748 0.710938L6.40815 3.7693L9.75273 4.16585L7.28003 6.45256L7.9364 9.75602L4.99748 8.11094Z"
                    fill="#FFCD29"
                  />
                </svg>
                <p className="ml-1 text-sm text-black-80 font-medium">
                  {dataToko?.rating_toko?.toFixed(1).replace(".", ",")}
                </p>
                <a className="ml-10" onClick={() => openModalById(5)}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 0.499999C12.1421 0.5 15.5 3.8579 15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.8579 15.5 0.5 12.1421 0.500001 8C0.500001 3.8579 3.8579 0.499999 8 0.499999ZM8 2C4.68628 2 2 4.68627 2 8C2 11.3137 4.68628 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68627 11.3137 2 8 2ZM8.75 5.75L7.25 5.75L7.25 4.25L8.75 4.25L8.75 5.75ZM8.75 11.75L7.25 11.75L7.25 7.25L8.75 7.25L8.75 11.75Z"
                      fill="black"
                    />
                  </svg>
                </a>
              </span>
            </div>
            <div className="flex items-left justify-start">
              <p className="text-sm text-black-80 font-medium mr-1">
                {dataToko?.status_active}
              </p>
              {/* <span className="text-[#51D7B1] font-semibold text-sm">
                12 menit lalu
              </span> */}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-1 w-full pt-4 pb-2">
          <Link href={"/pesan/marketplace/"}>
            <button className="bg-white py-1 px-16 border-2 border-[#09CBCA] rounded-md text-sm text-[#09CBCA] font-semibold">
              Chat
            </button>
          </Link>

          <button
            onClick={onDiikuti}
            value={dataToko?.is_user_follow} // Set value based on current state
            className={`py-1 px-16 rounded-md text-sm ${
              dataToko?.is_user_follow
                ? "bg-white text-[#09CBCA] font-semibold border-2 border-[#09CBCA]"
                : "bg-gradient-to-r from-[#83E69B] to-[#00BAE1] text-white"
            }`}
          >
            {dataToko?.is_user_follow ? "Diikuti" : "Ikuti"}
          </button>
        </div>

        <div className="relative w-[360px] left-1/2 -translate-x-1/2">
          {/* Pagination bullets */}
          <div className="flex justify-around w-[360px] bg-white h-14 items-center">
            {tabs.map((tab, index) => (
              <span
                key={index}
                className={`border-b-4 border-[#D3D3D3] cursor-pointer text-md font-medium h-14 inline-flex items-center justify-center text-center transition-colors duration-200 w-1/3 ${
                  activeIndex === index
                    ? "text-black font-semibold"
                    : "text-black"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {tab}
              </span>
            ))}
          </div>

          {/* Active Mark */}
          <div
            className="absolute border-b-4 border-black bottom-0 bg-primary h-1 transition-all duration-200"
            style={{
              width: "33.3333%",
              left: `${activeIndex * 33.33}%`,
            }}
          />
        </div>

        {/* Slide Content */}
        <div className="swiper-slide-content mt-4 bg-white">
          {renderSlideContent()}
        </div>
      </div>

      {openModal === 1 && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

          {/* Modal */}
          <div
            id="modal"
            className="font-nunito fixed inset-0 flex justify-center items-center z-50 w-[360px] left-1/2 -translate-x-1/2 shadow-lg"
          >
            <div
              className={`bg-white w-full max-w-lg rounded-t-3xl absolute bottom-0 inset-y-auto ${
                isAnimating ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <div className="flex justify-between items-center p-6 border-b-[1px] border-b-[#878787]">
                <h2 className="text-lg font-semibold font-nunito">Filter</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="flex flex-wrap justify-between pb-6">
                <a
                  onClick={() => {
                    handleFilterChange("asc");
                    setTimeout(() => {
                      setOpenModal(null); // Close the modal by setting it back to null
                    }, 300);
                  }}
                  className="flex flex-wrap items-center justify-between align-middle cursor-pointer w-full border-b-[1px] bg-white  px-6 py-3"
                >
                  <span className="font-semibold text-black text-sm text-center">
                    Berdasarkan Harga Terendah
                  </span>
                  <input
                    type="checkbox"
                    checked={filter[2] === "asc"}
                    readOnly
                    className="w-4 h-4 border border-gray-400 rounded-sm bg-white checked:bg-green-500 focus:outline-none relative checked:text-white"
                  />
                </a>

                <a
                  onClick={() => {
                    handleFilterChange("desc");
                    setTimeout(() => {
                      setOpenModal(null); // Close the modal by setting it back to null
                    }, 300);
                  }}
                  className="flex flex-wrap items-center justify-between align-middle cursor-pointer w-full border-b-[1px] bg-white  px-6 py-3"
                >
                  <span className="font-semibold text-black text-sm text-center">
                    Berdasarkan Harga Tertinggi
                  </span>
                  <input
                    type="checkbox"
                    checked={filter[3] === "desc"}
                    readOnly
                    className="w-4 h-4 border border-gray-400 rounded-sm bg-white checked:bg-green-500 focus:outline-none relative checked:text-white"
                  />
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      {openModal === 2 && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

          {/* Modal */}
          <div
            id="modal"
            className="font-nunito fixed inset-0 flex justify-center items-center z-50 w-[360px] left-1/2 -translate-x-1/2 shadow-lg"
          >
            <div
              className={`bg-white w-full max-w-lg rounded-t-3xl absolute bottom-0 inset-y-auto ${
                isAnimating ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <div className="flex justify-between items-center p-6 border-b-[1px] border-b-[#878787]">
                <h2 className="text-lg font-semibold font-nunito">
                  Urutkan Berdasarkan
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="flex flex-wrap justify-between pb-6">
                <a
                  onClick={() => {
                    setTimeout(() => {
                      setOpenModal(null); // Close the modal by setting it back to null
                    }, 300);
                    handleFilterChange("terbaru");
                  }}
                  className="flex flex-wrap items-center justify-between align-middle cursor-pointer w-full border-b-[1px] bg-white  px-6 py-3"
                >
                  <span className="font-semibold text-black text-sm text-center ml-4">
                    Terbaru
                  </span>
                  <input
                    type="checkbox"
                    checked={filter[0]}
                    readOnly
                    className="w-4 h-4 border border-gray-400 rounded-sm bg-white checked:bg-green-500 focus:outline-none relative checked:text-white"
                  />
                </a>
                <a
                  onClick={() => {
                    handleFilterChange("terlaris");
                    setTimeout(() => {
                      setOpenModal(null); // Close the modal by setting it back to null
                    }, 300);
                  }}
                  className="flex flex-wrap items-center justify-between align-middle cursor-pointer w-full border-b-[1px] bg-white  px-6 py-3"
                >
                  <span className="font-semibold text-black text-sm text-center ml-4">
                    Terlaris
                  </span>
                  <input
                    type="checkbox"
                    checked={filter[1]}
                    readOnly
                    className="w-4 h-4 border border-gray-400 rounded-sm bg-white checked:bg-green-500 focus:outline-none relative checked:text-white"
                  />
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      {openModal === 3 && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

          {/* Modal */}
          <div
            id="modal"
            className="font-nunito fixed inset-0 flex justify-center items-center z-50 w-[360px] left-1/2 -translate-x-1/2 shadow-lg"
          >
            <div
              className={`bg-white w-full max-w-lg rounded-t-3xl absolute bottom-0 inset-y-auto ${
                isAnimating ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <div className="flex justify-between items-center p-6 border-b-[1px] border-b-[#878787]">
                <h2 className="text-lg font-semibold font-nunito">
                  Filter Rating
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              {[5, 4, 3, 2, 1].map((star) => (
                <a
                  key={star}
                  className="flex flex-wrap items-center justify-between align-middle cursor-pointer w-full border-b-[1px] bg-white px-6 py-3"
                  onClick={() => {
                    handleStarChange(star as StarFilter);
                    setTimeout(() => {
                      setOpenModal(null); // Close the modal by setting it back to null
                    }, 300);
                  }}
                >
                  <div className="flex items-center">
                    {/* Render jumlah ikon bintang sesuai nilai */}
                    <div className="flex">
                      {Array.from({ length: star }, (_, index) => (
                        <svg
                          key={index}
                          width="24"
                          height="24"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-1"
                        >
                          <path
                            d="M11.4127 17.76L4.35926 21.7082L5.93459 13.7799L0 8.2918L8.02704 7.34006L11.4127 0L14.7983 7.34006L22.8253 8.2918L16.8908 13.7799L18.4661 21.7082L11.4127 17.76Z"
                            fill="#F7D463"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={starFilter === star}
                    readOnly
                    className="w-4 h-4 border border-gray-400 rounded-sm bg-white checked:bg-green-500 focus:outline-none relative checked:text-white"
                  />
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      {openModal === 5 && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

          {/* Modal */}
          <div
            id="modal"
            className="font-nunito fixed inset-0 flex justify-center items-center z-50 w-[360px] left-1/2 -translate-x-1/2 shadow-lg"
          >
            <div
              className={`bg-white w-full max-w-lg rounded-t-3xl absolute bottom-0 inset-y-auto ${
                isAnimating ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <div className="flex justify-between items-center p-6 border-b-[1px] border-b-[#878787]">
                <h2 className="text-lg font-semibold font-nunito">
                  Tentang Toko
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="flex flex-wrap justify-between pb-6">
                <div className="flex flex-wrap items-center justify-left cursor-pointer w-full border-b-[1px] bg-white active:bg-gray-200 hover:bg-gray-200 border-b-[#878787] px-2 py-3">
                  <span className="font-semibold text-black text-sm text-center ml-4">
                    Deskripsi Toko
                  </span>
                  <p className="font-light text-sm mt-2 ml-4">
                    {dataToko?.description}
                  </p>
                </div>

                <div className="flex flex-col items-start justify-start cursor-pointer w-full border-b-[1px] bg-white active:bg-gray-200 hover:bg-gray-200 border-b-[#878787] px-2 py-3">
                  <span className="font-semibold text-black text-sm text-center ml-4">
                    Jam Operasional
                  </span>
                  <ol className="list-disc ml-8 mt-2 text-sm font-light">
                    {dataToko?.daily_operating_hour?.map(
                      (operasi: any, index: number) => {
                        return (
                          <li key={index}>
                            {operasi.nama_hari} : {operasi.operational}
                          </li>
                        );
                      }
                    )}
                    {/* <li>Senin : 08.00 - 22.00 WIB</li>
                    <li>Selasa : 08.00 - 22.00 WIB</li>
                    <li>Rabu : 08.00 - 22.00 WIB</li>
                    <li>Kamis : 08.00 - 22.00 WIB</li>
                    <li>Jumat : 08.00 - 20.00 WIB</li>
                    <li>Sabtu : 08.00 - 20.00 WIB</li>
                    <li>Minggu : 09.00 - 22.00 WIB</li> */}
                  </ol>
                </div>
              </div>

              <div className="mt-6 p-4">
                <button
                  onClick={closeModal}
                  className="w-full bg-[#51D7B1] text-white font-bold py-3 rounded-lg hover:bg-[#51D7B1]"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {isDataCategory && (
        <>
          <div className="fixed left-0 top-0 right-0 bottom-0 bg-black opacity-50"></div>
          <div className="fixed  z-20 bottom-0 w-[360px] left-1/2 -translate-x-1/2 h-[500px] border bg-white rounded">
            <div className="w-full h-[40px] absolute top-0 flex items-center justify-around">
              <h1>Ini nama etalase</h1>
              <div onClick={() => setIsDataCategory(false)}>X</div>
            </div>
            <div className="border flex flex-wrap justify-between p-1 gap-y-1 overflow-y-auto scrollbar-hide">
              {loadingDataCategory ? (
                <div className="flex justify-center items-center w-full h-[100px]">
                  <Loading />
                </div>
              ) : (
                dataCategoryPerProduct?.map?.((data: any, index: number) => {
                  // console.log(data);
                  return (
                    <>
                      <ProductCard
                        key={index} // Unique key for each item
                        nameProduct={data.name}
                        linkImage="/image/produk/sepatu.jpg"
                        priceAsli={199000}
                        discountPrice={99000}
                        star={4.4}
                        sold={120}
                        discount={14}
                        lokasi="Sampangan Semarang"
                        linkHref="/product/90129"
                      />
                    </>
                  );
                })
              )}
            </div>
            <div className="mt-6 p-4">
              <button
                onClick={closeModal}
                className="w-full bg-[#51D7B1] text-white font-bold py-3 rounded-lg hover:bg-[#51D7B1]"
              >
                Tutup
              </button>
            </div>
          </div>
        </>
      )}

      {openModal === 6 && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

          {/* Modal */}
          <div
            id="modal"
            className="font-nunito fixed inset-0 flex justify-center items-center z-50 w-[360px] left-1/2 -translate-x-1/2 shadow-lg"
          >
            <div
              className={`bg-white w-full max-w-lg rounded-t-3xl absolute bottom-0 inset-y-auto overflow-y-auto scrollbar-hide scroll-smooth ${
                isAnimating ? "translate-y-0" : "translate-y-full"
              }`}
              style={{ maxHeight: "75vh" }} // Setting max height for the scrollable area
            >
              <div className="flex justify-between items-center p-6 border-b-[1px] border-b-[#878787]">
                <h2 className="text-lg font-semibold font-nunito">
                  Etalase {nameCategory}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="flex flex-wrap justify-between p-1 gap-y-1 overflow-y-auto scrollbar-hide">
                {/* {productCards} */}
                {loadingDataCategory ? (
                  <div className="flex justify-center items-center w-full h-[100px]">
                    <Loading />
                  </div>
                ) : (
                  dataCategoryPerProduct?.map?.((data: any, index: number) => {
                    console.log(data);
                    return (
                      <>
                        <ProductCard
                          key={index} // Unique key for each item
                          nameProduct={data.name}
                          linkImage="/image/produk/sepatu.jpg"
                          priceAsli={199000}
                          discountPrice={99000}
                          star={4.4}
                          sold={120}
                          discount={14}
                          lokasi="Sampangan Semarang"
                          linkHref="/product/90129"
                        />
                      </>
                    );
                  })
                )}
              </div>

              <div className="mt-6 p-4">
                <button
                  onClick={closeModal}
                  className="w-full bg-[#51D7B1] text-white font-bold py-3 rounded-lg hover:bg-[#51D7B1]"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Toko;
