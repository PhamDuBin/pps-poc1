// ■04残高内訳_明細
import React, { useState } from "react";

const BalanceDetailScreen = () => {
  const [view, setView] = useState("category");

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

  const buttonStyle =
    "bg-[#80bad7] border border-black  px-4 py-1.5 rounded-sm shadow-sm font-semibold w-[150px]";

  const detailsHeaders = [
    "日付",
    "伝票番号",
    "項目名",
    "売上金額（税込）",
    "入金金額",
    "残高",
    "自振対象",
  ];
  const detailsRowCount = 15;
  const detailsCellStyle = " bg-[#ebcec0] border-b border-r border-black p-2 h-9";
  const detailsHeaderCellStyle =
    "bg-[#80bad7] border-b text-center p-2 font-semibold text-sm border-r border-black";

  const categoryHeaders = [
    "項目名",
    "前月残高",
    "当月売上額",
    "当月入金額",
    "調整額・返品",
    "大分類別残高",
  ];
  const categoryItemNames = [
    "LPG",
    "ガス器具",
    "その他器具・工事",
    "リース",
    "大分類5",
    "大分類6",
    "大分類7",
    "大分類8",
    "大分類9",
    "電力",
    "その他",
    "",
    "",
    "",
    "",
    "",
    "割賦金",
  ];
  const categoryLabelStyle =
    "bg-[#80bad7] border border-black  px-4 py-2 text-center font-semibold text-sm w-full";
  const categoryOperatorStyle =
    "flex items-center justify-center text-2xl font-semibold px-2";

  return (
    <div className="p-4 text-black w-full text-sm">
      <div className="text-center font-bold bg-[#80bad7] p-2 mb-1">
        ＜残高内訳＞
      </div>

      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-6">
          <span className="font-semibold p-2 bg-[#80bad7] w-[150px] flex justify-center">
            表示種類
          </span>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="displayType"
                value="details"
                checked={view === "details"}
                onChange={() => setView("details")}
                className="form-radio h-4 w-4"
              />
              <span>明細</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="displayType"
                value="category"
                checked={view === "category"}
                onChange={() => setView("category")}
                className="form-radio h-4 w-4"
              />
              <span>大分類別</span>
            </label>
          </div>
        </div>
        <button onClick={handleOpenWindow} className={buttonStyle}>
          全明細
        </button>
      </div>

      {view === "details" ? (
        <>
          <div className="border-t border-l border-black">
            <div className="grid grid-cols-[1fr_1.2fr_3fr_1.5fr_1.5fr_1.5fr_1.2fr]">
              {detailsHeaders.map((header) => (
                <div key={header} className={detailsHeaderCellStyle}>
                  {header}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-[1fr_1.2fr_3fr_1.5fr_1.5fr_1.5fr_1.2fr] bg-[#80bad7]">
              {Array.from({
                length: detailsRowCount * detailsHeaders.length,
              }).map((_, index) => (
                <div key={index} className={detailsCellStyle}>
                  &nbsp;
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end items-center mt-4 gap-2">
            <div className={`${buttonStyle} bg-[#80bad7] flex justify-center`}>
              残高合計
            </div>
            <input
              placeholder="0"
              type="text"
              className="border border-black h-9 w-48 text-right px-2"
              readOnly
            />
          </div>
        </>
      ) : (
        <div className="w-full text-sm">
          <div className="border-t border-l border-black ">
            <div className="grid grid-cols-[2.5fr_1fr_1fr_1fr_1fr_1.2fr] text-center font-semibold">
              {categoryHeaders.map((h) => (
                <div
                  key={h}
                  className="bg-[#80bad7] p-2 border-b-2 border-r border-black"
                >
                  {h}
                </div>
              ))}
            </div>
            <div>
              {categoryItemNames.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[2.5fr_1fr_1fr_1fr_1fr_1.2fr] border-b bg-[#ebcec0] border-black"
                >
                  <div className="border-r border-black p-1 text-center">
                    {item}
                  </div>
                  <div className="border-r border-black p-1 text-right">
                    0
                  </div>
                  <div className="border-r border-black p-1 text-right">
                    0
                  </div>
                  <div className="border-r border-black p-1 text-right">
                    0
                  </div>
                  <div className="border-r border-black p-1 text-right">
                    0
                  </div>
                  <div className="border-r border-black p-1 text-right">
                    0
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-[2.5fr_1fr_1fr_1fr_1fr_1.2fr] bg-[#80bad7] font-bold">
                <div className="border-r border-black p-2 text-center">
                  合計
                </div>
                <div className="border-r border-black p-2 text-right">0</div>
                <div className="border-r border-black p-2 text-right">0</div>
                <div className="border-r border-black p-2 text-right">0</div>
                <div className="border-r border-black p-2 text-right">0</div>
                <div className="border-r border-black p-2 text-right">0</div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-start mt-2 gap-2 border border-black p-3 w-full">
            <div className="flex flex-col items-center">
              <div className={categoryLabelStyle}>大分類残高</div>
              <div className="flex justify-end w-full">0</div>
            </div>
            <div className={categoryOperatorStyle}>-</div>
            <div className="flex flex-col items-center">
              <div className={categoryLabelStyle}>過入金</div>
              <div className="flex justify-end w-full">0</div>
            </div>
            <div className={categoryOperatorStyle}>-</div>
            <div className="flex flex-col items-center">
              <div className={categoryLabelStyle}>過入金割引</div>
              <div className="flex justify-end w-full">0</div>
            </div>
            <div className={categoryOperatorStyle}>=</div>
            <div className="flex flex-col items-center">
              <div className={`${categoryLabelStyle}`}>現在残高</div>
              <input
                type="text"
                placeholder="0"
                readOnly
                className="bg-[#ebcec0] border border-black  px-4  text-right font-semibold w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BalanceDetailScreen;
