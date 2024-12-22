"use server";

import network from "../main/network";

type CartResponse = {
  data: any;
  error?: any;
};

type productType = {
  cartId: number;
  cartItemId: any;
};

export default async function deleteCartItem({
  cartId,
  cartItemId,
}: productType): Promise<CartResponse> {
  try {
    const api = await network();
    const response = await api.delete(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/cart/${cartId}/selected`,
      {
        data: {
          cart_items_id: cartItemId,
        },
      }
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
