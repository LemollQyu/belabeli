import Link from "next/dist/client/link";
import { useRouter } from "next/navigation";
import React from "react";

interface ChatlistMarketplaceProps {
  status?: Boolean; // Make the title prop optional
  dataChat?: any;
}

const ChatlistMarketplace: React.FC<ChatlistMarketplaceProps> = ({
  status,
  dataChat,
}) => {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    router.back();
  };

  if (status) {
    return (
      <>
        <Link
          href={`/pesan/marketplace?id=${dataChat.id}&toko=${dataChat.name}`}
        >
          <div className="flex flex-wrap justify-between py-2 cursor-pointer mt-2">
            <div className="flex flex-wrap items-center justify-evenly">
              {dataChat.foto !== null ? (
                <img className="w-14 rounded-full" src={dataChat.foto} alt="" />
              ) : (
                <span className="h-fit w-fit p-4 bg-[#EAFBEE] rounded-full">
                  <svg
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 11.2422V18H21V20H1V18H2V11.2422C0.79401 10.435 0 9.0602 0 7.5C0 6.67286 0.22443 5.87621 0.63322 5.19746L3.3453 0.5C3.52393 0.1906 3.85406 0 4.21132 0H17.7887C18.1459 0 18.4761 0.1906 18.6547 0.5L21.3575 5.18172C21.7756 5.87621 22 6.67286 22 7.5C22 9.0602 21.206 10.435 20 11.2422ZM18 11.9725C17.8358 11.9907 17.669 12 17.5 12C16.2409 12 15.0789 11.478 14.25 10.6132C13.4211 11.478 12.2591 12 11 12C9.7409 12 8.5789 11.478 7.75 10.6132C6.9211 11.478 5.75911 12 4.5 12C4.331 12 4.16417 11.9907 4 11.9725V18H18V11.9725ZM4.78865 2L2.35598 6.21321C2.12409 6.59843 2 7.0389 2 7.5C2 8.8807 3.11929 10 4.5 10C5.53096 10 6.44467 9.3703 6.82179 8.4295C7.1574 7.59223 8.3426 7.59223 8.67821 8.4295C9.0553 9.3703 9.969 10 11 10C12.031 10 12.9447 9.3703 13.3218 8.4295C13.6574 7.59223 14.8426 7.59223 15.1782 8.4295C15.5553 9.3703 16.469 10 17.5 10C18.8807 10 20 8.8807 20 7.5C20 7.0389 19.8759 6.59843 19.6347 6.19746L17.2113 2H4.78865Z"
                      fill="#2EC99D"
                    />
                  </svg>
                </span>
              )}
              <span className="items-center">
                <p className="font-bold text-black text-left text-md ml-4">
                  {dataChat.name}
                </p>
                <p className="font-light text-gray-400 text-left text-sm ml-4">
                  {dataChat.message.message_content}
                </p>
              </span>
            </div>
            <div>
              <span className="items-start">
                <p className="text-sm text-[#51D7B1] font-semibold">15:15</p>
                <button className="bg-[#51D7B1] text-white text-[10px] py-1 px-2 rounded-full">
                  {dataChat.message.unread_count}
                </button>
              </span>
            </div>
          </div>
        </Link>
      </>
    );
  } else {
    return (
      <>
        <Link
          href={`/pesan/marketplace?id=${dataChat.id}&toko=${dataChat.name}`}
        >
          <div className="flex flex-wrap justify-between py-2 cursor-pointer mt-2">
            <div className="flex flex-wrap items-center justify-evenly">
              {dataChat.foto !== null ? (
                <img className="w-14 rounded-full" src={dataChat.foto} alt="" />
              ) : (
                <span className="h-fit w-fit p-4 bg-[#EAFBEE] rounded-full">
                  <svg
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 11.2422V18H21V20H1V18H2V11.2422C0.79401 10.435 0 9.0602 0 7.5C0 6.67286 0.22443 5.87621 0.63322 5.19746L3.3453 0.5C3.52393 0.1906 3.85406 0 4.21132 0H17.7887C18.1459 0 18.4761 0.1906 18.6547 0.5L21.3575 5.18172C21.7756 5.87621 22 6.67286 22 7.5C22 9.0602 21.206 10.435 20 11.2422ZM18 11.9725C17.8358 11.9907 17.669 12 17.5 12C16.2409 12 15.0789 11.478 14.25 10.6132C13.4211 11.478 12.2591 12 11 12C9.7409 12 8.5789 11.478 7.75 10.6132C6.9211 11.478 5.75911 12 4.5 12C4.331 12 4.16417 11.9907 4 11.9725V18H18V11.9725ZM4.78865 2L2.35598 6.21321C2.12409 6.59843 2 7.0389 2 7.5C2 8.8807 3.11929 10 4.5 10C5.53096 10 6.44467 9.3703 6.82179 8.4295C7.1574 7.59223 8.3426 7.59223 8.67821 8.4295C9.0553 9.3703 9.969 10 11 10C12.031 10 12.9447 9.3703 13.3218 8.4295C13.6574 7.59223 14.8426 7.59223 15.1782 8.4295C15.5553 9.3703 16.469 10 17.5 10C18.8807 10 20 8.8807 20 7.5C20 7.0389 19.8759 6.59843 19.6347 6.19746L17.2113 2H4.78865Z"
                      fill="#2EC99D"
                    />
                  </svg>
                </span>
              )}

              <span className="items-center">
                <p className="font-bold text-black text-left text-md ml-4">
                  {dataChat.name}
                </p>
                <p className="font-light text-gray-400 text-left text-sm ml-4">
                  {dataChat.message.message_content}
                </p>
              </span>
            </div>
            <div>
              <span className="items-start">
                <p className="text-sm text-gray-400 font-light">
                  {dataChat.message.time}
                </p>
              </span>
            </div>
          </div>
        </Link>
      </>
    );
  }
};

export default ChatlistMarketplace;
