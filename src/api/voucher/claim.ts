"use server";

import network from "../main/network";

type productType = {
  discount_id: number | null;
};

type VoucherResponse = {
  code: any;
  data: any;
  error?: any;
};

export default async function postClaimVoucher({
  discount_id,
}: productType): Promise<VoucherResponse> {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/claim/voucher/${discount_id}`
    );
    return response.data;
  } catch (error: any) {
    return {
      code: null,
      data: null,
      error: error.response?.data,
    };
  }
}
