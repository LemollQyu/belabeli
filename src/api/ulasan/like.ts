"use server";

import network from "../main/network";

type productType = {
  ulasan_id: number;
};

export default async function postLikeUlasan({ ulasan_id }: productType) {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/ulasan/${ulasan_id}/like`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching like:", error);
    throw error; // Atau kembalikan pesan error jika diperlukan
  }
}
