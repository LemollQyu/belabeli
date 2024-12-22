"use client";

export const dynamic = "force-dynamic";

import { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import verifyOtp from "@/api/verifikasi-otp";
import Notifikasi from "@/app/components/authentikasi/notifikasi";
import BlackScreen from "@/app/components/blackscreen";
import sendOtp from "@/api/send-otp";

export default function OtpInput() {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const searchParams = useSearchParams();
  const emailPhone = searchParams.get("account");
  const router = useRouter();
  const [isNotifikasi, setIsNotifikasi] = useState<boolean>(false);
  const [isNotifikasiKirimUlangOTP, setIsNotifikasiKirimUlangOTP] =
    useState<boolean>(false);

  // Inisialisasi nilai expires dari localStorage
  const [expiresIn, setExpiresIn] = useState<string | null>(null);
  const [seconds, setSeconds] = useState<number>(0);
  const [resErr, setResErr] = useState<any>(null);
  const [resData, setResData] = useState<any>(null);

  const noHandphone = searchParams.get("account");

  const message = searchParams.get("message");

  useEffect(() => {
    const expires = localStorage.getItem("expires_in");
    setExpiresIn(expires);

    // Mengonversi string ke number untuk inisialisasi detik countdown
    const detik = Number(expires);
    setSeconds(detik);
  }, []);

  // Timer countdown yang memantau perubahan `seconds`
  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timer); // Bersihkan interval setelah selesai
    }
  }, [seconds]);

  // Format waktu untuk menampilkan detik (contoh: 00:59)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    element: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
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

  const [dataResponse, setDataResponse] = useState<any>({});

  async function handleAction(event: React.FormEvent) {
    event.preventDefault();

    const data = { otp };

    let tempString: string = "";

    data.otp.forEach((item) => {
      tempString += item;
    });

    try {
      const response = await verifyOtp({
        account: emailPhone || "",
        otp: tempString || "",
      });

      if (response.data.code == 200) {
        setIsNotifikasi(true);
      }

      setDataResponse(response.data);

      if (response.data.code == 200 && !isNotifikasi) {
        // router.push(
        //   `/authentikasi/lupa-sandi/sandi-baru?otpId=${response.data.data.otp_id}&userId=${response.data.data.user_id}`
        // );
      }
    } catch (error: any) {
      console.log(error.response);
      setResErr(error.response);
    }
  }

  const handleKirimUlang = async (e: any) => {
    e.preventDefault();

    try {
      const response = await sendOtp({
        account: emailPhone || "",
      });

      setSeconds(response.data.expires_in);
      setResData(response.data);

      if (response.data.code == 200) {
        setIsNotifikasiKirimUlangOTP(true);
      }

      console.log(response.data);
    } catch (err: any) {
      console.log(err.response);
    }
  };

  function handleCloseNotifikasi() {
    setIsNotifikasi(false);
    router.push(
      `/authentikasi/lupa-sandi/sandi-baru?otpId=${dataResponse?.data.otp_id}&userId=${dataResponse?.data.user_id}`
    );

    console.log(dataResponse);
  }

  function handleCloseNotifikasiKirimUlangOTP() {
    setIsNotifikasiKirimUlangOTP(false);
  }

  useEffect(() => {
    console.log(resErr?.data);
    console.log(resData);
  }, []);

  // console.log(resErr?.data);

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl text-center font-nunitoBold">Verifikasi OTP</h1>
        <span className="w-full text-center text-md px-10">
          <p className="font-nunitoLight">{message}</p>
        </span>
      </div>

      <form onSubmit={handleAction} className="flex flex-col gap-4 w-full mt-8">
        <p className="text-center font-nunitoBold">Kode OTP</p>
        <div className="w-full h-[53px] flex justify-between items-center rounded-lg px-2 pt-4 relative">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              className="w-[65px] h-[56px] text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-[#f1f1f1] text-lg"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el: any) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
        <div className=" mt-2 h-[12px] flex items-center justify-end w-full px-5">
          <p className="text-red-500 text-[10px] ">
            {resErr && resErr.data.error?.otp?.[0] !== undefined
              ? resErr.data.error.otp[0]
              : ""}{" "}
          </p>

          <p className="text-red-500 text-[10px] ">
            {resErr && resErr.data.message !== undefined
              ? resErr.data.message
              : ""}{" "}
          </p>
        </div>
        <button className="w-full text-white bg-[#51D7B1] border mt-5 rounded-lg h-[50px] flex items-center justify-center">
          Reset kata sandi
        </button>
      </form>
      <div className="w-full mt-2 flex justify-end items-center px-5">
        {seconds <= 0 ? (
          <p className="font-nunito text-[10px] text-red-500">
            Kode kadaluarsa
          </p>
        ) : (
          <p className="font-nunitoLight text-[10px]">{formatTime(seconds)}</p>
        )}
      </div>

      <span className="inline-block flex flex-col justify-center items-center">
        {seconds > 0 ? (
          <button className="font-nunito">Kirim code ulang</button>
        ) : (
          <button
            onClick={handleKirimUlang}
            className="text-blue-400 font-nunito"
          >
            Kirim code ulang
          </button>
        )}
      </span>

      {isNotifikasi && (
        <>
          <Notifikasi
            pesan="Kode OTP benar, Silahkan masukan password baru"
            onClose={handleCloseNotifikasi}
          />
          <BlackScreen />
        </>
      )}

      {isNotifikasiKirimUlangOTP && (
        <>
          <Notifikasi
            pesan="Kode OTP berhasil dikirim ulang, Silahkan cek kembali"
            onClose={handleCloseNotifikasiKirimUlangOTP}
          />
          <BlackScreen />
        </>
      )}
    </>
  );
}
