"use server";

import network from "../main/network";

type ulasanType = {
  ulasanId: number;
};

type laporanUlasanResponse = {
  data?: any;
  error?: any;
};

export default async function detailUlasan({
  ulasanId,
}: ulasanType): Promise<laporanUlasanResponse> {
  try {
    const api = await network();
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/ulasan/${ulasanId}/detail`
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
