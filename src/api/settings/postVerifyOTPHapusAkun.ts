"use server";

import network from "../main/network";

type hapusAkun = {
  otp: string;
};

export default async function verifyDeleteAccount({ otp }: hapusAkun){
  try {

    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/verify`,
      {
        otp: otp
      }
    );
    return {
        data: response.data
    };
  } catch (error: any) {
    console.error("Error request verify delete account : ", error);
  }
}
