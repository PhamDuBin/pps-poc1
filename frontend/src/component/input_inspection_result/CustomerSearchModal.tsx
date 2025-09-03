import { DownArrowIcon } from "../transaction_information/LeftPanel";
import AdvanceSearchModal from "../transaction_information/1.1.1_03/AdvanceSearchModal";
import { useState } from "react";
import { fieldDefinitions } from "../sale_slip_entry/LeftPanel";
import React from "react";

export const CustomerSearchModal = ({ onClose }: { onClose: () => void }) => {
  type FieldId = (typeof fieldDefinitions)[number]["id"];
  type FormValues = { [key in FieldId]?: string | string[] };
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);
  const [selectedFieldId, setSelectedFieldId] = useState<FieldId>(
    fieldDefinitions[0].id
  );
  const currentField = fieldDefinitions.find((f) => f.id === selectedFieldId);
  const [formValues, setFormValues] = useState<FormValues>({});

  if (showAdvanceSearch) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="w-1/2">
          <AdvanceSearchModal
            showAdvanceSearch={showAdvanceSearch}
            setShowAdvanceSearch={setShowAdvanceSearch}
          />
        </div>
      </div>
    );
  }

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
                  className="w-20 h-6 border border-black p-1 text-center placeholder-gray-400 bg-[#ebcec0]"
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
              className="border border-black p-1 placeholder-gray-400 w-20 h-6 bg-[#ebcec0]"
              placeholder="000000"
              onChange={(e) => {
                handleValueChange(e.target.value, 0);
              }}
            />
            <span> - </span>
            <input
              type="text"
              className="border w-20 h-6 border-gray-400 p-1 bg-[#ebcec0]"
              value={(Array.isArray(value) && value[1]) || ""}
              onChange={(e) => {
                handleValueChange(e.target.value, 1);
              }}
              placeholder="000000"
            />
          </div>
        );
      case "double":
        return (
          <div className="flex gap-1">
            <input
              type="text"
              className="border w-20 h-6 border-gray-400 p-1 placeholder-gray-400 bg-[#ebcec0]"
              value={(Array.isArray(value) && value[0]) || ""}
              onChange={(e) => {
                handleValueChange(e.target.value, 0);
              }}
              placeholder="000000"
            />
            <div>-</div>
            <input
              type="text"
              className="border w-20 h-6 border-gray-400 p-1 placeholder-gray-400 bg-[#ebcec0]"
              value={(Array.isArray(value) && value[1]) || ""}
              onChange={(e) => {
                handleValueChange(e.target.value, 1);
              }}
              placeholder="000000"
            />
          </div>
        );
      default:
        return (
          <>
            <input
              type="text"
              className="border h-6 border-black p-1 w-44 mr-1 bg-[#ebcec0]"
              value={(typeof value === "string" && value) || ""}
              onChange={(e) => {
                handleValueChange(e.target.value);
              }}
            />
          </>
        );
    }
  };

  const isCustomerCodeSelected = selectedFieldId === "customerCode";
  const customerCodeValues = (formValues.customerCode as string[]) || [];
  const areButtonsDisabled =
    isCustomerCodeSelected &&
    (!customerCodeValues[0] || !customerCodeValues[1]);

  const handleResetCustomerCode = () => {
    setFormValues((prev) => ({
      ...prev,
      customerCode: ["", ""],
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="border border-black bg-white p-2">
        <div className="flex flex-col">
          <span className="w-[748.75px] h-[40px] p-2 flex text-center justify-center items-center font-bold bg-[#D9D9D9]">
            顧客検索ー点検調査結果入力
          </span>
          <div className="mt-4 px-2">
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-4">
                <span className="w-28 h-6 bg-[#D9D9D9] flex justify-center items-center">
                  事務所
                </span>
                <input className="w-16 h-6 border border-black" />
                <p>-</p>
                <input className="w-16 h-6 border border-black" />
                <button
                  onClick={() => setShowAdvanceSearch(true)}
                  className="w-[22px] h-[22px] flex items-center justify-center border border-gray-500"
                >
                  <DownArrowIcon />
                </button>
                <p>関東地方営業事務所</p>
              </div>

              <div className="flex flex-row items-center gap-4 mt-2">
                <>
                  <select
                    className="bg-[#D9D9D9] w-28 h-6 text-center"
                    value={selectedFieldId}
                    onChange={(e) =>
                      setSelectedFieldId(e.target.value as FieldId)
                    }
                  >
                    {fieldDefinitions.map((field) => (
                      <option key={field.id} value={field.id}>
                        {field.label}
                      </option>
                    ))}
                  </select>

                  <div className="flex">{renderDynamicInput()}</div>
                </>
                <button
                  onClick={() => setShowAdvanceSearch(true)}
                  className="w-[22px] h-[22px] flex items-center justify-center border border-gray-500"
                >
                  <DownArrowIcon />
                </button>
                <button
                  onClick={onClose}
                  disabled={areButtonsDisabled}
                  className={`w-11 h-6 flex justify-center items-center border border-b rounded-md ${
                    areButtonsDisabled
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white"
                  }`}
                >
                  確定
                </button>
                <button
                  onClick={handleResetCustomerCode}
                  disabled={areButtonsDisabled}
                  className={`w-14 h-6 flex justify-center items-center border border-b rounded-md ${
                    areButtonsDisabled
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white"
                  }`}
                >
                  再入力
                </button>
              </div>
            </div>
          </div>

          {/* ==== Phần thông tin chi tiết ==== */}
          <div className="mt-4 px-2">
            <span className="font-bold">顧客情報詳細</span>
            <div className="border border-black p-2 h-40 mt-1 text-sm">
              {/* Hàng 1 */}
              <div className="flex items-center mb-1">
                <span className="w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  氏名
                </span>
                <span className="ml-2">鈴木　カンクロウ</span>

                <span className="ml-6 w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  開閉
                </span>
                <span className="ml-2">新規開栓</span>

                <span className="ml-6 w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  供給
                </span>
                <span className="ml-2">個別</span>
              </div>

              {/* Hàng 2 */}
              <div className="flex items-center mb-1">
                <span className="w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  住所
                </span>
                <div className="ml-2">
                  <p>埼玉県さいたま市なんちゃら０００１</p>
                  <p>さいたま市宮団地００１−２０１号室</p>
                </div>

                <span className="ml-6 w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  電話番号
                </span>
                <span className="ml-2">03-1234-9999</span>
              </div>

              {/* Hàng 3 */}
              <div className="flex items-center mb-1 mt-3">
                <span className="w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  地区
                </span>
                <span className="ml-2">空白〇〇〇〇</span>

                <span className="ml-6 w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  地図
                </span>
                <span className="ml-2">空白</span>

                <span className="ml-6 w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  距離
                </span>
                <span className="ml-2">25km（53分）</span>
              </div>

              {/* Hàng 4 */}
              <div className="flex items-center mt-3">
                <span className="w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  案内
                </span>
                <span className="ml-2">空白〇〇〇〇</span>
              </div>
            </div>
          </div>
          {/* ==== Phần thông tin chi tiết 2==== */}
          <div className="mt-4 px-2 font-bold">
            <span className="font-bold">前回実施情報</span>
            <div className="border border-black p-2 h-16 mt-1 text-sm">
              <div className="flex justify-between">
                <div className="flex flex-row">
                  <span className="w-28 h-5 bg-[#D9D9D9] flex justify-center items-center">
                    供給開始
                  </span>
                  <p className="ml-2">2025/05/01</p>
                </div>
                <div className="flex flex-row">
                  <span className="w-28 h-5 bg-[#D9D9D9] flex justify-center items-center">
                    消費調査
                  </span>
                  <p className="ml-2">2025/05/01</p>
                </div>
                <div className="flex flex-row">
                  <span className="w-28 h-5 bg-[#D9D9D9] flex justify-center items-center">
                    埋設管
                  </span>
                  <p className="ml-2">2025/05/01</p>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="flex flex-row">
                  <span className="w-28 h-5 bg-[#D9D9D9] flex justify-center items-center">
                    供給点検
                  </span>
                  <p className="ml-2">2025/05/01</p>
                </div>
                <div className="flex flex-row">
                  <span className="w-28 h-5 bg-[#D9D9D9] flex justify-center items-center text-[11px]">
                    消費調査（器具のみ）
                  </span>
                  <p className="ml-2">2025/05/01</p>
                </div>
                <div className="flex flex-row">
                  <span className="w-28 h-5 bg-[#D9D9D9] flex justify-center items-center">
                    地下室
                  </span>
                  <p className="ml-2">2025/05/01</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-row p-2">
            <div className="flex flex-row">
              <span className="w-28 h-5 bg-[#D9D9D9] flex justify-center items-center">
                印刷コード
              </span>
              <select className="border border-black ml-2 w-32">
                <option value="0">検索キー1</option>
                <option value="1">検索キー２</option>
                <option value="2">検索キー３</option>
              </select>
            </div>
            <div className="flex flex-row ml-4">
              <span className="w-28 h-5 bg-[#D9D9D9] flex justify-center items-center">
                集合装置
              </span>
              <select className="border border-black ml-2 w-24">
                <option value="0">00</option>
                <option value="1">01</option>
                <option value="2">02</option>
                <option value="3">03</option>
                <option value="4">04</option>
                <option value="5">05</option>
              </select>
            </div>
          </div>
          <div className="w-full flex justify-center items-center mt-5">
            <button
              onClick={onClose}
              className="w-36 h-10 bg-[#D9D9D9] font-bold"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
