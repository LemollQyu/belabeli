// pages/api/getProductWithUlasan.ts
"use server";

import getDetailProduct from "./detailProduct";
import postUlasanProduct from "./ulasan/ulasanProduct";
import getVoucher from "./voucher/getVoucher";
import postProductSerupa from "./product/productSerupa";

type ProductAndUlasanParams = {
  productSlug: string;
  merchantId: number;
  ulasanParams: {
    product_slug: string | null;
    star: number | null;
    rating: string | null;
    label: boolean | null;
    helpful: boolean | null;
    media: boolean | null;
    variation: number[] | null;
  };
  productSerupaParams: {
    brand: string;
    page: number;
  };
};

export default async function getProductWithUlasan({
  productSlug,
  ulasanParams,
  merchantId,
  productSerupaParams,
}: ProductAndUlasanParams) {
  try {
    // Memanggil kedua API secara paralel
    const [productDetail, ulasan, voucher, productSerupa] = await Promise.all([
      getDetailProduct({ productSlug }),
      postUlasanProduct(ulasanParams),
      getVoucher({ merchantId }),
      postProductSerupa(productSerupaParams),
    ]);

    // Mengembalikan hasil keduanya dalam satu respons
    return { productDetail, ulasan, voucher, productSerupa };
  } catch (error) {
    console.error("Error fetching product detail and ulasan:", error);
    throw error; // Atau kembalikan pesan error jika diperlukan
  }
}
