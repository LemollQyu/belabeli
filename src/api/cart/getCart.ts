"use server";

import network from "../main/network";

type CartResponse = {
  data: any;
  error?: any;
};

export default async function getCart(): Promise<CartResponse> {
  try {
    const api = await network();
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/cart`
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
