"use server";

import network from "../main/network";

type NotificationResponse = {
  data: any;
  error?: any;
};

export default async function markAllNotificationsAsRead(): Promise<NotificationResponse> {
  try {
    // Inisialisasi instance Axios menggunakan fungsi `network`
    const api = await network();
    console.log("Axios instance created:", api);

    // URL endpoint untuk Read All Notification
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/notification/readall`;
    console.log("Requesting URL:", apiUrl);

    // Melakukan permintaan PUT ke endpoint
    const response = await api.put(apiUrl);
    console.log("API response:", response.data);

    // Mengembalikan respons API
    return {
      data: response.data,
    };
  } catch (error: any) {
    console.error("Error occurred:", error.response?.data || error.message);

    // Mengembalikan error jika permintaan gagal
    return {
      data: null,
      error: error.response?.data,
    };
  }
}
