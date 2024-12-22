"use server";

import network from "../main/network";

type emailProfile = {
  accountTest: string
  otpTest: string;
};

type emailProfileResponse = {
    data: any;
    error?: any;
}

export default async function verifyEmailProfile({ accountTest, otpTest }: emailProfile): Promise<emailProfileResponse> {
  try {

    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/otp/email/verify`,
      {
        email: accountTest,
        otp: otpTest
      }
    );
    return {
        data: response.data
    };
  } catch (error: any) {
    console.error("Error request otp email : ", error);
    return {
        data: accountTest,
        error: error.response?.data,
      };
  }
}
