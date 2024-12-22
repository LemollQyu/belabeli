"use server";

import network from "../main/network";

type productType = {
  product_slug: string | null;
  star: number | null;
  rating: string | null;
  label: boolean | null;
  helpful: boolean | null;
  media: boolean | null;
  variation: number[] | null;
};

export default async function postUlasanProduct({
  product_slug,
  star,
  rating,
  label,
  helpful,
  media,
  variation,
}: productType) {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/ulasan/product/${product_slug}`,
      {
        star,
        rating,
        label,
        helpful,
        media,
        variation: variation,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ulasan:", error);
    throw error; // Atau kembalikan pesan error jika diperlukan
  }
}
