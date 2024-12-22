"use server";

import network from "./main/network";

type productType = {
  productSlug: string | null | string[];
};

export default async function getDetailProduct({ productSlug }: productType) {
  try {
    const api = await network();
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/${productSlug}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error; // Atau kembalikan pesan error jika diperlukan
  }
}
