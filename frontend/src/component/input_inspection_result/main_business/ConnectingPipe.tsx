import { useState } from "react";
import ModalF1 from "../../modal/Modal_F1";
import { labelColor, inputColor } from "../../../constants/colors";
import { handleNumericSelectKeyDown } from "../../../utils/InputHandlers";

const ConnectingPipe = () => {
  const [modalF1Open, setModalF1Open] = useState(false);

  const symbols = ["", "◯", "×", "✔"];
  const totalRows = 4;

  const options = [
    "0: 未選択",
    "1: 掘出調査",
    "2: 気密試験",
    "3: 漏洩試験",
    "4: 目視",
    "5: ボーリング調査",
    "6: 検知装置",
    "9: その他",
  ];

  const [states, setStates] = useState<number[][]>(
    Array.from({ length: totalRows }, () => Array(10).fill(0))
  );

  const [selectValues, setSelectValues] = useState<number[]>(
    Array(totalRows).fill(0)
  );

  const rows = [
    { group: "高圧側", no: 1 },
    { group: "高圧側", no: 2 },
    { group: "低圧側", no: 1 },
    { group: "低圧側", no: 2 },
  ];

  const handleDetailKeyDown = (
    e: React.KeyboardEvent<HTMLTableCellElement>
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setModalF1Open(true);
    }
  };

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
          <table className="w-full  table-fixed border-collapse">
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
              {rows.map((row, idx) => {
                const rowHasCheck = states[idx].some((s) => s === 3);
                const showGroup =
                  idx === 0 || row.group !== rows[idx - 1].group;

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
                    <td className={`border border-black text-center  `}>
                      {row.no}
                    </td>
                    <td className={`border border-black text-center`}>
                      材料名
                    </td>
                    <td
                      tabIndex={0}
                      onClick={() => setModalF1Open(true)}
                      onKeyDown={handleDetailKeyDown}
                      className={`border border-black text-center cursor-pointer ${inputColor} ${
                        rowHasCheck ? "bg-red-500" : ""
                      }`}
                    >
                      ▼
                    </td>
                    {Array.from({ length: 6 }).map((_, col) => {
                      if (col === 3) {
                        return (
                          <td
                            key={col}
                            className={`border border-black p-0 ${inputColor}`}
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
                              className={`w-full h-full font-medium bg-transparent outline-none text-center ${inputColor}`}
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
                      return (
                        <td
                          key={col}
                          className={`border border-black text-center cursor-pointer ${inputColor}`}
                          onClick={() => handleClick(idx, col)}
                        >
                          {symbols[states[idx][col]]}
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
