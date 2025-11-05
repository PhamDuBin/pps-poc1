import { useState } from "react";
import { labelColor } from "../../../constants/colors";
import {
  symbols,
  leftLabels,
  rightLabels,
} from "../../../constants/input_inspection_result";
const Vessel = () => {
  const [states, setStates] = useState<number[][]>([Array(12).fill(0)]);

  const handleClick = (row: number, col: number) => {
    setStates((prev) => {
      const newStates = prev.map((r) => [...r]);
      newStates[row][col] = (newStates[row][col] + 1) % symbols.length;
      return newStates;
    });
  };

  const getButtonColor = (val: number) => {
    if (val === 2) return "bg-red-500";
    if (val === 3) return "bg-green-600";
    return "";
  };

  return (
    <>
      <span
        className={`flex justify-start font-bold p-1 my-1 ${labelColor} min-w-[919px] mt-4`}
      >
        容器
      </span>

      {/* Ô nhập số liệu */}
      <div className="flex gap-x-4 mb-1 px-1 border border-black min-w-[919px] text-[10px]">
        <div className="flex my-2 gap-x-2 items-center">
          <input
            type="text"
            className={`text-right border border-black p-2 w-16 h-8 placeholder-slate-950 `}
            placeholder="0"
          />
          <div>kg</div>
        </div>
        <div className="flex my-2 gap-x-2 items-center">
          <input
            type="text"
            className={`text-right border border-black p-2 w-12 h-8 placeholder-slate-950 `}
            placeholder="0"
          />
          <div>本</div>
        </div>
        <div className="flex my-2 gap-x-2 items-center">
          <input
            type="text"
            className={`text-right border border-black p-2 w-16 h-8 placeholder-slate-950`}
            placeholder="0"
          />
          <div>kg</div>
        </div>
        <div className="flex my-2 gap-x-2 items-center">
          <input
            type="text"
            className={`text-right border border-black p-2 w-12 h-8 placeholder-slate-950`}
            placeholder="0"
          />
          <div>本</div>
        </div>
        <div
          className={`flex justify-center items-center border border-black my-2 ${labelColor} w-20 h-8`}
        >
          貯蔵
        </div>
        <div className="flex my-2 gap-x-2 items-center">
          <input
            type="text"
            className={`text-right border border-black p-2 w-16 h-8 placeholder-slate-950 `}
            placeholder="0"
          />
          <div>kg</div>
        </div>
      </div>

      <div className="flex gap-x-2 min-w-[919px] text-[10px]">
        <div className="flex">
          <div
            className={`flex justify-center items-center font-bold border border-black w-36 ${labelColor}`}
          >
            基本項目
          </div>
          <div className="grid grid-cols-3">
            {leftLabels.map((label, idx) => {
              const val = states[0][idx];
              return (
                <div key={idx} className="flex items-center">
                  <div
                    className={`border border-black h-8 flex items-center pl-2 w-36 ${labelColor}`}
                  >
                    {label}
                  </div>
                  <button
                    className={`border border-slate-400 text-center cursor-pointer w-10 h-8 hover:bg-[#E5F7E5] ${getButtonColor(
                      val
                    )}`}
                    onClick={() => handleClick(0, idx)}
                  >
                    {symbols[val] || ""}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex">
          <div
            className={`flex justify-center items-center font-bold border border-black w-36 ${labelColor}`}
          >
            1t以上の貯蔵設備を対象
          </div>
          <div className="grid grid-cols-3">
            {rightLabels.map((label, idx) => {
              const val = states[0][leftLabels.length + idx];
              return (
                <div key={idx} className="flex items-center">
                  <div
                    className={`border border-black h-8 flex items-center pl-2 w-36 ${labelColor}`}
                  >
                    {label}
                  </div>
                  <button
                    className={`border border-slate-400 text-center cursor-pointer w-10 h-8 hover:bg-blue-100 ${getButtonColor(
                      val
                    )}`}
                    onClick={() => handleClick(0, leftLabels.length + idx)}
                  >
                    {symbols[val] || ""}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Vessel;
