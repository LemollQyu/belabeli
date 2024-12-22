//` /payment/session/${paymentSessionId}?adresses_id=${addressId}`

"use server";

import network from "../main/network";

type OrderResponse = {
  data: any;
  error?: any;
};

type orderReq = {
  orderId: string | undefined;
};

export default async function order({
  orderId,
}: orderReq): Promise<OrderResponse> {
  try {
    const api = await network();
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/order/${orderId}`
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
