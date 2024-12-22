import useSWR from "swr";
import getNotification2 from "./getNotification2";

export default function useNotification() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/notification/count`, // API endpoint
    async (url) => {
      const response = await getNotification2(url);
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
    notifications: data,
    error, // SWR akan menangkap error yang dilempar
    isLoading,
  };
}
