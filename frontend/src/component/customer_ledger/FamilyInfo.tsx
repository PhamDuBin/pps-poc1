import { Button, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import FamilyInfoModal from "./FamilyInfoModal";
const FamilyInfo = () => {
  const [month, setMonth] = useState(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const familyData = [
    {
      id: 1,
      relation: "父",
      name: "テスト氏名1",
      gender: "男性",
      dob: "1980/01/01",
      job: "会社員",
      health: "その他",
      hobby: "マリンスポーツ",
    },
    {
      id: 2,
      relation: "母",
      name: "テスト氏名2",
      gender: "女性",
      dob: "1982/05/10",
      job: "主婦",
      health: "良好",
      hobby: "読書",
    },
    {
      id: 3,
      relation: "長男",
      name: "テスト氏名3",
      gender: "男性",
      dob: "2010/11/20",
      job: "学生",
      health: "良好",
      hobby: "ゲーム",
    },
  ];

  const label =
    "w-32 mr-2 h-6 border-gray-300 rounded-md bg-[#D9D9D9] font-bold flex text-center justify-center items-center";
  return (
    <div className="w-full text-xs">
      {/* Header */}
      <div className="h-8 border text-sm border-gray-300 rounded-md bg-[#D9D9D9] font-bold flex items-center px-3">
        家族情報
      </div>

      {/* Form phía trên */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 p-3">
        {/* Cột trái */}
        <div className="flex items-center">
          <label className={label}>居住年月</label>
          <DatePicker
            picker="month"
            value={month}
            onChange={(date) => setMonth(date)}
            className={` h-6 w-32`}
            format="YYYY/MM"
          />
        </div>
        <div className="flex items-center">
          <label className={label}>共働き区分</label>
          <Select defaultValue={"0 空欄"} className=" h-6 w-32">
            <Select.Option value={"0 空欄"}>0 空欄</Select.Option>
            <Select.Option value={"1 共働き"}>1 共働き</Select.Option>
          </Select>
        </div>

        <div className="flex items-center">
          <label className={label}>住居タイプ</label>
          <Select defaultValue={"00:空白"} className=" h-6 w-32">
            <Select.Option value={"00:空白"}>00:空白</Select.Option>
            <Select.Option value={"01:戸建て"}>01:戸建て</Select.Option>
            <Select.Option value={"02:3LDK"}>02:3LDK</Select.Option>
            <Select.Option value={"03:3DK"}>03:3DK</Select.Option>
            <Select.Option value={"04:2LDK"}>04:2LDK</Select.Option>
            <Select.Option value={"05:2DK"}>05:2DK</Select.Option>
            <Select.Option value={"06:1ルーム"}>06:1ルーム</Select.Option>
            <Select.Option value={"20:その他"}>20:その他</Select.Option>
          </Select>
        </div>
        <div className="flex items-center">
          <label className={label}>取引関係</label>
          <Select defaultValue={"0:空欄"} className=" h-6 w-32">
            <Select.Option value={"0:空欄"}>0:空欄</Select.Option>
            <Select.Option value={"1:A"}>1:A</Select.Option>
            <Select.Option value={"2:B"}>2:B</Select.Option>
            <Select.Option value={"3:C"}>3:C</Select.Option>
            <Select.Option value={"4:D"}>4:D</Select.Option>
          </Select>
        </div>

        <div className="flex items-center">
          <label className={label}>信用状況</label>
          <Select defaultValue={"0:空欄"} className=" h-6 w-32">
            <Select.Option value={"0:空欄"}>0:空欄</Select.Option>
            <Select.Option value={"1:A"}>1:A</Select.Option>
            <Select.Option value={"2:B"}>2:B</Select.Option>
            <Select.Option value={"3:C"}>3:C</Select.Option>
            <Select.Option value={"4:D"}>4:D</Select.Option>
          </Select>
        </div>
        <div className="flex items-center">
          <label className={label}>購買力</label>
          <Select defaultValue={"0:空欄"} className=" h-6 w-32">
            <Select.Option value={"0:空欄"}>0:空欄</Select.Option>
            <Select.Option value={"1:A"}>1:A</Select.Option>
            <Select.Option value={"2:B"}>2:B</Select.Option>
            <Select.Option value={"3:C"}>3:C</Select.Option>
            <Select.Option value={"4:D"}>4:D</Select.Option>
          </Select>
        </div>

        <div className="flex items-center">
          <label className={label}>生活行動</label>
          <Select defaultValue={"0:空欄"} className=" h-6 w-32">
            <Select.Option value={"0:空欄"}>0:空欄</Select.Option>
            <Select.Option value={"1:A"}>1:A</Select.Option>
            <Select.Option value={"2:B"}>2:B</Select.Option>
            <Select.Option value={"3:C"}>3:C</Select.Option>
            <Select.Option value={"4:D"}>4:D</Select.Option>
          </Select>
        </div>
        <div className="flex items-center">
          <label className={label}>総合ランク</label>
          <Select defaultValue={"0:空欄"} className=" h-6 w-32">
            <Select.Option value={"0:空欄"}>0:空欄</Select.Option>
            <Select.Option value={"1:A"}>1:A</Select.Option>
            <Select.Option value={"2:B"}>2:B</Select.Option>
            <Select.Option value={"3:C"}>3:C</Select.Option>
            <Select.Option value={"4:D"}>4:D</Select.Option>
          </Select>
        </div>

        <div className="flex items-center col-span-2">
          <label className={label}>自由記述要素</label>
          <Select defaultValue={"0:空欄"} className=" h-6 w-32">
            <Select.Option value={"0:空欄"}>0:空欄</Select.Option>
            <Select.Option value={"1:null"}>1:null</Select.Option>
            <Select.Option value={"2:null"}>2:null</Select.Option>
            <Select.Option value={"3:null"}>3:null</Select.Option>
            <Select.Option value={"4:null"}>4:null</Select.Option>
            <Select.Option value={"5:null"}>5:null</Select.Option>
            <Select.Option value={"6:null"}>6:null</Select.Option>
            <Select.Option value={"7:null"}>7:null</Select.Option>
            <Select.Option value={"8:null"}>8:null</Select.Option>
            <Select.Option value={"9:null"}>9:null</Select.Option>
          </Select>
        </div>
      </div>

      {/* Button thêm */}
      <div className="px-3 pb-2">
        <Button
          onClick={handleOpenModal}
          className="text-xs shadow-md shadow-zinc-600 px-3 py-1"
        >
          家族情報追加
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto px-3 pb-3">
        <table className="w-full border border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              {[
                "関係",
                "家族氏名",
                "性別",
                "生年月日",
                "職業",
                "健康関連",
                "趣味",
              ].map((h) => (
                <th key={h} className="border border-gray-400 px-2 py-1">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {familyData.map((row) => (
              <tr
                key={row.id}
                tabIndex={0}
                className="cursor-pointer hover:bg-gray-100 focus:bg-blue-200 focus:outline-none"
                onDoubleClick={handleOpenModal}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleOpenModal();
                  }
                }}
              >
                <td className="border border-gray-400 px-2">{row.relation}</td>
                <td className="border border-gray-400 px-2">{row.name}</td>
                <td className="border border-gray-400 px-2">{row.gender}</td>
                <td className="border border-gray-400 px-2">{row.dob}</td>
                <td className="border border-gray-400 px-2">{row.job}</td>
                <td className="border border-gray-400 px-2">{row.health}</td>
                <td className="border border-gray-400 px-2">{row.hobby}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && <FamilyInfoModal onClose={handleOpenModal} />}
    </div>
  );
};

export default FamilyInfo;
