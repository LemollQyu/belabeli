"use server";
import network from "./main/network";

export default async function getCategory() {
  const api = await network();

  const response = await api.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/category`
  );

  return response.data; // Ambil data dari respons
}
