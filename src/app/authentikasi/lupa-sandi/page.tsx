"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import sendOtp from "@/api/send-otp";

const LupaPassword = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [emailPhone, setEmailPhone] = useState<string>("");

  // Perbaikan tipe FormEvent
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await sendOtp({
        account: emailPhone,
      });

      console.log(response.data);
      console.log(response.data.expires_in);
      if (response.data.code === 200) {
        localStorage.setItem("expires_in", response.data.expires_in);
        router.push(
          `/authentikasi/lupa-sandi/kode-otp?account=${emailPhone}&message=${response.data.message}`
        );
        router.refresh();
      }
    } catch (error: any) {
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl text-center font-nunitoBold">Lupa Kata Sandi</h1>
        <span className="w-full text-center text-md px-10">
          <p className="font-nunitoLight">
            Masukan email atau nomor untuk mereset kata sandi
          </p>
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
        <div className="border w-full h-[53px] rounded-lg px-2 pt-4 bg-[#f1f1f1] relative mx-auto">
          <span className="absolute text-xs left-2 top-0">
            Nomor ponsel atau email
          </span>
          <input
            value={emailPhone}
            onChange={(e) => setEmailPhone(e.target.value)}
            type="text"
            className="font-bold w-full outline-none h-full bg-[#f1f1f1]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#51D7B1] text-white mt-44 rounded-lg h-[50px] flex items-center justify-center"
        >
          <p className="text-white">Reset kata sandi</p>
        </button>
      </form>
    </>
  );
};

export default LupaPassword;
