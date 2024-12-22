"use client";
import BackNav from "@/app/components/backNavigasi";
import Image from "next/image";
import { useEffect, useState } from "react";
import DescProduct from "../../components/detail-produk/descProduk";
import ProdukSerupa from "../../components/detail-produk/produk-serupa";
import Link from "next/link";
import PopUpLaporanBerhasil from "../../components/modul-ulasan/popUp-laporan-terkirim";
import LayoutUtama from "../../layouts/layout-utama";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// swiper

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import postFollow from "@/api/toko/follow";
import postProductStock from "@/api/product/stockProduct";
import postUlasanProduct from "@/api/ulasan/ulasanProduct";
import postLikeUlasan from "@/api/ulasan/like";
import postNegosiasi from "@/api/negosiasi/nego";
import postProductSerupa from "@/api/product/productSerupa";
import Loading from "@/app/components/loading";
import getDetailProduct from "@/api/detailProduct";
import getVoucher from "@/api/voucher/getVoucher";
import postClaimVoucher from "@/api/voucher/claim";
import getProductEtalase from "@/api/etalase/getProductEtalase";
import ProductCard from "@/app/homepage/list-product/page";
import PopUpKesempatanGagal from "@/app/components/detail-produk/popUpKesempatanGagal";
import postCart from "@/api/cart/addCart";
import laporanUlasan from "@/api/ulasan/laporkan";
import postPaymentSession from "@/api/pembayaran/postPaymentSession";

// tutup swiper

const products = () => {
  // menagmabil data dari pop up

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [idVariasiUkuranProduk, setIdVariasiUkuranProduk] = useState<
    number | null
  >(null);
  const [idVariasiWarnaProduk, setIdVariasiWarnaProduk] = useState<
    number | null
  >(null);
  // const [isUndefined, setIsUndefined] = useState<undefined>()

  const pathname = usePathname();

  const [isActive2kali, setIsActive2kali] = useState<boolean>(false);
  const [isActive1kali, setIsActive1kali] = useState<boolean>(false);
  const [isActiveHabis, setIsActiveHabis] = useState<boolean>(false);

  const [dataStock, setDataStock] = useState<any>();

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page"));

  // console.log(page);

  const router = useRouter();

  const [negosiasiHarga, setNegosiasiHarga] = useState<number | "">("");
  const [loadingNego, setLoadingNego] = useState<boolean>(false);

  console.log(
    "data ajukan nego untuk tombol",
    dataStock?.quantity != null && negosiasiHarga !== ""
  );

  // Fungsi untuk mengatur nilai input
  const handleInputNegoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value ? parseInt(event.target.value) : "";
    setNegosiasiHarga(value);
  };

  async function handleNegosiasi() {
    // console.log(
    //   "data yang diperlukan nego: ",
    //   count,
    //   dataDetailProduct?.merchant.uuid
    // );
    console.log("nego");
    setLoadingNego(true);
    try {
      const response = await postNegosiasi({
        id_produk: dataDetailProduct.id,
        harga_nego: negosiasiHarga,
        stock_id: dataStock.id,
        merchants_uuid: dataDetailProduct?.merchant.uuid,
        quantity: count,
      });

      console.log(response);

      if (
        response.error?.code == 400 &&
        response.error?.message ==
          "Harga Negosiasi Salah, Kesempatan Anda Sisa 2"
      ) {
        console.log("data nego salah, sisa 2 kali");
        setIsActive2kali(true);
        setTinggiNegosiasi("h-0 opacity-0");
      } else if (
        response.error?.code == 400 &&
        response.error?.message ==
          "Harga Negosiasi Salah, Kesempatan Anda Sisa 1"
      ) {
        setIsActive1kali(true);
        setTinggiNegosiasi("h-0 opacity-0");
        console.log("data nego salah, sisa 1 kali");
      } else if (
        response.error?.code == 400 &&
        response.error?.message == "Kesempatan anda sudah habis"
      ) {
        console.log("tidak bisa nego lagi");
        console.log("Kesempatan anda sudah habis");
        setIsActiveHabis(true);
        setTinggiNegosiasi("h-0 opacity-0");
      } else if (
        response.error?.code == 400 &&
        response.error?.message ==
          "Maaf tidak bisa melakukan negosiasi di toko anda sendiri"
      ) {
        console.log("tidak bisa nego di toko sendiri");
        console.log("Tidak bisa dinego");
      } else {
        console.log("selamanya tidak bisa nego lagi");
      }

      if (response.error) {
        // console.log("Error: ", response.error);
        if (response.error?.code == 401) {
          router.push("/authentikasi/login");
        }
      } else {
        if (response.data?.code == 200) {
          console.log("nego = ", response.data);
          setKesempatanBerhasil(true);
          setTinggiNegosiasi("h-0 opacity-0");
        }
      }
    } catch (error: any) {
      console.log("Unexpected error", error);
    }
    setLoadingNego(false);
  }

  console.log("loading nego ", loadingNego);

  const [dataDetailProduct, setDataDetailProduct] = useState<any>();

  // tinggi variant pop up
  const [tinggi, setTinggi] = useState<string>("h-0");
  const [count, setCount] = useState<number>(1);

  const [kesempatanGagal, setKesempatanGagal] = useState<boolean>(false);

  const [tinggiNegosiasi, setTinggiNegosiasi] =
    useState<string>("h-0 opacity-0");
  const [tinggiKeranjang, setTinggiKeranjang] =
    useState<string>("h-0 opacity-0");

  const [tinggiKesempatan, setTinggiKesempatan] =
    useState<string>("h-0 opacity-0");

  const [KesempatanBerhasil, setKesempatanBerhasil] = useState<boolean>(false);

  const [tinggiSyaratDiscount, setTinggiSyaratDiscount] =
    useState<string>("h-0 opacity-0");

  const [berhasiKeranjang, setBerhasilKeranjang] = useState<boolean>(false);

  const [ada, setAda] = useState<boolean>(false);
  const [isLoadingUlasan, setIsLoadingUlasan] = useState<boolean>(false);

  // value untuk laporkan setiap ulasan

  const [berhasilTerkirim, setBerhasilTekirim] = useState<boolean>(false);

  // handle discount

  function handleDiscount(e: any) {
    e.preventDefault();
    // console.log(e);
    setTinggiSyaratDiscount("h-[440px] opacity-100");
    setAda(true);
  }

  function handleKonfirmasiLaporan(id: number) {
    console.log("ini adalah id dari ulasan = ", id);
  }

  const handleBeli = () => {
    // console.log("beli");
    setTinggi(" h-[444px] opacity-100");
    setAda(true);
  };

  function handleCloseSyaratDiscount() {
    setAda(false);
    setTinggiSyaratDiscount("h-0 opacity-0");
  }

  function handleCloseBerhasilKeranjang() {
    setBerhasilKeranjang(false);
    setAda(false);
  }

  // handle keranjang
  function handleKeranjang(e: any) {
    e.preventDefault();

    setAda(true);
    setTinggiKeranjang("h-[444px] opacity-100");
  }

  function handleCloseKeranjang(e: any) {
    e.preventDefault();
    setAda(false);
    setTinggiKeranjang("h-0 opacity-0");
  }

  // handle negosiasi

  const handleAjukanNegosiasi = (e: any) => {
    e.preventDefault();
    setAda(true);
    setTinggiNegosiasi(" h-[470px] opacity-100");
  };

  const handleCloseNegosiasi = () => {
    setTinggiNegosiasi("h-0 opacity-0");
    setAda(false);
  };

  // handle kesempatan

  // const handleKesempatan = (e: any) => {
  //   e.preventDefault();
  //   setTinggiNegosiasi("h-0 opacity-0");
  //   setTinggiKesempatan("h-[219px] opacity-100");

  //   setAda(true);
  // };

  // const handleKesempatanBerhasil = (e: any) => {
  //   e.preventDefault();
  //   setTinggiNegosiasi("h-0 opacity-0");
  //   setKesempatanBerhasil(true);

  //   setAda(false);
  // };

  // tutup function handle kesempatan

  // handle close

  const handleClose2Kali = () => {
    setIsActive2kali(false);
    setAda(false);
  };

  const handleClose1Kali = () => {
    setIsActive1kali(false);
    setAda(false);
  };

  const handleCloseHabis = () => {
    setIsActiveHabis(false);
    setAda(false);
  };

  function handleCloseKesempatanBerhasil() {
    setKesempatanBerhasil(false);
    setAda(false);
  }

  // handle close kesempatan

  const handleClickVariant = () => {
    setTinggi(" h-[444px] opacity-100");
    setAda(true);
  };

  const handleCloseVariant = () => {
    setTinggi("h-0 opacity-0");
    setAda(false);
  };

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

  const [confirmedVariant, setConfirmedVariant] = useState<number[]>([]);

  async function tambahKeranjang(e: any) {
    setBerhasilKeranjang(true);
    setTinggiKeranjang("h-0 opacity-0");

    const response = await postCart({
      merchants_id: dataDetailProduct?.merchants_id,
      products_id: dataDetailProduct?.id,
      quantity: count,
      variation_items_id: confirmedVariant,
    });

    console.log(response);
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
    setConfirmedVariant([
      idVariasiUkuranProduk || 0,
      idVariasiWarnaProduk || 0,
    ]);
  }, [idVariasiUkuranProduk, idVariasiWarnaProduk]);

  const segments = pathname.split("/").filter(Boolean);
  const dynamicSegment = segments.slice(1);

  // console.log(dynamicSegment);
  // console.log(dynamicSegment[0]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(false);
      const dataDetailProduct = await getDetailProduct({
        productSlug: dynamicSegment[0],
      });

      setDataDetailProduct(dataDetailProduct.data);
      setIsLoading(true);
    }

    fetchData();
  }, []);

  // const variant_warana;

  console.log(dataDetailProduct);

  // Inisialisasi variabel untuk menampung hasil
  let variationNames = [];
  let variationUrlImage = [];

  for (
    let index = 0;
    index < dataDetailProduct?.all_variant_product[0].variation_items.length;
    index++
  ) {
    variationNames.push(
      dataDetailProduct?.all_variant_product[0].variation_items[index].name
    );
  }

  let variationSentence = variationNames.join(" - ");

  const dataHargaDiscount = parseInt(
    dataDetailProduct?.first_price_after_discount
  );
  // console.log(dataHargaDiscount, " typenya = ", typeof dataHargaDiscount);

  const formatRupiah = (angka: string | number | null | undefined): string => {
    if (!angka) return ""; // Jika `angka` belum ada, kembalikan string kosong
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(Number(angka));
  };

  const hargaAsli = formatRupiah(dataDetailProduct?.first_price_sell);
  // console.log(hargaAsli, "type = ", typeof hargaAsli);

  const hargaDiscount = formatRupiah(dataHargaDiscount);
  // console.log(
  //   "hargaDicount = ",
  //   typeof hargaDiscount,
  //   " ini = ",
  //   hargaDiscount
  // );

  const harga = Number(dataDetailProduct?.first_price_after_discount);

  // console.log(
  //   typeof hargaDiscount,
  //   typeof hargaAsli,
  //   typeof dataDetailProduct?.first_price_after_discount,
  //   typeof harga
  // );

  // handle follow

  const handleFollow = async (e: any) => {
    e.preventDefault();

    try {
      const response = await postFollow({
        merchant_id: dataDetailProduct?.merchant.id,
      });

      setDataDetailProduct((v: any) => ({
        ...v,
        is_user_follow: !v.is_user_follow,
      }));
    } catch (error: any) {
      // console.log(error.response);
      router.push("/authentikasi/login");
    }
  };

  // tutup follow

  // variant

  // tutup variant

  const [variasiImgUrl, setVariasiImgUrl] = useState<string[]>([]);

  useEffect(() => {
    let tempImageUrls: string[] = [];

    dataDetailProduct?.all_variant_product.forEach((variant: any) => {
      if (variant.show_image == 1) {
        const urls = variant.variation_items.map((foto: any) => foto.image_url);
        tempImageUrls = [...tempImageUrls, ...urls];
      }
    });

    setVariasiImgUrl(tempImageUrls);
  }, [dataDetailProduct]);

  // id variasi color produk

  async function handleVariantColor(e: any) {
    e.preventDefault();

    setIdVariasiWarnaProduk(Number(e.target.id));
  }

  // id variasi ukuran produk

  async function handleVariantUkuran(e: any) {
    e.preventDefault();

    setIdVariasiUkuranProduk(Number(e.target.id));
  }

  console.log(idVariasiUkuranProduk, idVariasiWarnaProduk);

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

  // data ulasan produk

  const [dataUlasanProduk, setDataUlasanProduk] = useState<any>([{}]);
  const [totalUlasan, setTotalUlasan] = useState<any>({});

  useEffect(() => {
    async function fetchData() {
      setIsLoadingUlasan(true);
      const response = await postUlasanProduct({
        product_slug: dynamicSegment[0],
        helpful: null,
        label: null,
        media: null,
        rating: null,
        star: null,
        variation: null,
      });

      setDataUlasanProduk(response.data.ulasan);
      setTotalUlasan(response.data);
      setIsLoadingUlasan(false);
    }

    fetchData();
  }, []);

  // console.log(dataDetailProduct?.merchant.etalase);
  console.log(dataUlasanProduk);
  console.log(totalUlasan);

  const handleLike = async (data: number, index: number) => {
    if (!dataUlasanProduk || !dataUlasanProduk[index]) {
      console.log("Index tidak valid atau data tidak ditemukan");
      return;
    }

    try {
      const response = await postLikeUlasan({
        ulasan_id: data,
      });

      // console.log(response);

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
    }
  };

  function handleLaporkan(id: number) {
    console.log("ini ulasan dengan id = ", id);
    // setAdaLaporan(true);
    console.log("laporkan");
    setDataUlasanActive(id);
    setAda(true);
  }

  function handlePushModulUlasan() {
    router.push(`/modul-ulasan?product=${dynamicSegment[0]}`);
  }

  // product serupa

  const [dataProdukSerupa, setDataProdukSerupa] = useState<any>({});
  const [isLoadingProdukSerupa, setIsLoadingProdukSerupa] =
    useState<boolean>(false);

  console.log("data detail product: ", dataDetailProduct);

  useEffect(() => {
    async function fetchData() {
      setIsLoadingProdukSerupa(true);
      const response = await postProductSerupa({
        brand: dataDetailProduct?.brand,
        page: page,
      });

      setDataProdukSerupa(response.data);
      setIsLoadingProdukSerupa(false);
    }

    fetchData();
  }, []);

  // console.log(dataProdukSerupa?.data_product);

  // tutup product serupa

  // voucher

  const [isLoadingDiscount, setIsLoadingDiscount] = useState<boolean>(false);
  const [dataDiscount, setDataDiscount] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      setIsLoadingDiscount(true);
      const response = await getVoucher({
        merchantId: dataDetailProduct?.merchants_id,
      });

      // console.log(dataDetailProduct?.merchants_id);

      setDataDiscount(response.data);
      setIsLoadingDiscount(false);
    }

    fetchData();
  }, [dataDetailProduct?.merchants_id]);

  function formatTanggal(dateStr: any) {
    const date = new Date(dateStr);

    // Mendapatkan bagian tanggal, bulan, dan tahun
    const day = date.getDate().toString().padStart(2, "0");
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Menggabungkan bagian-bagian tanggal
    return `${day} ${month} ${year}`;
  }

  // console.log(dataDetailProduct?.merchants_id);
  // console.log(isLoadingDiscount);
  // console.log(dataDiscount);

  // handle sdk voucher

  const [dataDiscountActive, setDataDiscountActive] = useState<number>(0);
  const [dataUlasanActive, setDataUlasanActive] = useState<number>(0);

  function handleSDKVoucher(id: any) {
    setDataDiscountActive(id);
    setAda(true);
  }

  const [codeClaimVoucher, setCodeClaimVoucher] = useState<number>(0);

  async function handleKonfirmasiDiscount(discountId: number) {
    setDataDiscountActive(0);
    // console.log("voucher claim");
    setAda(false);

    const response = await postClaimVoucher({ discount_id: discountId });

    if (response?.error?.code == 401) {
      router.push("/authentikasi/login");
    } else if (response?.error?.code == 400) {
      console.log(response);
      console.log("sudah diclaim");
      setCodeClaimVoucher(400);
      // setCodeClaimVoucher(response)
      // setCodeClaimVoucher(response)
    } else {
      console.log("telah diclaim");
      console.log(response);
      setCodeClaimVoucher(200);
      setDataDiscount((v: any) =>
        v.map((item: any, i: number) =>
          item.id === discountId ? { ...item, is_claim: !item.is_claim } : item
        )
      );
    }
    // console.log(response);
  }

  // console.log(dataDiscountActive);

  // tutup handle sdk voucher

  // tutup voucer

  // handle etalase product

  const [isLoadingEtalase, setIsLoadingEtalase] = useState<boolean>(false);
  const [dataProductEtalase, setDataProductEtalase] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      setIsLoadingEtalase(true);
      const response = await getProductEtalase({
        merchantId: dataDetailProduct?.merchants_id,
      });

      // console.log(dataDetailProduct?.merchants_id);

      setDataProductEtalase(response.data);
      setIsLoadingEtalase(false);
    }

    fetchData();
  }, [dataDetailProduct?.merchants_id]);

  console.log(dataProductEtalase);

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
      const response = await laporanUlasan({
        ulasanId: dataUlasanActive,
        message: reportReasonLaporkan,
      });

      console.log(response);
    } catch (err: any) {
      console.log(err);
    }
    // Tambahkan logika untuk mengirim data ke backend di sini
  };

  const [popUpShare, setPopUpShare] = useState<boolean>(false);
  const [popUpCopy, setPopUpCopy] = useState<boolean>(false);

  function handleClose(e: any) {
    e.preventDefault();
    console.log("close");
    setPopUpShare(false);
    setAda(false);
  }

  const pathnameProduct = usePathname();
  const searchParamsProduct = useSearchParams();
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // Membuat URL lengkap dengan pathname dan query params
    const baseUrl = `${window.location.origin}${pathnameProduct}${
      searchParamsProduct.toString() ? `?${searchParams.toString()}` : ""
    }`;
    setCurrentUrl(baseUrl);
  }, [pathnameProduct, searchParamsProduct]);

  function handleTelegram() {
    console.log("instagram");
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        currentUrl
      )}+Ada+diskon+50%25+jadi+Rp7.000%2C+nih.+Cek+di+BelaBeli+sebelum+diskonnya+kehabisan%21`,
      "_blank"
    );
  }
  function handleLinkedIn() {
    console.log("LinkedIn");
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        currentUrl
      )}`,
      "_blank"
    );
  }
  function handleFacebook() {
    console.log("Facebook");
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
      "_blank"
    );
  }

  function handleGmail() {
    window.open(
      `https://mail.google.com/mail/u/0/?to&su=Check+this+out+%E2%80%93+Bagikan+ke+teman+kamu&body=Bagikan+ke+teman+kamu%0${currentUrl}%0A%F0%9F%A4%A9+Ada+diskon+50%25+jadi+${formatRupiah(
        dataDetailProduct?.dataDetailProduct?.first_price_sell
      )},+nih.+Cek+di+BelaBeli+sebelum+diskonnya+kehabisan!&fs=1&tf=cm`,
      "_blank"
    );
  }

  function handleWhatsApp() {
    console.log("WhatsApp");

    window.open(
      `https://api.whatsapp.com/send?text=Coba+cek+ini%2C+deh.+Harganya${formatRupiah(
        dataDetailProduct?.first_price_sell
      )}+aja%21+${currentUrl}`,
      "_blank"
    );
  }

  async function handlePembelianSekarang() {
    console.log("pembelian sekarang");
    // "products_id": 14,
    //     "product_stocks_id": 382,
    //     "quantity": 2,
    //     "price_negosiasi": 2000.00,
    //     "cart_items_id": 6
    const item = [
      {
        products_id: dataStock?.products_id,
        product_stocks_id: dataStock?.id,
        quantity: count,
        price_negosiasi: null,
        cart_items_id: null,
      },
    ];

    try {
      const response = await postPaymentSession({
        carts_id: null,
        merchants_id: dataDetailProduct?.merchants_id,
        items: item,
      });

      console.log("ini di try");

      console.log(response.data);

      console.log(response.error);

      if (response.error) {
        console.log("error beli sekarang ", response.error);
      }

      if (response?.error?.code == 401) {
        router.push("/authentikasi/login");
      }

      if (response?.data?.code == 201) {
        router.push(`/pembayaran?sessionId=${response.data.data.id}`);
      }
    } catch (err: any) {
      console.log(err);
    }

    console.log(
      "data yang diperlukan, merchants_id = ",
      dataDetailProduct?.merchants_id,
      " product_id = ",
      dataStock?.products_id,
      " product_stocks_id = ",
      dataStock?.id,
      "quantity = ",
      dataStock?.quantity,
      " price_negoisasi = ",
      null,
      " cart_item_id = ",
      null,
      "jumlah barang = ",
      count
    );

    console.log("data itemnya = ", item);
  }

  // tutup etalase product

  return (
    <>
      <LayoutUtama>
        <main className="bg-white  ">
          {ada ? (
            <div className="z-10 top-0 left-0 right-0 bottom-0 fixed bg-black opacity-50"></div>
          ) : null}
          <div className=" py-9">
            <BackNav />
            <h1 className="text-center text-xl font-nunitoBold">
              Detail Produk
            </h1>
          </div>
          <div className=" relative">
            {/* Slider */}

            {/* tutup slider */}
            {isLoading ? (
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={5}
                slidesPerView={1}
                loop={true}
                className=" rounded-lg  w-[360px] h-[325px]"
              >
                {dataDetailProduct?.gallery_product.map(
                  (image: any, index: number) => {
                    // console.log(image.gallery_url);
                    if (image.type == "video") {
                      return (
                        <>
                          <SwiperSlide key={index}>
                            <div
                              className="relative w-[360px] h-[312px] overflow-hidden mt-1 rounded-lg mx-auto"
                              onClick={(e) => {
                                const video =
                                  e.currentTarget.querySelector<any>("video");
                                if (video.paused) {
                                  video.play();
                                } else {
                                  video.pause();
                                }
                              }}
                            >
                              <video className="w-full h-full object-cover">
                                <source
                                  src={image.gallery_url}
                                  type="video/mp4"
                                />
                                browser does not support the video tag.
                              </video>
                            </div>
                          </SwiperSlide>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <SwiperSlide key={index}>
                            <div className="relative w-[360px] h-[312px] overflow-hidden mt-1 rounded-lg mx-auto">
                              <img
                                src={image.gallery_url}
                                alt="name product"
                                className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                              />
                            </div>
                          </SwiperSlide>
                        </>
                      );
                    }
                  }
                )}
              </Swiper>
            ) : (
              <div className="w-full flex items-center justify-center">
                <div className=" w-[360px] h-[325px] flex justify-center items-center bg-buttonGrey rounded-lg">
                  <Loading />
                </div>
              </div>
            )}

            <span className="pb-3 absolute flex gap-2 items-center right-5 text-xs font-nunitoLight">
              {isLoading ? (
                dataDetailProduct?.sold_quantity
              ) : (
                <div className="w-3 rounded-lg h-2 bg-buttonGrey"></div>
              )}{" "}
              Terjual
            </span>
          </div>
          {/* Tutup Slider */}

          {/* harga dan star */}

          <div className=" items-center  flex justify-between px-5 mt-8">
            <h1 className="text-sm font-nunitoBold">
              {isLoading ? (
                formatRupiah(
                  parseInt(dataDetailProduct?.first_price_after_discount)
                )
              ) : (
                <div className="w-24 rounded-lg h-3 bg-buttonGrey"></div>
                // <div className="w-5 h-2 bg-buttonGrey"></div>
              )}
            </h1>

            {/* star */}

            <div className="flex gap-2 h-[24px] items-center">
              <div className="rounded-full border-[1.5px] flex items-center gap-2 px-2 py-[2px] h-full  border-[#A9A9A9]">
                <div className="w-[10px] h-[10px]">
                  <Image
                    src="/icon/star-fill.png"
                    alt="hallo"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>

                {isLoading ? (
                  <p className="font-nunitoBold text-xs">
                    {dataDetailProduct?.rating_product.rating}
                  </p>
                ) : (
                  <div className="w-4 rounded-lg h-2 bg-buttonGrey"></div>
                )}

                <div className="inline-block w-[2px] border-[1.5px] h-[16px] rounded-md bg-[#A9A9A9]"></div>
                {isLoading ? (
                  <p className="text-xs  text-[#A9A9A9] font-nunitoBold">
                    {totalUlasan.total_rating}
                  </p>
                ) : (
                  <div className="w-4 rounded-lg h-2 bg-buttonGrey"></div>
                )}
              </div>

              {/* tutup star */}

              {/* Share produk */}

              <div
                onClick={() => {
                  setPopUpShare(true);
                  setAda(true);
                }}
                className=" rounded-md  border-[#a9a9a9]  h-[24px] w-[24px] border-[1.5px] flex justify-center items-center"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.65085 8.92736L4.20148 7.5913C3.77568 8.04635 3.16975 8.33073 2.4974 8.33073C1.20873 8.33073 0.164062 7.28604 0.164062 5.9974C0.164062 4.70873 1.20873 3.66406 2.4974 3.66406C3.16972 3.66406 3.77563 3.94841 4.20142 4.40341L6.65085 3.06739C6.60505 2.88497 6.58073 2.69402 6.58073 2.4974C6.58073 1.20873 7.62542 0.164062 8.91406 0.164062C10.2027 0.164062 11.2474 1.20873 11.2474 2.4974C11.2474 3.78606 10.2027 4.83073 8.91406 4.83073C8.24171 4.83073 7.6358 4.54636 7.20997 4.09133L4.7606 5.42736C4.8064 5.60977 4.83073 5.80075 4.83073 5.9974C4.83073 6.19404 4.80641 6.38496 4.76062 6.56737L7.21003 7.90344C7.6358 7.44844 8.24171 7.16406 8.91406 7.16406C10.2027 7.16406 11.2474 8.20875 11.2474 9.4974C11.2474 10.786 10.2027 11.8307 8.91406 11.8307C7.62542 11.8307 6.58073 10.786 6.58073 9.4974C6.58073 9.30075 6.60505 9.10977 6.65085 8.92736ZM2.4974 7.16406C3.14173 7.16406 3.66406 6.64175 3.66406 5.9974C3.66406 5.35305 3.14173 4.83073 2.4974 4.83073C1.85306 4.83073 1.33073 5.35305 1.33073 5.9974C1.33073 6.64175 1.85306 7.16406 2.4974 7.16406ZM8.91406 3.66406C9.55841 3.66406 10.0807 3.14173 10.0807 2.4974C10.0807 1.85306 9.55841 1.33073 8.91406 1.33073C8.26971 1.33073 7.7474 1.85306 7.7474 2.4974C7.7474 3.14173 8.26971 3.66406 8.91406 3.66406ZM8.91406 10.6641C9.55841 10.6641 10.0807 10.1417 10.0807 9.4974C10.0807 8.85305 9.55841 8.33073 8.91406 8.33073C8.26971 8.33073 7.7474 8.85305 7.7474 9.4974C7.7474 10.1417 8.26971 10.6641 8.91406 10.6641Z"
                    fill="#A9A9A9"
                  />
                </svg>
              </div>
            </div>

            {/* tutip share produk  */}
          </div>
          <div className="w-full items-center  flex gap-2  px-5">
            {isLoading ? (
              <p className="text-[#A9A9A9] text-[10px] font-nunitoLight text-bold line-through">
                {" "}
                {hargaAsli}{" "}
              </p>
            ) : (
              <div className="w-14 rounded-lg h-2 bg-buttonGrey"></div>
            )}

            {isLoading ? (
              <p className="text-[10px] font-nunito text-[#EE443F]">
                {dataDetailProduct?.discount} Hemat
              </p>
            ) : (
              <div className="bg-buttonGrey w-3 h-2 rounded-lg"></div>
            )}
          </div>

          {/* Tutup harga dan star*/}

          {/* name produk */}
          {isLoading ? (
            <h1 className="px-5 mt-2 text-[12px] font-nunitoBold">
              {dataDetailProduct?.name}
            </h1>
          ) : (
            <div className="bg-buttonGrey ml-5 mt-2 w-10 h-2 px-5 rounded-lg"></div>
          )}

          {/* tutup name produk */}

          {/* varian tersedia */}

          <div className="px-5 w-full my-4 py-3 flex justify-between">
            <p className="text-[10px] ">Varian tersedia</p>
            <div onClick={handleClickVariant} className="">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.35466 4.27609C6.13903 4.44859 6.10407 4.76324 6.27658 4.97887L8.69337 7.99986L6.27658 11.0208C6.10407 11.2365 6.13903 11.5511 6.35466 11.7236C6.57029 11.8961 6.88494 11.8612 7.05745 11.6455L9.72411 8.3122C9.8702 8.12959 9.8702 7.87012 9.72411 7.68751L7.05745 4.35417C6.88494 4.13854 6.57029 4.10358 6.35466 4.27609Z"
                  fill="#0F0F0F"
                />
              </svg>
            </div>
          </div>

          {/* tutup varian tersedia */}

          {/* foto variant */}

          {isLoading ? (
            dataDetailProduct?.all_variant_product.map(
              (variant: any, index: number) => {
                // console.log(variant.show_image);
                if (variant.show_image == 1) {
                  return (
                    <div className="w-full  px-5 flex gap-[10px]">
                      {variant.variation_items.map(
                        (foto: any, index: number) => {
                          // console.log(foto.image_url);

                          variationUrlImage[index] = foto.image_url;

                          // console.log(variationUrlImage);

                          return (
                            <>
                              <div
                                key={index}
                                className="w-[80px] h-[80px] rounded-md  overflow-hidden"
                              >
                                <Image
                                  src={`${foto.image_url}`}
                                  alt={foto.name}
                                  width={300}
                                  height={300}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </>
                          );
                        }
                      )}
                    </div>
                  );
                }
              }
            )
          ) : (
            <div className="w-full  px-5 flex gap-[10px]">
              <div className="w-[80px] h-[80px] rounded-md  overflow-hidden flex justify-center items-center">
                <Loading />
              </div>
              <div className="w-[80px] h-[80px] rounded-md  overflow-hidden flex justify-center items-center">
                <Loading />
              </div>
              <div className="w-[80px] h-[80px] rounded-md  overflow-hidden flex justify-center items-center">
                <Loading />
              </div>
            </div>
          )}

          {/* tutup foto variant */}

          {/* discount */}

          {isLoadingDiscount ? (
            <div className="mt-[21px] w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
              <div className="pl-5 flex gap-2 w-[1000px]">
                <div className="w-[212px] h-[64px] rounded-lg bg-buttonGrey py-2 px-2"></div>
                <div className="w-[212px] h-[64px] rounded-lg bg-buttonGrey py-2 px-2"></div>
              </div>
            </div>
          ) : (
            <div className="mt-[21px] w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
              <div className="pl-5 flex gap-2 w-[1000px]">
                {dataDiscount !== null
                  ? dataDiscount.map((discount: any, index: number) => {
                      const isActive = dataDiscountActive === discount.id;
                      // console.log(discount);

                      return (
                        <div key={discount.id || index}>
                          <div
                            className={`cursor-pointer w-[212px] h-[64px] border rounded-lg bg-gradient-to-r from-[#83E69B] to-[#00BAE1] py-2 px-2 ${
                              isActive ? "border-none" : "border-none"
                            }`}
                            onClick={() => handleSDKVoucher(discount.id)}
                          >
                            <div className="flex w-full justify-between">
                              <div>
                                <h1 className="text-[14px] text-white font-nunitoBold">
                                  {formatRupiah(
                                    Number(discount?.cashback_value)
                                  )}
                                </h1>
                                <p className="text-[8px] font-nunitoLight text-white">
                                  Belanja Min{" "}
                                  {formatRupiah(
                                    Number(discount?.minimum_purchase)
                                  )}
                                </p>
                                <p className="text-[8px] font-nunitoLight text-white">
                                  Berlaku hingga{" "}
                                  {formatTanggal(discount?.expiry_date)}
                                </p>
                              </div>
                              <div className="flex items-end gap-2 flex-col">
                                {discount?.is_claim ? (
                                  <button
                                    onClick={() =>
                                      handleSDKVoucher(discount.id)
                                    }
                                    className="w-[54px] h-[19px] rounded-md text-warnaShadeBase text-[10px] flex justify-center items-center bg-putihBase"
                                  >
                                    Digunakan
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      handleSDKVoucher(discount.id)
                                    }
                                    className="w-[54px] h-[19px] rounded-md text-warnaShadeBase text-[10px] flex justify-center items-center bg-putihBase"
                                  >
                                    Gunakan
                                  </button>
                                )}
                                <h1 className="text-white text-[12px] font-nunitoLight">
                                  S&K
                                </h1>
                              </div>
                            </div>
                          </div>

                          {isActive && (
                            <div className="w-[360px] left-1/2 -translate-x-1/2 fixed bottom-[50px] h-[400px] z-30 bg-white p-5 transition-all rounded-lg duration-1000 overflow-hidden">
                              <div className="flex justify-between items-center">
                                <h1 className="text-[16px] font-nunitoBold">
                                  Syarat dan Ketentuan
                                </h1>

                                {/* Close button */}
                                <svg
                                  onClick={() => {
                                    setDataDiscountActive(0);
                                    setAda(false);
                                  }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  className="cursor-pointer"
                                >
                                  <path
                                    d="M6.99976 5.46871L12.362 0.106445L13.8941 1.63851L8.53181 7.00076L13.8941 12.3629L12.362 13.895L6.99976 8.53281L1.63754 13.895L0.105469 12.3629L5.46771 7.00076L0.105469 1.63851L1.63754 0.106445L6.99976 5.46871Z"
                                    fill="black"
                                  />
                                </svg>
                              </div>

                              {/* Add other terms here */}
                              <ul className="w-[312px] h-[265px] overflow-y-auto border rounded-md p-[12px] mt-[12px]">
                                <h1 className="text-[12px] font-nunito">
                                  Syarat dan Ketentuan Penggunaan Voucher
                                </h1>
                                <li className="text-[12px] font-nunito">
                                  Masa Berlaku : Voucher berlaku dari <br />{" "}
                                  {formatTanggal(discount?.start_date)}
                                  hingga {formatTanggal(
                                    discount?.expiry_date
                                  )}. <br />
                                  Tidak dapat <br />
                                  digunakan setelah masa berlaku habis. <br />
                                </li>
                                <li className="text-[12px] font-nunito">
                                  Minimal Pembelian : Berlaku untuk transaksi{" "}
                                  <br />
                                  minimal{" "}
                                  {formatRupiah(
                                    discount?.minimum_purchase
                                  )}{" "}
                                  (tidak termasuk ongkir dan <br />
                                  pajak).
                                </li>
                                <li className="text-[12px] font-nunito">
                                  Produk yang Berlaku : Voucher berlaku <br />{" "}
                                  untuk semua produk.
                                </li>
                                <li className="text-[12px] font-nunito">
                                  Penggunaan : {discount?.usage_limit} voucher
                                  per transaksi, tidak <br />
                                  bisa digabung dengan promosi lain, Masukkan
                                  kode <br />
                                  voucher saat checkout
                                </li>
                                <li className="text-[12px] font-nunito">
                                  Nilai Voucher :{" "}
                                  {formatRupiah(discount?.cashback_value)} .
                                  Tidak bisa ditukar <br />
                                  dengan uang tunai.
                                </li>
                                <li className="text-[12px] font-nunito">
                                  Pembatalan : Jika transaksi dibatalkan atau
                                  ada <br />
                                  pengembalian, nilai voucher tidak akan <br />
                                  dikembalikan.
                                </li>
                                <li className="text-[12px] font-nunito">
                                  Perubahan : Kami berhak mengubah syarat dan{" "}
                                  <br />
                                  ketentuan tanpa pemberitahuan.
                                </li>
                              </ul>

                              <button
                                onClick={() =>
                                  handleKonfirmasiDiscount(discount?.id)
                                }
                                className="mt-[30px] w-[312px] h-[42px] rounded-md bg-[#51D7B1] flex justify-center items-center text-[#fff]"
                              >
                                Oke
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          )}

          {/* ajukan negosiasi */}
          <div className="mt-[20px] border-y-[6px] border-[#f1f1f1] h-[84px] w-full flex justify-around items-center px-5 py-[10px]">
            <h1 className=" font-nunitoBold text-[12px]">
              Ingin Ajukan Negosiasi?
            </h1>
            <button
              onClick={handleAjukanNegosiasi}
              className="font-nunitoBold  bg-[#51D7B1] rounded-md text-[12px] w-[150px] h-[24px] flex items-center justify-center  text-[#fff]"
            >
              Ajukan
            </button>
          </div>
          {/* tutup negosiasi */}

          {/* deskripsi produk */}

          <DescProduct
            deskripsi={dataDetailProduct?.description}
            gaya={dataDetailProduct?.gaya}
            brand={dataDetailProduct?.brand}
            keamanan={dataDetailProduct?.keamanan_produk}
            jenis_barang={dataDetailProduct?.jenis_barang}
            variasi_color={variationSentence}
            informasi_penting={dataDetailProduct?.informasi_penting}
            load={isLoadingProdukSerupa}
            dataEtalase={dataDetailProduct?.merchant.etalase}
            PanduanUkuran={dataDetailProduct?.panduan_ukuran_img}
            beratProduct={dataDetailProduct?.weight}
          />
        </main>

        {/* variant pop up */}
        <div
          className={`w-full sm:w-[400px] z-30 fixed bottom-[50px] border rounded-md  ${tinggi} bg-[#fff] transition-all duration-1000 overflow-hiden`}
        >
          <div className="px-5 border-b-2  w-full h-[288px]">
            <div className="flex w-full h-10  items-center justify-between ">
              <h1 className="font-nunitoBold text-[16px]">Varian Tesedia</h1>

              <div className="" onClick={handleCloseVariant}>
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
                                  } px-2 h-[30px] text-[16px] border-2  rounded flex justify-center items-center`}
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
            {dataStock?.price_sell != null
              ? formatRupiah(Number(dataStock?.price_sell))
              : "0"}
          </h1>

          {/* tutup harga kuantitas */}

          {/* button beli sekarang*/}
          <div className="w-full flex justify-center mt-[20px]">
            <button
              onClick={handlePembelianSekarang}
              className="w-[312px] bg-[#51D7B1] h-[48px] rounded-md text-center font-nunitoBold text-[#fff] "
            >
              Beli Sekarang
            </button>
          </div>

          {/* tutup beli sekarang */}
        </div>

        {/* tutup variant pop up */}

        {/* Penilaian dan ulasan */}
        <div className="px-5 mt-[10px] border-y-[6px] border-[#f1f1f1] ">
          <div className="flex justify-between items-center mt-3">
            <h1 className="text-[12px] font-nunitoBold">Penilaian & Ulasan</h1>

            {/*link lihat semua ulasan */}
            <div className="flex gap-1 items-center ">
              <button
                onClick={handlePushModulUlasan}
                className="text-[10px] text-[#00BAE1] font-nunitoBold"
              >
                Lihat Semua
              </button>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.35466 4.27609C6.13903 4.44859 6.10407 4.76324 6.27658 4.97887L8.69337 7.99986L6.27658 11.0208C6.10407 11.2365 6.13903 11.5511 6.35466 11.7236C6.57029 11.8961 6.88494 11.8612 7.05745 11.6455L9.72411 8.3122C9.8702 8.12959 9.8702 7.87012 9.72411 7.68751L7.05745 4.35417C6.88494 4.13854 6.57029 4.10358 6.35466 4.27609Z"
                  fill="#00BAE1"
                />
              </svg>
            </div>
          </div>

          {/* tutup link lihat semua ulasan */}

          {/*jumlah star, rate, ulasan */}

          {isLoadingUlasan ? (
            <div className="mt-[4px] rounded-lg w-full h-2 bg-buttonGrey"></div>
          ) : (
            <div className="mt-[4px]  gap-[10px] flex items-center w-full">
              <div className="flex gap-2 items-center ">
                <div className="w-[12px] h-[10px]">
                  <Image
                    src="/icon/star-fill.png"
                    alt="hallo"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="font-nunito font-bold text-[10px]">
                  {Math.round(totalUlasan.rata_ulasan * 10) / 10}
                </h1>
              </div>

              <p className="text-[#949494] text-[10px]">
                {totalUlasan.total_rating} Rating
              </p>

              <p className="text-[#949494] text-[10px]">
                {totalUlasan?.total_ulasan} Ulasan
              </p>
            </div>
          )}

          {/* tutup jumalah star, rate, ulasan */}
          {isLoadingUlasan ? (
            <div className="flex flex-col gap-3 py-3">
              <div className="w-full rounded-lg h-[60px] bg-buttonGrey"></div>
              <div className="w-full h-[60px] rounded-lg bg-buttonGrey"></div>
            </div>
          ) : (
            dataUlasanProduk?.map((ulasan: any, index: any) => {
              const isActiveUlasan = dataUlasanActive === ulasan.id;
              // console.log(ulasan?.user?.photo);

              // console.log(ulasan.media_ulasan);

              return (
                <>
                  <div className="mt-[8px] mb-[8px]">
                    <div className="p-2 rounded-md flex flex-col gap-[4px] bg-[#FAFAFA] w-[full]">
                      <div className="flex items-center justify-between">
                        {/* photo, name, star rate */}
                        <div className=" flex items-center gap-[5px]">
                          <div className="rounded-full overflow-hidden w-[18px] h-[18px]">
                            <img
                              src={`${process.env.NEXT_PUBLIC_BASE_API_URL_2}/storage/${ulasan?.user?.photo}`}
                              alt="hallo"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h1 className="text-[12px] font-nunitoBold">
                            {ulasan?.user?.name}
                          </h1>

                          <span className="text-yellow-500 mb-1">
                            {"★".repeat(ulasan.star)}
                            {"☆".repeat(5 - ulasan.star)}
                          </span>
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
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_BASE_API_URL_2}/storage/${data.media_url}`}
                                    alt="hallo"
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
                                  checked={selectedReasonLaporkan === reason}
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
            })
          )}
        </div>

        {/* tutup penialaian dan ulasan  */}

        {/* toko */}

        <div className="w-full h-[82px] border-b-[6px] border-[#f1f1f1] flex justify-between items-center px-5">
          <Link
            href={`/toko/${dataDetailProduct?.merchant.name}?merchantId=${dataDetailProduct?.merchant.id}&merchantSlug=${dataDetailProduct?.merchant.slug}&page=${page}`}
            className="flex  gap-[10px]"
          >
            {isLoading ? (
              <div className="rounded-md overflow-hidden  w-[42px] h-[42px] bg-[#f1f1f1]">
                <Image
                  className="w-full h-full object-cover"
                  // src={dataDetailProduct?.merchant?.logo}
                  src={""}
                  width={100}
                  height={100}
                  alt="Picture of the author"
                />
              </div>
            ) : (
              <div className="rounded-md overflow-hidden flex justify-center items-center  w-[42px] h-[42px] bg-[#f1f1f1]">
                <Loading />
              </div>
            )}
            <div className="flex  justify-between flex-col">
              <div className=" flex gap-[10px]">
                {dataDetailProduct?.super_seller ? (
                  <div className="w-[25px] h-[19px] bg-[#09CBCA] flex justify-center items-center rounded-md border">
                    <p className="text-[10px] text-[#fff] font-nunitoBold">
                      SS
                    </p>
                  </div>
                ) : null}
                {isLoading ? (
                  <>
                    <h1 className="text-[12px] font-nunitoBold">
                      {dataDetailProduct?.merchant.name}
                    </h1>{" "}
                  </>
                ) : (
                  <div className="w-8 h-2 bg-buttonGrey rounded-lg"></div>
                )}
              </div>
              <div className="flex items-center gap-[5px]">
                <p className="text-[12px] font-nunito">
                  {dataDetailProduct?.merchant.status_active}
                </p>
              </div>
            </div>
          </Link>

          {dataDetailProduct?.is_user_follow ? (
            <div
              onClick={handleFollow}
              className="w-[40px] cursor-pointer h-[20px] bg-[#f1f1f1] justify-center flex items-center rounded-md text-[10px] font-nunitoBold text-[#51D7B1]"
            >
              Diikuti
            </div>
          ) : (
            <div
              onClick={handleFollow}
              className="w-[40px] cursor-pointer h-[20px] bg-gradient-to-r from-[#83E69B] to-[#00BAE1] justify-center flex items-center rounded-md text-[10px] font-nunitoBold text-white"
            >
              Ikuti
            </div>
          )}
        </div>

        {/* akhir toko */}

        {/* etalase toko */}

        {isLoadingEtalase ? (
          <div className="w-full flex ietms-center justify-center h-[200px]">
            <Loading />
          </div>
        ) : (
          <div className="border-b-[6px] border-[#f1f1f1] p-5">
            <div className="flex justify-between items-center">
              <h1 className="text-[12px] font-nunitoBold">Etalase toko</h1>

              {/*link lihat semua ulasan */}
              <div className="flex gap-1 items-center ">
                <h1 className="text-[10px] text-[#00BAE1] font-nunitoBold">
                  Lihat Semua
                </h1>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.35466 4.27609C6.13903 4.44859 6.10407 4.76324 6.27658 4.97887L8.69337 7.99986L6.27658 11.0208C6.10407 11.2365 6.13903 11.5511 6.35466 11.7236C6.57029 11.8961 6.88494 11.8612 7.05745 11.6455L9.72411 8.3122C9.8702 8.12959 9.8702 7.87012 9.72411 7.68751L7.05745 4.35417C6.88494 4.13854 6.57029 4.10358 6.35466 4.27609Z"
                    fill="#00BAE1"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-[21px] w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
              <div className="py-2 flex gap-2 w-[1000px]">
                {/* <div className="mt-[10px] w-full border ">
              <div className="flex gap-x-2 gap-y-4 py-4 items-center"> */}
                {dataProductEtalase?.map((product: any, index: any) => {
                  // console.log(produk);
                  return (
                    <ProductCard
                      key={index}
                      title={product.name}
                      imageUrl={product.image_product[0]?.gallery_url}
                      originalPrice={Number(
                        product.first_price_sell
                      ).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                      discountLabel={product.discount}
                      rating={product.rating_product.rating}
                      location={`${product.merchant.city}, ${product.merchant.country}`}
                      discountedPrice={Number(
                        product.first_price_after_discount
                      ).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                      soldCount={product.sold_quantity}
                      linkHref={`/product/${product.slug}`}
                      page={page}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* tutup etalase toko */}

        {/* produk serupa */}

        {isLoadingProdukSerupa ? (
          <div className="w-full flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <ProdukSerupa
            dataProduk={dataProdukSerupa?.data_product}
            dataPage={page}
          />
        )}

        {/* tutup produk serupa */}

        {/* navbar belanja keranjang */}
        <div className="fixed bottom-0 h-[50px] bg-white w-full sm:w-[400px] flex  justify-between items-center px-5 z-40">
          <Link href={"/transaksi/keranjang"} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M4.00436 6.91686L0.761719 3.67422L2.17593 2.26001L5.41857 5.50265H20.6603C21.2126 5.50265 21.6603 5.95037 21.6603 6.50265C21.6603 6.59997 21.6461 6.69678 21.6182 6.79L19.2182 14.79C19.0913 15.213 18.7019 15.5027 18.2603 15.5027H6.00436V17.5027H17.0044V19.5027H5.00436C4.45207 19.5027 4.00436 19.0549 4.00436 18.5027V6.91686ZM6.00436 7.50265V13.5027H17.5163L19.3163 7.50265H6.00436ZM5.50436 23.5027C4.67593 23.5027 4.00436 22.8311 4.00436 22.0027C4.00436 21.1742 4.67593 20.5027 5.50436 20.5027C6.33279 20.5027 7.00436 21.1742 7.00436 22.0027C7.00436 22.8311 6.33279 23.5027 5.50436 23.5027ZM17.5044 23.5027C16.6759 23.5027 16.0044 22.8311 16.0044 22.0027C16.0044 21.1742 16.6759 20.5027 17.5044 20.5027C18.3328 20.5027 19.0044 21.1742 19.0044 22.0027C19.0044 22.8311 18.3328 23.5027 17.5044 23.5027Z"
                fill="#51D7B1"
              />
            </svg>
          </Link>
          <div className="flex gap-2 ">
            <div
              onClick={handleKeranjang}
              className="w-[141px] rounded-lg h-[26px] bg-[#C5F2E5] border-[#09CBCA] border text-center flex justify-center items-center cursor-pointer text-[#09CBCA] text-[12px]"
            >
              Masukan Keranjang
            </div>

            <button
              onClick={handleBeli}
              className="w-[105px] h-[26px] bg-[#51D7B1] rounded-md"
            >
              <p className="text-white font-nunito text-[12px] text-center">
                Beli Sekarang
              </p>
            </button>
          </div>
        </div>
        {/* tutup navbar belanja keranjang */}

        {/* negosiasi pop up */}
        <div
          className={`w-full sm:w-[400px] z-30 fixed bottom-[50px] border rounded-md  ${tinggiNegosiasi} bg-[#fff] transition-all duration-1000 overflow-hiden`}
        >
          <div className="px-5 border-b-2 pb-[10px]  w-full ">
            <div className="flex w-full h-10  items-center justify-between ">
              <h1 className="font-nunitoBold text-[16px]">Varian Tesedia</h1>

              <div className="" onClick={handleCloseNegosiasi}>
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

            <div className=" h-[80px] flex gap-3 mt-[6px]">
              {dataDetailProduct?.all_variant_product.map(
                (url: any, index: number) => {
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
              )}{" "}
            </div>

            {/* tutup variant gambar */}

            {/* variant Ukuran */}

            <div className="w-full mt-5">
              <p className="text-[12px] font-nunito">Ukuran</p>
            </div>

            <div className="w-full gap-2 flex mt-5  items-center">
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
                                  className={` ${
                                    idVariasiUkuranProduk ==
                                    size.variation_items_id
                                      ? "border-[#51d7b1] bg-[#51d7b1] text-white"
                                      : "border-[#51d7b1] text-black"
                                  } px-2 h-[30px] text-[16px] border-2 rounded flex justify-center items-center`}
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

            {/* tutup variant ukuran */}

            <div className=" mt-[10px]">
              <p className="font-nunitoBold text-[12px] pb-[16px]">
                Stok : {dataStock?.quantity == null ? 0 : dataStock.quantity}
              </p>
            </div>

            <div className="flex justify-between ">
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
          </div>

          {/* masukan harga nego */}

          <div className="w-full px-5 py-2 ">
            <label className="text-[12px] font-nunito">
              Masukan Harga Negosiasi
            </label>
            <div className="border w-full mt-[10px]  h-[34px] rounded-md ">
              <input
                type="number"
                className="input-negosiasi focus:border-none px-3 py-2 border rounded-md  w-full h-[34px]"
                placeholder="Masukan harga negosiasi"
                value={negosiasiHarga}
                onChange={handleInputNegoChange}
              />
            </div>
          </div>

          {/* tutup masukan harga nego */}

          {/* button beli sekarang*/}
          <div className="w-full flex justify-center ">
            {dataStock?.quantity != null && negosiasiHarga !== "" ? (
              loadingNego ? (
                <div className="w-full mx-4   bg-[#51D7B1] h-[48px] rounded-md text-center flex justify-center items-center font-nunitoBold text-[#fff]">
                  <Loading />
                </div>
              ) : (
                <button
                  onClick={handleNegosiasi}
                  className={`w-full mx-4  cursor-pointer bg-[#51D7B1] h-[48px] rounded-md text-center flex justify-center items-center font-nunitoBold text-[#fff]`}
                >
                  Ajukan
                </button>
              )
            ) : (
              <button
                className={`w-full mx-4  bg-[#9f9f9f] h-[48px] rounded-md text-center flex justify-center items-center font-nunitoBold text-[#000]`}
              >
                Ajukan
              </button>
            )}
          </div>

          {/* tutup beli sekarang */}
        </div>

        {/* tutup negosiasi */}

        {/* keranjang pop up */}
        <div
          className={`w-full sm:w-[400px] z-30 fixed bottom-[50px] border rounded-md  ${tinggiKeranjang} bg-[#fff] transition-all duration-1000 overflow-hiden`}
        >
          <div className="px-5 border-b-2  w-full h-[288px]">
            <div className="flex w-full h-10  items-center justify-between ">
              <h1 className="font-nunitoBold text-[16px]">Varian Tesedia</h1>

              <div className="" onClick={handleCloseKeranjang}>
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
                                  } px-2 h-[30px] text-[16px] border-2  rounded flex justify-center items-center`}
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
            {dataStock?.price_sell != null
              ? formatRupiah(Number(dataStock?.price_sell))
              : "0"}
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

        {/* tutup keranjang pop up */}

        {/* pop up kesempatan */}
        {kesempatanGagal && (
          <div
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg h-[279px] w-[310px] bg-white z-30 flex flex-col items-center justify-center gap-2 px-[10px] overflow-hidden`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="absolute right-3 top-3"
              onClick={() => {
                setKesempatanGagal(false);
                setAda(false);
              }}
            >
              <path
                d="M6.99967 5.46871L12.3619 0.106445L13.894 1.63851L8.53172 7.00076L13.894 12.3629L12.3619 13.895L6.99967 8.53281L1.63745 13.895L0.105377 12.3629L5.46762 7.00076L0.105377 1.63851L1.63745 0.106445L6.99967 5.46871Z"
                fill="black"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="85"
              height="84"
              viewBox="0 0 85 84"
              fill="none"
            >
              <path
                d="M42.5 83.6667C19.4881 83.6667 0.833344 65.0117 0.833344 42C0.833344 18.9882 19.4881 0.333374 42.5 0.333374C65.5117 0.333374 84.1667 18.9882 84.1667 42C84.1667 65.0117 65.5117 83.6667 42.5 83.6667ZM42.5 36.1075L30.7149 24.3224L24.8223 30.2149L36.6075 42L24.8223 53.785L30.7149 59.6775L42.5 47.8925L54.285 59.6775L60.1775 53.785L48.3925 42L60.1775 30.2149L54.285 24.3224L42.5 36.1075Z"
                fill="#EE443F"
              />
            </svg>
            <h1 className="font-nunitoBold text-[20px]">Telah Salah</h1>
            <p className="font-nunito text-[12px] text-center">
              Harga Negoisasi Salah, Kesempatan Anda Telah{" "}
              <span className="text-bold">Habis</span>
            </p>
          </div>
        )}

        {/* tutup pop up kesempatan */}

        {KesempatanBerhasil && (
          <div
            className={`w-[310px] border rounded-md  h-[279px] -translate-y-1/2 fixed top-1/2 left-1/2 -translate-x-1/2 bg-white z-40 flex flex-col justify-center gap-2 items-center px-5`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              className="absolute right-5 top-5"
              onClick={handleCloseKesempatanBerhasil}
            >
              <path
                d="M12.9997 11.4687L18.362 6.10645L19.894 7.63851L14.5317 13.0008L19.894 18.3629L18.362 19.895L12.9997 14.5328L7.63746 19.895L6.10538 18.3629L11.4676 13.0008L6.10538 7.63851L7.63746 6.10645L12.9997 11.4687Z"
                fill="black"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="101"
              height="100"
              viewBox="0 0 101 100"
              fill="none"
            >
              <path
                d="M50.4997 91.6668C27.4878 91.6668 8.83301 73.0118 8.83301 50.0002C8.83301 26.9883 27.4878 8.3335 50.4997 8.3335C73.5113 8.3335 92.1663 26.9883 92.1663 50.0002C92.1663 73.0118 73.5113 91.6668 50.4997 91.6668ZM46.3438 66.6668L75.8068 37.204L69.9143 31.3115L46.3438 54.8818L34.5589 43.0964L28.6663 48.9893L46.3438 66.6668Z"
                fill="url(#paint0_linear_4359_21056)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_4359_21056"
                  x1="8.83301"
                  y1="50.0002"
                  x2="92.1663"
                  y2="50.0002"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#83E69B" />
                  <stop offset="1" stopColor="#00BAE1" />
                </linearGradient>
              </defs>
            </svg>

            <h1 className="text-[16px] font-nunitoBold text-center">Selamat</h1>
            <p className="text-[12px] font-nunito text-center">
              Harga Negosiasi Anda Tepat, Silakan Lanjutkan Chat Ke Seller Untuk
              Proses Selanjutnya.
            </p>
            <button
              onClick={() => {
                router.push("/pesan");
              }}
              className="flex justify-center items-center text-[#fff] bg-[#51D7B1] rounded-md font-nunito w-[270px] h-[48px]"
            >
              Lanjut Chat
            </button>
          </div>
        )}

        {/* syarat discount */}

        <div
          className={`w-[360px] left-1/2 -translate-x-1/2 fixed bottom-[50px] ${tinggiSyaratDiscount} z-30 bg-white p-5 transition-all duration-1000 overflow-hidden`}
        >
          <div className="flex justify-between  items-center">
            <h1 className="text-[16px] font-nunitoBold">
              Syarat dan Ketentuan
            </h1>

            {/* close syarat discount */}
            <svg
              onClick={handleCloseSyaratDiscount}
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M6.99976 5.46871L12.362 0.106445L13.8941 1.63851L8.53181 7.00076L13.8941 12.3629L12.362 13.895L6.99976 8.53281L1.63754 13.895L0.105469 12.3629L5.46771 7.00076L0.105469 1.63851L1.63754 0.106445L6.99976 5.46871Z"
                fill="black"
              />
            </svg>
            {/* tutup close syarat discount */}
          </div>

          <ul className="w-[312px] h-[265px] overflow-y-auto border rounded-md p-[12px] mt-[12px]">
            <h1 className="text-[12px] font-nunito">
              Syarat dan Ketentuan Penggunaan Voucher
            </h1>
            <li className="text-[12px] font-nunito">
              Masa Berlaku : Voucher berlaku dari 24 Oktober 2024 hingga 30
              Oktober 2024. Tidak dapat digunakan setelah masa berlaku habis.
            </li>
            <li className="text-[12px] font-nunito">
              Minimal Pembelian : Berlaku untuk transaksi minimal Rp200.000
              (tidak termasuk ongkir dan pajak).
            </li>
            <li className="text-[12px] font-nunito">
              Produk yang Berlaku : Voucher berlaku untuk semua produk kecuali
              Kategori Wanita.
            </li>
            <li className="text-[12px] font-nunito">
              Penggunaan : Satu voucher per transaksi, tidak bisa digabung
              dengan promosi lain, Masukkan kode voucher saat checkout
            </li>
            <li className="text-[12px] font-nunito">
              Nilai Voucher : 20.000 Rupiah . Tidak bisa ditukar dengan uang
              tunai.
            </li>
            <li className="text-[12px] font-nunito">
              Pembatalan : Jika transaksi dibatalkan atau ada pengembalian,
              nilai voucher tidak akan dikembalikan.
            </li>
            <li className="text-[12px] font-nunito">
              Perubahan : Kami berhak mengubah syarat dan ketentuan tanpa
              pemberitahuan.
            </li>
          </ul>

          <button className="mt-[30px] w-[312px] h-[42px] rounded-md bg-[#51D7B1] flex justify-center items-center text-[#fff]">
            Oke
          </button>
        </div>

        {/* tutup syarat discount */}

        {/* pop up berhasil keranjang */}
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
              onClick={handleCloseBerhasilKeranjang}
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

        {/*Pop up Laporkan*/}

        {/* akhir pop up Laporkan */}

        {berhasilTerkirim && (
          <div
            onClick={() => {
              setBerhasilTekirim(false);
            }}
          >
            <PopUpLaporanBerhasil />
          </div>
        )}

        <PopUpKesempatanGagal
          isActive={isActive2kali}
          handleClose={handleClose2Kali}
          message="Negoisasi gagal, Kesempatan anda masih 2 kali"
        />

        <PopUpKesempatanGagal
          isActive={isActive1kali}
          handleClose={handleClose1Kali}
          message="Negoisasi gagal, Kesempatan anda masih 1 kali"
        />

        <PopUpKesempatanGagal
          isActive={isActiveHabis}
          handleClose={handleCloseHabis}
          message="Negoisasi gagal, Kesempatan Habis"
        />

        {/* pop up share */}

        {popUpShare && (
          <>
            {popUpCopy && (
              <div className="w-[360px] h-[36px] text-white font-nunitoBold flex justify-center items-center z-[100] bg-black rounded-lg opacity-55 text-[12px] fixed top-10 left-1/2 -translate-x-1/2 h-[148px]">
                url tercopy
              </div>
            )}
            <div className="w-[360px] z-50 border bg-white rounded-t-3xl fixed bottom-0 left-1/2 -translate-x-1/2 h-[148px]">
              {/* handle close */}
              <div className="w-full h-1/4 px-5 flex justify-between items-center border-b">
                <h1 className="font-nunitoBold text-[12px]">Bagikan</h1>

                <div onClick={handleClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                  >
                    <path
                      d="M12.9997 11.4687L18.3619 6.10645L19.894 7.63851L14.5317 13.0008L19.894 18.3629L18.3619 19.895L12.9997 14.5328L7.63745 19.895L6.10538 18.3629L11.4676 13.0008L6.10538 7.63851L7.63745 6.10645L12.9997 11.4687Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
              <div className="h-3/4 w-full justify-center gap-5 border flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  className="cursor-pointer"
                  onClick={handleTelegram}
                >
                  <path
                    d="M14 26.25C20.7655 26.25 26.25 20.7655 26.25 14C26.25 7.23451 20.7655 1.75 14 1.75C7.23451 1.75 1.75 7.23451 1.75 14C1.75 20.7655 7.23451 26.25 14 26.25Z"
                    fill="#37BBFE"
                  />
                  <path
                    d="M20.1133 8.9327C20.2223 8.2279 19.5522 7.67161 18.9255 7.94675L6.44422 13.4267C5.99482 13.624 6.0277 14.3048 6.49378 14.4532L9.06771 15.2729C9.55902 15.4293 10.0909 15.3484 10.5199 15.052L16.3231 11.0428C16.4981 10.9218 16.6889 11.1707 16.5393 11.3248L12.3621 15.6315C11.9569 16.0493 12.0373 16.7573 12.5247 17.0629L17.2016 19.9958C17.7262 20.3247 18.401 19.9943 18.4991 19.3603L20.1133 8.9327Z"
                    fill="white"
                  />
                </svg>

                <svg
                  onClick={handleLinkedIn}
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    d="M21.4375 0H6.5625C2.93813 0 0 2.93813 0 6.5625V21.4375C0 25.0619 2.93813 28 6.5625 28H21.4375C25.0619 28 28 25.0619 28 21.4375V6.5625C28 2.93813 25.0619 0 21.4375 0Z"
                    fill="white"
                  />
                  <path
                    d="M21.4375 0H6.5625C2.93813 0 0 2.93813 0 6.5625V21.4375C0 25.0619 2.93813 28 6.5625 28H21.4375C25.0619 28 28 25.0619 28 21.4375V6.5625C28 2.93813 25.0619 0 21.4375 0Z"
                    fill="#0A66C2"
                  />
                  <path
                    d="M20.2032 23.8093H23.4046C23.5206 23.8093 23.6319 23.7632 23.7139 23.6812C23.796 23.5992 23.8421 23.4879 23.8421 23.3719L23.8438 16.6079C23.8438 13.0726 23.082 10.3552 18.9505 10.3552C17.38 10.2968 15.899 11.1064 15.0998 12.4582C15.0959 12.4648 15.0899 12.4699 15.0828 12.4728C15.0757 12.4757 15.0679 12.4761 15.0605 12.4741C15.0532 12.4721 15.0466 12.4678 15.042 12.4617C15.0373 12.4557 15.0348 12.4483 15.0347 12.4406V11.1191C15.0347 11.003 14.9886 10.8918 14.9065 10.8097C14.8245 10.7277 14.7132 10.6816 14.5972 10.6816H11.5591C11.443 10.6816 11.3318 10.7277 11.2497 10.8097C11.1677 10.8918 11.1216 11.003 11.1216 11.1191V23.3712C11.1216 23.4873 11.1677 23.5986 11.2497 23.6806C11.3318 23.7627 11.443 23.8087 11.5591 23.8087H14.7603C14.8763 23.8087 14.9876 23.7627 15.0696 23.6806C15.1517 23.5986 15.1978 23.4873 15.1978 23.3712V17.3148C15.1978 15.6023 15.5226 13.9439 17.6457 13.9439C19.7386 13.9439 19.7657 15.9035 19.7657 17.4257V23.3718C19.7657 23.4878 19.8118 23.5991 19.8938 23.6812C19.9759 23.7632 20.0872 23.8093 20.2032 23.8093ZM4.15625 6.52181C4.15625 7.81944 5.22452 8.88716 6.52225 8.88716C7.81966 8.88705 8.88727 7.81867 8.88727 6.52127C8.88705 5.22386 7.81933 4.15625 6.52181 4.15625C5.22397 4.15625 4.15625 5.22419 4.15625 6.52181ZM4.91739 23.8093H8.12284C8.23888 23.8093 8.35016 23.7632 8.4322 23.6812C8.51425 23.5991 8.56034 23.4878 8.56034 23.3718V11.1191C8.56034 11.003 8.51425 10.8918 8.4322 10.8097C8.35016 10.7277 8.23888 10.6816 8.12284 10.6816H4.91739C4.80136 10.6816 4.69008 10.7277 4.60803 10.8097C4.52598 10.8918 4.47989 11.003 4.47989 11.1191V23.3718C4.47989 23.4878 4.52598 23.5991 4.60803 23.6812C4.69008 23.7632 4.80136 23.8093 4.91739 23.8093Z"
                    fill="white"
                  />
                </svg>

                <svg
                  onClick={handleGmail}
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="19"
                  viewBox="0 0 26 19"
                  fill="none"
                >
                  <path
                    d="M20.1522 1.70209L13.0764 6.92415L5.83882 1.70209L5.84757 1.71056V9.02283L12.9949 14.3577L20.1522 9.22881V1.70209Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M22.0096 0.431836L20.1522 1.70209V9.22881L25.9986 4.9835V2.42607C25.9986 2.42607 25.2889 -1.22651 22.0096 0.431836Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M20.1522 9.22881L20.1514 18.9912H24.633C24.633 18.9912 25.9083 18.867 26 17.4923L25.9986 4.9835L20.1522 9.22881Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.83882 1.70209L3.99045 0.440139C0.711223 -1.21821 0 2.43298 0 2.43298V4.99031L5.83848 9.01556L5.83882 1.70209Z"
                    fill="#C5221F"
                  />
                  <path
                    d="M0 4.99221V17.501C0.0903639 18.8772 1.36708 19 1.36708 19H5.84868L5.83848 9.01556L0 4.99221Z"
                    fill="#4285F4"
                  />
                </svg>

                <svg
                  onClick={handleFacebook}
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <g clipPath="url(#clip0_3558_18816)">
                    <path
                      d="M28 14C28 6.26806 21.7319 0 14 0C6.26806 0 0 6.26806 0 14C0 20.9877 5.11963 26.7797 11.8125 27.8299V18.0469H8.25781V14H11.8125V10.9156C11.8125 7.40687 13.9027 5.46875 17.1006 5.46875C18.6322 5.46875 20.2344 5.74219 20.2344 5.74219V9.1875H18.4691C16.7299 9.1875 16.1875 10.2667 16.1875 11.3739V14H20.0703L19.4496 18.0469H16.1875V27.8299C22.8804 26.7797 28 20.9879 28 14Z"
                      fill="#1877F2"
                    />
                    <path
                      d="M19.4496 18.0469L20.0703 14H16.1875V11.3739C16.1875 10.2666 16.7299 9.1875 18.4691 9.1875H20.2344V5.74219C20.2344 5.74219 18.6322 5.46875 17.1005 5.46875C13.9027 5.46875 11.8125 7.40688 11.8125 10.9156V14H8.25781V18.0469H11.8125V27.8299C12.5361 27.9433 13.2675 28.0002 14 28C14.7325 28.0002 15.4639 27.9433 16.1875 27.8299V18.0469H19.4496Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3558_18816">
                      <rect width="28" height="28" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <svg
                  onClick={handleWhatsApp}
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14 27.125C20.7655 27.125 26.25 21.6405 26.25 14.875C26.25 8.10951 20.7655 2.625 14 2.625C7.23451 2.625 1.75 8.10951 1.75 14.875C1.75 17.072 2.32837 19.134 3.34116 20.9169L1.75 27.125L8.1505 25.6408C9.88873 26.5872 11.8815 27.125 14 27.125ZM14 25.2404C19.7247 25.2404 24.3654 20.5997 24.3654 14.875C24.3654 9.1504 19.7247 4.50962 14 4.50962C8.27536 4.50962 3.63462 9.1504 3.63462 14.875C3.63462 17.0853 4.32644 19.1341 5.50536 20.8164L4.57692 24.298L8.11994 23.4123C9.79072 24.5653 11.8165 25.2404 14 25.2404Z"
                    fill="#BFC8D0"
                  />
                  <path
                    d="M24.5 14C24.5 19.799 19.799 24.5 14 24.5C11.7882 24.5 9.73604 23.8161 8.04358 22.6482L4.45455 23.5455L5.39504 20.0186C4.20081 18.3144 3.5 16.239 3.5 14C3.5 8.20101 8.20101 3.5 14 3.5C19.799 3.5 24.5 8.20101 24.5 14Z"
                    fill="url(#paint0_linear_3558_18818)"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14 26.25C20.7655 26.25 26.25 20.7655 26.25 14C26.25 7.23451 20.7655 1.75 14 1.75C7.23451 1.75 1.75 7.23451 1.75 14C1.75 16.197 2.32837 18.259 3.34116 20.0419L1.75 26.25L8.1505 24.7658C9.88873 25.7122 11.8815 26.25 14 26.25ZM14 24.3654C19.7247 24.3654 24.3654 19.7247 24.3654 14C24.3654 8.27536 19.7247 3.63462 14 3.63462C8.27536 3.63462 3.63462 8.27536 3.63462 14C3.63462 16.2103 4.32644 18.2591 5.50536 19.9414L4.57692 23.423L8.11994 22.5373C9.79072 23.6903 11.8165 24.3654 14 24.3654Z"
                    fill="white"
                  />
                  <path
                    d="M10.9375 8.3124C10.6463 7.7274 10.1994 7.77919 9.74811 7.77919C8.94145 7.77919 7.68359 8.74543 7.68359 10.5437C7.68359 12.0175 8.33302 13.6307 10.5213 16.0441C12.6332 18.3732 15.4082 19.5779 17.7119 19.5369C20.0156 19.496 20.4896 17.5135 20.4896 16.844C20.4896 16.5473 20.3054 16.3992 20.1786 16.359C19.3936 15.9822 17.9456 15.2802 17.6162 15.1483C17.2868 15.0165 17.1147 15.1949 17.0078 15.2919C16.7091 15.5766 16.1169 16.4157 15.9141 16.6044C15.7113 16.7932 15.409 16.6976 15.2832 16.6263C14.8202 16.4405 13.565 15.8822 12.5646 14.9123C11.3271 13.7128 11.2545 13.3001 11.0214 12.9328C10.8349 12.6388 10.9718 12.4586 11.0401 12.3798C11.3067 12.0722 11.6748 11.5972 11.8399 11.3613C12.0049 11.1252 11.8739 10.7669 11.7953 10.5437C11.4571 9.58387 11.1705 8.78036 10.9375 8.3124Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_3558_18818"
                      x1="23.1875"
                      y1="6.125"
                      x2="3.5"
                      y2="24.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#5BD066" />
                      <stop offset="1" stopColor="#27B43E" />
                    </linearGradient>
                  </defs>
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="var(--color-icon-enabled, #2E3137)"
                  style={{
                    display: "inline-block",
                    verticalAlign: "middle",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const currentUrl = window.location.href; // Dapatkan URL saat ini
                    navigator.clipboard
                      .writeText(currentUrl)
                      .then(() => {
                        console.log("berhasil di copy");
                        setPopUpCopy(true); // Tampilkan notifikasi
                        setTimeout(() => {
                          setPopUpCopy(false); // Sembunyikan setelah 2 detik
                        }, 2000);
                      })
                      .catch((err) => {
                        console.error("Gagal menyalin URL: ", err);
                      });
                  }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.868 4.561c.43.196.815.478 1.132.829a3.78 3.78 0 0 1 1.14 2.72A3.537 3.537 0 0 1 19 10.65L17.61 12a.75.75 0 1 1-1.06-1L18 9.56a1.998 1.998 0 0 0 .68-1.48A2.26 2.26 0 0 0 18 6.43a2 2 0 0 0-1.54-.68 2.26 2.26 0 0 0-1.65.68l-3.5 3.5a2 2 0 0 0-.68 1.48 2.262 2.262 0 0 0 .68 1.65.77.77 0 0 1 0 1.07.79.79 0 0 1-.53.22.77.77 0 0 1-.53-.22 3.8 3.8 0 0 1-1.12-2.75 3.54 3.54 0 0 1 1.14-2.54l3.48-3.48a3.76 3.76 0 0 1 2.75-1.11c.473.01.938.115 1.368.311ZM12.831 10.8a.75.75 0 0 1 .22-.53.742.742 0 0 1 1.06-.01A3.8 3.8 0 0 1 15.23 13a3.538 3.538 0 0 1-1.14 2.52L10.61 19a3.8 3.8 0 0 1-2.67 1.14h-.08A3.46 3.46 0 0 1 5.33 19a3.78 3.78 0 0 1-1.1-2.72 3.54 3.54 0 0 1 1.14-2.54l1.38-1.34a.75.75 0 0 1 1.06 0 .77.77 0 0 1 0 1.07l-1.4 1.4a2 2 0 0 0-.68 1.48A2.26 2.26 0 0 0 6.41 18a2.001 2.001 0 0 0 1.48.68A2.19 2.19 0 0 0 9.55 18l3.5-3.52a2.002 2.002 0 0 0 .68-1.48 2.26 2.26 0 0 0-.68-1.67.75.75 0 0 1-.22-.53Z"
                  ></path>
                </svg>
              </div>
            </div>
          </>
        )}

        {/* tutup po up share */}

        {/* tutup berhasi keranjang */}

        <div className="h-[70px] w-full border"></div>
      </LayoutUtama>
    </>
  );
};

export default products;
