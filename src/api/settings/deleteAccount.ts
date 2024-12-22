"use server";

import network from "../main/network";

type Account = {
  otps_id: string;
};

export default async function deleteAccount({ otps_id }: Account) {
  try {
    const api = await network();

    // Use query parameters to send the otps_id
    const response = await api.delete(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user`,
      {
        params: { otps_id }, // Pass otps_id as a query parameter
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error; // Re-throw the error or return a formatted error response
  }
}