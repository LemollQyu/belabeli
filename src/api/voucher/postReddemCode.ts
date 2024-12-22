"use server";

import network from "../main/network";

type codeType = {
  code: string;
};

type VoucherResponse = {
  data: any;
  error?: any;
};

export default async function RedeemCode({
  code,
}: codeType): Promise<VoucherResponse> {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/redeem/voucher`,
      {
        code: code,
      }
    );
    return response.data;
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data,
    };
  }
}
