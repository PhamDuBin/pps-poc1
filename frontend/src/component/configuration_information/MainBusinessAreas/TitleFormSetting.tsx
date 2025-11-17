import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { labelColor, inputColor } from "../../../constants/colors";
import { blockTab } from "../../../utils/InputHandlers";
import CodeInputSelect from "../../CodeInputSelect";
import { labelOptions } from "../../../constants/configuration_information";
import { KanaFullWidthInput } from "../../input/JapaneseInputs";

const labelClass = `${labelColor} px-2 flex items-center justify-center h-[32px] w-[180px] rounded-md`;

const TitleFormSetting = forwardRef<any>((props, ref) => {
  const [formValues, setFormValues] = useState({
    invoiceTitle: "",
    previousBilling: "",
    currentMonthPayment: "",
    balance: "",
    currentMonthPurchase: "",
    otherAdjustments: "",
    currentMonthTax: "",
    currentBilling: "",
    labels: "0",
  });

  const firstInputRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    focusFirstButton: () => {
      firstInputRef.current?.focus();
    },
    getContainerNode: () => {
      return containerRef.current;
    },
  }));

  const handleValueChange = (fieldName: string, value: string | null) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={blockTab}
      ref={containerRef}
      className="p-2 mt-2 xl:text-base text-xs"
    >
      {/* Header */}
      <div
        className={`w-full ${labelColor} flex justify-center items-center p-2 font-bold rounded-md`}
      >
        タイトル・鑑設定
      </div>

      {/* 請求書タイトル */}
      <div className="flex gap-10 mt-4 w-full ">
        <div className="flex gap-3 items-center">
          <div
            className={`w-[200px] ${labelColor} flex justify-center items-center p-1 font-bold rounded-md`}
          >
            請求書タイトル
          </div>
          <KanaFullWidthInput
            ref={firstInputRef}
            className={`border border-black h-6 px-2 ${inputColor}`}
            value={formValues.invoiceTitle}
            onChange={(newValue: string) => {
              setFormValues((prev) => ({
                ...prev,
                invoiceTitle: newValue,
              }));
            }}
            placeholder="ご請求書"
          />
        </div>
        <div className="flex gap-3 items-center w-[40%]">
          <div
            className={`w-[160px] ${labelColor} flex justify-center items-center p-1 font-bold rounded-md`}
          >
            請求書案内文
          </div>
          <CodeInputSelect
            options={labelOptions}
            value={formValues.labels}
            onChange={(value) => handleValueChange("labels", value)}
          />
        </div>
      </div>

      {/* 印字項目名称設定 */}
      <div className=" p-4">
        <div className="font-bold py-2">印字項目名称設定</div>
        <div className="border border-black">
          {/* Row 1 */}
          <div className="flex p-2 gap-5">
            <span className="flex gap-4 w-[40%]">
              <div className={`font-semibold ${labelClass}`}>前回ご請求</div>
              <KanaFullWidthInput
                placeholder="前回ご請求額"
                className={`border border-black px-2 w-full ${inputColor}`}
                value={formValues.previousBilling}
                onChange={(newValue: string) => {
                  setFormValues((prev) => ({
                    ...prev,
                    previousBilling: newValue,
                  }));
                }}
              />
            </span>
            <span className="flex gap-5 w-[30%]">
              <div className={`font-semibold ${labelClass}`}>今回ご請求</div>
              <KanaFullWidthInput
                placeholder="今回ご請求額"
                className={`border border-black px-2 w-full ${inputColor}`}
                value={formValues.currentBilling}
                onChange={(newValue: string) => {
                  setFormValues((prev) => ({
                    ...prev,
                    currentBilling: newValue,
                  }));
                }}
              />
            </span>
            <span className="flex gap-5 w-[30%]">
              <div className={`font-semibold ${labelClass}`}>当月ご入金額</div>
              <KanaFullWidthInput
                placeholder="当月ご入金額"
                className={`border border-black px-2 w-full ${inputColor}`}
                value={formValues.currentMonthPayment}
                onChange={(newValue: string) => {
                  setFormValues((prev) => ({
                    ...prev,
                    currentMonthPayment: newValue,
                  }));
                }}
              />
            </span>
          </div>

          {/* Row 2 */}
          <div className="flex p-2 gap-4">
            <span className="flex gap-4 w-[40%]">
              <div className={`font-semibold ${labelClass}`}>差引金額</div>
              <KanaFullWidthInput
                placeholder="差引金額"
                className={`border border-black px-2 w-full ${inputColor}`}
                value={formValues.balance}
                onChange={(newValue: string) => {
                  setFormValues((prev) => ({
                    ...prev,
                    balance: newValue,
                  }));
                }}
              />
            </span>
            <span className="flex gap-5 w-[30%]">
              <div className={`font-semibold ${labelClass}`}>当月お買上額</div>
              <KanaFullWidthInput
                placeholder="当月お買上額"
                className={`border border-black px-2 w-full ${inputColor}`}
                value={formValues.currentMonthPurchase}
                onChange={(newValue: string) => {
                  setFormValues((prev) => ({
                    ...prev,
                    currentMonthPurchase: newValue,
                  }));
                }}
              />
            </span>
            <span className="flex gap-5 w-[30%]">
              <div className={`font-semibold ${labelClass}`}>当月外修正額</div>
              <KanaFullWidthInput
                placeholder="当月外修正額"
                className={`border border-black px-2 w-full ${inputColor}`}
                value={formValues.otherAdjustments}
                onChange={(newValue: string) => {
                  setFormValues((prev) => ({
                    ...prev,
                    otherAdjustments: newValue,
                  }));
                }}
              />
            </span>
          </div>

          {/* Row 3 (消費税額) */}
          <div className="flex p-2 gap-5">
            <span className="flex gap-4 w-[40%] items-stretch">
              <div className={`font-semibold ${labelClass}`}>当月消費税額</div>
              <KanaFullWidthInput
                placeholder="当月消費税額"
                className={`border border-black px-2 w-full ${inputColor}`}
                value={formValues.currentMonthTax}
                onChange={(newValue: string) => {
                  setFormValues((prev) => ({
                    ...prev,
                    currentMonthTax: newValue,
                  }));
                }}
              />
            </span>
            <span className="flex gap-5 w-[30%]"></span>
            <span className="flex gap-5 w-[30%]"></span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TitleFormSetting;
