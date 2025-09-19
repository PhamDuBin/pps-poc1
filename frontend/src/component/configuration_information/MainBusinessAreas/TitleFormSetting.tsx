import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { labelColor, inputColor } from "../../../constants/colors";
import { Input, Select } from "antd";
import { convertToFullWidth } from "../../../utils/InputHandlers";

const labels = ["ご請求", "ご案内1", "ご案内2", "ご案内3", "ご案内4（仮）"];

const labelClass = `${labelColor} border border-black px-2 flex items-center justify-center h-[32px] w-[180px]`;

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
  });

  const firstInputRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      firstInputRef.current?.focus();
    },
  }));

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof typeof formValues
  ) => {
    const value = convertToFullWidth(e.target.value);
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const createOptions = (optionsArray: string[]) =>
    optionsArray.map((opt, idx) => ({ value: String(idx), label: opt }));

  return (
    <div className="p-2 border border-black mt-2 xl:text-base text-xs">
      {/* Header */}
      <div
        className={`w-full ${labelColor} flex justify-center items-center p-2 font-bold`}
      >
        タイトル・鑑設定
      </div>

      {/* 請求書タイトル */}
      <div className="flex gap-10 mt-4 w-full ">
        <div className="flex gap-3 items-center">
          <div
            className={`w-[200px] ${labelColor} flex justify-center items-center p-1 font-bold`}
          >
            請求書タイトル
          </div>
          <Input
            ref={firstInputRef}
            className={`border border-black h-6 px-2 ${inputColor}`}
            type="text"
            placeholder="ご請求書"
            value={formValues.invoiceTitle}
            onChange={(e) => handleInputChange(e, "invoiceTitle")}
          />
        </div>
        <div className="flex gap-3 items-center w-[40%]">
          <div
            className={`w-[160px] ${labelColor} flex justify-center items-center p-1 font-bold`}
          >
            請求書タイトル
          </div>
          <Input
            className={`w-6 h-6 !px-0 text-center ${inputColor}`}
            type="number"
            placeholder="0"
          />
          <Select
            defaultValue={"0"}
            className={`w-2/5 [&>.ant-select-selector]:!bg-[#ebcec0]`}
            options={createOptions(labels)}
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
              <Input
                type="text"
                placeholder="前回ご請求額"
                className={`border border-black px-2 w-full ${inputColor}`}
                value={formValues.previousBilling}
                onChange={(e) => handleInputChange(e, "previousBilling")}
              />
            </span>
            <span className="flex gap-5 w-[30%]">
              <div className={`font-semibold ${labelClass}`}>今回ご請求</div>
              <Input
                type="text"
                placeholder="今回ご請求額"
                className={`border border-black px-2 w-full ${inputColor}`}
                value={formValues.currentBilling}
                onChange={(e) => handleInputChange(e, "currentBilling")}
              />
            </span>
            <span className="flex gap-5 w-[30%]">
              <div className={`font-semibold ${labelClass}`}>当月ご入金額</div>
              <Input
                type="text"
                placeholder="当月ご入金額"
                className={`border border-black px-2 w-full ${inputColor}`}
                value={formValues.currentMonthPayment}
                onChange={(e) => handleInputChange(e, "currentMonthPayment")}
              />
            </span>
          </div>

          {/* Row 2 */}
          <div className="flex p-2 gap-4">
            <span className="flex gap-4 w-[40%]">
              <div className={`font-semibold ${labelClass}`}>差引金額</div>
              <Input
                type="text"
                placeholder="差引金額"
                className={`border border-black px-2 w-full ${inputColor}`}
                value={formValues.balance}
                onChange={(e) => handleInputChange(e, "balance")}
              />
            </span>
            <span className="flex gap-5 w-[30%]">
              <div className={`font-semibold ${labelClass}`}>当月お買上額</div>
              <Input
                type="text"
                placeholder="当月お買上額"
                className={`border border-black px-2 w-full ${inputColor}`}
                value={formValues.currentMonthPurchase}
                onChange={(e) => handleInputChange(e, "currentMonthPurchase")}
              />
            </span>
            <span className="flex gap-5 w-[30%]">
              <div className={`font-semibold ${labelClass}`}>当月外修正額</div>
              <Input
                type="text"
                placeholder="当月外修正額"
                className={`border border-black px-2 w-full ${inputColor}`}
                value={formValues.otherAdjustments}
                onChange={(e) => handleInputChange(e, "otherAdjustments")}
              />
            </span>
          </div>

          {/* Row 3 (消費税額) */}
          <div className="flex p-2 gap-5">
            <span className="flex gap-4 w-[40%] items-stretch">
              <div className={`font-semibold ${labelClass}`}>当月消費税額</div>
              <Input
                type="text"
                placeholder="当月消費税額"
                className={`border border-black px-2 w-full ${inputColor}`}
                value={formValues.currentMonthTax}
                onChange={(e) => handleInputChange(e, "currentMonthTax")}
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
