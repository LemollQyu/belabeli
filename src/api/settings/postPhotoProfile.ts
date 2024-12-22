"use server";

import network from "../main/network";

type photoProfileUlasanResponse = {
  data: any;
  error?: any;
};

export default async function postPhotoProfile(
  formData: FormData
): Promise<photoProfileUlasanResponse> {
  try {
    const api = await network();

    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/foto`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        },
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