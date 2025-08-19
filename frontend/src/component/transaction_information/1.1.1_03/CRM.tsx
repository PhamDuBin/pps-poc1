// ■07CRM
import React from "react";

const CRM = () => {
  const tableHeaders = [
    "対応日",
    "内容",
    "コメント",
    "対応担当者",
    "開始",
    "終了",
    "対応内容1",
    "対応内容2",
    "面談者",
    "受付区分",
    "次回訪問日",
    "次回訪問目的",
    "確認",
    "定性ランク",
    "完了区分",
  ];

  const rowCount = 10;

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
    <div className="p-4 text-black w-full text-sm">
      <div className="text-center font-bold bg-[#80bad7] border border-black p-2 mb-2">＜CRM＞</div>
      <div
        className="overflow-auto border border-black"
        style={{ height: "280px" }}
      >
        <div className="relative" style={{ width: "max-content" }}>
          <div className="flex sticky top-0 bg-[#80bad7] z-10">
            {tableHeaders.map((header) => (
              <div
                key={header}
                className="p-2 text-center font-semibold border-b-2 border-r border-black"
                style={{
                  minWidth:
                    header === "内容" || header === "コメント"
                      ? "250px"
                      : "120px",
                }}
              >
                {header}
              </div>
            ))}
          </div>

          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex">
              {tableHeaders.map((_, cellIndex) => (
                <div
                  key={cellIndex}
                  className="p-2 border-b border-r border-black bg-[#ebcec0]"
                  style={{
                    minWidth:
                      tableHeaders[cellIndex] === "内容" ||
                      tableHeaders[cellIndex] === "コメント"
                        ? "250px"
                        : "120px",
                  }}
                >
                  &nbsp;
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-4 w-full">
        <div className="flex items-center w-[45%]">
          <span className="flex mr-2 justify-center text-center items-center font-semibold bg-[#80bad7] border border-gray-400 h-20 w-[20%]">
            内容
          </span>
          <textarea
            placeholder="400"
            className=" bg-[#ebcec0] border border-black p-2 rounded-sm w-[80%] h-20"
          ></textarea>
        </div>

        <div className="flex items-center w-[45%]">
          <span className="flex mx-2 justify-center text-center items-center font-semibold bg-[#80bad7] border border-black h-20 w-[20%]">
            コメント
          </span>
          <textarea
            placeholder="100"
            className="border bg-[#ebcec0] border-black p-2 rounded-sm w-[80%] h-20"
          ></textarea>
        </div>
        <div className="flex justify-end w-[10%]">
          <button
            onClick={handleOpenWindow}
            className="bg-[#80bad7] border border-black px-6 py-1.5 rounded-sm shadow-sm font-semibold h-full"
          >
            CRM分析
          </button>
        </div>
      </div>
    </div>
  );
};

export default CRM;
