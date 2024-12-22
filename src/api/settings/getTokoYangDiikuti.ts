"use server";

import network from "../main/network";

export default async function getTokoYangDiikuti() {
  try {
    const api = await network();
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/merchant/followed/user`
    );
    return response.data;
  } catch (error) {
    console.error("Error ambil data toko :", error);
    throw error; // Atau kembalikan pesan error jika diperlukan
  }
}
