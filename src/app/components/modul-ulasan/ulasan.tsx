"use client";

import Image from "next/image";
import { useState } from "react";

export default function Ulasan({
  name,
  rate,
  image,
  onLaporkan,
  pesan,
  imageProfile,
}: any) {
  const [ada, setAda] = useState<boolean>(false);
  const [countLike, setCountLike] = useState<number>(0);

  function handleLaporkan() {
    console.log("laporkan");
    setAda(true);
    onLaporkan(true); // Memanggil callback dan mengirimkan value 'ada' ke page
  }

  function handleLike() {
    console.log("like");
    if (countLike < 0) {
      setCountLike(0);
    } else {
      setCountLike((count) => count + 1);
    }
  }

  console.log(countLike);

  return (
    <>
      <div className="mt-[8px]">
        <div className="p-2 rounded-md flex flex-col gap-[4px] bg-[#FAFAFA] w-[full]">
          <div className="flex items-center justify-between">
            {/* photo, name, star rate */}
            <div className=" flex gap-[5px]">
              <div className="rounded-full overflow-hidden w-[18px] h-[18px]">
                <Image
                  src={imageProfile}
                  alt="hallo"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-[12px] font-nunitoBold">{name}</h1>

              <div
                className="flex gap-2 items-center ml-2
              "
              >
                {Array.from({ length: rate }).map((_, index) => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    key={index}
                  >
                    <g clipPath="url(#clip0_3106_3864)">
                      <path
                        d="M5.00041 7.60825L2.06148 9.25333L2.71786 5.94988L0.245117 3.66317L3.58972 3.26661L5.00041 0.208252L6.41108 3.26661L9.75566 3.66317L7.28295 5.94988L7.93933 9.25333L5.00041 7.60825Z"
                        fill="#FFCD29"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3106_3864">
                        <rect width="10" height="10" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                ))}
              </div>
            </div>
            {/* tutup photo, name, star rate */}

            {/* love and warning ualasan */}
            <div className="flex gap-2 items-center">
              <p className="text-[8px]">{countLike == 0 ? " " : countLike}</p>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleLike}
              >
                <g id="heart-3-line">
                  <path
                    id="Vector"
                    d="M9.62484 1.75C11.3968 1.75 12.8332 3.20833 12.8332 5.25C12.8332 9.33333 8.45817 11.6667 6.99984 12.5417C5.5415 11.6667 1.1665 9.33333 1.1665 5.25C1.1665 3.20833 2.62484 1.75 4.37484 1.75C5.45982 1.75 6.4165 2.33333 6.99984 2.91667C7.58317 2.33333 8.53984 1.75 9.62484 1.75ZM7.54461 10.8522C8.05888 10.5283 8.52234 10.2057 8.95686 9.86003C10.6945 8.47758 11.6665 6.96704 11.6665 5.25C11.6665 3.87378 10.7699 2.91667 9.62484 2.91667C8.99723 2.91667 8.31776 3.24865 7.82479 3.74162L6.99984 4.56658L6.17489 3.74162C5.6819 3.24865 5.00245 2.91667 4.37484 2.91667C3.24262 2.91667 2.33317 3.88296 2.33317 5.25C2.33317 6.96704 3.30516 8.47758 5.04284 9.86003C5.47734 10.2057 5.9408 10.5283 6.45506 10.8522C6.62919 10.9619 6.80215 11.0675 6.99984 11.1855C7.19753 11.0675 7.37049 10.9619 7.54461 10.8522Z"
                    fill="#2A2A2A"
                  />
                </g>
              </svg>

              {/*Laporkan*/}
              {/* Laporkan */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleLaporkan} // Pastikan handleLaporkan dipanggil di sini
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
            {/* tutup love and warning */}
          </div>
          {/* message ulasan */}

          <p className="font-nunito text-[10px] mt-[3px]">{pesan}</p>

          {/* tutup message ulasan */}

          {image == "" || null ? null : (
            <div className="mt-[5px] flex gap-[10px]">
              <div className="w-[64px] h-[64px] rounded-md border overflow-hidden">
                <Image
                  src={`/image/${image}`}
                  alt="hallo"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[64px] h-[64px] rounded-md border"></div>
              <div className="w-[64px] h-[64px] rounded-md border"></div>
            </div>
          )}
        </div>
      </div>
      {/* Laporkan */}

      {/* <div className={` h-[428px] border fixed bottom-[44px]  rounded-t-lg`}>
        <div>
          <h1 className="text-[16px] font-nunitoBold">Laporkan Ulasan</h1>
        </div>
      </div> */}

      {/* akhir laporkan */}
    </>
  );
}
