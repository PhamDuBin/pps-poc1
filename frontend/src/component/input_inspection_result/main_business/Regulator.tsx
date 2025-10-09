import { useState } from "react";
import ModalF1 from "../../modal/Modal_F1";
import { labelColor, inputColor } from "../../../constants/colors";
import {
  symbols,
  rowsRegulator,
} from "../../../constants/input_inspection_result";
const Regulator = () => {
  const [modalF1Open, setModalF1Open] = useState(false);
  const totalRows = 2;

  const [states, setStates] = useState<number[][]>(
    Array.from({ length: totalRows }, () => Array(3).fill(0))
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
        className={`flex justify-start text-start font-bold p-1 my-1 mt-4 ${labelColor}`}
      >
        調整器
      </span>

      <div className="w-full min-w-[922px] text-[10px]">
        <div className="overflow-auto border border-black">
          <table className="w-full table-fixed border-collapse">
            <thead className={`h-[40px] ${labelColor}`}>
              <tr>
                <th className="border border-black text-center">No.</th>
                <th className="border border-black text-center">種別</th>
                <th className="border border-black text-center">メーカー</th>
                <th className="border border-black text-center">型式</th>
                <th className="border border-black text-center">
                  容量（kg/h）
                </th>
                <th className="border border-black text-center">製造年月</th>
                <th className="border border-black text-center">有効年月</th>
                <th className="border border-black text-center w-10">詳細</th>
                <th className="border border-black text-center w-10">腐食等</th>
                <th className="border border-black text-center w-10">適合</th>
                <th className="border border-black text-center w-10">判定</th>
              </tr>
            </thead>

            <tbody>
              {rowsRegulator.map((row, idx) => {
                const rowHasCheck = states[idx].some((s) => s === 3);

                return (
                  <tr key={idx} className="h-6">
                    <td className="border border-black text-center bg-[#ebcec0]">
                      {row.no}
                    </td>
                    <td className="border border-black text-center bg-[#ebcec0]">
                      {row.type}
                    </td>
                    <td className="border border-black text-center bg-[#ebcec0]">
                      {row.maker}
                    </td>
                    <td className="border border-black text-center bg-[#ebcec0]">
                      {row.model}
                    </td>
                    <td className="border border-black text-center bg-[#ebcec0]">
                      {row.capacity}
                    </td>
                    <td className="border border-black text-center bg-[#ebcec0]">
                      {row.manufacture}
                    </td>
                    <td className="border border-black text-center bg-[#ebcec0]">
                      {row.valid}
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
                        className={`absolute inset-0 w-full h-full flex items-center justify-center hover:bg-[#E5F7E5] ${
                          rowHasCheck ? "bg-red-500" : ""
                        }`}
                      >
                        ▼
                      </button>
                    </td>

                    {Array.from({ length: 3 }).map((_, col) => {
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

export default Regulator;
