import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type OtpType = {
  account: string;
};

export default async function sendOtp({ account }: OtpType) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/send-otp`,
    {
      account: account,
    }
  );

  return response;
}
