"use server";

import network from "../main/network";

type productType = {
  merchantId: number;
};

type VoucherResponse = {
  data: any;
  error?: any;
};

export default async function getEtalase({
  merchantId,
}: productType): Promise<VoucherResponse> {
  try {
    const api = await network();
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/merchant/${merchantId}/etalase`
    );
    return response.data;
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data,
    };
  }
}
