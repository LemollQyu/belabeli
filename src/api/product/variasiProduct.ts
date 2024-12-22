"use server";

import network from "../main/network";

export default async function getVariationItems({ slug }: any) {
  try {
    const api = await network();
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/${slug}/variation-items`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching filter variasi = ", error);
    throw error; // Atau kembalikan pesan error jika diperlukan
  }
}
