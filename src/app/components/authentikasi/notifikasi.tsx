"use client";
import { useState } from "react";
export default function Notifikasi({ pesan, onClose }: any) {
  let [ada, setAda] = useState(true);

  function handleClick() {
    setAda(false);
    onClose(false);
  }
  return (
    <>
      {ada && (
        <div
          onClick={handleClick}
          className="w-[312px] border h-[142px] z-10 fixed left-1/2 -translate-y-1/2 top-1/2 bg-white rounded-xl -translate-x-1/2"
        >
          <h1 className="text-center text-[16px] font-nunitoBold border-b-[1px] py-[10px] border-[#B3B3B3]">
            Notifikasi
          </h1>
          <p className="text-[12px] pt-[20px] font-nunito text-center">
            {pesan}
          </p>
        </div>
      )}
    </>
  );
}
