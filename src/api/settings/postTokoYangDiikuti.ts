"use server";

import network from "../main/network";

type toko = {
  merchantId:string
};

export default async function postTokoYangDiikuti({ merchantId }: toko) {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/merchant/${merchantId}/follow`
    );
    return response.data;
  } catch (error) {
    console.error("Error update nomor rekening : ", error);
    throw error; // Atau kembalikan pesan error jika diperlukan
  }
}
