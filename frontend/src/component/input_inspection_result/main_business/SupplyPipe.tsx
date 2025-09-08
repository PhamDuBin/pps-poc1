import { useState } from "react";
import ModalF1 from "../../modal/Modal_F1";
import { labelColor, inputColor } from "../../../constants/colors";

const SupplyPipe = () => {
  const [modalF1Open, setModalF1Open] = useState(false);

  const symbols = ["", "◯", "×", "✔"];

  // số hàng bảng
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

  // state cho các ô (ký hiệu)
  const [states, setStates] = useState<number[][]>(
    Array.from({ length: totalRows }, () => Array(7).fill(0)) // chỉ cần 7 cột bên phải
  );

  const rows = [
    { group: "高圧側", no: 1 },
    { group: "高圧側", no: 2 },
    { group: "低圧側", no: 1 },
    { group: "低圧側", no: 2 },
  ];

  const [statelabel, setStatelabel] = useState<number>(0);
  const [statelabel2, setStatelabel2] = useState<number>(0);
  const labels = ["", "有", "無"];

  const handleClickSButton = () => setStatelabel((prev) => (prev + 1) % 3);
  const handleClickSButton2 = () => setStatelabel2((prev) => (prev + 1) % 3);

  const handleDetailKeyDown = (e: React.KeyboardEvent<HTMLTableCellElement>) => {
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
      <span className={`flex justify-start font-bold p-1 my-1 mt-4 ${labelColor}`}>
        供給管
      </span>

      {/* 2 nút toggle */}
      <div className="flex gap-x-4 mb-1 p-2 border border-black items-center">
        <div>埋設管</div>
        <button
          onClick={handleClickSButton}
          className={`border border-black w-6 h-6 flex items-center justify-center ${inputColor}`}
        >
          {labels[statelabel]}
        </button>
        <div>高圧側｜集合装置</div>
        <button
          onClick={handleClickSButton2}
          className={`border border-black w-6 h-6 flex items-center justify-center ${inputColor}`}
        >
          {labels[statelabel2]}
        </button>
      </div>

      <div className="flex justify-between text-xs space-x-2">
        {/* left-table */}
        <div className="w-2/3 min-w-[650px]">
          <div className="border border-black">
            <table className="w-full table-fixed border-collapse">
              <thead className={`h-[38px] ${labelColor}`}>
                <tr>
                  <th className="border border-black text-center w-[30%]"></th>
                  <th className="border border-black text-center w-[50px]">No.</th>
                  <th className="border border-black text-center w-[40%]">材料</th>
                  <th className="border border-black text-center w-[30%]">埋設部</th>
                  <th className="border border-black text-center w-[40px]">詳細</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => {
                  const rowHasCheck = states[idx].some((s) => s === 3);
                  const showGroup = idx === 0 || row.group !== rows[idx - 1].group;

                  return (
                    <tr key={idx} className="h-[30px]">
                      {showGroup && (
                        <th
                          rowSpan={2}
                          className={`border border-black text-center ${labelColor}`}
                        >
                          {row.group}
                        </th>
                      )}
                      <td className={`border border-black text-center ${inputColor}`}>
                        {row.no}
                      </td>
                      <td className={`border border-black text-center ${inputColor}`}>
                        材料名
                      </td>
                      <td className={`border border-black text-center ${inputColor}`}>
                        -
                      </td>
                      <td
                        tabIndex={0}
                        onClick={() => setModalF1Open(true)}
                        onKeyDown={handleDetailKeyDown}
                        className={`border border-black text-center cursor-pointer ${inputColor} ${
                          rowHasCheck ? "bg-red-500" : inputColor
                        }`}
                      >
                        ▼
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* right-table */}
        <div className="w-1/3 min-w-[260px]">
          <div className="overflow-y-auto h-40 border border-black">
            <table className="w-full table-fixed border-collapse">
              <thead className={`h-8 sticky top-0 z-10 ${labelColor}`}>
                <tr>
                  <th className="border border-black text-center">腐食等</th>
                  <th className="border border-black text-center">腐食<br/>防止</th>
                  <th className="border border-black text-center">漏洩</th>
                  <th className="border border-black text-center w-[25%]">点検方法</th>
                  <th className="border border-black text-center">破損<br/>防止</th>
                  <th className="border border-black text-center">危険<br/>認識</th>
                  <th className="border border-black text-center">判定</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: totalRows }).map((_, row) => (
                  <tr key={row} className="hover:bg-gray-50">
                    {Array.from({ length: 7 }).map((_, col) =>
                      col === 3 ? (
                        <td key={col} className={`border border-black text-center h-8 ${inputColor}`}>
                          <select className={`w-full h-full font-medium bg-transparent outline-none ${inputColor}`}>
                            {options.map((opt, i) => (
                              <option key={i} value={i}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </td>
                      ) : (
                        <td
                          key={col}
                          className={`border border-black text-center cursor-pointer w-[10%] ${inputColor}`}
                          onClick={() => handleClick(row, col)}
                        >
                          {symbols[states[row][col]]}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModalF1 isOpen={modalF1Open} onClose={() => setModalF1Open(false)} />
    </>
  );
};

export default SupplyPipe;
