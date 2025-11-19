import React, { useEffect, useRef, useState } from "react";
import { fieldDefinitions } from "../../../constants/transaction_information";
import { processKatakanaInput } from "../../../utils/katakana";
import { Radio, Select, Button } from "antd";
import type { BaseSelectRef } from "rc-select";
import {
  HalfWidthNumberInput,
  HalfWidthKanaInput,
  KanaFullWidthInput,
} from "../../input/JapaneseInputs";

const getJapaneseInputComponent = (label: string) => {
  if (
    label.includes("コード") ||
    label.includes("番号") ||
    label.includes("順")
  ) {
    return HalfWidthNumberInput;
  }

  if (label.includes("カナ")) {
    return HalfWidthKanaInput;
  }
  return KanaFullWidthInput;
};

type TableRowData = {
  kanaName: string;
  name: string;
  address: string;
  building: string;
};

type FieldId = (typeof fieldDefinitions)[number]["id"];
type FormValues = { [key in FieldId]?: string | string[] };

const AdvancedSearchForm: React.FC<{
  onSearch: () => void;
  onReset: () => void;
  selectRef: React.RefObject<BaseSelectRef | null>;
  searchButtonRef: React.RefObject<HTMLButtonElement | null>;
  firstInputRef?: React.RefObject<HTMLInputElement | null>;
}> = ({ onSearch, onReset, selectRef, searchButtonRef, firstInputRef }) => {
  const [selectedFieldId, setSelectedFieldId] = useState<FieldId>(
    fieldDefinitions[0].id
  );
  const [formValues, setFormValues] = useState<FormValues>({});
  const currentField = fieldDefinitions.find((f) => f.id === selectedFieldId);

  const handleValueChange = (value: string, index: number | null = null) => {
    if (!currentField) return;

    let newValues =
      formValues[selectedFieldId] ||
      (currentField.type === "multi" || currentField.type === "double"
        ? []
        : "");

    if (
      currentField.type === "multi" ||
      currentField.type === "double" ||
      currentField.type === "dropdown"
    ) {
      let tempArray: string[] =
        Array.isArray(newValues) && newValues.length
          ? [...(newValues as string[])]
          : currentField.type === "dropdown"
          ? ["0", ""]
          : [];

      if (index !== null) tempArray[index] = value;
      newValues = tempArray;
    } else {
      newValues = value;
    }

    setFormValues((prev) => ({ ...prev, [selectedFieldId]: newValues }));
  };

  const handleKatakanaBlur = () => {
    if (selectedFieldId === "allTelNumber") {
      const currentValue = formValues[selectedFieldId];
      if (typeof currentValue === "string") {
        const processedValue = processKatakanaInput(currentValue);
        setFormValues((prev) => ({
          ...prev,
          [selectedFieldId]: processedValue,
        }));
      }
    }
  };

  const renderDynamicInput = (): React.ReactNode => {
    if (!currentField) return null;
    const value = formValues[currentField.id];
    const { label } = currentField;

    switch (currentField.type) {
      case "multi":
        const MultiInput = getJapaneseInputComponent(
          label
        ) as typeof HalfWidthNumberInput;
        return (
          <div className="flex items-center space-x-1 w-full">
            {(
              currentField.partSizes as unknown as {
                size: number;
                placeholder: string;
              }[]
            )?.map((part, index) => (
              <React.Fragment key={index}>
                <MultiInput
                  placeholder={part.placeholder}
                  className="border border-black p-1 text-center placeholder-black flex-1"
                  maxLength={part.size}
                  value={(Array.isArray(value) && value[index]) || ""}
                  onChange={(e) => handleValueChange(e, index)}
                />
                {index <
                  (
                    currentField.partSizes as unknown as {
                      size: number;
                      placeholder: string;
                    }[]
                  ).length -
                    1 && <span className="shrink-0">-</span>}
              </React.Fragment>
            ))}
          </div>
        );
      case "dropdown":
        return (
          <div className="flex items-center space-x-1">
            <HalfWidthNumberInput
              className="border border-black p-1 placeholder-black w-[40px]"
              placeholder="0"
              maxLength={1}
              value={(Array.isArray(value) && value[0]) || ""}
              onChange={(e) => handleValueChange(e, 0)}
            />
            <span>-</span>
            <KanaFullWidthInput
              className="border border-black p-1 flex-1"
              value={(Array.isArray(value) && value[1]) || ""}
              onChange={(e) => handleValueChange(e, 1)}
            />
          </div>
        );

      case "double":
        const isKanaSecond = currentField.placeholders?.[1]?.includes("カナ");
        const Input1 = KanaFullWidthInput;
        const Input2 = isKanaSecond ? HalfWidthKanaInput : KanaFullWidthInput;

        return (
          <div className="flex flex-col space-y-1">
            <div className="bg-gray-300 flex text-center justify-center p-1">
              {currentField.placeholders?.[0]}
            </div>
            <Input1
              className="border border-gray-400 p-1 placeholder-black"
              value={(Array.isArray(value) && value[0]) || ""}
              onChange={(e) => handleValueChange(e, 0)}
            />
            <div className="bg-gray-300 flex text-center justify-center p-1">
              {currentField.placeholders?.[1]}
            </div>
            <Input2
              className="border border-gray-400 p-1 placeholder-black"
              value={(Array.isArray(value) && value[1]) || ""}
              onChange={(e) => handleValueChange(e, 1)}
            />
          </div>
        );

      default:
        const SingleInput = getJapaneseInputComponent(
          label
        ) as React.ComponentType<any>;

        return (
          <SingleInput
            ref={firstInputRef}
            className="border border-black p-1 w-full"
            value={(typeof value === "string" && value) || ""}
            onChange={(e: string) => handleValueChange(e)}
            onBlur={handleKatakanaBlur}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter" && typeof value === "string" && value) {
                e.preventDefault();
                e.stopPropagation();
                searchButtonRef.current?.focus();
              }
            }}
          />
        );
    }
  };
  const handleResetForm = () => {
    setFormValues({});
    onReset();
  };

  return (
    <div className="flex items-start space-x-2 mt-2 p-3 border z-30 border-black rounded-md bg-gray-50">
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-600 my-1">
          検索種類 / 検索順
        </label>
        <Select
          ref={selectRef}
          className="w-40 mr-2 [&>.ant-select-selector]:!bg-input ant-select"
          value={selectedFieldId}
          onChange={(value) => setSelectedFieldId(value as FieldId)}
          options={fieldDefinitions.map((field) => ({
            label: field.label,
            value: field.id,
          }))}
        />
      </div>

      <div className="flex-grow">
        <label className="flex text-center justify-center text-xs font-semibold mb-1 p-1 bg-label">
          {currentField?.label}
        </label>
        {renderDynamicInput()}
      </div>

      <div className="flex flex-col space-y-1">
        <Button
          ref={searchButtonRef}
          onClick={onSearch}
          className="bg-label border border-black px-4 py-1 h-[26px] flex items-center justify-center shadow-md shadow-zinc-600 ant-btn"
        >
          検索
        </Button>
        <Button
          onClick={handleResetForm}
          className="bg-label border border-black px-4 py-1 h-[26px] flex items-center justify-center shadow-md shadow-zinc-600 ant-btn"
        >
          再入力
        </Button>
      </div>
    </div>
  );
};

type AdvanceSearchModalProps = {
  showAdvanceSearch: boolean;
  setShowAdvanceSearch: React.Dispatch<React.SetStateAction<boolean>>;
  onRowEnter: () => void;
};

const AdvanceSearchModal: React.FC<AdvanceSearchModalProps> = ({
  showAdvanceSearch,
  setShowAdvanceSearch,
  onRowEnter,
}) => {
  const [searchMode, setSearchMode] = useState<string>("overall");
  const [tableData, setTableData] = useState<TableRowData[]>([]);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const radioGroupRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<BaseSelectRef>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    const mockData = Array.from({ length: 12 }).map((_, index) => ({
      kanaName: `カナ ${index + 1}`,
      name: `氏名 ${index + 1}`,
      address: `住所 ${index + 1}`,
      building: `建物 ${index + 1}`,
    }));
    setTableData(mockData);
    setActiveIndex(0);
  };

  const handleReset = () => {
    setTableData([]);
    setActiveIndex(null);
  };

  useEffect(() => {
    if (showAdvanceSearch && radioGroupRef.current) {
      const checkedRadio =
        radioGroupRef.current.querySelector<HTMLInputElement>(
          'input[type="radio"]:checked'
        );
      const firstRadio = radioGroupRef.current.querySelector<HTMLInputElement>(
        'input[type="radio"]'
      );

      const radioToFocus = checkedRadio || firstRadio;

      if (radioToFocus) {
        setTimeout(() => radioToFocus.focus(), 150);
      }
    }
  }, [showAdvanceSearch]);

  useEffect(() => {
    if (activeIndex !== null && tbodyRef.current) {
      const row = tbodyRef.current.children[activeIndex] as HTMLElement;
      if (row) {
        row.focus();
        row.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeIndex]);

  const handleTableKeyDown = (
    e: React.KeyboardEvent<HTMLTableSectionElement>
  ) => {
    if (activeIndex === null) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex(Math.min(activeIndex + 1, tableData.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex(Math.max(activeIndex - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        onRowEnter();
        setShowAdvanceSearch(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const container = modalContainerRef.current;
    if (!container) return;

    const handleModalKeyDown = (e: KeyboardEvent) => {
      if (/^F\d{1,2}$/.test(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      const activeElement = document.activeElement as HTMLElement;

      if (activeElement.closest("tbody")) {
        return;
      }

      const allElements = Array.from(
        container.querySelectorAll(
          'input[type="radio"]:not([disabled]),' +
            ".ant-select-selection-search-input:not([disabled])," +
            'input[type="text"]:not([disabled]),' +
            "button:not([disabled])"
        )
      ) as HTMLElement[];

      const focusableElements = allElements.filter((el) => {
        if (
          el.tagName === "INPUT" &&
          (el as HTMLInputElement).type === "radio"
        ) {
          const radioGroup = el.closest(".ant-radio-group");
          if (!radioGroup) {
            return true;
          }
          const checkedRadio = radioGroup.querySelector(
            'input[type="radio"]:checked'
          ) as HTMLInputElement | null;

          if (checkedRadio) {
            return el === checkedRadio;
          } else {
            const firstRadioInGroup = radioGroup.querySelector(
              'input[type="radio"]'
            );
            return el === firstRadioInGroup;
          }
        }
        return true;
      });

      let currentIndex = focusableElements.indexOf(activeElement);

      if (activeElement?.closest(".ant-select-open")) {
        if (e.key !== "Tab") {
          return;
        }
      }

      if (e.key === "Tab") {
        e.preventDefault();
        e.stopPropagation();

        const total = focusableElements.length;
        if (total === 0) return;
        let nextIndex = e.shiftKey
          ? (currentIndex - 1 + total) % total
          : (currentIndex + 1) % total;
        focusableElements[nextIndex]?.focus();
        return;
      }

      if (e.key === " " || e.key === "Spacebar") {
        const isButton = activeElement?.closest(".ant-btn");
        const isSelect = activeElement?.closest(".ant-select");

        if (isButton || isSelect) {
          return;
        }

        const isInput =
          activeElement.tagName === "INPUT" &&
          (activeElement as HTMLInputElement).type === "text";
        if (isInput) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (e.key === "Enter") {
        const isButton = activeElement?.closest(".ant-btn");
        const isSelect = activeElement?.closest(".ant-select");
        const isDynamicInput =
          activeElement.tagName === "INPUT" &&
          (activeElement as HTMLInputElement).type === "text" &&
          !activeElement?.closest(".ant-select");

        if (isButton || isSelect) {
          return;
        }
      }

      const radioGroup = activeElement?.closest(".ant-radio-group");
      if (radioGroup) {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          e.stopPropagation();

          const radios = Array.from(
            radioGroup.querySelectorAll('input[type="radio"]')
          ) as HTMLInputElement[];
          let currentRadioIndex = radios.findIndex((r) => r === activeElement);
          if (currentRadioIndex === -1) {
            const checkedRadio = radioGroup.querySelector(
              'input[type="radio"]:checked'
            ) as HTMLInputElement | null;
            currentRadioIndex = radios.findIndex((r) => r === checkedRadio);
            if (currentRadioIndex === -1) currentRadioIndex = 0;
          }
          const totalRadios = radios.length;

          let nextRadioIndex;

          if (e.key === "ArrowRight") {
            nextRadioIndex = (currentRadioIndex + 1) % totalRadios;
          } else {
            // ArrowLeft
            nextRadioIndex =
              (currentRadioIndex - 1 + totalRadios) % totalRadios;
          }

          radios[nextRadioIndex]?.focus();
          radios[nextRadioIndex]?.click();
          return;
        }
      }

      const tagName = activeElement?.tagName.toUpperCase();
      const isInput = tagName === "INPUT";
      if (isInput && activeElement.getAttribute("type") === "text") {
        const isInsideSelect = activeElement?.closest(".ant-select");
        if (
          !isInsideSelect &&
          (e.key === "ArrowLeft" || e.key === "ArrowRight")
        ) {
          // Cho phép người dùng di chuyển con trỏ trong input text thông thường.
          return;
        }
      }

      const navKeys = [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Enter",
      ];
      if (!navKeys.includes(e.key)) {
        e.stopPropagation();
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      if (currentIndex === -1) {
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
        return;
      }

      let nextIndex = currentIndex;
      const total = focusableElements.length;

      // Next: ArrowDown, ArrowRight, Enter
      if (
        e.key === "ArrowDown" ||
        e.key === "Enter" ||
        e.key === "ArrowRight"
      ) {
        nextIndex = (currentIndex + 1) % total;
      }
      // Prev: ArrowUp, ArrowLeft
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        nextIndex = (currentIndex - 1 + total) % total;
      }

      if (navKeys.includes(e.key)) {
        focusableElements[nextIndex]?.focus();
      }
    };

    container.addEventListener("keydown", handleModalKeyDown, true);

    return () => {
      container.removeEventListener("keydown", handleModalKeyDown, true);
    };
  }, []);

  return (
    <div
      ref={modalContainerRef}
      className="p-4 bg-white text-black w-full text-sm advance-search-modal rounded-lg"
    >
      <style>{`
        .advance-search-modal input:focus,
        .advance-search-modal textarea:focus,
        .advance-search-modal .ant-select-focused .ant-select-selector {
          background-color: #ffffcc !important;
          outline: 2px solid #4a90e2;
        }
      `}</style>

      <div className="bg-label border border-black p-2 text-center font-bold mb-2 rounded-lg">
        顧客検索
      </div>

      <div className="flex items-center space-x-6 bg-label p-2 border border-black rounded-lg">
        <div className="flex items-center space-x-2">
          <label className="font-semibold">事務所</label>
          <span>0000-000 全指定</span>
        </div>

        <Radio.Group
          ref={radioGroupRef}
          onChange={(e) => setSearchMode(e.target.value)}
          value={searchMode}
          className="flex items-center space-x-4 ant-radio-group"
        >
          {[
            { id: "overall", label: "全体検索" },
            { id: "collective", label: "集合検索" },
            { id: "bulk", label: "バルク" },
            { id: "kerosene", label: "灯油" },
          ].map((mode) => (
            <Radio key={mode.id} value={mode.id}>
              {mode.label}
            </Radio>
          ))}
        </Radio.Group>
      </div>

      <AdvancedSearchForm
        onSearch={handleSearch}
        onReset={handleReset}
        selectRef={selectRef}
        searchButtonRef={searchButtonRef}
        firstInputRef={firstInputRef}
      />

      <div
        className="overflow-auto border border-black mt-2 rounded-lg"
        style={{ height: "200px" }}
      >
        <table className="min-w-full border-collapse border border-black text-sm">
          <thead className="sticky top-0 bg-label z-50">
            <tr>
              <th className="border border-black p-1">カナ氏名</th>
              <th className="border border-black p-1">氏名</th>
              <th className="border border-black p-1">住所 / 番地</th>
              <th className="border border-black p-1">住所名称 / 部屋番号</th>
            </tr>
          </thead>
          <tbody ref={tbodyRef} onKeyDown={handleTableKeyDown} tabIndex={-1}>
            {tableData.map((row, idx) => (
              <tr
                key={idx}
                className={`outline-none ${
                  activeIndex === idx ? "bg-blue-300" : "hover:bg-blue-200"
                }`}
                onClick={() => {
                  setActiveIndex(idx);
                  onRowEnter();
                  setShowAdvanceSearch(false);
                }}
                tabIndex={-1}
              >
                <td className="relative border border-black p-1 pl-8 cursor-pointer">
                  {row.kanaName}
                </td>
                <td className="border border-black p-1 cursor-pointer">
                  {row.name}
                </td>
                <td className="border border-black p-1 cursor-pointer">
                  {row.address}
                </td>
                <td className="border border-black p-1 cursor-pointer">
                  {row.building}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-2">
        <Button
          onClick={() => setShowAdvanceSearch(false)}
          className="w-20 border border-black bg-label px-2 py-1 flex justify-center shadow-md shadow-zinc-600 ant-btn"
        >
          閉じる
        </Button>
      </div>
    </div>
  );
};

export default AdvanceSearchModal;
