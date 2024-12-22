"use server";

import network from "../main/network";

type paymentSessionRequest = {
  items: items;
};

type items = {
  addresses_id: string;
  catatan: string;
  payment_method: string | null;
  payment_sessions_id: string | null;
  service: string;
  description: string;
  value: number;
  estimasi: string;
  merchants_uuid: string | null;
  voucher_merchants_id: number | null;
};

export default async function postCheckout({
  addresses_id,
  catatan,
  payment_method,
  payment_sessions_id,
  service,
  description,
  value,
  estimasi,
  merchants_uuid,
  voucher_merchants_id,
}: items) {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/checkout`,
      {
        addresses_id: addresses_id,
        catatan: catatan,
        payment_method: payment_method,
        payment_sessions_id: payment_sessions_id,
        service: service,
        description: description,
        value: value,
        estimasi: estimasi,
        merchants_uuid: merchants_uuid,
        voucher_merchants_id: voucher_merchants_id,
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
