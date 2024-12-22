"use client";
import Link from "next/link";
import Header from "@/app/layouts/header";

import React, { useState, useEffect } from "react";
import ChatlistObrolan from "../components/pesan/chatlist-obrolan";
import ChatlistMarketplace from "../components/pesan/chatlist-marketplace";
import useConversations from "@/api/chat/useConversations";
import { useRouter } from "next/navigation";

const Pesan = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Obrolan", "Marketplace"];
  const router = useRouter();

  const { conversations, error, isLoading } = useConversations();

  if (!isLoading && error !== null && error?.code == 401) {
    router.push("/authentikasi/login");
  }

  console.log("conversation: ", conversations);

  return (
    <>
      <Header title="Pesan" children={undefined} />
      <div className="px-4 font-nunito absolute py-20 items-center w-[400px] left-1/2 -translate-x-1/2">
        <div className="w-full max-w-md mx-auto pt-4">
          {/* Tabs */}
          <div className="flex gap-3">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`w-full py-2 px-4 text-center ${
                  activeTab === index
                    ? "text-white bg-[#51D7B1] py-3 rounded-lg font-semibold"
                    : "text-[#2EC99D] bg-[#E2F8F2] rounded-lg"
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <div
              key={0}
              className={`${
                activeTab === 0 ? "block" : "hidden"
              } transition-all duration-300`}
            >
              {!isLoading
                ? conversations?.data?.map((v: any, i: number) => {
                    if (v.type == "obrolan") {
                      return (
                        <ChatlistObrolan
                          key={i}
                          status={v.message.unread_count !== 0}
                        ></ChatlistObrolan>
                      );
                    }
                  })
                : ""}
              {/* <ChatlistObrolan status={true}></ChatlistObrolan>
              <ChatlistObrolan status={false}></ChatlistObrolan>
              <ChatlistObrolan status={false}></ChatlistObrolan>
              <ChatlistObrolan status={false}></ChatlistObrolan>
              <ChatlistObrolan status={false}></ChatlistObrolan> */}
            </div>
          </div>

          <div className="mt-4">
            <div
              key={1}
              className={`${
                activeTab === 1 ? "block" : "hidden"
              } transition-all duration-300`}
            >
              {!isLoading
                ? conversations?.data?.map((v: any, i: number) => {
                    if (v.type == "marketplace") {
                      return (
                        <ChatlistMarketplace
                          status={v.message.unread_count !== 0}
                          dataChat={v}
                          key={i}
                        ></ChatlistMarketplace>
                      );
                    }
                  })
                : ""}
              {/* <ChatlistMarketplace status={true}></ChatlistMarketplace>
              <ChatlistMarketplace status={false}></ChatlistMarketplace>
              <ChatlistMarketplace status={false}></ChatlistMarketplace>
              <ChatlistMarketplace status={false}></ChatlistMarketplace>
              <ChatlistMarketplace status={false}></ChatlistMarketplace> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pesan;
