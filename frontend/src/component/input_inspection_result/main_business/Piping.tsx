import { useState } from "react";
import { DownArrowIcon } from "../../transaction_information/LeftPanel";
import ModalF1 from "../../modal/Modal_F1";

const Piping = () => {
  const [modalF1Open, setModalF1Open] = useState(false);

  const symbols = ["", "◯", "×", "✔"];
  const labels = ["空白", "有", "無"];
  const [state, setState] = useState(0);

  const inspectionMethods = [
    { value: 0, label: "未選択" },
    { value: 1, label: "掘出調査" },
    { value: 2, label: "気密試験" },
    { value: 3, label: "漏洩試験" },
    { value: 4, label: "目視" },
    { value: 5, label: "ボーリング調査" },
    { value: 6, label: "検知装置" },
    { value: 9, label: "その他" },
  ];

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

  const handleClickBtn = () => {
    setState((prev) => (prev + 1) % labels.length);
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    row: number
  ) => {
    setValues((prev) => {
      const newVals = [...prev];
      newVals[row] = parseInt(e.target.value, 10);
      return newVals;
    });
  };
  return (
    <>
      <span className="flex justify-start text-start font-bold p-1 bg-[#D9D9D9] mt-4">
        配管
      </span>
      <div className="flex flex-row p-1 w-full text-xs">
        <span className="w-1/12 border border-black p-1 flex justify-center min-w-[83px] bg-[#D9D9D9]">
          埋設管
        </span>

        <button
          className="border border-black w-12 ml-3"
          onClick={handleClickBtn}
        >
          {labels[state]}
        </button>
      </div>
      <div className="flex justify-between text-xs space-x-2">
        {/* Bảng 1 với thanh cuộn */}
        <div className="2/3 min-w-[300px]">
          <div className="overflow-y-auto h-40 border border-black">
            <table className="w-full table-fixed border-collapse">
              <thead className="h-[35px] bg-[#D9D9D9]">
                <tr className="sticky top-0 bg-[#D9D9D9] z-10">
                  <th className="border border-black text-center w-[10%]">
                    No.
                  </th>
                  <th className="border border-black text-center w-[40%]">
                    材料
                  </th>
                  <th className="border border-black text-center w-[40%]">
                    埋設部
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
                    <tr key={row} className="bg-white hover:bg-gray-50">
                      <td className="border border-black text-center h-8">
                        {row + 1}
                      </td>
                      <td className="border border-black text-center">
                        材料名
                      </td>
                      <td className="border border-black text-center"></td>
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
        <div className="w-1/3 min-w-[500px]">
          <div className="overflow-y-auto h-40 border border-black">
            <table className="w-full table-fixed border-collapse">
              <thead className="h-[35px] bg-[#D9D9D9]">
                <tr className="sticky top-0 bg-[#D9D9D9] z-10">
                  <th className="border border-black text-center w-[8%]">
                    腐食等
                  </th>
                  <th className="border border-black text-center w-[8%]">
                    腐食 防止
                  </th>
                  <th className="border border-black text-center w-[8%]">
                    漏洩
                  </th>
                  <th className="border border-black text-center w-[30%]">
                    点検方法
                  </th>
                  <th className="border border-black text-center w-[8%]">
                    破損 防止
                  </th>
                  <th className="border border-black text-center w-[8%]">
                    危険 認識
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
                      {Array.from({ length: 7 }).map((_, col) => {
                        if (col === 3) {
                          return (
                            <td
                              key={col}
                              className="border border-black text-center p-0"
                            >
                              <select
                                className="w-full h-full bg-transparent outline-none cursor-pointer text-center"
                                value={values[row]}
                                onChange={(e) => handleSelectChange(e, row)}
                              >
                                {inspectionMethods.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </td>
                          );
                        }
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
export default Piping;
