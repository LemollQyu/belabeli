"use server";

import network from "../main/network";

type productType = {
  merchant_id: number;
};

export default async function postFollow({ merchant_id }: productType) {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/merchant/${merchant_id}/follow`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching follow:", error);
    throw error; // Atau kembalikan pesan error jika diperlukan
  }
}
