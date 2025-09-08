import { DownArrowIcon } from "../../transaction_information/LeftPanel";
import ModalF1 from "../../modal/Modal_F1";
import { useState } from "react";
import { labelColor, inputColor } from "../../../constants/colors";


const TerminalGasValve = () => {
  const [modalF1Open, setModalF1Open] = useState(false);

  const symbols = ["", "◯", "×", "✔"];

  // Thay đổi để tạo 20 dòng dữ liệu
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

  return (
    <>
      <span className={`flex justify-start text-start font-bold p-1 ${labelColor} mt-4`}>
        末端ガス栓
      </span>
      <div className="flex flex-row p-1 w-full text-xs">
        <span className={`w-1/12 border border-black p-1 flex justify-center min-w-[83px] ${labelColor}`}>
          設置個数
        </span>
        <input className={`border border-black w-12 ml-3 ${inputColor}`}></input>
        <span className={`w-1/12 border border-black p-1 flex justify-center min-w-[83px] ${labelColor} ml-4`}>
          合計口数
        </span>
        <input className={`border border-black w-12 ml-3 ${inputColor}`}></input>
        <span className={`w-1/12 border border-black p-1 flex justify-center min-w-[83px] ${labelColor} ml-4`}>
          使用口数
        </span>
        <input className={`border border-black w-12 ml-3 ${inputColor}`}></input>
        <span className={`w-1/12 border border-black p-1 flex justify-center min-w-[83px] ${labelColor} ml-4`}>
          未使用口数
        </span>
        <input className={`border border-black w-12 ml-3 ${inputColor}`}></input>
      </div>
      <div className="flex justify-between text-xs space-x-2">
        {/* Bảng 1 với thanh cuộn */}
        <div className="w-11/12 min-w-[763px]">
          <div className="overflow-y-auto h-40 border border-black">
            <table className="w-full table-fixed border-collapse">
              <thead className={`h-[35px] ${labelColor}`}>
                <tr className={`sticky top-0 ${labelColor} z-10`}>
                  <th className="border border-black text-center w-[10%]">
                    No.
                  </th>
                  <th className="border border-black text-center w-[30%]">
                    種別
                  </th>
                  <th className="border border-black text-center w-[20%]">
                    メーカー
                  </th>
                  <th className="border border-black text-center w-[30%]">
                    型式
                  </th>
                  <th className="border border-black text-center w-[30%]">
                    製造年月
                  </th>
                  <th className="border border-black text-center w-[30%]">
                    口数
                  </th>
                  <th className="border border-black text-center w-[30%]">
                    個数
                  </th>
                  <th className="border border-black text-center w-[35px]">
                    詳細
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: totalRows }).map((_, row) => {
                  const rowHasCheck = states[row].some((s) => s === 3);
                  return (
                    <tr key={row} className={`${inputColor}`}>
                      <td className="border border-black text-center h-8">
                        {row + 1}
                      </td>
                      <td className="border border-black text-center">
                        コンロ
                      </td>
                      <td className="border border-black text-center">
                        メーカー名
                      </td>
                      <td className="border border-black text-center">
                        XXX001
                      </td>
                      <td className="border border-black text-center">
                        2020/03
                      </td>
                      <td className="border border-black text-center">1</td>
                      <td className="border border-black text-center">3</td>
                      <td
                        className={`border border-black text-center ${
                          rowHasCheck ? "bg-red-500" : ""
                        }`}
                      >
                        <button
                          onClick={() => setModalF1Open(true)}
                          className="flex items-center justify-center w-full"
                        >
                          <DownArrowIcon />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* Bảng 2 với thanh cuộn */}
        <div className="w-1/12 min-w-[150px]">
          <div className="overflow-y-auto h-40 border border-black">
            <table className="w-full table-fixed border-collapse">
              <thead className={`h-[35px] ${labelColor}`}>
                <tr className={`sticky top-0 ${labelColor} z-10`}>
                  <th className="border border-black text-center w-[8%]">
                    規格
                  </th>
                  <th className="border border-black text-center w-[8%]">
                    腐食
                  </th>
                  <th className="border border-black text-center w-[8%]">
                    判定
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: totalRows }).map((_, row) => {
                  return (
                    <tr key={row} className={`${inputColor}`}>
                      {Array.from({ length: 3 }).map((_, col) => {
                        return (
                          <td
                            key={col}
                            className="border border-black text-center cursor-pointer h-8"
                            onClick={() => handleClick(row, col)}
                          >
                            {symbols[states[row][col]]}
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

export default TerminalGasValve;
