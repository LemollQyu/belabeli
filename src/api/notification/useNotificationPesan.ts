import useSWR from "swr";
import getNotificationPesan from "./getNotificationPesan";

export default function useNotificationPesan() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/chat/count`, // API endpoint
    async (url) => {
      const response = await getNotificationPesan(url);
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
    notifications2: data,
    error, // SWR akan menangkap error yang dilempar
    isLoading,
  };
}
