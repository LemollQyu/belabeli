import { useRouter } from "next/navigation";
import React from "react";

interface SHistoryProps {
  status?: Boolean; // Make the title prop optional
}

const Searchresult: React.FC<SHistoryProps> = ({ status }) => {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    router.back();
  };

  if (status) {
    return <></>;
  } else {
    return (
      <>
        <div className="flex flex-wrap py-5 mb-10 mt-2 items-center justify-center">
          <span>
            <svg
              width="85"
              height="85"
              viewBox="0 0 85 85"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M67.1293 61.2366L84.9739 79.0812L79.0814 84.9737L61.2368 67.1291C54.8206 72.2624 46.6835 75.3332 37.8335 75.3332C17.1335 75.3332 0.333496 58.5332 0.333496 37.8333C0.333496 17.1333 17.1335 0.333252 37.8335 0.333252C58.5335 0.333252 75.3335 17.1333 75.3335 37.8333C75.3335 46.6833 72.2627 54.8203 67.1293 61.2366ZM58.7697 58.1449C63.8647 52.8941 67.0002 45.7316 67.0002 37.8333C67.0002 21.7187 53.9481 8.66658 37.8335 8.66658C21.7189 8.66658 8.66683 21.7187 8.66683 37.8333C8.66683 53.9478 21.7189 66.9999 37.8335 66.9999C45.7318 66.9999 52.8943 63.8645 58.1452 58.7695L58.7697 58.1449Z"
                fill="url(#paint0_linear_3663_12160)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_3663_12160"
                  x1="0.333496"
                  y1="42.6535"
                  x2="84.9739"
                  y2="42.6535"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#83E69B" />
                  <stop offset="1" stopColor="#00BAE1" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </div>

        <div className="flex flex-wrap py-5 items-center justify-center">
          <span className="font-semibold text-[#999999] pr-1 text-sm">
            Tidak ada hasil untuk{" "}
          </span>
          <span className="font-semibold text-sm text-black">Keyword</span>
        </div>

        <div className="flex flex-wrap py-3 items-center justify-center">
          <button className="bg-[#51D7B1] text-white py-3 px-5 text-sm rounded-lg">
            {" "}
            Coba lagi{" "}
          </button>
        </div>
      </>
    );
  }
};

export default Searchresult;
