import { useState } from "react";
import ModalF1 from "../../modal/Modal_F1";
import { labelColor } from "../../../constants/colors";
import {
  symbols,
  optionsSupplyPipe,
  rowsSupplyPipe,
} from "../../../constants/input_inspection_result";
import { Button, Select } from "antd";

const { Option } = Select;

const SupplyPipe = () => {
  const [modalF1Open, setModalF1Open] = useState(false);
  const totalRows = 4;

  const [states, setStates] = useState<number[][]>(
    Array.from({ length: totalRows }, () => Array(7).fill(0))
  );

  const [selectValues, setSelectValues] = useState<number[]>(
    Array(totalRows).fill(0)
  );

  const [statelabel, setStatelabel] = useState<number>(0);
  const [statelabel2, setStatelabel2] = useState<number>(0);
  const labels = ["", "有", "無"];

  const handleClickSButton = () => setStatelabel((prev) => (prev + 1) % 3);
  const handleClickSButton2 = () => setStatelabel2((prev) => (prev + 1) % 3);

  const handleClick = (row: number, col: number) => {
    setStates((prev) => {
      const newStates = prev.map((r) => [...r]);
      newStates[row][col] = (newStates[row][col] + 1) % symbols.length;
      return newStates;
    });
  };

  const handleSelectChange = (value: number, rowIndex: number) => {
    setSelectValues((prev) => {
      const newValues = [...prev];
      newValues[rowIndex] = value;
      return newValues;
    });
  };

  return (
    <>
      <span
        className={`flex justify-start font-bold p-1 my-1 mt-4 ${labelColor}`}
      >
        供給管
      </span>
      <div className="flex gap-x-4 mb-1 p-2 border border-black items-center text-[10px]">
        <div>埋設管</div>
        <Button onClick={handleClickSButton} className={`w-6 h-6 `}>
          {labels[statelabel]}
        </Button>
        <div>高圧側｜集合装置</div>
        <Button onClick={handleClickSButton2} className={`w-6 h-6`}>
          {labels[statelabel2]}
        </Button>
      </div>

      <div className="w-full min-w-[922px] text-[10px]">
        <div className="overflow-auto border border-black">
          <table className="w-full table-fixed border-collapse">
            <thead className={`h-[38px] ${labelColor}`}>
              <tr>
                <th className="border border-black text-center"></th>
                <th className="border border-black text-center">No.</th>
                <th className="border border-black text-center">材料</th>
                <th className="border border-black text-center">埋設部</th>
                <th className="border border-black text-center w-10">詳細</th>
                <th className="border border-black text-center w-10">腐食等</th>
                <th className="border border-black text-center w-10">
                  腐食
                  <br />
                  防止
                </th>
                <th className="border border-black text-center w-10">漏洩</th>
                <th className="border border-black text-center">点検方法</th>
                <th className="border border-black text-center w-10">
                  破損
                  <br />
                  防止
                </th>
                <th className="border border-black text-center w-10">
                  危険
                  <br />
                  認識
                </th>
                <th className="border border-black text-center w-10">判定</th>
              </tr>
            </thead>

            <tbody>
              {rowsSupplyPipe.map((row, idx) => {
                const rowHasCheck = states[idx].some((s) => s === 3);
                const showGroup =
                  idx === 0 || row.group !== rowsSupplyPipe[idx - 1].group;

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
                    <td className="border border-black text-center bg-input">
                      -
                    </td>

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
                    {Array.from({ length: 7 }).map((_, col) => {
                      if (col === 3) {
                        return (
                          <td
                            key={col}
                            className={`border border-black p-0 hover:bg-[#E5F7E5]`}
                          >
                            <Select
                              value={selectValues[idx]}
                              onChange={(val) => handleSelectChange(val, idx)}
                              className="w-full h-full text-center"
                              onKeyDown={(e) => {
                                const num = parseInt(e.key, 10);
                                if (
                                  !isNaN(num) &&
                                  num >= 0 &&
                                  num < optionsSupplyPipe.length
                                ) {
                                  e.preventDefault();
                                  handleSelectChange(num, idx);
                                }
                              }}
                            >
                              {optionsSupplyPipe.map((opt, i) => (
                                <Option key={i} value={i}>
                                  {opt}
                                </Option>
                              ))}
                            </Select>
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
                            className={`absolute inset-0 w-full h-full flex items-center justify-center  hover:bg-[#E5F7E5] ${bgColor}`}
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

export default SupplyPipe;
