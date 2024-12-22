"use server";

import network from "../main/network";

// type productType = {
// };

export default async function getUserProfile() {
  try {
    const api = await network();
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/profile`
    );
    return response.data;
  } catch (error) {
    console.error("Error ambil seluruh data user :", error);
    throw error; // Atau kembalikan pesan error jika diperlukan
  }
}
