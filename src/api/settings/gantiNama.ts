"use server";

import network from "../main/network";

type namaProfile = {
  name: React.SetStateAction<string>;
};

export default async function gantiNamaProfile({ name }: namaProfile) {
  try {
    const api = await network();
    const response = await api.put(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/name`,
      {
        name: name,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error ganti nama profile : ", error);
    throw error; // Atau kembalikan pesan error jika diperlukan
  }
}
