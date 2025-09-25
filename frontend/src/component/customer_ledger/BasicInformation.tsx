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

const borderClass = "border border-black";
const inputBaseClass = `${inputColor} ${borderClass} h-[30px]`;

const BasicInformation = () => {
  const renderField = (label: string) => {
    switch (label) {
      case "顧客種別":
        return (
          <Radio.Group >
            {customerTypeOption.map((opt, i) => (
              <Radio key={i} value={opt}>{opt}</Radio>
            ))}
          </Radio.Group>
        );

      case "取引種類":
        return (
          <Radio.Group >
            {transactionTypeOption.map((opt, i) => (
              <Radio key={i} value={opt}>{opt}</Radio>
            ))}
          </Radio.Group>
        );

      case "郵便番号":
        return (
          <div className="flex items-center gap-3 flex-1">
            <Input defaultValue="111" className={`${inputBaseClass} w-[80px]`} />
            <span>-</span>
            <Input defaultValue="9999" className={`${inputBaseClass} w-[100px]`} />
            <Button
              type="default"
              className="[&.ant-btn]:!bg-blue-600 [&.ant-btn]:!text-white 
                        hover:[&.ant-btn]:!bg-blue-700 
                        focus:[&.ant-btn]:!bg-white focus:[&.ant-btn]:!text-black px-2"
            >
              住所を検索する
            </Button>
          </div>
        );

      case "時間帯1":
      case "時間帯2":
        return (
          <div className="flex gap-3 w-4/5">
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
          <div className="flex gap-3 w-4/5">
            <Input className={`${inputBaseClass} w-[40px] text-center`} placeholder="0" />
            <Select defaultValue={0} className={`[&>.ant-select-selector]:!bg-[#ebcec0] w-1/4`}>
              {departmentOptions.map(opt => (
                <Option key={opt.value} value={opt.value}>{opt.label}</Option>
              ))}
            </Select>
          </div>
        );

      case "配送センターコード":
        return (
          <div className="flex gap-3 w-4/5">
            <Select defaultValue="0000" className={`[&>.ant-select-selector]:!bg-[#ebcec0] w-[200px]`}>
              {deliveryCenterOptions.map(opt => (
                <Option key={opt.value} value={opt.value}>{opt.label}</Option>
              ))}
            </Select>
            <div>配送センター01番</div>
            <Input className={`${inputBaseClass} w-3/5 max-w-[220px] ml-[50px]`} />
          </div>
        );

      case "保安機関コード":
        return (
          <div className="flex gap-3 w-4/5 pl-7">
            <Select defaultValue="0000" className={`[&>.ant-select-selector]:!bg-[#ebcec0] w-[200px]`}>
              {securityAgencyOptions.map(opt => (
                <Option key={opt.value} value={opt.value}>{opt.label}</Option>
              ))}
            </Select>
            <div>保安機関01番</div>
            <Input className={`${inputBaseClass} w-3/5 max-w-[220px] ml-[80px]`} />
          </div>
        );

      case "集中監視コード":
        return (
          <div className="flex gap-3 w-4/5 pl-7">
            <Select defaultValue="000" className={`[&>.ant-select-selector]:!bg-[#ebcec0] w-[200px]`}>
              {monitoringOptions.map(opt => (
                <Option key={opt.value} value={opt.value}>{opt.label}</Option>
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
    <div>
      <div className="font-bold bg-[#80bad7] w-full p-1 border border-black mb-2">
        基本情報
      </div>

      <div className="grid grid-cols-2 grid-flow-row">
        {labels.map((label, i) => {
          const labelClass = `${labelColor} border border-black px-2 flex items-center justify-center font-bold h-[30px] ${
            label === "配送センターコード" ? "w-[150px]" : "w-[120px]"
          }`;

          return (
            <div
              key={i}
              className={`flex p-1 gap-3 ${labelGroups.includes(label) ? "col-span-2" : ""}`}
            >
              <label className={labelClass}>{label}</label>
              {renderField(label)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BasicInformation;
