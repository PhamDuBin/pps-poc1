import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Input, Button, Radio } from "antd";
import {
  labelColor,
  hoverInputColor,
  focusInputColor,
} from "../../../constants/colors";
import { blockTab } from "../../../utils/InputHandlers";
import CodeInputSelect from "../../CodeInputSelect";
import KanaFullWidthInput from "../../KanaFullWidthInput";
import { convertToFullWidth } from "../../../utils/InputHandlers";
import HalfWidthKanaInput from "../../HalfWidthKanaInput";
import HalfWidthNumberInput from "../../HalfWidthNumberInput";
import {
  labels,
  labelGroups,
  timeSlotOptions,
  departmentOptions,
  deliveryCenterOptions,
  securityAgencyOptions,
  monitoringOptions,
  defaultInputValues,
  initialEmptyValues,
  customerTypeOption,
  transactionTypeOption,
} from "../../../constants/customer_ledger";

const inputBaseClass = `${hoverInputColor} ${focusInputColor} focus:!bg-input border border-black h-6`;

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
            <KanaFullWidthInput
              className={`${inputBaseClass} w-3/5`}
              value={formValues.address}
              onChange={(newValue) => handleValueChange("address", newValue)}
              disabled={isFormDisabled}
            />
          );

        case "代表者名":
          return (
            <div className="w-1/2">
              <KanaFullWidthInput
                className={`${inputBaseClass} w-[59%]`}
                value={formValues.representativeName}
                onChange={(newValue) =>
                  handleValueChange("representativeName", newValue)
                }
                disabled={isFormDisabled}
              />
            </div>
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
            <div className="flex items-center gap-[6px] w-1/2 pr-10">
              <HalfWidthNumberInput
                value={formValues.postalCode1}
                onChange={(e) => handleValueChange("postalCode1", e)}
                disabled={isFormDisabled}
                className={`${inputBaseClass} w-[30%]`}
              />
              <span>-</span>
              <HalfWidthNumberInput
                value={formValues.postalCode2}
                onChange={(e) => handleValueChange("postalCode2", e)}
                disabled={isFormDisabled}
                className={`${inputBaseClass} w-[30%]`}
              />
              <Button
                type="default"
                className="!bg-blue-600 !text-white hover:!bg-white hover:!text-blue-600 h-6 w-1/4"
                onClick={handleSearchAddress}
                disabled={isFormDisabled}
              >
                住所を検索する
              </Button>
            </div>
          );

        case "時間帯1":
        case "時間帯2":
          const timeFieldName = label === "時間帯1" ? "time1" : "time2";

          return (
            <div className="w-[78%]">
              <CodeInputSelect
                options={timeSlotOptions}
                value={formValues[timeFieldName as keyof typeof formValues]}
                onChange={(value) => handleValueChange(timeFieldName, value)}
                disabled={isFormDisabled}
              />
            </div>
          );

        case "管理部門":
          return (
            <div className="w-[24%]">
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
            <div className="flex items-center w-[67%] justify-between">
              <div className="w-[48%] flex items-center">
                <CodeInputSelect
                  options={deliveryCenterOptions}
                  value={formValues.deliveryCenterCode}
                  onChange={(value) =>
                    handleValueChange("deliveryCenterCode", value)
                  }
                  disabled={isFormDisabled}
                />
                {showData && (
                  <div className="flex justify-center w-[120px]">
                    センター01番
                  </div>
                )}
              </div>

              <HalfWidthKanaInput
                className={`${inputBaseClass} w-2/5`}
                value={"9352716"}
                onChange={() => {}}
                disabled={isFormDisabled}
              />
            </div>
          );

        case "保安機関コード":
          return (
            <div className="flex items-center w-[67%] justify-between">
              <div className="w-[48%] flex items-center">
                <CodeInputSelect
                  options={securityAgencyOptions}
                  value={formValues.securityAgencyCode}
                  onChange={(value) =>
                    handleValueChange("securityAgencyCode", value)
                  }
                  disabled={isFormDisabled}
                />
                {showData && (
                  <div className="flex justify-center w-[120px]">
                    保安機関01番
                  </div>
                )}
              </div>

              <HalfWidthKanaInput
                className={`${inputBaseClass} w-2/5`}
                value={"TA90"}
                onChange={() => {}}
                disabled={isFormDisabled}
              />
            </div>
          );

        case "集中監視コード":
          return (
            <div className="flex items-center w-[67%] justify-between">
              <data className="w-[48%] flex items-center">
                <CodeInputSelect
                  options={monitoringOptions}
                  value={formValues.monitoringCode}
                  onChange={(value) =>
                    handleValueChange("monitoringCode", value)
                  }
                  disabled={isFormDisabled}
                />
                {showData && (
                  <div className="flex justify-center w-[120px]">
                    集中監視01番
                  </div>
                )}
              </data>

              <HalfWidthKanaInput
                className={`${inputBaseClass} w-2/5`}
                value={"00503"}
                onChange={() => {}}
                disabled={isFormDisabled}
              />
            </div>
          );

        case "案内":
          return (
            <div className="w-1/2">
              <Input
                className={`${inputBaseClass} w-[59%]`}
                disabled={isFormDisabled}
              />
            </div>
          );

        case "検索キー1":
          return (
            <HalfWidthKanaInput
              value={formValues.検索キー1}
              onChange={(newValue) => handleValueChange("検索キー1", newValue)}
              className={`${inputBaseClass} w-3/5`}
              disabled={isFormDisabled}
            />
          );

        case "検索キー2":
          return (
            <HalfWidthKanaInput
              value={formValues.検索キー2}
              onChange={(newValue) => handleValueChange("検索キー2", newValue)}
              className={`${inputBaseClass} w-3/5`}
              disabled={isFormDisabled}
            />
          );

        case "備考1":
          return (
            <KanaFullWidthInput
              className={`${inputBaseClass} w-2/5`}
              value={formValues.備考1}
              onChange={(newValue) => handleValueChange("備考1", newValue)}
              disabled={isFormDisabled}
            />
          );
        case "備考2":
          return (
            <KanaFullWidthInput
              className={`${inputBaseClass} w-2/5`}
              value={formValues.備考2}
              onChange={(newValue) => handleValueChange("備考2", newValue)}
              disabled={isFormDisabled}
            />
          );
        case "備考3":
          return (
            <KanaFullWidthInput
              className={`${inputBaseClass} w-2/5`}
              value={formValues.備考3}
              onChange={(newValue) => handleValueChange("備考3", newValue)}
              disabled={isFormDisabled}
            />
          );
        case "カナ":
          return (
            <HalfWidthKanaInput
              className={`${inputBaseClass} w-3/5`}
              value={formValues.カナ}
              onChange={(newValue) => handleValueChange("カナ", newValue)}
              disabled={isFormDisabled}
            />
          );

        case "住所名称":
          return (
            <div className="w-1/2">
              <KanaFullWidthInput
                className={`${inputBaseClass} w-[59%]`}
                value={formValues.住所名称}
                onChange={(newValue) => handleValueChange("住所名称", newValue)}
                disabled={isFormDisabled}
              />
            </div>
          );
        case "メールアドレス":
          return (
            <HalfWidthKanaInput
              className={`${inputBaseClass} w-3/5`}
              value={formValues.メールアドレス}
              onChange={(value) => handleValueChange("メールアドレス", value)}
              disabled={isFormDisabled}
            />
          );

        case "電話番号1":
        case "電話番号2":
        case "電話番号3":
        case "FAX":
        case "地図番号":
          const numberFieldName = label as keyof typeof formValues;
          if (numberFieldName in formValues) {
            return (
              <HalfWidthNumberInput
                className={`${inputBaseClass} w-3/5`}
                value={formValues[numberFieldName]}
                onChange={(value) => handleValueChange(numberFieldName, value)}
                disabled={isFormDisabled}
              />
            );
          }
          break;
        default: {
          const fieldName = label as keyof typeof formValues;
          if (fieldName in formValues) {
            return (
              <KanaFullWidthInput
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
