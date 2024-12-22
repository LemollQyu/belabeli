"use client";

// import PostRegistrasi from "@/api/registrasi";
import axios from "axios";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackNavigasi from "../../components/backNavigasi";

import PostRegistrasi from "@/api/register";
import Notifikasi from "@/app/components/authentikasi/notifikasi";
import LayoutUtama from "@/app/layouts/layout-utama";
import BlackScreen from "@/app/components/blackscreen";
import Header from "@/app/layouts/header";

type RegisterResponse = {
  code: number;
  message: string;
  data: {
    username: string;
    email: string;
  };
};

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState<string>("");
  const [phone, setPhone] = useState("");

  const [resError, setResError] = useState<any>(null);
  const [resData, setResData] = useState<any>(null);

  const [ada, setAda] = useState<boolean>(false);

  const [isValidPassword, setIsValidPassword] = useState<boolean | null>(null);
  const [terkonfirmasi, setTerkonfirmasi] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  // Fungsi untuk mengecek apakah password mengandung huruf kapital, angka, dan karakter khusus
  const checkPasswordStrength = (value: string): boolean => {
    const capitalRegex = /[A-Z]/; // Huruf kapital
    const numberRegex = /[0-9]/; // Angka
    const specialCharRegex = /[!@#$%^&*()_+|}{":?><,./';\][\\=-]/; // Karakter khusus

    // Mengembalikan true jika password mengandung huruf kapital, angka, dan karakter khusus
    return (
      capitalRegex.test(value) &&
      numberRegex.test(value) &&
      specialCharRegex.test(value)
    );
  };

  const [filterPassCapital, setFilterPassCapital] = useState<boolean>(false);
  const [filterPassNumber, setFilterPassNumber] = useState<boolean>(false);
  const [filterPassCharacter, setFilterPassCharacter] =
    useState<boolean>(false);
  const [filterPanjangPass, setFilterPanjangPass] = useState<boolean>(false);

  // Event handler untuk perubahan input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setPassword(value);
    console.log(value);

    //  data untuk huruf kapital

    const capitalRegex = /[A-Z]/;
    console.log("apakah ada huruf kapital", capitalRegex.test(value));
    setFilterPassCapital(capitalRegex.test(value));

    // data untuk number

    const numberRegex = /[0-9]/; // Angka
    console.log("apakah ada number = ", numberRegex.test(value));
    setFilterPassNumber(numberRegex.test(value));

    const specialCharRegex = /[!@#$%^&*()_+|}{":?><,./';\][\\=-]/; // Karakter khusus
    console.log("apakah ada karakter = ", specialCharRegex.test(value));
    setFilterPassCharacter(specialCharRegex.test(value));

    if (value.length >= 5) {
      setFilterPanjangPass(true);
    } else {
      setFilterPanjangPass(false);
    }

    setIsValidPassword(checkPasswordStrength(value)); // Update status validitas password
  };

  console.log(
    "data filter pass capital, character, Number = ",
    filterPassCapital,
    filterPassCharacter,
    filterPassNumber
  );

  const CekPassDanKonfPass = () => {
    if (konfirmasiPassword == "" || password == "") {
      setTerkonfirmasi(false);
      return (
        <>
          {/* <p className="text-[10px] font-nunito text-red-500">
            Tidak boleh kosong
          </p> */}
        </>
      );
    } else if (konfirmasiPassword == password) {
      setTerkonfirmasi(true);
      return (
        <>
          {/* <p className="text-[10px] font-nunito text-[#51D7B1]">
            Terkonfirmasi
          </p> */}
        </>
      );
    } else {
      setTerkonfirmasi(false);
      return (
        <>
          <p className="text-[12px] font-nunito text-red-500">
            Kata Sandi Tidak Cocok
          </p>
        </>
      );
    }
  };
  // console.log(hasCapitalLetter);

  const handleCloseNotifikasi = (value: boolean) => {
    setAda(value);

    router.push("/authentikasi/login");
  };

  const router = useRouter();

  const handleSubmit = async () => {
    setResError(null);

    // console.log({ name, phone, email, password, konfirmasiPassword });

    try {
      const response = await PostRegistrasi({
        email: email,
        name: name,
        phone: phone,
        password: password,
        password_confirmation: password,
      });

      // console.log(response.data);

      const dataResponse: RegisterResponse = response.data;
      console.log(dataResponse);
      setResData(dataResponse);

      if (dataResponse.code == 201) {
        setAda(true);

        // router.refresh();
      }
    } catch (error: any) {
      console.log(error.response);
      setResError(error.response.data);
    }
  };

  // cek password
  // console.log("password : ", password);

  // tutup cek password

  useEffect(() => {
    console.log(resError);
  }, [resError]);

  const PasswordKriteria = () => {
    if (password == "") {
      return <></>;
    } else if (isValidPassword) {
      return (
        <>
          {/* <p className="text-[10px] text-[#51D7B1] font-nunito">
            Password Kuat
          </p> */}
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <LayoutUtama>
        <Header children={undefined} />
        <div className="pt-5 flex flex-col gap-3 mt-20 font-nunito top-14 ">
          <div className="flex flex-col gap-2">
            <h1 className="text-center text-xl  font-nunitoBold ">
              Daftar sekarang
            </h1>
            <p className="text-center font-extralight text-sm">
              Silakan isi detail dan buat akun
            </p>
          </div>
          <form
            action={handleSubmit}
            className="flex mt-4 flex-col gap-[24px] px-5"
          >
            <div className="border w-full h-[47px] rounded-lg px-2 pt-4 bg-[#f1f1f1] relative">
              <span className="absolute text-xs left-2 top-1">
                Nama lengkap
              </span>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="font-bold w-full outline-none h-full bg-[#f1f1f1]"
              />
              <div className="w-full pt-1">
                <p className="text-red-400 text-xs underline">
                  {resError && resError.error?.username?.[0] !== undefined
                    ? resError.error.username[0]
                    : ""}
                </p>
              </div>
            </div>

            <div className="border w-full h-[47px] rounded-lg px-2 pt-4 bg-[#f1f1f1] relative">
              <span className="absolute text-xs left-2 top-1">No Telepon</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                className="font-bold w-full outline-none h-full bg-[#f1f1f1]"
              />
              <div className="w-full pt-1">
                <p className="text-red-400 text-xs underline">
                  {resError && resError.error?.phone?.[0] !== undefined
                    ? resError.error.phone[0]
                    : ""}
                </p>
              </div>
            </div>

            <div className="border w-full h-[47px] rounded-lg px-2 pt-4 bg-[#f1f1f1] relative">
              <span className="absolute text-xs left-2 top-1">Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="font-bold w-full h-full bg-[#f1f1f1] outline-none"
              />
              <div className="w-full pt-1">
                <p className="text-red-400 text-xs underline">
                  {resError && resError.error?.email?.[0] !== undefined
                    ? resError.error.email[0]
                    : ""}
                </p>
              </div>
            </div>

            <div className="border w-full h-[47px] rounded-lg px-2 pt-4 bg-[#f1f1f1] relative">
              <span className="absolute text-xs left-2 top-1">Password</span>
              <input
                value={password}
                onChange={handleInputChange}
                className="font-bold w-full h-full bg-[#f1f1f1] outline-none"
                type={isPasswordVisible ? "text" : "password"}
              />
              {isPasswordVisible ? (
                <button
                  type="button"
                  className="absolute right-3 top-4"
                  onClick={togglePasswordVisibility}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62283 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87993 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.503 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"
                      fill="black"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  className="absolute right-3 top-4"
                  onClick={togglePasswordVisibility}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M12.0003 3.0658C17.3924 3.0658 21.8784 6.94556 22.8189 12.0658C21.8784 17.186 17.3924 21.0658 12.0003 21.0658C6.60812 21.0658 2.12215 17.186 1.18164 12.0658C2.12215 6.94556 6.60812 3.0658 12.0003 3.0658ZM12.0003 19.0658C16.2359 19.0658 19.8603 16.1178 20.7777 12.0658C19.8603 8.01383 16.2359 5.0658 12.0003 5.0658C7.7646 5.0658 4.14022 8.01383 3.22278 12.0658C4.14022 16.1178 7.7646 19.0658 12.0003 19.0658ZM12.0003 16.5658C9.51498 16.5658 7.50026 14.5511 7.50026 12.0658C7.50026 9.58052 9.51498 7.5658 12.0003 7.5658C14.4855 7.5658 16.5003 9.58052 16.5003 12.0658C16.5003 14.5511 14.4855 16.5658 12.0003 16.5658ZM12.0003 14.5658C13.381 14.5658 14.5003 13.4465 14.5003 12.0658C14.5003 10.6851 13.381 9.5658 12.0003 9.5658C10.6196 9.5658 9.50026 10.6851 9.50026 12.0658C9.50026 13.4465 10.6196 14.5658 12.0003 14.5658Z"
                      fill="black"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="w-full">
              <p className="text-red-400 text-xs underline">
                {resError && resError.error?.password?.[0] !== undefined
                  ? resError.error.password[0]
                  : ""}
              </p>
            </div>

            <div className="border w-full -mt-5 h-[47px] rounded-lg px-2 pt-4 bg-[#f1f1f1] relative">
              <span className="absolute text-xs left-2 top-1">
                Konfirmasi Password
              </span>
              <input
                value={konfirmasiPassword}
                onChange={(e) => setKonfirmasiPassword(e.target.value)}
                className="font-bold w-full h-full bg-[#f1f1f1] outline-none"
                type={isConfirmPasswordVisible ? "text" : "password"}
              />
              {isConfirmPasswordVisible ? (
                <button
                  type="button"
                  className="absolute right-3 top-4"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62283 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87993 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.503 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"
                      fill="black"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  className="absolute right-3 top-4"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M12.0003 3.0658C17.3924 3.0658 21.8784 6.94556 22.8189 12.0658C21.8784 17.186 17.3924 21.0658 12.0003 21.0658C6.60812 21.0658 2.12215 17.186 1.18164 12.0658C2.12215 6.94556 6.60812 3.0658 12.0003 3.0658ZM12.0003 19.0658C16.2359 19.0658 19.8603 16.1178 20.7777 12.0658C19.8603 8.01383 16.2359 5.0658 12.0003 5.0658C7.7646 5.0658 4.14022 8.01383 3.22278 12.0658C4.14022 16.1178 7.7646 19.0658 12.0003 19.0658ZM12.0003 16.5658C9.51498 16.5658 7.50026 14.5511 7.50026 12.0658C7.50026 9.58052 9.51498 7.5658 12.0003 7.5658C14.4855 7.5658 16.5003 9.58052 16.5003 12.0658C16.5003 14.5511 14.4855 16.5658 12.0003 16.5658ZM12.0003 14.5658C13.381 14.5658 14.5003 13.4465 14.5003 12.0658C14.5003 10.6851 13.381 9.5658 12.0003 9.5658C10.6196 9.5658 9.50026 10.6851 9.50026 12.0658C9.50026 13.4465 10.6196 14.5658 12.0003 14.5658Z"
                      fill="black"
                    />
                  </svg>
                </button>
              )}

              <div className="w-full flex justify-between  items-center mt-2">
                <PasswordKriteria />
                <CekPassDanKonfPass />
              </div>
            </div>

            {/* <p className="text-sm font-extralight">
              Kata sandi minimal 5 karakter
            </p> */}

            <p className="text-red-400 text-xs underline">
              {resError && resError.code == 500 ? resError.message : ""}
            </p>

            <ol className="list-disc -mt-5 px-5">
              <li
                className={`${
                  filterPanjangPass ? "text-green-500" : "text-red-500"
                } text-[12px] font-nunito`}
              >
                Minimal 5 karakter
              </li>
              <li
                className={`${
                  filterPassCapital ? "text-green-500" : "text-red-500"
                } text-[12px] font-nunito`}
              >
                Mengandung huruf kapital
              </li>
              <li
                className={`${
                  filterPassNumber ? "text-green-500" : "text-red-500"
                } text-[12px] font-nunito`}
              >
                Mengandung angka
              </li>
              <li
                className={`${
                  filterPassCharacter ? "text-green-500" : "text-red-500"
                } text-[12px] font-nunito`}
              >
                Mengandung karakter unik
              </li>
            </ol>

            {/* <SpanError /> */}
            {/* cek jika password sesuai kriteria */}
            {isValidPassword && terkonfirmasi ? (
              <button className="w-full border bg-[#51D7B1] text-white mt-5 rounded-lg h-[50px] flex items-center justify-center ">
                Daftar
              </button>
            ) : (
              <div className="w-full border bg-[#adadad] text-white mt-5 rounded-lg h-[50px] flex items-center justify-center ">
                Daftar
              </div>
            )}
            {/* tutup sek password */}
          </form>

          <Link href={"/authentikasi/login"}>
            <p className="text-center">
              Sudah punya akun?{" "}
              <span className="font-bold text-blue-500"> Login</span>
            </p>
          </Link>

          <p className="text-center">Atau</p>

          <div className="mx-auto gap-[20px] flex">
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_API_URL_2}/oauth-google`}
              className="w-[44px] h-[44px] rounded-full bg-[#dfdfdf] flex justify-center items-center"
            >
              <img src="/icon/wrapper.png" />
            </Link>
            <Link
              href={"/authentikasi/login"}
              className="w-[44px] h-[44px] rounded-full bg-[#dfdfdf] flex justify-center items-center"
            >
              <img src="/icon/mobile.png" />
            </Link>
          </div>

          {ada && (
            <>
              <Notifikasi
                pesan="Registrasi Berhasil Silahkan Cek Email Anda"
                onClose={handleCloseNotifikasi}
              />
              <BlackScreen />
            </>
          )}
        </div>
      </LayoutUtama>
    </>
  );
};

export default Register;
