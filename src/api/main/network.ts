"use server";
import getRefreshToken from "@/cookie/getRefreshToken";
import getToken from "@/cookie/getToken";
import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";

export default async function network(): Promise<AxiosInstance> {
  const token = await getToken();

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
      Authorization: `Bearer ${token?.value}`,
      Accept: "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const newAccessToken = await refreshToken();

        if (newAccessToken) {
          api.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest); // Retry the original request with new token
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}

async function refreshToken() {
  try {
    const refreshToken = await getRefreshToken();

    if (!refreshToken?.value) {
      throw new Error("Refresh token not found");
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/refresh-token`, // Assuming your refresh token endpoint
      {
        refresh_token: refreshToken.value,
      }
    );

    const newAccessToken = response.data.data.access_token;
    const newRefreshToken = response.data.data.refresh_token;
    const exp = 18000;

    // You might need to update cookies here if you're on the client-side.
    // Use client-side cookie handling mechanism, such as js-cookie or Next.js API routes to set cookies.
    // e.g., js-cookie or manually setting cookies in the client if needed

    cookies().set("access_token", response.data.data.access_token, {
      maxAge: exp,
    });
    cookies().set("refresh_token", response.data.data.refresh_token, {
      maxAge: exp,
    });

    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}
