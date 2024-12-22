"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LayoutUtama from "../layouts/layout-utama";
import Header from "../layouts/header";
import getToken from "@/cookie/getToken";
import LogOut from "../components/logout";
import getUserProfile from "@/api/settings/getUserProfile";

const GetToken = async () => {
  const access_token = await getToken();
};

const GeneralSettings: React.FC = () => {
  const router = useRouter();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [token, setToken] = useState<string>("");

  //function fetching Log Out
  useEffect(() => {
    async function get() {
      const access_token = await getToken();
      setToken(access_token?.value || "");
    }
    get();
  }, []);

  const handleBack = () => {
    router.back();
  };
  const handleClearCache = () => {
    setIsPopupVisible(true); // Tampilkan pop-up saat tombol diklik
  };

  const closePopup = () => {
    setIsPopupVisible(false); // Tutup pop-up
  };

  const handleContinue = () => {
    // Logika untuk melanjutkan setelah mengonfirmasi
    closePopup();
  };
  const handleCancel = () => {
    // Logika untuk batal
    console.log("Aksi dibatalkan");
    closePopup(); // Menutup popup setelah batal
  };

  const [name, setName] = useState("Loading...");
  const [email, setEmail] = useState("Loading...");
  const [phone, setPhone] = useState("Loading...");
  const [image, setImage] = useState<string | null>(null);
  const [loadingImaage, setLoadingImage] = useState<boolean>(false);

  useEffect(() => {
    setLoadingImage(true);
    async function HandleGetDataUserProfile() {
      const response = await getUserProfile();
      console.log("get user data", response.data);
      setName(response.data?.name ? response.data?.name : "Belum diatur");
      setEmail(response.data?.email ? response.data?.email : "Belum diatur");
      setPhone(response.data?.phone ? response.data?.phone : "Belum diatur");
      setImage(response.data?.photo);
      setLoadingImage(false);
    }
    HandleGetDataUserProfile();
  }, []);

  return (
    <>
      <LayoutUtama>
        <Header title="Pengaturan" children={undefined} />
        <div className="container w-[400px] mx-auto p-4 font-nunito mt-20">
          {/* Profile Section */}
          <Link href="/user-settings/profile">
            <div className="bg-white border-2 rounded-lg px-6 py-4 mb-6 shadow-md">
              <div className="flex items-center">
                <img
                  src={
                    loadingImaage
                      ? "/1488.gif"
                      : image === "https://picsum.photos/500/500"
                      ? image
                      : `${process.env.NEXT_PUBLIC_BASE_API_URL_2}/storage/${image}`
                  }
                  className="rounded-full"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <div className="ml-4">
                  <h2 className="text-[16px] font-bold text-gray-800">
                    {name}
                  </h2>
                  <p className="text-gray-600 text-[14px]">{phone}</p>
                  <p className="text-gray-600 text-[14px]">{email}</p>
                </div>
              </div>
            </div>
          </Link>
          {/* Account Settings */}
          <div className="bg-white rounded-lg border-2 mt-6 p-4 shadow-md">
            <h3 className="text-sm font-semibold mb-3 text-[var(--Light-Text-Color)] font-nunito leading-[150%] tracking-[-0.368px]">
              Pengaturan Akun
            </h3>

            <div className="flex flex-col space-y-2">
              {/* Address Settings */}
              <Link href="/pengaturan/tambah-alamat">
                <ActivityItem
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 13.2422V20H22V22H2V20H3V13.2422C1.79401 12.435 1 11.0602 1 9.5C1 8.67286 1.22443 7.87621 1.63322 7.19746L4.3453 2.5C4.52393 2.1906 4.85406 2 5.21132 2H18.7887C19.1459 2 19.4761 2.1906 19.6547 2.5L22.3575 7.18172C22.7756 7.87621 23 8.67286 23 9.5C23 11.0602 22.206 12.435 21 13.2422ZM19 13.9725C18.8358 13.9907 18.669 14 18.5 14C17.2409 14 16.0789 13.478 15.25 12.6132C14.4211 13.478 13.2591 14 12 14C10.7409 14 9.5789 13.478 8.75 12.6132C7.9211 13.478 6.75911 14 5.5 14C5.331 14 5.16417 13.9907 5 13.9725V20H19V13.9725ZM5.78865 4L3.35598 8.21321C3.12409 8.59843 3 9.0389 3 9.5C3 10.8807 4.11929 12 5.5 12C6.53096 12 7.44467 11.3703 7.82179 10.4295C8.1574 9.59223 9.3426 9.59223 9.67821 10.4295C10.0553 11.3703 10.969 12 12 12C13.031 12 13.9447 11.3703 14.3218 10.4295C14.6574 9.59223 15.8426 9.59223 16.1782 10.4295C16.5553 11.3703 17.469 12 18.5 12C19.8807 12 21 10.8807 21 9.5C21 9.0389 20.8759 8.59843 20.6347 8.19746L18.2113 4H5.78865Z"
                        fill="black"
                      />
                    </svg>
                  }
                  label="Daftar Alamat"
                  description="Atur alamat pengiriman belanjaan"
                />
              </Link>

              {/* Bank Settings */}
              <Link href="/pengaturan/rekening-bank">
                <ActivityItem
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.0049 4.00293C18.08 4.00293 23.0049 6.68922 23.0049 10.0029V14.0029C23.0049 17.3167 18.08 20.0029 12.0049 20.0029C6.03824 20.0029 1.18114 17.4117 1.00957 14.1799L1.00488 14.0029V10.0029C1.00488 6.68922 5.92975 4.00293 12.0049 4.00293ZM12.0049 16.0029C8.28443 16.0029 4.99537 14.9955 3.00466 13.4534L3.00488 14.0029C3.00488 15.8851 6.88751 18.0029 12.0049 18.0029C17.0156 18.0029 20.8426 15.9725 20.9999 14.1209L21.0049 14.0029L21.0061 13.4526C19.0155 14.9951 15.726 16.0029 12.0049 16.0029ZM12.0049 6.00293C6.88751 6.00293 3.00488 8.12072 3.00488 10.0029C3.00488 11.8851 6.88751 14.0029 12.0049 14.0029C17.1223 14.0029 21.0049 11.8851 21.0049 10.0029C21.0049 8.12072 17.1223 6.00293 12.0049 6.00293Z"
                        fill="black"
                      />
                    </svg>
                  }
                  label="Rekening Bank"
                  description="Tarik saldo ke rekening tujuan"
                />
              </Link>
              {/* Account Security */}
              <Link href="/pengaturan/ubah-password">
                <ActivityItem
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM5 12V20H19V12H5ZM11 14H13V18H11V14ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17Z"
                        fill="black"
                      />
                    </svg>
                  }
                  label="Keamanan Akun"
                  description="Kata sandi, PIN, & verifikasi data diri"
                />
              </Link>
              {/* Theme Settings */}
              <Link href="/pengaturan/tema-tampilan">
                <ActivityItem
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 4.99707V7.99707H19V4.99707H5ZM4 2.99707H20C20.5523 2.99707 21 3.44479 21 3.99707V8.99707C21 9.54936 20.5523 9.99707 20 9.99707H4C3.44772 9.99707 3 9.54936 3 8.99707V3.99707C3 3.44479 3.44772 2.99707 4 2.99707ZM6 11.9971H12C12.5523 11.9971 13 12.4448 13 12.9971V15.9971H14V21.9971H10V15.9971H11V13.9971H5C4.44772 13.9971 4 13.5494 4 12.9971V10.9971H6V11.9971ZM17.7322 13.7293L19.5 11.9616L21.2678 13.7293C22.2441 14.7056 22.2441 16.2886 21.2678 17.2649C20.2915 18.2412 18.7085 18.2412 17.7322 17.2649C16.7559 16.2886 16.7559 14.7056 17.7322 13.7293Z"
                        fill="black"
                      />
                    </svg>
                  }
                  label="Tema Tampilan"
                  description="Ubah tampilan mode gelap terang"
                />
              </Link>
              {/* Notifications Settings */}
              <Link href="/pengaturan/notifikasi">
                <ActivityItem
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 18H19V11.0314C19 7.14806 15.866 4 12 4C8.13401 4 5 7.14806 5 11.0314V18ZM12 2C16.9706 2 21 6.04348 21 11.0314V20H3V11.0314C3 6.04348 7.02944 2 12 2ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"
                        fill="black"
                      />
                    </svg>
                  }
                  label="Notifikasi"
                  description="Kelola pengaturan notifikasi"
                />
              </Link>
              {/* Privacy Settings */}
              <Link href="/pengaturan/privasi">
                <ActivityItem
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.78307 2.82598L12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598ZM5 4.60434V13.7889C5 15.1263 5.6684 16.3752 6.7812 17.1171L12 20.5963L17.2188 17.1171C18.3316 16.3752 19 15.1263 19 13.7889V4.60434L12 3.04879L5 4.60434ZM12 11C10.6193 11 9.5 9.88071 9.5 8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5C14.5 9.88071 13.3807 11 12 11ZM7.52746 16C7.77619 13.75 9.68372 12 12 12C14.3163 12 16.2238 13.75 16.4725 16H7.52746Z"
                        fill="black"
                      />
                    </svg>
                  }
                  label="Privasi"
                  description="Kelola privasi profil anda"
                />
              </Link>
              {/* Cache Settings */}
              <div onClick={handleClearCache}>
                <ActivityItem
                  icon={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 6H18V19C18 19.5523 17.5523 20 17 20H3C2.44772 20 2 19.5523 2 19V6ZM4 8V18H16V8H4ZM7 10H9V16H7V10ZM11 10H13V16H11V10ZM5 3V1C5 0.44772 5.44772 0 6 0H14C14.5523 0 15 0.44772 15 1V3H20V5H0V3H5ZM7 2V3H13V2H7Z"
                        fill="black"
                      />
                    </svg>
                  }
                  label="Bersihkan Cache"
                  description="Bersihkan cache"
                />
              </div>
              {/* Pop-up Konfirmasi */}
              {isPopupVisible && (
                <div
                  className="fixed inset-0 z-50 flex justify-center items-end"
                  onClick={closePopup}
                >
                  <div
                    className="bg-white w-full max-w-md h-[340px] p-6 rounded-t-[24px] shadow-lg transform transition-transform duration-300 ease-out translate-y-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="text-center flex flex-col items-center">
                      <svg
                        width="100"
                        height="100"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.6667 33.333H83.3333V87.4997C83.3333 89.8009 81.4679 91.6663 79.1667 91.6663H20.8333C18.5322 91.6663 16.6667 89.8009 16.6667 87.4997V33.333ZM29.1667 20.833V12.4997C29.1667 10.1985 31.0322 8.33301 33.3333 8.33301H66.6667C68.9679 8.33301 70.8333 10.1985 70.8333 12.4997V20.833H91.6667V29.1663H8.33334V20.833H29.1667ZM37.5 16.6663V20.833H62.5V16.6663H37.5ZM37.5 49.9997V74.9997H45.8333V49.9997H37.5ZM54.1667 49.9997V74.9997H62.5V49.9997H54.1667Z"
                          fill="url(#paint0_linear_3137_14689)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_3137_14689"
                            x1="8.33334"
                            y1="49.9997"
                            x2="91.6667"
                            y2="49.9997"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#83E69B" />
                            <stop offset="1" stopColor="#00BAE1" />
                          </linearGradient>
                        </defs>
                      </svg>

                      <h2 className="mt-4 text-[22px] font-nunitoBold text-[#51D7B1]">
                        Bersihkan Cache?
                      </h2>
                      <p className="mt-4 text-[14px] text-gray-500">
                        Cache aplikasi akan dibersihkan jika Anda lanjutkan{" "}
                      </p>
                    </div>

                    <div className="flex justify-center space-x-6">
                      <button
                        onClick={handleCancel}
                        className="w-full mt-6 bg-gray-400 text-white p-3 rounded-lg"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleContinue}
                        className="w-full mt-6 bg-[#51D7B1] text-white p-3 rounded-lg"
                      >
                        Lanjutkan
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* About Settings */}
              <Link href="/pengaturan/versi">
                <ActivityItem
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9.71002 19.6674C8.74743 17.6259 8.15732 15.3742 8.02731 13H4.06189C4.458 16.1765 6.71639 18.7747 9.71002 19.6674ZM10.0307 13C10.1811 15.4388 10.8778 17.7297 12 19.752C13.1222 17.7297 13.8189 15.4388 13.9693 13H10.0307ZM19.9381 13H15.9727C15.8427 15.3742 15.2526 17.6259 14.29 19.6674C17.2836 18.7747 19.542 16.1765 19.9381 13ZM4.06189 11H8.02731C8.15732 8.62577 8.74743 6.37407 9.71002 4.33256C6.71639 5.22533 4.458 7.8235 4.06189 11ZM10.0307 11H13.9693C13.8189 8.56122 13.1222 6.27025 12 4.24799C10.8778 6.27025 10.1811 8.56122 10.0307 11ZM14.29 4.33256C15.2526 6.37407 15.8427 8.62577 15.9727 11H19.9381C19.542 7.8235 17.2836 5.22533 14.29 4.33256Z"
                        fill="black"
                      />
                    </svg>
                  }
                  label="Tentang"
                  description="Versi aplikasi"
                />
              </Link>
            </div>
          </div>

          {/* Logout Button */}
          <div className="bg-white rounded-lg border-2 mt-6 px-4 py-2 shadow-md">
            <div className="flex flex-col space-y-2">
              <LogOut token={token}></LogOut>
            </div>
          </div>
        </div>
      </LayoutUtama>
    </>
  );
};

// Reusable component for activity/help items with types
interface ActivityItemProps {
  icon: React.ReactNode;
  label: React.ReactNode;
  description: React.ReactNode;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  label,
  description,
}) => (
  <div className="flex items-center text-sm text-gray-700 hover:bg-gray-100 rounded-lg p-2 cursor-pointer">
    <span className="mr-3">{icon}</span>
    <div>
      <p className="text-sm font-bold">{label}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  </div>
);

export default GeneralSettings;
