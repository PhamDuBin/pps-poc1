import React from "react";

//■左カラム顧客検索＆情報表示ランチャー
import { useEffect, useState } from "react";
import AdvanceSearchModal from "./3.3.3_01/AdvanceSearchModal";

const DownArrowIcon = () => (
  <svg
    className="w-3 h-3 text-black"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M19 9l-7 7-7-7"
    ></path>
  </svg>
);

const kanaButtons = [
  "ア", "カ", "サ", "タ", "ナ", "ハ", "マ", "ヤ", "ラ", "ワ",
  { label: "その他", wide: true },
  { label: "全て", wide: true },
];

const tableHeaders = [
  "コード", "氏名", "カナ氏名", "所属事務所名",
];

const rowData = [
  "00000001","担当者太郎","タントウシャタロウ","東京事務所03"
];

const colWidths = ["15%", "25%", "25%", "35%"];

const rowCount = 8;

type LeftPanelProps = {
  showAdvanceSearch: boolean;
  setShowAdvanceSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

const LeftPanel: React.FC<LeftPanelProps> = ({ showAdvanceSearch, setShowAdvanceSearch }) => {
  const [postcode1, setPostcode1] = useState("");
  const [postcode2, setPostcode2] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [showDepart, setShowDepart] = useState(false);
  const [id1, setId1] = useState("");
  const [id2, setId2] = useState("");
  const [id3, setId3] = useState("");
  const [showCustomer, setShowCustomer] = useState(false);
  const [selected, setSelected] = useState("1");
  const [selectedRow, setSelectedRow] = useState(false);


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

  const fieldDefinitions = [
  { id: "customerCode", label: "顧客コード", type: "double" },
  { id: "searchKey1", label: "検索キー１", type: "input" },
  { id: "searchKey2", label: "検索キー２", type: "input" },
  { id: "computerCode", label: "電算コード", type: "single" },
  { id: "eavesbarCode", label: "軒先バーコード", type: "input" },
  { id: "deleveryOrderCode", label: "配送順コード", type: "multi", partSizes: [50, 70, 50] },
  { id: "inspectionOderCode", label: "点検順コード", type: "multi", partSizes: [50, 70, 50] },
  { id: "saleOrderCode", label: "営業順コード", type: "multi", partSizes: [50, 70, 50] },
  { id: "meterReadingOrderCode", label: "検針順コード", type: "multi", partSizes: [50, 70, 50] },
  { id: "collectionOderCode", label: "集金順コード", type: "multi", partSizes: [50, 70, 50] },
  { id: "distributionCenterCD", label: "配送センターCD", type: "dropdown" },
  { id: "securityAgencyCD", label: "保安機関CD", type: "dropdown" },
  { id: "centralMonitoringCD", label: "集中監視CD", type: "dropdown" },
  { id: "oderManagementNo", label: "受注管理No.", type: "input" },
  { id: "deliverySlipNo", label: "出庫伝票No.", type: "input" },
  ] as const;

  type FieldId = (typeof fieldDefinitions)[number]["id"];
  type FormValues = { [key in FieldId]?: string | string[] };

  const [selectedFieldId, setSelectedFieldId] = useState<FieldId>(
      fieldDefinitions[0].id
    );
    const [formValues, setFormValues] = useState<FormValues>({});
    const currentField = fieldDefinitions.find((f) => f.id === selectedFieldId);
  
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
                    className="w-20 border border-black p-1 text-center placeholder-gray-400 bg-[#ebcec0]"
                    style={{ width: `${size}px` }}
                    value={(Array.isArray(value) && value[index]) || ""}
                    onChange={(e) => handleValueChange(e.target.value, index)}
                  />
                  {index < currentField.partSizes.length - 1 && <span>-</span>}
                </React.Fragment>
              ))}
              <button
                    onClick={() => {
                      handleSearch(id1, id2);
                    }}
                    className=" w-[20px] h-[20px] mt-1 inset-y-0 right-0 flex items-center px-1 bg-white border border-gray-500 cursor-pointer"
                  >
                    <DownArrowIcon />
              </button>
            </div>
          );
        case "dropdown":
          return (
            <div className="flex items-center space-x-1">
              <input
                type="text"
                className="border border-black p-1 placeholder-gray-400 w-20 bg-[#ebcec0]"
                placeholder="000000"
                onChange={(e) => {
                setId1(e.target.value);
                handleValueChange(e.target.value, 0);
                }}
              />
              <span> - </span>
              <input
                type="text"
                className="border w-20 border-gray-400 p-1 bg-[#ebcec0]"
                value={(Array.isArray(value) && value[1]) || ""}
                onChange={(e) => {
                setId2(e.target.value);
                handleValueChange(e.target.value, 1);
                
                }}
                placeholder="000000"
              />
              <button
                    onClick={() => {
                      handleSearch(id1, id2);
                    }}
                    className=" w-[20px] h-[20px] mt-1 inset-y-0 right-0 flex items-center px-1 bg-white border border-gray-500 cursor-pointer"
                  >
                    <DownArrowIcon />
              </button>
            </div>
          );
        case "double":
          return (
            <div className="flex gap-1">
              <input
                type="text"
                className="border w-20 border-gray-400 p-1 placeholder-gray-400 bg-[#ebcec0]"
                value={(Array.isArray(value) && value[0]) || ""}
                onChange={(e) => {
                setId1(e.target.value);
                handleValueChange(e.target.value, 0);
                }}
                placeholder="000000"
                
              />
              <div>-</div>
              <input
                type="text"
                className="border w-20 border-gray-400 p-1 placeholder-gray-400 bg-[#ebcec0]"
                value={(Array.isArray(value) && value[1]) || ""}
                onChange={(e) => {
                setId2(e.target.value);
                handleValueChange(e.target.value, 1);
                }}
                placeholder="000000"
              />
              <button
                    onClick={() => {
                      handleSearch(id1, id2);
                    }}
                    className=" w-[20px] h-[20px] mt-1 inset-y-0 right-0 flex items-center px-1 bg-white border border-gray-500 cursor-pointer"
                  >
                    <DownArrowIcon />
              </button>
            </div>
          );
        default:
          return (
            <>
            <input
              type="text"
              className="border border-black p-1 w-44 mr-1 bg-[#ebcec0]"
              value={(typeof value === "string" && value) || ""}
              onChange={(e) => {
                setId1(e.target.value);
                handleValueChange(e.target.value);
              }}
            />
            <button
                    onClick={() => {
                      handleSearch(id1)
                    }}
                    className=" w-[20px] h-[20px] mt-1 inset-y-0 right-0 flex items-center px-1 bg-white border border-gray-500 cursor-pointer"
                  >
                    <DownArrowIcon />
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

  return (
    <div className="h-screen p-3 bg-[#d8dadc] border-2 border-gray-400 font-sans">
      <div className="text-center h-8 text-sm bg-[#80bad7] py-1 font-semibold border border-black">
        {(showDepart || showCustomer) ? "顧客情報" : "顧客検索"}
          
        </div>
        <div className="mb-2 items-center flex-col relative">
          {/* department */}
            <div className="text-sm flex items-center flex-row py-2">
              {!showDepart ? (
                <>
                  <label className="bg-[#80bad7] p-1 font-bold w-24 text-center mr-2">
                    事務所
                  </label>
                  <input
                    type="text"
                    placeholder="0000"
                    className="w-20 p-1 border border-gray-500 bg-[#ebcec0]"
                    onChange={(e) => setPostcode1(e.target.value)}
                  />
                  <span className="mx-1">-</span>
                  <input
                    type="text"
                    placeholder="000"
                    className="w-20 p-1 border border-gray-500 bg-[#ebcec0]"
                    onChange={(e) => setPostcode2(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      handleSearchDepartment(postcode1, postcode2);
                    }}
                    className="mx-1 w-[20px] h-[20px] inset-y-0 right-0 flex items-center px-1 bg-white border border-gray-500 cursor-pointer"
                  >
                    <DownArrowIcon />
                  </button>

                </>
              ) : (
                <>
                <div className="w-full font-medium flex justify-between h-8 items-center">
                  <div className="flex gap-20">
                    <span>{postcode1} - {postcode2}</span>
                    <span>東京23区担当営業所</span>
                  </div>
                  <button
                  onClick={() => setShowDepart(false)} className=" border border-black rounded p-1">
                    <span className="w-[25%] m-2">再検索</span>
                  </button>
                </div>
                
                </>
              )}

            </div>
            {/* Customer */}
            <div className={`text-sm font-medium items-center flex-row py-2 ${showCustomer ? "" : "flex"}`}>
              {!showCustomer ? (
                <>
                  <select
                    className="bg-[#80bad7] p-1 font-bold w-24 text-center mr-2"
                    value={selectedFieldId}
                    onChange={(e) => setSelectedFieldId(e.target.value as FieldId)}
                  >
                    {fieldDefinitions.map((field) => (
                      <option key={field.id} value={field.id}>
                        {field.label}
                      </option>
                    ))}
                  </select>

                  <div className="flex">
                    {renderDynamicInput()}
                  </div>
                </>
              ):(
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
                    onClick={() => setShowCustomer(false)} className=" border border-black rounded p-1">
                      <span className="w-[25%] m-2">再検索</span>
                    </button>
                  </div>

                  <div className="flex gap-10 mt-2 text-center">
                    <div className="flex w-[35%] gap-4 ">
                      <label className="w-20 font-bold bg-[#80bad7] p-1">電話番号</label>
                      <div className="p-1">03-1234-9999</div>
                    </div>
                    <div className="flex w-[35%] gap-4 ">
                      <label className="w-20 font-bold bg-[#80bad7] p-1">地図番号</label>
                      <div className="p-1">X0123:Y0315</div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-center">
                    <div className="flex w-[30%] gap-4 ">
                      <label className="w-20 font-bold bg-[#80bad7] p-1">入力済</label>
                      <div className="p-1">0枚</div>
                    </div>
                    <div className="flex w-[30%] gap-4 ">
                      <label className="w-20 font-bold bg-[#80bad7] p-1">開閉</label>
                      <div className="p-1">新規開栓</div>
                    </div>
                    <div className="flex w-[30%] gap-4 ">
                      <label className="w-20 font-bold bg-[#80bad7] p-1">集金方法</label>
                      <div className="p-1">自振</div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-center">
                    <div className="flex w-[30%] gap-4 ">
                      <label className="w-20 font-bold bg-[#80bad7] p-1">締日</label>
                      <div className="p-1">31</div>
                    </div>
                    <div className="flex w-[30%] gap-4 ">
                      <label className="w-20 font-bold bg-[#80bad7] p-1">支払サイト</label>
                      <div className="p-1">14</div>
                    </div>
                    <div className="flex w-[30%] gap-4 ">
                      <label className="w-20 font-bold bg-[#80bad7] p-1">集金日</label>
                      <div className="p-1">0日</div>
                    </div>
                  </div>
                  
                </>
              )}
                
            </div>
          {(!showDepart && !showCustomer) ? (
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
              <AdvanceSearchModal setShowAdvanceSearch={setShowAdvanceSearch} showAdvanceSearch={showAdvanceSearch} />
            </div>
          </div>
        )}

        </div>  
      <div >
      {!selectedRow ? (
          <>
            <div>
              <div className="text-center h-8 text-sm bg-[#80bad7] border border-black py-1 font-semibold">
                担当者検索
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm flex items-center flex-row py-2">
                      <>
                        <label className="bg-[#80bad7] p-1 font-bold w-24 text-center  mr-2">
                          検索種類
                        </label>
                        <label className="bg-[#ebcec0] w-64 p-1 font-bold text-center">
                          カナ
                        </label>
                      </>
                  </div>
                  <div className="text-sm flex items-center flex-row py-2 w-full">
                      <>
                        <form className="">
                          <select className=" h-7 mr-2 bg-[#ebcec0] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="0">カナ</option>
                            <option value="1">コード</option>
                          </select>
                        </form>
                        <input
                          type="text"
                          className="w-64 p-1 border border-gray-500 bg-[#ebcec0]"
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
                        <label className="bg-[#80bad7] p-1 font-bold w-24 text-center mr-2">
                          表示順
                        </label>
                        <form className="">
                          <select className=" mr-2 bg-[#ebcec0] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="0">コード順</option>
                            <option value="1">五十音順</option>
                          </select>
                        </form>
                        <label className="bg-[#80bad7] p-1 font-bold w-24 text-center mr-2">
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
                          <label htmlFor="exceptRetiredEmployees">退職者以外</label>
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
                    key={index}
                    className={`border text-center bg-white border-black p-0.5 mr-1 ${isWide ? "w-20" : "w-8"}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            {showTable && (
            <div className="h-48 overflow-y-auto">
              <div className="flex w-full ">
                {tableHeaders.map((header, colIndex) => (
                  <div
                    key={header}
                    style={{ width: colWidths[colIndex] }}
                    className="flex pl-1 text-sm  bg-[#80bad7] font-semibold border border-[#5D5D5D] m-0.5 h-8 items-center"
                  >
                    {header}
                  </div>
                ))}

              </div>
              <div>
                {Array.from({ length: rowCount }).map((_, rowIndex) => (
                  <div key={rowIndex} className="flex"
                  onClick={() => setSelectedRow(true)}>
                    {rowData.map((data, cellIndex) => (
                      <div
                        key={cellIndex}
                        style={{ width: colWidths[cellIndex] }}
                        className=" pl-1 flex items-center border border-[#DFDEDE] text-sm m-0.5 bg-[#ebcec0] h-8"
                      >
                        {data}
                      </div>
                    ))}
                  </div>
                ))}

              </div>
            </div>
            )}
          </>
        ):(
        <>
          <div className="text-center h-8 text-sm bg-[#80bad7] border border-black py-1 font-semibold">
            担当者情報
          </div>
          <div className="flex justify-between mt-2">
            <div className="flex gap-10">
              <div>
                030030 - 00
              </div>
              <div>担当者太郎（東京事務所01）</div>
            </div>
            <button
                  onClick={() => setSelectedRow(false)} 
                  className=" border border-black rounded p-1">
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

