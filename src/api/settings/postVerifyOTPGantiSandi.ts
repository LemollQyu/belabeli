"use server";

import network from "../main/network";

type otpGantiSandi = {
  otp: string;
};

type otpGantiSandiResponse = {
    data: any;
    error?: any;
}

export default async function verifyOTPGantiSandi({ otp }: otpGantiSandi) {
  try {

    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/otp/verify`,
      {
        otp: otp
      }
    );
    return {
        data: response.data
    };
  } catch (error: any) {
    console.error("Error request otp notelp : ", error);
  }
}
