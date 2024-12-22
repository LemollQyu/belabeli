//` /payment/session/${paymentSessionId}?adresses_id=${addressId}`

"use server";

import network from "../main/network";

type PaymentResponse = {
  data: any;
  error?: any;
};

type Merchant = {
  merchantId: number;
};

export default async function getUserVoucher({
  merchantId,
}: Merchant): Promise<PaymentResponse> {
  try {
    const api = await network();
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/merchant/${merchantId}/user/voucher`
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
