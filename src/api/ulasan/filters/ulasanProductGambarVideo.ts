"use server";

import network from "../../main/network";

type productType = {
  product_slug: string | null;
  gambarVideo: boolean;
};

export default async function postUlasanProductGambarVideo({
  product_slug,
  gambarVideo,
}: productType) {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/ulasan/product/${product_slug}`,
      {
        media: gambarVideo,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ulasan:", error);
    throw error; // Atau kembalikan pesan error jika diperlukan
  }
}
