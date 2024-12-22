"use server";

import network from "../main/network";

type ChatResponse = {
  data: any;
  error?: any;
};

type ChatRequest = {
  chatId: string;
};

export default async function getMessage({
  chatId,
}: ChatRequest): Promise<ChatResponse> {
  try {
    const api = await network();
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/chat/${chatId}`
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
