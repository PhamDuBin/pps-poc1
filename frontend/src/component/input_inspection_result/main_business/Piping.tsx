import { useState } from "react";
import ModalF1 from "../../modal/Modal_F1";
import { labelColor } from "../../../constants/colors";
import {
  symbols,
  inspectionMethods,
} from "../../../constants/input_inspection_result";
import { Button, Select } from "antd";

const { Option } = Select;

const Piping = () => {
  const [modalF1Open, setModalF1Open] = useState(false);
  const labels = ["空白", "有", "無"];
  const [state, setState] = useState(0);
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

  const handleClickBtn = () => {
    setState((prev) => (prev + 1) % labels.length);
  };

  const handleSelectChange = (value: number, row: number) => {
    setValues((prev) => {
      const newVals = [...prev];
      newVals[row] = value;
      return newVals;
    });
  };
  return (
    <>
      <span
        className={`flex justify-start text-start font-bold p-1 ${labelColor} mt-4`}
      >
        配管
      </span>
      <div className="flex flex-row p-1 w-full text-xs">
        <span
          className={`w-1/12 border border-black p-1 flex justify-center min-w-[83px] ${labelColor}`}
        >
          埋設管
        </span>
        <Button className={` w-12 ml-3`} onClick={handleClickBtn}>
          {labels[state]}
        </Button>
      </div>
      <div className="w-full min-w-[922px] text-[10px] mt-2">
        <div className="overflow-auto h-40 border border-black">
          <table className="w-full table-fixed border-collapse">
            <thead className="h-[35px]">
              <tr className={`sticky top-0 ${labelColor} z-10`}>
                <th className={`border border-black text-center ${labelColor}`}>
                  No.
                </th>
                <th className={`border border-black text-center ${labelColor}`}>
                  材料
                </th>
                <th className={`border border-black text-center ${labelColor}`}>
                  埋設部
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
                  腐食防止
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
                  破損防止
                </th>
                <th
                  className={`border border-black text-center w-10 ${labelColor}`}
                >
                  危険認識
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
                  <tr key={row} className={` h-6`}>
                    <td className="border border-black text-center bg-input">
                      {row + 1}
                    </td>
                    <td className="border border-black text-center bg-input">
                      材料名
                    </td>
                    <td className="border border-black text-center bg-input"></td>
                    <td
                      className={`border border-black text-center hover:bg-[#E5F7E5] ${
                        rowHasCheck ? "bg-red-500" : ""
                      }`}
                    >
                      <button
                        onClick={() => setModalF1Open(true)}
                        className="flex items-center justify-center w-full h-full hover:bg-[#E5F7E5]"
                      >
                        ▼
                      </button>
                    </td>
                    {Array.from({ length: 7 }).map((_, col) => {
                      if (col === 3) {
                        return (
                          <td
                            key={col}
                            className={`border border-black text-center p-0 hover:bg-[#E5F7E5]`}
                          >
                            <Select
                              className={`
                                w-full h-full 
                                focus-visible:ring-2 focus-visible:ring-black
                                focus-visible:ring-offset-0 hover:bg-[#E5F7E5]
                              `}
                              value={values[row]}
                              onChange={(e) => handleSelectChange(e, row)}
                              onKeyDown={(e) => {
                                const num = parseInt(e.key, 10);

                                if (
                                  !isNaN(num) &&
                                  num >= 0 &&
                                  num < inspectionMethods.length
                                ) {
                                  e.preventDefault();
                                  handleSelectChange(num, row);
                                }
                              }}
                            >
                              {inspectionMethods.map((opt, i) => (
                                <Option key={i} value={i}>
                                  {opt.label}
                                </Option>
                              ))}
                            </Select>
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
                              hover:bg-[#E5F7E5]
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
export default Piping;
