"use server";

import network from "../main/network";

type deleteAccount = {
  kata_sandi: React.SetStateAction<string>;
};

type deleteAccountResponse = {
    data: any;
    error?: any;
}

export default async function requestOTPHapusAkun({ kata_sandi }: deleteAccount): Promise<deleteAccountResponse> {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/otp`,
      {
        kata_sandi: kata_sandi,
      }
    );
    return {
        data: response.data
    };
  } catch (error: any) {
    console.error("Error request otp hapus akun : ", error);
    return {
        data: null,
        error: error.response?.data,
      };
  }
}
