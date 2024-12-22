"use server";

import network from "../main/network";

export default async function getConversation(url: string) {
  try {
    const api = await network(); // Get Axios instance with interceptors
    const response = await api.get(url); // Fetch data
    return { data: response.data, error: null }; // Return data and no error
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data || error.message || "Unknown error",
    }; // Return error
  }
}
