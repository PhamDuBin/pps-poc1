import React from "react";
import { Input, Select, Button, Radio } from "antd";
import { labelColor, inputColor } from "../../constants/colors";

const { Option } = Select;

const labels = [
  "氏名", "顧客種別", "カナ", "取引種類", "代表者名",
  "郵便番号", "住所", "番地", "住所名称", "電話番号1",
  "時間帯1", "電話番号2", "時間帯2", "電話番号3", "FAX",
  "地図番号", "メールアドレス", "管理部門", "検索キー1",
  "検索キー2", "配送センターコード", "保安機関コード",
  "集中監視コード", "案内", "備考1", "備考2", "備考3"
];

const labelGroups = [
  "代表者名","郵便番号","住所名称","管理部門",
  "配送センターコード","保安機関コード","集中監視コード",
  "案内","備考1","備考2","備考3"
];

const departmentOptions = [
  { value: 0, label: "空白" },
  { value: 1, label: "部門1" },
  { value: 2, label: "部門2" },
  { value: 3, label: "部門3" }
];

const deliveryCenterOptions = [
  { value: "0000", label: "空白" },
  { value: "0001", label: "拠点名0001" },
  { value: "0002", label: "拠点名0002" },
  { value: "0003", label: "拠点名0003" },
  { value: "0004", label: "拠点名0004" }
];

const securityAgencyOptions = [
  { value: "0000", label: "空白" },
  { value: "0001", label: "保安機関0001" },
  { value: "0002", label: "保安機関0002" },
  { value: "0003", label: "保安機関0003" },
  { value: "0004", label: "保安機関0005" }
];

const monitoringOptions = [
  { value: "000", label: "空白" },
  { value: "001", label: "集中監視0001" },
  { value: "002", label: "集中監視002" },
  { value: "003", label: "集中監視003" }
];

const customerTypeOption = ["法人以外", "法人"];
const transactionTypeOption = ["ガス顧客", "ガス外顧客"];

const inputBaseClass = `${inputColor} border border-black h-6`;

const BasicInformation = () => {
  const labelClass =
    "w-32 mr-2 h-6 border-gray-300 rounded-md bg-[#D9D9D9] font-bold flex text-center justify-center items-center";

  const renderField = (label: string) => {
    switch (label) {
      case "顧客種別":
        return (
          <Radio.Group size="small">
            {customerTypeOption.map((opt, i) => (
              <Radio key={i} value={opt}>
                {opt}
              </Radio>
            ))}
          </Radio.Group>
        );

      case "取引種類":
        return (
          <Radio.Group size="small">
            {transactionTypeOption.map((opt, i) => (
              <Radio key={i} value={opt}>
                {opt}
              </Radio>
            ))}
          </Radio.Group>
        );

      case "郵便番号":
        return (
          <div className="flex items-center gap-2 flex-1">
            <Input defaultValue="111" className={`${inputBaseClass} w-[80px]`} />
            <span>-</span>
            <Input defaultValue="9999" className={`${inputBaseClass} w-[100px]`} />
            <Button
              type="default"
              className="!bg-blue-600 !text-white hover:!bg-white hover:!text-black px-2 h-6 w-32"
            >
              住所を検索する
            </Button>
          </div>
        );

      case "時間帯1":
      case "時間帯2":
        return (
          <div className="flex gap-2 w-4/5">
            <Input placeholder="0" className={`${inputBaseClass} w-[40px] text-center`} />
            <select defaultValue="空白" className={`${inputBaseClass} px-2 rounded`}>
              <option value="空白">空白</option>
              <option value="随時">随時</option>
              <option value="昼間">昼間</option>
              <option value="夜間">夜間</option>
            </select>
          </div>
        );

      case "管理部門":
        return (
          <div className="flex gap-2 w-4/5">
            <Input className={`${inputBaseClass} w-[40px] text-center`} placeholder="0" />
            <Select
              defaultValue={0}
              className="[&>.ant-select-selector]:!bg-[#ebcec0] w-1/4 h-6"
              size="small"
            >
              {departmentOptions.map(opt => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </div>
        );

      case "配送センターコード":
        return (
          <div className="flex gap-2 w-4/5 items-center">
            <Select
              defaultValue="0000"
              className="[&>.ant-select-selector]:!bg-[#ebcec0] w-[200px] h-6"
              size="small"
            >
              {deliveryCenterOptions.map(opt => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
            <div>配送センター01番</div>
            <Input className={`${inputBaseClass} w-3/5 max-w-[220px] ml-[56px]`} />
          </div>
        );

      case "保安機関コード":
        return (
          <div className="flex gap-2 w-4/5 items-center">
            <Select
              defaultValue="0000"
              className="[&>.ant-select-selector]:!bg-[#ebcec0] w-[200px] h-6"
              size="small"
            >
              {securityAgencyOptions.map(opt => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
            <div>保安機関01番</div>
            <Input className={`${inputBaseClass} w-3/5 max-w-[220px] ml-[80px]`} />
          </div>
        );

      case "集中監視コード":
        return (
          <div className="flex gap-2 w-4/5 items-center">
            <Select
              defaultValue="000"
              className="[&>.ant-select-selector]:!bg-[#ebcec0] w-[200px] h-6 "
              size="small"
            >
              {monitoringOptions.map(opt => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
            <div>集中監視01番</div>
            <Input className={`${inputBaseClass} w-3/5 max-w-[220px] ml-[80px]`} />
          </div>
        );

      case "案内":
        return <Input className={`${inputBaseClass} w-1/5`} />;

      case "備考1":
      case "備考2":
      case "備考3":
        return <Input className={`${inputBaseClass} flex-1 max-w-[650px]`} />;

      default:
        return <Input className={`${inputBaseClass} flex-1`} />;
    }
  };

  return (
    <div className="w-full text-xs py-4">
      {/* Header */}
      <div className="h-8 border text-sm border-gray-300 rounded-md bg-[#D9D9D9] font-bold flex items-center px-3">
        基本情報
      </div>

      {/* Form */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 p-3">
        {labels.map((label, i) => (
          <div
            key={i}
            className={`flex items-center ${labelGroups.includes(label) ? "col-span-2" : ""}`}
          >
            <label className={labelClass}>{label}</label>
            {renderField(label)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasicInformation;
