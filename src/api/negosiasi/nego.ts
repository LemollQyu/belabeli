"use server";

import network from "../main/network";

type productType = {
  id_produk: number;
  harga_nego: number | string;
  stock_id: number;
  merchants_uuid: string;
  quantity: number;
};

type NegosiasiResponse = {
  data: any;
  error?: any;
};

export default async function postNegosiasi({
  id_produk,
  harga_nego,
  stock_id,
  merchants_uuid,
  quantity,
}: productType): Promise<NegosiasiResponse> {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/negosiasi`,
      {
        products_id: id_produk,
        price_negosiasi: harga_nego,
        product_stocks_id: stock_id,
        merchants_uuid: merchants_uuid,
        quantity: quantity,
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
