"use client";

import { useState } from "react";

export default function Ulasan({ name, rate, image, onLaporkan }: any) {
  const [ada, setAda] = useState<boolean>(false);

  function handleLaporkan() {
    console.log("laporkan");
    setAda(true);
    onLaporkan(true); // Memanggil callback dan mengirimkan value 'ada' ke page
  }

  return (
    <>
      <div className="mt-[8px]">
        <div className="p-2 rounded-md bg-[#FAFAFA] w-[full]">
          <div className="flex items-center justify-between">
            {/* Konten lainnya */}
            <div className="flex gap-2">
              {/* Laporkan */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleLaporkan}
              >
                <g id="error-warning-line">
                  <path
                    id="Vector"
                    d="M6.99984 12.8334C3.77817 12.8334 1.1665 10.2217 1.1665 7.00008C1.1665 3.77842 3.77817 1.16675 6.99984 1.16675C10.2215 1.16675 12.8332 3.77842 12.8332 7.00008C12.8332 10.2217 10.2215 12.8334 6.99984 12.8334ZM6.99984 11.6667C9.57718 11.6667 11.6665 9.57742 11.6665 7.00008C11.6665 4.42275 9.57718 2.33341 6.99984 2.33341C4.42251 2.33341 2.33317 4.42275 2.33317 7.00008C2.33317 9.57742 4.42251 11.6667 6.99984 11.6667ZM6.4165 8.75008H7.58317V9.91675H6.4165V8.75008ZM6.4165 4.08341H7.58317V7.58341H6.4165V4.08341Z"
                    fill="#2A2A2A"
                  />
                </g>
              </svg>
            </div>
            {/* Tutup Laporkan */}
          </div>
        </div>
      </div>
    </>
  );
}
