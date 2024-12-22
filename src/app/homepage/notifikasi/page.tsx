"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/app/layouts/header";
import notification from "@/api/notitifkasi/getNotification";
import markAllNotificationsAsRead from "@/api/notitifkasi/putReadNotification";

interface Notification {
  title: string;
  description: string;
  unreadCount?: number;
}

interface AllNotification {
  merchant?: {
    name: string;
    logo: string;
  };

  message?: string;
  notification_at?: string;
  title?: string;
  description?: string;
  unreadCount?: number;
}

function NotificationPage() {
  const [keuangan, setKeuangan] = useState<any>();
  const [promo, setPromo] = useState<any>();
  const [all_notification, setAllNotification] = useState<Notification[]>([]);

  const notifications: Notification[] = [
    {
      title: "Promo Belabeli",
      description: promo !== undefined ? promo.message : "",
      unreadCount: promo?.jumlah,
    },
    {
      title: "Live dan Video",
      description: "BIG SALE 10.10 PROMO ALL ITEM!",
      unreadCount: 2,
    },
    {
      title: "Keuangan",
      description: keuangan !== undefined ? keuangan.message : "",
      unreadCount: keuangan?.jumlah,
    },
  ];

  const lastNotifications: Notification[] = [
    {
      title: "Anugrah Shoes",
      description: "Lacak pengiriman",
    },
    {
      title: "Anugrah Shoes",
      description: "Lacak pengiriman",
    },
    {
      title: "Anugrah Shoes",
      description: "Lacak pengiriman",
    },
  ];

  console.log("keuangan", keuangan);
  console.log("promo", promo);
  console.log("all notification", all_notification);

  useEffect(() => {
    async function fetchNotification() {
      const response = await notification();
      setKeuangan(response?.data?.data?.keuangan);
      setPromo(response?.data?.data?.promo);
      setAllNotification(response?.data?.data?.all_notification);

      console.log(response);
    }

    fetchNotification();
  }, []);

  const markAllAsRead = async () => {
    const response = await markAllNotificationsAsRead();
    console.log(response);
  };

  return (
    <>
      <Header title="Notifikasi" children={undefined} />
      <div className="pt-20 bg-gray-50 min-h-screen p-4">
        {/* Wrapper untuk menambahkan layout yang lebih terpusat */}
        <div className="notif w-[400px] mx-auto">
          {/* List Notifikasi */}
          <ul className="mb-4">
            {notifications.map((notification, index) => (
              <li key={index} className="mb-2">
                <Link href={getLink(notification.title)}>
                  <div className="flex items-center justify-between p-6 bg-white shadow rounded-lg cursor-pointer">
                    <div className="flex items-center">
                      {/* Icon */}
                      {getIcon(notification.title)}

                      {/* Text Content */}
                      <div className="ml-4">
                        {/* Judul */}
                        <p className="font-nunito text-[15px] text-sm font-bold text-gray-800 mb-1">
                          {notification.title}
                        </p>
                        {/* Deskripsi */}
                        <p className="font-nunito text-[12px] text-xs font-semibold text-gray-500">
                          {notification.description}
                        </p>
                      </div>
                    </div>

                    {/* Right Side (Icon atau Jumlah Notifikasi) */}
                    <div className="flex items-center">
                      {/* Unread Count (akan muncul jika ada) */}
                      {notification.unreadCount !== 0 ? (
                        <div className="flex items-center justify-center w-6 h-6 bg-emerald-200 text-emerald-700 rounded-full text-[12px] mr-2">
                          {notification.unreadCount}
                        </div>
                      ) : (
                        ""
                      )}
                      {/* Icon akan selalu muncul */}
                      <div className="text-gray-400 text-xs">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.1714 12.0001L8.22168 7.0503L9.63589 5.6361L15.9999 12.0001L9.63589 18.364L8.22168 16.9498L13.1714 12.0001Z"
                            fill="#7D848D"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Bagian Bawah */}
          <div className="flex justify-between items-center bg-gray-50 p-2">
            <p className="font-nunito text-[15px] font-bold text-gray-800">
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

          {/* List Notifikasi Terakhir */}
          <ul className="mt-4">
            {all_notification?.map((notif: AllNotification, index) => (
              <li key={index} className="mb-2">
                <Link href="/lacak-pesanan">
                  <div className="flex items-center justify-between p-6 bg-white shadow rounded-lg cursor-pointer">
                    <div className="flex items-center">
                      <div>
                        {notif.merchant?.logo ? (
                          <div className="rounded-full">
                            <div className="w-10 h-10">
                              <img
                                src={notif.merchant.logo}
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
                      <div className="ml-4">
                        <p className="font-nunito text-[15px] font-bold text-black mb-1">
                          {notif.merchant?.name}
                        </p>
                        <p className="font-nunito text-[12px] font-semibold text-gray-500">
                          {notif.message}
                        </p>
                      </div>
                    </div>
                    <div className="text-gray-400 text-s">
                      <svg
                        width="17"
                        height="18"
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.00031 7.4015L8.47521 4.92664L9.18231 5.63374L6.00031 8.81575L2.81836 5.63374L3.52546 4.92664L6.00031 7.4015Z"
                          fill="#7D848D"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

// Fungsi untuk menampilkan ikon berdasarkan judul notifikasi dan link yang relevan
function getLink(title: string) {
  switch (title) {
    case "Promo Belabeli":
      return "/homepage/notifikasi/promo";
    case "Live dan Video":
      return "/homepage/notifikasi/live-video";
    case "Keuangan":
      return "/homepage/notifikasi/keuangan";
    default:
      return "/";
  }
}

// Fungsi untuk menampilkan ikon berdasarkan judul notifikasi
function getIcon(title: string) {
  switch (title) {
    case "Promo Belabeli":
      return (
        <div className="bg-emerald-100 p-2 rounded-full">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0544 2.0941C11.1756 1.13856 12.8248 1.13855 13.9461 2.09411L15.2941 3.24286C15.4542 3.37935 15.6533 3.46182 15.8631 3.47856L17.6286 3.61945C19.0971 3.73663 20.2633 4.9028 20.3805 6.37131L20.5214 8.13679C20.5381 8.34654 20.6205 8.54568 20.757 8.70585L21.9058 10.0539C22.8614 11.1751 22.8614 12.8243 21.9058 13.9456L20.757 15.2935C20.6206 15.4537 20.538 15.6529 20.5213 15.8627L20.3805 17.6281C20.2633 19.0967 19.0971 20.2628 17.6286 20.3799L15.8631 20.5208C15.6533 20.5376 15.4542 20.6201 15.2941 20.7566L13.9461 21.9053C12.8248 22.8609 11.1756 22.8608 10.0543 21.9053L8.70631 20.7566C8.54615 20.6201 8.34705 20.5376 8.1373 20.5209L6.37184 20.3799C4.9033 20.2627 3.73716 19.0966 3.61997 17.6281L3.47906 15.8627C3.46232 15.6529 3.37983 15.4538 3.24336 15.2936L2.0946 13.9455C1.13905 12.8243 1.13904 11.1752 2.09458 10.0539L3.24334 8.70589C3.37983 8.54573 3.46234 8.34654 3.47907 8.13678L3.61996 6.3713C3.73714 4.90278 4.90327 3.73665 6.3718 3.61946L8.13729 3.47857C8.34705 3.46183 8.54619 3.37935 8.70636 3.24286L10.0544 2.0941ZM12.6488 3.61632C12.2751 3.29782 11.7253 3.29781 11.3516 3.61632L10.0036 4.76509C9.5231 5.17456 8.92568 5.42201 8.29637 5.47223L6.5309 5.61312C6.04139 5.65219 5.65268 6.04089 5.61362 6.53041L5.47272 8.29593C5.4225 8.92521 5.17505 9.52259 4.76559 10.0031L3.61683 11.3511C3.29832 11.7248 3.29831 12.2746 3.61683 12.6483L4.76559 13.9963C5.17506 14.4768 5.4225 15.0743 5.47275 15.7035L5.61363 17.469C5.65268 17.9585 6.04139 18.3473 6.53092 18.3863L8.29636 18.5272C8.92563 18.5774 9.5231 18.8249 10.0036 19.2344L11.3516 20.3831C11.7254 20.7016 12.2751 20.7016 12.6488 20.3831L13.9969 19.2343C14.4773 18.8249 15.0747 18.5774 15.704 18.5272L17.4695 18.3863C17.959 18.3472 18.3478 17.9585 18.3868 17.469L18.5277 15.7035C18.5779 15.0742 18.8253 14.4768 19.2349 13.9964L20.3836 12.6483C20.7022 12.2746 20.7021 11.7249 20.3836 11.3511L19.2348 10.0031C18.8253 9.52259 18.5779 8.92519 18.5277 8.2959L18.3868 6.53041C18.3478 6.0409 17.959 5.65219 17.4695 5.61312L15.704 5.47224C15.0748 5.42203 14.4773 5.17455 13.9968 4.76508L12.6488 3.61632ZM14.8284 7.75718L16.2426 9.1714L9.17154 16.2425L7.75733 14.8282L14.8284 7.75718ZM10.2322 10.232C9.64641 10.8178 8.69667 10.8178 8.11088 10.232C7.52509 9.6463 7.52509 8.69652 8.11088 8.11073C8.69667 7.52494 9.64641 7.52494 10.2322 8.11073C10.818 8.69652 10.818 9.6463 10.2322 10.232ZM13.7677 15.8889C14.3535 16.4747 15.3032 16.4747 15.889 15.8889C16.4748 15.3031 16.4748 14.3534 15.889 13.7676C15.3032 13.1818 14.3535 13.1818 13.7677 13.7676C13.1819 14.3534 13.1819 15.3031 13.7677 15.8889Z"
              fill="#2EC99D"
            />
          </svg>
        </div>
      );
    case "Live dan Video":
      return (
        <div className="bg-emerald-100 p-2 rounded-full">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.4142 5.00004H21.0082C21.556 5.00004 22 5.44467 22 6.00091V19.9992C22 20.552 21.5447 21.0001 21.0082 21.0001H2.9918C2.44405 21.0001 2 20.5554 2 19.9992V6.00091C2 5.44814 2.45531 5.00004 2.9918 5.00004H8.58579L6.05025 2.46451L7.46447 1.05029L11.4142 5.00004H12.5858L16.5355 1.05029L17.9497 2.46451L15.4142 5.00004ZM4 7.00004V19.0001H20V7.00004H4Z"
              fill="#2EC99D"
            />
            <path
              d="M10 15.7318V10.2679C10 10.0061 10.288 9.84652 10.51 9.98528L14.8811 12.7172C15.09 12.8477 15.09 13.152 14.8811 13.2825L10.51 16.0144C10.288 16.1532 10 15.9936 10 15.7318Z"
              fill="#2EC99D"
            />
          </svg>
        </div>
      );
    case "Keuangan":
      return (
        <div className="bg-emerald-100 p-2 rounded-full">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.0049 7H23.0049V17H22.0049V20C22.0049 20.5523 21.5572 21 21.0049 21H3.00488C2.4526 21 2.00488 20.5523 2.00488 20V4C2.00488 3.44771 2.4526 3 3.00488 3H21.0049C21.5572 3 22.0049 3.44771 22.0049 4V7ZM20.0049 17H14.0049C11.2435 17 9.00488 14.7614 9.00488 12C9.00488 9.23857 11.2435 7 14.0049 7H20.0049V5H4.00488V19H20.0049V17ZM21.0049 15V9H14.0049C12.348 9 11.0049 10.3431 11.0049 12C11.0049 13.6568 12.348 15 14.0049 15H21.0049ZM14.0049 11H17.0049V13H14.0049V11Z"
              fill="#2EC99D"
            />
          </svg>
        </div>
      );
    default:
      return null;
  }
}

export default NotificationPage;
