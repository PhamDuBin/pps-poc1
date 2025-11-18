// ■04残高内訳_明細
import React, { useState, useRef, useEffect } from "react";
import { useScreenNavigation } from "../../../utils/useScreenNavigation";
import {
  detailsHeaders,
  categoryHeaders,
  categoryItemNames,
} from "../../../constants/transaction_information";
import { handleOpenWindow } from "../../../constants/functions";
import { Button, Radio } from "antd"; // Đã sửa đổi: Chỉ cần import từ 'antd'

const BalanceDetailScreen = ({ onSwitchScreen }: any) => {
  const [view, setView] = useState("category");
  const containerRef = useScreenNavigation<HTMLDivElement>(onSwitchScreen);

  // Ref cho component <Radio> của AntD (sẽ trỏ đến div wrapper)
  const detailsRadioRef = useRef<any>(null);
  const categoryRadioRef = useRef<any>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Focus on category radio when component mounts
  useEffect(() => {
    if (categoryRadioRef.current) {
      setTimeout(() => {
        // AntD Radio ref trỏ đến wrapper, cần focus vào input bên trong
        categoryRadioRef.current?.input?.focus();
      }, 100);
    }
  }, []);

  // Handle radio navigation
  useEffect(() => {
    const handleRadioKeyDown = (e: KeyboardEvent, currentValue: string) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        e.stopPropagation();
        // Toggle between values
        const newValue = currentValue === "details" ? "category" : "details";
        setView(newValue);

        // Focus vào input của Radio kia
        const targetRadio =
          newValue === "details"
            ? detailsRadioRef.current
            : categoryRadioRef.current;
        if (targetRadio) {
          targetRadio.input?.focus();
          // Không cần click() nữa vì <Radio.Group> đã xử lý state
        }
      } else if (e.key === "ArrowDown" || e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        // Move to button
        buttonRef.current?.focus();
      }
    };

    // Lấy thẻ input thật từ ref của AntD
    const detailsRadioInput = detailsRadioRef.current?.input;
    const categoryRadioInput = categoryRadioRef.current?.input;

    const detailsHandler = (e: KeyboardEvent) =>
      handleRadioKeyDown(e, "details");
    const categoryHandler = (e: KeyboardEvent) =>
      handleRadioKeyDown(e, "category");

    detailsRadioInput?.addEventListener("keydown", detailsHandler);
    categoryRadioInput?.addEventListener("keydown", categoryHandler);

    return () => {
      detailsRadioInput?.removeEventListener("keydown", detailsHandler);
      categoryRadioInput?.removeEventListener("keydown", categoryHandler);
    };
  }, [view]); // Thêm 'view' vào dependency array để đảm bảo 'currentValue' luôn đúng

  const buttonStyle =
    "px-4 py-1.5 rounded-sm font-semibold w-[150px] bg-button-primary cursor-pointer hover:bg-white shadow-md shadow-zinc-600 transition-all duration-200 active:shadow-none active:translate-y-px";

  const detailsRowCount = 15;
  const detailsCellStyle = " bg-input border-b border-r border-black p-2 h-9";
  const detailsHeaderCellStyle =
    "bg-label border-b text-center p-2 font-semibold text-sm border-r border-black";

  const categoryLabelStyle =
    "bg-label border border-black  px-4 py-2 text-center font-semibold text-sm w-full";
  const categoryOperatorStyle =
    "flex items-center justify-center text-2xl font-semibold px-2";

  return (
    <div ref={containerRef} className="p-4 text-black w-full text-sm">
      <div className="text-center h-8 text-lg flex justify-center items-center font-bold bg-label p-2 mb-1">
        ＜残高内訳＞
      </div>

      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-6">
          <span className="font-semibold p-2 bg-label w-[150px] flex justify-center">
            表示種類
          </span>

          {/* === KHỐI RADIO ĐÃ THAY THẾ === */}
          <Radio.Group
            onChange={(e) => setView(e.target.value)}
            value={view}
            className="flex items-center gap-4"
          >
            <Radio ref={detailsRadioRef} value="details">
              明細
            </Radio>
            <Radio ref={categoryRadioRef} value="category">
              大分類別
            </Radio>
          </Radio.Group>
          {/* === KẾT THÚC THAY THẾ === */}
        </div>
        <Button
          ref={buttonRef}
          onClick={handleOpenWindow}
          className={buttonStyle}
        >
          全明細
        </Button>
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
            <div className="grid grid-cols-[1fr_1.2fr_3fr_1.5fr_1.5fr_1.5fr_1.2fr] bg-label">
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
            <div className={`${buttonStyle} bg-label flex justify-center`}>
              残高合計
            </div>
            <input
              placeholder="0"
              type="text"
              className="border border-black h-9 w-48 text-right px-2"
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
                  className="bg-label p-2 border-b-2 border-r border-black"
                >
                  {h}
                </div>
              ))}
            </div>
            <div>
              {categoryItemNames.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[2.5fr_1fr_1fr_1fr_1fr_1.2fr] border-b bg-input border-black"
                >
                  <div className="border-r border-black p-1 text-center">
                    {item}
                  </div>
                  <div className="border-r border-black p-1 text-right">0</div>
                  <div className="border-r border-black p-1 text-right">0</div>
                  <div className="border-r border-black p-1 text-right">0</div>
                  <div className="border-r border-black p-1 text-right">0</div>
                  <div className="border-r border-black p-1 text-right">0</div>
                </div>
              ))}
              <div className="grid grid-cols-[2.5fr_1fr_1fr_1fr_1fr_1.2fr] bg-label font-bold">
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
                className="bg-input border border-black  px-4  text-right font-semibold w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BalanceDetailScreen;
