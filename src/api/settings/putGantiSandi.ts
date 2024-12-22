"use server";

import network from "../main/network";

type ganti_sandi = {
  otps_id: string;
  new_password: string;
  new_password_confirmation: string;
};

export default async function putGantiSandi({ otps_id, new_password, new_password_confirmation }: ganti_sandi) {
  try {
    const api = await network();
    const response = await api.put(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/change/password`,
      {
        otps_id:otps_id,
        new_password:new_password,
        new_password_confirmation:new_password_confirmation
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error update kata sandi : ", error);
    throw error; // Atau kembalikan pesan error jika diperlukan
  }
}
