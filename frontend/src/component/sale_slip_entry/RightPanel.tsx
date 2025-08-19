
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
    <div className="w-2/12 border border-black h-full">
      <div className="m-3 font-bold text-base text-black flex flex-col gap-2 overflow-auto h-full">
        {buttons.map((label, index) => {
          return (
            <button
              key={index}
              onClick={() => onButtonClick(label)}
              
              className={`mb-3 h-10 border border-black shadow-md hover:bg-white ${
                activeButton === label ? "bg-gray-400" : "bg-[#f0f0f0]"
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
