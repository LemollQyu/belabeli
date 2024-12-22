"use server";

import network from "../main/network";

type ulasanType = {
  ulasanId: number;
  message: string | null;
};

type laporanUlasanResponse = {
  data: any;
  error?: any;
};

export default async function laporanUlasan({
  ulasanId,
  message,
}: ulasanType): Promise<laporanUlasanResponse> {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/ulasan/${ulasanId}/report`,
      {
        message: message,
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
