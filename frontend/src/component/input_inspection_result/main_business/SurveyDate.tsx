import ModalF1 from "../../modal/Modal_F1";
import { useState } from "react";
import { labelColor, inputColor } from "../../../constants/colors";
import { symbols } from "../../../constants/input_inspection_result";
const SurveyDate = () => {
  const [modalF1Open, setModalF1Open] = useState(false);
  const warnings = ["", "使用注意", "換気注意", "危険", "使用禁止"];

  const totalRows = 20;

  const [states, setStates] = useState(
    Array(totalRows)
      .fill(null)
      .map(() => Array(10).fill(0))
  );
  const [values, setValues] = useState(Array(totalRows).fill(0));

  const handleClick = (row: number, col: number) => {
    setStates((prev) => {
      const newStates = prev.map((r) => [...r]);
      newStates[row][col] = (newStates[row][col] + 1) % symbols.length;
      return newStates;
    });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTableCellElement>,
    idx: number
  ) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setValues((prev) => {
        const newVals = [...prev];
        newVals[idx] = parseFloat((newVals[idx] + 0.0001).toFixed(4));
        return newVals;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setValues((prev) => {
        const newVals = [...prev];
        newVals[idx] = parseFloat((newVals[idx] - 0.0001).toFixed(4));
        return newVals;
      });
    }
  };

  const handleValueChange = (rowIndex: number, amount: number) => {
    setValues((currentValues) => {
      const newValues = [...currentValues];
      newValues[rowIndex] += amount;
      return newValues;
    });
  };
  return (
    <>
      <span
        className={`flex justify-start text-start font-bold p-1 ${labelColor}`}
      >
        今回調査日
      </span>
      <div className="flex justify-between text-[10px] space-x-2 mt-1">
        <div className="w-full min-w-[922px]">
          <div className="overflow-auto h-40 border border-black">
            <table className="w-full table-fixed border-collapse">
              <thead className={` ${labelColor}`}>
                <tr className={`sticky top-0 ${labelColor} z-10`}>
                  <th className="border border-black text-center h-6 p-0">
                    No.
                  </th>
                  <th className="border border-black text-center h-6 p-0">
                    種別
                  </th>
                  <th className="border border-black text-center h-6 p-0">
                    メーカー
                  </th>
                  <th className="border border-black text-center h-6 p-0">
                    型式
                  </th>
                  <th className="border border-black text-center w-10 h-6 p-0">
                    詳細
                  </th>
                  <th className="border border-black text-center w-10 h-6 p-0">
                    ガス栓 No.
                  </th>
                  <th className="border border-black text-center w-10">
                    規格 適合
                  </th>
                  <th className="border border-black text-center w-10">
                    安全 装置
                  </th>
                  <th className="border border-black text-center w-10">
                    燃焼 状態
                  </th>
                  <th className="border border-black text-center w-10">
                    接続 方法
                  </th>
                  <th className="border border-black text-center w-10">
                    接続 管
                  </th>
                  <th className="border border-black text-center">
                    CO濃度（％）
                  </th>
                  <th className="border border-black text-center w-10">
                    CO 測定
                  </th>
                  <th className="border border-black text-center w-10">
                    CO周知
                  </th>
                  <th className="border border-black text-center w-10">判定</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: totalRows }).map((_, row) => {
                  const rowHasCheck = states[row].some((s) => s === 3);
                  return (
                    <tr key={row} className={`${inputColor} h-6`}>
                      <td className="border border-black text-center bg-[#F5F5F5]">
                        {row + 1}
                      </td>
                      <td className="border border-black text-center bg-[#F5F5F5]">
                        ◯◯◯コンロ
                      </td>
                      <td className="border border-black text-center bg-[#F5F5F5]">
                        メーカー01
                      </td>
                      <td className="border border-black text-center bg-[#F5F5F5]">
                        BGC001
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
                      {Array.from({ length: 10 }).map((_, col) => {
                        if (col === 0) {
                          return (
                            <td
                              key={col}
                              className="border border-black text-center"
                            >
                              <input
                                type="text"
                                defaultValue="0"
                                className="w-full text-center bg-[#ebcec0] outline-none"
                              />
                            </td>
                          );
                        }
                        if (col === 6) {
                          return (
                            <td
                              key={col}
                              className="border border-black text-center outline-none p-0"
                              tabIndex={0}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className="px-2">
                                  {values[row].toFixed(4)}
                                </span>

                                <div className="flex flex-col">
                                  <button
                                    onClick={() =>
                                      handleValueChange(row, 0.0001)
                                    }
                                    className="h-2 w-5 border-b border-l border-gray-400 flex items-center justify-center text-[8px] hover:bg-gray-200 active:bg-gray-300"
                                    tabIndex={-1}
                                  >
                                    ▲
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleValueChange(row, -0.0001)
                                    }
                                    className="h-2 w-5 border-l border-gray-400 flex items-center justify-center text-[8px] hover:bg-gray-200 active:bg-gray-300"
                                    tabIndex={-1}
                                  >
                                    ▼
                                  </button>
                                </div>
                              </div>
                            </td>
                          );
                        }
                        if (col === 8) {
                          return (
                            <td
                              key={col}
                              className="relative border border-black text-center p-0"
                            >
                              <button
                                type="button"
                                tabIndex={0}
                                onClick={() =>
                                  setStates((prev) => {
                                    const newStates = prev.map((r) => [...r]);
                                    newStates[row][col] =
                                      (newStates[row][col] + 1) %
                                      warnings.length;
                                    return newStates;
                                  })
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setStates((prev) => {
                                      const newStates = prev.map((r) => [...r]);
                                      newStates[row][col] =
                                        (newStates[row][col] + 1) %
                                        warnings.length;
                                      return newStates;
                                    });
                                  }
                                }}
                                className={`
          absolute inset-0 w-full h-full flex items-center justify-center
          focus:outline-none focus:ring-2 focus:ring-black
          hover:bg-blue-100 text-[9px]
          ${
            warnings[states[row][col]] === "×"
              ? "bg-red-500 text-white"
              : warnings[states[row][col]] === "✔"
              ? "bg-green-600 text-white"
              : ""
          }
        `}
                              >
                                {warnings[states[row][col]]}
                              </button>
                            </td>
                          );
                        }

                        return (
                          <td
                            key={col}
                            className="relative border border-black text-center p-0"
                          >
                            <button
                              type="button"
                              tabIndex={0}
                              onClick={() => handleClick(row, col)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  handleClick(row, col);
                                }
                              }}
                              className={`
        absolute inset-0 w-full h-full flex items-center justify-center
        focus:outline-none focus:ring-2 focus:ring-black hover:bg-blue-100
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
      </div>
    </>
  );
};

export default SurveyDate;
