"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import LayoutAuth from "../layouts/layoutAuth";
import callbackAuthGoogle from "@/api/callbackAuthGoogle";
import { useRouter, useSearchParams } from "next/navigation";
import saveAccount from "@/cookie/saveAccount";

type LoginResponse = {
  code: number;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    username: string;
    email: string;
    phone: string;
  };
};

const CallbackGoogle = () => {
  const searchParam = useSearchParams();

  const token = searchParam.get("token");

  const router = useRouter();

  console.log("token: ", token);

  useEffect(() => {
    async function fetchAuthGoogle() {
      try {
        console.log({
          token,
        });
        const response = await callbackAuthGoogle({
          token: token || "",
        });

        const loginResponse: LoginResponse = response.data;
        await saveAccount(loginResponse.data);

        console.log(loginResponse);

        router.push("/");
      } catch (error: any) {
        console.log(error.response);
      }
    }

    fetchAuthGoogle();
  }, []);
  return (
    <>
      <LayoutAuth>
        <h1>Loading...</h1>
      </LayoutAuth>
    </>
  );
};

export default CallbackGoogle;
