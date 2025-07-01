import React from "react";
import {
  Card,
  CardBody,
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  Textarea,
  Select,
  SelectItem,
  Divider,
  Button,
} from "@nextui-org/react";

export default function CheckInputScreen() {
  return (
    <div className="p-6 space-y-6 bg-[#f0f0f0] min-h-screen">
      <h1>テストフィールド1</h1>
      <Card className="border border-gray-400 bg-white shadow-md">
        <CardBody className="space-y-4">

          <div className="px-4 space-y-4">
            {/* 顧客コード */}
            <div className="flex items-center gap-2 p-2">
              <label className="flex justify-center min-w-[100px] text-lg font-black bg-gray-300 py-0.5 px-3">顧客コード</label>
              <input className="w-8 h-8 border-1 border-black text-center flex items-center justify-center"/>
              <input className="w-8 h-8 border-1 border-black text-center flex items-center justify-center"/>
              <input className="w-8 h-8 border-1 border-black text-center flex items-center justify-center"/>
              <input className="w-8 h-8 border-1 border-black text-center flex items-center justify-center"/>
            </div>

            {/* 氏名・顧客種別 */}
            <div className="flex items-center gap-4 p-2">
              <label className="flex justify-center min-w-[100px] text-lg font-black bg-gray-300 py-0.5 px-10">氏名</label>
              <input className="w-60 h-8 border-1 border-black rounded-none" />
              <span className="flex justify-center min-w-[100px] text-lg font-black bg-gray-300 py-0.5 px-8">顧客種別</span>
              <RadioGroup orientation="horizontal" defaultValue="法人以外" className="flex gap-4">
                <Radio className="flex flex-row font-bold">法人以外</Radio>
                <Radio className="flex flex-row font-bold">法人</Radio>
              </RadioGroup>
              <span className="flex justify-center min-w-[100px] text-lg font-black bg-gray-300 py-0.5 px-8">氏名</span>
              <input className="w-60 h-8 border-1 border-black rounded-none" />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Section 2: キーアクションテスト & 入力制御テスト */}
      <h1>キーアクションテスト</h1>
      <div className="grid grid-cols-2 gap-6">
        {/* キーアクションテスト */}
        <Card className="border border-gray-400 bg-white shadow-md">
          <CardBody className="space-y-3">
            <div className="grid grid-cols-4 items-center gap-2 p-4">
              <label className="flex justify-center min-w-[100px] text-lg font-black bg-gray-300 py-0.5 px-3">Text1</label><input className="w-60 h-8 border-1 border-black rounded-none" /><span></span><span></span>
              <label className="flex justify-center min-w-[100px] text-lg font-black bg-gray-300 py-0.5 px-3">Text2</label><input className="w-60 h-8 border-1 border-black rounded-none" /><span></span><span></span>
              <label className="flex justify-center min-w-[100px] text-lg font-black bg-gray-300 py-0.5 px-3">Text3</label><input className="w-60 h-8 border-1 border-black rounded-none" /><span></span><span></span>
              <label className="flex justify-center min-w-[100px] text-lg font-black bg-gray-300 py-0.5 px-3">Radio1</label>
              <RadioGroup orientation="horizontal" className="col-span-3">
                <Radio className="flex flex-row font-bold">Item A</Radio>
                <Radio className="flex flex-row font-bold">Item B</Radio>
              </RadioGroup>
              <label className="flex justify-center min-w-[100px] text-lg font-black bg-gray-300 py-0.5 px-3">Text4</label><input className="w-36 h-8 border-1 border-black rounded-none" />
              <label className="flex justify-center min-w-[100px] text-lg font-black bg-gray-300 py-0.5 px-3">Text5</label><input className="w-36 h-8 border-1 border-black rounded-none" />
              <label className="flex justify-center min-w-[100px] text-lg font-black bg-gray-300 py-0.5 px-3">Code1</label>
              <div className="flex flex-row">
                <input className="w-10 h-8 border-1 border-black rounded-none" />
                <Select className="border-1 border-black ml-2 mr-6">
                  <SelectItem key="null">Null</SelectItem>
                </Select>
              </div>
              <label className="flex justify-center min-w-[100px] text-lg font-black bg-gray-300 py-0.5 px-3">Code2</label>
              <div className="flex flex-row">
                <input className="w-10 h-8 border-1 border-black rounded-none" />
                <Select className="border-1 border-black ml-2 mr-6">
                  <SelectItem key="null">Null</SelectItem>
                </Select>
              </div>
              <label className="flex justify-center min-w-[100px] text-lg font-black bg-gray-300 py-0.5 px-3">Text6</label><input className="w-60 h-8 border-1 border-black rounded-none" /><span></span><span></span>
              <label className="flex justify-center min-w-[100px] text-lg font-black bg-gray-300 py-0.5 px-3">Check Box</label>
              <div className="col-span-3 flex gap-2 flex-row">
                {["sun", "mon", "tue", "wed", "thu", "fri"].map(day => (
                  <Checkbox key={day} className="flex flex-row text-lg"><p className="ml-1">{day}</p></Checkbox>
                ))}
              </div>
              <label className="flex justify-center min-w-[100px] text-lg font-black bg-gray-300 py-0.5 px-3">Radio2</label>
              <RadioGroup orientation="horizontal" className="col-span-3">
                {"ABCD".split("").map(v => (
                  <Radio key={v} value={v} className="flex flex-row text-lg"><p className="ml-1">Item {v}</p></Radio>
                ))}
              </RadioGroup>
              <label className="flex justify-center min-w-[100px] text-lg font-black bg-gray-300 py-0.5 px-3">TextArea</label><span></span><span></span><span></span>
              <Textarea className="col-span-3 border-1 border-black" minRows={3} radius="none" />
            </div>
          </CardBody>
        </Card>

        {/* 入力制御テスト */}
        <Card className="border border-gray-400 bg-white shadow-md">
          <CardBody className="space-y-3">
            <h2 className="text-md font-bold bg-gray-200 px-4 py-2">入力制御テスト</h2>
            <div className="grid grid-cols-2 items-center gap-2 px-4">
              <label className="text-sm">全角 & 半角混合</label><Input size="sm" radius="none" />
              <label className="text-sm">半角カナ</label><Input size="sm" radius="none" />
              <label className="text-sm">半角数字</label><Input size="sm" radius="none" />
              <label className="text-sm">半角英数字</label><Input size="sm" radius="none" />
              <label className="text-sm">全角</label><Input size="sm" radius="none" />
            </div>
            <Divider />
            <div className="px-4 space-y-2">
              <p className="text-sm text-gray-600">
                *下記の文章を次のテキストボックスにコピペしてください。<br/>
                文頭にスペースが入っています<br/>
                末尾にタブが入っています
              </p>
              <Textarea minRows={3} radius="none" />
              <div className="flex items-center gap-2">
                <label className="text-sm">排除確認</label>
                <Input size="sm" className="flex-1" radius="none" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Optional Button for visual confirmation */}
      <div className="flex justify-end">
        <Button color="primary" className="rounded-none">確認</Button>
      </div>
    </div>
  );
}
