import ModalF1 from "../../modal/Modal_F1";
import { useState } from "react";
import { labelColor, inputColor } from "../../../constants/colors";
import { symbols } from "../../../constants/input_inspection_result";
const TerminalGasValve = () => {
  const [modalF1Open, setModalF1Open] = useState(false);

  const totalRows = 20;

  const [states, setStates] = useState(
    Array(totalRows)
      .fill(null)
      .map(() => Array(10).fill(0))
  );

  const handleClick = (row: number, col: number) => {
    setStates((prev) => {
      const newStates = prev.map((r) => [...r]);
      newStates[row][col] = (newStates[row][col] + 1) % symbols.length;
      return newStates;
    });
  };

  return (
    <>
      <span
        className={`flex justify-start text-start font-bold p-1 ${labelColor} mt-4`}
      >
        末端ガス栓
      </span>
      <div className="flex flex-row p-1 w-full text-[10px]">
        <span
          className={`w-1/12 border border-black p-1 flex justify-center min-w-[83px] ${labelColor}`}
        >
          設置個数
        </span>
        <input
          className={`border border-black w-12 ml-3 hover:bg-gray-400`}
        ></input>
        <span
          className={`w-1/12 border border-black p-1 flex justify-center min-w-[83px] ${labelColor} ml-4`}
        >
          合計口数
        </span>
        <input
          className={`border border-black w-12 ml-3 hover:bg-gray-400`}
        ></input>
        <span
          className={`w-1/12 border border-black p-1 flex justify-center min-w-[83px] ${labelColor} ml-4`}
        >
          使用口数
        </span>
        <input
          className={`border border-black w-12 ml-3 hover:bg-gray-400`}
        ></input>
        <span
          className={`w-1/12 border border-black p-1 flex justify-center min-w-[83px] ${labelColor} ml-4`}
        >
          未使用口数
        </span>
        <input
          className={`border border-black w-12 ml-3 hover:bg-gray-400`}
        ></input>
      </div>

      <div className="w-full min-w-[922px] text-[10px] mt-2">
        <div className="overflow-auto h-40 border border-black">
          <table className="w-full  table-fixed border-collapse">
            <thead className={`h-[35px] ${labelColor}`}>
              <tr className={`sticky top-0 ${labelColor} z-10`}>
                <th className="border border-black text-center">No.</th>
                <th className="border border-black text-center">種別</th>
                <th className="border border-black text-center">メーカー</th>
                <th className="border border-black text-center">型式</th>
                <th className="border border-black text-center">製造年月</th>
                <th className="border border-black text-center">口数</th>
                <th className="border border-black text-center">個数</th>
                <th className="border border-black text-center w-10">詳細</th>
                <th className="border border-black text-center w-10">規格</th>
                <th className="border border-black text-center w-10">腐食</th>
                <th className="border border-black text-center w-10">判定</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: totalRows }).map((_, row) => {
                const rowHasCheck = states[row].some((s) => s === 3);
                return (
                  <tr key={row} className={` h-6`}>
                    <td className="border border-black text-center bg-[#ebcec0]">
                      {row + 1}
                    </td>
                    <td className="border border-black text-center bg-[#ebcec0]">
                      コンロ
                    </td>
                    <td className="border border-black text-center bg-[#ebcec0]">
                      メーカー名
                    </td>
                    <td className="border border-black text-center bg-[#ebcec0]">
                      XXX001
                    </td>
                    <td className="border border-black text-center bg-[#ebcec0]">
                      2020/03
                    </td>
                    <td className="border border-black text-center bg-[#ebcec0]">
                      1
                    </td>
                    <td className="border border-black text-center bg-[#ebcec0]">
                      3
                    </td>
                    <td
                      className={`border border-black text-center hover:bg-gray-400 ${
                        rowHasCheck ? "bg-red-500" : ""
                      }`}
                    >
                      <button
                        onClick={() => setModalF1Open(true)}
                        className="flex items-center justify-center w-full h-full hover:bg-gray-400"
                      >
                        ▼
                      </button>
                    </td>
                    {Array.from({ length: 3 }).map((_, col) => {
                      return (
                        <td
                          key={col}
                          className="relative border border-black text-center p-0 "
                        >
                          <button
                            type="button"
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClick(row, col);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleClick(row, col);
                              }
                            }}
                            className={`
                            absolute inset-0 w-full h-full flex items-center justify-center
                            focus:outline-none focus:ring-2 focus:ring-black
                            hover:bg-gray-400 
                            ${
                              symbols[states[row][col]] === "×"
                                ? "bg-red-500 text-white"
                                : symbols[states[row][col]] === "✔"
                                ? "bg-green-600 text-white"
                                : ""
                            }
                          `}
                          >
                            {symbols[states[row][col]]}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <ModalF1 isOpen={modalF1Open} onClose={() => setModalF1Open(false)} />
    </>
  );
};

export default TerminalGasValve;
