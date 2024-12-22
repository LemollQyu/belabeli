import React from 'react';

interface PopupProps {
  title: string;
  content: React.ReactNode; // content bisa berupa string, JSX atau komponen lain
  onClose: () => void; // onClose adalah fungsi yang tidak mengembalikan apa-apa
}

const Popup: React.FC<PopupProps> = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-end justify-center z-50 font-nunito">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>

      {/* Popup Content */}
      <div className="bg-white p-6 h-[340px] text-black rounded-t-[24px] w-full max-w-md shadow-lg relative overflow-hidden animate-slide-up flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-[16px] text-black font-semibold">{title}</h1>
          <svg
            onClick={onClose}
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="cursor-pointer"
          >
            <path
              d="M6.99976 5.46871L12.362 0.106445L13.8941 1.63851L8.53181 7.00076L13.8941 12.3629L12.362 13.895L6.99976 8.53281L1.63754 13.895L0.105469 12.3629L5.46771 7.00076L0.105469 1.63851L1.63754 0.106445L6.99976 5.46871Z"
              fill="black"
            />
          </svg>
        </div>

        {/* Isi Konten */}
        <div className="w-full max-h-[200px] overflow-y-auto border text-[14px] rounded-[8px] font-medium p-[12px] text-left">
          {content}
        </div>

        {/* Button */}
        <button
          onClick={onClose}
          className="mt-auto w-full h-[45px] rounded-md bg-[#51D7B1] text-white flex justify-center items-center"
        >
          Oke
        </button>
      </div>
    </div>
  );
};

export default Popup;
