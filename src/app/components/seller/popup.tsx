import React, { useState } from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  options: string[];
  onSelect: (value: string) => void;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  title,
  options,
  onSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-center z-50 font-nunito">
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Popup Content */}
      <div className="bg-white p-6 h-[350px] text-black rounded-t-[24px] w-full max-w-md shadow-lg relative z-50 overflow-hidden animate-slide-up flex flex-col">
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

        {/* Popup Content */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center space-x-3 p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
            >
              <input
                type="radio"
                name="popup-option"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
                className="form-radio text-emerald-500"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>

        {/* Confirm Button */}
        <button
          onClick={() => {
            if (selectedOption) {
              onSelect(selectedOption);
              onClose();
            }
          }}
          className={`mt-4 w-full py-3 px-4 rounded-md font-semibold text-white ${
            selectedOption ? 'bg-[#51d7b1] hover:bg-emerald-500' : 'bg-gray-300 cursor-not-allowed'
          }`}
          disabled={!selectedOption}
        >
          Pilih
        </button>
      </div>
    </div>
  );
};

export default Popup;
