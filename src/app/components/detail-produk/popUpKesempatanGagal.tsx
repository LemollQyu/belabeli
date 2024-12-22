"use client";
import React from "react";

interface CobaProps {
  isActive: boolean;
  handleClose: () => void;
  message: string;
}

export default function Coba({ isActive, handleClose, message }: CobaProps) {
  return (
    <>
      {isActive && (
        <div
          className={`w-[310px] border rounded-md h-[219px] -translate-y-1/2 fixed top-1/2 left-1/2 -translate-x-1/2 bg-white z-40 flex flex-col justify-center gap-2 items-center px-5`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            className="absolute right-5 top-5"
            onClick={handleClose}
          >
            <path
              d="M12.9997 11.4687L18.362 6.10645L19.894 7.63851L14.5317 13.0008L19.894 18.3629L18.362 19.895L12.9997 14.5328L7.63746 19.895L6.10538 18.3629L11.4676 13.0008L6.10538 7.63851L7.63746 6.10645L12.9997 11.4687Z"
              fill="black"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="85"
            height="84"
            viewBox="0 0 85 84"
            fill="none"
          >
            <path
              d="M42.5 83.6667C19.4881 83.6667 0.833344 65.0117 0.833344 42C0.833344 18.9882 19.4881 0.333374 42.5 0.333374C65.5117 0.333374 84.1667 18.9882 84.1667 42C84.1667 65.0117 65.5117 83.6667 42.5 83.6667ZM42.5 36.1075L30.7149 24.3224L24.8223 30.2149L36.6075 42L24.8223 53.785L30.7149 59.6775L42.5 47.8925L54.285 59.6775L60.1775 53.785L48.3925 42L60.1775 30.2149L54.285 24.3224L42.5 36.1075Z"
              fill="#EE443F"
            />
          </svg>

          <h1 className="text-[16px] font-nunitoBold text-center">Gagal</h1>
          <p className="text-[12px] font-nunito text-center">{message}</p>
        </div>
      )}
    </>
  );
}
