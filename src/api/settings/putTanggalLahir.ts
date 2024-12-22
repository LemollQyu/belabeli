"use server";

import network from "../main/network";

type dobProfile = {
    tanggal_lahir: React.SetStateAction<string>;
};

export default async function gantiBirthDate({ tanggal_lahir }: dobProfile) {
  try {
    const api = await network();
    const response = await api.put(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/birthdate`,
      {
        tanggal_lahir: tanggal_lahir,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error ganti birthdate : ", error);
    throw error; 
  }
}
