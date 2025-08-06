import React, { useState } from "react";
import BackButton from "../component/BackButton";

export default function MouseTestPage() {
  const [loading, setLoading] = useState(false);
  const [hoverMouseTest, setHoverMouseTest] = useState(false);

  const handleSearchClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white border border-black p-8">
      <BackButton />
      {loading && (
        <div className="absolute inset-0 z-10 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin bg-white p-4"></div>
        </div>
      )}

      <div
        className={`z-0 w-full max-w-xl ${
          loading ? "pointer-events-none blur-sm" : ""
        }`}
      >
        <h2 className="text-sm mb-4">不確定インジケーター</h2>
        <ol className="text-lg font-semibold text-black mb-8 list-decimal list-inside">
          <li>
            「マウステスト」エリアにカーソルを当てるとカーソルの見た目が変わります。
          </li>
          <li>
            「検索」ボタンをクリックすると1.5秒間ローディングアニメーションが表示されます。
          </li>
        </ol>

        <div className="flex flex-col items-center gap-8">
          <button
            onClick={handleSearchClick}
            className="bg-gray-300 px-12 py-4 rounded text-lg font-bold shadow"
          >
            印刷
          </button>

          <button
            onMouseEnter={() => setHoverMouseTest(true)}
            onMouseLeave={() => setHoverMouseTest(false)}
            className={`border px-12 py-4 rounded text-lg font-bold ${
              hoverMouseTest ? "cursor-progress" : "cursor-default"
            } bg-red-100`}
          >
            マウステスト
          </button>
        </div>
      </div>
    </div>
  );
}
