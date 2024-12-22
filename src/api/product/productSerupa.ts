"use server";

import network from "../main/network";

type productType = {
  page: number;
  brand: string;
};

export default async function postProductSerupa({ page, brand }: productType) {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/similar`,
      {
        page: page,
        brand: brand,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching produk serupa: ", error);
    throw error; // Atau kembalikan pesan error jika diperlukan
  }
}
