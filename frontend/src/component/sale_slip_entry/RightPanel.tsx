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
    "行追加",
    "行削除",
    "請求年月変更",
    " 入金処理",
  ];

  return (
    <div className="w-2/12 border bg-[#d8dadc] border-black h-full pt-5">
      <div className="mx-3 font-bold text-base text-black flex flex-col gap-2 overflow-auto h-full">
        {buttons.map((label, index) => {
          return (
            <button
              key={index}
              onClick={() => onButtonClick(label)}
              
              className={`mb-3 h-10 border border-black shadow-md hover:bg-white ${
                activeButton === label ? "bg-[#4d7a90]" : "bg-[#80bad7]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RightPanel;
