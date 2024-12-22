"use server";

import axios from "axios";
import network from "../main/network";

type DataAddress = {
  addressId: string | null;
};

export default async function chooseAddress({
  addressId, // ID address yang akan diupdate
}: DataAddress) {
  try {
    const api = await network();
    const response = await api.put(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/address/${addressId}/choose`
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
