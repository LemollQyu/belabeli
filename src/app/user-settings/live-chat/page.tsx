"use client";
import React, { useState, useEffect, useRef } from "react";
import LayoutUtama from "@/app/layouts/layout-utama";
import Header from "@/app/layouts/header";

interface Message {
  text?: string;
  time?: string;
  isUser: boolean;
  isRead: boolean;
  type?: string; // Menyimpan jenis pesan jika diperlukan (mis. "options")
}

const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Halo", time: "9:34", isUser: false, isRead: false },
    {
      text: "Kembali dengan Annas si customer service dari Belabeli",
      time: "9:35",
      isUser: false,
      isRead: false,
    },
    {
      text: "Pilih salah satu opsi di bawah ini:",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isUser: false,
      isRead: false,
      type: "options",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: inputMessage,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isUser: true,
          isRead: true,
        },
      ]);
      setInputMessage("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default action (like form submission)
      handleSendMessage();
    }
  };

  const handleButtonClick = (buttonText: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: buttonText,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isUser: true,
        isRead: true,
      },
    ]);
  };

  useEffect(() => {
    // Tandai semua pesan sebagai dibaca ketika ditampilkan
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.isUser ? message : { ...message, isRead: true }
      )
    );

    // // Scroll ke bagian bawah jika pengguna berada di bagian bawah
    // if (isAtBottom && messagesEndRef.current) {
    //   messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    // }
  }, [messages, isAtBottom]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
  };

  return (
    <LayoutUtama>
      <Header title="Customer Service" children={undefined} />

      <div className="container w-[400px] mx-auto p-4 mt-20 font-nunito flex flex-col h-[85vh] relative">
        <div
          className="flex-1 p-4 space-y-4 overflow-auto scrollbar-hide border-gray-200 mb-10"
          onScroll={handleScroll}
        >
          {messages.map((message, index) =>
            message.type === "options" ? (
              <div
                key={index}
                className="bg-[#EAFBEE] p-4 rounded-lg shadow-sm"
              >
                <h3 className="font-semibold text-[14px] mb-2">
                  Mau tanya apa nich?
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() =>
                      handleButtonClick("Bagaimana Cara Hapus akun")
                    }
                    className="w-full flex justify-between items-center p-2 border-b border-green-300 text-black text-[14px] rounded-md hover:bg-green-100"
                  >
                    <span>Bagaimana Cara Hapus akun</span>
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.1667 10.9998L2.75 18.3332L6.01608 10.9998L2.75 3.6665L20.1667 10.9998ZM20.1667 10.9998H5.95833"
                        stroke="#25A07D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      handleButtonClick("Mengapa pesanan saya lama")
                    }
                    className="w-full flex justify-between items-center p-2 border-b border-green-300 text-black text-[14px] rounded-md hover:bg-green-100"
                  >
                    <span>Mengapa pesanan saya lama</span>
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.1667 10.9998L2.75 18.3332L6.01608 10.9998L2.75 3.6665L20.1667 10.9998ZM20.1667 10.9998H5.95833"
                        stroke="#25A07D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      handleButtonClick("Barang tidak sesuai pesanan")
                    }
                    className="w-full flex justify-between items-center p-2 text-black text-[14px] rounded-md hover:bg-green-100"
                  >
                    <span>Barang tidak sesuai pesanan</span>
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.1667 10.9998L2.75 18.3332L6.01608 10.9998L2.75 3.6665L20.1667 10.9998ZM20.1667 10.9998H5.95833"
                        stroke="#25A07D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.isUser
                      ? "bg-[#EAFBEE] text-black"
                      : "bg-gray-100 text-black text-[14px]"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div className="text-xs text-gray-500 text-right flex items-center justify-end">
                    {message.time}
                    {message.isRead ? (
                      <svg
                        width="14"
                        height="9"
                        viewBox="0 0 14 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2"
                      >
                        <path
                          d="M1 5.05263L3.90909 8L10.0909 1"
                          stroke="#19B000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.81832 8L13.0001 1"
                          stroke="#19B000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="11"
                        height="9"
                        viewBox="0 0 11 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2"
                      >
                        <path
                          d="M1 5.05263L3.90909 8L10.0909 1"
                          stroke="#19B000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="absolute bottom-2 left-0 right-0 flex items-center bg-white shadow-sm rounded-full p-2 border mx-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown} // Add this line
            className="flex-1 px-4 py-2 text-sm rounded-full focus:outline-none"
            placeholder="Tulis pesan anda..."
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 p-2 bg-teal-500 text-white rounded-full"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.29089 3.30897C3.15233 3.25073 2.99947 3.23545 2.85213 3.26514C2.70478 3.29482 2.56976 3.36809 2.46456 3.47544C2.35937 3.58279 2.28885 3.71928 2.26216 3.86719C2.23547 4.0151 2.25384 4.16762 2.31489 4.30497L5.40789 11.25H12.9999C13.1988 11.25 13.3896 11.329 13.5302 11.4696C13.6709 11.6103 13.7499 11.8011 13.7499 12C13.7499 12.1989 13.6709 12.3896 13.5302 12.5303C13.3896 12.671 13.1988 12.75 12.9999 12.75H5.40789L2.31489 19.695C2.25384 19.8323 2.23547 19.9848 2.26216 20.1328C2.28885 20.2807 2.35937 20.4171 2.46456 20.5245C2.56976 20.6319 2.70478 20.7051 2.85213 20.7348C2.99947 20.7645 3.15233 20.7492 3.29089 20.691L22.2909 12.691C22.4268 12.6336 22.5427 12.5375 22.6243 12.4146C22.7058 12.2917 22.7493 12.1475 22.7493 12C22.7493 11.8525 22.7058 11.7083 22.6243 11.5854C22.5427 11.4624 22.4268 11.3663 22.2909 11.309L3.29089 3.30897Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </LayoutUtama>
  );
};

export default LiveChat;
