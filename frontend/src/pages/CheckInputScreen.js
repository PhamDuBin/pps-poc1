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
  const className_label =
    "flex justify-center min-w-[100px] text-base font-black bg-gray-300 py-0.5 px-3 whitespace-nowrap";

  const className_input_customer =
    "w-8 h-8 border-2 border-gray-300 rounded-lg shadow-md p-2 focus:border-gray-300 focus:shadow-lg focus:outline-none transition-all";

  const className_input_text =
    "h-8 border-2 border-gray-300 rounded-lg shadow-md p-2 focus:border-gray-300 focus:shadow-lg focus:outline-none transition-all";
  return (
    <div className="p-6 bg-[#f0f0f0] min-h-screen">
      <h1>テストフィールド1</h1>
      <Card className="border border-gray-400 bg-white shadow-md">
        <CardBody className="space-y-4">
          <div className="px-4 space-y-4">
            {/* 顧客コード */}
            <div className="flex items-center gap-2 p-2">
              <label className={`${className_label}`}>顧客コード</label>
              <input className={`${className_input_customer}`} />
              <input className={`${className_input_customer}`} />
              <input className={`${className_input_customer}`} />
              <input className={`${className_input_customer}`} />
            </div>

            {/* 氏名・顧客種別 */}
            <div className="flex items-center gap-4 p-2">
              <label className="flex justify-center min-w-[100px] text-base font-black bg-gray-300 py-0.5 px-10">
                氏名
              </label>
              <input className="w-60 h-8 border-2 border-gray-300 rounded-lg shadow-md p-2 focus:border-gray-300 focus:shadow-lg focus:outline-none transition-all" />
              <span className="flex justify-center min-w-[100px] text-base font-black bg-gray-300 py-0.5 px-8">
                顧客種別
              </span>
              <RadioGroup
                orientation="horizontal"
                defaultValue="法人以外"
                className="flex gap-4"
              >
                <Radio className="flex flex-row font-bold">
                  <p className="ml-4">法人以外</p>
                </Radio>
                <Radio className="flex flex-row font-bold">
                  <p className="ml-4">法人</p>
                </Radio>
              </RadioGroup>
              <span className="flex justify-center min-w-[100px] text-base font-black bg-gray-300 py-0.5 px-8">
                氏名
              </span>
              <input className="w-60 h-8 border-2 border-gray-300 rounded-lg shadow-md p-2 focus:border-gray-300 focus:shadow-lg focus:outline-none transition-all" />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Section 2: キーアクションテスト & 入力制御テスト */}
      <div className="grid grid-cols-2 gap-6">
        <h1>キーアクションテスト</h1>
        <h1>入力制御テスト</h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* キーアクションテスト */}
        <Card className="border border-gray-400 bg-white shadow-md">
          <CardBody className="space-y-3 w-full">
            <div className="grid grid-cols-4 items-center gap-2 p-4">
              <label className={`${className_label}`}>Text1</label>
              <input className={`col-span-2 ${className_input_text}`} />
              <span></span>
              <label className={`${className_label}`}>Text2</label>
              <input className={`col-span-2 ${className_input_text}`} />
              <span></span>
              <label className={`${className_label}`}>Text3</label>
              <input className={`col-span-2 ${className_input_text}`} />
              <span></span>
              <label className={`${className_label}`}>Radio1</label>
              <RadioGroup orientation="horizontal" className="col-span-1">
                <Radio className="flex flex-row font-bold">
                  <p className="ml-4">Item A</p>
                </Radio>
                <Radio className="flex flex-row font-bold">
                  <p className="ml-4">Item B</p>
                </Radio>
              </RadioGroup>
              <span></span>
              <span></span>
              <label className={`${className_label}`}>Text4</label>
              <input className={`col-span-1 ${className_input_text}`} />
              <label className={`${className_label}`}>Text5</label>
              <input className={`col-span-1 ${className_input_text}`} />
              <label className={`${className_label}`}>Code1</label>
              <div className="flex flex-row">
                <input className={`w-8 ${className_input_text}`} />
                <Select className="border-2 border-gray-300 rounded-lg shadow-md p-2 focus:border-gray-300 focus:shadow-lg focus:outline-none transition-all ml-2 mr-6 h-8">
                  <SelectItem key="null">Null</SelectItem>
                </Select>
              </div>
              <label className={`${className_label}`}>Code2</label>
              <div className="flex flex-row">
                <input className={`w-8 ${className_input_text}`} />
                <Select className="border-2 border-gray-300 rounded-lg shadow-md p-2 focus:border-gray-300 focus:shadow-lg focus:outline-none transition-all ml-2 h-8 mr-6">
                  <SelectItem key="null">Null</SelectItem>
                </Select>
              </div>
              <label className={`${className_label}`}>Text6</label>
              <input className={`col-span-1 ${className_input_text}`} />
              <span></span>
              <span></span>
              <label className={`${className_label}`}>Check Box</label>
              <div className="col-span-3 flex gap-4 flex-row">
                {["sun", "mon", "tue", "wed", "thu", "fri"].map((day) => (
                  <label
                    key={day}
                    className="flex items-center gap-2 text-base "
                  >
                    <input
                      type="checkbox"
                      className="w-6 h-6 accent-blue-600 "
                    />
                    <span>{day}</span>
                  </label>
                ))}
              </div>
              <label className={`${className_label}`}>Radio2</label>
              <RadioGroup
                orientation="horizontal"
                className="col-span-3 flex gap-4"
              >
                {"ABCD".split("").map((v) => (
                  <Radio key={v} value={v} className="flex flex-row text-base">
                    <p className="ml-4">Item {v}</p>
                  </Radio>
                ))}
              </RadioGroup>

              <label className={`${className_label}`}>TextArea</label>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <Textarea
              className={`w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-gray-300 focus:shadow-lg focus:outline-none transition-all`}
              minRows={1}
              maxRows={3}
            />
          </CardBody>
        </Card>

        {/* 入力制御テスト */}
        <Card className="border border-gray-400 bg-white shadow-md">
          <CardBody className="space-y-3 mt-3">
            <div className="grid grid-cols-4 items-center gap-2 px-4">
              <label className={`${className_label}`}>全角＆半角混合</label>
              <input className={`col-span-2 ${className_input_text}`} />
              <span></span>
              <label className="flex justify-center min-w-[100px] text-base font-black bg-gray-300 whitespace-nowrap py-0.5 px-8">
                半角カナ
              </label>
              <input className={`col-span-2 ${className_input_text}`} />
              <span></span>
              <label className="flex justify-center min-w-[100px] text-base font-black bg-gray-300 whitespace-nowrap py-0.5 px-8">
                半角数字
              </label>
              <input className={`col-span-2 ${className_input_text}`} />
              <span></span>
              <label className="flex justify-center min-w-[100px] text-base font-black bg-gray-300 whitespace-nowrap py-0.5 px-8">
                半角英数字
              </label>
              <input className={`col-span-2 ${className_input_text}`} />
              <span></span>
              <label className="flex justify-center min-w-[100px] text-base font-black bg-gray-300 whitespace-nowrap py-0.5 px-8">
                全角
              </label>
              <input className={`col-span-2 ${className_input_text}`} />
              <span></span>
              <label className="flex justify-center min-w-[100px] text-base font-black bg-gray-300 whitespace-nowrap py-0.5 px-8">
                E/Tab排除
              </label>
              <span></span>
              <span></span>
              <span></span>
              <Textarea
                className={`col-span-4 border-2 border-gray-300 rounded-lg shadow-md focus:border-gray-300 focus:shadow-lg focus:outline-none transition-all`}
                minRows={3}
                maxRows={3}
              />
              <label className="flex justify-center min-w-[100px] text-base font-black bg-gray-300 whitespace-nowrap py-0.5 px-8">
                排除確認
              </label>
              <input className={`col-span-2 ${className_input_text}`} />
            </div>
            <Divider />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
