"use client";

import keuangan from "@/api/notitifkasi/getKeuanganNotification";
import markAllNotificationsAsRead from "@/api/notitifkasi/putReadNotification";
import order from "@/api/pembayaran/getOrder";
import Header from "@/app/layouts/header";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Merchant {
  id: number;
  uuid: string;
  users_id: string;
  name: string;
  slug: string;
  logo: string;
}

interface Notification {
  id: number;
  created_at: string;
  updated_at: string;
  merchants_uuid: string;
  message: string;
  orders_uuid: string;
  notification_at: string;
  read: number;
  type: string;
  users_id: string;
  merchant: Merchant;
}

function KeuanganPage() {
  const [selectedFilter, setSelectedFilter] = useState("all"); // 'all' or 'unread'
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function fetchNotification() {
      const response = await keuangan();
      setNotifications(response?.data?.data || []); // Ensure it's always an array

      console.log(response);
    }

    fetchNotification();
  }, []);

  const handleLengkapiPembayaran = async (orderId) => {
    console.log("pemabayaran = ", orderId);

    const response = await order({ orderId: orderId });

    console.log(response?.data?.data);
    // console.log(response);

    if (response?.data?.code == 200) {
      localStorage.setItem("paymentData", JSON.stringify(response?.data?.data));
      router.push("/laman-pembayaran");
    }
  };

  const markAllAsRead = async () => {
    const response = await markAllNotificationsAsRead();
    console.log(response);
  };

  return (
    <>
      <Header title="Notifikasi" children={undefined} />
      <div className="page w-[400px] mx-auto p-4 pt-20">
        {/* Filter Section */}
        <div className="py-2 flex items-center justify-between pb-2 mb-4">
          <p
            className="text-black font-bold text-base leading-[25px] font-nunito"
            style={{ letterSpacing: "-0.322px" }}
          >
            Semua Notifikasi
          </p>
          <button
            className="text-[12px] font-light leading-[20px]"
            style={{
              color: "var(--Warna-Utama, #51D7B1)",
              letterSpacing: "-0.2px",
              fontFamily: "Nunito",
            }}
            onClick={markAllAsRead}
          >
            Tandai semua telah dibaca
          </button>
        </div>

        {/* Notification List */}
        <ul>
          {notifications.map((notification: Notification, index: number) => (
            <div
              key={notification.id}
              onClick={() => {
                handleLengkapiPembayaran(notification.orders_uuid);
              }}
              className="flex  items-center justify-between p-4 mb-4 bg-white shadow rounded-lg"
            >
              <div className=" flex items-center">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  {/* Replacing the bell icon */}
                  <div>
                    {notification.merchant?.logo ? (
                      <div className="rounded-full">
                        <div className="w-10 h-10">
                          <img
                            src={notification.merchant.logo}
                            alt="Merchant Logo"
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-emerald-200 p-2 rounded-full">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 13.2422V20H22V22H2V20H3V13.2422C1.79401 12.435 1 11.0602 1 9.5C1 8.67286 1.22443 7.87621 1.63322 7.19746L4.3453 2.5C4.52393 2.1906 4.85406 2 5.21132 2H18.7887C19.1459 2 19.4761 2.1906 19.6547 2.5L22.3575 7.18172C22.7756 7.87621 23 8.67286 23 9.5C23 11.0602 22.206 12.435 21 13.2422ZM19 13.9725C18.8358 13.9907 18.669 14 18.5 14C17.2409 14 16.0789 13.478 15.25 12.6132C14.4211 13.478 13.2591 14 12 14C10.7409 14 9.5789 13.478 8.75 12.6132C7.9211 13.478 6.75911 14 5.5 14C5.331 14 5.16417 13.9907 5 13.9725V20H19V13.9725ZM5.78865 4L3.35598 8.21321C3.12409 8.59843 3 9.0389 3 9.5C3 10.8807 4.11929 12 5.5 12C6.53096 12 7.44467 11.3703 7.82179 10.4295C8.1574 9.59223 9.3426 9.59223 9.67821 10.4295C10.0553 11.3703 10.969 12 12 12C13.031 12 13.9447 11.3703 14.3218 10.4295C14.6574 9.59223 15.8426 9.59223 16.1782 10.4295C16.5553 11.3703 17.469 12 18.5 12C19.8807 12 21 10.8807 21 9.5C21 9.0389 20.8759 8.59843 20.6347 8.19746L18.2113 4H5.78865Z"
                            fill="#2EC99D"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-4">
                  <p
                    className="font-bold leading-[15px] text-[12px]"
                    style={{
                      color: "var(--Light-Text-Color, #1B1E28)",
                      letterSpacing: "-0.2px",
                      fontFamily: "Nunito",
                    }}
                  >
                    {notification.merchant?.name}
                  </p>
                  <button
                    className="text-xs font-semibold leading-[15px]"
                    style={{
                      color: "var(--Light-Sub-Text-Color, #7D848D)",
                      letterSpacing: "-0.23px",
                      fontFamily: "Nunito",
                    }}
                  >
                    {notification.message}
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p
                  className="font-semibold leading-[18px] text-[10px]"
                  style={{
                    color: "#51D7B1",
                    textAlign: "right",
                    letterSpacing: "-0.276px",
                    fontFamily: "Nunito",
                  }}
                >
                  {notification.notification_at}
                </p>
                {!notification.read && (
                  <div
                    className="w-2 h-2 text-white rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: "#51D7B1",
                      letterSpacing: "-0.276px",
                      fontSize: "12px",
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default KeuanganPage;
