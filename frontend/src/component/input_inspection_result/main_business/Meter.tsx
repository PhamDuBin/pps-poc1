import { useState } from "react";
import ModalF1 from "../../modal/Modal_F1";
import { labelColor, inputColor } from "../../../constants/colors";
import { handleNumericSelectKeyDown } from "../../../utils/InputHandlers";
import {
  optionsMeter,
  symbols,
} from "../../../constants/input_inspection_result";

const Meter = () => {
  const [modalF1Open, setModalF1Open] = useState(false);
  const totalRows = 1;

  const [states, setStates] = useState<number[][]>(
    Array.from({ length: totalRows }, () => Array(1).fill(0))
  );
  const [selectValue, setSelectValue] = useState(0);

  const rows = [
    {
      type: "種別01",
      manufacturer: "xxx003",
      model: "00001",
      製造番号: "00001",
    },
  ];

  const [statelabel, setStatelabel] = useState(0);
  const [statelabel2, setStatelabel2] = useState(0);
  const labels = ["", "有", "無"];

  const handleClickSButton = () => setStatelabel((prev) => (prev + 1) % 3);
  const handleClickSButton2 = () => setStatelabel2((prev) => (prev + 1) % 3);

  const handleClick = (row: number, col: number) => {
    setStates((prev) => {
      const newStates = prev.map((r) => [...r]);
      newStates[row][col] = (newStates[row][col] + 1) % symbols.length;
      return newStates;
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(parseInt(e.target.value, 10));
  };

  return (
    <>
      <span
        className={`flex justify-start text-start font-bold p-1 my-1 ${labelColor} mt-4`}
      >
        メーター
      </span>

      <div className="flex gap-x-4 mb-1 p-2 border border-black items-center text-xs">
        <div>認定対象区分</div>
        <button
          onClick={handleClickSButton}
          className={`border border-black w-6 h-6 flex items-center justify-center ${inputColor}`}
        >
          {labels[statelabel]}
        </button>
      </div>

      <div className="w-full min-w-[922px] text-[10px]">
        <div className="overflow-auto border border-black">
          <table className="w-full table-fixed border-collapse">
            <thead className={`h-[38px] ${labelColor}`}>
              <tr>
                <th className="border border-black text-center">種別</th>
                <th className="border border-black text-center">メーカー</th>
                <th className="border border-black text-center">型式</th>
                <th className="border border-black text-center">製造番号</th>
                <th className="border border-black text-center w-10">詳細</th>
                <th className="border border-black text-center">指針</th>
                <th className="border border-black text-center">常時監視</th>
                <th className="border border-black text-center w-10">適合</th>
                <th className="border border-black text-center w-10">
                  中間ガス管
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, idx) => {
                const val = states[idx][0];
                const bgColor =
                  val === 2
                    ? "bg-red-500"
                    : val === 3
                    ? "bg-green-600"
                    : inputColor;

                const rowHasCheck = val === 3;

                return (
                  <tr key={idx} className="h-6">
                    <td className={`border border-black text-center`}>
                      {row.type}
                    </td>
                    <td className={`border border-black text-center`}>
                      {row.manufacturer}
                    </td>
                    <td className={`border border-black text-center`}>
                      {row.model}
                    </td>
                    <td className={`border border-black text-center`}>
                      {row.製造番号}
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
                        className={`absolute inset-0 w-full h-full flex items-center justify-center  hover:bg-blue-100 ${
                          rowHasCheck ? "bg-red-500" : inputColor
                        }`}
                      >
                        ▼
                      </button>
                    </td>

                    {/* 指針 */}
                    <td className={`border border-black p-0`}>
                      <input
                        type="number"
                        className={`w-full h-full border-none text-center bg-transparent`}
                      />
                    </td>

                    {/* 常時監視 */}
                    <td className={`border border-black p-0 ${inputColor}`}>
                      <select
                        value={selectValue}
                        onChange={handleSelectChange}
                        onKeyDown={(e) =>
                          handleNumericSelectKeyDown(e, (val) => {
                            const numVal = parseInt(val, 10);
                            if (numVal < optionsMeter.length) {
                              setSelectValue(numVal);
                            }
                          })
                        }
                        className={`w-full h-full font-medium bg-transparent text-center`}
                      >
                        {optionsMeter.map((opt, i) => (
                          <option key={i} value={i}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* 適合 */}
                    <td className="relative border border-black text-center p-0">
                      <button
                        type="button"
                        tabIndex={0}
                        onClick={() => handleClick(idx, 0)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleClick(idx, 0);
                          }
                        }}
                        className={`absolute inset-0 w-full h-full flex items-center justify-center hover:bg-blue-100 ${bgColor}`}
                      >
                        {symbols[val]}
                      </button>
                    </td>

                    {/* 中間ガス管 */}
                    <td className="relative border border-black text-center p-0">
                      <button
                        type="button"
                        tabIndex={0}
                        onClick={handleClickSButton2}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleClickSButton2();
                          }
                        }}
                        className={`absolute inset-0 w-full h-full flex items-center justify-center  hover:bg-blue-100 ${inputColor}`}
                      >
                        {labels[statelabel2]}
                      </button>
                    </td>
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

export default Meter;
