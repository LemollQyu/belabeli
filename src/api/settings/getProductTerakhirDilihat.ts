"use server";

import network from "../main/network";

export default async function getLastViewed() {
  try {
    const api = await network();
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/last/viewed`
    );
    return response.data;
  } catch (error) {
    console.error("Error ambil data terakhir dilihat :", error);
    throw error; // Atau kembalikan pesan error jika diperlukan
  }
}
