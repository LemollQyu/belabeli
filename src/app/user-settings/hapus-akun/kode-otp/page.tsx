"use client";
import { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import verifyOtp from "@/api/verifikasi-otp";
import LayoutUtama from '@/app/layouts/layout-utama';
import Header from '@/app/layouts/header';
import Link from "next/link";
import verifyOTPGantiSandi from "@/api/settings/postVerifyOTPGantiSandi";
import requestOTPGantiSandi from "@/api/settings/postRequestOTPGantiSandi";

export default function OtpInput() {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const searchParams = useSearchParams();
  const emailPhone = searchParams.get("account");
  const router = useRouter();

  const [expiresIn, setExpiresIn] = useState<string | null>(null);
  const [seconds, setSeconds] = useState<number>(0);
  const q = searchParams.get('expires');
  const emailParam = searchParams.get('e');

  const oldPassword = searchParams.get('p') ?? "";

  const HandleRequestOTPEmail = async () => {
    const response = await requestOTPGantiSandi({ kata_sandi: oldPassword });
    console.log("response request email otp", response.error);
    console.log("response request email otp success", response.data);
    window.location.replace(`/pengaturan/verif-otp?p=${oldPassword}&expires=${response.data.expires_in}`);
  };

  useEffect(() => {
    const expires = q;
    setExpiresIn(expires);
    const detik = Number(expires);
    setSeconds(detik);
  }, []);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [seconds]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (element: ChangeEvent<HTMLInputElement>, index: number) => {
    if (isNaN(Number(element.target.value))) return;
    const newOtp = [...otp];
    newOtp[index] = element.target.value;
    setOtp(newOtp);

    if (element.target.value !== "" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  async function handleAction() {
    const data = { otp: otp.join('') };

    try {
      const response = await verifyOTPGantiSandi({
        otp: data.otp || "",
      });

      console.log(response?.data.data.otp_id)
      
      router.push(`/user-settings/hapus-akun/hapus?otpId=${response?.data?.data.otp_id}`);
    } catch (error: any) {
      console.log(error.response);
    }
  }

  const isOtpComplete = otp.every(value => value !== "");

  return (
    <LayoutUtama>
      <Header title=" " children={undefined} />
      <div className="container w-full max-w-[400px] mx-auto p-4 font-nunito mt-20 flex flex-col justify-center items-center">
        <div className="flex flex-col gap-2 items-center">
        <div className="w-[190px] h-[18px] relative mb-4">
          <div className="w-[190px] h-[18px] left-0 top-0 absolute bg-[#d9d9d9] rounded-xl" />
          <div className="w-[124px] h-3.5 left-[2px] top-[2px] absolute bg-[#51D7B1] rounded-xl" />
        </div>
          <h1 className="mt-10 text-xl text-center font-nunitoBold">Verifikasi OTP</h1>
          <span className="w-full text-center text-md mt-2 px-8 text-gray-500">
            <p className="font-nunito">Cek email Anda</p>
            <p className="font-nunito">untuk mendapatkan kode OTP</p>
          </span>
        </div>

        <form className="flex flex-col gap-4 w-full items-center">
          <p className="text-center font-nunitoBold mt-8 text-[18px]">Kode OTP</p>
          <div className="w-full h-[53px] flex justify-between items-center px-2 pt-4 relative">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                className="w-[65px] h-[56px] text-center border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 bg-[#f1f1f1] text-lg"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el: any) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>
          <div className="w-full flex justify-center text-[14px] items-center mt-6">
            <p className="font-nunito text-center text-gray-500">
              OTP Kadaluarsa dalam <span className="text-blue-500">{formatTime(seconds)}</span>
            </p>
          </div>
          {/* <Link href="/pengaturan/keamanan-akun" className="w-full"> */}
          <button
            type="button"
            className={`w-full bg-[#51D7B1] text-white rounded-lg h-[50px] flex items-center justify-center mt-3 ${isOtpComplete ? '' : 'bg-gray-300 cursor-not-allowed'}`}
            onClick={handleAction}
            disabled={!isOtpComplete}
          >
            Kirim
          </button>
          {/* </Link> */}
        </form>

        <span className="text-[14px] font-nunito flex flex-col justify-center items-center text-gray-500 mt-6">
          Belum menerima kode?{" "}
          <button type="button" onClick={HandleRequestOTPEmail} className="text-blue-400 font-nunito" disabled={seconds > 0}>
            Kirim ulang kode
          </button>
        </span>
      </div>
    </LayoutUtama>
  );
}
