import { useState } from "react";
import ModalF1 from "../../modal/Modal_F1";
import { labelColor, inputColor } from "../../../constants/colors";
import { symbols } from "../../../constants/input_inspection_result";

const Siren = () => {
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
        警報器
      </span>
      <div className="flex flex-row p-1 w-full text-[10px]">
        <span
          className={`w-1/12 border border-black p-1 flex justify-center min-w-[83px] ${labelColor}`}
        >
          設置施設区分
        </span>
        <select
          className={`border border-black w-16 ml-3 ${inputColor}`}
          onKeyDown={(e) => {
            if (/^[0-9]$/.test(e.key)) {
              e.preventDefault();
              const options = [
                "0:未選択",
                "1:義務",
                "2:指導",
                "3:その他",
                "4:不要",
              ];
              const index = parseInt(e.key, 10);
              const match = options.find((opt) => opt.startsWith(`${index}:`));
              if (match) {
                const select = e.currentTarget as HTMLSelectElement;
                select.value = match;
              }
            }
          }}
        >
          <option>0:未選択</option>
          <option>1:義務</option>
          <option>2:指導</option>
          <option>3:その他</option>
          <option>4:不要</option>
        </select>

        <span
          className={`w-1/12 border border-black p-1 flex justify-center min-w-[83px] ${labelColor} ml-4`}
        >
          必要個数
        </span>
        <input
          className={`border border-black w-12 ml-3 ${inputColor}`}
        ></input>
        <span
          className={`w-1/12 border border-black p-1 flex justify-center min-w-[83px] ${labelColor} ml-4`}
        >
          設置個数
        </span>
        <input
          className={`border border-black w-12 ml-3 ${inputColor}`}
        ></input>
      </div>
      <div className="w-full min-w-[922px] text-[10px] mt-2">
        <div className="overflow-auto h-40 border border-black">
          <table className="w-full  table-fixed border-collapse">
            <thead className={`h-[35px]`}>
              <tr className={`sticky top-0 ${labelColor} z-10`}>
                <th className={`border border-black text-center ${labelColor}`}>
                  No.
                </th>
                <th className={`border border-black text-center ${labelColor}`}>
                  メーカー
                </th>
                <th className={`border border-black text-center ${labelColor}`}>
                  型式
                </th>
                <th className={`border border-black text-center ${labelColor}`}>
                  製造番号
                </th>
                <th className={`border border-black text-center ${labelColor}`}>
                  製造年月
                </th>
                <th
                  className={`border border-black text-center w-10 ${labelColor}`}
                >
                  詳細
                </th>
                <th
                  className={`border border-black text-center w-10 ${labelColor}`}
                >
                  規格
                </th>
                <th
                  className={`border border-black text-center w-10 ${labelColor}`}
                >
                  位置
                </th>
                <th
                  className={`border border-black text-center w-10 ${labelColor}`}
                >
                  動作
                </th>
                <th
                  className={`border border-black text-center w-10 ${labelColor}`}
                >
                  判定
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: totalRows }).map((_, row) => {
                const rowHasCheck = states[row].some((s) => s === 3);
                return (
                  <tr key={row} className={`${inputColor} h-6`}>
                    <td className="border border-black text-center bg-white">
                      {row + 1}
                    </td>
                    <td className="border border-black text-center bg-white">
                      メーカー名
                    </td>
                    <td className="border border-black text-center bg-white">
                      xxx003
                    </td>
                    <td className="border border-black text-center bg-white">
                      00001
                    </td>
                    <td className="border border-black text-center bg-white">
                      2012/01
                    </td>
                    <td
                      className={`border border-black text-center ${
                        rowHasCheck ? "bg-red-500" : ""
                      }`}
                    >
                      <button
                        onClick={() => setModalF1Open(true)}
                        className="flex items-center justify-center w-full h-full"
                      >
                        ▼
                      </button>
                    </td>
                    {Array.from({ length: 4 }).map((_, col) => {
                      return (
                        <td
                          key={col}
                          className="relative border border-black text-center p-0"
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
                            hover:bg-blue-100
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
export default Siren;
