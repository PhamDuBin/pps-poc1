import { Button, DatePicker, Select, Input } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import FamilyInfoModal from "./FamilyInfoModal";
const OtherInfo = () => {
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
    <div className="w-full text-xs py-4">
      {/* Header */}
      <div className="h-8 border text-sm border-gray-300 rounded-md bg-[#D9D9D9] font-bold flex items-center px-3">
        その他情報
      </div>

      {/* Form phía trên */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 p-3">
        {/* Cột trái */}
        <div className="flex items-center">
          <Button className={`${label} shadow-md shadow-zinc-500`}>
            顧客工務店
          </Button>
          <Input className=" h-6 w-32" defaultValue={"0000"}></Input>
          <Button className="ml-2 h-6 w-6">▼</Button>
        </div>
        <div className="flex items-center">
          <label className={label}>紹介者</label>
          <Input className=" h-6 w-32" defaultValue={""}></Input>
        </div>

        <div className="flex items-center">
          <Button className={`${label} shadow-md shadow-zinc-500`}>
            紹介元工務店
          </Button>
          <Input className=" h-6 w-32" defaultValue={"0000"}></Input>
          <Button className="ml-2 h-6 w-6">▼</Button>
        </div>
        <div className="flex items-center">
          <Button className={`${label} shadow-md shadow-zinc-500`}>
            前納入先
          </Button>
          <Input className=" h-6 w-32" defaultValue={"0000"}></Input>
          <Button className="ml-2 h-6 w-6">▼</Button>
        </div>
        <div className="flex items-center">
          <Button className={`${label} shadow-md shadow-zinc-500`}>
            オーナー
          </Button>
          <Input className=" h-6 w-32" defaultValue={"0000"}></Input>
          <Button className="ml-2 h-6 w-6">▼</Button>
        </div>
        <div className="flex items-center">
          <Button className={`${label} shadow-md shadow-zinc-500`}>
            管理会社
          </Button>
          <Input className=" h-6 w-32" defaultValue={"0000"}></Input>
          <Button className="ml-2 h-6 w-6">▼</Button>
        </div>
        <div className="flex items-center">
          <label className={label}>持家区分</label>
          <Input className=" h-6 w-32" defaultValue={"0"}></Input>
          <Button className="ml-2 h-6 w-6">▼</Button>
        </div>
        <div className="flex items-center">
          <label className={label}>部屋数</label>
          <Input className=" h-6 w-32" defaultValue={""}></Input>
        </div>
        <div className="flex items-center">
          <label className={label}>家族人数</label>
          <Input className=" h-6 w-32" defaultValue={""}></Input>
        </div>
        <div className="flex items-center">
          <label className={label}>距離</label>
          <Input className=" h-6 w-32" defaultValue={""}></Input>
          <p>Km</p>
        </div>
        <div className="flex items-center">
          <label className={label}>時間</label>
          <Input className=" h-6 w-32" defaultValue={""}></Input>
          <p>分</p>
        </div>
        <div className="flex items-center">
          <label className={label}>周知対象区分</label>
          <Select className="h-6 w-32" defaultValue="">
            <Select.Option value="">&nbsp;</Select.Option>
            <Select.Option value="1: 1 year">1: 1 year</Select.Option>
            <Select.Option value="2: 2 years">2: 2 years</Select.Option>
            <Select.Option value="3: 3 years">3: 3 years</Select.Option>
          </Select>
        </div>
        <div className="flex items-center">
          <label className={label}>財務補助コード</label>
          <Input className=" h-6 w-32" defaultValue={""}></Input>
        </div>
      </div>
    </div>
  );
};

export default OtherInfo;
