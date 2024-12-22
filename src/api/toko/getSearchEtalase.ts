//` /payment/session/${paymentSessionId}?adresses_id=${addressId}`

"use server";

import network from "../main/network";

type SearchResponse = {
  data: any;
  error?: any;
};

type reqSeacrh = {
  merchantSlug: string | string[];
};

export default async function searchEtalase({
  merchantSlug,
}: reqSeacrh): Promise<SearchResponse> {
  try {
    const api = await network();
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/merchant/${merchantSlug}/product/search`
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
