"use server";

import network from "../main/network";

type CartResponse = {
  data: any;
  error?: any;
};

type productType = {
  cartId: number;
};

export default async function deleteCart({
  cartId,
}: productType): Promise<CartResponse> {
  try {
    const api = await network();
    const response = await api.delete(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/cart/${cartId}`
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
