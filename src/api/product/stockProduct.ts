"use server";

import network from "../main/network";

type productType = {
  variant_items_id_1: number | null;
  variant_items_id_2: number | null;
};

export default async function postProductStock({
  variant_items_id_1,
  variant_items_id_2,
}: productType) {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/stock`,
      {
        variation_items_id_1: variant_items_id_1,
        variation_items_id_2: variant_items_id_2,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching: ", error);
    throw error; // Atau kembalikan pesan error jika diperlukan
  }
}
