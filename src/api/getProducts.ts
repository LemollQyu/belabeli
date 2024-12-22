"use server";

import network from "./main/network";

type productType = {
  page: number | null;
  category: string | null;
};

export default async function getProduct({ page, category }: productType) {
  const api = await network();

  const response = await api.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/product?page=${
      page !== null ? page : ""
    }&category=${category !== null ? category : ""}`
  );

  return response.data;
}
