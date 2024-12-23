//` /payment/session/${paymentSessionId}?adresses_id=${addressId}`

"use server";

import network from "../../main/network";

type dataResponse = {
  data: any;
  error?: any;
};

type dataReq = {
  productId: number;
};

export default async function informasiProduct({
  productId,
}: dataReq): Promise<dataResponse> {
  try {
    const api = await network();
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/${productId}/information`
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
