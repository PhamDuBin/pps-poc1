import React from "react";
import { Button } from "antd";

interface RightPanelProps {
  onButtonClick: (buttonName: string) => void;
  activeButton: string | null;
}

const RightPanel: React.FC<RightPanelProps> = ({
  onButtonClick,
  activeButton,
}) => {
  const buttons = ["行追加", "請求年月変更", "入金処理"];
  const buttonRefs = React.useRef<(HTMLElement | null)[]>([]);

  const handleButtonKeyDown = (e: React.KeyboardEvent, index: number) => {
    // ArrowDown / ArrowRight / Tab: next button
    if (
      e.key === "ArrowDown" ||
      e.key === "ArrowRight" ||
      (e.key === "Tab" && !e.shiftKey)
    ) {
      e.preventDefault();
      const nextIndex = (index + 1) % buttons.length;
      buttonRefs.current[nextIndex]?.focus();
    }
    // ArrowUp / ArrowLeft / Shift+Tab: previous button
    else if (
      e.key === "ArrowUp" ||
      e.key === "ArrowLeft" ||
      (e.key === "Tab" && e.shiftKey)
    ) {
      e.preventDefault();
      const prevIndex = (index - 1 + buttons.length) % buttons.length;
      buttonRefs.current[prevIndex]?.focus();
    }
    // Enter / Space: activate button
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onButtonClick(buttons[index]);
    }
  };

  return (
    <div className="w-2/12 border bg-bg-alt border-black h-full pt-5">
      <div className="mx-3 font-bold text-base text-black flex flex-col gap-2 overflow-auto h-full">
        {buttons.map((label, index) => (
          <Button
            key={index}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            onClick={(e) => {
              onButtonClick(label);
              // Maintain focus on button after click
              setTimeout(() => {
                buttonRefs.current[index]?.focus();
              }, 0);
            }}
            onKeyDown={(e) => handleButtonKeyDown(e, index)}
            className={`mb-3 h-10 border border-black shadow-md hover:bg-white shadow-zinc-600 ${
              activeButton === label ? "bg-[#4d7a90]" : "bg-label"
            }`}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RightPanel;
