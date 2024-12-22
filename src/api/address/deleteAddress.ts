// /address/:addressId

"use server";

import network from "../main/network";

type AddressResponse = {
  data: any;
  error?: any;
};

type addressType = {
  idAddress: string;
};

export default async function deleteCart({
  idAddress,
}: addressType): Promise<AddressResponse> {
  try {
    const api = await network();
    const response = await api.delete(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/address/${idAddress}`
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
