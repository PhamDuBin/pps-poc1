import React, { useEffect, useRef, useState } from "react";
import { fieldDefinitions } from "../../../constants/transaction_information";

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
  selectRef: React.RefObject<HTMLSelectElement | null>;
  searchButtonRef: React.RefObject<HTMLButtonElement | null>;
}> = ({ onSearch, onReset, selectRef, searchButtonRef }) => {
  const [selectedFieldId, setSelectedFieldId] = useState<FieldId>(
    fieldDefinitions[0].id
  );
  const [formValues, setFormValues] = useState<FormValues>({});
  const currentField = fieldDefinitions.find((f) => f.id === selectedFieldId);

  const firstInputRef = useRef<HTMLInputElement>(null);

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
      let tempArray: string[];

      if (Array.isArray(newValues)) {
        tempArray = [...newValues];
      } else {
        tempArray = currentField.type === "dropdown" ? ["0", ""] : [];
      }

      if (index !== null) {
        tempArray[index] = value;
      }

      newValues = tempArray;
    } else {
      newValues = value;
    }

    setFormValues((prev) => ({ ...prev, [selectedFieldId]: newValues }));
  };

  const renderDynamicInput = (): React.ReactNode => {
    if (!currentField) return null;
    const value = formValues[currentField.id];

    switch (currentField.type) {
      case "multi":
        return (
          <div className="flex items-center space-x-1">
            {currentField.partSizes?.map((size, index) => (
              <React.Fragment key={index}>
                <input
                  type="text"
                  placeholder="000"
                  className="border border-black p-1 text-center placeholder-black"
                  style={{ width: `${size}px` }}
                  value={(Array.isArray(value) && value[index]) || ""}
                  onChange={(e) => handleValueChange(e.target.value, index)}
                />
                {index < currentField.partSizes.length - 1 && <span>-</span>}
              </React.Fragment>
            ))}
          </div>
        );

      case "dropdown":
        return (
          <div className="flex items-center space-x-1">
            <input
              type="text"
              className="border border-black p-1 placeholder-black w-[40px]"
              placeholder="0"
            />
            <span>-</span>
            <input
              type="text"
              className="border border-black p-1 flex-1"
              value={(Array.isArray(value) && value[1]) || ""}
              onChange={(e) => handleValueChange(e.target.value, 1)}
            />
          </div>
        );

      case "double":
        return (
          <div className="flex flex-col space-y-1">
            <div className="bg-gray-300 flex text-center justify-center p-1">
              {currentField.placeholders?.[0]}
            </div>
            <input
              type="text"
              className="border border-gray-400 p-1 placeholder-black"
              value={(Array.isArray(value) && value[0]) || ""}
              onChange={(e) => handleValueChange(e.target.value, 0)}
            />
            <div className="bg-gray-300 flex text-center justify-center p-1">
              {currentField.placeholders?.[1]}
            </div>
            <input
              type="text"
              className="border border-gray-400 p-1 placeholder-black"
              value={(Array.isArray(value) && value[1]) || ""}
              onChange={(e) => handleValueChange(e.target.value, 1)}
            />
          </div>
        );

      default:
        return (
          <input
            ref={firstInputRef}
            type="text"
            className="border border-black p-1 w-full"
            value={(typeof value === "string" && value) || ""}
            onChange={(e) => handleValueChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && typeof value === "string" && value) {
                e.preventDefault();
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
        <select
          ref={selectRef}
          className="border border-black p-1 mt-1 h-[30px]"
          value={selectedFieldId}
          onChange={(e) => setSelectedFieldId(e.target.value as FieldId)}
        >
          {fieldDefinitions.map((field) => (
            <option key={field.id} value={field.id}>
              {field.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-grow">
        <label className="flex text-center justify-center text-xs font-semibold mb-1 p-1 bg-label">
          {currentField?.label}
        </label>
        {renderDynamicInput()}
      </div>

      <div className="flex flex-col space-y-1">
        <button
          ref={searchButtonRef}
          onClick={onSearch}
          className="bg-label border border-black px-4 py-1 h-[26px] flex items-center justify-center shadow-md shadow-zinc-600"
        >
          検索
        </button>
        <button
          onClick={handleResetForm}
          className="bg-label border border-black px-4 py-1 h-[26px] flex items-center justify-center shadow-md shadow-zinc-600"
        >
          再入力
        </button>
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
  const selectRef = useRef<HTMLSelectElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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

  // Focus on first radio button when modal opens
  useEffect(() => {
    if (radioGroupRef.current) {
      const firstRadio = radioGroupRef.current.querySelector<HTMLInputElement>(
        'input[type="radio"]'
      );
      if (firstRadio) {
        setTimeout(() => {
          firstRadio.focus();
        }, 150);
      }
    }
  }, []);

  useEffect(() => {
    if (activeIndex !== null && tbodyRef.current) {
      const row = tbodyRef.current.children[activeIndex] as HTMLElement;
      if (row) {
        row.focus();
        row.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
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
        const nextIndex = Math.min(activeIndex + 1, tableData.length - 1);
        setActiveIndex(nextIndex);
        break;
      case "ArrowUp":
        e.preventDefault();
        const prevIndex = Math.max(activeIndex - 1, 0);
        setActiveIndex(prevIndex);
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

  // Add radio navigation logic
  useEffect(() => {
    if (!radioGroupRef.current) return;

    const radios = Array.from(
      radioGroupRef.current.querySelectorAll<HTMLInputElement>(
        'input[type="radio"]'
      )
    );

    const handleRadioKeyDown = (e: KeyboardEvent, index: number) => {
      // Block ArrowUp
      if (e.key === "ArrowUp") {
        e.preventDefault();
        return;
      }

      // Left/Right: cycle through radio buttons
      if (["ArrowRight", "ArrowLeft"].includes(e.key)) {
        e.preventDefault();
        let nextIndex = index;

        if (e.key === "ArrowRight") {
          nextIndex = (index + 1) % radios.length;
        } else if (e.key === "ArrowLeft") {
          nextIndex = (index - 1 + radios.length) % radios.length;
        }

        const nextRadio = radios[nextIndex];
        if (nextRadio) {
          nextRadio.focus();
          nextRadio.click();
          nextRadio.checked = true;
          const event = new Event("change", { bubbles: true });
          nextRadio.dispatchEvent(event);
        }
      }

      // Enter/Tab/ArrowDown: move to select field
      if (["Enter", "Tab", "ArrowDown"].includes(e.key) && !e.shiftKey) {
        e.preventDefault();
        selectRef.current?.focus();
      }
    };

    const listeners: Array<{
      element: HTMLInputElement;
      handler: (e: KeyboardEvent) => void;
    }> = [];

    radios.forEach((radio, index) => {
      const handler = (e: KeyboardEvent) => handleRadioKeyDown(e, index);
      radio.addEventListener("keydown", handler);
      listeners.push({ element: radio, handler });
    });

    return () => {
      listeners.forEach(({ element, handler }) => {
        element.removeEventListener("keydown", handler);
      });
    };
  }, [searchMode]);

  // Focus trap: prevent focus from leaving modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalRef.current) return;

      // Get all focusable elements within modal
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      const focusableArray = Array.from(focusableElements);
      const firstElement = focusableArray[0];
      const lastElement = focusableArray[focusableArray.length - 1];

      // Handle Tab key
      if (e.key === "Tab") {
        if (e.shiftKey) {
          // Shift + Tab: if on first element, go to last
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab: if on last element, go to first
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }

      // Block all arrow key navigation when not handled by specific handlers
      // This prevents focus from escaping the modal
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        const activeElement = document.activeElement;

        // Allow arrow keys only within modal
        if (activeElement && !modalRef.current.contains(activeElement)) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className="p-4 bg-white text-black w-full text-sm advance-search-modal"
    >
      <style>{`
        .advance-search-modal input:focus,
        .advance-search-modal textarea:focus,
        .advance-search-modal select:focus {
          background-color: #ffffcc !important;
          outline: 2px solid #4a90e2;
        }
      `}</style>
      <div className="bg-label border border-black p-2 text-center font-bold mb-2">
        顧客検索
      </div>

      {/* Search mode */}
      <div className="flex items-center space-x-6 bg-label p-2 border border-black">
        <div className="flex items-center space-x-2">
          <label className="font-semibold">事務所</label>
          <span>0000-000 全指定</span>
        </div>

        <div ref={radioGroupRef} className="flex items-center space-x-4">
          {[
            { id: "overall", label: "全体検索" },
            { id: "collective", label: "集合検索" },
            { id: "bulk", label: "バルク" },
            { id: "kerosene", label: "灯油" },
          ].map((mode) => (
            <div key={mode.id} className="flex items-center">
              <input
                type="radio"
                id={mode.id}
                name="searchMode"
                value={mode.id}
                checked={searchMode === mode.id}
                onChange={(e) => setSearchMode(e.target.value)}
                className="mr-1"
              />
              <label htmlFor={mode.id}>{mode.label}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <AdvancedSearchForm
        onSearch={handleSearch}
        onReset={handleReset}
        selectRef={selectRef}
        searchButtonRef={searchButtonRef}
      />

      {/* Table */}
      <div
        className="overflow-auto border border-black mt-2"
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
          <tbody ref={tbodyRef} onKeyDown={handleTableKeyDown}>
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
                <td
                  onClick={() => setShowAdvanceSearch(false)}
                  className="relative  border border-black p-1 pl-8 cursor-pointer"
                >
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3" />
                  {row.kanaName}
                </td>
                <td
                  onClick={() => setShowAdvanceSearch(false)}
                  className=" border border-black p-1 cursor-pointer"
                >
                  {row.name}
                </td>
                <td
                  onClick={() => setShowAdvanceSearch(false)}
                  className=" border border-black p-1 cursor-pointer"
                >
                  {row.address}
                </td>
                <td
                  onClick={() => setShowAdvanceSearch(false)}
                  className=" border border-black p-1 cursor-pointer"
                >
                  {row.building}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Close button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowAdvanceSearch(false)}
          className="w-20 border border-black bg-label px-2 py-1 flex mt-2 justify-center shadow-md shadow-zinc-600"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default AdvanceSearchModal;
