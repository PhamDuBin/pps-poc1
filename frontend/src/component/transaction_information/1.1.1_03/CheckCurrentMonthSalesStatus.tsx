// ■02当月売上状況
import React from "react";

const billingLabels = [
  "前月繰越金",
  "当月売上（税込）",
  "消費税",
  "入金",
  "入金値引",
  "当月残高",
];
const firstOtherLabels = ["最終入金"];
const secondOtherLabels = ["割賦金", "割賦残金", "器具リース"];
const thirdOtherLabels = ["保証金", "与信限度額"];
const autoDebitLabels = ["自振区分", "自振状況", "自振履歴"];
const paymentInformationLabels = ["請求金額", "有効期限", "有効期限"];

const inputClass = "border border-black text-base h-8 text-center bg-[#ebcec0]";
const halfInputClass =
  "border border-black text-base h-8 text-center w-[50%] bg-[#ebcec0]";
const labelClass =
  "bg-[#80bad7] text-base font-medium h-8 flex items-center justify-center";
const containerClass = "flex items-center space-x-2 grid pb-1 grid-cols-2";
const container4colClass = "flex items-center space-x-2 grid pb-1 grid-cols-4";
const containerBillingClass =
  "flex items-center space-x-2 mb-2 grid grid-cols-2";
const titleClass =
  "mb-1 font-semibold text-[16px] text-center bg-[#80bad7] h-8 flex items-center justify-center";
const borderClass =
  "bg-[#ebcec0] border border-black font-semibold text-[16px] text-center h-8 flex items-center justify-center";
const borderContainerClass = "border border-black p-1";
const borderContainerBillingClass =
  "border border-black mb-1 p-1 max-w-[315px] h-[265px]";

function CheckCurrentMonthSalesStatusScreen() {
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
    <>
      <div
        className={`font-semibold text-sm p-1 mx-4 mt-4 text-center border bg-[#80bad7]`}
      >
        ＜当月売上状況＞
      </div>
      <div className="p-4 max-w-[620px] mx-auto">
        <div className="grid grid-rows-2 gap-1.5">
          <div className="flex grid-cols-2 gap-1.5 flex-col md:flex-row">
            {/* ＜請求残高＞ */}
            <div>
              <h2 className={titleClass}>＜請求残高＞</h2>
              <div className={borderContainerBillingClass}>
                {billingLabels.map((label, idx) => (
                  <div className={containerBillingClass} key={idx}>
                    <label
                      className={`${labelClass} ${
                        label === "前月繰越金" || label === "当月残高"
                          ? "font-semibold"
                          : ""
                      }`}
                    >
                      {label}
                    </label>
                    <input
                      placeholder="000"
                      className={inputClass}
                      type="text"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ＜その他＞ */}
            <div className="gap-1.5">
              <h2 className={titleClass}>＜その他＞</h2>
              <div className="grid max-h-[265px] gap-2.5">
                {/* 最終入金 */}
                <div className={borderContainerClass}>
                  {firstOtherLabels.map((label, idx) => (
                    <div className={container4colClass} key={idx}>
                      <label className={labelClass}>{label}</label>
                      <label className={borderClass}>25/05/12</label>
                      <input
                        placeholder="000"
                        className={`${inputClass} col-span-2`}
                        type="text"
                      />
                    </div>
                  ))}
                </div>

                {/* 割賦金・割賦残金・器具リース */}
                <div className={borderContainerClass}>
                  {secondOtherLabels.map((label, idx) => (
                    <div className={containerClass} key={idx}>
                      <button
                        onClick={handleOpenWindow}
                        className={`${labelClass} border border-black`}
                      >
                        {label}
                      </button>
                      <input
                        placeholder="000"
                        className={inputClass}
                        type="text"
                      />
                    </div>
                  ))}
                </div>

                {/* 保証金・与信限度額 */}
                <div className={borderContainerClass}>
                  {thirdOtherLabels.map((label, idx) => (
                    <div className={containerClass} key={idx}>
                      {label === "保証金" ? (
                        <button
                          onClick={handleOpenWindow}
                          className={`${labelClass} border border-black`}
                        >
                          {label}
                        </button>
                      ) : (
                        <label className={labelClass}>{label}</label>
                      )}
                      <input
                        placeholder="000"
                        className={inputClass}
                        type="text"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: 自振情報 + コンビニ情報 */}
          <div className="flex grid-cols-[6fr_4fr] gap-1.5 flex-col md:flex-row">
            {/* ＜自振情報＞ */}
            <div>
              <label className={titleClass}>＜自振情報＞</label>
              <div className={borderContainerClass}>
                {autoDebitLabels.map((label, idx) => (
                  <div className={container4colClass} key={idx}>
                    {label === "自振履歴" ? (
                      <button
                        onClick={handleOpenWindow}
                        className={`${labelClass} border border-black`}
                      >
                        {label}
                      </button>
                    ) : (
                      <label className={labelClass}>{label}</label>
                    )}
                    {label === "自振区分" ? (
                      <>
                        <input
                          placeholder="000"
                          className={inputClass}
                          type="text"
                        />
                        <label className="font-semibold col-span-2">
                          自振区分004
                        </label>
                      </>
                    ) : (
                      <>
                        <label>（依頼）</label>
                        <label className={borderClass}>25/05/12</label>
                        <input
                          placeholder="000"
                          className={inputClass}
                          type="text"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ＜コンビニ情報＞ */}
            <div>
              <label className={titleClass}>＜コンビニ情報＞</label>
              <div className={borderContainerClass}>
                {paymentInformationLabels.map((label, idx) => (
                  <div className={containerClass} key={idx}>
                    <label className={labelClass}>{label}</label>
                    <input
                      className={
                        label === "請求金額" ? inputClass : halfInputClass
                      }
                      type="text"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckCurrentMonthSalesStatusScreen;
