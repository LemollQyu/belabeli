"use server";

import network from "../main/network";

type VariasiResponse = {
  data: any;
  error?: any;
};

type variasiReq = {
  orderItemId: number | null;
};

export default async function variasiOrderProduct({
  orderItemId,
}: variasiReq): Promise<VariasiResponse> {
  try {
    const api = await network();
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/orderItem/${orderItemId}`
    );
    return {
      data: response.data,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data,
    };
  }
}
