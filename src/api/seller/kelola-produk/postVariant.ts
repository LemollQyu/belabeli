"use server";

import network from "../../main/network";

type kirimBuktiResponse = {
  data: any;
  error?: any;
};

type reqkirimDataProduct = {
  formData: FormData;
  productId: number;
};

export default async function reqVariantProduct({
  productId,
  formData,
}: reqkirimDataProduct): Promise<kirimBuktiResponse> {
  try {
    const api = await network();

    // Log isi FormData untuk debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/${productId}/varian`,
      formData, // Kirim FormData langsung
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      }
    );

    return {
      data: response.data,
    };
  } catch (error: any) {
    console.error("Error details:", error);
    return {
      data: null,
      error: error.response?.data || "Unknown error",
    };
  }
}
