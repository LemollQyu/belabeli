//` /payment/session/${paymentSessionId}?adresses_id=${addressId}`

"use server";

import network from "../main/network";

type NotificationResponse = {
  data: any;
  error?: any;
};

export default async function notification(): Promise<NotificationResponse> {
    try {
      const api = await network();
      console.log("Axios instance created:", api);
      
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/notification`;
      console.log("Requesting URL:", apiUrl);
  
      const response = await api.get(apiUrl);
      console.log("API response:", response.data);
  
      return {
        data: response.data,
      };
    } catch (error: any) {
      console.error("Error occurred:", error.response?.data || error.message);
      return {
        data: null,
        error: error.response?.data,
      };
    }
  }
  