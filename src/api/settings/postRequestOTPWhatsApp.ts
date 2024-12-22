"use server";

import network from "../main/network";

type notelpProfile = {
  nomor_telepon: React.SetStateAction<string>;
};

type notelpProfileResponse = {
    data: any;
    error?: any;
}

export default async function requestOTPWA({ nomor_telepon }: notelpProfile): Promise<notelpProfileResponse> {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/otp/no-telephone`,
      {
        nomor_telepon: nomor_telepon,
      }
    );
    return {
        data: response.data
    };
  } catch (error: any) {
    console.error("Error request otp WA : ", error);
    return {
        data: null,
        error: error.response?.data,
      };
  }
}
