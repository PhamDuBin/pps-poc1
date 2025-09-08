import { useState } from "react";
import ModalF1 from "../../modal/Modal_F1";
import { labelColor, inputColor } from "../../../constants/colors";

const Meter = () => {
  const [modalF1Open, setModalF1Open] = useState(false);

  const symbols = ["", "◯", "×", "✔"];
  const totalRows = 1;

  const options = [
    "0: 空白",
    "01: 火災・爆発",
    "02: 地震",
    "03: CO",
    "04: ガス漏れ",
    "05: ガス臭",
    "06: 不着火",
    "07: 圧力異常",
    "08: 遮断異常",
    "09: 使用時間遮断",
    "10: 流量遮断",
    "11: ガス漏れ警報",
    "12: 圧力低下遮断",
    "13: 閉塞圧異常警報",
    "14: 電池圧力低下",
    "15: 流量式減少",
    "16: 圧力式減少",
    "17: 異常なし",
    "18: 電源プラグ",
    "30: その他",
  ];

  const [states, setStates] = useState<number[][]>(
    Array.from({ length: totalRows }, () => Array(1).fill(0))
  );

  const rows = [
    {
      type: "種別01",
      manufacturer: "xxx003",
      model: "00001",
      製造番号: "00001",
    },
  ];

  const [statelabel, setStatelabel] = useState(0); // 0 = 空白, 1 = 有, 2 = 無
  const [statelabel2, setStatelabel2] = useState(0);
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
      <span className={`flex justify-start text-start font-bold p-1 my-1 ${labelColor} mt-4`}>
        供給管
      </span>

      <div className="flex gap-x-4 mb-1 p-2 border border-black">
        <div>認定対象区分</div>
        <button
          onClick={handleClickSButton}
          className={`border border-black w-6 h-6 flex items-center justify-center ${inputColor}`}
        >
          {labels[statelabel]}
        </button>
      </div>

      <div className="flex justify-between text-xs space-x-2">
        {/* left-table */}
        <div className="w-3/5 min-w-[513px]">
          <div className=" border border-black h-20">
            <table className="w-full table-fixed border-collapse">
              <thead className={`h-[38px] ${labelColor}`}>
                <tr>
                  <th className="border border-black text-center w-[25%]">種別</th>
                  <th className="border border-black text-center w-[25%]">メーカー</th>
                  <th className="border border-black text-center w-[25%]">型式</th>
                  <th className="border border-black text-center w-[25%]">製造番号</th>
                  <th className="border border-black text-center w-[40px]">詳細</th>
                </tr>
              </thead>

              <tbody className="h-[40px]">
                {rows.map((row, idx) => {
                  const rowHasCheck = states[idx].some((s) => s === 3);
                  return (
                    <tr key={idx} className="h-[30px]">
                      <td className={`border border-black text-center ${inputColor}`}>
                        {row.type}
                      </td>
                      <td className={`border border-black text-center ${inputColor}`}>
                        {row.manufacturer}
                      </td>
                      <td className={`border border-black text-center ${inputColor}`}>
                        {row.model}
                      </td>
                      <td
                        tabIndex={0}
                        onClick={() => setModalF1Open(true)}
                        onKeyDown={handleDetailKeyDown}
                        className={`border border-black text-center cursor-pointer ${
                          rowHasCheck ? "bg-red-500" : inputColor
                        }`}
                      >
                        {row.製造番号}
                      </td>
                      <td
                        tabIndex={0}
                        onClick={() => setModalF1Open(true)}
                        onKeyDown={handleDetailKeyDown}
                        className={`border border-black text-center cursor-pointer ${inputColor}`}
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
        <div className="w-2/5 min-w-[400px]">
          <div className="h-20 border border-black">
            <table className="w-full table-fixed border-collapse">
              <thead className={`h-[38px] sticky top-0 z-10 ${labelColor}`}>
                <tr>
                  <th className="border border-black text-center w-[25%]">指針</th>
                  <th className="border border-black text-center w-[40%]">常時監視</th>
                  <th className="border border-black text-center w-[10%]">適合</th>
                  <th className="border border-black text-center w-[25%]">中間ガス管</th>
                </tr>
              </thead>
              <tbody className="h-[40px] ">
                {Array.from({ length: totalRows }).map((_, row) => (
                  <tr key={row}>
                    {Array.from({ length: 4 }).map((_, col) => {
                      if (col === 1) {
                        return (
                          <td key={col} className={`border border-black text-center h-8 ${inputColor}`}>
                            <select className={`w-full h-full font-medium bg-transparent outline-none ${inputColor}`}>
                              {options.map((opt, i) => (
                                <option key={i} value={i}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          </td>
                        );
                      }
                      if (col === 0) {
                        return (
                          <td key={col} className={`border border-black text-center h-8 ${inputColor}`}>
                            <input
                              type="number"
                              onClick={handleClickSButton2}
                              className={`w-full h-full border-none text-center bg-transparent outline-none ${inputColor}`}
                            />
                          </td>
                        );
                      }
                      if (col === 3) {
                        return (
                          <td key={col} className={`border border-black text-center h-8 ${inputColor}`}>
                            <button
                              onClick={handleClickSButton2}
                              className="text-center w-full h-full"
                            >
                              {labels[statelabel2]}
                            </button>
                          </td>
                        );
                      }
                      return (
                        <td
                          key={col}
                          className={`border border-black text-center cursor-pointer w-[10%] ${inputColor}`}
                          onClick={() => handleClick(row, col)}
                        >
                          {symbols[states[row][col]]}
                        </td>
                      );
                    })}
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

export default Meter;
