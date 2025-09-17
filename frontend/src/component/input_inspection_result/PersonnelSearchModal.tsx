import { useState } from "react";
import { kanaButtons } from "../sale_slip_entry/LeftPanel";
import {
  convertToFullWidth,
  handleFormatting,
} from "../../utils/InputHandlers";
type PersonnelSearchModalProps = {
  onClose: () => void;
};

const PersonnelSearchModal: React.FC<PersonnelSearchModalProps> = ({
  onClose,
}) => {
  const [showTable, setShowTable] = useState(false);
  const [selected, setSelected] = useState("1");
  const [selectedRow, setSelectedRow] = useState(false);
  const rowCount = 30;
  const tableHeaders = [
    "コード",
    "氏名",
    "カナ氏名",
    "所属事務所名",
    "所属事務所No.",
  ];
  const rowData = [
    "00000001",
    "担当者太郎",
    "タントウシャタロウ",
    "東京事務所03",
    "0001-001-000",
  ];
  const colWidths = ["15%", "20%", "20%", "25%", "20%"];
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-400 w-1/2">
        <div>
          <div className="text-center h-8 text-sm bg-[#80bad7] border border-black py-1 font-semibold">
            担当者検索
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <div className="text-sm flex items-center flex-row py-2">
                <>
                  <label className="bg-[#80bad7] p-1 font-bold w-24 text-center mr-2">
                    検索種類
                  </label>
                  <label className="bg-[#80bad7] w-64 p-1 font-bold text-center">
                    カナ
                  </label>
                </>
              </div>
              <div className="text-sm flex items-center flex-row py-2 w-full">
                <>
                  <form>
                    <select className=" h-7 mr-2 bg-[#ebcec0] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24">
                      <option value="0">カナ</option>
                      <option value="1">コード</option>
                    </select>
                  </form>
                  <input
                    type="text"
                    className="w-64 p-1 border border-gray-500 bg-[#ebcec0]"
                    onKeyDown={(e) => {
                      handleFormatting(e, convertToFullWidth);
                    }}
                    onChange={(e) => convertToFullWidth(e.target.value)}
                  />
                </>
              </div>
            </div>
            <div>
              <button
                onClick={() => setShowTable(true)}
                className="bg-white border text-center border-black p-2 w-32 rounded-md shadow-md shadow-zinc-600"
              >
                絞り込む
              </button>
            </div>
          </div>
          <div className="mb-2 flex flex-wrap items-center justify-between">
            <div>
              <div className="text-sm flex items-center flex-row py-2 w-full">
                <>
                  <label className="bg-[#80bad7] p-1 font-bold w-24 text-center mr-2">
                    表示順
                  </label>
                  <form>
                    <select className=" mr-2 bg-[#ebcec0] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24">
                      <option value="0">コード順</option>
                      <option value="1">五十音順</option>
                    </select>
                  </form>
                  <label className="bg-[#80bad7] p-1 font-bold w-24 text-center mr-2">
                    検索種類
                  </label>
                  <div className="flex items-center w-24 justify-center">
                    <input
                      id="exceptRetiredEmployees"
                      type="radio"
                      value="0"
                      name="default-radio"
                      checked={selected === "0"}
                      onChange={(e) => setSelected(e.target.value)}
                      className="w-4 h-4 mr-1"
                    />
                    <label htmlFor="exceptRetiredEmployees">退職者以外</label>
                  </div>
                  <div className="flex items-center w-24 justify-center">
                    <input
                      id="all"
                      type="radio"
                      value="1"
                      name="default-radio"
                      checked={selected === "1"}
                      onChange={(e) => setSelected(e.target.value)}
                      className="w-4 h-4 mr-1"
                    />
                    <label htmlFor="all">全て</label>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          {kanaButtons.map((item, index) => {
            const isObject = typeof item === "object";
            const label = isObject ? item.label : item;
            const isWide = isObject && item.wide;
            return (
              <button
                key={index}
                className={`border text-center bg-white border-black p-0.5 mr-1 ${
                  isWide ? "w-20" : "w-8"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <h1 className="mt-2">検索結果：{rowCount}件</h1>
        {showTable && (
          <div className="h-48 overflow-y-auto mt-2">
            <div className="flex w-full sticky top-0">
              {tableHeaders.map((header, colIndex) => (
                <div
                  key={header}
                  style={{ width: colWidths[colIndex] }}
                  className="flex pl-1 text-sm bg-[#80bad7] font-semibold border border-[#5D5D5D] m-0.5 h-8 items-center"
                >
                  {header}
                </div>
              ))}
            </div>
            <div>
              {Array.from({ length: rowCount }).map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex"
                  onClick={() => setSelectedRow(true)}
                >
                  {rowData.map((data, cellIndex) => (
                    <div
                      key={cellIndex}
                      style={{ width: colWidths[cellIndex] }}
                      className=" pl-1 flex items-center border border-[#DFDEDE] text-sm m-0.5 bg-[#ebcec0] h-8"
                    >
                      {data}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="bg-[#D9D9D9] font-bold py-2 px-8 rounded border border-gray-500"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonnelSearchModal;
