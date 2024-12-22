// pages/account.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LayoutUtama from "../layouts/layout-utama";
import Header from "../layouts/header";
import getUserProfile from "@/api/settings/getUserProfile";

const UserSettings: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
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

  function gotoProfile() {
    window.location.replace(`/user-settings/profile`);
  }

  return (
    <>
      <LayoutUtama>
        <Header title="Akun Saya" children={undefined} />
        <div className="container w-[360px] mx-auto mt-20 font-nunito">
          <div className="bg-white border-2 rounded-lg p-6 ">
            <div className="cursor-pointer flex items-center justify-between w-full">
              <div onClick={gotoProfile} className="flex items-center">
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
              </div>

              {/* User Information */}
              <div onClick={gotoProfile} className="flex-1 mx-2">
                <h2 className="text-[#1B1E28] font-nunito text-[16px] font-bold leading-[150%] tracking-[-0.368px]">
                  {name}
                </h2>
                <p className="text-[#1B1E28] font-nunito text-[12px] font-light leading-[150%] tracking-[-0.276px]">
                  {phone}
                </p>
                <p className="text-[#1B1E28] font-nunito text-[12px] font-light leading-[150%] tracking-[-0.276px]">
                  {email}
                </p>
              </div>

              {/* Settings Icon */}
              <div className="flex items-center">
                <button className="text-gray-500 hover:text-gray-900">
                  <Link href="/general-settings">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.33946 17.0002C2.90721 16.2515 2.58277 15.4702 2.36133 14.6741C3.3338 14.1779 3.99972 13.1668 3.99972 12.0002C3.99972 10.8345 3.3348 9.824 2.36353 9.32741C2.81025 7.71651 3.65857 6.21627 4.86474 4.99001C5.7807 5.58416 6.98935 5.65534 7.99972 5.072C9.01009 4.48866 9.55277 3.40635 9.4962 2.31604C11.1613 1.8846 12.8847 1.90004 14.5031 2.31862C14.4475 3.40806 14.9901 4.48912 15.9997 5.072C17.0101 5.65532 18.2187 5.58416 19.1346 4.99007C19.7133 5.57986 20.2277 6.25151 20.66 7.00021C21.0922 7.7489 21.4167 8.53025 21.6381 9.32628C20.6656 9.82247 19.9997 10.8336 19.9997 12.0002C19.9997 13.166 20.6646 14.1764 21.6359 14.673C21.1892 16.2839 20.3409 17.7841 19.1347 19.0104C18.2187 18.4163 17.0101 18.3451 15.9997 18.9284C14.9893 19.5117 14.4467 20.5941 14.5032 21.6844C12.8382 22.1158 11.1148 22.1004 9.49633 21.6818C9.55191 20.5923 9.00929 19.5113 7.99972 18.9284C6.98938 18.3451 5.78079 18.4162 4.86484 19.0103C4.28617 18.4205 3.77172 17.7489 3.33946 17.0002ZM8.99972 17.1964C10.0911 17.8265 10.8749 18.8227 11.2503 19.9659C11.7486 20.0133 12.2502 20.014 12.7486 19.9675C13.1238 18.8237 13.9078 17.8268 14.9997 17.1964C16.0916 16.5659 17.347 16.3855 18.5252 16.6324C18.8146 16.224 19.0648 15.7892 19.2729 15.334C18.4706 14.4373 17.9997 13.2604 17.9997 12.0002C17.9997 10.74 18.4706 9.5632 19.2729 8.6665C19.1688 8.4405 19.0538 8.21822 18.9279 8.00021C18.802 7.78219 18.667 7.57148 18.5233 7.36842C17.3457 7.61476 16.0911 7.43414 14.9997 6.80405C13.9083 6.17395 13.1246 5.17768 12.7491 4.03455C12.2509 3.98714 11.7492 3.98646 11.2509 4.03292C10.8756 5.17671 10.0916 6.17364 8.99972 6.80405C7.9078 7.43447 6.65245 7.61494 5.47428 7.36803C5.18485 7.77641 4.93463 8.21117 4.72656 8.66637C5.52881 9.56311 5.99972 10.74 5.99972 12.0002C5.99972 13.2604 5.52883 14.4372 4.72656 15.3339C4.83067 15.5599 4.94564 15.7822 5.07152 16.0002C5.19739 16.2182 5.3324 16.4289 5.47612 16.632C6.65377 16.3857 7.90838 16.5663 8.99972 17.1964ZM11.9997 15.0002C10.3429 15.0002 8.99972 13.6571 8.99972 12.0002C8.99972 10.3434 10.3429 9.00021 11.9997 9.00021C13.6566 9.00021 14.9997 10.3434 14.9997 12.0002C14.9997 13.6571 13.6566 15.0002 11.9997 15.0002ZM11.9997 13.0002C12.552 13.0002 12.9997 12.5525 12.9997 12.0002C12.9997 11.4479 12.552 11.0002 11.9997 11.0002C11.4474 11.0002 10.9997 11.4479 10.9997 12.0002C10.9997 12.5525 11.4474 13.0002 11.9997 13.0002Z"
                        fill="black"
                      />
                    </svg>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="container w-[360px] mx-auto mt-4">
          <div className="flex flex-row space-x-1">
            <Link href="/seller/verif-seller">
              <button className="flex-1 bg-[#51D7B1] rounded-lg p-2 mr-2 flex items-center justify-between px-4">
                <span
                  className="px-4 text-center"
                  style={{
                    color: "var(--Light-Text-Color, #FDFDFD)",
                    fontFamily: "Nunito",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "150%",
                    letterSpacing: "-0.276px",
                  }}
                >
                  Daftar Toko
                </span>
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5332 11.9999L8.71289 7.05006L10.0901 5.63586L16.2878 11.9999L10.0901 18.3638L8.71289 16.9496L13.5332 11.9999Z"
                    fill="white"
                  />
                </svg>
              </button>
            </Link>
            <button className="flex-1 bg-[#51D7B1] rounded-lg py-2 flex items-center justify-between px-4">
              <span
                className="pl-2 text-center"
                style={{
                  color: "var(--Light-Text-Color, #FDFDFD)",
                  fontFamily: "Nunito",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "150%",
                  letterSpacing: "-0.276px",
                }}
              >
                Daftar Affiliate
              </span>
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5332 11.9999L8.71289 7.05006L10.0901 5.63586L16.2878 11.9999L10.0901 18.3638L8.71289 16.9496L13.5332 11.9999Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* User Activities */}
        <div className="container mx-auto bg-white rounded-lg w-[360px] border-2 mt-6 p-4 shadow-md">
          <h3
            className="text-sm font-semibold mb-3"
            style={{
              color: "var(--Light-Text-Color, #1B1E28)",
              fontFamily: "Nunito",
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "150%", // 24px
              letterSpacing: "-0.368px",
            }}
          >
            Aktivitas Saya
          </h3>
          <div className="flex flex-col space-y-2">
            <Link href="/user-settings/profile">
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
                      d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                      fill="black"
                    />
                  </svg>
                }
                label="Akun Sosial Media"
              />
            </Link>
            <Link href="/user-settings/profile">
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
                      d="M15.7279 9.57628L14.3137 8.16207L5 17.4758V18.89H6.41421L15.7279 9.57628ZM17.1421 8.16207L18.5563 6.74786L17.1421 5.33364L15.7279 6.74786L17.1421 8.16207ZM7.24264 20.89H3V16.6473L16.435 3.21232C16.8256 2.8218 17.4587 2.8218 17.8492 3.21232L20.6777 6.04075C21.0682 6.43127 21.0682 7.06444 20.6777 7.45496L7.24264 20.89Z"
                      fill="black"
                    />
                  </svg>
                }
                label="Informasi Akun"
              />
            </Link>
            <Link href="/transaksi/riwayat">
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
                      d="M21 8V12H19V9H14V4H5V20H11V22H3.9934C3.44495 22 3 21.556 3 21.0082V2.9918C3 2.45531 3.4487 2 4.00221 2H14.9968L21 8ZM13.7857 15.3269C13.8246 14.5997 14.3858 14.0083 15.11 13.9313L15.9807 13.8389C16.0841 13.8279 16.1815 13.7845 16.2589 13.715L16.9102 13.1299C17.4519 12.6431 18.2669 12.6218 18.8334 13.0795L19.5145 13.6298C19.5954 13.6951 19.6949 13.7333 19.7988 13.7389L20.6731 13.7857C21.4003 13.8246 21.9917 14.3858 22.0687 15.11L22.1611 15.9807C22.1721 16.0841 22.2155 16.1815 22.285 16.2589L22.8701 16.9102C23.3569 17.4519 23.3782 18.2669 22.9205 18.8334L22.3702 19.5145C22.3049 19.5954 22.2667 19.6949 22.2611 19.7988L22.2143 20.6731C22.1754 21.4003 21.6142 21.9917 20.89 22.0687L20.0193 22.1611C19.9159 22.1721 19.8185 22.2155 19.7411 22.285L19.0898 22.8701C18.5481 23.3569 17.7331 23.3782 17.1666 22.9205L16.4855 22.3702C16.4046 22.3049 16.3051 22.2667 16.2012 22.2611L15.3269 22.2143C14.5997 22.1754 14.0083 21.6142 13.9313 20.89L13.8389 20.0193C13.8279 19.9159 13.7845 19.8185 13.715 19.7411L13.1299 19.0898C12.6431 18.5481 12.6218 17.733 13.0795 17.1666L13.6298 16.4855C13.6951 16.4046 13.7333 16.3051 13.7389 16.2012L13.7857 15.3269ZM21.0303 17.0303L19.9697 15.9697L17.5 18.4393L16.0303 16.9697L14.9697 18.0303L17.5 20.5607L21.0303 17.0303Z"
                      fill="black"
                    />
                  </svg>
                }
                label="Riwayat Transaksi"
              />
            </Link>
            <Link href="user-settings/ulasan">
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
                      d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17ZM11.9998 14.6564L14.8165 16.3769L14.0507 13.1664L16.5574 11.0192L13.2673 10.7554L11.9998 7.70792L10.7323 10.7554L7.44228 11.0192L9.94893 13.1664L9.18311 16.3769L11.9998 14.6564Z"
                      fill="black"
                    />
                  </svg>
                }
                label="Ulasan"
              />
            </Link>
            <Link href="user-settings/riwayat-pencarian">
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
                      d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                      fill="black"
                    />
                  </svg>
                }
                label="Riwayat Pencarian"
              />
            </Link>
            <Link href="user-settings/terakhir-dilihat">
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
                      d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"
                      fill="black"
                    />
                  </svg>
                }
                label="Terakhir Dilihat"
              />
            </Link>
            <Link href="user-settings/toko-diikuti">
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
                label="Toko yang diikuti"
              />
            </Link>
          </div>
        </div>

        {/* Help Center */}
        <div className="bg-white container mx-auto w-[360px] rounded-lg border-2 mt-6 p-4 pb-20 shadow-md">
          <h3
            className="text-sm font-semibold mb-3"
            style={{
              color: "var(--Light-Text-Color, #1B1E28)",
              fontFamily: "Nunito",
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "150%", // 24px
              letterSpacing: "-0.368px",
            }}
          >
            Pusat Bantuan
          </h3>
          <div className="flex flex-col space-y-2">
            <Link href="user-settings/pusat-bantuan">
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
                      d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM13 13.3551V14H11V12.5C11 11.9477 11.4477 11.5 12 11.5C12.8284 11.5 13.5 10.8284 13.5 10C13.5 9.17157 12.8284 8.5 12 8.5C11.2723 8.5 10.6656 9.01823 10.5288 9.70577L8.56731 9.31346C8.88637 7.70919 10.302 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10C15.5 11.5855 14.4457 12.9248 13 13.3551Z"
                      fill="black"
                    />
                  </svg>
                }
                label="Pusat Bantuan"
              />
            </Link>
            <Link href="user-settings/live-chat">
              <ActivityItem
                icon={
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7C21.1046 7 22 7.89543 22 9V13C22 14.1046 21.1046 15 20 15H18.9381C18.446 18.9463 15.0796 22 11 22V20C14.3137 20 17 17.3137 17 14V8C17 4.68629 14.3137 2 11 2C7.68629 2 5 4.68629 5 8V15H2C0.89543 15 0 14.1046 0 13V9C0 7.89543 0.89543 7 2 7H3.06189C3.55399 3.05369 6.92038 0 11 0C15.0796 0 18.446 3.05369 18.9381 7H20ZM6.75944 14.7849L7.81958 13.0887C8.74161 13.6662 9.8318 14 11 14C12.1682 14 13.2584 13.6662 14.1804 13.0887L15.2406 14.7849C14.0112 15.5549 12.5576 16 11 16C9.4424 16 7.98882 15.5549 6.75944 14.7849Z"
                      fill="black"
                    />
                  </svg>
                }
                label="Live Chat"
              />
            </Link>
            <Link href="user-settings/hapus-akun" className="mb-44">
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
                      d="M9.74462 21.7446C5.30798 20.7219 2 16.7473 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 16.7473 18.692 20.7219 14.2554 21.7446L12 24L9.74462 21.7446ZM7.01173 18.2567C7.92447 18.986 9.00433 19.5215 10.1939 19.7957L10.7531 19.9246L12 21.1716L13.2469 19.9246L13.8061 19.7957C15.0745 19.5033 16.2183 18.9139 17.1676 18.1091C15.8965 16.8078 14.1225 16 12.1597 16C10.1238 16 8.29083 16.8692 7.01173 18.2567ZM5.61562 16.8214C7.25644 15.0841 9.58146 14 12.1597 14C14.644 14 16.8931 15.0065 18.5216 16.634C19.4563 15.3185 20 13.7141 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.7964 4.59708 15.4722 5.61562 16.8214ZM12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13ZM12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z"
                      fill="black"
                    />
                  </svg>
                }
                label="Hapus Akun"
              />
            </Link>
          </div>
        </div>
      </LayoutUtama>
    </>
  );
};

// Reusable component for activity/help items with types
interface ActivityItemProps {
  icon: React.ReactNode;
  label: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ icon, label }) => (
  <div className="flex items-center text-sm font-nunito text-gray-700 hover:bg-gray-100 rounded-lg p-2 cursor-pointer">
    <span className="mr-3">{icon}</span>
    {label}
  </div>
);

export default UserSettings;
