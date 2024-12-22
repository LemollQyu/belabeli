//` /payment/session/${paymentSessionId}?adresses_id=${addressId}`

"use server";

import network from "../main/network";

type PaymentResponse = {
  data: any;
  error?: any;
};

type paymentSessionRequest = {
  paymentSessionId: string | null;
  addressId: string | "";
};

export default async function getPaymentSession({
  paymentSessionId,
  addressId,
}: paymentSessionRequest): Promise<PaymentResponse> {
  try {
    const api = await network();
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/payment/session/${paymentSessionId}?adresses_id=${addressId}`
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
