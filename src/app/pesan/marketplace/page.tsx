"use client";
import Header from "@/app/layouts/header";
import Checklist from "@/app/components/icon/checklist";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import sendMessage from "@/api/chat/sendMessage";
import sendConfirmNegotiation from "@/api/chat/sendConfirmNegotiation";
import useMessages from "@/api/chat/useMessages";

export interface Message {
  order: any;
  id: string;
  conversations_id: string;
  sender_id: string;
  type: "chat" | "negosiasi" | "file" | "order"; // Enum untuk tipe pesan
  accept: boolean;
  products_id?: number;
  product_stock_id?: number;
  quantity?: number;
  price_negosiasi?: string;
  price_sell?: number;
  product?: any;
  product_stock?: any;
  message_content?: string; // Optional, karena bisa null pada tipe tertentu
  user: {
    id: string;
    name: string;
    avatar: string; // URL atau path avatar pengguna
  };
  is_read: boolean;
  from_me: boolean;
  time: string; // Waktu dalam format seperti "10:00 AM"
}

export interface confirmNegotiation {
  dateLabel: string;
  messageIndex: number;
  active: boolean;
  accepted: boolean;
  merchants_id: number;
  message_id: string;
  products_id: number;
  quantity: number;
  product_stocks_id: number;
  price_negosiasi: number;
  variation_items_id_1: number | null;
  variation_items_id_2: number | null;
}

export interface MessagesGroupedByDate {
  [dateLabel: string]: Message[]; // Key adalah label tanggal (e.g., "Hari Ini", "Kemarin")
}

const Marketplace = () => {
  const searchParam = useSearchParams();
  const [dataMessage, setDataMessage] = useState<MessagesGroupedByDate>({});
  const [inputPesan, setInputPesan] = useState<string>("");
  const [disablePesan, setDisablePesan] = useState<boolean>(false);
  const [toggleAlert, setToggleAlert] = useState<boolean>(false);
  const [dataTypeOrder, setDataTypeOrder] = useState<any>(null);

  const router = useRouter();

  const id = searchParam.get("id");
  const toko = searchParam.get("toko");

  // echo.connector.socket.on("connect", () => {
  //   console.log("Connected to WebSocket server");
  // });

  console.log("data type order = ", dataTypeOrder);

  const { messages, error, isLoading } = useMessages({ chatId: id || "" });

  console.log("message: ", messages);

  useEffect(() => {
    if (!isLoading) {
      setDataMessage(messages);
    }
  }, [messages]);

  // async function fetchMessage() {
  //   const response = await getMessage({ chatId: id || "" });

  //   if (response.data?.code == 200) {
  //     setDataMessage(response.data.data);
  //   }

  //   console.log("response: ", response);
  //   setDataTypeOrder(response?.data?.data?.Kemarin);
  //   setInputPesan("");
  // }

  // useEffect(() => {
  //   const channelName = `conversations.${id}`;
  //   echo
  //     .channel(channelName)
  //     .subscribed(() => {
  //       console.log("subs !");
  //     })
  //     .listen(".MessageSent", (e: any) => {
  //       console.log("New message received:", e);
  //       if (e.success) {
  //         fetchMessage();
  //       }
  //     })
  //     .error((error: any) => {
  //       console.error("Error in channel:", error);
  //     });

  //   return () => {
  //     echo.leaveChannel("conversations");
  //   };
  // }, [id]);

  // useEffect(() => {
  //   fetchMessage();
  // }, []);

  function handleInputPesan(e: React.ChangeEvent<HTMLInputElement>) {
    setInputPesan(e.target.value);
  }

  async function handleSendPesan(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setDisablePesan(true);
    const response = await sendMessage({
      message: inputPesan,
      chatId: id || "",
    });
    setInputPesan("");
    setDisablePesan(false);
    console.log("response send message: ", response);
  }

  const toggleAccept = async ({
    dateLabel,
    messageIndex,
    active,
    accepted,
    merchants_id,
    message_id,
    price_negosiasi,
    product_stocks_id,
    products_id,
    quantity,
    variation_items_id_1,
    variation_items_id_2,
  }: confirmNegotiation) => {
    if (active || !accepted) {
      if (variation_items_id_1 !== null && variation_items_id_2 !== null) {
        const response = await sendConfirmNegotiation({
          merchants_id: merchants_id,
          message_id: message_id,
          price_negosiasi: price_negosiasi,
          product_stocks_id: product_stocks_id,
          products_id: products_id,
          quantity: quantity,
          variation_items_id: [variation_items_id_1, variation_items_id_2],
        });

        if (response.data.code == 200) {
          console.log("send status: ", response.data);
        }

        if (response.error) {
          console.log(response.error);
        }
      } else if (
        variation_items_id_1 !== null &&
        variation_items_id_2 == null
      ) {
        const response = await sendConfirmNegotiation({
          merchants_id: merchants_id,
          message_id: message_id,
          price_negosiasi: price_negosiasi,
          product_stocks_id: product_stocks_id,
          products_id: products_id,
          quantity: quantity,
          variation_items_id: [variation_items_id_1],
        });

        if (response.data.code == 200) {
          console.log("send status: ", response.data);
        }

        if (response.error) {
          console.log(response.error);
        }
      }

      setDataMessage((prevData) => {
        // Salin state sebelumnya
        const updatedData = { ...prevData };

        // Salin array messages untuk dateLabel tertentu
        const updatedMessages = [...updatedData[dateLabel]];

        // Toggle nilai `accept` pada message tertentu
        updatedMessages[messageIndex] = {
          ...updatedMessages[messageIndex],
          accept: !updatedMessages[messageIndex].accept,
        };

        // Masukkan array messages yang telah diperbarui ke state
        updatedData[dateLabel] = updatedMessages;

        return updatedData; // Perbarui state
      });
      setToggleAlert(true);
    }
  };

  function handleKeranjang(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    router.push("/transaksi/keranjang");
  }

  return (
    <>
      <Header title={toko !== null ? toko : ""} children={undefined} />
      <div className="px-4 font-nunito absolute py-20 items-center w-[400px] left-1/2 -translate-x-1/2">
        {Object.entries(dataMessage).map(([dateLabel, messagesArray]) => (
          <React.Fragment key={dateLabel}>
            <div className="w-full max-w-md mx-auto pt-2 text-center mb-2">
              <button className="bg-gray-100 px-3 py-2 text-gray-500 text-sm rounded-lg">
                {dateLabel}
              </button>
            </div>

            {/* <h1>Coba disini</h1> */}

            {messagesArray.map((message, i: number) => {
              console.log(message);
              if (message.from_me) {
                return (
                  <div key={i}>
                    {message.type == "negosiasi" ? (
                      <>
                        {/* Komponen untuk produk negosiasi */}
                        <div className="w-[294px] px-[11px] flex items-center flex-col justify-around border mt-[32px] h-[185px] mb-2 bg-warnaKetiga mx-auto py-4">
                          <div className="w-full h-[130px] flex justify-around pt-2">
                            <div className="h-[106px] rounded-md w-[146px] overflow-hidden">
                              <img
                                src={
                                  message.product.gallery_product[0].gallery_url
                                }
                                className="w-full h-full object-cover rounded-md"
                                alt=""
                              />
                            </div>
                            <div className="flex-col flex gap-2">
                              <h2 className="text-[12px] font-nunitoBold">
                                {message.product.name}
                              </h2>
                              <h2 className="text-[12px] font-nunitoBold">
                                {(() => {
                                  const negosiasi = parseFloat(
                                    message.price_negosiasi || "0"
                                  );
                                  const price = message.price_sell || 0;
                                  return price - negosiasi;
                                })()}{" "}
                                <span className="text-warnaUtama">
                                  (X{message.quantity})
                                </span>
                              </h2>
                              <span className="text-[10px] font-nunito flex gap-[1.2px] items-center">
                                <p className="font-bold">Variasi :</p>{" "}
                                {message.product_stock.variation_item_1?.name},{" "}
                                {message.product_stock.variation_item_2?.name}
                              </span>
                            </div>
                          </div>
                          {message.accept ? (
                            <button
                              disabled={!message.from_me || message.accept}
                              className="flex items-center justify-center w-[270px] h-[23px] rounded-lg text-[10px] bg-buttonGrey font-nunito text-black"
                            >
                              Diterima
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                toggleAccept({
                                  dateLabel: dateLabel,
                                  messageIndex: i,
                                  active: message.from_me,
                                  accepted: message.accept,
                                  merchants_id: message.product.merchants_id,
                                  message_id: message.id,
                                  price_negosiasi:
                                    parseFloat(
                                      message.price_negosiasi || "0"
                                    ) || 0,
                                  product_stocks_id:
                                    message.product_stock_id || 0,
                                  products_id: message.product.id,
                                  quantity: message.quantity || 0,
                                  variation_items_id_1:
                                    message.product_stock.variation_item_1.id,
                                  variation_items_id_2:
                                    message.product_stock.variation_item_2.id,
                                });
                              }}
                              disabled={!message.from_me || message.accept}
                              className="flex items-center justify-center w-[270px] h-[23px] rounded-lg text-[10px] bg-warnaUtama font-nunito text-white"
                            >
                              Konfirmasi ke seller
                            </button>
                          )}
                        </div>
                      </>
                    ) : // error typscript
                    message.type == "order" ? (
                      <React.Fragment>
                        <div className="w-[294px] px-[13px] flex items-center flex-col justify-around border mt-[32px]  mb-2 bg-warnaKetiga mx-auto py-[8px]">
                          {message.order.order_items.map(
                            (product: any, index: number) => {
                              console.log(`index ke -${index}`, product);
                              return (
                                <div
                                  key={index}
                                  className="w-full h-[130px] flex justify-around pt-2"
                                >
                                  <div className="h-[106px] rounded-md w-[146px] overflow-hidden">
                                    <img
                                      src={
                                        product.product.image_product
                                          .gallery_url
                                      }
                                      className="w-full h-full object-cover rounded-md"
                                      alt=""
                                    />
                                  </div>
                                  <div className="flex-col flex gap-2">
                                    <h2 className="text-[12px] font-nunitoBold">
                                      {/* {message.product.name} */}
                                      {product.product.name}
                                    </h2>
                                    <h2 className="text-[12px] font-nunitoBold">
                                      Rp. {product.price}
                                      <span className="text-warnaUtama">
                                        {" "}
                                        (X {product.quantity})
                                      </span>
                                    </h2>
                                    <span className="text-[10px] font-nunito flex gap-[1.2px] items-center">
                                      <p className="font-bold">Variasi :</p>{" "}
                                      {
                                        product.product_stock.variation_item_1
                                          .name
                                      }
                                      ,{" "}
                                      {
                                        product.product_stock.variation_item_2
                                          .name
                                      }
                                    </span>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>

                        {/* <div className="flex justify-end mb-2">
                          <div className="flex flex-wrap justify-start items-center max-w-xs bg-blue-100 py-2 px-4 rounded-lg shadow-lg">
                            <p className="text-sm text-gray-800">
                              Ini untuk produk yang order
                            </p>
                          </div>
                        </div> */}
                      </React.Fragment>
                    ) : (
                      <div className="flex justify-end mb-2">
                        <div className="flex flex-wrap justify-start items-center max-w-xs bg-green-100 py-2 px-4 rounded-lg shadow-lg">
                          <p className="text-sm text-gray-800">
                            {message.message_content}
                          </p>
                          <span className="flex flex-wrap items-center justify-end text-xs text-gray-400 text-right w-full gap-1">
                            <p>{message.time}</p>
                            {message.is_read ? <Checklist></Checklist> : ""}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <div key={i}>
                    <div className="flex justify-start mb-2">
                      <div className="flex flex-wrap justify-start items-center max-w-xs bg-gray-100 py-2 px-4 rounded-lg shadow-lg">
                        <p className="text-sm text-gray-800">
                          {message.message_content}
                        </p>
                        <span className="flex flex-wrap items-center justify-end text-xs text-gray-400 text-right w-full gap-1">
                          <p>{message.time}</p>
                          {message.is_read ? <Checklist></Checklist> : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </React.Fragment>
        ))}
      </div>
      <div className="fixed inset-x-0 bottom-0 z-10 block m-auto bg-white max-w-[400px]">
        {toggleAlert && (
          <div className="p-4 flex flex-col justify center mb-2">
            <div className="flex flex-wrap text-center w-full bg-gray-100 border-2 border-[#2EC99D] text-[#2EC99D] py-2 px-4 rounded-lg">
              Penawaran Anda Telah Diterima dan ditambahkan ke keranjang belanja
              silakan lanjut ke checkout.
              <button
                className="bg-[#2EC99D] w-full px-2 py-1 mt-2 text-white rounded-md"
                onClick={handleKeranjang}
              >
                Keranjang Saya
              </button>
            </div>
          </div>
        )}
        <div className="p-4 flex items-center">
          <div className="flex items-center border border-gray-400 rounded-2xl w-full">
            <input
              type="text"
              value={inputPesan}
              className="bg-transparent flex-1 p-4 text-sm focus:outline-none font-nunito"
              placeholder="Tulis pesan anda..."
              onChange={handleInputPesan}
            />
            {/* <span className="p-2 text-gray-500">
              <svg
                width="12"
                height="20"
                viewBox="0 0 12 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.983 14V7C3.983 5.888 4.888 4.987 6 4.992C7.106 4.996 8 5.894 8 7V15.5C8 17.433 6.433 19 4.5 19C2.567 19 1 17.433 1 15.5V15M1 15.05V6C1 3.239 3.239 1 6 1C8.761 1 11 3.239 11 6V13"
                  stroke="#51D7B1"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span> */}
          </div>
          <div className="flex items-center">
            {/* {(() => {
              return (
                <>
                  <h1>hallo world</h1>
                </>
              );
            })()}

            { } */}

            <button
              className="ml-2 p-3 bg-[#51D7B1] rounded-full text-white focus:outline-none"
              onClick={handleSendPesan}
              disabled={disablePesan}
            >
              <svg
                width="21"
                height="18"
                viewBox="0 0 21 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.29113 0.309093C1.15257 0.250848 0.999712 0.235577 0.85237 0.26526C0.705028 0.294944 0.570004 0.368212 0.464808 0.475564C0.359611 0.582916 0.289096 0.719399 0.262407 0.867312C0.235718 1.01523 0.254087 1.16775 0.315131 1.30509L3.40813 8.25009H11.0001C11.199 8.25009 11.3898 8.32911 11.5305 8.46976C11.6711 8.61042 11.7501 8.80118 11.7501 9.00009C11.7501 9.19901 11.6711 9.38977 11.5305 9.53042C11.3898 9.67108 11.199 9.75009 11.0001 9.75009H3.40813L0.315131 16.6951C0.254087 16.8324 0.235718 16.985 0.262407 17.1329C0.289096 17.2808 0.359611 17.4173 0.464808 17.5246C0.570004 17.632 0.705028 17.7052 0.85237 17.7349C0.999712 17.7646 1.15257 17.7493 1.29113 17.6911L20.2911 9.69109C20.427 9.63375 20.543 9.53762 20.6245 9.41471C20.7061 9.29181 20.7495 9.14759 20.7495 9.00009C20.7495 8.8526 20.7061 8.70838 20.6245 8.58548C20.543 8.46257 20.427 8.36644 20.2911 8.30909L1.29113 0.309093Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Marketplace;
