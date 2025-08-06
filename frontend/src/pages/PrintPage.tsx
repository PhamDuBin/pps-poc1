import React from "react";
import { useNavigate } from "react-router-dom";
import { Printer } from "lucide-react";
import { useProgressStore } from "../context/useProgressStore";
import BackButton from "../component/BackButton";

const PrintPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    visible,
    progress,
    current,
    total,
    collapsed,
    startProgress,
    toggleCollapse,
  } = useProgressStore();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <BackButton />
      <div className="w-[600px] bg-white border border-gray-400 p-6 rounded shadow space-y-4">
        <ol className="text-sm list-decimal pl-5 text-gray-700 space-y-1">
          <li>
            「印刷」ボタンをクリックすると連携状況表示インジケーターが表示されます。
          </li>
          <li>
            このインジケーターは見積もり参考数をもとにした実際のプロセスには連動していません。
          </li>
          <li>インジケーターの進捗状況は130枚のうちの割合に設定しています。</li>
          <li>「次のページへ」をクリックすると、別画面に遷移します。</li>
          <li>
            画面遷移後も、インジケーター起動から8秒間は所定の位置に表示され続けます。
          </li>
        </ol>

        <div className="flex gap-4 justify-center">
          <button
            onClick={startProgress}
            className="bg-gray-300 px-6 py-2 rounded shadow hover:bg-gray-400"
          >
            印刷
          </button>
          <button
            onClick={() => navigate("/next-page")}
            className="bg-gray-300 px-6 py-2 rounded shadow hover:bg-gray-400"
          >
            次のページへ
          </button>
        </div>

        {visible && progress !== 100 && (
          <div className="border mt-6 p-1 bg-white rounded shadow w-fit flex items-center gap-3">
            {!collapsed ? (
              <>
                <span>
                  <Printer />
                </span>

                <div className="flex flex-col gap-1">
                  <span>
                    {progress}% {current}/{total}
                  </span>

                  <div className="w-[160px] h-3 bg-gray-200 rounded relative overflow-hidden">
                    <div
                      className="bg-gray-600 h-full rounded transition-all duration-200"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={toggleCollapse}
                  className="text-xs text-gray-500"
                >
                  ー
                </button>
              </>
            ) : (
              <button onClick={toggleCollapse}>印刷中…＋</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintPage;
