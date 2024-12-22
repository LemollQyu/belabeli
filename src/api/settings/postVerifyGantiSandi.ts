"use server";

import network from "../main/network";

type gantiSandi = {
  otps_id:string,
  new_password: string
  new_password_confirmation: string;
};

type gantiSandiResponse = {
    data: any;
    error?: any;
}

export default async function verifyGantiSandi({ otps_id, new_password, new_password_confirmation}: gantiSandi): Promise<gantiSandiResponse> {
  try {

    const api = await network();
    const response = await api.put(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/change/password`,
      {
        otps_id: otps_id,
        new_password: new_password,
        new_password_confirmation: new_password_confirmation
      }
    );
    return {
        data: response.data
    };
  } catch (error: any) {
    console.error("Error request otp email : ", error);
    return {
        data: otps_id,
        error: error.response?.data,
      };
  }
}
