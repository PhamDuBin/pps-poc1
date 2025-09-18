import { forwardRef, useState } from "react";
import { inputColor, labelColor } from "../../../constants/colors";
import { Select, Checkbox, Radio, Input } from "antd";

const printingButtons: { [key: string]: string[] } = {
  group1: ["事業者", "事業所", "部門"],
  group2: ["取引区分", "営業地区", "集金地区", "検針地区", "点検地区"],
  group3: [
    "営業担当",
    "集金担当",
    "点検担当",
    "検針担当",
    "配送担当",
    "保安担当",
  ],
  group4: ["集金方法", "請求書発行区分"],
};

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

  const [selectedGroup, setSelectedGroup] = useState<{
    [key: string]: string | null;
  }>({
    group1: null,
    group2: null,
    group3: null,
    group4: null,
  });

  const [printManager, setPrintManager] = useState("0");
  const [receiptOfficer, setReceiptOfficer] = useState("0");
  const [facilityUsageFee, setFacilityUsageFee] = useState("");
  const [adjustmentNotice, setAdjustmentNotice] = useState("0");

  const handleSelectLabel = (groupName: string, label: string) => {
    setSelectedGroup((prev) => ({
      ...prev,
      [groupName]: prev[groupName] === label ? null : label,
    }));
  };

  const clearSelection = () => setSelectedGroup({
    group1: null,
    group2: null,
    group3: null,
    group4: null,     
  });

  const createOptions = (optionsArray: string[]) =>
    optionsArray.map((opt, idx) => ({ value: String(idx), label: opt }));

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
          value={Object.values(selectedGroup).filter(Boolean).join("・")}
          readOnly
        />
        <button
          onClick={clearSelection}
          className="w-[15%] bg-blue-600 text-white hover:bg-white hover:text-black border border-black rounded-md  transition"
        >
          印刷区分クリア
        </button>
      </div>

      <div className="border border-black h-36 grid grid-rows-6 grid-cols-9 gap-1 py-2 px-[2%] grid-flow-col">
        {Object.entries(printingButtons).map(([groupName, buttons]) =>
          buttons.map((label, idx) => {
            const isActive = selectedGroup[groupName] === label;
            const isDisabled = selectedGroup[groupName] !== null && !isActive;
            return (
              <button
                key={label}
                onClick={() => handleSelectLabel(groupName, label)}
                disabled={isDisabled}
                className={`px-4 py-1 border rounded transition ${
                  isActive
                    ? "bg-blue-400 text-black border-black"
                    : "bg-blue-200 border-gray-400 hover:bg-white disabled:bg-gray-300 disabled:text-gray-400"
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
          })
        )}
      </div>

      {/* Section Select + Radio + Checkbox - Refactored with Ant Design */}
      <div className="mt-4 flex flex-col gap-3 text-xs xl:text-sm">
        <div className="flex justify-between items-center gap-3">
          <div className="flex gap-3 items-center w-[40%]">
            <div
              className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 ${labelColor}`}
            >
              印刷順
            </div>
            <Select
              className="w-[200px] [&>.ant-select-selector]:!bg-[#ebcec0]"
              value={selectedOrder}
              onChange={setSelectedOrder}
              options={createOptions(printingOrderOptions)}
            />
          </div>
          <div className="flex gap-3 items-center w-[60%]">
            <div
              className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 ${labelColor}`}
            >
              請求親子
            </div>
            <Radio.Group
              onChange={(e) => setSelectedParentChild(e.target.value)}
              value={selectedParentChild}
            >
              {parentChildOptions.map((opt, idx) => (
                <Radio key={idx} value={String(idx)}>
                  {opt}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        </div>

        <div className="flex justify-between items-center gap-3">
          <div className="flex gap-3 items-center w-[40%]">
            <div
              className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 ${labelColor}`}
            >
              自振顧客明細
            </div>
            <Select
              className="w-[200px] [&>.ant-select-selector]:!bg-[#ebcec0]"
              value={selectedDetail}
              onChange={setSelectedDetail}
              options={createOptions(detailOptions)}
            />
          </div>
          <div className="flex gap-3 items-center w-[60%]">
            <div
              className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 ${labelColor}`}
            >
              宛先印字
            </div>
            <Radio.Group
              onChange={(e) => setSelectedAddress(e.target.value)}
              value={selectedAddress}
            >
              {addressOptions.map((opt, idx) => (
                <Radio key={idx} value={String(idx)}>
                  {opt}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        </div>

        <div className="flex justify-between items-center gap-3">
          <div className="flex gap-3 items-center w-[40%]">
            <div
              className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 ${labelColor}`}
            >
              鑑部税表現
            </div>
            <Select
              className="w-[200px] [&>.ant-select-selector]:!bg-[#ebcec0]"
              value={selectedTaxType}
              onChange={setSelectedTaxType}
              options={createOptions(taxTypeOptions)}
            />
          </div>
          <div className="flex gap-3 items-center w-[60%]">
            <div
              className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 ${labelColor}`}
            >
              明細順
            </div>
            <Select
              className="w-[300px] [&>.ant-select-selector]:!bg-[#ebcec0]"
              value={selectedDetailOrder}
              onChange={setSelectedDetailOrder}
              options={createOptions(detailOrderOptions)}
            />
          </div>
        </div>

        <div className="flex gap-3 items-center w-[40%]">
          <div
            className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 ${labelColor}`}
          >
            税取りまとめ
          </div>
          <Select
            className="w-[200px] [&>.ant-select-selector]:!bg-[#ebcec0]"
            value={selectedTaxCollect}
            onChange={setSelectedTaxCollect}
            options={createOptions(taxCollectOptions)}
          />
        </div>

        <div className="flex gap-3 items-start">
          <div
            className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 ${labelColor}`}
          >
            印刷項目
          </div>
          <Checkbox.Group
            className="flex flex-row gap-1"
            options={createOptions(printItemOptions)}
            value={selectedPrintItems}
            onChange={setSelectedPrintItems}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-3 items-center w-[40%]">
            <div
              className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 ${labelColor}`}
            >
              伝票メモ
            </div>
            <Select
              className="w-[200px] [&>.ant-select-selector]:!bg-[#ebcec0]"
              value={selectedMemo}
              onChange={setSelectedMemo}
              options={createOptions(memoOptions)}
            />
          </div>
          <Radio.Group
            className="flex gap-2"
            onChange={(e) => setSelectedMemoRadio(e.target.value)}
            value={selectedMemoRadio}
          >
            {memoRadioOptions.map((opt, idx) => (
              <Radio key={idx} value={String(idx)}>
                {opt}
              </Radio>
            ))}
          </Radio.Group>
        </div>

        <div className="flex justify-between items-center gap-3">
          <div className="flex gap-3 items-center w-[40%]">
            <div
              className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 ${labelColor}`}
            >
              印刷担当
            </div>
            <Select
              className="w-[200px] [&>.ant-select-selector]:!bg-[#ebcec0]"
              value={printManager}
              onChange={setPrintManager}
              options={createOptions(["営業", "集金"])}
            />
          </div>
          <div className="flex gap-3 items-center w-[60%]">
            <div
              className={`flex text-center items-center justify-center font-bold w-[120px] min-w-[120px] p-1 ${labelColor}`}
            >
              施設使用料とりまとめ名称
            </div>
            <Input
              placeholder="ここに入力してください"
              className="w-full"
              value={facilityUsageFee}
              onChange={(e) => setFacilityUsageFee(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between items-center gap-3">
          <div className="flex gap-3 items-center w-[40%]">
            <div
              className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 ${labelColor}`}
            >
              領収書の担当
            </div>
            <Select
              className="w-[200px] [&>.ant-select-selector]:!bg-[#ebcec0]"
              value={receiptOfficer}
              onChange={setReceiptOfficer}
              options={createOptions(["印刷する", "印刷しない"])}
            />
          </div>
          <div className="flex gap-3 items-center w-[60%]">
            <div
              className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 ${labelColor}`}
            >
              原料費調整通知
            </div>
            <Select
              className="w-[200px] [&>.ant-select-selector]:!bg-[#ebcec0]"
              value={adjustmentNotice}
              onChange={setAdjustmentNotice}
              options={createOptions(["印刷する", "印刷しない"])}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default PrintingDesignation;
