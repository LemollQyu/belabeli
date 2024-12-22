"use client";
import React, { useState } from "react";
import Image from "next/image";
import IconFotoPlus from "../icon/foto-plus";

interface FileUploadProps {
  maxFiles?: number;
  onFilesChange: (files: (File | null)[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  maxFiles = 5,
  onFilesChange,
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
        <div className="w-[60px] h-[60px] rounded-md bg-red-200 flex items-center justify-center">
          <p className="font-nunito text-[8px] text-center">{error}</p>
        </div>
      );
    }

    if (!file) {
      return (
        <div className="w-[60px] h-[60px] rounded-md bg-white flex items-center justify-center">
          <IconFotoPlus></IconFotoPlus>
        </div>
      );
    }

    const fileURL = URL.createObjectURL(file);
    return (
      <div
        className="relative w-[60px] h-[60px] rounded-md cursor-pointer"
        onClick={() => handlePreview(file)}
      >
        {file.type.startsWith("image/") ? (
          <Image
            src={fileURL}
            alt="Preview"
            width={500}
            height={500}
            className="w-[60px] h-[60px] rounded-md object-cover"
            unoptimized
          />
        ) : (
          <video
            src={fileURL}
            className="w-[60px] h-[60px] rounded-md object-cover"
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
    <div className="flex justify-between items-center gap-1">
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

export default FileUpload;
