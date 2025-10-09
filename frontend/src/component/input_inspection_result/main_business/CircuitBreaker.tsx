import { useState } from "react";
import ModalF1 from "../../modal/Modal_F1";
import { labelColor, inputColor } from "../../../constants/colors";
import { rows, symbols } from "../../../constants/input_inspection_result";
const CircuitBreaker = () => {
  const [modalF1Open, setModalF1Open] = useState(false);
  const totalRows = 5;
  const [states, setStates] = useState<number[]>(Array(totalRows).fill(0));

  const handleClick = (row: number) => {
    setStates((prev) => {
      const newStates = [...prev];
      newStates[row] = (newStates[row] + 1) % symbols.length;
      return newStates;
    });
  };

  return (
    <>
      <span
        className={`flex justify-start font-bold p-1 my-1 mt-4 ${labelColor}`}
      >
        遮断器
      </span>
      <div className="w-full min-w-[922px] text-[10px]">
        <div className="overflow-auto border border-black">
          <table className="w-full table-fixed border-collapse">
            <thead className={`h-[40px] ${labelColor}`}>
              <tr>
                <th className="border border-black text-center"></th>
                <th className="border border-black text-center">型式</th>
                <th className="border border-black text-center">個</th>
                <th className="border border-black text-center w-10">詳細</th>
                <th className="border border-black text-center w-10">判定</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => {
                const showGroup =
                  row.group &&
                  (idx === 0 || row.group !== rows[idx - 1]?.group);
                const isSpecial = !row.model && !row.count;

                const val = states[idx];
                const bgColor =
                  val === 2 ? "bg-red-500" : val === 3 ? "bg-green-600" : "";

                const rowHasCheck = states[idx] === 3;

                return (
                  <tr key={idx} className="h-6">
                    {showGroup && (
                      <th
                        rowSpan={
                          rows.filter((r) => r.group === row.group).length
                        }
                        className={`border border-black text-center ${labelColor}`}
                      >
                        {row.group}
                      </th>
                    )}

                    {!isSpecial ? (
                      <>
                        <th
                          className={`border border-black text-center font-semibold ${labelColor}`}
                        >
                          {row.label}
                        </th>
                        <td className="border border-black text-center bg-[#ebcec0]">
                          {row.model}
                        </td>
                        <td className="border border-black text-center bg-[#ebcec0]">
                          {row.count}
                        </td>

                        {/* 詳細 */}
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
                            className={`absolute inset-0 w-full h-full flex items-center justify-center hover:bg-gray-400 ${
                              rowHasCheck ? "bg-red-500" : ""
                            }`}
                          >
                            ▼
                          </button>
                        </td>
                      </>
                    ) : (
                      <th
                        colSpan={3}
                        className={`border border-black pl-2 text-left font-semibold ${labelColor}`}
                      >
                        {row.label}
                      </th>
                    )}

                    {/* 判定 */}
                    {idx < 3 && (
                      <td className="relative border border-black text-center p-0">
                        <button
                          type="button"
                          tabIndex={0}
                          onClick={() => handleClick(idx)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleClick(idx);
                            }
                          }}
                          className={`absolute inset-0 w-full h-full flex items-center justify-center hover:bg-gray-400 ${bgColor}`}
                        >
                          {symbols[val]}
                        </button>
                      </td>
                    )}

                    {idx === 3 && (
                      <td
                        rowSpan={2}
                        className="relative border border-black text-center p-0"
                      >
                        <button
                          type="button"
                          tabIndex={0}
                          onClick={() => handleClick(idx)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleClick(idx);
                            }
                          }}
                          className={`absolute inset-0 w-full h-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-black hover:bg-gray-400 ${bgColor}`}
                        >
                          {symbols[val]}
                        </button>
                      </td>
                    )}
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

export default CircuitBreaker;
