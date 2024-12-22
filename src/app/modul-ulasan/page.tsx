"use client";
import { useEffect, useState } from "react";
import NavBar from "../layouts/_navbar";

import { useRouter } from "next/navigation";
import Ulasan from "../components/modul-ulasan/ulasan";

import PopUpLaporanBerhasil from "../components/modul-ulasan/popUp-laporan-terkirim";
import LayoutUtama from "../layouts/layout-utama";
import { useSearchParams } from "next/navigation";
import postUlasanProduct from "@/api/ulasan/ulasanProduct";
import postLikeUlasan from "@/api/ulasan/like";
import Image from "next/image";
import getVariationItems from "@/api/product/variasiProduct";
import Loading from "../components/loading";
import laporanUlasan from "@/api/ulasan/laporkan";
import Link from "next/link";

const ModulUlasan = () => {
  const searchParams = useSearchParams();

  const [ada, setAda] = useState<boolean>(false);
  const product = searchParams.get("product");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(product);

  const router = useRouter();

  const [active, setActive] = useState<boolean>(false);
  const [dataUlasanProduk, setDataUlasanProduk] = useState<any>([{}]);

  const [filterContainerHeightUrutan, setFilterContainerHeightUrutan] =
    useState<string>("h-0 opacity-0");
  const [filterContainerVisibilityUrutan, setFilterContainerVisibilityUrutan] =
    useState<string>("block");

  const [dataFilterUrutan, setDataFilterUrutan] = useState<string | null>(null);

  const [dataFilterTerbaru, setDataFilterTerbaru] = useState<boolean | null>(
    null
  );
  const [dataFilterMembantu, setDataFilterMembantu] = useState<boolean | null>(
    null
  );

  const [dataFilterLabel, setDataFilterLabel] = useState<boolean | null>(null);

  const [dataFilterGambarVideo, setDataFilterGambarVideo] = useState<
    boolean | null
  >(null);

  // Tambahkan tipe "latest" untuk mendukung opsi "Terbaru"
  const [selectedFilterOption, setSelectedFilterOption] = useState<
    "desc" | "asc" | "most_helpful" | "latest" | null
  >(null);

  // Fungsi konfirmasi yang akan memproses data pilihan
  const handleConfirmFilterOption = (e: any) => {
    console.log("tutup");
    e.preventDefault();
    setFilterContainerHeightUrutan("h-0");
    setFilterContainerVisibilityUrutan("hidden");
    setActive(false);
    const result = {
      filterRating: selectedFilterOption,
      isLatest: selectedFilterOption === "latest",
    };

    if (result.filterRating == "asc") {
      setDataFilterUrutan("asc");
      setDataFilterTerbaru(null);
      setDataFilterMembantu(null);
      setDataFilterGambarVideo(null);
      setDataFilterLabel(null);
      setDataFilterStar(null);
      setConfirmedVariant(null);
    }

    if (result.filterRating == "desc") {
      setDataFilterUrutan("desc");
      setDataFilterTerbaru(null);
      setDataFilterMembantu(null);
      setDataFilterGambarVideo(null);
      setDataFilterLabel(null);
      setDataFilterStar(null);
      setConfirmedVariant(null);
    }

    if (result.filterRating == "most_helpful") {
      setDataFilterUrutan(null);
      setDataFilterTerbaru(null);
      setDataFilterMembantu(true);
      setDataFilterGambarVideo(null);
      setDataFilterLabel(null);
      setDataFilterStar(null);
      setConfirmedVariant(null);
    }

    if (result.filterRating == "latest") {
      setDataFilterUrutan(null);
      setDataFilterTerbaru(true);
      setDataFilterMembantu(null);
      setDataFilterGambarVideo(null);
      setDataFilterLabel(null);
      setDataFilterStar(null);
      setConfirmedVariant(null);
    }

    if (result.filterRating == null) {
      setDataFilterUrutan(null);
      setDataFilterTerbaru(null);
      setDataFilterMembantu(null);
      setDataFilterGambarVideo(null);
      setDataFilterLabel(null);
      setDataFilterStar(null);
      setConfirmedVariant(null);
    }
  };

  // Fungsi untuk menangani pilihan checkbox tunggal
  const handleCheckboxChange = (
    value: "desc" | "asc" | "most_helpful" | "latest"
  ) => {
    setSelectedFilterOption(selectedFilterOption === value ? null : value);
  };

  // filter gambar label

  const [filterContainerDisplay, setFilterContainerDisplay] =
    useState<string>("h-0 opacity-0");
  const [filterContainerState, setFilterContainerState] =
    useState<string>("block");

  const [isLabelFilterActive, setIsLabelFilterActive] = useState<
    boolean | null
  >(null);
  const [isMediaFilterActive, setIsMediaFilterActive] = useState<
    boolean | null
  >(null);

  // Fungsi konfirmasi yang akan memproses data pilihan filter
  const confirmFilterSelection = () => {
    setFilterContainerState("hidden");
    setFilterContainerDisplay("h-0 opacity-0");
    setActive(false);

    if (isLabelFilterActive) {
      setDataFilterLabel(true);
      setDataFilterGambarVideo(null);
      setDataFilterMembantu(null);
      setDataFilterTerbaru(null);
      setDataFilterUrutan(null);
      setDataFilterStar(null);
      setConfirmedVariant(null);
    } else if (isMediaFilterActive) {
      setDataFilterLabel(null);
      setDataFilterGambarVideo(true);
      setDataFilterMembantu(null);
      setDataFilterTerbaru(null);
      setDataFilterUrutan(null);
      setDataFilterStar(null);
      setConfirmedVariant(null);
    } else {
      setDataFilterLabel(null);
      setDataFilterGambarVideo(null);
    }
  };

  // Fungsi untuk menangani perubahan checkbox
  const handleCheckboxSelection = (option: "label" | "media") => {
    if (option === "label") {
      setIsLabelFilterActive(isLabelFilterActive ? null : true);
      setIsMediaFilterActive(null);
    } else if (option === "media") {
      setIsMediaFilterActive(isMediaFilterActive ? null : true);
      setIsLabelFilterActive(null);
    }
  };

  // tutup filter gambar label

  // filter bintang
  const [ratingFilterContainerDisplay, setRatingFilterContainerDisplay] =
    useState<string>("h-0 opacity-0");
  const [ratingFilterContainerState, setRatingFilterContainerState] =
    useState<string>("block");

  const [dataFilterStar, setDataFilterStar] = useState<number | null>(null);

  // State untuk menyimpan rating yang dipilih (1-5 atau null)
  const [rating, setRating] = useState<number | null>(null);

  // Fungsi konfirmasi yang akan memproses data pilihan filter
  const confirmRatingSelection = () => {
    setRatingFilterContainerState("hidden");
    setRatingFilterContainerDisplay("h-0 opacity-0");
    setActive(false);

    if (rating == 1 || 2 || 3 || 4 || 5) {
      setDataFilterStar(rating);
      setDataFilterLabel(null);
      setDataFilterGambarVideo(null);
      setDataFilterMembantu(null);
      setDataFilterTerbaru(null);
      setDataFilterUrutan(null);
      setConfirmedVariant(null);
    } else if (rating == null) {
      setDataFilterStar(null);
    }
  };

  // Fungsi untuk menangani perubahan checkbox rating
  const handleRatingToggle = (value: number) => {
    setRating((prevRating) => (prevRating === value ? null : value));
  };

  console.log("Selected Rating:", dataFilterStar);

  const [tinggiFilterVariasi, setTinggiFilterVaraiasi] =
    useState<string>("h-0 opacity-0");
  const [variasiItemsProduct, setVariasiItemsProduct] = useState<any>([]);

  // State untuk menyimpan pilihan pengguna

  const [tempSelectedVariant, setTempSelectedVariant] = useState<number[]>([]);

  // State untuk menyimpan pilihan yang telah dikonfirmasi (atau null jika tidak ada pilihan)
  const [confirmedVariant, setConfirmedVariant] = useState<number[] | null>(
    null
  );

  // Fungsi untuk menggambar bintang
  const renderStars = (count: number) => {
    return Array.from({ length: count }, (_, index) => (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="gold"
      >
        <path d="M10 15.273L16.18 19l-1.637-7.038L20 7.91l-7.197-.615L10 0 7.197 7.295 0 7.91l5.457 4.052L3.82 19z" />
      </svg>
    ));
  };
  // tutup filter bintang

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await postUlasanProduct({
          product_slug: product,
          helpful: null,
          label: dataFilterLabel,
          media: dataFilterGambarVideo,
          variation: confirmedVariant,
          star: dataFilterStar,
          rating: dataFilterUrutan,
        });
        setDataUlasanProduk(response.data.ulasan);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    if (product) {
      fetchData();
    }
  }, [
    product,
    dataFilterLabel,
    dataFilterGambarVideo,
    dataFilterStar,
    dataFilterUrutan,
    dataFilterMembantu,
    dataFilterTerbaru,
    confirmedVariant,
  ]);

  console.log(dataUlasanProduk);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await postUlasanProduct({
  //         product_slug: product,
  //         helpful: null,
  //         label: null,
  //         media: null,
  //         variation: [77, 78, 79],
  //         star: null,
  //         rating: null,
  //       });
  //       setDataUlasanProduk(response.data.ulasan);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }
  //   if (product) {
  //     fetchData();
  //   }
  // }, []);

  const sortedData = dataUlasanProduk?.sort(
    (a: any, b: any) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  console.log(
    "Urutan = ",
    dataFilterUrutan,

    " membantu = ",
    dataFilterMembantu,
    " terbaru = ",
    dataFilterTerbaru,
    "label = ",
    dataFilterLabel,
    " gambar video = ",
    dataFilterGambarVideo,
    " rating = ",
    dataFilterStar,
    " variasi = ",
    confirmedVariant
  );

  const handleLike = async (data: number, index: number) => {
    try {
      const response = await postLikeUlasan({
        ulasan_id: data,
      });

      console.log(response);

      setDataUlasanProduk((prevData: any[]) =>
        prevData.map((item, i) =>
          i === index ? { ...item, is_user_like: !item.is_user_like } : item
        )
      );

      setDataUlasanProduk((prevData: any) =>
        prevData.map((item: any) =>
          item.id === data
            ? {
                ...item,
                number_of_likes: item.is_user_like
                  ? item.number_of_likes + 1
                  : item.number_of_likes - 1,
              }
            : item
        )
      );
    } catch (error: any) {
      console.log(error?.response || error.message);
      console.log("di catch");
      router.push("/authentikasi/login");
    }
  };

  console.log(dataUlasanProduk);

  const handleBack = () => {
    router.back();
  };

  // Fungsi untuk menangani perubahan pilihan sementara
  const handleOptionChange = (variant: number) => {
    setTempSelectedVariant((prevVariant) =>
      prevVariant.includes(variant)
        ? prevVariant.filter((item) => item !== variant)
        : [...prevVariant, variant]
    );
  };

  // Fungsi untuk konfirmasi pilihan dan menyimpan data ke confirmedVariant
  const handleConfirmVariasi = () => {
    // Jika tidak ada pilihan, set confirmedVariant menjadi null
    if (tempSelectedVariant.length === 0) {
      setConfirmedVariant(null);
    } else {
      setConfirmedVariant(tempSelectedVariant);
      setDataFilterStar(null);
      setDataFilterLabel(null);
      setDataFilterGambarVideo(null);
      setDataFilterMembantu(null);
      setDataFilterTerbaru(null);
      setDataFilterUrutan(null);
    }

    setTinggiFilterVaraiasi("opacity-0 h-0");
    setActive(false);
  };

  console.log(confirmedVariant);

  const handleClickFilterUlasanVariasi = async (e: any) => {
    console.log("filter variasi");

    setTinggiFilterVaraiasi("opacity-100");
    setActive(true);

    try {
      const response = await getVariationItems({
        slug: product,
      });

      console.log(response);
      setVariasiItemsProduct(response.data);
    } catch (error: any) {
      console.log(error?.response || error.message);
      console.log("di catch");
    }
  };

  console.log(variasiItemsProduct);

  // laporkan ulasan

  const [dataUlasanActive, setDataUlasanActive] = useState<number>(0);

  function handleLaporkan(id: number) {
    console.log("ini ulasan dengan id = ", id);
    // setAdaLaporan(true);
    console.log("laporkan");
    setDataUlasanActive(id);
    setAda(true);
  }

  const [selectedReasonLaporkan, setSelectedReasonLaporkan] = useState<
    string | null
  >(null);
  const [customReasonLaporkan, setCustomReasonLaporkan] = useState("");

  const handleConfirmLaporkan = async ({ id }: any) => {
    const reportReasonLaporkan =
      selectedReasonLaporkan === "Lainnya"
        ? customReasonLaporkan
        : selectedReasonLaporkan;

    // console.log(dataUlasanActive);
    console.log(
      `ID Ulasan = ${dataUlasanActive}, Alasan: ${reportReasonLaporkan}`
    );

    try {
      console.log("ditry");
      const response = await laporanUlasan({
        ulasanId: dataUlasanActive,
        message: reportReasonLaporkan,
      });

      console.log(response);
      setDataUlasanActive(0);
      setAda(false);
    } catch (err: any) {
      console.log(err);
    }
    // Tambahkan logika untuk mengirim data ke backend di sini
  };

  //  tutup laporkan ulasan

  return (
    <>
      <LayoutUtama>
        <div className="h-[100vh]">
          {ada ? (
            <div className="top-0 bottom-0 right-0 left-0 fixed bg-black opacity-50 z-20"></div>
          ) : null}
          <div className="flex justify-center  items-center relative h-[44px] w-full mt-[14px]">
            {/* back */}
            <button
              onClick={handleBack}
              className="w-[40px] h-[40px] rounded-full bg-[#f1f1f1] absolute left-5 z-10  flex justify-center items-center"
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
            </button>
            {/* tutup back */}
            <h1 className="text-[14px] font-nunitoBold">
              Penilaian & Ulasan Produk
            </h1>
          </div>
          <div className="mt-[20px] border-t-2 pt-[22px] flex justify-center  items-center gap-[10px] px-5 w-full">
            <div
              id="1"
              onClick={() => {
                setFilterContainerHeightUrutan("h-[358px] opacity-100");
                setFilterContainerVisibilityUrutan("block");
                setActive(true);
              }}
              className="cursor-pointer w-[72px] h-[44px] flex justify-center items-center shadow-md rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill="none"
                id="1"
              >
                <path
                  d="M16 0L20 5H17V17H15V5H12L16 0ZM11 15V17H0V15H11ZM11 8V10H0V8H11ZM9 1V3H0V1H9Z"
                  fill="#2EC99D"
                />
              </svg>
            </div>
            <div
              id="2"
              onClick={() => {
                setFilterContainerDisplay("h-[358px] opacity-100");
                setFilterContainerState("block");
                setActive(true);
              }}
              className="w-[72px] cursor-pointer h-[44px] flex justify-center items-center shadow-md rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                id="2"
              >
                <path
                  d="M5 7C5 6.17157 5.67157 5.5 6.5 5.5C7.32843 5.5 8 6.17157 8 7C8 7.82843 7.32843 8.5 6.5 8.5C5.67157 8.5 5 7.82843 5 7ZM6.5 3.5C4.567 3.5 3 5.067 3 7C3 8.933 4.567 10.5 6.5 10.5C8.433 10.5 10 8.933 10 7C10 5.067 8.433 3.5 6.5 3.5ZM12 8H20V6H12V8ZM16 17C16 16.1716 16.6716 15.5 17.5 15.5C18.3284 15.5 19 16.1716 19 17C19 17.8284 18.3284 18.5 17.5 18.5C16.6716 18.5 16 17.8284 16 17ZM17.5 13.5C15.567 13.5 14 15.067 14 17C14 18.933 15.567 20.5 17.5 20.5C19.433 20.5 21 18.933 21 17C21 15.067 19.433 13.5 17.5 13.5ZM4 16V18H12V16H4Z"
                  fill="#2EC99D"
                />
              </svg>
            </div>
            <div
              id="3"
              onClick={() => {
                setRatingFilterContainerDisplay("h-[358px] opacity-100");
                setRatingFilterContainerState("block");
                setActive(true);
              }}
              className="w-[72px] h-[44px] cursor-pointer flex justify-center items-center shadow-md rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                id="3"
              >
                <path
                  d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17ZM11.9998 14.6564L14.8165 16.3769L14.0507 13.1664L16.5574 11.0192L13.2673 10.7554L11.9998 7.70792L10.7323 10.7554L7.44228 11.0192L9.94893 13.1664L9.18311 16.3769L11.9998 14.6564Z"
                  fill="#2EC99D"
                />
              </svg>
            </div>
            <div
              id="4"
              className="w-[72px] h-[44px] cursor-pointer flex justify-center items-center shadow-md rounded-md"
              onClick={handleClickFilterUlasanVariasi}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                id="4"
              >
                <path
                  d="M12 2.99988C14.2091 2.99988 16 4.79074 16 6.99988C16 7.54431 15.8917 8.06177 15.6958 8.53327C14.0548 8.70904 12.5038 9.5584 11.4804 10.9666C10.2212 10.8033 9.14476 10.0545 8.53417 8.99859C8.19462 8.41137 7.99998 7.72986 7.99998 6.99988C7.99998 4.79074 9.79084 2.99988 12 2.99988ZM17.7635 8.67236C17.9175 8.14099 18 7.57964 18 6.99988C18 3.68617 15.3137 0.999879 12 0.999878C8.68627 0.999877 5.99998 3.68617 5.99998 6.99988C5.99998 7.57966 6.08247 8.14104 6.23647 8.67242C5.69935 8.80476 5.172 9.01399 4.66995 9.30385C1.80019 10.9607 0.816942 14.6302 2.47379 17.5C4.13065 20.3698 7.80019 21.353 10.6699 19.6962C11.172 19.4063 11.6169 19.0542 12 18.6552C12.3832 19.0542 12.828 19.4062 13.33 19.6961C16.1998 21.3529 19.8693 20.3697 21.5262 17.4999C23.183 14.6302 22.1998 10.9606 19.33 9.30377C18.828 9.01392 18.3006 8.80469 17.7635 8.67236ZM13.1543 16.9342C13.8227 15.4251 13.8627 13.6571 13.1549 12.0667C13.9259 11.0577 15.1125 10.4999 16.3322 10.4991C17.0104 10.4987 17.6979 10.6709 18.33 11.0358C20.2432 12.1404 20.8987 14.5868 19.7941 16.4999C18.6895 18.4131 16.2432 19.0686 14.33 17.964C13.8586 17.6919 13.4647 17.3395 13.1543 16.9342ZM11.3649 12.9668C11.8532 14.139 11.7429 15.4456 11.1337 16.5023C10.7949 17.0899 10.3021 17.5991 9.66995 17.9641C7.75678 19.0687 5.31042 18.4132 4.20585 16.5C3.10128 14.5868 3.75678 12.1405 5.66995 11.0359C6.14142 10.7637 6.64366 10.5987 7.1499 10.5326C8.12267 11.8659 9.63373 12.7845 11.3649 12.9668Z"
                  fill="#2EC99D"
                />
              </svg>
            </div>
          </div>
          {isLoading ? (
            <div className="mt-[14px] h-[300px] mb-[70px] px-5 flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <div className="mt-[14px] mb-[70px] px-5 ">
              {/* Tampilan ulasan */}
              {dataFilterTerbaru
                ? sortedData?.map((ulasan: any, index: any) => {
                    const isActiveUlasan = dataUlasanActive === ulasan.id;

                    return (
                      <>
                        <div className="mt-[8px] mb-[8px]">
                          <div className="p-2 rounded-md flex flex-col gap-[4px] bg-[#FAFAFA] w-[full]">
                            <div className="flex items-center justify-between">
                              {/* photo, name, star rate */}
                              <div className=" flex gap-[5px]">
                                <div className="rounded-full overflow-hidden w-[18px] h-[18px]">
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_BASE_API_URL_2}/storage/${ulasan.user.photo}`}
                                    alt="hallo"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <h1 className="text-[12px] font-nunitoBold">
                                  {ulasan?.user?.name}
                                </h1>

                                <div
                                  className="flex gap-2 items-center ml-2
            "
                                >
                                  {Array.from({ length: ulasan.star }).map(
                                    (_, index) => (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="10"
                                        height="10"
                                        viewBox="0 0 10 10"
                                        fill="none"
                                        key={index}
                                      >
                                        <g clipPath="url(#clip0_3106_3864)">
                                          <path
                                            d="M5.00041 7.60825L2.06148 9.25333L2.71786 5.94988L0.245117 3.66317L3.58972 3.26661L5.00041 0.208252L6.41108 3.26661L9.75566 3.66317L7.28295 5.94988L7.93933 9.25333L5.00041 7.60825Z"
                                            fill="#FFCD29"
                                          />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_3106_3864">
                                            <rect
                                              width="10"
                                              height="10"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    )
                                  )}
                                </div>
                              </div>
                              {/* tutup photo, name, star rate */}

                              {/* love and warning ualasan */}
                              <div className="flex gap-2 items-center">
                                <p className="text-[8px]">
                                  {ulasan.number_of_likes == 0 ||
                                  ulasan.number_of_likes == undefined
                                    ? " "
                                    : ulasan.number_of_likes}
                                </p>

                                {ulasan.is_user_like ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    className="cursor-pointer"
                                    onClick={() => {
                                      handleLike(ulasan.id, index);
                                    }}
                                  >
                                    <path
                                      d="M9.625 1.75C11.3969 1.75 12.8333 3.20833 12.8333 5.25C12.8333 9.33333 8.45833 11.6667 7 12.5417C5.54166 11.6667 1.16666 9.33333 1.16666 5.25C1.16666 3.20833 2.625 1.75 4.375 1.75C5.45998 1.75 6.41666 2.33333 7 2.91667C7.58333 2.33333 8.54 1.75 9.625 1.75Z"
                                      fill="#51D7B1"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    className="cursor-pointer"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => {
                                      handleLike(ulasan.id, index);
                                    }}
                                  >
                                    <g id="heart-3-line">
                                      <path
                                        id="Vector"
                                        d="M9.62484 1.75C11.3968 1.75 12.8332 3.20833 12.8332 5.25C12.8332 9.33333 8.45817 11.6667 6.99984 12.5417C5.5415 11.6667 1.1665 9.33333 1.1665 5.25C1.1665 3.20833 2.62484 1.75 4.37484 1.75C5.45982 1.75 6.4165 2.33333 6.99984 2.91667C7.58317 2.33333 8.53984 1.75 9.62484 1.75ZM7.54461 10.8522C8.05888 10.5283 8.52234 10.2057 8.95686 9.86003C10.6945 8.47758 11.6665 6.96704 11.6665 5.25C11.6665 3.87378 10.7699 2.91667 9.62484 2.91667C8.99723 2.91667 8.31776 3.24865 7.82479 3.74162L6.99984 4.56658L6.17489 3.74162C5.6819 3.24865 5.00245 2.91667 4.37484 2.91667C3.24262 2.91667 2.33317 3.88296 2.33317 5.25C2.33317 6.96704 3.30516 8.47758 5.04284 9.86003C5.47734 10.2057 5.9408 10.5283 6.45506 10.8522C6.62919 10.9619 6.80215 11.0675 6.99984 11.1855C7.19753 11.0675 7.37049 10.9619 7.54461 10.8522Z"
                                        fill="#2A2A2A"
                                      />
                                    </g>
                                  </svg>
                                )}

                                {/*Laporkan*/}
                                {/* Laporkan */}
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => handleLaporkan(ulasan.id)} // Pastikan handleLaporkan dipanggil di sini
                                >
                                  <g id="error-warning-line">
                                    <path
                                      id="Vector"
                                      d="M6.99984 12.8334C3.77817 12.8334 1.1665 10.2217 1.1665 7.00008C1.1665 3.77842 3.77817 1.16675 6.99984 1.16675C10.2215 1.16675 12.8332 3.77842 12.8332 7.00008C12.8332 10.2217 10.2215 12.8334 6.99984 12.8334ZM6.99984 11.6667C9.57718 11.6667 11.6665 9.57742 11.6665 7.00008C11.6665 4.42275 9.57718 2.33341 6.99984 2.33341C4.42251 2.33341 2.33317 4.42275 2.33317 7.00008C2.33317 9.57742 4.42251 11.6667 6.99984 11.6667ZM6.4165 8.75008H7.58317V9.91675H6.4165V8.75008ZM6.4165 4.08341H7.58317V7.58341H6.4165V4.08341Z"
                                      fill="#2A2A2A"
                                    />
                                  </g>
                                </svg>
                              </div>
                              {/* tutup love and warning */}
                            </div>
                            {/* message ulasan */}

                            <p className="font-nunito text-[10px] mt-[3px]">
                              {ulasan?.ulasan}
                            </p>

                            {/* tutup message ulasan */}

                            <div className="mt-[5px] flex gap-[10px]">
                              {ulasan?.media_ulasan?.map(
                                (data: any, index: number) => {
                                  if (data.type == "image") {
                                    return (
                                      <div className="w-[64px] h-[64px] rounded-md border overflow-hidden">
                                        <Image
                                          src={data.media_url}
                                          alt="hallo"
                                          width={300}
                                          height={300}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div
                                        key={index} // Gunakan key unik untuk setiap item
                                        className="w-[64px] h-[64px] rounded-md border overflow-hidden cursor-pointer"
                                        onClick={(e) => {
                                          const video =
                                            e.currentTarget.querySelector<any>(
                                              "video"
                                            );
                                          if (video.paused) {
                                            video.play();
                                          } else {
                                            video.pause();
                                          }
                                        }}
                                      >
                                        <video
                                          src={data.media_url} // Gunakan item.media_url jika `media_url` adalah property dari setiap item dalam array
                                          width={300}
                                          height={300}
                                          className="w-full h-full object-fit"
                                        />
                                      </div>
                                    );
                                  }
                                }
                              )}
                            </div>
                          </div>
                        </div>

                        {isActiveUlasan && (
                          <div className="fixed bottom-11 left-1/2 transform -translate-x-1/2 bg-white w-80 border border-gray-300 rounded-md p-5 z-30">
                            <div className="flex items-center justify-between">
                              <h1 className="font-bold">Laporkan Ulasan</h1>
                              <button>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  onClick={() => {
                                    setDataUlasanActive(0);
                                    setAda(false);
                                  }}
                                >
                                  <path
                                    d="M6.99967 5.46871L12.3619 0.106445L13.894 1.63851L8.53172 7.00076L13.894 12.3629L12.3619 13.895L6.99967 8.53281L1.63745 13.895L0.105377 12.3629L5.46762 7.00076L0.105377 1.63851L1.63745 0.106445L6.99967 5.46871Z"
                                    fill="black"
                                  />
                                </svg>
                              </button>
                            </div>

                            <div className="mt-4">
                              <div className="border rounded-md">
                                <div className="border-b p-3 flex items-center gap-3 border-gray-300">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"
                                      fill="black"
                                    />
                                  </svg>
                                  <h1 className="text-sm font-bold">
                                    Alasan Laporan
                                  </h1>
                                </div>

                                <div className="flex flex-col p-3 gap-3">
                                  {[
                                    "Ini termasuk spam",
                                    "Konten mengandung SARA, diskriminasi, vulgar",
                                    "Konten mengandung pencemaran nama baik",
                                  ].map((reason) => (
                                    <label
                                      key={reason}
                                      className="flex justify-between items-center"
                                    >
                                      <span className="text-sm">{reason}</span>
                                      <input
                                        type="radio"
                                        name="reason"
                                        value={reason}
                                        checked={
                                          selectedReasonLaporkan === reason
                                        }
                                        onChange={() =>
                                          setSelectedReasonLaporkan(reason)
                                        }
                                      />
                                    </label>
                                  ))}
                                  <div className="flex items-center gap-2 mt-2">
                                    <span className="text-sm">Lainnya:</span>
                                    <input
                                      type="text"
                                      placeholder="laporan..."
                                      value={customReasonLaporkan}
                                      onChange={(e) => {
                                        setCustomReasonLaporkan(e.target.value);
                                        setSelectedReasonLaporkan("Lainnya");
                                      }}
                                      className="border-b border-gray-300 focus:outline-none focus:border-gray-500 text-sm py-1"
                                    />
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  handleConfirmLaporkan(ulasan.id);
                                }}
                                className="mt-4 w-full h-10 border border-[#51D7B1] text-[#51D7B1] rounded-md"
                              >
                                Konfirmasi
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })
                : dataUlasanProduk?.map((ulasan: any, index: any) => {
                    // console.log(ulasan);
                    const isActiveUlasan = dataUlasanActive === ulasan.id;

                    // console.log(ulasan.media_ulasan);

                    return (
                      <>
                        <div key={index} className="mt-[8px] mb-[8px]">
                          <div className="p-2 rounded-md flex flex-col gap-[4px] bg-[#FAFAFA] w-[full]">
                            <div className="flex items-center justify-between">
                              {/* photo, name, star rate */}
                              <div className=" flex gap-[5px]">
                                <div className="rounded-full overflow-hidden w-[18px] h-[18px]">
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_BASE_API_URL_2}/storage/${ulasan?.user?.photo}`}
                                    alt={ulasan?.user?.username}
                                    // width={300}
                                    // height={300}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <h1 className="text-[12px] font-nunitoBold">
                                  {ulasan?.user?.username}
                                </h1>

                                <div
                                  className="flex gap-2 items-center ml-2
              "
                                >
                                  {Array.from({ length: ulasan.star }).map(
                                    (_, index) => (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="10"
                                        height="10"
                                        viewBox="0 0 10 10"
                                        fill="none"
                                        key={index}
                                      >
                                        <g clipPath="url(#clip0_3106_3864)">
                                          <path
                                            d="M5.00041 7.60825L2.06148 9.25333L2.71786 5.94988L0.245117 3.66317L3.58972 3.26661L5.00041 0.208252L6.41108 3.26661L9.75566 3.66317L7.28295 5.94988L7.93933 9.25333L5.00041 7.60825Z"
                                            fill="#FFCD29"
                                          />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_3106_3864">
                                            <rect
                                              width="10"
                                              height="10"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    )
                                  )}
                                </div>
                              </div>
                              {/* tutup photo, name, star rate */}

                              {/* love and warning ualasan */}
                              <div className="flex gap-2 items-center">
                                <p className="text-[8px]">
                                  {ulasan.number_of_likes == 0 ||
                                  ulasan.number_of_likes == undefined
                                    ? " "
                                    : ulasan.number_of_likes}
                                </p>

                                {ulasan.is_user_like ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    className="cursor-pointer"
                                    onClick={() => {
                                      handleLike(ulasan.id, index);
                                    }}
                                  >
                                    <path
                                      d="M9.625 1.75C11.3969 1.75 12.8333 3.20833 12.8333 5.25C12.8333 9.33333 8.45833 11.6667 7 12.5417C5.54166 11.6667 1.16666 9.33333 1.16666 5.25C1.16666 3.20833 2.625 1.75 4.375 1.75C5.45998 1.75 6.41666 2.33333 7 2.91667C7.58333 2.33333 8.54 1.75 9.625 1.75Z"
                                      fill="#51D7B1"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    className="cursor-pointer"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => {
                                      handleLike(ulasan.id, index);
                                    }}
                                  >
                                    <g id="heart-3-line">
                                      <path
                                        id="Vector"
                                        d="M9.62484 1.75C11.3968 1.75 12.8332 3.20833 12.8332 5.25C12.8332 9.33333 8.45817 11.6667 6.99984 12.5417C5.5415 11.6667 1.1665 9.33333 1.1665 5.25C1.1665 3.20833 2.62484 1.75 4.37484 1.75C5.45982 1.75 6.4165 2.33333 6.99984 2.91667C7.58317 2.33333 8.53984 1.75 9.62484 1.75ZM7.54461 10.8522C8.05888 10.5283 8.52234 10.2057 8.95686 9.86003C10.6945 8.47758 11.6665 6.96704 11.6665 5.25C11.6665 3.87378 10.7699 2.91667 9.62484 2.91667C8.99723 2.91667 8.31776 3.24865 7.82479 3.74162L6.99984 4.56658L6.17489 3.74162C5.6819 3.24865 5.00245 2.91667 4.37484 2.91667C3.24262 2.91667 2.33317 3.88296 2.33317 5.25C2.33317 6.96704 3.30516 8.47758 5.04284 9.86003C5.47734 10.2057 5.9408 10.5283 6.45506 10.8522C6.62919 10.9619 6.80215 11.0675 6.99984 11.1855C7.19753 11.0675 7.37049 10.9619 7.54461 10.8522Z"
                                        fill="#2A2A2A"
                                      />
                                    </g>
                                  </svg>
                                )}

                                {/*Laporkan*/}
                                {/* Laporkan */}
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => handleLaporkan(ulasan.id)} // Pastikan handleLaporkan dipanggil di sini
                                >
                                  <g id="error-warning-line">
                                    <path
                                      id="Vector"
                                      d="M6.99984 12.8334C3.77817 12.8334 1.1665 10.2217 1.1665 7.00008C1.1665 3.77842 3.77817 1.16675 6.99984 1.16675C10.2215 1.16675 12.8332 3.77842 12.8332 7.00008C12.8332 10.2217 10.2215 12.8334 6.99984 12.8334ZM6.99984 11.6667C9.57718 11.6667 11.6665 9.57742 11.6665 7.00008C11.6665 4.42275 9.57718 2.33341 6.99984 2.33341C4.42251 2.33341 2.33317 4.42275 2.33317 7.00008C2.33317 9.57742 4.42251 11.6667 6.99984 11.6667ZM6.4165 8.75008H7.58317V9.91675H6.4165V8.75008ZM6.4165 4.08341H7.58317V7.58341H6.4165V4.08341Z"
                                      fill="#2A2A2A"
                                    />
                                  </g>
                                </svg>
                              </div>
                              {/* tutup love and warning */}
                            </div>
                            {/* message ulasan */}

                            <p className="font-nunito text-[10px] mt-[3px]">
                              {ulasan?.ulasan}
                            </p>

                            {/* tutup message ulasan */}

                            <div className="mt-[5px] flex gap-[10px]">
                              {ulasan?.media_ulasan?.map(
                                (data: any, index: number) => {
                                  console.log(data);
                                  if (data.type == "image") {
                                    return (
                                      <Link
                                        href={`/modul-ulasan/ulasan?id=${ulasan.id}&product=${product}`}
                                        className="w-[64px] h-[64px] rounded-md border overflow-hidden"
                                      >
                                        <img
                                          src={`${process.env.NEXT_PUBLIC_BASE_API_URL_2}/storage/${data.media_url}`}
                                          alt="hallo"
                                          className="w-full h-full object-cover"
                                        />
                                      </Link>
                                    );
                                  } else {
                                    return (
                                      <Link
                                        href={`/modul-ulasan/ulasan?id=${data.id}&product=${product}`}
                                        key={index} // Gunakan key unik untuk setiap item
                                        className="w-[64px] h-[64px] rounded-md border overflow-hidden cursor-pointer"
                                        onClick={(e) => {
                                          const video =
                                            e.currentTarget.querySelector<any>(
                                              "video"
                                            );
                                          if (video.paused) {
                                            video.play();
                                          } else {
                                            video.pause();
                                          }
                                        }}
                                      >
                                        <video
                                          src={data.media_url} // Gunakan item.media_url jika `media_url` adalah property dari setiap item dalam array
                                          width={300}
                                          height={300}
                                          className="w-full h-full object-fit"
                                        />
                                      </Link>
                                    );
                                  }
                                }
                              )}
                            </div>
                          </div>
                        </div>

                        {isActiveUlasan && (
                          <div className="fixed bottom-11 left-1/2 transform -translate-x-1/2 bg-white w-80 border border-gray-300 rounded-md p-5 z-30">
                            <div className="flex items-center justify-between">
                              <h1 className="font-bold">Laporkan Ulasan</h1>
                              <button>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  onClick={() => {
                                    setDataUlasanActive(0);
                                    setAda(false);
                                  }}
                                >
                                  <path
                                    d="M6.99967 5.46871L12.3619 0.106445L13.894 1.63851L8.53172 7.00076L13.894 12.3629L12.3619 13.895L6.99967 8.53281L1.63745 13.895L0.105377 12.3629L5.46762 7.00076L0.105377 1.63851L1.63745 0.106445L6.99967 5.46871Z"
                                    fill="black"
                                  />
                                </svg>
                              </button>
                            </div>

                            <div className="mt-4">
                              <div className="border rounded-md">
                                <div className="border-b p-3 flex items-center gap-3 border-gray-300">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"
                                      fill="black"
                                    />
                                  </svg>
                                  <h1 className="text-sm font-bold">
                                    Alasan Laporan
                                  </h1>
                                </div>

                                <div className="flex flex-col p-3 gap-3">
                                  {[
                                    "Ini termasuk spam",
                                    "Konten mengandung SARA, diskriminasi, vulgar",
                                    "Konten mengandung pencemaran nama baik",
                                  ].map((reason) => (
                                    <label
                                      key={reason}
                                      className="flex justify-between items-center"
                                    >
                                      <span className="text-sm">{reason}</span>
                                      <input
                                        type="radio"
                                        name="reason"
                                        value={reason}
                                        checked={
                                          selectedReasonLaporkan === reason
                                        }
                                        onChange={() =>
                                          setSelectedReasonLaporkan(reason)
                                        }
                                      />
                                    </label>
                                  ))}
                                  <div className="flex items-center gap-2 mt-2">
                                    <span className="text-sm">Lainnya:</span>
                                    <input
                                      type="text"
                                      placeholder="laporan..."
                                      value={customReasonLaporkan}
                                      onChange={(e) => {
                                        setCustomReasonLaporkan(e.target.value);
                                        setSelectedReasonLaporkan("Lainnya");
                                      }}
                                      className="border-b border-gray-300 focus:outline-none focus:border-gray-500 text-sm py-1"
                                    />
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => handleConfirmLaporkan(ulasan.id)}
                                className="mt-4 w-full h-10 border border-[#51D7B1] text-[#51D7B1] rounded-md"
                              >
                                Konfirmasi
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })}

              {/* tutup tampilan ulasan */}
            </div>
          )}

          <div
            className={`group border-2 z-20 fixed bottom-0 left-1/2 transition-all duration-700 -translate-x-1/2 w-[360px] rounded-t-3xl bg-white ${filterContainerHeightUrutan}`}
          >
            <div className="flex justify-between items-center p-5 border-b-2">
              <h2 className="text-xl font-nunitoBold">
                Filter Urutan Berdasarkan
              </h2>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                onClick={(e: any) => {
                  e.preventDefault();
                  setFilterContainerHeightUrutan("h-0");
                  setFilterContainerVisibilityUrutan("hidden");
                  setActive(false);
                }}
              >
                <path
                  d="M12.9997 11.4687L18.3619 6.10645L19.894 7.63851L14.5317 13.0008L19.894 18.3629L18.3619 19.895L12.9997 14.5328L7.63745 19.895L6.10538 18.3629L11.4676 13.0008L6.10538 7.63851L7.63745 6.10645L12.9997 11.4687Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="mb-4">
              <label className="flex justify-between items-center px-[24px] py-[10px] border-b">
                <div className="flex gap-2 items-center">
                  <span className="font-nunito text-[12px]">
                    Rating Tertinggi
                  </span>
                </div>
                <input
                  type="checkbox"
                  name="filterOption"
                  value="desc"
                  checked={selectedFilterOption === "desc"}
                  onChange={() => handleCheckboxChange("desc")}
                  className="text-green-500 focus:ring-2 focus:ring-green-500"
                />
              </label>
              <label className="flex items-center justify-between px-[24px] border-b py-[10px]">
                <div className="flex gap-2 items-center">
                  <span className="font-nunito text-[12px]">
                    Rating Terendah
                  </span>
                </div>
                <input
                  type="checkbox"
                  name="filterOption"
                  value="asc"
                  checked={selectedFilterOption === "asc"}
                  onChange={() => handleCheckboxChange("asc")}
                  className="text-green-500 focus:ring-2 focus:ring-green-500"
                />
              </label>
              <label className="flex items-center justify-between px-[24px] border-b py-[10px]">
                <div className="flex gap-2 items-center">
                  <span className="font-nunito text-[12px]">
                    Paling Membantu
                  </span>
                </div>
                <input
                  type="checkbox"
                  name="filterOption"
                  value="most_helpful"
                  checked={selectedFilterOption === "most_helpful"}
                  onChange={() => handleCheckboxChange("most_helpful")}
                  className="text-green-500 focus:ring-2 focus:ring-green-500"
                />
              </label>
              <label className="flex items-center justify-between px-[24px] border-b py-[10px]">
                <div className="flex gap-2 items-center">
                  <span className="font-nunito text-[12px]">Terbaru</span>
                </div>
                <input
                  type="checkbox"
                  name="filterOption"
                  value="latest"
                  checked={selectedFilterOption === "latest"}
                  onChange={() => handleCheckboxChange("latest")}
                  className="text-green-500 focus:ring-2 focus:ring-green-500"
                />
              </label>
            </div>
            <button
              onClick={handleConfirmFilterOption}
              className={`   
          bg-[#51D7B1] text-white
         w-[312px] h-[42px] py-2 absolute bottom-5 left-1/2 -translate-x-1/2 ${filterContainerVisibilityUrutan} font-semibold rounded-lg`}
            >
              Konfirmasi
            </button>
          </div>

          <div
            className={`group border-2 fixed bottom-0 left-1/2 transition-all duration-700 -translate-x-1/2 w-[360px] z-20 rounded-t-3xl bg-white ${filterContainerDisplay}`}
          >
            <div className="flex justify-between items-center p-5 border-b-2">
              <h2 className="text-xl font-nunitoBold">Filter Berdasarkan</h2>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                onClick={(e: any) => {
                  e.preventDefault();
                  setFilterContainerDisplay("h-0");
                  setFilterContainerState("hidden");
                  setActive(false);
                }}
              >
                <path
                  d="M12.9997 11.4687L18.3619 6.10645L19.894 7.63851L14.5317 13.0008L19.894 18.3629L18.3619 19.895L12.9997 14.5328L7.63745 19.895L6.10538 18.3629L11.4676 13.0008L6.10538 7.63851L7.63745 6.10645L12.9997 11.4687Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="mb-4">
              <label className="flex justify-between items-center px-[24px] py-[10px] border-b">
                <div className="flex gap-2 items-center">
                  <span className="font-nunito text-[12px]">Label</span>
                </div>
                <input
                  type="checkbox"
                  name="filterOption"
                  value="label"
                  checked={isLabelFilterActive === true}
                  onChange={() => handleCheckboxSelection("label")}
                  className="text-green-500 focus:ring-2 focus:ring-green-500"
                />
              </label>
              <label className="flex items-center justify-between px-[24px] border-b py-[10px]">
                <div className="flex gap-2 items-center">
                  <span className="font-nunito text-[12px]">
                    Gambar & Video
                  </span>
                </div>
                <input
                  type="checkbox"
                  name="filterOption"
                  value="media"
                  checked={isMediaFilterActive === true}
                  onChange={() => handleCheckboxSelection("media")}
                  className="text-green-500 focus:ring-2 focus:ring-green-500"
                />
              </label>
            </div>
            <button
              onClick={confirmFilterSelection}
              className={`bg-[#51D7B1] text-white w-[312px] h-[42px] py-2 absolute bottom-5 left-1/2 -translate-x-1/2 ${filterContainerState} font-semibold rounded-lg`}
            >
              Konfirmasi
            </button>
          </div>

          {/* filter star */}
          <div
            className={`group border-2 fixed bottom-0 left-1/2 transition-all duration-700 -translate-x-1/2 w-[360px] z-20 rounded-t-3xl bg-white ${ratingFilterContainerDisplay}`}
          >
            <div className="flex justify-between items-center p-5 border-b-2">
              <h2 className="text-xl font-nunitoBold">
                Filter Berdasarkan Rating
              </h2>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                onClick={(e: any) => {
                  e.preventDefault();
                  setRatingFilterContainerDisplay("h-0");
                  setRatingFilterContainerState("hidden");
                  setActive(false);
                }}
              >
                <path
                  d="M12.9997 11.4687L18.3619 6.10645L19.894 7.63851L14.5317 13.0008L19.894 18.3629L18.3619 19.895L12.9997 14.5328L7.63745 19.895L6.10538 18.3629L11.4676 13.0008L6.10538 7.63851L7.63745 6.10645L12.9997 11.4687Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="mb-4">
              {[5, 4, 3, 2, 1].map((value) => (
                <label
                  key={value}
                  className="flex items-center px-[24px] py-[10px] border-b"
                >
                  <div className="flex items-center">
                    <span className="font-nunito text-[12px] gap-[4px] flex">
                      {renderStars(value)}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    name="ratingFilter"
                    checked={rating === value}
                    onChange={() => handleRatingToggle(value)}
                    className="text-green-500 focus:ring-2 focus:ring-green-500 ml-auto"
                  />
                </label>
              ))}
            </div>
            <button
              onClick={confirmRatingSelection}
              className={`bg-[#51D7B1] text-white w-[312px] h-[42px] py-2 absolute bottom-5 left-1/2 -translate-x-1/2 ${ratingFilterContainerState} font-semibold rounded-lg`}
            >
              Konfirmasi
            </button>
          </div>
          {/* tutup filter star */}

          {/*  filter variasi */}
          <div
            className={`border-2 fixed bottom-0 left-1/2 transition-all duration-700 -translate-x-1/2 w-[360px] rounded-t-3xl z-20 bg-white ${tinggiFilterVariasi}`}
          >
            <div className="flex justify-between px-5 my-5  items-center ">
              <h1 className="font-nunitoBold text-[16px]">Filter Variasi</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                onClick={(e: any) => {
                  e.preventDefault();
                  setTinggiFilterVaraiasi("h-0 opacity-0");
                  setActive(false);
                }}
              >
                <path
                  d="M12.9997 11.4687L18.3619 6.10645L19.894 7.63851L14.5317 13.0008L19.894 18.3629L18.3619 19.895L12.9997 14.5328L7.63745 19.895L6.10538 18.3629L11.4676 13.0008L6.10538 7.63851L7.63745 6.10645L12.9997 11.4687Z"
                  fill="black"
                />
              </svg>
            </div>

            <div>
              {variasiItemsProduct.map((variasi: any, index: number) => {
                return (
                  <>
                    <label className="flex items-center justify-between px-[24px] border-b py-[10px]">
                      <div className="flex gap-2 items-center">
                        <span className="font-nunito text-[12px]">
                          {variasi.name}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={tempSelectedVariant.includes(variasi.id)}
                        onChange={() => handleOptionChange(variasi.id)}
                        className="text-green-500 focus:ring-2 focus:ring-green-500"
                      />
                    </label>
                  </>
                );
              })}
              <button
                onClick={handleConfirmVariasi}
                className="w-full mt-4 px-4 py-2 bg-warnaUtama text-white font-semibold rounded"
              >
                Konfirmasi
              </button>
            </div>
          </div>
          {/* tutup filter variasi */}

          {active ? (
            <div className="fixed top-0 left-0 right-0 bottom-0 z-10 opacity-50 bg-black"></div>
          ) : null}
        </div>
      </LayoutUtama>
    </>
  );
};

export default ModulUlasan;
