"use server";

import network from "../main/network";

type search = {
    search: string;
  };

export default async function getSearchProduct({ search }: search) {
    try {
      const api = await network();
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/search?search=${search}`
      );
      return response.data;
    } catch (error) {
      console.error("Error get auto complete : ", error);
      throw error; // Atau kembalikan pesan error jika diperlukan
    }
  }
