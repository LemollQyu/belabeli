"use server";

import network from "../main/network";

type jenisKelamin = {
  jenis_kelamin: string;
};

export default async function putGender({ jenis_kelamin }: jenisKelamin) {
  try {
    const api = await network();
    const response = await api.put(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/kelamin`,
      {
        jenis_kelamin: jenis_kelamin
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error ganti jenis kelamin : ", error);
    throw error; // Atau kembalikan pesan error jika diperlukan
  }
}
