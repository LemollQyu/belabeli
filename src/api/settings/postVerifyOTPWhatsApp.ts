"use server";

import network from "../main/network";

type notelpProfile = {
  no_telephone: string
  otp: string;
};

type notelpProfileResponse = {
    data: any;
    error?: any;
}

export default async function verifyNoTelpProfile({ no_telephone, otp }: notelpProfile): Promise<notelpProfileResponse> {
  try {

    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/otp/no-telephone/verify`,
      {
        no_telephone:no_telephone,
        otp: otp
      }
    );
    return {
        data: response.data
    };
  } catch (error: any) {
    console.error("Error request otp notelp : ", error);
    return {
        data: no_telephone,
        error: error.response?.data,
      };
  }
}
