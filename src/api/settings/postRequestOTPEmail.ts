"use server";

import network from "../main/network";

type emailProfile = {
  email: React.SetStateAction<string>;
};

type emailProfileResponse = {
    data: any;
    error?: any;
}

export default async function requestEmailProfile({ email }: emailProfile): Promise<emailProfileResponse> {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/otp/email`,
      {
        email: email,
      }
    );
    return {
        data: response.data
    };
  } catch (error: any) {
    console.error("Error request otp email : ", error);
    return {
        data: null,
        error: error.response?.data,
      };
  }
}
