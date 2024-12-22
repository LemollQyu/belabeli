"use client";

import { useState } from "react";

const NumberInputWithSlider = () => {
  const [value, setValue] = useState(0);

  const handleSliderChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleInputChange = (e: any) => {
    setValue(e.target.value ? parseInt(e.target.value) : 0);
  };

  console.log(value);

  return (
    <>
      <div className="flex w-full items-center justify-between ">
        <div className="relative flex items-center justify-between px-2 rounded-md border-[2px] h-[24px] w-[234px]">
          <input
            type="range"
            min="0"
            max="100000"
            value={value}
            onChange={handleSliderChange}
            className="w-[171px] h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#51D7B1]"
          />
          <div className="flex items-center justify-center">
            <input
              type="number"
              min="0"
              max="100000"
              value={value}
              onChange={handleInputChange}
              className="w-[50px] text-[8px] text-center text-[#949494]"
            />
          </div>
        </div>

        <button className="w-[68px] h-[24px] text-white bg-[#51D7B1] rounded-lg text-[10px]">
          Ajukan
        </button>
      </div>
    </>
  );
};

export default NumberInputWithSlider;
