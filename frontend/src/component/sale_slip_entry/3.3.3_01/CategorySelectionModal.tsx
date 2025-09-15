import { useRef, useEffect } from "react";
import StatusBar from "../StatusBar";

type Props = {
  onClose: () => void;
  onCategorySelect: (categoryName: string) => void;
};

export default function CategorySelectionModal({
  onClose,
  onCategorySelect,
}: Props) {
  const btnClass =
    "flex-1 text-center bg-[#EEEEEE] border border-black py-2 rounded shadow-md shadow-zinc-600 mx-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:black";

  const handleButtonClick = (name: string) => {
    onCategorySelect(name);
  };

  const firstButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (firstButtonRef.current) {
      firstButtonRef.current.focus();
    }
  }, []);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) {
        event.preventDefault();

        switch (event.key) {
          case "1":
            handleButtonClick("1.売上");
            break;
          case "2":
            handleButtonClick("2.直送売上");
            break;
          case "3":
            handleButtonClick("3.売上値引");
            break;
          case "4":
            handleButtonClick("4.返品");
            break;
          case "5":
            handleButtonClick("5.経費");
            break;
          case "6":
            handleButtonClick("6.資産");
            break;
          case "7":
            handleButtonClick("7.消費税");
            break;
          case "c":
          case "C":
            onClose();
            break;
          default:
            break;
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCategorySelect, onClose]);

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
            >
              売上(1)
            </button>
            <button
              className={btnClass}
              onClick={() => handleButtonClick("2.直送売上")}
            >
              直送売上(2)
            </button>
            <button
              className={btnClass}
              onClick={() => handleButtonClick("3.売上値引")}
            >
              売上値引(3)
            </button>
            <button
              className={btnClass}
              onClick={() => handleButtonClick("4.返品")}
            >
              返品(4)
            </button>
          </div>

          <div className="flex w-full max-w-3xl">
            <button
              className={btnClass}
              onClick={() => handleButtonClick("5.経費")}
            >
              経費(5)
            </button>
            <button
              className={btnClass}
              onClick={() => handleButtonClick("6.資産")}
            >
              資産(6)
            </button>
            <button
              className={btnClass}
              onClick={() => handleButtonClick("7.消費税")}
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
            className="bg-[#EEEEEE] border border-black px-12 py-2 rounded shadow-md shadow-zinc-600"
          >
            閉じる(C)
          </button>
        </div>
      </div>
    </div>
  );
}
