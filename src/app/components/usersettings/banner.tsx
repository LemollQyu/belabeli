import React, { useState } from 'react';

const BannerUpload = () => {
  const [images, setImages] = useState<(File | null)[]>([null, null, null]);
  const [showSizePopup, setShowSizePopup] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);

  const handleFileChange = (acceptedFiles: File[], index: number) => {
    const file = acceptedFiles[0];

    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setShowSizePopup(true);
      return;
    }

    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = file;
      return updatedImages;
    });
  };

  const handleCancelUpload = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = null;
      return updatedImages;
    });
  };

  const handleUpload = () => {
    // Simulate successful upload
    setShowUploadPopup(true);
  };

  const closePopup = () => {
    setShowUploadPopup(false);
  };

  return (
    <>
      <div className="flex gap-2">
        {images.map((file, index) => (
          <div key={index} className="relative w-[120px] h-[120px] border rounded-lg bg-gray-200 flex items-center justify-center">
            {file ? (
              <div className="relative w-full h-full">
                <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover rounded-lg" />
                <button
                  onClick={() => handleCancelUpload(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-center w-full h-full cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) handleFileChange([files[0]], index);
                  }}
                />
                <span className="text-gray-500 text-lg">+</span>
              </label>
            )}
          </div>
        ))}
      </div>

      {/* Button Upload */}
      {/* <button
        onClick={handleUpload}
        className="w-full mt-4 px-4 py-2 bg-[#51D7B1]  text-white rounded-lg"
      >
        Upload Banner
      </button> */}

      {/* Popup jika ukuran file lebih dari 2 MB */}
      {showSizePopup && (
        <div className="fixed inset-0 flex items-end justify-center z-50 font-nunito">
          <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setShowSizePopup(false)}></div>
          <div className="bg-white p-6 h-[328px] rounded-t-[24px] w-full max-w-md shadow-lg z-50 animate-slide-up font-nunito relative">
            <div className="mt-4 border rounded-lg p-4 mb-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-black"
                >
                  <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" />
                  <path d="M12 8v4M12 16h.01" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[16px] font-semibold text-black">Gambar terlalu besar</span>
              </div>
              <div className="border-t border-gray-300 my-2"></div>
              <p className="text-[14px] text-black">Maksimal Gambar / Video 2 MB</p>
            </div>
            <div className="mt-[110px]">
              <button
                onClick={() => setShowSizePopup(false)}
                className="w-full py-3 bg-[#51D7B1] text-white text-[16px] font-bold rounded-lg"
              >
                Pilih Ulang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup Upload Berhasil */}
      {showUploadPopup && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={closePopup}></div>
          <div onClick={closePopup} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-[310px] h-[219px] rounded-xl bg-white flex flex-col items-center justify-center gap-2 shadow-lg p-5 border">
              <svg xmlns="http://www.w3.org/2000/svg" width="85" height="84" viewBox="0 0 85 84" fill="none">
                <path d="M42.5002 83.6667C19.4883 83.6667 0.833496 65.0117 0.833496 42C0.833496 18.9882 19.4883 0.333374 42.5002 0.333374C65.5118 0.333374 84.1668 18.9882 84.1668 42C84.1668 65.0117 65.5118 83.6667 42.5002 83.6667ZM38.3443 58.6667L67.8072 29.2039L61.9147 23.3114L38.3443 46.8817L26.5594 35.0963L20.6668 40.9892L38.3443 58.6667Z" fill="url(#paint0_linear_5431_5061)" />
                <defs>
                  <linearGradient id="paint0_linear_5431_5061" x1="0.833496" y1="42" x2="84.1668" y2="42" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#83E69B" />
                    <stop offset="1" stopColor="#00BAE1" />
                  </linearGradient>
                </defs>
              </svg>
              <h1 className="mt-4 font-nunitoBold text-lg text-center">Banner Berhasil Disimpan</h1>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BannerUpload;
