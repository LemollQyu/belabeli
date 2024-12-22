"use server";

import network from "../main/network";

type rekening_user = {
  bank_code: string;
  nomor_rekening: string;
  id: string;
};

export default async function putNomorRekening({ bank_code, nomor_rekening, id }: rekening_user) {
  try {
    const api = await network();
    const response = await api.put(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/rekening/${id}`,
      {
        bank_code:bank_code,
        nomor_rekening:nomor_rekening
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error update nomor rekening : ", error);
    throw error; // Atau kembalikan pesan error jika diperlukan
  }
}
