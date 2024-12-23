import React, { useState } from 'react';
import IconWarna from '../icon/warna';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  subtitle2: string;
  options: string[];
  options2: string[];
  onSelect: (value: string) => void;
}

const PopupDoubleOptions: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  subtitle2,
  options,
  options2,
  onSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [expanded, setExpanded] = useState(null); // Track the expanded accordion

  const toggleAccordion = (id: any) => {
    setExpanded(expanded === id ? null : id); // Toggle accordion or close if it's already open
  };

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

        <div className="flex-1 overflow-y-auto space-y-4  scrollbar-hide">
            {/* Accordion 1 */}
            <div className="border border-gray-300 rounded-md">
                <button
                onClick={() => toggleAccordion('accordion1')}
                className="w-full rounded-md flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200"
                >
                <h3 className="font-semibold flex flex-wrap gap-2 items-center">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.7387 5.6863C10.9336 5.24735 11.0419 4.76141 11.0419 4.25016C11.0419 2.29416 9.45626 0.708496 7.50027 0.708496C5.54427 0.708496 3.95861 2.29416 3.95861 4.25016C3.95861 6.07951 5.34555 7.58493 7.12527 7.77221C7.98618 6.54537 9.32507 5.81406 10.7387 5.6863ZM8.31797 12.7121C8.91424 11.4239 8.95037 9.89848 8.31832 8.5394C9.37034 7.09185 11.3673 6.6435 12.9515 7.55815C14.6454 8.53622 15.2258 10.7021 14.2478 12.396C13.2698 14.09 11.1037 14.6704 9.40979 13.6924C8.96715 13.4368 8.60059 13.1002 8.31797 12.7121ZM3.44386 7.10255C4.26138 8.26301 5.56433 9.05691 7.05742 9.18909C7.78487 10.824 7.17464 12.7776 5.59044 13.6923C3.89648 14.6703 1.73043 14.0899 0.752427 12.396C-0.225576 10.702 0.354818 8.53593 2.04877 7.55794C2.49143 7.30237 2.96634 7.1532 3.44386 7.10255Z" fill="black"/>
                    </svg>
                    {subtitle}
                </h3>
                <span>{expanded === 'accordion1' ? '-' : '+'}</span>
                </button>
                {expanded === 'accordion1' && (
                <div className="p-3 space-y-2">
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
                )}
            </div>

            {/* Accordion 2 */}
            <div className="border border-gray-300 rounded-md">
                <button
                onClick={() => toggleAccordion('accordion2')}
                className="w-full flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200"
                >
                <h3 className="font-semibold flex flex-wrap gap-2 items-center">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.7387 5.6863C10.9336 5.24735 11.0419 4.76141 11.0419 4.25016C11.0419 2.29416 9.45626 0.708496 7.50027 0.708496C5.54427 0.708496 3.95861 2.29416 3.95861 4.25016C3.95861 6.07951 5.34555 7.58493 7.12527 7.77221C7.98618 6.54537 9.32507 5.81406 10.7387 5.6863ZM8.31797 12.7121C8.91424 11.4239 8.95037 9.89848 8.31832 8.5394C9.37034 7.09185 11.3673 6.6435 12.9515 7.55815C14.6454 8.53622 15.2258 10.7021 14.2478 12.396C13.2698 14.09 11.1037 14.6704 9.40979 13.6924C8.96715 13.4368 8.60059 13.1002 8.31797 12.7121ZM3.44386 7.10255C4.26138 8.26301 5.56433 9.05691 7.05742 9.18909C7.78487 10.824 7.17464 12.7776 5.59044 13.6923C3.89648 14.6703 1.73043 14.0899 0.752427 12.396C-0.225576 10.702 0.354818 8.53593 2.04877 7.55794C2.49143 7.30237 2.96634 7.1532 3.44386 7.10255Z" fill="black"/>
                    </svg>
                    {subtitle2}
                </h3>
                <span>{expanded === 'accordion2' ? '-' : '+'}</span>
                </button>
                {expanded === 'accordion2' && (
                <div className="p-3 space-y-2">
                    {options2.map((option2) => (
                    <label
                        key={option2}
                        className="flex items-center space-x-3 p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                    >
                        <input
                        type="radio"
                        name="popup-option"
                        value={option2}
                        checked={selectedOption === option2}
                        onChange={() => setSelectedOption(option2)}
                        className="form-radio text-emerald-500"
                        />
                        <span>{option2}</span>
                    </label>
                    ))}
                </div>
                )}
            </div>
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

export default PopupDoubleOptions;
