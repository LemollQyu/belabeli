"use client";
import React, { useState } from "react";
import Image from "next/image";
import IconFotoPlus from "../icon/foto-plus";

interface FileUploadPengembalian {
  maxFiles?: number;
  onFilesChange: (files: (File | null)[]) => void;
  w?:string,
  h?:string
}

const FileUploadPengembalian: React.FC<FileUploadPengembalian> = ({
  maxFiles,
  onFilesChange,
  w,
  h
}) => {
  const [files, setFiles] = useState<(File | null)[]>(
    Array(maxFiles).fill(null)
  );
  const [errors, setErrors] = useState<string[]>(Array(maxFiles).fill(""));
  const [previewFile, setPreviewFile] = useState<File | null>(null); // For pop-up preview
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // Pop-up open state

  const handleFileChange = (index: number, file: File | null) => {
    const updatedFiles = [...files];
    const updatedErrors = [...errors];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        updatedErrors[index] = "Maksimal file 5 MB";
        updatedFiles[index] = null;
      } else {
        updatedErrors[index] = "";
        updatedFiles[index] = file;
      }
    } else {
      updatedErrors[index] = "";
      updatedFiles[index] = null;
    }

    setFiles(updatedFiles);
    setErrors(updatedErrors);
    onFilesChange(updatedFiles);
  };

  const handleDelete = (index: number) => {
    const updatedFiles = [...files];
    const updatedErrors = [...errors];
    updatedFiles[index] = null;
    updatedErrors[index] = "";
    setFiles(updatedFiles);
    setErrors(updatedErrors);
    onFilesChange(updatedFiles);
  };

  const handlePreview = (file: File | null) => {
    if (file) {
      setPreviewFile(file);
      setIsPreviewOpen(true); // Open pop-up when file is clicked
    }
  };

  const closePreview = () => {
    setPreviewFile(null);
    setIsPreviewOpen(false); // Close pop-up
  };

  const renderPreview = (file: File | null, error: string, index: number) => {
    if (error) {
      return (
        <div className={`w-${w} h-${h} rounded-md bg-red-200 flex items-center justify-center`}>
          <p className="font-nunito text-[8px] text-center">{error}</p>
        </div>
      );
    }

    if (!file) {
      return (
        <div className={`w-${w} h-${h} rounded-md bg-[#D3D3D3] flex items-center justify-center`}>
            <svg width="40" height="40" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.16675 8.16669V4.83335H9.83342V8.16669H13.1667V9.83335H9.83342V13.1667H8.16675V9.83335H4.83341V8.16669H8.16675ZM9.00008 17.3334C4.39771 17.3334 0.666748 13.6024 0.666748 9.00002C0.666748 4.39765 4.39771 0.666687 9.00008 0.666687C13.6024 0.666687 17.3334 4.39765 17.3334 9.00002C17.3334 13.6024 13.6024 17.3334 9.00008 17.3334ZM9.00008 15.6667C12.682 15.6667 15.6667 12.6819 15.6667 9.00002C15.6667 5.31812 12.682 2.33335 9.00008 2.33335C5.31818 2.33335 2.33341 5.31812 2.33341 9.00002C2.33341 12.6819 5.31818 15.6667 9.00008 15.6667Z" fill="white"/>
            </svg>
        </div>
      );
    }

    const fileURL = URL.createObjectURL(file);
    return (
      <div
        className={`relative w-${w} h-${h} rounded-md cursor-pointer`}
        onClick={() => handlePreview(file)}
      >
        {file.type.startsWith("image/") ? (
          <Image
            src={fileURL}
            alt="Preview"
            width={500}
            height={500}
            className={`w-${w} h-${h} rounded-md object-cover`}
            unoptimized
          />
        ) : (
          <video
            src={fileURL}
            className={`w-${w} h-${h} rounded-md object-cover`}
            controls
          />
        )}
        <button
          className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-sm px-1"
          onClick={(e) => {
            e.stopPropagation(); // Prevent click event from opening preview
            handleDelete(index);
          }}
        >
          ✕
        </button>
      </div>
    );
  };

  return (
    <div className="justify-between items-center grid grid-cols-2 gap-5">
      {files.map((file, index) => (
        <div key={index} className="rounded-md border-2">
          <label className="cursor-pointer">
            {renderPreview(file, errors[index], index)}
            <input
              type="file"
              accept="image/*, video/*"
              className="hidden"
              onChange={(e) => {
                const selectedFile = e.target.files ? e.target.files[0] : null;
                handleFileChange(index, selectedFile);
              }}
            />
          </label>
        </div>
      ))}

      {/* Pop-up modal */}
      {isPreviewOpen && previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg relative border w-[300px] h-[300px]  overflow-auto">
            {previewFile.type.startsWith("image/") ? (
              <Image
                src={URL.createObjectURL(previewFile)}
                alt="Preview"
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <video
                src={URL.createObjectURL(previewFile)}
                className="w-full h-full object-cover"
                controls
              />
            )}
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
              onClick={closePreview}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadPengembalian;
