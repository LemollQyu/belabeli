"use client";

import deleteToken from "@/cookie/deleteToken";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type PropsLogOut = {
  token: string | undefined;
};

const LogOut = ({ token }: PropsLogOut) => {
  const router = useRouter();

  useEffect(() => {
    console.log("acces: ", token);
  }, [token]);

  // Fungsi untuk mengkonsumsi API logout
  const handleLogout = async (token: string | undefined) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      // Menangani respons logout
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Logout failed");
      }
    } catch (error: any) {
      console.log("error: ", error.response);
      throw error;
    }
  };

  // Event handler untuk logout
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // Memanggil fungsi handleLogout
      const dataResponse = await handleLogout(token);

      console.log("Logout berhasil:", dataResponse);

      await deleteToken();

      // Setelah logout, redirect ke halaman login
      router.push("/authentikasi/login");
      router.refresh();
    } catch (error: any) {
      console.error("Error saat logout:", error);
    }
  };

  return (
    <>
    <button onClick={handleClick} className="flex items-center text-sm text-gray-700 hover:bg-gray-100 rounded-lg p-2 cursor-pointer">
      <span className="mr-3">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"
          fill="#EE443F"
        />
      </svg>
      </span>
      <span>
        <p className="text-sm font-bold text-red-600">Keluar Akun</p>
        <p className="text-xs text-gray-500"></p>
      </span>
    </button>
    </>
  );
};

export default LogOut;
