import { useState } from "react";
import ModalF1 from "../../modal/Modal_F1";
import { labelColor } from "../../../constants/colors";
import { handleNumericSelectKeyDown } from "../../../utils/InputHandlers";
import {
  options,
  rowsPipe,
  symbols,
} from "../../../constants/input_inspection_result";
const ConnectingPipe = () => {
  const [modalF1Open, setModalF1Open] = useState(false);
  const totalRows = 4;

  const [states, setStates] = useState<number[][]>(
    Array.from({ length: totalRows }, () => Array(10).fill(0))
  );

  const [selectValues, setSelectValues] = useState<number[]>(
    Array(totalRows).fill(0)
  );

  const handleClick = (row: number, col: number) => {
    setStates((prev) => {
      const newStates = prev.map((r) => [...r]);
      newStates[row][col] = (newStates[row][col] + 1) % symbols.length;
      return newStates;
    });
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    rowIndex: number
  ) => {
    setSelectValues((prev) => {
      const newValues = [...prev];
      newValues[rowIndex] = parseInt(e.target.value, 10);
      return newValues;
    });
  };

  return (
    <>
      <div
        className={`flex justify-center text-center items-center font-bold p-2 ${labelColor} text-[20px] mt-4`}
      >
        供給設備
      </div>

      <span
        className={`flex justify-start text-start font-bold p-1 my-1 ${labelColor}`}
      >
        接続管
      </span>

      <div className="w-full min-w-[922px] text-[10px] mt-2">
        <div className="overflow-auto border border-black">
          <table className="w-full table-fixed border-collapse">
            <thead className="h-[38px]">
              <tr className={`sticky top-0 ${labelColor} z-10`}>
                <th
                  className={`border border-black text-center ${labelColor}`}
                ></th>
                <th className={`border border-black text-center ${labelColor}`}>
                  No.
                </th>
                <th className={`border border-black text-center ${labelColor}`}>
                  材料
                </th>
                <th
                  className={`border border-black text-center w-10 ${labelColor}`}
                >
                  詳細
                </th>
                <th
                  className={`border border-black text-center w-10 ${labelColor}`}
                >
                  腐食等
                </th>
                <th
                  className={`border border-black text-center w-10 ${labelColor}`}
                >
                  腐食
                  <br />
                  防止
                </th>
                <th
                  className={`border border-black text-center w-10 ${labelColor}`}
                >
                  漏洩
                </th>
                <th className={`border border-black text-center ${labelColor}`}>
                  点検方法
                </th>
                <th
                  className={`border border-black text-center w-10 ${labelColor}`}
                >
                  破損
                  <br />
                  防止
                </th>
                <th
                  className={`border border-black text-center w-10 ${labelColor}`}
                >
                  判定
                </th>
              </tr>
            </thead>

            <tbody>
              {rowsPipe.map((row, idx) => {
                const rowHasCheck = states[idx].some((s) => s === 3);
                const showGroup =
                  idx === 0 || row.group !== rowsPipe[idx - 1].group;

                return (
                  <tr key={idx} className="h-6">
                    {showGroup && (
                      <th
                        rowSpan={2}
                        className={`border border-black text-center ${labelColor}`}
                      >
                        {row.group}
                      </th>
                    )}

                    <td className="border border-black text-center bg-input">
                      {row.no}
                    </td>
                    <td className="border border-black text-center bg-input">
                      材料名
                    </td>

                    {/* ▼ 詳細 */}
                    <td className="relative border border-black text-center p-0">
                      <button
                        type="button"
                        tabIndex={0}
                        onClick={() => setModalF1Open(true)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setModalF1Open(true);
                          }
                        }}
                        className={`
      absolute inset-0 w-full h-full flex items-center justify-center
      cursor-pointer hover:bg-[#E5F7E5]
      ${rowHasCheck ? "bg-red-500" : ""}
      
    `}
                      >
                        ▼
                      </button>
                    </td>

                    {/* tick/select columns */}
                    {Array.from({ length: 6 }).map((_, col) => {
                      if (col === 3) {
                        return (
                          <td
                            key={col}
                            className={`border border-black p-0 hover:bg-[#E5F7E5]`}
                          >
                            <select
                              value={selectValues[idx]}
                              onChange={(e) => handleSelectChange(e, idx)}
                              onKeyDown={(e) =>
                                handleNumericSelectKeyDown(e, (val) => {
                                  setSelectValues((prev) => {
                                    const newVals = [...prev];
                                    const numVal = parseInt(val, 10);
                                    if (numVal < options.length) {
                                      newVals[idx] = numVal;
                                    }
                                    return newVals;
                                  });
                                })
                              }
                              className={`w-full h-full text-center cursor-pointer focus:ring-2 focus:ring-black hover:bg-[#E5F7E5]`}
                            >
                              {options.map((opt, i) => (
                                <option key={i} value={i}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          </td>
                        );
                      }

                      const val = states[idx][col];
                      const bgColor =
                        val === 2
                          ? "bg-red-500"
                          : val === 3
                          ? "bg-green-600"
                          : "";

                      return (
                        <td
                          key={col}
                          className="relative border border-black text-center p-0"
                        >
                          <button
                            type="button"
                            tabIndex={0}
                            onClick={() => handleClick(idx, col)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleClick(idx, col);
                              }
                            }}
                            className={`absolute inset-0 w-full h-full flex items-center justify-center hover:bg-[#E5F7E5] ${bgColor}`}
                          >
                            {symbols[val]}
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

export default ConnectingPipe;
