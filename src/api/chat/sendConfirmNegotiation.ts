"use server";

import network from "../main/network";

type SendConfirmNegotiationResponse = {
  data: any;
  error?: any;
};

type SendConfirmNegotiationRequest = {
  message_id: string;
  merchants_id: number;
  products_id: number;
  quantity: number;
  product_stocks_id: number;
  price_negosiasi: number;
  variation_items_id: number[];
};

export default async function sendConfirmNegotiation({
  message_id,
  merchants_id,
  products_id,
  quantity,
  product_stocks_id,
  price_negosiasi,
  variation_items_id,
}: SendConfirmNegotiationRequest): Promise<SendConfirmNegotiationResponse> {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/message/${message_id}/cart`,
      {
        merchants_id: merchants_id,
        products_id: products_id,
        quantity: quantity,
        product_stocks_id: product_stocks_id,
        price_negosiasi: price_negosiasi,
        variation_items_id: variation_items_id,
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
