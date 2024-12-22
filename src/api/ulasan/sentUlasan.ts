"use server";

import network from "../main/network";

type ulasanType = {
  productSlug: string | string[];
  ulasan: string | null;
  rating: number;

  variation_items_id: number[];
  media1: any;
  media2: any;
  media3: any;
  media4: any;
  media5: any;
};

type messageUlasanResponse = {
  data: any;
  error?: any;
};

export default async function sentUlasan(
  formData: FormData
): Promise<messageUlasanResponse> {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/ulasan/product/${formData.get(
        "productSlug"
      )}/send`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      }
    );
    console.log(response);
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
