"use server";

import network from "../main/network";
import getVariationItems from "../product/variasiProduct";

type productType = {
  merchants_id: number;
  products_id: number;
  variation_items_id: number[] | null;
  quantity: number;
};

type CartResponse = {
  data: any;
  error?: any;
};

export default async function postCart({
  merchants_id,
  products_id,
  variation_items_id,
  quantity,
}: productType): Promise<CartResponse> {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/cart`,
      {
        merchants_id: merchants_id,
        products_id: products_id,
        variation_items_id: variation_items_id,
        quantity: quantity,
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
