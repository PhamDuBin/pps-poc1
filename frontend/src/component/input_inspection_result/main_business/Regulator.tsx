import { useState } from "react";
import ModalF1 from "../../modal/Modal_F1";
import { labelColor, inputColor } from "../../../constants/colors";

const Regulator = () => {
  const [modalF1Open, setModalF1Open] = useState(false);

  const symbols = ["", "◯", "×", "✔"];
  const totalRows = 2;

  const [states, setStates] = useState<number[][]>(
    Array.from({ length: totalRows }, () => Array(3).fill(0))
  );

  const rows = [
    {
      no: "1",
      type: "種別01",
      maker: "xxx003",
      model: "00001",
      capacity: "00001",
      manufacture: "2012/01",
      valid: "2012/01",
    },
    {
      no: "2",
      type: "種別02",
      maker: "xxx003",
      model: "00001",
      capacity: "00001",
      manufacture: "2012/01",
      valid: "2012/01",
    },
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

  return (
    <>
      <span
        className={`flex justify-start text-start font-bold p-1 my-1 ${labelColor} mt-4`}
      >
        調整器
      </span>
      <div className="w-full min-w-[922px] text-xs">
        <div className="overflow-auto border border-black">
          <table className="w-full  table-fixed border-collapse">
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
              {rows.map((row, idx) => {
                const rowHasCheck = states[idx].some((s) => s === 3);
                return (
                  <tr key={idx} className="h-10">
                    <td
                      className={`border border-black text-center ${inputColor}`}
                    >
                      {row.no}
                    </td>
                    <td
                      className={`border border-black text-center ${inputColor}`}
                    >
                      {row.type}
                    </td>
                    <td
                      className={`border border-black text-center ${inputColor}`}
                    >
                      {row.maker}
                    </td>
                    <td
                      className={`border border-black text-center ${inputColor}`}
                    >
                      {row.model}
                    </td>
                    <td
                      className={`border border-black text-center ${inputColor}`}
                    >
                      {row.capacity}
                    </td>
                    <td
                      className={`border border-black text-center ${inputColor}`}
                    >
                      {row.manufacture}
                    </td>
                    <td
                      className={`border border-black text-center ${inputColor}`}
                    >
                      {row.valid}
                    </td>
                    <td
                      onClick={() => setModalF1Open(true)}
                      onKeyDown={handleDetailKeyDown}
                      className={`border border-black text-center cursor-pointer ${inputColor} ${
                        rowHasCheck ? "bg-red-500" : ""
                      }`}
                    >
                      ▼
                    </td>
                    {Array.from({ length: 3 }).map((_, col) => (
                      <td
                        key={col}
                        className={`border border-black text-center cursor-pointer ${inputColor}`}
                        onClick={() => handleClick(idx, col)}
                      >
                        {symbols[states[idx][col]]}
                      </td>
                    ))}
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
