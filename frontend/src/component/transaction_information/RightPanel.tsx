import React, { forwardRef } from "react";
import { handleOpenWindow } from "../../constants/functions";
import { Button } from "antd/lib";
interface RightPanelProps {
  onButtonClick: (buttonName: string) => void;
  activeButton: string | null;
  buttons: string[];
  onFirstButtonFocus?: () => void;
}

const RightPanel = forwardRef<HTMLDivElement, RightPanelProps>(
  ({ onButtonClick, activeButton, buttons, onFirstButtonFocus }, ref) => {
    return (
      <div ref={ref} className="w-2/12 border bg-bg-alt border-black h-full">
        <div className="mx-3 font-bold text-base text-black flex flex-col gap-2 overflow-auto h-full">
          {buttons.map((label, index) => {
            const specialLabels = [
              "年間明細",
              "ポイント",
              "印刷依頼情報",
              "自振照会",
              "大分類残高",
            ];
            const isSpecial = specialLabels.includes(label);

            return (
              <Button
                data-button-id={label}
                key={label}
                onClick={
                  isSpecial ? handleOpenWindow : () => onButtonClick(label)
                }
                onFocus={index === 0 ? onFirstButtonFocus : undefined}
                tabIndex={isSpecial ? -1 : 0}
                className={`mb-3 h-10 border border-black shadow-md hover:bg-white shadow-zinc-600 ${
                  activeButton === label ? "bg-[#4d7a90]" : "bg-label"
                }`}
              >
                {label}
              </Button>
            );
          })}

          <div className="flex items-center justify-center space-x-4 mt-10 mb-8">
            <div className="flex flex-col items-center">
              <Button
                className="w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-gray-500 bg-transparent"
                disabled
                aria-label="left"
              />
              <span className="text-xs text-black font-bold mt-1">F5</span>
            </div>
            <div className="text-black font-bold text-lg text-center select-none mb-4">
              顧客切替
            </div>
            <div className="flex flex-col items-center">
              <Button
                className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-gray-500 bg-transparent"
                disabled
                aria-label="right"
              />
              <span className="text-xs text-black font-bold mt-1">F6</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default RightPanel;
