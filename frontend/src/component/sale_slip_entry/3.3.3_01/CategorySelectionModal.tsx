import React, { useCallback, useMemo, useRef, useEffect } from "react";
import StatusBar from "../StatusBar";
import { useKeyboardShortcuts } from "../../../hooks/useKeyboardShortcuts";

interface CategorySelectionModalProps {
  onClose: () => void;
  onCategorySelect: (categoryName: string) => void;
}

const CategorySelectionModal: React.FC<CategorySelectionModalProps> = ({
  onClose,
  onCategorySelect,
}) => {
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  // Memoize button class string
  const btnClass = useMemo(
    () =>
      "flex-1 text-center bg-bg-gray border border-black py-2 rounded shadow-md shadow-zinc-600 mx-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:black",
    []
  );

  // Memoize button click handler
  const handleButtonClick = useCallback(
    (name: string) => {
      onCategorySelect(name);
    },
    [onCategorySelect]
  );

  // Define keyboard shortcuts using custom hook
  const shortcuts = useMemo(
    () => [
      { key: "1", handler: () => handleButtonClick("1.売上"), ctrlKey: true },
      { key: "1", handler: () => handleButtonClick("1.売上"), altKey: true },
      { key: "2", handler: () => handleButtonClick("2.直送売上"), ctrlKey: true },
      { key: "2", handler: () => handleButtonClick("2.直送売上"), altKey: true },
      { key: "3", handler: () => handleButtonClick("3.売上値引"), ctrlKey: true },
      { key: "3", handler: () => handleButtonClick("3.売上値引"), altKey: true },
      { key: "4", handler: () => handleButtonClick("4.返品"), ctrlKey: true },
      { key: "4", handler: () => handleButtonClick("4.返品"), altKey: true },
      { key: "5", handler: () => handleButtonClick("5.経費"), ctrlKey: true },
      { key: "5", handler: () => handleButtonClick("5.経費"), altKey: true },
      { key: "6", handler: () => handleButtonClick("6.資産"), ctrlKey: true },
      { key: "6", handler: () => handleButtonClick("6.資産"), altKey: true },
      { key: "7", handler: () => handleButtonClick("7.消費税"), ctrlKey: true },
      { key: "7", handler: () => handleButtonClick("7.消費税"), altKey: true },
      { key: "c", handler: onClose, ctrlKey: true },
      { key: "C", handler: onClose, ctrlKey: true },
      { key: "c", handler: onClose, altKey: true },
      { key: "C", handler: onClose, altKey: true },
    ],
    [handleButtonClick, onClose]
  );

  // Use keyboard shortcuts hook
  useKeyboardShortcuts({ shortcuts });

  // Auto-focus first button
  useEffect(() => {
    if (firstButtonRef.current) {
      firstButtonRef.current.focus();
    }
  }, []);

  return (
    // Overlay
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      {/* Modal content */}
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg border border-black p-6">
        <div className="w-full flex justify-center items-center">
          <StatusBar currentStep={1} />
        </div>

        {/* Các nhóm button */}
        <div className="flex flex-col space-y-5 font-bold text-black mt-5 items-center">
          <div className="flex w-full max-w-3xl">
            <button
              ref={firstButtonRef}
              className={btnClass}
              onClick={() => handleButtonClick("1.売上")}
              aria-label="売上を選択"
            >
              売上(1)
            </button>
            <button
              className={btnClass}
              onClick={() => handleButtonClick("2.直送売上")}
              aria-label="直送売上を選択"
            >
              直送売上(2)
            </button>
            <button
              className={btnClass}
              onClick={() => handleButtonClick("3.売上値引")}
              aria-label="売上値引を選択"
            >
              売上値引(3)
            </button>
            <button
              className={btnClass}
              onClick={() => handleButtonClick("4.返品")}
              aria-label="返品を選択"
            >
              返品(4)
            </button>
          </div>

          <div className="flex w-full max-w-3xl">
            <button
              className={btnClass}
              onClick={() => handleButtonClick("5.経費")}
              aria-label="経費を選択"
            >
              経費(5)
            </button>
            <button
              className={btnClass}
              onClick={() => handleButtonClick("6.資産")}
              aria-label="資産を選択"
            >
              資産(6)
            </button>
            <button
              className={btnClass}
              onClick={() => handleButtonClick("7.消費税")}
              aria-label="消費税を選択"
            >
              消費税(7)
            </button>
            <div className="flex-1 mx-1"></div>
          </div>
        </div>

        {/* Nút đóng */}
        <div className="flex justify-center items-center mt-8 font-bold text-black">
          <button
            onClick={onClose}
            className="bg-bg-gray border border-black px-12 py-2 rounded shadow-md shadow-zinc-600"
            aria-label="モーダルを閉じる"
          >
            閉じる(C)
          </button>
        </div>
      </div>
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
export default React.memo(CategorySelectionModal);
