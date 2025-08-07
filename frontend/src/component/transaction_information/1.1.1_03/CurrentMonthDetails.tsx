import React from "react";

const CurrentMonthDetails = () => {
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

  const inputStyle = "bg-white border border-black h-8 w-full text-right px-2";
  const labelStyle =
    "bg-gray-300 border border-black h-8 flex items-center justify-center font-semibold text-sm w-32";
  const titleStyle = "font-semibold text-center mb-1";

  return (
    <div className="p-4 bg-[#f0f0f0] flex flex-col lg:flex-row gap-4 text-black font-sans">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={titleStyle}>＜判定＞</div>
        <div className="p-2 border border-black flex flex-col gap-2 bg-white rounded">
          <div className="w-12 h-12 rounded-full bg-red-400 border border-gray-400"></div>
          <div className="w-12 h-12 rounded-full bg-yellow-300 border border-gray-400"></div>
          <div className="w-12 h-12 rounded-full bg-cyan-400 border border-gray-400"></div>
        </div>
      </div>

      <div className="flex-grow">
        <div className="flex items-center mb-1 text-sm">
          <div className="font-semibold text-center w-full max-w-[160px]">
            ＜６ヶ月残高推移＞
          </div>
          <div className="font-semibold text-center flex-1"></div>
          <div className="font-semibold text-center w-24">滞留状況</div>
          <div className="font-semibold text-center w-24">自振対象</div>
        </div>
        <div className="flex flex-col gap-1">
          {balanceMonths.map((month) => (
            <div key={month} className="flex flex-row items-center gap-1">
              <div className={`${labelStyle} !w-40`}>{month}</div>
              <input type="text" className={`${inputStyle} flex-1`} />
              <input type="text" className={`${inputStyle} !w-24`} />
              <input type="text" className={`${inputStyle} !w-24`} />
            </div>
          ))}
          <div className="flex flex-row items-center gap-1">
            <div className={`${labelStyle} !w-40`}>合計</div>
            <input type="text" className={`${inputStyle} flex-1`} />
            <div className="w-24 h-8"></div> {/* Placeholder */}
            <div className="w-24 h-8"></div> {/* Placeholder */}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className={titleStyle}>＜ガス料金・使用量・料金No.＞</div>
        <div className="flex items-center justify-between border border-black p-1 bg-gray-300 rounded-sm">
          <div className="flex items-center gap-4 ml-2">
            <span className="font-semibold text-sm">料金表No.</span>
            <span className="font-semibold text-sm">使用量</span>
          </div>
          <input
            type="text"
            readOnly
            value="000"
            className="bg-white border border-black h-7 w-20 text-center"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-1">
            {gasFeeItems.map((item) => (
              <div key={item} className="flex flex-row items-center gap-1">
                <div className={`${labelStyle}`}>
                  {item === "調整金額" && (
                    <span className="text-xs mr-1">m³ 売</span>
                  )}
                  {item}
                </div>
                <input type="text" className={`${inputStyle} w-36`} />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 w-48">
            <div className={`${labelStyle} w-full text-center`}>
              警報器リース
            </div>
            <div className={`${labelStyle} w-full text-center`}>設備使用料</div>
            <div className="border border-black p-1 bg-gray-200">
              <div className="flex items-center gap-1 mb-1">
                <div className={`${labelStyle} flex-1 !text-xs`}>数量</div>
                <input type="text" className={`${inputStyle} flex-1`} />
              </div>
              <div className="flex items-center gap-1">
                <div className={`${labelStyle} flex-1 !text-xs`}>
                  <span className="text-xs mr-1">Kg 売</span> 金額
                </div>
                <input type="text" className={`${inputStyle} flex-1`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentMonthDetails;
