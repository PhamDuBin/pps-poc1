import { useState } from "react";

const Vessel = () => {
  const symbols = ["", "◯", "×", "✔"];

  const leftLabels = [
    "①火気制限",
    "②40℃以下",
    "③設置場所",
    "④転倒転落週出防止",
    "⑤バルブ損傷防止",
    "⑥腐食防止",
  ];

  const rightLabels = [
    "⑦保安距離",
    "⑧滞留防止",
    "⑨柵塀設置",
    "⑩警戒標",
    "⑪消火設備",
    "⑫屋根・遮蔽板",
  ];

  const [states, setStates] = useState<number[][]>([Array(12).fill(0)]);

  const handleClick = (row: number, col: number) => {
    setStates((prev) => {
      const newStates = prev.map((r) => [...r]);
      newStates[row][col] = (newStates[row][col] + 1) % symbols.length;
      return newStates;
    });
  };

  return (
    <>
      <span className="flex justify-start font-bold p-1 my-1 bg-[#D9D9D9] min-w-[919px] mt-4">
        容器
      </span>

      {/* Ô nhập số liệu */}
      <div className="flex gap-x-4 mb-1 px-1 border border-black min-w-[919px]">
        <div className="flex my-2 gap-x-2 items-center">
          <input
            type="text"
            className="text-right border border-black p-2 w-16 h-8 placeholder-slate-950"
            placeholder="0"
          />
          <div>kg</div>
        </div>
        <div className="flex my-2 gap-x-2 items-center">
          <input
            type="text"
            className="text-right border border-black p-2 w-12 h-8 placeholder-slate-950"
            placeholder="0"
          />
          <div>本</div>
        </div>
        <div className="flex my-2 gap-x-2 items-center">
          <input
            type="text"
            className="text-right border border-black p-2 w-16 h-8 placeholder-slate-950"
            placeholder="0"
          />
          <div>kg</div>
        </div>
        <div className="flex my-2 gap-x-2 items-center">
          <input
            type="text"
            className="text-right border border-black p-2 w-12 h-8 placeholder-slate-950"
            placeholder="0"
          />
          <div>本</div>
        </div>
        <div className="flex justify-center items-center border border-black my-2 bg-gray-200 w-20 h-8">
          貯蔵
        </div>
        <div className="flex my-2 gap-x-2 items-center">
          <input
            type="text"
            className="text-right border border-black p-2 w-16 h-8 placeholder-slate-950"
            placeholder="0"
          />
          <div>kg</div>
        </div>
      </div>

      {/* Bảng chính */}
      <div className="flex gap-x-2 min-w-[919px]">
        {/* Bảng trái */}
        <div className="flex">
          <div className="flex text-[12px] justify-center items-center font-bold bg-[#D9D9D9] border border-black w-36">
            基本項目
          </div>
          <div className="grid grid-cols-3">
            {leftLabels.map((label, idx) => (
              <div key={idx} className="flex items-center">
                <div className="border border-black h-8 flex items-center pl-2 text-xs bg-gray-100 w-36">
                  {label}
                </div>
                <button
                  className="border border-slate-400 text-center cursor-pointer w-10 h-8"
                  onClick={() => handleClick(0, idx)}
                >
                  {symbols[states[0][idx]] || ""}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bảng phải */}
        <div className="flex">
          <div className="flex text-[12px] justify-center items-center font-bold bg-[#D9D9D9] border border-black w-36">
            1t以上の貯蔵設備を対象
          </div>
          <div className="grid grid-cols-3">
            {rightLabels.map((label, idx) => (
              <div key={idx} className="flex items-center">
                <div className="border border-black h-8 flex items-center pl-2 text-xs bg-gray-100 w-36">
                  {label}
                </div>
                <button
                  className="border border-slate-400 text-center cursor-pointer w-10 h-8"
                  onClick={() => handleClick(0, leftLabels.length + idx)}
                >
                  {symbols[states[0][leftLabels.length + idx]] || ""}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Vessel;
