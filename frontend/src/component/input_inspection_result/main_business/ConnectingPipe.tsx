import { useState } from "react";
import ModalF1 from "../../modal/Modal_F1";

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

  const [values, setValues] = useState<number[]>(Array(totalRows).fill(0));

  const [states, setStates] = useState<number[][]>(
    Array.from({ length: totalRows }, () => Array(10).fill(0))
  );

  const rows = [
    { group: "高圧側", no: 1 },
    { group: "高圧側", no: 2 },
    { group: "低圧側", no: 1 },
    { group: "低圧側", no: 2 },
  ];

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTableCellElement>,
    idx: number
  ) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      setValues((prev) => {
        const newVals = [...prev];
        newVals[idx] = parseFloat(
          (newVals[idx] + (e.key === "ArrowUp" ? 0.0001 : -0.0001)).toFixed(4)
        );
        return newVals;
      });
    }
  };

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
      <div className="flex justify-center text-center items-center font-bold p-1 bg-[#D9D9D9] text-[20px]">
        供給設備
      </div>
      <span className="flex justify-start text-start font-bold p-1 my-1 bg-[#D9D9D9]">
        接続管
      </span>
      <div className="flex justify-between text-xs space-x-2">
        {/* left-table */}
        <div className="w-2/3 min-w-[650px]">
          <div className=" border border-black">
            <table className="w-full table-fixed border-collapse">
              <thead className="h-[38px] bg-[#D9D9D9]">
                <tr>
                  <th className="border border-black text-center w-[30%]"></th>
                  <th className="border border-black text-center w-[50px]">
                    No.
                  </th>
                  <th className="border border-black text-center w-[40%]">
                    材料
                  </th>
                  <th className="border border-black text-center w-[60px]">
                    詳細
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, idx) => {
                  const rowHasCheck = states[idx].some((s) => s === 3);
                  const showGroup =
                    idx === 0 || row.group !== rows[idx - 1].group;

                  return (
                    <tr key={idx} className="h-[30px]">
                      {showGroup && (
                        <th
                          rowSpan={2}
                          className="border border-black text-center bg-[#D9D9D9]"
                        >
                          {row.group}
                        </th>
                      )}
                      <td className="border border-black text-center">
                        {row.no}
                      </td>
                      <td
                        tabIndex={0}
                        onKeyDown={(e) => handleKeyDown(e, idx)}
                        className="border border-black text-center focus:bg-yellow-100"
                      >
                        材料名
                      </td>
                      <td
                        tabIndex={0}
                        onClick={() => setModalF1Open(true)}
                        onKeyDown={handleDetailKeyDown}
                        className={`border border-black text-center cursor-pointer
                        ${rowHasCheck ? "bg-red-500" : ""}`}
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
              <thead className="h-8 bg-[#D9D9D9]">
                <tr className="sticky top-0 bg-[#D9D9D9] z-10">
                  <th className="border border-black text-center w-[4%]">
                    腐食等
                  </th>
                  <th className="border border-black text-center w-[4%]">
                    腐食 <br />
                    防止
                  </th>
                  <th className="border border-black text-center w-[4%]">
                    漏洩
                  </th>
                  <th className="border border-black text-center w-[10%]">
                    点検方法
                  </th>
                  <th className="border border-black text-center w-[4%]">
                    破損
                    <br />
                    防止
                  </th>
                  <th className="border border-black text-center w-[4%]">
                    判定
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: totalRows }).map((_, row) => {
                  return (
                    <tr key={row} className="bg-white hover:bg-gray-50">
                      {Array.from({ length: 6 }).map((_, col) => {
                        if (col === 3) {
                          return (
                            <td
                              key={col}
                              className="border border-black text-center h-8"
                            >
                              <select className="w-full h-full font-medium">
                                {options.map((opt, i) => (
                                  <option className="" key={i} value={i}>
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
                            className="border border-black text-center cursor-pointer w-[10%]"
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
      </div>

      <ModalF1 isOpen={modalF1Open} onClose={() => setModalF1Open(false)} />
    </>
  );
};

export default ConnectingPipe;
