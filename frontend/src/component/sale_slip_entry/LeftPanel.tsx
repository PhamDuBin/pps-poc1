import React from "react";

//■左カラム顧客検索＆情報表示ランチャー
import { useEffect, useState } from "react";
import AdvanceSearchModal from "./3.3.3_01/AdvanceSearchModal";

const DownArrowIcon = () => (
  <svg
    className="w-3 h-3 text-black"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M19 9l-7 7-7-7"
    ></path>
  </svg>
);

const tableHeaders = [
  "コード", "氏名", "カナ氏名", "所属事務所名",
];

const rowData = [
  "00000001","担当者太郎","タントウシャタロウ","東京事務所03"
];

  const colWidths = ["15%", "25%", "25%", "35%"];

const rowCount = 8;

type LeftPanelProps = {
  showAdvanceSearch: boolean;
  setShowAdvanceSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

const LeftPanel: React.FC<LeftPanelProps> = ({ showAdvanceSearch, setShowAdvanceSearch }) => {
  const [postcode1, setPostcode1] = useState("");
  const [postcode2, setPostcode2] = useState("");
  const [showTable, setShowTable] = useState(false);

  const [selected, setSelected] = useState("1");


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      // Alt + Ctrl/Cmd + C
      const isComboPressed =
        e.code === "KeyC" && e.altKey && (isMac ? e.metaKey : e.ctrlKey);

      if (isComboPressed && showAdvanceSearch) {
        e.preventDefault();
        setShowAdvanceSearch(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showAdvanceSearch]);

  const handleOpenWindow = () => {
    const win = window.open(
      "/link-destination",
      "_blank",
      "width=800,height=600,noopener,noreferrer"
    );

    if (win) {
      win.focus();
    }
  };

  return (
    <div className="max-w-6xl overflow-y-auto overflow-x-hidden h-screen p-3 bg-[#d8dadc] border-2 border-gray-400 font-sans">
      <div>
        <div className="text-center h-8 text-sm bg-[#80bad7] py-1 font-semibold border border-black">
          顧客検索
        </div>
        <div className="mb-2 flex items-center justify-between">
          <div>
            
            <div className="text-xs flex items-center flex-row py-2 w-full">
                <>
                  <label className="bg-[#80bad7] p-1 font-bold w-24 text-center mr-2">
                    事務所
                  </label>
                  <input
                    type="text"
                    placeholder="0000"
                    className="w-[25%] px-1 py-0.5 border border-gray-500 bg-[#ebcec0]"
                    onChange={(e) => setPostcode1(e.target.value)}
                  />
                  <span className="mx-1">-</span>
                  <input
                    type="text"
                    placeholder="000"
                    className="w-[25%] px-1 py-0.5 border border-gray-500 bg-[#ebcec0]"
                    onChange={(e) => setPostcode2(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      setShowAdvanceSearch(true);
                    }}
                    className="mx-1 w-[20px] h-[20px] inset-y-0 right-0 flex items-center px-1 bg-white border border-gray-500 cursor-pointer"
                  >
                    <DownArrowIcon />
                  </button>

                </>
            </div>
            <div className="text-xs flex items-center flex-row py-2 w-full">
                <>
                  <label className="bg-[#80bad7] p-1 font-bold w-24 text-center mr-2 ">
                    顧客コード
                  </label>
                  <input
                    type="text"
                    placeholder="0000"
                    className="w-[25%] px-1 py-0.5 border border-gray-500 bg-[#ebcec0]"
                    onChange={(e) => setPostcode1(e.target.value)}
                  />
                  <span className="mx-1">-</span>
                  <input
                    type="text"
                    placeholder="000"
                    className="w-[25%] px-1 py-0.5 border border-gray-500 bg-[#ebcec0]"
                    onChange={(e) => setPostcode2(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      setShowAdvanceSearch(true);
                    }}
                    className="mx-1 w-[20px] h-[20px] inset-y-0 right-0 flex items-center px-1 bg-white border border-gray-500 cursor-pointer"
                  >
                    <DownArrowIcon />
                  </button>

                </>
            </div>
          </div>
          <div>
            <button
              onClick={() => setShowAdvanceSearch(true)}
              className="border text-center w-32 bg-white border-black p-2 rounded-md shadow-md shadow-zinc-600"
            >
              詳細検索（S）
            </button>
          </div>
          {showAdvanceSearch && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg relative w-[700px] max-w-full">
              <AdvanceSearchModal setShowAdvanceSearch={setShowAdvanceSearch} showAdvanceSearch={showAdvanceSearch} />
            </div>
          </div>
        )}
        </div>  
      </div>  
      <div>
        <div className="text-center h-8 text-sm bg-[#80bad7] border border-black py-1 font-semibold">
          担当者検索
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs flex items-center flex-row py-2 w-full">
                <>
                  <label className="bg-[#80bad7] p-1 font-bold w-24 text-center  mr-2">
                    検索種類
                  </label>
                  <label className="bg-[#ebcec0] w-72 p-1 font-bold text-center">
                    カナ
                  </label>
                </>
            </div>
            <div className="text-xs flex items-center flex-row py-2 w-full">
                <>
                  <form className="">
                    <select className=" mr-2 bg-[#ebcec0] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="0">カナ</option>
                      <option value="1">コード</option>
                    </select>
                  </form>
                  <input
                    type="text"
                    className="w-72 px-1 py-0.5 border border-gray-500 bg-[#ebcec0]"
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
            <div className="text-xs flex items-center flex-row py-2 w-full">
                <>
                  <label className="bg-[#80bad7] p-1 font-bold w-24 text-center mr-2">
                    表示順
                  </label>
                  <form className="">
                    <select className=" mr-2 bg-[#ebcec0] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
      <div className="w-full h-8 text-sm font-semibold text-center">
        <button className="border text-center bg-white border-black p-0.5 w-8 mr-1">
          ア
        </button>
        <button className="border text-center bg-white border-black p-0.5 w-8 mr-1">
          カ
        </button>
        <button className="border text-center bg-white border-black p-0.5 w-8 mr-1">
          サ
        </button>
        <button className="border text-center bg-white border-black p-0.5 w-8 mr-1">
          タ
        </button>
        <button className="border text-center bg-white border-black p-0.5 w-8 mr-1">
          ナ
        </button>
        <button className="border text-center bg-white border-black p-0.5 w-8 mr-1">
          ハ
        </button>
        <button className="border text-center bg-white border-black p-0.5 w-8 mr-1">
          マ
        </button>
        <button className="border text-center bg-white border-black p-0.5 w-8 mr-1">
          ヤ
        </button>
        <button className="border text-center bg-white border-black p-0.5 w-8 mr-1">
          ラ
        </button>
        <button className="border text-center bg-white border-black p-0.5 w-8 mr-1">
          ワ
        </button>
        <button className="border text-center bg-white border-black p-0.5 w-20 mr-1">
          その他
        </button>
        <button className="border text-center bg-white border-black p-0.5 w-20 mr-1">
          全て
        </button>
        
      </div>
      {showTable && (
      <div>
        <div className="flex w-full">
          {tableHeaders.map((header, colIndex) => (
            <div
              key={header}
              style={{ width: colWidths[colIndex] }}
              className="flex pl-1 text-sm  bg-[#80bad7] font-semibold border border-[#5D5D5D] m-0.5 h-8 items-center"
            >
              {header}
            </div>
          ))}

        </div>
        <div>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex">
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
    </div>
  );
};

export default LeftPanel;
