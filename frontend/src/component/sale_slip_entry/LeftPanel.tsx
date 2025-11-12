import React, { useRef } from "react";

//■左カラム顧客検索＆情報表示ランチャー
import { useEffect, useState } from "react";
import AdvanceSearchModal from "../transaction_information/1.1.1_03/AdvanceSearchModal";
import CustomSelect from "../../components/CustomSelect";
import {
  extractHalfWidthDigits,
  handleFormatting,
  allowDecimalInput,
} from "../../utils/InputHandlers";
import { processKatakanaInput } from "../../utils/katakana";
import {
  kanaButtons,
  tableHeaders,
  tableData,
  colWidths,
  fieldDefinitionsLeftPanel,
} from "../../constants/sale_slip_entry";

type LeftPanelProps = {
  showAdvanceSearch: boolean;
  setShowAdvanceSearch: React.Dispatch<React.SetStateAction<boolean>>;
  showCustomer: boolean;
  setShowCustomer: React.Dispatch<React.SetStateAction<boolean>>;
};

const LeftPanel: React.FC<LeftPanelProps> = ({
  showAdvanceSearch,
  setShowAdvanceSearch,
  showCustomer,
  setShowCustomer,
}) => {
  const [postcode1, setPostcode1] = useState("");
  const [postcode2, setPostcode2] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [showDepart, setShowDepart] = useState(false);
  const [id1, setId1] = useState("");
  const [id2, setId2] = useState("");
  const [id3, setId3] = useState("");
  const [selected, setSelected] = useState("1");
  const [selectedRow, setSelectedRow] = useState(false);
  const [kanaInput, setKanaInput] = useState("");
  const [showJimushoDropdown, setShowJimushoDropdown] = useState(false);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [kanaSelectValue, setKanaSelectValue] = useState("0");
  const [displayOrderValue, setDisplayOrderValue] = useState("0");

  // Dummy data for dropdowns
  const jimushoOptions = [
    { code1: "0001", code2: "001", name: "東京23区担当営業所" },
    { code1: "0002", code2: "002", name: "横浜担当営業所" },
    { code1: "0003", code2: "003", name: "大阪担当営業所" },
    { code1: "0004", code2: "004", name: "名古屋担当営業所" },
  ];

  const customerOptions = [
    { code1: "000000", code2: "000", name: "山田　太郎" },
    { code1: "000001", code2: "001", name: "佐藤　花子" },
    { code1: "000002", code2: "002", name: "鈴木　一郎" },
    { code1: "000003", code2: "003", name: "田中　次郎" },
  ];

  const handleSearch = (...ids: string[]) => {
    if (ids.some((id) => id)) {
      setShowCustomer(true);
    } else {
      setShowCustomer(false);
    }
  };

  const handleSearchDepartment = (postcode1: string, postcode2: string) => {
    if (postcode1 && postcode2) {
      setShowDepart(true);
      setTimeout(() => {
        resetBtn.current?.focus();
      }, 0);
    } else {
      setShowDepart(false);
    }
  };

  const resetBtn = useRef<HTMLButtonElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const customerCodeSelectRef = useRef<HTMLSelectElement>(null);
  const kanaInputRef = useRef<HTMLInputElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);
  const radio1Ref = useRef<HTMLInputElement>(null);
  const radio2Ref = useRef<HTMLInputElement>(null);
  const advancedSearchButtonRef = useRef<HTMLButtonElement>(null);
  const kanaSelectRef = useRef<HTMLSelectElement>(null);

  const handleTableKeyDown = (e: React.KeyboardEvent) => {
    if (activeIndex === null) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = Math.min(activeIndex + 1, tableData.length - 1);
      setActiveIndex(nextIndex);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = Math.max(activeIndex - 1, 0);
      setActiveIndex(prevIndex);
    } else if (e.key === "Enter") {
      e.preventDefault();
      setSelectedRow(true);
    }
  };

  const handleRadioKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentValue: string
  ) => {
    const radios = [
      { ref: radio1Ref, value: "0" },
      { ref: radio2Ref, value: "1" },
    ];
    const currentIndex = radios.findIndex((r) => r.value === currentValue);

    // Left/Right: toggle between radios
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      e.stopPropagation();
      let nextIndex = currentIndex;

      if (e.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % radios.length;
      } else if (e.key === "ArrowLeft") {
        nextIndex = (currentIndex - 1 + radios.length) % radios.length;
      }

      const nextRadio = radios[nextIndex];
      if (nextRadio.ref.current) {
        nextRadio.ref.current.focus();
        nextRadio.ref.current.click();
        setSelected(nextRadio.value);
      }
    }
    // Up/Down/Tab/Enter: allow default navigation behavior (change element)
  };

  useEffect(() => {
    if (showTable) {
      setActiveIndex(0);
    } else {
      setActiveIndex(null);
    }
  }, [showTable]);

  useEffect(() => {
    if (activeIndex !== null && tableBodyRef.current) {
      const row = tableBodyRef.current.children[activeIndex] as HTMLElement;
      if (row) {
        row.focus();
        row.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);
  useEffect(() => {
    if (showCustomer) {
      setTimeout(() => {
        kanaInputRef.current?.focus();
      }, 0);
    }
  }, [showCustomer]);

  type FieldId = (typeof fieldDefinitionsLeftPanel)[number]["id"];
  type FormValues = { [key in FieldId]?: string | string[] };

  const [selectedFieldId, setSelectedFieldId] = useState<FieldId>(
    fieldDefinitionsLeftPanel[0].id
  );
  const [formValues, setFormValues] = useState<FormValues>({});
  const currentField = fieldDefinitionsLeftPanel.find(
    (f) => f.id === selectedFieldId
  );

  const handleValueChange = (
    value: string,
    index: number | null = null
  ): void => {
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

      if (currentField.type === "multi") {
        if (index === 0) setId1(value);
        if (index === 1) setId2(value);
        if (index === 2) setId3(value);
      }
    } else {
      newValues = value;
      setId1(value);
    }
    setFormValues((prev) => ({ ...prev, [selectedFieldId]: newValues }));
  };
  const handleCustomerCodeKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(id1, id2, id3);
    }
  };

  const renderDynamicInput = (): React.ReactNode => {
    if (!currentField) return null;
    const value = formValues[currentField.id];
    switch (currentField.type) {
      case "multi":
        return (
          <div className="flex items-center space-x-1 relative">
            {currentField.partSizes?.map((size, index) => {
              // Placeholder khác nhau cho từng input
              const placeholders = ["000000", "000", "000"];
              const placeholder = placeholders[index] || "000";
              const maxLength = placeholder.length;
              return (
                <React.Fragment key={index}>
                  <input
                    type="text"
                    placeholder={placeholder}
                    maxLength={maxLength}
                    disabled={
                      index > 0 && !(Array.isArray(value) && value[index - 1])
                    }
                    className="w-20 border border-black p-1 text-center placeholder-gray-400 bg-input disabled:bg-gray-200 disabled:cursor-not-allowed"
                    style={{ width: `${size}px` }}
                    value={(Array.isArray(value) && value[index]) || ""}
                    onChange={(e) =>
                      handleValueChange(
                        extractHalfWidthDigits(e.target.value),
                        index
                      )
                    }
                    onBlur={(e) => {
                      // Auto padding với số 0 khi blur
                      const currentValue = e.target.value;
                      if (currentValue && currentValue.length > 0) {
                        const paddedValue = currentValue.padStart(
                          maxLength,
                          "0"
                        );
                        handleValueChange(paddedValue, index);
                      }
                    }}
                    onKeyDown={(e) => {
                      handleCustomerCodeKeyDown(e);
                      handleFormatting(e, extractHalfWidthDigits);
                    }}
                  />
                  {index < currentField.partSizes.length - 1 && <span>-</span>}
                </React.Fragment>
              );
            })}
            <button
              onClick={() => handleSearch(id1, id2, id3)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch(id1, id2, id3);
                }
              }}
              className=" w-[20px] h-[20px] mt-1 flex items-center justify-center px-1 bg-white border border-gray-500 cursor-pointer"
            >
              ▼
            </button>
            {showCustomerDropdown && (
              <div className="absolute top-full left-0 w-[300px] bg-white border border-black shadow-lg z-50 max-h-40 overflow-y-auto mt-1">
                {customerOptions.map((option, index) => (
                  <div
                    key={index}
                    className="px-2 py-1 hover:bg-blue-200 cursor-pointer flex justify-between"
                    onClick={() => {
                      const newValue =
                        currentField.partSizes?.length === 3
                          ? [option.code1, option.code2, ""]
                          : [option.code1, option.code2];
                      setFormValues((prev) => ({
                        ...prev,
                        [selectedFieldId]: newValue,
                      }));
                      setId1(option.code1);
                      setId2(option.code2);
                      setShowCustomerDropdown(false);
                      handleSearch(option.code1, option.code2);
                    }}
                  >
                    <span>
                      {option.code1}-{option.code2}
                    </span>
                    <span>{option.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "dropdown":
        return (
          <div className="flex items-center space-x-1">
            <input
              type="text"
              maxLength={6}
              className="border border-black p-1 placeholder-gray-400 w-20 bg-input"
              onChange={(e) => {
                setId1(extractHalfWidthDigits(e.target.value));
                handleValueChange(extractHalfWidthDigits(e.target.value), 0);
              }}
              onBlur={(e) => {
                const currentValue = e.target.value;
                if (currentValue && currentValue.length > 0) {
                  const paddedValue = currentValue.padStart(6, "0");
                  setId1(paddedValue);
                  handleValueChange(paddedValue, 0);
                }
              }}
              placeholder="000000"
              onKeyDown={(e) => {
                handleCustomerCodeKeyDown(e);
                handleFormatting(e, extractHalfWidthDigits);
              }}
            />
            <span> - </span>
            <input
              type="text"
              maxLength={6}
              disabled={!id1}
              className="border w-20 border-gray-400 p-1 bg-input disabled:bg-gray-200 disabled:cursor-not-allowed"
              value={(Array.isArray(value) && value[1]) || ""}
              onChange={(e) => {
                setId2(extractHalfWidthDigits(e.target.value));
                handleValueChange(extractHalfWidthDigits(e.target.value), 1);
              }}
              onBlur={(e) => {
                const currentValue = e.target.value;
                if (currentValue && currentValue.length > 0) {
                  const paddedValue = currentValue.padStart(6, "0");
                  setId2(paddedValue);
                  handleValueChange(paddedValue, 1);
                }
              }}
              placeholder="000000"
              onKeyDown={(e) => {
                handleCustomerCodeKeyDown(e);
                handleFormatting(e, extractHalfWidthDigits);
              }}
            />
            <button
              onClick={() => handleSearch(id1, id2)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch(id1, id2);
                }
              }}
              className=" w-[20px] h-[20px] mt-1 flex items-center justify-center px-1 bg-white border border-gray-500 cursor-pointer"
            >
              ▼
            </button>
          </div>
        );
      case "double":
        return (
          <div className="flex gap-1">
            <input
              type="text"
              maxLength={6}
              className="border w-20 border-gray-400 p-1 placeholder-gray-400 bg-input"
              value={(Array.isArray(value) && value[0]) || ""}
              onChange={(e) => {
                setId1(extractHalfWidthDigits(e.target.value));
                handleValueChange(extractHalfWidthDigits(e.target.value), 0);
              }}
              onBlur={(e) => {
                const currentValue = e.target.value;
                if (currentValue && currentValue.length > 0) {
                  const paddedValue = currentValue.padStart(6, "0");
                  setId1(paddedValue);
                  handleValueChange(paddedValue, 0);
                }
              }}
              placeholder="000000"
              onKeyDown={(e) => {
                handleCustomerCodeKeyDown(e);
                handleFormatting(e, extractHalfWidthDigits);
              }}
            />
            <span> - </span>
            <input
              type="text"
              maxLength={6}
              disabled={!id1}
              className="border w-20 border-gray-400 p-1 placeholder-gray-400 bg-input disabled:bg-gray-200 disabled:cursor-not-allowed"
              value={(Array.isArray(value) && value[1]) || ""}
              onChange={(e) => {
                setId2(extractHalfWidthDigits(e.target.value));
                handleValueChange(extractHalfWidthDigits(e.target.value), 1);
              }}
              onBlur={(e) => {
                const currentValue = e.target.value;
                if (currentValue && currentValue.length > 0) {
                  const paddedValue = currentValue.padStart(6, "0");
                  setId2(paddedValue);
                  handleValueChange(paddedValue, 1);
                }
              }}
              placeholder="000000"
              onKeyDown={(e) => {
                handleCustomerCodeKeyDown(e);
                handleFormatting(e, extractHalfWidthDigits);
              }}
            />
            <button
              onClick={() => handleSearch(id1, id2)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch(id1, id2);
                }
              }}
              className=" w-[20px] h-[20px] mt-1 flex items-center justify-center px-1 bg-white border border-gray-500 cursor-pointer"
            >
              ▼
            </button>
          </div>
        );
      default:
        return (
          <>
            <input
              type="text"
              className="border border-black p-1 w-44 mr-1 bg-input"
              value={(typeof value === "string" && value) || ""}
              onChange={(e) => {
                setId1(extractHalfWidthDigits(e.target.value));
                handleValueChange(extractHalfWidthDigits(e.target.value), 1);
              }}
              onKeyDown={(e) => {
                handleCustomerCodeKeyDown(e);
                handleFormatting(e, extractHalfWidthDigits);
              }}
            />
            <button
              onClick={() => handleSearch(id1)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch(id1);
                }
              }}
              className=" w-[20px] h-[20px] mt-1 flex items-center justify-center px-1 bg-white border border-gray-500 cursor-pointer"
            >
              ▼
            </button>
          </>
        );
    }
  };

  const formatMultiValue = (fieldId: FieldId) => {
    const value = formValues[fieldId];
    if (Array.isArray(value)) {
      return value.filter(Boolean).join(" - ");
    }
    return value || "";
  };
  const handleJimushoKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchDepartment(postcode1, postcode2);
      customerCodeSelectRef.current?.focus();
    }
  };
  const handleKanaKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (showCustomer && kanaInput) {
        setShowTable(true);
      }
    }
  };

  const handleKatakanaBlur = () => {
    const processedValue = processKatakanaInput(kanaInput);
    setKanaInput(processedValue);
  };

  const handleShowHardcodedCustomer = () => {
    setId1("000000");
    setId2("000");
    setPostcode1("000000");
    setPostcode2("000");
    setShowCustomer(true);
    setShowDepart(true);
  };

  return (
    <div className="h-screen p-3 bg-bg-alt border-2 border-gray-400 font-sans sale-slip-left-panel">
      <style>{`
        .sale-slip-left-panel input:focus,
        .sale-slip-left-panel textarea:focus,
        .sale-slip-left-panel select:focus {
          background-color: #ffffcc !important;
          outline: 2px solid #4a90e2;
        }
      `}</style>
      <div className="text-center h-8 text-sm bg-label py-1 font-semibold border border-black">
        {showDepart || showCustomer ? "顧客情報" : "顧客検索"}
      </div>
      <div className="mb-2 items-center flex-col relative">
        {/* department */}
        <div className="text-sm flex items-center flex-row py-2">
          {!showDepart ? (
            <>
              <label className="bg-label p-1 font-bold w-24 text-center mr-2">
                事務所
              </label>
              <div className="relative flex items-center">
                <input
                  ref={firstInputRef}
                  type="text"
                  placeholder="0000"
                  maxLength={4}
                  value={postcode1}
                  className="w-20 p-1 border border-gray-500 bg-input"
                  onChange={(e) =>
                    setPostcode1(extractHalfWidthDigits(e.target.value))
                  }
                  onBlur={(e) => {
                    const currentValue = e.target.value;
                    if (currentValue && currentValue.length > 0) {
                      setPostcode1(currentValue.padStart(4, "0"));
                    }
                  }}
                  onKeyDown={(e) => {
                    handleJimushoKeyDown(e);
                    allowDecimalInput(e);
                  }}
                />
                <span className="mx-1">-</span>
                <input
                  type="text"
                  placeholder="000"
                  maxLength={3}
                  value={postcode2}
                  disabled={!postcode1}
                  className="w-20 p-1 border border-gray-500 bg-input disabled:bg-gray-200 disabled:cursor-not-allowed"
                  onChange={(e) =>
                    setPostcode2(extractHalfWidthDigits(e.target.value))
                  }
                  onBlur={(e) => {
                    const currentValue = e.target.value;
                    if (currentValue && currentValue.length > 0) {
                      setPostcode2(currentValue.padStart(3, "0"));
                    }
                  }}
                  onKeyDown={(e) => {
                    handleJimushoKeyDown(e);
                    allowDecimalInput(e);
                  }}
                />
                <button
                  onKeyDown={(e) => {
                    handleJimushoKeyDown(e);
                  }}
                  onClick={() => {
                    handleSearchDepartment(postcode1, postcode2);
                    customerCodeSelectRef.current?.focus();
                  }}
                  className="mx-1 w-[20px] h-[20px] flex items-center justify-center px-1 bg-white border border-gray-500 cursor-pointer"
                >
                  ▼
                </button>
                {showJimushoDropdown && (
                  <div className="absolute top-full left-0 w-[300px] bg-white border border-black shadow-lg z-50 max-h-40 overflow-y-auto mt-1">
                    {jimushoOptions.map((option, index) => (
                      <div
                        key={index}
                        className="px-2 py-1 hover:bg-blue-200 cursor-pointer flex justify-between"
                        onClick={() => {
                          setPostcode1(option.code1);
                          setPostcode2(option.code2);
                          setShowJimushoDropdown(false);
                          handleSearchDepartment(option.code1, option.code2);
                        }}
                      >
                        <span>
                          {option.code1}-{option.code2}
                        </span>
                        <span>{option.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="w-full font-medium flex justify-between h-8 items-center">
                <div className="flex gap-20">
                  <span>
                    {postcode1} - {postcode2}
                  </span>
                  <span>東京23区担当営業所</span>
                </div>
                <button
                  ref={resetBtn}
                  onClick={() => {
                    setShowDepart(false);
                    // Focus back to first input after re-search
                    setTimeout(() => {
                      firstInputRef.current?.focus();
                    }, 0);
                  }}
                  className=" border border-black rounded p-1 shadow-md shadow-zinc-600"
                >
                  <span className="w-[25%] m-2">再検索</span>
                </button>
              </div>
            </>
          )}
        </div>
        {/* Customer */}
        <div
          className={`text-sm font-medium items-center flex-row py-2 ${
            showCustomer ? "" : "flex"
          }`}
        >
          {!showCustomer ? (
            <>
              <div className="mr-2">
                <CustomSelect
                  value={selectedFieldId}
                  onChange={(value) => setSelectedFieldId(value as FieldId)}
                  options={fieldDefinitionsLeftPanel.map((field) => ({
                    value: field.id,
                    label: field.label,
                  }))}
                  className="bg-label p-1 font-bold w-24 text-center"
                />
              </div>

              <div className="flex">{renderDynamicInput()}</div>
            </>
          ) : (
            <>
              <div className="flex justify-between h-8 items-center">
                <div className="flex gap-20 items-center  ">
                  <span>{formatMultiValue(selectedFieldId)}</span>
                  <div className="flex flex-col ml-[-29px]">
                    <span>山田　太郎</span>
                    <span>東京都文京区小石川1-1-1 文京ビルディング</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowCustomer(false);
                    setFormValues((prev) => ({
                      ...prev,
                      customerCode: ["", ""],
                    }));
                    // Focus back to customer code select after re-search
                    setTimeout(() => {
                      customerCodeSelectRef.current?.focus();
                    }, 0);
                  }}
                  className=" border border-black rounded p-1 shadow-md shadow-zinc-600"
                >
                  <span className="w-[25%] m-2">再検索</span>
                </button>
              </div>

              <div className="flex mt-2 text-center">
                <div className="flex w-[35%] gap-4 ">
                  <label className="w-20 font-bold bg-label p-1">
                    電話番号
                  </label>
                  <div className="p-1">03-1234-9999</div>
                </div>
                <div className="flex w-[35%] gap-4 ">
                  <label className="w-20 font-bold bg-label p-1">
                    地図番号
                  </label>
                  <div className="p-1">X0123:Y0315</div>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-center">
                <div className="flex w-[30%] gap-4 ">
                  <label className="w-20 font-bold bg-label p-1">入力済</label>
                  <div className="p-1">0枚</div>
                </div>
                <div className="flex w-[30%] gap-4 ">
                  <label className="w-20 font-bold bg-label p-1">開閉</label>
                  <div className="p-1">新規開栓</div>
                </div>
                <div className="flex w-[30%] gap-4 ">
                  <label className="w-20 font-bold bg-label p-1">
                    集金方法
                  </label>
                  <div className="p-1">自振</div>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-center">
                <div className="flex w-[30%] gap-4 ">
                  <label className="w-20 font-bold bg-label p-1">締日</label>
                  <div className="p-1">31</div>
                </div>
                <div className="flex w-[30%] gap-4 ">
                  <label className="w-20 font-bold bg-label p-1">
                    支払サイト
                  </label>
                  <div className="p-1">14</div>
                </div>
                <div className="flex w-[30%] gap-4 ">
                  <label className="w-20 font-bold bg-label p-1">集金日</label>
                  <div className="p-1">0日</div>
                </div>
              </div>
            </>
          )}
        </div>
        {!showDepart && !showCustomer ? (
          <div className="absolute top-4 right-0">
            <button
              ref={advancedSearchButtonRef}
              onClick={() => setShowAdvanceSearch(true)}
              onKeyDown={(e) => {
                if (
                  e.key === "ArrowDown" ||
                  e.key === "ArrowRight" ||
                  e.key === "Tab"
                ) {
                  e.preventDefault();
                  // Focus to kana select using ref
                  if (kanaSelectRef.current) {
                    kanaSelectRef.current.focus();
                  }
                }
              }}
              className="border text-center w-32 bg-white border-black p-2 rounded-md shadow-md shadow-zinc-600"
            >
              詳細検索（S）
            </button>
          </div>
        ) : (
          <div className="flex justify-center my-4">
            <button
              ref={advancedSearchButtonRef}
              onClick={() => setShowAdvanceSearch(true)}
              onKeyDown={(e) => {
                if (
                  e.key === "ArrowDown" ||
                  e.key === "ArrowRight" ||
                  e.key === "Tab"
                ) {
                  e.preventDefault();
                  // Focus to kana select using ref
                  if (kanaSelectRef.current) {
                    kanaSelectRef.current.focus();
                  }
                }
              }}
              className="border text-center w-32 bg-white border-black p-2 rounded-md shadow-md shadow-zinc-600"
            >
              詳細検索（S）
            </button>
          </div>
        )}
        {showAdvanceSearch && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg relative w-[700px] max-w-full">
              <AdvanceSearchModal
                setShowAdvanceSearch={setShowAdvanceSearch}
                showAdvanceSearch={showAdvanceSearch}
                onRowEnter={handleShowHardcodedCustomer}
              />
            </div>
          </div>
        )}
      </div>
      <div>
        {!selectedRow ? (
          <>
            <div>
              <div className="text-center h-8 text-sm bg-label border border-black py-1 font-semibold">
                担当者検索
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm flex items-center flex-row py-2">
                    <>
                      <label className="bg-label p-1 font-bold w-24 text-center  mr-2">
                        検索種類
                      </label>
                      <label className="bg-label w-64 p-1 font-bold text-center">
                        カナ
                      </label>
                    </>
                  </div>
                  <div className="text-sm flex items-center flex-row py-2 w-full">
                    <>
                      <div className="mr-2">
                        <CustomSelect
                          value={kanaSelectValue}
                          onChange={(value) => setKanaSelectValue(value)}
                          options={[
                            { value: "0", label: "カナ" },
                            { value: "1", label: "コード" },
                          ]}
                          className="h-7 bg-input border border-gray-500 text-black text-sm px-2 w-24"
                        />
                      </div>
                      <input
                        ref={kanaInputRef}
                        type="text"
                        className="w-64 p-1 border border-gray-500 bg-input"
                        value={kanaInput}
                        onChange={(e) => setKanaInput(e.target.value)}
                        onBlur={handleKatakanaBlur}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            e.stopPropagation();
                            handleKatakanaBlur();
                            searchButtonRef.current?.focus();
                          } else {
                            handleKanaKeyDown(e);
                          }
                        }}
                      />
                    </>
                  </div>
                </div>
                <div>
                  <button
                    ref={searchButtonRef}
                    onClick={() => setShowTable(true)}
                    className="bg-white border text-center border-black p-2 w-32 rounded-md shadow-md shadow-zinc-600"
                  >
                    絞り込む
                  </button>
                </div>
              </div>
              <div className="mb-2 flex flex-wrap items-center justify-between">
                <div>
                  <div className="text-sm flex items-center flex-row py-2 w-full">
                    <>
                      <label className="bg-label p-1 font-bold w-24 text-center mr-2">
                        表示順
                      </label>
                      <div className="mr-2">
                        <CustomSelect
                          value={displayOrderValue}
                          onChange={(value) => setDisplayOrderValue(value)}
                          options={[
                            { value: "0", label: "コード順" },
                            { value: "1", label: "五十音順" },
                          ]}
                          className="h-7 bg-input border border-gray-500 text-black text-sm px-2 w-24"
                        />
                      </div>
                      <label className="bg-label p-1 font-bold w-24 text-center mr-2">
                        検索種類
                      </label>
                      <div className="flex items-center w-24 justify-center">
                        <input
                          ref={radio1Ref}
                          id="exceptRetiredEmployees"
                          type="radio"
                          value="0"
                          name="default-radio"
                          checked={selected === "0"}
                          onChange={(e) => {
                            setSelected(e.target.value);
                            // Maintain focus on the radio after change
                            setTimeout(() => {
                              radio1Ref.current?.focus();
                            }, 0);
                          }}
                          onKeyDown={(e) => handleRadioKeyDown(e, "0")}
                          className="w-4 h-4 mr-1"
                        />
                        <label htmlFor="exceptRetiredEmployees">
                          退職者以外
                        </label>
                      </div>

                      <div className="flex items-center w-24 justify-center">
                        <input
                          ref={radio2Ref}
                          id="all"
                          type="radio"
                          value="1"
                          name="default-radio"
                          checked={selected === "1"}
                          onChange={(e) => {
                            setSelected(e.target.value);
                            // Maintain focus on the radio after change
                            setTimeout(() => {
                              radio2Ref.current?.focus();
                            }, 0);
                          }}
                          onKeyDown={(e) => handleRadioKeyDown(e, "1")}
                          className="w-4 h-4 mr-1"
                        />
                        <label htmlFor="all">全て</label>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center">
              {kanaButtons.map((item, index) => {
                const isObject = typeof item === "object";
                const label = isObject ? item.label : item;
                const isWide = isObject && item.wide;
                return (
                  <button
                    disabled
                    key={index}
                    className={`border text-center bg-white border-black p-0.5 mr-1 shadow-md shadow-zinc-600 ${
                      isWide ? "w-20" : "w-8"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            {showTable && (
              <div className="mt-4">
                <div className="h-48 overflow-y-auto border border-[#5D5D5D]">
                  <table className="w-full border-collapse">
                    <thead className="bg-label sticky top-0 z-10">
                      <tr>
                        {tableHeaders.map((header, colIndex) => (
                          <th
                            key={header}
                            style={{ width: colWidths[colIndex] }}
                            className="pl-1 text-sm font-semibold border-b border-r border-[#5D5D5D] h-8 items-center text-left"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody ref={tableBodyRef} onKeyDown={handleTableKeyDown}>
                      {tableData.map((row, rowIndex) => (
                        <tr
                          key={row.code}
                          tabIndex={-1}
                          onClick={() => {
                            setActiveIndex(rowIndex);
                            setSelectedRow(true);
                          }}
                          onDoubleClick={() => {
                            setActiveIndex(rowIndex);
                            setSelectedRow(true);
                          }}
                          className={`cursor-pointer focus:outline-none ${
                            activeIndex === rowIndex
                              ? "bg-blue-300 "
                              : "hover:bg-yellow-200"
                          }`}
                        >
                          <td
                            style={{ width: colWidths[0] }}
                            className="pl-1 border-r border-b border-[#DFDEDE] text-sm m-0.5  h-8"
                          >
                            {row.code}
                          </td>
                          <td
                            style={{ width: colWidths[1] }}
                            className="pl-1 border-r border-b border-[#DFDEDE] text-sm m-0.5  h-8"
                          >
                            {row.name}
                          </td>
                          <td
                            style={{ width: colWidths[2] }}
                            className="pl-1 border-r border-b border-[#DFDEDE] text-sm m-0.5  h-8"
                          >
                            {row.kana}
                          </td>
                          <td
                            style={{ width: colWidths[3] }}
                            className="pl-1 border-b border-[#DFDEDE] text-sm m-0.5  h-8"
                          >
                            {row.office}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-center h-8 text-sm bg-label border border-black py-1 font-semibold">
              担当者情報
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex gap-10">
                <div>030030 - 00</div>
                <div>担当者太郎（東京事務所01）</div>
              </div>
              <button
                onClick={() => setSelectedRow(false)}
                className=" border border-black rounded p-1 shadow-md shadow-zinc-600"
              >
                <span className="w-[25%] m-2">再検索</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default LeftPanel;
