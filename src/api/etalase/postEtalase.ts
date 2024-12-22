"use server";

import network from "../main/network";

type data = {
  nama: string;
};

export default async function addEtalase({ nama }: data) {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/merchant/etalase`,
      {
        name: nama,
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
