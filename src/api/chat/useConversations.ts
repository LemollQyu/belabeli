import useSWR from "swr";
import getConversation from "./getConversation";

export default function useConversations() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/chat`, // API endpoint
    async (url) => {
      const response = await getConversation(url);
      if (response.error) {
        throw response.error; // Lempar error agar SWR dapat menangani
      }
      return response.data;
    },
    {
      refreshInterval: 2000, // Refresh every 2 seconds
    }
  );

  return {
    conversations: data,
    error, // SWR akan menangkap error yang dilempar
    isLoading,
  };
}
