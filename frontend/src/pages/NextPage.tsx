import { Printer } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useProgressStore } from "../context/useProgressStore";

const NextPage: React.FC = () => {
  const navigate = useNavigate();
  const { visible, progress, current, total, collapsed, toggleCollapse } =
    useProgressStore();

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-[600px] space-y-4">
        <p className="text-sm text-gray-700">
          「印刷」ボタンのテストを再度行う際は、「前のページへ」をクリックしてください。
        </p>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 px-6 py-2 rounded shadow hover:bg-gray-400"
        >
          前のページへ
        </button>

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

export default NextPage;
