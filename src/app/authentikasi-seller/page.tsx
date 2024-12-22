"use client";

import { useState, useRef } from "react";

const Auth = () => {
  const [fileKtp, setFileKtp] = useState<any>(null);
  const [previewKtp, setPreviewKtp] = useState<any>(null);
  const fileInputRef = useRef<any>(null);

  const [name, setName] = useState<string>("");
  const [NIK, setNIK] = useState<string>("");

  console.log(NIK, name);

  const handleButtonClickChooseFileKtp = () => {
    fileInputRef.current.click();
  };

  const handleRemoveKtp = () => {
    setFileKtp(null);
    setPreviewKtp(null);
  };

  const handleFileKtpChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      setFileKtp(file);
      setPreviewKtp(URL.createObjectURL(file));
    }
  };

  console.log(fileKtp);
  console.log(previewKtp);

  return (
    <>
      <div className="border w-full flex items-center flex-col justify-center gap-2">
        <h1 className="font-nunitoBold text-[16px]">Masukan Foto TKP</h1>

        <div
          className="w-[312px] border rounded-full  h-[60px] font-nunito border-2 border-black flex justify-center items-center "
          onClick={handleButtonClickChooseFileKtp}
        >
          {previewKtp ? (
            <div className=" w-[60px] h-[60px] rounded-lg overflow-hidden relative">
              <div
                className="absolute top-1 cursor-pointer right-1 border rounded-full h-[20px] w-[20px] flex items-center justify-center text-white"
                onClick={handleRemoveKtp}
              >
                x
              </div>
              <img
                src={previewKtp}
                alt="Preview KTP"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                fill="black"
              />
            </svg>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileKtpChange}
          className="hidden"
        />
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <div className="border w-full h-[56px] rounded-lg px-2 pt-4 bg-[#f1f1f1] relative">
          <span className="absolute text-xs left-2 top-0">Name</span>
          <input
            value={name}
            onChange={(e) => {
              console.log(e.target.value.length);
              if (e.target.value.length < 60) {
                setName(e.target.value);
              }
            }}
            className="font-bold w-full h-full bg-[#f1f1f1] outline-none"
            type="text"
          />
        </div>
        <div className="border w-full h-[56px] rounded-lg px-2 pt-4 bg-[#f1f1f1] relative">
          <span className="absolute text-xs left-2 top-0">NIK</span>
          <input
            value={NIK}
            onChange={(e) => {
              console.log(e.target.value.length);
              if (e.target.value.length < 60) {
                setNIK(e.target.value);
              }
            }}
            className="font-bold w-full h-full bg-[#f1f1f1] outline-none"
            type="text"
          />
        </div>
      </div>
    </>
  );
};

export default Auth;
