import React, { useRef } from "react";

//■左カラム顧客検索＆情報表示ランチャー
import { useEffect, useState } from "react";
import AdvanceSearchModal from "../transaction_information/1.1.1_03/AdvanceSearchModal";
import {
  extractHalfWidthDigits,
  convertToFullWidth,
  handleFormatting,
  allowDecimalInput,
} from "../../utils/InputHandlers";
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
    } else {
      setShowDepart(false);
    }
  };

  const firstInputRef = useRef<HTMLInputElement>(null);
  const customerCodeSelectRef = useRef<HTMLSelectElement>(null);
  const kanaInputRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);

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
          <div className="flex items-center space-x-1">
            {currentField.partSizes?.map((size, index) => (
              <React.Fragment key={index}>
                <input
                  type="text"
                  placeholder="000"
                  className="w-20 border border-black p-1 text-center placeholder-gray-400 bg-input"
                  style={{ width: `${size}px` }}
                  value={(Array.isArray(value) && value[index]) || ""}
                  onChange={(e) =>
                    handleValueChange(
                      extractHalfWidthDigits(e.target.value),
                      index
                    )
                  }
                  onKeyDown={(e) => {
                    handleCustomerCodeKeyDown(e);
                    handleFormatting(e, extractHalfWidthDigits);
                  }}
                />
                {index < currentField.partSizes.length - 1 && <span>-</span>}
              </React.Fragment>
            ))}
            <button
              onClick={() => setShowAdvanceSearch(true)}
              className=" w-[20px] h-[20px] mt-1 flex items-center justify-center px-1 bg-white border border-gray-500 cursor-pointer"
            >
              ▼
            </button>
          </div>
        );
      case "dropdown":
        return (
          <div className="flex items-center space-x-1">
            <input
              type="text"
              className="border border-black p-1 placeholder-gray-400 w-20 bg-input"
              onChange={(e) => {
                setId1(extractHalfWidthDigits(e.target.value));
                handleValueChange(extractHalfWidthDigits(e.target.value), 0);
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
              className="border w-20 border-gray-400 p-1 bg-input"
              value={(Array.isArray(value) && value[1]) || ""}
              onChange={(e) => {
                setId2(extractHalfWidthDigits(e.target.value));
                handleValueChange(extractHalfWidthDigits(e.target.value), 1);
              }}
              placeholder="000000"
              onKeyDown={(e) => {
                handleCustomerCodeKeyDown(e);
                handleFormatting(e, extractHalfWidthDigits);
              }}
            />
            <button
              onClick={() => setShowAdvanceSearch(true)}
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
              className="border w-20 border-gray-400 p-1 placeholder-gray-400 bg-input"
              value={(Array.isArray(value) && value[0]) || ""}
              onChange={(e) => {
                setId1(extractHalfWidthDigits(e.target.value));
                handleValueChange(extractHalfWidthDigits(e.target.value), 0);
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
              className="border w-20 border-gray-400 p-1 placeholder-gray-400 bg-input"
              value={(Array.isArray(value) && value[1]) || ""}
              onChange={(e) => {
                setId2(extractHalfWidthDigits(e.target.value));
                handleValueChange(extractHalfWidthDigits(e.target.value), 1);
              }}
              placeholder="000000"
              onKeyDown={(e) => {
                handleCustomerCodeKeyDown(e);
                handleFormatting(e, extractHalfWidthDigits);
              }}
            />
            <button
              onClick={() => setShowAdvanceSearch(true)}
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
              onClick={() => setShowAdvanceSearch(true)}
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
  const handleJimushoKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
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

  const handleShowHardcodedCustomer = () => {
    setId1("000000");
    setId2("000");
    setPostcode1("000000");
    setPostcode2("000");
    setShowCustomer(true);
    setShowDepart(true);
  };

  return (
    <div className="h-screen p-3 bg-bg-alt border-2 border-gray-400 font-sans">
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
              <input
                ref={firstInputRef}
                type="text"
                placeholder="0000"
                className="w-20 p-1 border border-gray-500 bg-input"
                onChange={(e) =>
                  setPostcode1(extractHalfWidthDigits(e.target.value))
                }
                onKeyDown={(e) => {
                  handleJimushoKeyDown(e);
                  allowDecimalInput(e);
                }}
              />
              <span className="mx-1">-</span>
              <input
                type="text"
                placeholder="000"
                className="w-20 p-1 border border-gray-500 bg-input"
                onChange={(e) =>
                  setPostcode2(extractHalfWidthDigits(e.target.value))
                }
                onKeyDown={(e) => {
                  handleJimushoKeyDown(e);
                  allowDecimalInput(e);
                }}
              />
              <button
                onClick={() => setShowAdvanceSearch(true)}
                className="mx-1 w-[20px] h-[20px] flex items-center justify-center px-1 bg-white border border-gray-500 cursor-pointer"
              >
                ▼
              </button>
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
                  onClick={() => setShowDepart(false)}
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
              <select
                ref={customerCodeSelectRef}
                className="bg-label p-1 font-bold w-24 text-center mr-2"
                value={selectedFieldId}
                onChange={(e) => setSelectedFieldId(e.target.value as FieldId)}
              >
                {fieldDefinitionsLeftPanel.map((field) => (
                  <option key={field.id} value={field.id}>
                    {field.label}
                  </option>
                ))}
              </select>

              <div className="flex">{renderDynamicInput()}</div>
            </>
          ) : (
            <>
              <div className="flex justify-between h-8 items-center">
                <div className="flex gap-20 items-center  ">
                  <span>{formatMultiValue(selectedFieldId)}</span>
                  <div className="flex flex-col">
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
                  }}
                  className=" border border-black rounded p-1 shadow-md shadow-zinc-600"
                >
                  <span className="w-[25%] m-2">再検索</span>
                </button>
              </div>

              <div className="flex gap-10 mt-2 text-center">
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
                  <label className="w-20 font-bold bg-label p-1">
                    入力済
                  </label>
                  <div className="p-1">0枚</div>
                </div>
                <div className="flex w-[30%] gap-4 ">
                  <label className="w-20 font-bold bg-label p-1">
                    開閉
                  </label>
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
                  <label className="w-20 font-bold bg-label p-1">
                    締日
                  </label>
                  <div className="p-1">31</div>
                </div>
                <div className="flex w-[30%] gap-4 ">
                  <label className="w-20 font-bold bg-label p-1">
                    支払サイト
                  </label>
                  <div className="p-1">14</div>
                </div>
                <div className="flex w-[30%] gap-4 ">
                  <label className="w-20 font-bold bg-label p-1">
                    集金日
                  </label>
                  <div className="p-1">0日</div>
                </div>
              </div>
            </>
          )}
        </div>
        {!showDepart && !showCustomer ? (
          <div className="absolute top-4 right-0">
            <button
              onClick={() => setShowAdvanceSearch(true)}
              className="border text-center w-32 bg-white border-black p-2 rounded-md shadow-md shadow-zinc-600"
            >
              詳細検索（S）
            </button>
          </div>
        ) : (
          <div className="flex justify-center my-4">
            <button
              onClick={() => setShowAdvanceSearch(true)}
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
                      <form className="">
                        <select className=" h-7 mr-2 bg-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option value="0">カナ</option>
                          <option value="1">コード</option>
                        </select>
                      </form>
                      <input
                        ref={kanaInputRef}
                        type="text"
                        className="w-64 p-1 border border-gray-500 bg-input"
                        value={kanaInput}
                        onChange={(e) =>
                          setKanaInput(convertToFullWidth(e.target.value))
                        }
                        onKeyDown={(e) => {
                          handleKanaKeyDown(e);
                          handleFormatting(e, convertToFullWidth);
                        }}
                      />
                    </>
                  </div>
                </div>
                <div>
                  <button
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
                      <form className="">
                        <select className=" mr-2 bg-input border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option value="0">コード順</option>
                          <option value="1">五十音順</option>
                        </select>
                      </form>
                      <label className="bg-label p-1 font-bold w-24 text-center mr-2">
                        検索種類
                      </label>
                      <div className="flex items-center w-24 justify-center">
                        <input
                          id="exceptRetiredEmployees"
                          type="radio"
                          value="0"
                          name="default-radio"
                          checked={selected === "0"}
                          onChange={(e) => setSelected(e.target.value)}
                          className="w-4 h-4 mr-1"
                        />
                        <label htmlFor="exceptRetiredEmployees">
                          退職者以外
                        </label>
                      </div>

                      <div className="flex items-center w-24 justify-center">
                        <input
                          id="all"
                          type="radio"
                          value="1"
                          name="default-radio"
                          checked={selected === "1"}
                          onChange={(e) => setSelected(e.target.value)}
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
