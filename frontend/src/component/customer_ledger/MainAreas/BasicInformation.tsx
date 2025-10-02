import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Input, Button, Radio } from "antd";
import { labelColor, inputColor, hoverInputColor, focusInputColor } from "../../../constants/colors";
import { blockTab } from "../../../utils/InputHandlers";
import CodeInputSelect from "../../CodeInputSelect";
import KanaInput from "../../KanaInput";
import { convertToFullWidth } from "../../../utils/InputHandlers";

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
  { code: "0", label: "0:空白" },
  { code: "1", label: "1:随時" },
  { code: "2", label: "2:昼間" },
  { code: "3", label: "3:夜間" },
];

const departmentOptions = [
  { code: "0", label: "0:空白" },
  { code: "1", label: "1:部門1" },
  { code: "2", label: "2:部門2" },
  { code: "3", label: "3:部門3" },
];

const deliveryCenterOptions = [
  { code: "0", label: "空白" },
  { code: "1", label: "拠点名0001" },
  { code: "2", label: "拠点名0002" },
  { code: "3", label: "拠点名0003" },
  { code: "4", label: "拠点名0004" },
];

const securityAgencyOptions = [
  { code: "0", label: "空白" },
  { code: "1", label: "保安機関0001" },
  { code: "2", label: "保安機関0002" },
  { code: "3", label: "保安機関0003" },
  { code: "4", label: "保安機関0005" },
];

const monitoringOptions = [
  { code: "0", label: "空白" },
  { code: "1", label: "集中監視0001" },
  { code: "2", label: "集中監視002" },
  { code: "3", label: "集中監視003" },
];

const defaultInputValues: { [key: string]: string } = {
  氏名: "テストさん太郎",
  カナ: "ﾃｽﾄｻﾝﾀﾛｳ",
  代表者名: "代表者テスト",
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
  備考2: "電話番号2を通常で使う",
  備考3: "電話番号2を通常で使う",
};

const initialEmptyValues = {
  time1: "0",
  time2: "0",
  departmentCode: "0",
  deliveryCenterCode: "0",
  securityAgencyCode: "0",
  monitoringCode: "0",
  postalCode1: "",
  postalCode2: "",
  address: "",
  氏名: "",
  カナ: "",
  代表者名: "",
  番地: "",
  住所名称: "",
  電話番号1: "",
  電話番号2: "",
  電話番号3: "",
  FAX: "",
  地図番号: "",
  メールアドレス: "",
  検索キー1: "",
  検索キー2: "",
  案内: "",
  備考1: "",
  備考2: "",
  備考3: "",
  customerType: "法人以外",
  transactionType: "ガス顧客",
  deliveryCenterName: "9352716",
  securityAgencyName: "TA90",
  monitoringName: "00503",
};

const customerTypeOption = ["法人以外", "法人"];
const transactionTypeOption = ["ガス顧客", "ガス外顧客"];

const inputBaseClass = `${hoverInputColor} ${focusInputColor} focus:!bg-[#ebcec0] border border-black h-6`;

const BasicInformation = forwardRef<any, { showData: boolean }>(
  (props, ref) => {
    const firstInputRef = useRef<any>(null);
    const [formValues, setFormValues] = useState(initialEmptyValues);
    const handleValueChange = (fieldName: string, value: string) => {
      setFormValues((prev) => ({ ...prev, [fieldName]: value }));
    };
    const { showData } = props;
    const isFormDisabled = !showData;

    useEffect(() => {
      if (showData) {
        const convertedDefaults: { [key: string]: string } = {};

        for (const key in defaultInputValues) {
          if (Object.prototype.hasOwnProperty.call(defaultInputValues, key)) {
            convertedDefaults[key] = convertToFullWidth(
              defaultInputValues[key]
            );
          }
        }
        setFormValues((prev) => ({
          ...prev,
          ...convertedDefaults,
          postalCode1: "111",
          postalCode2: "9999",
        }));
      } else {
        setFormValues(initialEmptyValues);
      }
    }, [showData]);

    const handleSearchAddress = () => {
      const { postalCode1, postalCode2 } = formValues;
      if (postalCode1 && postalCode2) {
        const fakeAddress = `仮住所挿入データ◯◯◯◯県◯◯◯市◯◯`;
        handleValueChange("address", fakeAddress);
      }
    };
    const labelClass = `w-32 mr-2 h-6 border-gray-300 rounded-md font-bold flex text-center justify-center items-center  ${labelColor}`;

    const renderField = (label: string) => {
      switch (label) {
        case "顧客種別":
          return (
            <Radio.Group
              value={formValues.customerType}
              onChange={(e) =>
                handleValueChange("customerType", e.target.value)
              }
              size="small"
              disabled={isFormDisabled}
            >
              {customerTypeOption.map((opt, i) => (
                <Radio key={i} value={opt}>
                  {opt}
                </Radio>
              ))}
            </Radio.Group>
          );

        case "住所":
          return (
            <KanaInput
              className={`${inputBaseClass} w-3/5`}
              value={formValues.address}
              onChange={(newValue) => handleValueChange("address", newValue)}
              disabled={isFormDisabled}
            />
          );

        case "取引種類":
          return (
            <Radio.Group
              value={formValues.transactionType}
              onChange={(e) =>
                handleValueChange("transactionType", e.target.value)
              }
              size="small"
              disabled={isFormDisabled}
            >
              {transactionTypeOption.map((opt, i) => (
                <Radio key={i} value={opt}>
                  {opt}
                </Radio>
              ))}
            </Radio.Group>
          );

        case "郵便番号":
          return (
            <div className="flex items-center gap-2 w-1/3 pr-10">
              <Input
                value={formValues.postalCode1}
                onChange={(e) =>
                  handleValueChange("postalCode1", e.target.value)
                }
                disabled={isFormDisabled}
                className={`${inputBaseClass} w-[60px]`}
              />
              <span>-</span>
              <Input
                value={formValues.postalCode2}
                onChange={(e) =>
                  handleValueChange("postalCode2", e.target.value)
                }
                disabled={isFormDisabled}
                className={`${inputBaseClass} w-[72px]`}
              />
              <Button
                type="default"
                className="!bg-blue-600 !text-white hover:!bg-white hover:!text-blue-600 px-2 h-6 w-[55%]"
                onClick={handleSearchAddress}
                disabled={isFormDisabled}
              >
                住所を検索する
              </Button>
            </div>
          );

        case "時間帯1":
        case "時間帯2":
          const fieldName = label === "時間帯1" ? "time1" : "time2";

          return (
            <div className="flex gap-2 flex-1">
              <CodeInputSelect
                options={timeSlotOptions}
                value={formValues[fieldName as keyof typeof formValues]}
                onChange={(value) => handleValueChange(fieldName, value)}
                disabled={isFormDisabled}
              />
            </div>
          );

        case "管理部門":
          return (
            <div className="flex gap-2 w-[35%]">
              <CodeInputSelect
                options={departmentOptions}
                value={formValues.departmentCode}
                onChange={(value) => handleValueChange("departmentCode", value)}
                disabled={isFormDisabled}
              />
            </div>
          );
        case "配送センターコード":
          return (
            <div className="flex items-center w-4/5">
              <div className="w-[44%]">
                <CodeInputSelect
                  options={deliveryCenterOptions}
                  value={formValues.deliveryCenterCode}
                  onChange={(value) =>
                    handleValueChange("deliveryCenterCode", value)
                  }
                  disabled={isFormDisabled}
                />
              </div>
              
              {showData && <div className="flex w-[13%] justify-start">センター01番</div>}

              <KanaInput
                className={`${inputBaseClass} w-[40%]`}
                value={"9352716"}
                onChange={(newValue) =>
                  handleValueChange("deliveryCenterCode", newValue)
                }
                disabled={isFormDisabled}
              />
            </div>
          );

        case "保安機関コード":
          return (
            <div className="flex w-4/5 items-center">
              <div className="w-[44%]">
                <CodeInputSelect
                  options={securityAgencyOptions}
                   value={formValues.securityAgencyCode}
                  onChange={(value) =>
                    handleValueChange("securityAgencyCode", value)
                  }
                  disabled={isFormDisabled}
                />
              </div>
              
              {showData && <div className="flex w-[13%] justify-start">保安機関01番</div>}

              <KanaInput
                className={`${inputBaseClass} w-2/5`}
                value={"TA90"}
                onChange={(newValue) =>
                  handleValueChange("securityAgencyCode", newValue)
                }
                disabled={isFormDisabled}
              />
            </div>
          );

        case "集中監視コード":
          return (
            <div className="flex w-4/5 items-center">
              <data className="w-[44%]">
                <CodeInputSelect
                  options={monitoringOptions}
                  value={formValues.monitoringCode}
                  onChange={(value) => handleValueChange("monitoringCode", value)}
                  disabled={isFormDisabled}
                />
              </data>
              
              {showData && <div className="flex w-[13%] justify-start">集中監視01番</div>}

              <KanaInput
                className={`${inputBaseClass} w-2/5`}
                value={"00503"}
                onChange={(newValue) =>
                  handleValueChange("monitoringName", newValue)
                }
                disabled={isFormDisabled}
              />
            </div>
          );

        case "案内":
          return (
            <Input
              className={`${inputBaseClass} w-2/5`}
              disabled={isFormDisabled}
            />
          );

        case "備考1":
          return (
            <KanaInput
              className={`${inputBaseClass} w-2/5`}
              value={formValues.備考1}
              onChange={(newValue) => handleValueChange("備考1", newValue)}
              disabled={isFormDisabled}
            />
          );
        case "備考2":
          return (
            <KanaInput
              className={`${inputBaseClass} w-2/5`}
              value={formValues.備考2}
              onChange={(newValue) => handleValueChange("備考2", newValue)}
              disabled={isFormDisabled}
            />
          );
        case "備考3":
          return (
            <KanaInput
              className={`${inputBaseClass} w-2/5`}
              value={formValues.備考3}
              onChange={(newValue) => handleValueChange("備考3", newValue)}
              disabled={isFormDisabled}
            />
          );
        case "カナ":
          return (
            <KanaInput
              className={`${inputBaseClass} w-3/5`}
              value={formValues.カナ}
              onChange={(newValue) => handleValueChange("カナ", newValue)}
              disabled={isFormDisabled}
            />
          );

        case "住所名称":
          return (
            <KanaInput
              className={`${inputBaseClass} w-3/5`}
              value={formValues.住所名称}
              onChange={(newValue) => handleValueChange("住所名称", newValue)}
              disabled={isFormDisabled}
            />
          );

        default: {
          const fieldName = label as keyof typeof formValues;
          if (fieldName in formValues) {
            return (
              <KanaInput
                ref={label === "氏名" ? firstInputRef : null}
                className={`${inputBaseClass} w-3/5`}
                value={formValues[fieldName]}
                onChange={(value) => handleValueChange(fieldName, value)}
                disabled={isFormDisabled}
              />
            );
          }
        }
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
  }
);

export default BasicInformation;
