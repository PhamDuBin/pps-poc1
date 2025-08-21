import React from "react";

interface RightPanelProps {
  onButtonClick: (buttonName: string) => void;
  activeButton: string | null;
}

const RightPanel: React.FC<RightPanelProps> = ({
  onButtonClick,
  activeButton,
}) => {
  const buttons = [
    "当月明細",
    "当月売上状況",
    "大分類別売上",
    "残高内訳",
    "検針情報",
    "年間明細",
    "CRM",
    "ポイント",
    "印刷依頼情報",
    "自振照会",
    "大分類残高",
  ];

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
    <div className="w-2/12 border bg-[#d8dadc] border-black h-full">
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
            <button
              key={index}
              onClick={
                isSpecial ? handleOpenWindow : () => onButtonClick(label)
              }
              className={`mb-3 h-10 border border-black shadow-md hover:bg-white ${
                activeButton === label ? "bg-[#4d7a90]" : "bg-[#80bad7]"
              }`}
            >
              {label}
            </button>
          );
        })}

        <div className="flex items-center justify-center space-x-4 mt-10 mb-8">
          <div className="flex flex-col items-center">
            <button
              className="w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-gray-300 bg-transparent"
              disabled
              aria-label="left"
            />
            <span className="text-xs text-black font-bold mt-1">F5</span>
          </div>
          <div className="text-black font-bold text-lg text-center select-none mb-4">
            顧客切替
          </div>
          <div className="flex flex-col items-center">
            <button
              className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-gray-300 bg-transparent"
              disabled
              aria-label="right"
            />
            <span className="text-xs text-black font-bold mt-1">F6</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
