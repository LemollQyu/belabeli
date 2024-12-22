"use server";

import network from "../../main/network";

type productType = {
  page: number | null;
};

type productFlashaleResponse = {
  data?: any;
  error?: any;
};

export default async function productFlashale({
  page,
}: productType): Promise<productFlashaleResponse> {
  try {
    const api = await network();
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/merchant/active/flashsale?page=${
        page !== null ? page : ""
      }`
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
