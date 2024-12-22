import useSWR from "swr";
import getMessage2 from "./getMessage2";

type ChatRequest = {
  chatId: string;
};

interface Message {
  order: any;
  id: string;
  conversations_id: string;
  sender_id: string;
  type: "chat" | "negosiasi" | "file"; // Enum untuk tipe pesan
  accept: boolean;
  products_id?: number;
  product_stock_id?: number;
  quantity?: number;
  price_negosiasi?: string;
  price_sell?: number;
  product?: any;
  product_stock?: any;
  message_content?: string; // Optional, karena bisa null pada tipe tertentu
  user: {
    id: string;
    name: string;
    avatar: string; // URL atau path avatar pengguna
  };
  is_read: boolean;
  from_me: boolean;
  time: string; // Waktu dalam format seperti "10:00 AM"
}

interface MessagesGroupedByDate {
  [dateLabel: string]: Message[]; // Key adalah label tanggal (e.g., "Hari Ini", "Kemarin")
}

interface ResponseMessage {
  messages: MessagesGroupedByDate;
  error: any;
  isLoading: boolean;
}

export default function useMessages({ chatId }: ChatRequest): ResponseMessage {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/chat/${chatId}`, // API endpoint
    async (url: string) => {
      const response = await getMessage2(url);
      if (response.error) {
        throw response.error; // Lempar error agar SWR dapat menangani
      }
      return response.data.data;
    },
    {
      refreshInterval: 2000, // Refresh every 2 seconds
    }
  );

  return {
    messages: data,
    error, // SWR akan menangkap error yang dilempar
    isLoading,
  };
}
