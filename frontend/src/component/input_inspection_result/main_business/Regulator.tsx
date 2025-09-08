import { useState } from "react";
import ModalF1 from "../../modal/Modal_F1";

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
      <span className="flex justify-start text-start font-bold p-1 my-1 bg-[#D9D9D9] ">
        調整器
      </span>
      <div className="flex justify-between text-xs space-x-2">
        {/* left-table */}
        <div className="w-5/6 min-w-[761px]">
          <div className="border border-black">
            <table className="w-full table-fixed border-collapse">
              <thead className="h-[40px] bg-[#D9D9D9]">
                <tr>
                  <th className="border border-black text-center w-[25px]">No.</th>
                  <th className="border border-black text-center w-[12%]">種別</th>
                  <th className="border border-black text-center w-[20%]">メーカー</th>
                  <th className="border border-black text-center w-[20%]">型式</th>
                  <th className="border border-black text-center w-[12%]">容量（kg/h）</th>
                  <th className="border border-black text-center w-[12%]">製造年月</th>
                  <th className="border border-black text-center w-[12%]">有効年月</th>
                  <th className="border border-black text-center w-[60px]">詳細</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => {
                  const rowHasCheck = states[idx].some((s) => s === 3);
                  return (
                    <tr key={idx} className="h-[30px]">
                      <td className="border border-black text-center">{row.no}</td>
                      <td className="border border-black text-center">{row.type}</td>
                      <td className="border border-black text-center">{row.maker}</td>
                      <td className="border border-black text-center">{row.model}</td>
                      <td className="border border-black text-center">{row.capacity}</td>
                      <td className="border border-black text-center">{row.manufacture}</td>
                      <td className="border border-black text-center">{row.valid}</td>
                      <td
                        onClick={() => setModalF1Open(true)}
                        onKeyDown={handleDetailKeyDown}
                        className={`border border-black text-center cursor-pointer ${
                          rowHasCheck ? "bg-red-500" : ""
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
        <div className="w-1/6 min-w-[150px]">
          <div className="overflow-y-auto h-30 border border-black">
            <table className="w-full table-fixed border-collapse">
              <thead className="h-9 bg-[#D9D9D9]">
                <tr className="sticky top-0 bg-[#D9D9D9] z-10">
                  <th className="border border-black text-center w-[4%]">腐食等</th>
                  <th className="border border-black text-center w-[4%]">適合</th>
                  <th className="border border-black text-center w-[4%]">判定</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: totalRows }).map((_, row) => (
                  <tr key={row} className="bg-white hover:bg-gray-50">
                    {Array.from({ length: 3 }).map((_, col) => (
                      <td
                        key={col}
                        className="border border-black text-center cursor-pointer w-[10%] h-8"
                        onClick={() => handleClick(row, col)}
                      >
                        {symbols[states[row][col]]}
                      </td>
                    ))}
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

export default Regulator;
