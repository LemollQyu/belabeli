"use server";

import network from "../main/network";

type gantiSandi = {
  kata_sandi: React.SetStateAction<string>;
};

type gantiSandiResponse = {
    data: any;
    error?: any;
}

export default async function requestOTPGantiSandi({ kata_sandi }: gantiSandi): Promise<gantiSandiResponse> {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/otp/password`,
      {
        kata_sandi: kata_sandi,
      }
    );
    return {
        data: response.data
    };
  } catch (error: any) {
    console.error("Error request otp new password : ", error);
    return {
        data: null,
        error: error.response?.data,
      };
  }
}
