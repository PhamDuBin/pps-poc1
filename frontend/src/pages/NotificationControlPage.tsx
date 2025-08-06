import React, { useEffect, useState } from "react";
import { setCookie, getCookie } from "../context/cookieUtils";
import BackButton from "../component/BackButton";

export default function NotificationControlPage() {
  const [showModal, setShowModal] = useState(false);
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  useEffect(() => {
    const hideNotice = getCookie("hideNotice");
    if (!hideNotice) {
      setShowModal(true);
    }
  }, []);

  const handleClose = () => {
    if (doNotShowAgain) {
      setCookie("hideNotice", "true", 30);
    }
    setShowModal(false);
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100">
      <BackButton />
      {/* Khung chính */}
      <div className="border border-black rounded-lg bg-white p-6 w-1/2 h-1/2 shadow-md flex flex-col justify-start">
        <h2 className="text-lg font-bold mb-4 text-center text-gray-800">
          通知コントロール
        </h2>

        <ol className="list-decimal ml-5 text-sm text-gray-700 space-y-2 mb-4">
          <li>
            「次回このお知らせを表示しない」にチェックを入れるとダイアログが表示されなくなります。
          </li>
          <li>
            「次回このお知らせを表示しない」にチェックを入れない場合、ダイアログは次回も表示されます。
          </li>
          <li>
            1を行った後、再度ダイアログを表示する場合は、ブラウザのcookieを削除してください。
          </li>
        </ol>

        {/* Modal */}
        {showModal && (
          <div className=" inset-0 flex justify-center items-center">
            <div className="bg-white border border-black p-6 w-[360px] rounded-md relative shadow-lg">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2  hover:text-black text-lg"
              >
                ✕
              </button>

              <div className="text-center text-sm text-black">
                <p className="font-bold text-red-600 mb-2">
                  ！重要なお知らせ！
                </p>
                <p className="mb-1">お知らせテキストサンプル</p>
                <p className="mb-4 leading-relaxed">
                  次回このお知らせを表示しないにチェックを
                  <br />
                  入れると次回このダイアログは表示されません。
                </p>

                <div className="flex items-center justify-center mb-4">
                  <input
                    id="doNotShow"
                    type="checkbox"
                    checked={doNotShowAgain}
                    onChange={(e) => setDoNotShowAgain(e.target.checked)}
                    className="mr-2 accent-black"
                  />
                  <label htmlFor="doNotShow">
                    次回このお知らせを表示しない
                  </label>
                </div>

                <button
                  onClick={handleClose}
                  className="border border-gray-400 px-4 py-1 rounded hover:bg-gray-100"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
