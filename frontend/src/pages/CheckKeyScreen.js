import React from "react";
import { Card, CardBody, Button } from "@nextui-org/react";

export default function CheckKeyScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0f0f0] p-4">
      <Card className="w-full max-w-3xl border border-gray-300 bg-white shadow-md">
        <CardBody className="p-6 space-y-6">
          {/* Header */}
          <div>
            <p className="text-sm text-gray-500">ショートカットサンプル</p>
            <h1 className="text-center text-xl font-bold mt-4">
              「ショートカットキー」サンプルコード
            </h1>
          </div>

          {/* Instructions */}
          <ul className="space-y-2 text-sm text-black whitespace-nowrap">
            <li>
              ●
              各種ファンクションキーをクリックすると「モーダル画面」または「新規のウィンドウ」が開きます。
            </li>
            <li>
              ●
              「Option」+「Win（Command）」+「Z」キーをクリックするとマウスの見た目が虫眼鏡に変わります。
            </li>
            <li>
              ●
              「Option」+「Win（Command）」+「F」キーをクリックすると検索画面が表示されます。
            </li>
          </ul>

          {/* Function buttons */}
          <div className="flex justify-center gap-4 pt-4">
            {["F1キー", "F2キー", "F3キー", "F4キー"].map((label) => (
              <Button
                key={label}
                className="bg-gray-200 text-black shadow-sm rounded-none px-6"
              >
                {label}
              </Button>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
