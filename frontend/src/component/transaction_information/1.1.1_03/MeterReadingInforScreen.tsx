// ■05検針情報
import React from "react";

const MeterReadingInforScreen = () => {
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

  const headerFields = [
    { label: "検針地区", value: "016 16番地区" },
    { label: "検針順路", value: "0000-780" },
    { label: "予定日", value: "15" },
  ];

  const tableHeaders = [
    "計算",
    "検針日",
    "指針",
    "使用量",
    "ガス料金",
    "基本料金",
    "従量料金",
    "売上値引",
    "調整金額",
    "サービス割引",
    "警報器リース",
    "設備利用料",
    "料金No.",
    "検針入力方法",
  ];

  const tableRowData = [
    "通常",
    "2025/05/15",
    "0.1",
    "0.1",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "001",
    "ハンディ",
  ];

  const colWidths = [
    "w-24",
    "w-32",
    "w-24",
    "w-24",
    "w-24",
    "w-28",
    "w-28",
    "w-28",
    "w-28",
    "w-28",
    "w-28",
    "w-28",
    "w-28",
    "w-32",
  ];

  const stickyLeftPositions = [
    "left-0", //  0
    "left-[6rem]", //  w-24 = 6rem
    "left-[14rem]", //  6rem + 8rem (w-32)
    "left-[20rem]", //  14rem + 6rem (w-24)
    "left-[26rem]", //  20rem + 6rem (w-24)
  ];

  return (
    <div className="p-4 text-black w-full text-sm">
      <div className="border border-black text-center font-bold bg-[#80bad7] p-2 mb-4">
        ＜検針情報＞
      </div>

      <div className="flex justify-between items-center mb-4 px-1">
        <div className="flex items-center gap-4">
          {headerFields.map((field) => (
            <div key={field.label} className="flex items-center gap-2">
              <span className="font-semibold bg-[#80bad7] px-3 py-1.5 border border-black w-[150px] flex justify-center">
                {field.label}
              </span>
              <span className="font-semibold">{field.value}</span>
            </div>
          ))}
        </div>
        <button
          onClick={handleOpenWindow}
          className="bg-[#80bad7] border border-black px-4 py-1.5 rounded-sm shadow-sm font-semibold"
        >
          顧客別ガス使用量
        </button>
      </div>

      <div className="overflow-x-auto border border-black">
        <div className="relative" style={{ width: "max-content" }}>
          <div className="flex">
            {tableHeaders.map((header, index) => (
              <div
                key={header}
                className={`
                                    p-2 text-center font-semibold bg-[#80bad7] border border-r border-b-2 border-black
                                    ${colWidths[index]}
                                    ${
                                      index < 5
                                        ? `sticky z-10 ${stickyLeftPositions[index]}`
                                        : ""
                                    }
                                `}
              >
                {header}
              </div>
            ))}
          </div>

          {Array.from({ length: 20 }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex">
              {tableRowData.map((cellData, cellIndex) => (
                <div
                  key={cellIndex}
                  className={`
                                        p-1 text-right border-b border-r border-black bg-[#ebcec0]
                                        ${colWidths[cellIndex]}
                                        ${
                                          cellIndex < 5
                                            ? `sticky z-10 ${stickyLeftPositions[cellIndex]}`
                                            : ""
                                        }
                                        ${cellIndex === 0 ? "!text-center" : ""}
                                    `}
                >
                  {cellData}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeterReadingInforScreen;
