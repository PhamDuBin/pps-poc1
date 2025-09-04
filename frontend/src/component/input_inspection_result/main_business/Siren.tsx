import { useState } from "react";
import { DownArrowIcon } from "../../transaction_information/LeftPanel";
import ModalF1 from "../../modal/Modal_F1";

const Siren = () => {
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
      <span className="flex justify-start text-start font-bold p-1 bg-[#D9D9D9] mt-4">
        警報器
      </span>
      <div className="flex flex-row p-1 w-full text-xs">
        <span className="w-1/12 border border-black p-1 flex justify-center min-w-[83px] bg-[#D9D9D9]">
          設置施設区分
        </span>
        <select className="border border-black w-16 ml-3">
          <option>未選択</option>
          <option>義務</option>
          <option>指導</option>
          <option>その他</option>
          <option>不要</option>
        </select>
        <span className="w-1/12 border border-black p-1 flex justify-center min-w-[83px] bg-[#D9D9D9] ml-4">
          必要個数
        </span>
        <input className="border border-black w-12 ml-3"></input>
        <span className="w-1/12 border border-black p-1 flex justify-center min-w-[83px] bg-[#D9D9D9] ml-4">
          設置個数
        </span>
        <input className="border border-black w-12 ml-3"></input>
      </div>
      <div className="flex justify-between text-xs space-x-2">
        {/* Bảng 1 với thanh cuộn */}
        <div className="w-3/6 min-w-[400px]">
          <div className="overflow-y-auto h-40 border border-black">
            <table className="w-full table-fixed border-collapse">
              <thead className="h-[35px] bg-[#D9D9D9]">
                <tr className="sticky top-0 bg-[#D9D9D9] z-10">
                  <th className="border border-black text-center w-[10%]">
                    No.
                  </th>
                  <th className="border border-black text-center w-[30%]">
                    メーカー
                  </th>
                  <th className="border border-black text-center w-[20%]">
                    型式
                  </th>
                  <th className="border border-black text-center w-[30%]">
                    製造番号
                  </th>
                  <th className="border border-black text-center w-[30%]">
                    製造年月
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
                        メーカー名
                      </td>
                      <td className="border border-black text-center">
                        xxx003
                      </td>
                      <td className="border border-black text-center">00001</td>
                      <td className="border border-black text-center">
                        2012/01
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
        <div className="w-1/12 min-w-[150px]">
          <div className="overflow-y-auto h-40 border border-black">
            <table className="w-full table-fixed border-collapse">
              <thead className="h-[35px] bg-[#D9D9D9]">
                <tr className="sticky top-0 bg-[#D9D9D9] z-10">
                  <th className="border border-black text-center w-[8%]">
                    規格
                  </th>
                  <th className="border border-black text-center w-[8%]">
                    位置
                  </th>
                  <th className="border border-black text-center w-[8%]">
                    動作
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
                      {Array.from({ length: 4 }).map((_, col) => {
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
export default Siren;
