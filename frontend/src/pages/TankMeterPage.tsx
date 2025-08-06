import React, { useState } from "react";
import BackButton from "../component/BackButton";

const TOTAL_BLOCKS = 10;

const TankMeter = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const numericValue = parseInt(inputValue, 10) || 0;
  const filledBlocksCount = Math.floor(numericValue / TOTAL_BLOCKS);

  return (
    <div className="flex flex-col items-center font-sans text-gray-800 p-8 my-8 mx-auto w-full max-w-md border border-gray-300 rounded-lg bg-gray-50">
      <BackButton />
      <h2 className="text-2xl font-bold text-gray-900">
        入力値と連動する動的タンクメーター
      </h2>

      <div className="w-full text-left my-6">
        <p className="my-1">1.入力した値により、タンクの色が変わります。</p>
        <p className="my-1">2.入力値を10%単位で切り捨て表示します</p>
      </div>

      <div className="flex items-end gap-4">
        <div className="w-[200px] h-[300px] border-2 border-gray-600 bg-gray-200 flex flex-col-reverse">
          {Array.from({ length: TOTAL_BLOCKS }, (_, index) => {
            const isFilled = index < filledBlocksCount;
            const baseBlockClasses =
              "w-full h-[10%] border-t border-gray-400 transition-colors duration-300";

            const colorClass = isFilled ? "bg-blue-500" : "bg-gray-200";

            return (
              <div
                key={index}
                className={`${baseBlockClasses} ${colorClass}`}
              />
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            min="0"
            className="w-[60px] p-2 text-lg text-right border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
          />

          <span className="text-lg font-bold">%</span>
        </div>
      </div>
    </div>
  );
};

export default TankMeter;
