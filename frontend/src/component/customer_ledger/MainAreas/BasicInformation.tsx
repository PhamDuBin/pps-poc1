import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Input, Select, Button, Radio } from "antd";
import { labelColor, inputColor } from "../../../constants/colors";
import { blockTab } from "../../../utils/InputHandlers";

const { Option } = Select;

const labels = [
  "氏名",
  "顧客種別",
  "カナ",
  "取引種類",
  "代表者名",
  "郵便番号",
  "住所",
  "番地",
  "住所名称",
  "電話番号1",
  "時間帯1",
  "電話番号2",
  "時間帯2",
  "電話番号3",
  "FAX",
  "地図番号",
  "メールアドレス",
  "管理部門",
  "検索キー1",
  "検索キー2",
  "配送センターコード",
  "保安機関コード",
  "集中監視コード",
  "案内",
  "備考1",
  "備考2",
  "備考3",
];

const labelGroups = [
  "代表者名",
  "郵便番号",
  "住所名称",
  "管理部門",
  "配送センターコード",
  "保安機関コード",
  "集中監視コード",
  "案内",
  "備考1",
  "備考2",
  "備考3",
];

const timeSlotOptions = [
  { value: "0", label: "0:空白" },
  { value: "1", label: "1:随時" },
  { value: "2", label: "2:昼間" },
  { value: "3", label: "3:夜間" },
];

const departmentOptions = [
  { value: 0, label: "0:空白" },
  { value: 1, label: "1:部門1" },
  { value: 2, label: "2:部門2" },
  { value: 3, label: "3:部門3" },
];

const deliveryCenterOptions = [
  { value: "0", label: "空白" },
  { value: "1", label: "拠点名0001" },
  { value: "2", label: "拠点名0002" },
  { value: "3", label: "拠点名0003" },
  { value: "4", label: "拠点名0004" },
];

const securityAgencyOptions = [
  { value: "0", label: "空白" },
  { value: "1", label: "保安機関0001" },
  { value: "2", label: "保安機関0002" },
  { value: "3", label: "保安機関0003" },
  { value: "4", label: "保安機関0005" },
];

const monitoringOptions = [
  { value: "0", label: "空白" },
  { value: "1", label: "集中監視0001" },
  { value: "2", label: "集中監視002" },
  { value: "3", label: "集中監視003" },
];

const defaultInputValues: { [key: string]: string } = {
  氏名: "テストさん太郎",
  カナ: "ﾃｽﾄｻﾝﾀﾛｳ",
  代表者名: "代表者テスト",
  住所: "仮住所挿入データ◯◯◯◯県◯◯◯市◯◯",
  番地: "1-2-3",
  住所名称: "◯◯ハイツ文京区",
  部屋番号: "203",
  電話番号1: "050-1234-9999",
  電話番号2: "090-1234-5555",
  メールアドレス: "sample_user@gmail.com",
  検索キー1: "A0001BBB",
  検索キー2: "Testkey001",
  案内: "電話番号2を通常で使う",
  備考1: "電話番号2を通常で使う",
};

const customerTypeOption = ["法人以外", "法人"];
const transactionTypeOption = ["ガス顧客", "ガス外顧客"];

const inputBaseClass = `${inputColor} border border-black h-6`;

const BasicInformation = forwardRef<any>((props, ref) => {
  const firstInputRef = useRef<any>(null);
  const [formValues, setFormValues] = useState({
    time1: "0",
    time2: "0",
    departmentCode: "0",
    deliveryCenterCode: "0",
    securityAgencyCode: "0",
    monitoringCode: "0",
  });
  const handleValueChange = (fieldName: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };
  const [openSelect, setOpenSelect] = useState<string | null>(null);
  const labelClass = `w-32 mr-2 h-6 border-gray-300 rounded-md font-bold flex text-center justify-center items-center  ${labelColor}`;

  const renderField = (label: string) => {
    switch (label) {
      case "顧客種別":
        return (
          <Radio.Group defaultValue={"法人以外"} size="small">
            {customerTypeOption.map((opt, i) => (
              <Radio key={i} value={opt}>
                {opt}
              </Radio>
            ))}
          </Radio.Group>
        );

      case "取引種類":
        return (
          <Radio.Group defaultValue={"ガス顧客"} size="small">
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
            <Input
              defaultValue="111"
              className={`${inputBaseClass} w-[80px]`}
            />
            <span>-</span>
            <Input
              defaultValue="9999"
              className={`${inputBaseClass} w-[100px]`}
            />
            <Button
              type="default"
              className="!bg-blue-600 !text-white hover:!bg-white hover:!text-blue-600 px-2 h-6 w-32"
            >
              住所を検索する
            </Button>
          </div>
        );

      case "時間帯1":
      case "時間帯2": {
        const fieldName = label === "時間帯1" ? "time1" : "time2";
        const selectId = label === "時間帯1" ? "time1Select" : "time2Select";

        return (
          <div className="flex gap-2 w-4/5">
            <Input
              className={`${inputBaseClass} w-[40px] text-center`}
              value={formValues[fieldName as keyof typeof formValues]}
              onChange={(e) => handleValueChange(fieldName, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "F4") {
                  e.preventDefault();
                  setOpenSelect(selectId);
                }
              }}
            />
            <Select
              value={formValues[fieldName as keyof typeof formValues]}
              onChange={(value) => handleValueChange(fieldName, value)}
              className="[&>.ant-select-selector]:!bg-[#ebcec0] w-[200px] h-6"
              size="small"
              open={openSelect === selectId}
              onDropdownVisibleChange={(isOpen) =>
                setOpenSelect(isOpen ? selectId : null)
              }
            >
              {/* Lặp qua mảng options */}
              {timeSlotOptions.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </div>
        );
      }

      case "管理部門":
        return (
          <div className="flex gap-2 w-4/5">
            <Input
              className={`${inputBaseClass} w-[40px] text-center`}
              placeholder="0"
              value={formValues.departmentCode}
              onChange={(e) =>
                handleValueChange("departmentCode", e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "F4") {
                  e.preventDefault();
                  setOpenSelect("departmentCode");
                }
              }}
            />
            <Select
              value={formValues.departmentCode.toString()}
              onChange={(value) =>
                handleValueChange("departmentCode", value.toString())
              }
              className="[&>.ant-select-selector]:!bg-[#ebcec0] w-1/4 h-6"
              size="small"
              open={openSelect === "departmentCode"}
              onDropdownVisibleChange={(isOpen) =>
                setOpenSelect(isOpen ? "departmentCode" : null)
              }
            >
              {departmentOptions.map((opt) => (
                <Option key={opt.value} value={String(opt.value)}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </div>
        );
      case "配送センターコード":
        return (
          <div className="flex gap-2 w-4/5 items-center">
            <Input
              className={`${inputBaseClass} w-[40px] text-center`}
              value={formValues.deliveryCenterCode}
              onChange={(e) =>
                handleValueChange("deliveryCenterCode", e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "F4") {
                  e.preventDefault();
                  setOpenSelect("deliveryCenterCode");
                }
              }}
            />
            <Select
              value={formValues.deliveryCenterCode}
              onChange={(value) =>
                handleValueChange("deliveryCenterCode", value)
              }
              className="[&>.ant-select-selector]:!bg-[#ebcec0] w-[200px] h-6"
              size="small"
              open={openSelect === "deliveryCenterCode"}
              onDropdownVisibleChange={(isOpen) =>
                setOpenSelect(isOpen ? "deliveryCenterCode" : null)
              }
            >
              {deliveryCenterOptions.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
            <div>配送センター01番</div>
            <Input
              defaultValue={"9352716"}
              className={`${inputBaseClass} w-3/5 max-w-[220px] ml-[56px]`}
            />
          </div>
        );

      case "保安機関コード":
        return (
          <div className="flex gap-2 w-4/5 items-center">
            <Input
              className={`${inputBaseClass} w-[40px] text-center`}
              value={formValues.securityAgencyCode}
              onChange={(e) =>
                handleValueChange("securityAgencyCode", e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "F4") {
                  e.preventDefault();
                  setOpenSelect("securityAgencyCode");
                }
              }}
            />
            <Select
              value={formValues.securityAgencyCode}
              onChange={(value) =>
                handleValueChange("securityAgencyCode", value)
              }
              className="[&>.ant-select-selector]:!bg-[#ebcec0] w-[200px] h-6"
              size="small"
              open={openSelect === "securityAgencyCode"}
              onDropdownVisibleChange={(isOpen) =>
                setOpenSelect(isOpen ? "securityAgencyCode" : null)
              }
            >
              {securityAgencyOptions.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
            <div>保安機関01番</div>
            <Input
              defaultValue={"TA90"}
              className={`${inputBaseClass} w-3/5 max-w-[220px] ml-[80px]`}
            />
          </div>
        );

      case "集中監視コード":
        return (
          <div className="flex gap-2 w-4/5 items-center">
            <Input
              className={`${inputBaseClass} w-[40px] text-center`}
              value={formValues.monitoringCode}
              onChange={(e) =>
                handleValueChange("monitoringCode", e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "F4") {
                  e.preventDefault();
                  setOpenSelect("monitoringCode");
                }
              }}
            />
            <Select
              value={formValues.monitoringCode}
              onChange={(value) => handleValueChange("monitoringCode", value)}
              className="[&>.ant-select-selector]:!bg-[#ebcec0] w-[200px] h-6 "
              size="small"
              open={openSelect === "monitoringCode"}
              onDropdownVisibleChange={(isOpen) =>
                setOpenSelect(isOpen ? "monitoringCode" : null)
              }
            >
              {monitoringOptions.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
            <div>集中監視01番</div>
            <Input
              defaultValue={"00503"}
              className={`${inputBaseClass} w-3/5 max-w-[220px] ml-[80px]`}
            />
          </div>
        );

      case "案内":
        return <Input className={`${inputBaseClass} w-1/5`} />;

      case "備考1":
      case "備考2":
      case "備考3":
        return <Input className={`${inputBaseClass} flex-1 max-w-[650px]`} />;

      default:
        return (
          <Input
            ref={label === "氏名" ? firstInputRef : null}
            className={`${inputBaseClass} flex-1`}
            defaultValue={defaultInputValues[label] || ""}
          />
        );
    }
  };
  useImperativeHandle(ref, () => ({
    focusFirstButton: () => {
      firstInputRef.current?.focus();
    },
  }));

  return (
    <div onKeyDown={blockTab} className="w-full text-xs py-4">
      {/* Header */}
      <div
        className={`h-8 border text-sm border-gray-300 rounded-md font-bold flex items-center px-3 ${labelColor}`}
      >
        基本情報
      </div>

      {/* Form */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 p-3">
        {labels.map((label, i) => (
          <div
            key={i}
            className={`flex items-center ${
              labelGroups.includes(label) ? "col-span-2" : ""
            }`}
          >
            <label className={labelClass}>{label}</label>
            {renderField(label)}
          </div>
        ))}
      </div>
    </div>
  );
});

export default BasicInformation;
