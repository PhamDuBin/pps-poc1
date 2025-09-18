import { forwardRef, useState } from "react";
import { inputColor, labelColor } from "../../../constants/colors";

const printingButtons = [
  "事業者",
  "事業所",
  "部門",
  "取引区分",
  "営業地区",
  "集金地区",
  "検針地区",
  "点検地区",
  "営業担当",
  "集金担当",
  "点検担当",
  "検針担当",
  "配送担当",
  "保安担当",
  "集金方法",
  "請求書発行区分",
];

const printingOrderOptions = [
  "顧客コード",
  "五十音順",
  "検針順",
  "営業順",
  "集金順",
  "配送順",
  "点検順",
  "検索１順",
  "検索２順",
];
const detailOptions = ["全明細", "集金明細", "自振明細"];
const taxTypeOptions = ["外税", "内税"];
const taxCollectOptions = ["する", "しない"];
const printItemOptions = [
  "事業所名",
  "ガス料金名称",
  "電話番号",
  "領収額",
  "振込先",
  "お買い上げ先",
];
const memoOptions = ["伝票メモ", "ポイント"];
const memoRadioOptions = [
  "割引（割引対象外顧客の場合は伝票メモを印字）",
  "割引（割引対象外顧客の場合はポイントを印字）",
];
const parentChildOptions = [
  "請求親子取りまとめて発行する。",
  "個別に発行する。",
];
const addressOptions = ["宛先登録内容を印字しない", "宛先登録内容を印字する"];
const detailOrderOptions = [
  "日付順",
  "大分類・商品コード・日付順",
  "大分類・日付順",
];

const SelectInput = ({ label, value, options, onChange }: any) => {
  const containerWidth =
    label === "明細順" || label === "原料費調整通知" ? "w-[60%]" : "w-[20%]";

  return (
    <div className={`flex gap-3 ${containerWidth}`}>
      <div
        className={`flex items-center justify-center font-bold w-[200px] min-w-[120px] ${labelColor}`}
      >
        {label}
      </div>
      <select
        className={`border border-black p-1 rounded-sm ${inputColor} ${
          label === "原料費調整通知" ? "w-1/5" : "w-2/5"
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt: string, idx: number) => (
          <option key={idx} value={idx}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

const RadioGroup = ({ label, name, options, selected, onChange }: any) => (
  <div className="flex w-[60%] gap-3 items-center">
    <div
      className={`${labelColor} ${
        options === memoRadioOptions
          ? ""
          : "flex items-center p-1 justify-center font-bold w-[200px] "
      }`}
    >
      {label}
    </div>
    <div className="flex gap-3">
      {options.map((opt: string, idx: number) => (
        <label key={idx} className="flex items-center gap-2">
          <input
            type="radio"
            name={name}
            value={idx}
            checked={selected === String(idx)}
            onChange={(e) => onChange(e.target.value)}
          />
          {opt}
        </label>
      ))}
    </div>
  </div>
);

const CheckboxGroup = ({ label, options, selected, onChange }: any) => (
  <div className="flex justify-between gap-3 w-full relative">
    <div className="w-[20%] flex gap-3">
      <div
        className={`flex items-center justify-center p-1 font-bold w-[200px] ${labelColor}`}
      >
        {label}
      </div>
      <div className="w-2/5">
        <div className="flex gap-3 flex-wrap absolute">
          {options.map((opt: string, idx: number) => (
            <label key={idx} className="flex items-center gap-3">
              <input
                className="w-6 h-6"
                type="checkbox"
                checked={selected.includes(String(idx))}
                onChange={(e) => {
                  if (e.target.checked) onChange([...selected, String(idx)]);
                  else
                    onChange(selected.filter((i: string) => i !== String(idx)));
                }}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
    </div>
    <div className="flex gap-3 w-[60%]"></div>
  </div>
);

const PrintingDesignation = forwardRef<any>((props, ref) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState("0");
  const [selectedDetail, setSelectedDetail] = useState("0");
  const [selectedTaxType, setSelectedTaxType] = useState("0");
  const [selectedTaxCollect, setSelectedTaxCollect] = useState("1");
  const [selectedPrintItems, setSelectedPrintItems] = useState<string[]>([]);
  const [selectedMemo, setSelectedMemo] = useState("0");
  const [selectedMemoRadio, setSelectedMemoRadio] = useState("0");
  const [selectedParentChild, setSelectedParentChild] = useState("0");
  const [selectedAddress, setSelectedAddress] = useState("0");
  const [selectedDetailOrder, setSelectedDetailOrder] = useState("0");

  const [printManager, setPrintManager] = useState("0");
  const [receiptOfficer, setReceiptOfficer] = useState("0");
  const [facilityUsageFee, setFacilityUsageFee] = useState("");
  const [adjustmentNotice, setAdjustmentNotice] = useState("0");

  const handleSelectLabel = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  const clearSelection = () => setSelected([]);

  return (
    <div className="p-2 border border-black mt-2 xl:text-base text-sm">
      <div
        className={`w-full ${labelColor} flex justify-center items-center p-2 font-bold`}
      >
        印刷指定
      </div>

      {/* 印刷区分指定 */}
      <div className={`flex gap-x-4 mt-4 w-full ${labelColor} p-2`}>
        <div className="min-w-[100px] font-bold">印刷区分指定</div>
        <input
          ref={ref}
          type="text"
          className={`w-[50%] border border-black ${inputColor}`}
          value={selected.join("・")}
          readOnly
        />
        <button
          onClick={clearSelection}
          className="w-[15%] bg-white border border-black rounded-md hover:bg-gray-200 transition"
        >
          印刷区分クリア
        </button>
      </div>

      <div className="border border-black h-36 grid grid-rows-6 grid-cols-9 gap-1 py-2 px-[2%] grid-flow-col">
        {printingButtons.map((label, idx) => {
          const isActive = selected.includes(label);
          return (
            <button
              key={idx}
              onClick={() => handleSelectLabel(label)}
              className={`px-4 py-1 border rounded transition ${
                isActive
                  ? "bg-blue-400 text-black border-black"
                  : "bg-blue-200 border-gray-400 hover:bg-white"
              }
              ${
                label === "取引区分" ||
                label === "請求書発行区分" ||
                label === "集金方法"
                  ? "row-span-6"
                  : ""
              }
              ${
                label === "事業者" || label === "事業所" || label === "部門"
                  ? "row-span-2"
                  : "row-span-3"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Section Select + Radio + Checkbox */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex justify-between">
          <SelectInput
            label="印刷順"
            value={selectedOrder}
            options={printingOrderOptions}
            onChange={setSelectedOrder}
          />
          <RadioGroup
            label="請求親子"
            name="parentChild"
            options={parentChildOptions}
            selected={selectedParentChild}
            onChange={setSelectedParentChild}
          />
        </div>
        <div className="flex justify-between">
          <SelectInput
            label="自振顧客明細"
            value={selectedDetail}
            options={detailOptions}
            onChange={setSelectedDetail}
          />
          <RadioGroup
            label="宛先印字"
            name="address"
            options={addressOptions}
            selected={selectedAddress}
            onChange={setSelectedAddress}
          />
        </div>
        <div className="flex justify-between">
          <SelectInput
            label="鑑部税表現"
            value={selectedTaxType}
            options={taxTypeOptions}
            onChange={setSelectedTaxType}
          />
          <SelectInput
            label="明細順"
            value={selectedDetailOrder}
            options={detailOrderOptions}
            onChange={setSelectedDetailOrder}
          />
        </div>
        <SelectInput
          label="税取りまとめ"
          value={selectedTaxCollect}
          options={taxCollectOptions}
          onChange={setSelectedTaxCollect}
        />
        <CheckboxGroup
          label="印刷項目"
          options={printItemOptions}
          selected={selectedPrintItems}
          onChange={setSelectedPrintItems}
        />
        <div className="flex gap-3">
          <SelectInput
            label="伝票メモ"
            value={selectedMemo}
            options={memoOptions}
            onChange={setSelectedMemo}
          />
          <RadioGroup
            label=""
            name="memoRadio"
            options={memoRadioOptions}
            selected={selectedMemoRadio}
            onChange={setSelectedMemoRadio}
            gap="gap-1"
          />
        </div>
        <div className="flex justify-between">
          <SelectInput
            label="印刷担当"
            value={printManager}
            options={["営業", "集金"]}
            onChange={setPrintManager}
          />
          <div className="flex gap-3 w-[60%]">
            <div
              className={`flex items-center justify-center font-bold w-[200px] ${labelColor}`}
            >
              施設使用料とりまとめ名称
            </div>
            <input
              type="text"
              placeholder="ここに入力してください"
              className={`w-[20%] border border-black px-2 py-1 rounded ${inputColor}`}
              value={facilityUsageFee}
              onChange={(e) => setFacilityUsageFee(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <SelectInput
            label="領収書の担当"
            value={receiptOfficer}
            options={["印刷する", "印刷しない"]}
            onChange={setReceiptOfficer}
          />
          <SelectInput
            label="原料費調整通知"
            value={adjustmentNotice}
            options={["印刷する", "印刷しない"]}
            onChange={setAdjustmentNotice}
          />
        </div>
      </div>
      <wbr></wbr>
    </div>
  );
});

export default PrintingDesignation;
