"use server";

import network from "../main/network";

export default async function getRekening() {
  try {
    const api = await network();
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/rekening`
    );
    return response.data;
  } catch (error) {
    console.error("Error ambil data rekening :", error);
    throw error; // Atau kembalikan pesan error jika diperlukan
  }
}
