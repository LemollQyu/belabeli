import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type OtpType = {
  account: string;
  otp: string;
};

export default async function verifyOtp({ account, otp }: OtpType) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/verification-otp`,
    {
      account: account,
      otp: otp,
    }
  );

  return response;
}
