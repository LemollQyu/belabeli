"use server";

import network from "../main/network";

type SendMessageResponse = {
  data: any;
  error?: any;
};

type SendMessageRequest = {
  message: string;
  chatId: string;
};

export default async function sendMessage({
  message,
  chatId,
}: SendMessageRequest): Promise<SendMessageResponse> {
  try {
    const api = await network();
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/chat/${chatId}`,
      {
        message: message,
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
