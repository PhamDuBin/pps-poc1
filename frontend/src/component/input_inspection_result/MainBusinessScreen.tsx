import { DownArrowIcon } from "../transaction_information/LeftPanel";
import ModalF1 from "../modal/Modal_F1";
import { useState } from "react";
const MainBusinessScreen = () => {
  const [modalF1Open, setModalF1Open] = useState(false);

  const symbols = ["", "◯", "×", "✔"];
  const warnings = ["", "使用注意", "換気注意", "危険", "使用禁止"];

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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTableCellElement>,
    idx: number
  ) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setValues((prev) => {
        const newVals = [...prev];
        newVals[idx] = parseFloat((newVals[idx] + 0.0001).toFixed(4));
        return newVals;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setValues((prev) => {
        const newVals = [...prev];
        newVals[idx] = parseFloat((newVals[idx] - 0.0001).toFixed(4));
        return newVals;
      });
    }
  };

  return (
    <div className="w-full p-1 flex flex-col bg-gray-100">
      <span className="flex justify-center text-center items-center font-bold p-1 bg-[#D9D9D9] text-[20px]">
        消費設備
      </span>
      <div className="mt-1 text-sm">
        <span className="flex justify-start text-start font-bold p-1 bg-[#D9D9D9]">
          今回調査日
        </span>
        <div className="flex justify-between text-xs space-x-2">
          {/* Bảng 1 với thanh cuộn */}
          <div className="w-1/3 min-w-[400px]">
            <div className="overflow-y-auto h-40 border border-black">
              <table className="w-full table-fixed border-collapse">
                <thead className="h-[35px] bg-[#D9D9D9]">
                  <tr className="sticky top-0 bg-[#D9D9D9] z-10">
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
                    <th className="border border-black text-center w-[60px]">
                      詳細
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: totalRows }).map((_, row) => {
                    const rowHasCheck = states[row].some((s) => s === 3);
                    return (
                      <tr key={row} className="bg-white hover:bg-gray-50">
                        <td className="border border-black text-center h-8">
                          {row + 1}
                        </td>
                        <td className="border border-black text-center">
                          ◯◯◯コンロ
                        </td>
                        <td className="border border-black text-center">
                          メーカー{String(row + 1).padStart(2, "0")}
                        </td>
                        <td className="border border-black text-center">
                          BGC{String(row + 1).padStart(3, "0")}
                        </td>
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
          <div className="w-1/3 min-w-[600px]">
            <div className="overflow-y-auto h-40 border border-black">
              <table className="w-full table-fixed border-collapse">
                <thead className="h-[35px] bg-[#D9D9D9]">
                  <tr className="sticky top-0 bg-[#D9D9D9] z-10">
                    <th className="border border-black text-center w-[8%]">
                      ガス栓 No.
                    </th>
                    <th className="border border-black text-center w-[8%]">
                      規格 適合
                    </th>
                    <th className="border border-black text-center w-[8%]">
                      安全 装置
                    </th>
                    <th className="border border-black text-center w-[8%]">
                      燃焼 状態
                    </th>
                    <th className="border border-black text-center w-[8%]">
                      接続 方法
                    </th>
                    <th className="border border-black text-center w-[8%]">
                      接続 管
                    </th>
                    <th className="border border-black text-center w-[40px]">
                      CO濃度（％）
                    </th>
                    <th className="border border-black text-center w-[8%]">
                      CO 測定
                    </th>
                    <th className="border border-black text-center w-[10%]">
                      CO周知
                    </th>
                    <th className="border border-black text-center w-[8%]">
                      判定
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: totalRows }).map((_, row) => {
                    return (
                      <tr key={row} className="bg-white hover:bg-gray-50">
                        {Array.from({ length: 10 }).map((_, col) => {
                          if (col === 0) {
                            return (
                              <td
                                key={col}
                                className="border border-black text-center h-8"
                              >
                                0
                              </td>
                            );
                          }
                          if (col === 6) {
                            return (
                              <td
                                key={col}
                                className="border border-black text-center outline-none cursor-pointer focus:bg-blue-100"
                                tabIndex={0}
                                onKeyDown={(e) => handleKeyDown(e, row)}
                              >
                                {values[row].toFixed(4)}
                              </td>
                            );
                          }
                          if (col === 8) {
                            return (
                              <td
                                key={col}
                                className="border border-black text-center cursor-pointer"
                                onClick={() =>
                                  setStates((prev) => {
                                    const newStates = prev.map((r) => [...r]);
                                    newStates[row][col] =
                                      (newStates[row][col] + 1) %
                                      warnings.length;
                                    return newStates;
                                  })
                                }
                              >
                                {warnings[states[row][col]]}
                              </td>
                            );
                          }
                          return (
                            <td
                              key={col}
                              className="border border-black text-center cursor-pointer"
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
      </div>
      <ModalF1 isOpen={modalF1Open} onClose={() => setModalF1Open(false)} />
    </div>
  );
};

export default MainBusinessScreen;
