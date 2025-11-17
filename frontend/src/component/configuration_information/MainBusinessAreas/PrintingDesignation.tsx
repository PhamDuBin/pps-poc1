import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { inputColor, labelColor } from "../../../constants/colors";
import { Select, Checkbox, Radio } from "antd";
import { blockTab } from "../../../utils/InputHandlers";
import {
  printingButtons,
  printingOrderOptions,
  detailOptions,
  taxTypeOptions,
  taxCollectOptions,
  memoOptions,
  memoRadioOptions,
  parentChildOptions,
  addressOptions,
  detailOrderOptions,
} from "../../../constants/configuration_information";
import { KanaFullWidthInput } from "../../input/JapaneseInputs";

const PrintingDesignation = forwardRef<any>((props, ref) => {
  const [selectedOrder, setSelectedOrder] = useState("0");
  const [selectedDetail, setSelectedDetail] = useState("0");
  const [selectedTaxType, setSelectedTaxType] = useState("0");
  const [selectedTaxCollect, setSelectedTaxCollect] = useState("1");

  const [selectedMemo, setSelectedMemo] = useState("0");
  const [selectedMemoRadio, setSelectedMemoRadio] = useState("0");
  const [selectedParentChild, setSelectedParentChild] = useState("0");
  const [selectedAddress, setSelectedAddress] = useState("0");
  const [selectedDetailOrder, setSelectedDetailOrder] = useState("0");
  const [printManager, setPrintManager] = useState("0");
  const [receiptOfficer, setReceiptOfficer] = useState("0");
  const [facilityUsageFee, setFacilityUsageFee] = useState("");
  const [adjustmentNotice, setAdjustmentNotice] = useState("0");

  const [selectedGroup, setSelectedGroup] = useState<{
    [key: string]: string | null;
  }>({
    group1: null,
    group2: null,
    group3: null,
    group4: null,
  });

  const groupRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    focusFirstButton: () => {
      setTimeout(() => {
        groupRefs.current.group1?.focus();
      }, 0);
    },
    getContainerNode: () => {
      return containerRef.current;
    },
  }));

  const handleSelectLabel = (groupName: string, label: string) => {
    setSelectedGroup((prev) => ({
      ...prev,
      [groupName]: prev[groupName] === label ? null : label,
    }));

    const groupKeys = Object.keys(printingButtons);
    const currentIndex = groupKeys.indexOf(groupName);
    const nextIndex = currentIndex + 1;

    if (nextIndex < groupKeys.length) {
      const nextGroupName = groupKeys[nextIndex];
      setTimeout(() => {
        groupRefs.current[nextGroupName]?.focus();
      }, 0);
    }
  };

  const clearSelection = () => {
    setSelectedGroup({
      group1: null,
      group2: null,
      group3: null,
      group4: null,
    });
    setTimeout(() => {
      groupRefs.current.group1?.focus();
    }, 0);
  };

  const createOptions = (optionsArray: string[]) =>
    optionsArray.map((opt, idx) => ({ value: String(idx), label: opt }));

  return (
    <div
      tabIndex={0}
      onKeyDown={blockTab}
      ref={containerRef}
      className="p-2 mt-2 xl:text-base text-sm"
    >
      <div
        className={`w-full ${labelColor} flex justify-center items-center p-2 font-bold rounded-md`}
      >
        印刷指定
      </div>

      <div
        className={`flex gap-x-4 mt-4 w-full ${labelColor} p-2 rounded-t-md`}
      >
        <div className="min-w-[100px] font-bold">印刷区分指定</div>
        <input
          type="text"
          className={`w-[50%] border border-black rounded-md ${inputColor}`}
          value={Object.values(selectedGroup).filter(Boolean).join("・")}
          readOnly
        />
        <button
          onClick={clearSelection}
          className="w-[15%] bg-blue-600 text-white hover:bg-white hover:text-black border border-black rounded-md transition"
        >
          印刷区分クリア
        </button>
      </div>

      <div className="border border-black h-36 grid grid-rows-6 grid-cols-9 gap-1 py-2 px-[2%] grid-flow-col rounded-b-md">
        {Object.entries(printingButtons).map(([groupName, buttons]) =>
          buttons.map((label, idx) => {
            const isActive = selectedGroup[groupName] === label;
            const isDisabled = selectedGroup[groupName] !== null && !isActive;
            return (
              <button
                key={label}
                ref={
                  idx === 0
                    ? (el) => {
                        groupRefs.current[groupName] = el;
                      }
                    : undefined
                }
                onClick={() => handleSelectLabel(groupName, label)}
                disabled={isDisabled}
                className={`px-4 py-1 border rounded transition
                  ${
                    isActive
                      ? "bg-blue-400 text-black border-black"
                      : "bg-blue-200 border-gray-400 hover:bg-white disabled:bg-gray-300 disabled:text-gray-400"
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
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

      {/* Section Select + Radio + Checkbox */}
      <div className="mt-4 flex flex-col gap-3 text-xs xl:text-sm">
        <div className="flex justify-between items-center gap-3">
          <div className="flex gap-3 items-center w-[40%]">
            <div
              className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 rounded-md ${labelColor}`}
            >
              印刷順
            </div>
            <Select
              className="w-[200px] [&>.ant-select-selector]:!bg-input"
              value={selectedOrder}
              onChange={setSelectedOrder}
              options={createOptions(printingOrderOptions)}
            />
          </div>
          <div className="flex gap-3 items-center w-[60%]">
            <div
              className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 rounded-md ${labelColor}`}
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
              className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 rounded-md ${labelColor}`}
            >
              自振顧客明細
            </div>
            <Select
              className="w-[200px] [&>.ant-select-selector]:!bg-input"
              value={selectedDetail}
              onChange={setSelectedDetail}
              options={createOptions(detailOptions)}
            />
          </div>
          <div className="flex gap-3 items-center w-[60%]">
            <div
              className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 rounded-md ${labelColor}`}
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
              className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 rounded-md ${labelColor}`}
            >
              鑑部税表現
            </div>
            <Select
              className="w-[200px] [&>.ant-select-selector]:!bg-input"
              value={selectedTaxType}
              onChange={setSelectedTaxType}
              options={createOptions(taxTypeOptions)}
            />
          </div>
          <div className="flex gap-3 items-center w-[60%]">
            <div
              className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 rounded-md ${labelColor}`}
            >
              明細順
            </div>
            <Select
              className="w-[300px] [&>.ant-select-selector]:!bg-input"
              value={selectedDetailOrder}
              onChange={setSelectedDetailOrder}
              options={createOptions(detailOrderOptions)}
            />
          </div>
        </div>

        <div className="flex gap-3 items-center w-[40%]">
          <div
            className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 rounded-md ${labelColor}`}
          >
            税取りまとめ
          </div>
          <Select
            className="w-[200px] [&>.ant-select-selector]:!bg-input"
            value={selectedTaxCollect}
            onChange={setSelectedTaxCollect}
            options={createOptions(taxCollectOptions)}
          />
        </div>

        <div className="flex gap-3 items-start">
          <div
            className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 rounded-md ${labelColor}`}
          >
            印刷項目
          </div>
          <div className="ant-checkbox-group-navigable" role="group">
            <Checkbox value="事業所名">事業所名</Checkbox>
            <Checkbox value="ガス料金名称">ガス料金名称</Checkbox>
            <Checkbox value="電話番号">電話番号</Checkbox>
            <Checkbox value="領収額">領収額</Checkbox>
            <Checkbox value="振込先">振込先</Checkbox>
            <Checkbox value="お買い上げ先">お買い上げ先</Checkbox>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-3 items-center w-[40%]">
            <div
              className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 rounded-md ${labelColor}`}
            >
              伝票メモ
            </div>
            <Select
              className="w-[200px] [&>.ant-select-selector]:!bg-input"
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
              className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 rounded-md ${labelColor}`}
            >
              印刷担当
            </div>
            <Select
              className="w-[200px] [&>.ant-select-selector]:!bg-input"
              value={printManager}
              onChange={setPrintManager}
              options={createOptions(["営業", "集金"])}
            />
          </div>
          <div className="flex gap-3 items-center w-[60%]">
            <div
              className={`flex text-center items-center justify-center font-bold w-[120px] min-w-[120px] p-1 rounded-md ${labelColor}`}
            >
              施設使用料とりまとめ名称
            </div>
            <KanaFullWidthInput
              className={` w-full`}
              value={facilityUsageFee}
              onChange={(e: string) => setFacilityUsageFee(e)}
              placeholder="ここに入力してください"
            />
          </div>
        </div>

        <div className="flex justify-between items-center gap-3">
          <div className="flex gap-3 items-center w-[40%]">
            <div
              className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 rounded-md ${labelColor}`}
            >
              領収書の担当
            </div>
            <Select
              className="w-[200px] [&>.ant-select-selector]:!bg-input"
              value={receiptOfficer}
              onChange={setReceiptOfficer}
              options={createOptions(["印刷する", "印刷しない"])}
            />
          </div>
          <div className="flex gap-3 items-center w-[60%]">
            <div
              className={`flex items-center justify-center font-bold w-[120px] min-w-[120px] p-1 rounded-md ${labelColor}`}
            >
              原料費調整通知
            </div>
            <Select
              className="w-[200px] [&>.ant-select-selector]:!bg-input"
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
