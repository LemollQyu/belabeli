"use client";
import { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// import verifyOtp from "@/api/verifikasi-otp";
import LayoutUtama from '@/app/layouts/layout-utama';
import Header from '@/app/layouts/header';
import Link from "next/link";
import verifyNoTelpProfile from "@/api/settings/postVerifyOTPWhatsApp";

export default function OtpInput() {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const searchParams = useSearchParams();
  const emailPhone = searchParams.get("account");
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const [emailProfile, setEmailProfile] = useState<string>("");
  // Inisialisasi nilai expires dari localStorage
  const [expiresIn, setExpiresIn] = useState<string | null>(null);
  const [seconds, setSeconds] = useState<number>(0); // State untuk detik countdown
 
  const q = searchParams.get('expires');
  const emailParam = searchParams.get('e');

  useEffect(() => {

    setEmailProfile(emailParam || '');

    setExpiresIn(q);

    // Mengonversi string ke number untuk inisialisasi detik countdown
    const detik = Number(q);
    setSeconds(detik);
  }, [emailParam, q]);

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

  async function handleAction(event: React.FormEvent) {
    event.preventDefault();
    const data = { otp };
    let tempString: string = "";

    data.otp.forEach((item) => {
      tempString += item;
    });

    try {
      // const response = await verifyOtp({
      //   account: emailPhone || "",
      //   otp: tempString || "",
      // });

      // if (response.data.code == 200) {
      //   router.push(
      //     `/authentikasi/sandi-baru?otpId=${response.data.data.otp_id}}&userId=${response.data.data.user_id}`
      //   );
      // }
    } catch (error: any) {
      console.log(error.response);
    }
  }

  const isOtpComplete = otp.every(value => value !== "");
  
  const handleButtonClick = async () => {
    const otpString = otp.join("");

    console.log('e', emailProfile)
    console.log('otp', otpString)

    const response = await verifyNoTelpProfile({ no_telephone: emailProfile, otp: otpString });
    
    // console.log("response request email otp", response.error);
    console.log("response request no_telp otp success", response.data);
    setShowPopup(true)
    
    setTimeout(() => setShowPopup(false), 3000);
    
    setTimeout(() => 
      router.push(`/user-settings/profile/`)
      , 1000);// Pop-up automatically hides after 3 seconds
  
    // Uncomment if redirection is needed
  };
  

  return (
    <>
      <LayoutUtama>
        <Header title="Verifikasi Akun" children={undefined} />
        <div className="container w-full max-w-[400px] mx-auto p-4 font-nunito mt-20 flex flex-col justify-center items-center">
          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-xl text-center font-nunitoBold">
              Verifikasi OTP
            </h1>
            <span className="w-full text-center text-md mt-2 px-8 text-gray-500">
              <p className="font-nunito ">Untuk keamanan akun, mohon verifikasi identitas anda dengan kode OTP yang telah dikirimkan ke WhatsApp</p>
            </span>
          </div>

          <form onSubmit={handleAction} className="flex flex-col gap-4 w-full items-center">
            <p className="text-center font-nunitoBold mt-16 text-[18px]">Kode OTP</p>
            <div className="w-full h-[53px] flex justify-between items-center rounded-lg px-2 pt-4 relative">
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
          <div className="w-full flex flex-col items-center">
              <button
                className={`w-full bg-[#51D7B1] text-white rounded-lg h-[50px] flex items-center justify-center mt-3 ${isOtpComplete ? '' : 'bg-gray-300 cursor-not-allowed'}`}
                disabled={!isOtpComplete}
                onClick={handleButtonClick}
              >
                Lanjutkan
              </button>

              {showPopup && (
                <div
                  className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
                  onClick={() => setShowPopup(false)} // Handler untuk menutup popup saat mengklik di luar border
                >
                  <div
                    className="w-[340px] h-[142px] bg-white rounded-xl shadow-md flex flex-col items-center p-4 space-y-4"
                    onClick={(e) => e.stopPropagation()} // Mencegah penutupan popup saat mengklik di dalam area popup
                  >
                    {/* Judul Popup */}
                    <div className="text-black text-base font-bold font-['Nunito']">
                      Notifikasi
                    </div>
                    
                    {/* Garis Pemisah */}
                    <div className="w-full border-t border-[#b3b3b3]"></div>
                    
                    {/* Pesan Popup */}
                    <div className="text-center text-black text-sm font-semibold font-['Nunito']">
                      Verifikasi Nomor Telepon Berhasil
                    </div>
                  </div>
                </div>
              )}

            </div>
          </form>

          <span className="text-[14px] font-nunito flex flex-col justify-center items-center text-gray-500 mt-6">
            Belum menerima kode?{" "}
            <button className="text-blue-400 font-nunito" disabled={seconds > 0}>
              Kirim ulang kode
            </button>
          </span>
        </div>
      </LayoutUtama>
    </>
  );
}
