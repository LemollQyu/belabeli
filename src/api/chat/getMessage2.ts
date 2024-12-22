"use server";

import network from "../main/network";

type ChatResponse = {
  data: any;
  error?: any;
};

export default async function getMessage2(url: string): Promise<ChatResponse> {
  try {
    const api = await network();
    const response = await api.get(url);
    return { data: response.data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data || error.message || "Unknown error",
    };
  }
}
