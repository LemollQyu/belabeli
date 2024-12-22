"use server";

import network from "../main/network";

type paymentSessionRequest = {
  merchants_id: number | null;
  carts_id: number | null;
  items: items[];
};

type items = {
  products_id: number;
  product_stocks_id: number;
  quantity: number;
  price_negosiasi: number | null;
  cart_items_id: number | null;
};

export default async function postPaymentSession({
  carts_id,
  merchants_id,
  items,
}: paymentSessionRequest) {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/payment/session`,
      {
        carts_id: carts_id,
        merchants_id: merchants_id,
        items: items,
      }
    );
    return {
      data: response.data,
    };
  } catch (error: any) {
    console.log("Error details:", error); // Tambahkan log untuk melihat error
    return {
      data: null,
      error: error.response.data || "Unknown error",
    };
  }
}
