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
    "flex-1 text-center bg-[#EEEEEE] border border-black py-2 rounded shadow-md shadow-zinc-600 mx-1";

  const handleButtonClick = (name: string) => {
    onCategorySelect(name);
  };
  return (
    // Overlay
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      {/* Modal content */}
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg border border-black p-6">
        <StatusBar currentStep={1} />

        {/* Các nhóm button */}
        <div className="flex flex-col space-y-5 font-bold text-black mt-5 items-center">
          <div className="flex w-full max-w-3xl">
            <button
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
