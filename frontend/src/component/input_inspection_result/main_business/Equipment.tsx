import React, { useState } from "react";

const Equipment = () => {
  const [rowStates, setRowStates] = useState([false, false, false]);

  const toggleRow = (rowIndex: number) => {
    setRowStates((prev) =>
      prev.map((state, i) => (i === rowIndex ? !state : state))
    );
  };

  const headers = ["開放式湯弗器", "給温器", "風呂釜"];

  return (
    <>
      <span className="flex justify-start text-start font-bold p-1 bg-[#D9D9D9] mt-4">
        給排気設備
      </span>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400 text-center text-sm">
          <thead className="bg-[#D9D9D9]">
            <tr>
              <th rowSpan={2} className="border border-gray-400 p-1 w-32"></th>
              <th rowSpan={2} className="border border-gray-400 p-1">
                1排気筒
              </th>
              <th colSpan={5} className="border border-gray-400 p-1">
                2排気筒基準
              </th>
              <th rowSpan={2} className="border border-gray-400 p-1">
                3給排気設備
              </th>
              <th rowSpan={2} className="border border-gray-400 p-1">
                4排気排出確認
              </th>
              <th rowSpan={2} className="border border-gray-400 p-1">
                判定
              </th>
            </tr>
            <tr>
              <th className="border border-gray-400 p-1 font-medium">材料</th>
              <th className="border border-gray-400 p-1 font-medium">先端</th>
              <th className="border border-gray-400 p-1 font-medium">
                壁貫通部との隙間
              </th>
              <th className="border border-gray-400 p-1 font-medium">逆風止</th>
              <th className="border border-gray-400 p-1 font-medium">面積</th>
            </tr>
          </thead>
          <tbody>
            {headers.map((label, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-gray-400 p-0">
                  <button
                    className="bg-[#D9D9D9] border-none p-2 font-bold w-full h-full"
                    onClick={() => toggleRow(rowIndex)}
                  >
                    {label}
                  </button>
                </td>
                {Array(9)
                  .fill(null)
                  .map((_, colIndex) => (
                    <td
                      key={colIndex}
                      className="border border-gray-400 p-2 h-10"
                    >
                      {rowStates[rowIndex] ? "◯" : ""}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Equipment;
