"use server";

import axios from "axios";
import network from "../../main/network";

type DataOrder = {
  orderId: string;
  alesan: string;
};

export default async function cencel({
  orderId,
  alesan, // ID address yang akan diupdate
}: DataOrder) {
  try {
    const api = await network();
    const response = await api.put(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/order/${orderId}/cancel`,
      {
        alasan: alesan,
      }
    );
    return {
      data: response.data,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data || error.message,
    };
  }
}
