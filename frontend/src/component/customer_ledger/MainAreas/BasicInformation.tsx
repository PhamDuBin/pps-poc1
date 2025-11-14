import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button, Radio, type RadioChangeEvent } from "antd";
import {
  labelColor,
  hoverInputColor,
  focusInputColor,
} from "../../../constants/colors";
import { blockTab } from "../../../utils/InputHandlers";
import CodeInputSelect from "../../CodeInputSelect";
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

import {
  KanaFullWidthInput,
  HalfWidthKanaInput,
  HalfWidthNumberInput,
  HalfWidthAlphaNumInput,
} from "../../input/JapaneseInputs";

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
        setFormValues((prev) => ({
          ...prev,
          ...defaultInputValues,
          postalCode1: "111",
          postalCode2: "9999",
          // Các giá trị này đã có trong initialEmptyValues (hoặc defaultInputValues)
          // nên chúng sẽ được tải đúng khi showData=true
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
              onChange={(e: RadioChangeEvent) =>
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

        case "住所": // 全角かな
          return (
            <KanaFullWidthInput
              className={`${inputBaseClass} w-3/5`}
              value={formValues.address}
              onChange={(newValue: string) =>
                handleValueChange("address", newValue)
              }
              disabled={isFormDisabled}
            />
          );

        case "代表者名": // 全角かな
          return (
            <div className="w-1/2">
              <KanaFullWidthInput
                className={`${inputBaseClass} w-[59%]`}
                value={formValues.representativeName}
                onChange={(newValue: string) =>
                  handleValueChange("representativeName", newValue)
                }
                disabled={isFormDisabled}
              />
            </div>
          );

        case "取引種類": // Radio
          return (
            <Radio.Group
              value={formValues.transactionType}
              onChange={(e: RadioChangeEvent) =>
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

        case "郵便番号": // 半角数字
          return (
            <div className="flex items-center gap-[6px] w-1/2 pr-10">
              <HalfWidthNumberInput
                value={formValues.postalCode1}
                onChange={(e: string) => handleValueChange("postalCode1", e)}
                disabled={isFormDisabled}
                className={`${inputBaseClass} w-[30%]`}
              />
              <span>-</span>
              <HalfWidthNumberInput
                value={formValues.postalCode2}
                onChange={(e: string) => handleValueChange("postalCode2", e)}
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

        case "時間帯1": // Select
        case "時間帯2": // Select
          const timeFieldName = label === "時間帯1" ? "time1" : "time2";
          return (
            <div className="w-[78%]">
              <CodeInputSelect
                options={timeSlotOptions}
                value={formValues[timeFieldName as keyof typeof formValues]}
                onChange={(value: any) =>
                  handleValueChange(timeFieldName, value)
                }
                disabled={isFormDisabled}
                autoSelectOnFocus={true}
              />
            </div>
          );

        case "管理部門": // Select
          return (
            <div className="w-[24%]">
              <CodeInputSelect
                options={departmentOptions}
                value={formValues.departmentCode}
                onChange={(value: any) =>
                  handleValueChange("departmentCode", value)
                }
                disabled={isFormDisabled}
                autoSelectOnFocus={true}
              />
            </div>
          );

        case "配送センターコード": // Select + 半角英数字
          return (
            <div className="flex items-center w-[67%] justify-between">
              <div className="w-[48%] flex items-center">
                <CodeInputSelect
                  options={deliveryCenterOptions}
                  value={formValues.deliveryCenterCode}
                  onChange={(value: any) =>
                    handleValueChange("deliveryCenterCode", value)
                  }
                  disabled={isFormDisabled}
                  autoSelectOnFocus={true}
                />
                {showData && (
                  <div className="flex justify-center w-[120px]">
                    センター01番
                  </div>
                )}
              </div>

              <HalfWidthAlphaNumInput
                className={`${inputBaseClass} w-2/5`}
                value={formValues.deliveryCenterName}
                onChange={(value: string) =>
                  handleValueChange("deliveryCenterName", value)
                }
                disabled={isFormDisabled}
              />
            </div>
          );

        case "保安機関コード": // Select + 半角英数字
          return (
            <div className="flex items-center w-[67%] justify-between">
              <div className="w-[48%] flex items-center">
                <CodeInputSelect
                  options={securityAgencyOptions}
                  value={formValues.securityAgencyCode}
                  onChange={(value: any) =>
                    handleValueChange("securityAgencyCode", value)
                  }
                  disabled={isFormDisabled}
                  autoSelectOnFocus={true}
                />
                {showData && (
                  <div className="flex justify-center w-[120px]">
                    保安機関01番
                  </div>
                )}
              </div>

              <HalfWidthAlphaNumInput
                className={`${inputBaseClass} w-2/5`}
                value={formValues.securityAgencyName}
                onChange={(value: string) =>
                  handleValueChange("securityAgencyName", value)
                }
                disabled={isFormDisabled}
              />
            </div>
          );

        case "集中監視コード": // Select + 半角数字
          return (
            <div className="flex items-center w-[67%] justify-between">
              <data className="w-[48%] flex items-center">
                <CodeInputSelect
                  options={monitoringOptions}
                  value={formValues.monitoringCode}
                  onChange={(value: any) =>
                    handleValueChange("monitoringCode", value)
                  }
                  disabled={isFormDisabled}
                  autoSelectOnFocus={true}
                />
                {showData && (
                  <div className="flex justify-center w-[120px]">
                    集中監視01番
                  </div>
                )}
              </data>

              <HalfWidthNumberInput
                className={`${inputBaseClass} w-2/5`}
                value={formValues.monitoringName}
                onChange={(value: string) =>
                  handleValueChange("monitoringName", value)
                }
                disabled={isFormDisabled}
              />
            </div>
          );

        case "案内": // 半角英数字
          return (
            <div className="w-1/2">
              <KanaFullWidthInput
                className={`${inputBaseClass} w-[59%]`}
                value={formValues.案内}
                onChange={(value: string) => handleValueChange("案内", value)}
                disabled={isFormDisabled}
              />
            </div>
          );

        case "検索キー1": // 半角英数字
          return (
            <HalfWidthAlphaNumInput
              value={formValues.検索キー1}
              onChange={(newValue: string) =>
                handleValueChange("検索キー1", newValue)
              }
              className={`${inputBaseClass} w-3/5`}
              disabled={isFormDisabled}
            />
          );

        case "検索キー2": // 半角英数字
          return (
            <HalfWidthAlphaNumInput
              value={formValues.検索キー2}
              onChange={(newValue: string) =>
                handleValueChange("検索キー2", newValue)
              }
              className={`${inputBaseClass} w-3/5`}
              disabled={isFormDisabled}
            />
          );

        case "備考1": // 全角かな
        case "備考2": // 全角かな
        case "備考3": // 全角かな
          const noteFieldName = label as keyof typeof formValues;
          return (
            <KanaFullWidthInput
              className={`${inputBaseClass} w-2/5`}
              value={formValues[noteFieldName]}
              onChange={(newValue: string) =>
                handleValueChange(noteFieldName, newValue)
              }
              disabled={isFormDisabled}
            />
          );

        case "カナ": // 半角カナ
          return (
            <HalfWidthKanaInput
              className={`${inputBaseClass} w-3/5`}
              value={formValues.カナ}
              onChange={(newValue: string) =>
                handleValueChange("カナ", newValue)
              }
              disabled={isFormDisabled}
            />
          );

        case "住所名称": // 全角かな
          return (
            <div className="w-1/2">
              <KanaFullWidthInput
                className={`${inputBaseClass} w-[59%]`}
                value={formValues.住所名称}
                onChange={(newValue: string) =>
                  handleValueChange("住所名称", newValue)
                }
                disabled={isFormDisabled}
              />
            </div>
          );

        case "メールアドレス": // 半角英数字
          return (
            <HalfWidthAlphaNumInput
              className={`${inputBaseClass} w-3/5`}
              value={formValues.メールアドレス}
              onChange={(value: string) =>
                handleValueChange("メールアドレス", value)
              }
              disabled={isFormDisabled}
            />
          );

        case "電話番号1": // 半角数字
        case "電話番号2": // 半角数字
        case "電話番号3": // 半角数字
        case "FAX": // 半角数字
        case "地図番号": // 半角数字
          const numberFieldName = label as keyof typeof formValues;
          if (numberFieldName in formValues) {
            return (
              <HalfWidthNumberInput
                className={`${inputBaseClass} w-3/5`}
                value={formValues[numberFieldName]}
                onChange={(value: string) =>
                  handleValueChange(numberFieldName, value)
                }
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
                onChange={(value: string) =>
                  handleValueChange(fieldName, value)
                }
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
