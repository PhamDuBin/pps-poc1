// ■01当月明細
import React from "react";

const CurrentMonthDetails = () => {
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

  const balanceMonths = [
    "2025年05月",
    "2025年04月",
    "2025年03月",
    "2025年02月",
    "2025年01月",
    "2024年12月",
    "2024年11月以前",
  ];

  const gasFeeItems = [
    "基本料金",
    "従量料金",
    "売上値引",
    "調整金額",
    "サービス割引",
    "消費税",
    "ガス料金",
  ];

  const inputStyle =
    "bg-[#ebcec0] border border-black h-8  text-right mt-1 ml-2 placeholder-black::placeholder";
  const labelStyle =
    "bg-[#80bad7] my-1 h-8 flex items-center justify-center font-semibold text-sm";
  const titleStyle =
    "font-semibold w-full text-sm p-1 text-center border bg-[#80bad7] my-1";

  const buttonLabelStyle = `${labelStyle} text-left w-full cursor-pointer hover:bg-[#92ADF8]`;

  const verticalLabelStyle =
    "flex items-center justify-center text-sm font-semibold bg-[#80bad7] my-1";

  return (
    <>
      <div
        className={`font-semibold text-sm p-1 mx-4 mt-4 text-center border bg-[#80bad7]`}
      >
        ＜当月明細＞
      </div>
      <div className="px-4 flex lg:flex-row flex-col gap-4 text-black font-sans w-full">
        <div className="flex flex-col items-center flex-shrink-0 w-[10%]">
          <div className={titleStyle}>＜判定＞</div>
          <div className="p-1 border border-black bg-[#80bad7] w-full">
            <div className="p-0.5 border border-black flex flex-col justify-between items-center bg-white h-full">
              <div className="w-full aspect-square rounded-full bg-red-300 border border-gray-400"></div>
              <div className="w-full aspect-square rounded-full bg-yellow-200 border border-gray-400"></div>
              <div className="w-full aspect-square rounded-full bg-cyan-300 border border-gray-400"></div>
            </div>
          </div>
        </div>

        <div className="flex-grow w-[50%]">
          <div className="flex items-center mb-1 text-sm">
            <div className="font-semibold bg-[#80bad7] text-center w-[60%] p-1 mr-1">
              ＜６ヶ月残高推移＞
            </div>
            <div className="font-semibold text-center w-[20%] bg-[#80bad7] m-1 p-1">
              滞留状況
            </div>
            <div className="font-semibold text-center w-[20%] bg-[#80bad7] p-1">
              自振対象
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="border border-black p-1">
              {balanceMonths.map((month) => (
                <div key={month} className="flex flex-row items-center gap-1">
                  <div className={`${labelStyle} w-[30%]`}>{month}</div>
                  <input type="text" className={`${inputStyle} w-[30%]`} />
                  <input
                    type="text"
                    className={`${inputStyle} w-[20%] rounded`}
                  />
                  <input
                    type="text"
                    className={`${inputStyle} w-[20%] rounded`}
                  />
                </div>
              ))}
              <div className="border border-black my-1"></div>
              <div className="flex flex-row items-center gap-1">
                <div className={`${labelStyle} w-[30%]`}>合計</div>
                <input type="text" className={`${inputStyle} w-[30%]`} />
                <div className="w-[20%] h-8"></div> {/* Placeholder */}
                <div className="w-[20%] h-8"></div> {/* Placeholder */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-[40%] font-sans">
          <div className={titleStyle}>＜ガス料金・使用量・料金No.000＞</div>
          <div className="border border-black p-1 w-full">
            <div className="flex gap-2 mb-2 w-full">
              <div className={`${verticalLabelStyle} w-[35%]`}>
                <span>料金表No.</span>
              </div>
              <div className="flex flex-col gap-1  w-[65%]">
                <div className="flex">
                  <div className={`${labelStyle} w-[60%]`}>使用量</div>
                  <input
                    placeholder="000"
                    type="text"
                    className={`${inputStyle} w-[40%]`}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full">
              <div className={`${verticalLabelStyle} w-[35%]`}>
                <span>m³ 売</span>
              </div>
              <div className="flex flex-col gap-1  w-[65%]">
                {gasFeeItems.map((item) => (
                  <div key={item} className="flex w-full">
                    <div className={`${labelStyle} w-[60%]`}>{item}</div>
                    <input
                      placeholder="0"
                      type="text"
                      className={`${inputStyle} w-[40%]`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-1 w-full">
              <div className="flex">
                <button
                  onClick={handleOpenWindow}
                  className={`${buttonLabelStyle} w-[75%]`}
                >
                  警報器リース
                </button>
                <input
                  placeholder="0"
                  type="text"
                  className={`${inputStyle} w-[25%]`}
                />
              </div>
              <div className="flex">
                <button
                  onClick={handleOpenWindow}
                  className={`${buttonLabelStyle} w-[75%]`}
                >
                  設備使用料
                </button>
                <input
                  placeholder="0"
                  type="text"
                  className={`${inputStyle} w-[25%]`}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-1 w-full">
              <div className={`${verticalLabelStyle} w-[35%]`}>
                <span>Kg 売</span>
              </div>
              <div className="flex flex-col gap-1  p-1 border border-gray-400 w-[65%]">
                <div className="flex items-center w-full">
                  <div className={`${labelStyle}  w-[60%]`}>数量</div>
                  <input
                    placeholder="0"
                    type="text"
                    className={`${inputStyle}  w-[40%]`}
                  />
                </div>
                <div className="flex items-center w-full">
                  <div className={`${labelStyle}  w-[60%]`}>金額</div>
                  <input
                    placeholder="0"
                    type="text"
                    className={`${inputStyle} w-[40%]`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentMonthDetails;
