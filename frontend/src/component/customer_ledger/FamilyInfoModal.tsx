import React, { useState } from "react";
import { Select, DatePicker, Input, Button } from "antd";
import dayjs from "dayjs";

const FamilyInfoModal = ({ onClose }: { onClose: () => void }) => {
  const [month, setMonth] = useState(dayjs());
  return (
    <div className="fixed  inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 w-[700px] rounded-md shadow-lg">
        {/* Header */}
        <div className="bg-gray-300 font-bold text-center py-2 rounded-md">
          家族情報
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 p-4 text-sm">
          {/* Left column */}
          <div className="flex items-center">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300 ">
              間柄
            </label>
            <Select defaultValue={""} className=" h-6 ml-2 w-36">
              <Select.Option value={""}>0</Select.Option>
              <Select.Option value={"本人"}>本人</Select.Option>
              <Select.Option value={"妻"}>妻</Select.Option>
              <Select.Option value={"父"}>父</Select.Option>
              <Select.Option value={"母"}>母</Select.Option>
              <Select.Option value={"兄"}>兄</Select.Option>
              <Select.Option value={"姉"}>姉</Select.Option>
              <Select.Option value={"弟"}>弟</Select.Option>
              <Select.Option value={"妹"}>妹</Select.Option>
              <Select.Option value={"子"}>子</Select.Option>
              <Select.Option value={"祖父"}>祖父</Select.Option>
              <Select.Option value={"祖母"}>祖母</Select.Option>
              <Select.Option value={"義父"}>義父</Select.Option>
              <Select.Option value={"義母"}>義母</Select.Option>
              <Select.Option value={"義祖父"}>義祖父</Select.Option>
              <Select.Option value={"義祖母"}>義祖母</Select.Option>
              <Select.Option value={"義兄"}>義兄</Select.Option>
              <Select.Option value={"義弟"}>義弟</Select.Option>
              <Select.Option value={"義姉"}>義姉</Select.Option>
              <Select.Option value={"義妹"}>義妹</Select.Option>
              <Select.Option value={"その他"}>その他</Select.Option>
            </Select>
          </div>
          <div className="flex items-center">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300 ">
              家族氏名
            </label>
            <Input type="text" className="h-6 ml-2 px-1" />
          </div>

          <div className="flex items-center">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300 ">
              性別
            </label>
            <Select defaultValue={"空白"} className=" h-6 ml-2 w-36">
              <Select.Option value={""}>空白</Select.Option>
              <Select.Option value={"男性"}>男性</Select.Option>
              <Select.Option value={"女性"}>女性</Select.Option>
            </Select>
          </div>

          <div className="flex items-center">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300 ">
              生年月日
            </label>
            <DatePicker
              picker="month"
              value={month}
              onChange={(date) => setMonth(date)}
              className={` h-6 w-full ml-2`}
              format="YYYY/MM"
            />
          </div>

          <div className="flex items-center">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300 ">
              職業
            </label>
            <Select defaultValue={""} className=" h-6 ml-2 w-36">
              <Select.Option value={""}>0</Select.Option>
              <Select.Option value={"会社員"}>会社員</Select.Option>
              <Select.Option value={"公務員"}>公務員</Select.Option>
              <Select.Option value={"自営業"}>自営業</Select.Option>
              <Select.Option value={"学生"}>学生</Select.Option>
              <Select.Option value={"無職"}>無職</Select.Option>
            </Select>
          </div>

          <div className="flex items-center">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300 ">
              健康関連
            </label>
            <Select defaultValue={""} className=" h-6 ml-2 w-full">
              <Select.Option value={""}>0</Select.Option>
              <Select.Option value={"肥満対応"}>肥満対応</Select.Option>
              <Select.Option value={"健康食品"}>健康食品</Select.Option>
              <Select.Option value={"健康器具"}>健康器具</Select.Option>
              <Select.Option value={"美容飲料"}>美容飲料</Select.Option>
            </Select>
          </div>

          <div className="flex items-center col-span-2">
            <label className="rounded-md w-24 h-6 flex items-center justify-center bg-gray-300 ">
              趣味
            </label>
            <Select defaultValue={""} className=" h-6 ml-2 w-36">
              <Select.Option value={""}>0</Select.Option>
              <Select.Option value={"映画鑑賞"}>映画鑑賞</Select.Option>
              <Select.Option value={"音楽鑑賞"}>音楽鑑賞</Select.Option>
              <Select.Option value={"美術鑑賞"}>美術鑑賞</Select.Option>
              <Select.Option value={"スポーツ観戦"}>スポーツ観戦</Select.Option>
              <Select.Option value={"読書"}>読書</Select.Option>
              <Select.Option value={"フィッシング"}>フィッシング</Select.Option>
              <Select.Option value={"ドライブ"}>ドライブ</Select.Option>
              <Select.Option value={"サイクリング"}>サイクリング</Select.Option>
              <Select.Option value={"ガーデニング"}>ガーデニング</Select.Option>
              <Select.Option value={"スキー"}>スキー</Select.Option>
              <Select.Option value={"スノーボード"}>スノーボード</Select.Option>
              <Select.Option value={"マリンスポーツ"}>
                マリンスポーツ
              </Select.Option>
              <Select.Option value={"登山"}>登山</Select.Option>
              <Select.Option value={"料理"}>料理</Select.Option>
              <Select.Option value={"写真"}>写真</Select.Option>
              <Select.Option value={"インターネット"}>
                インターネット
              </Select.Option>
              <Select.Option value={"旅行"}>旅行</Select.Option>
              <Select.Option value={"ブリーディング"}>
                ブリーディング
              </Select.Option>
              <Select.Option value={"アウトドア"}>アウトドア</Select.Option>
              <Select.Option value={"その他"}>その他</Select.Option>
            </Select>
          </div>
        </div>
        <div className="flex justify-center gap-4 ">
          <Button
            onClick={onClose}
            className="px-4 py-1 border border-black bg-gray-200 hover:bg-gray-300"
          >
            閉じる
          </Button>
          {/* <Button className="px-4 py-1 border border-black bg-blue-500 text-white hover:bg-blue-400">
            保存
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default FamilyInfoModal;
