"use server";

import axios from "axios";
import network from "../../main/network";

type DataOrder = {
  orderId: string;
};

export default async function accept({ orderId }: DataOrder) {
  try {
    const api = await network();
    const response = await api.put(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/order/${orderId}/accept`
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
