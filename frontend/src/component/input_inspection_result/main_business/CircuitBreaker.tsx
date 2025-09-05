import { useState } from "react";
import ModalF1 from "../../modal/Modal_F1";

const CircuitBreaker = () => {
  const [modalF1Open, setModalF1Open] = useState(false);

  const symbols = ["", "◯", "×", "✔"];

  // số hàng bảng phải định nghĩa
  const totalRows = 5;

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

  // state cho các giá trị số
  const [values, setValues] = useState<number[]>(Array(totalRows).fill(0));

  // state cho các ô (ký hiệu)
  const [states, setStates] = useState<number[]>(Array(totalRows).fill(0));

  const rows = [
    { label: "放出防止", model: "00001", count: "00001" },
    { label: "耐震遮断", model: "00001", count: "00001" },
    { label: "警報遮断", model: "00001", count: "00001" },
    { group: "気化器", label: "気化装置停電対策" },
    { group: "気化器", label: "電気気化装置による手動復帰式自動ガス遮断器" },
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

  const [statelabel, setStatelabel] = useState<number>(0); // 0 = 空白, 1 = 有, 2 = 無
  const labels = ["", "有", "無"];
  const [statelabel2, setStatelabel2] = useState<number>(0); // 0 = 空白, 1 = 有, 2 = 無

  const handleClickSButton = () => {
    setStatelabel((prev) => (prev + 1) % 3);
  };
  const handleClickSButton2 = () => {
    setStatelabel2((prev) => (prev + 1) % 3);
  };

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
      <span className="flex justify-start text-start font-bold p-1 my-1 bg-[#D9D9D9]">
        遮断器
      </span>
      <div className="flex justify-between text-xs space-x-2">
        {/* left-table */}
        <div className="w-11/12 min-w-[837px]">
          <div className=" border border-black">
            <table className="w-full table-fixed border-collapse">
              <thead className="h-[40px] bg-[#D9D9D9]">
                <tr>
                  <th className="border border-black text-center w-[30%]"></th>
                  <th className="border border-black text-center w-[40%]">
                    型式
                  </th>
                  <th className="border border-black text-center w-[20%]">
                    個
                  </th>
                  <th className="border border-black text-center w-[60px]">
                    詳細
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, idx) => {
                  const showGroup =
                    row.group &&
                    (idx === 0 || row.group !== rows[idx - 1]?.group);

                  const isSpecial = !row.model && !row.count;

                  return (
                    <tr key={idx} className="h-[30px]">
                      {showGroup && (
                        <th
                          rowSpan={
                            rows.filter((r) => r.group === row.group).length
                          }
                          className="border border-black text-center bg-[#D9D9D9]"
                        >
                          {row.group}
                        </th>
                      )}

                      {!isSpecial ? (
                        <>
                          <th className="border border-black text-center bg-[#D9D9D9]">
                            {row.label}
                          </th>
                          <td className="border border-black text-center">
                            {row.model}
                          </td>
                          <td className="border border-black text-center">
                            {row.count}
                          </td>
                          <td
                            onClick={() => setModalF1Open(true)}
                            onKeyDown={handleDetailKeyDown}
                            className={`border border-black text-center cursor-pointer
                                    ${states[idx] === 3 ? "bg-red-500" : ""}`}
                          >
                            ▼
                          </td>
                        </>
                      ) : (
                        <th
                          colSpan={3}
                          className="border border-black pl-2 text-left font-semibold bg-[#D9D9D9]"
                        >
                          {row.label}
                        </th>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* right-table */}
        <div className="w-1/12 min-w-[70px]">
          <div className="overflow-y-auto h-48 border border-black">
            <table className="w-full table-fixed border-collapse">
              <thead className="h-8 bg-[#D9D9D9]">
                <tr className="sticky top-0 bg-[#D9D9D9] z-10">
                  <th className="border border-black text-center w-[4%]">
                    判定
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: totalRows }).map((_, row) => {
                  if (row === 3) {
                    return (
                      <tr key={row} className="bg-white hover:bg-gray-50">
                        <td
                          className="border border-black text-center cursor-pointer h-16"
                          rowSpan={2}
                          onClick={() => handleClick(row)}
                        >
                          {symbols[states[row]]}
                        </td>
                      </tr>
                    );
                  }

                  if (row === 4) return null;

                  return (
                    <tr key={row} className="bg-white hover:bg-gray-50">
                      <td
                        className="border border-black text-center cursor-pointer h-8"
                        onClick={() => handleClick(row)}
                      >
                        {symbols[states[row]]}
                      </td>
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

export default CircuitBreaker;
