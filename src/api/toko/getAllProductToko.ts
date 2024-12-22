"use server";

import network from "../main/network";

type ProductType = {
  merchantSlug: string | null;
  price: string | null;
  terbaru: boolean | null;
  star: number | null;
  terlaris: boolean | null;
};

type VoucherResponse = {
  data: any;
  error?: any;
};

export default async function getAllProductToko({
  merchantSlug,
  price,
  terbaru,
  star,
  terlaris,
}: ProductType): Promise<VoucherResponse> {
  try {
    const api = await network();
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/merchant/${merchantSlug}/product`,
      {
        params: {
          price: price,
          terbaru: terbaru,
          star: star,
          terlaris: terlaris,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data,
    };
  }
}
