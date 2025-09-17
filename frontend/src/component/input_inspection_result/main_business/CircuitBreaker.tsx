import { useState } from "react";
import ModalF1 from "../../modal/Modal_F1";
import { labelColor, inputColor } from "../../../constants/colors";

const CircuitBreaker = () => {
  const [modalF1Open, setModalF1Open] = useState(false);

  const symbols = ["", "◯", "×", "✔"];
  const totalRows = 5;

  const [states, setStates] = useState<number[]>(Array(totalRows).fill(0));

  const rows = [
    { label: "放出防止", model: "00001", count: "00001" },
    { label: "耐震遮断", model: "00001", count: "00001" },
    { label: "警報遮断", model: "00001", count: "00001" },
    { group: "気化器", label: "気化装置停電対策" },
    { group: "気化器", label: "電気気化装置による手動復帰式自動ガス遮断器" },
  ];

  const handleDetailKeyDown = (
    e: React.KeyboardEvent<HTMLTableCellElement>
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setModalF1Open(true);
    }
  };

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
        className={`flex justify-start text-start font-bold p-1 my-1 ${labelColor} mt-4`}
      >
        遮断器
      </span>
      <div className="w-full min-w-[922px] text-xs">
        <div className="overflow-auto border border-black">
          <table className="w-full  table-fixed border-collapse">
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

                return (
                  <tr key={idx} className="h-10">
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
                        <td
                          className={`border border-black text-center ${inputColor}`}
                        >
                          {row.model}
                        </td>
                        <td
                          className={`border border-black text-center ${inputColor}`}
                        >
                          {row.count}
                        </td>
                        <td
                          onClick={() => setModalF1Open(true)}
                          onKeyDown={handleDetailKeyDown}
                          className={`border border-black text-center cursor-pointer ${inputColor} ${
                            states[idx] === 3 ? "bg-red-500" : ""
                          }`}
                        >
                          ▼
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
                    {idx < 3 && (
                      <td
                        className={`border border-black text-center cursor-pointer ${inputColor}`}
                        onClick={() => handleClick(idx)}
                      >
                        {symbols[states[idx]]}
                      </td>
                    )}
                    {idx === 3 && (
                      <td
                        rowSpan={2}
                        className={`border border-black text-center cursor-pointer ${inputColor}`}
                        onClick={() => handleClick(idx)}
                      >
                        {symbols[states[idx]]}
                      </td>
                    )}
                    {/* Bỏ qua idx === 4 vì đã được rowSpan từ idx === 3 */}
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
