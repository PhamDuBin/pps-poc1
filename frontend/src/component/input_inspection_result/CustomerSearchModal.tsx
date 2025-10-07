import AdvanceSearchModal from "../transaction_information/1.1.1_03/AdvanceSearchModal";
import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { fieldDefinitionsLeftPanel } from "../../constants/sale_slip_entry";
import React from "react";
import { Button } from "antd";

interface CustomerDetails {
  name: string;
  status: string;
  supplyType: string;
  address1: string;
  address2: string;
  phoneNumber: string;
  district: string;
  map: string;
  distance: string;
  guidance: string;
  supplyStartDate: string;
  consumptionSurveyDate: string;
  buriedPipeDate: string;
  supplyInspectionDate: string;
  consumptionSurveyApplianceOnlyDate: string;
  basementDate: string;
}

export const CustomerSearchModal = ({ onClose }: { onClose: () => void }) => {
  type FieldId = (typeof fieldDefinitionsLeftPanel)[number]["id"];
  type FormValues = { [key in FieldId]?: string | string[] };
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);
  const [selectedFieldId, setSelectedFieldId] = useState<FieldId>(
    fieldDefinitionsLeftPanel[0].id
  );
  const currentField = fieldDefinitionsLeftPanel.find(
    (f) => f.id === selectedFieldId
  );
  const [formValues, setFormValues] = useState<FormValues>({});
  const [officeCode, setOfficeCode] = useState(["", ""]);
  const [officeName, setOfficeName] = useState("");
  const [customerData, setCustomerData] = useState<CustomerDetails | null>(
    null
  );
  const isCustomerCodeSelected = selectedFieldId === "customerCode";
  const customerCodeValues = (formValues.customerCode as string[]) || [];
  const areButtonsDisabled =
    isCustomerCodeSelected &&
    (!customerCodeValues[0] || !customerCodeValues[1]);
  const areButtonsOfficeDisabled = !officeCode[0] || !officeCode[1];

  const firstInputRef = useRef<HTMLInputElement>(null);
  const customerCode1Ref = useRef<HTMLInputElement>(null);
  const resetCustomerBtnref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const handleOfficeSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && officeCode[0] && officeCode[1]) {
      e.preventDefault();
      setOfficeName("関東地方営業事務所");
    }
  };

  const showCustomerDetails = () => {
    const mockData: CustomerDetails = {
      name: "鈴木　カンクロウ",
      status: "新規開栓",
      supplyType: "個別",
      address1: "埼玉県さいたま市なんちゃら０００１",
      address2: "さいたま市宮団地００１−２０１号室",
      phoneNumber: "03-1234-9999",
      district: "空白〇〇〇〇",
      map: "空白",
      distance: "25km（53分）",
      guidance: "空白〇〇〇〇",
      supplyStartDate: "2025/05/01",
      consumptionSurveyDate: "2025/05/01",
      buriedPipeDate: "2025/05/01",
      supplyInspectionDate: "2025/05/01",
      consumptionSurveyApplianceOnlyDate: "2025/05/01",
      basementDate: "2025/05/01",
    };
    setCustomerData(mockData);
    setTimeout(() => {
      if (resetCustomerBtnref.current) {
        resetCustomerBtnref.current.focus();
      }
    }, 100);
  };

  const handleDynamicInputEnter = (
    e: KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const currentValues = formValues[selectedFieldId];
      if (
        Array.isArray(currentValues)
          ? currentValues.some((v) => v)
          : currentValues
      ) {
        showCustomerDetails();
      }
    }
  };

  if (showAdvanceSearch) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="w-1/2">
          <AdvanceSearchModal
            showAdvanceSearch={showAdvanceSearch}
            setShowAdvanceSearch={setShowAdvanceSearch}
            onRowEnter={() => {
              showCustomerDetails();
              setFormValues((prev) => ({
                ...prev,
                customerCode: ["000000", "000000"],
              }));
            }}
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
    let newValues: string | string[] =
      formValues[selectedFieldId] ||
      (currentField.type === "multi" || currentField.type === "double"
        ? []
        : "");

    if (Array.isArray(newValues)) {
      const tempArray = [...newValues];
      if (index !== null) {
        tempArray[index] = value;
      }
      newValues = tempArray;
    } else {
      if (
        index !== null &&
        (currentField.type === "multi" ||
          currentField.type === "double" ||
          currentField.type === "dropdown")
      ) {
        const tempArray = currentField.type === "dropdown" ? ["", ""] : [];
        tempArray[index] = value;
        newValues = tempArray;
      } else {
        newValues = value;
      }
    }

    setFormValues((prev) => ({ ...prev, [selectedFieldId]: newValues }));
  };

  const renderDynamicInput = (): React.ReactNode => {
    if (!currentField) return null;
    const value = formValues[currentField.id];

    const commonInputProps = {
      onKeyDown: handleDynamicInputEnter,
    };

    switch (currentField.type) {
      case "multi":
        return (
          <div className="flex items-center space-x-1 mr-[1px]">
            {currentField.partSizes?.map((size, index) => (
              <React.Fragment key={index}>
                <input
                  ref={customerCode1Ref}
                  type="text"
                  placeholder="000"
                  className="w-20 h-6 border border-black p-1 text-center placeholder-gray-400 bg-[#ebcec0]"
                  style={{ width: `${size}px` }}
                  value={(Array.isArray(value) && value[index]) || ""}
                  onChange={(e) => handleValueChange(e.target.value, index)}
                  {...commonInputProps}
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
              ref={customerCode1Ref}
              type="text"
              className="border border-black p-1 placeholder-gray-400 w-20 h-6 bg-[#ebcec0]"
              placeholder="000000"
              value={(Array.isArray(value) && value[0]) || ""}
              onChange={(e) => handleValueChange(e.target.value, 0)}
              {...commonInputProps}
            />
            <span> - </span>
            <input
              type="text"
              className="border w-20 h-6 border-gray-400 p-1 bg-[#ebcec0]"
              value={(Array.isArray(value) && value[1]) || ""}
              onChange={(e) => handleValueChange(e.target.value, 1)}
              placeholder="000000"
              {...commonInputProps}
            />
          </div>
        );
      case "double":
        return (
          <div className="flex gap-4">
            <input
              ref={customerCode1Ref}
              type="text"
              className="border w-20 h-6 border-gray-400 p-1 placeholder-gray-400 bg-[#ebcec0]"
              value={(Array.isArray(value) && value[0]) || ""}
              onChange={(e) => handleValueChange(e.target.value, 0)}
              placeholder="000000"
              {...commonInputProps}
            />
            <div>-</div>
            <input
              type="text"
              className="border w-20 h-6 border-gray-400 p-1 placeholder-gray-400 bg-[#ebcec0]"
              value={(Array.isArray(value) && value[1]) || ""}
              onChange={(e) => handleValueChange(e.target.value, 1)}
              placeholder="000000"
              {...commonInputProps}
            />
          </div>
        );
      default:
        return (
          <>
            <input
              ref={customerCode1Ref}
              type="text"
              className="border h-6 border-black p-1 w-[197px] mr-[-1px] bg-[#ebcec0]"
              value={(typeof value === "string" && value) || ""}
              onChange={(e) => handleValueChange(e.target.value)}
              {...commonInputProps}
            />
          </>
        );
    }
  };

  const handleResetCustomerCode = () => {
    setFormValues((prev) => ({
      ...prev,
      customerCode: ["", ""],
    }));
    setCustomerData(null);
    if (customerCode1Ref.current) {
      customerCode1Ref.current.focus();
    }
  };

  const handleResetOfficeCode = () => {
    setFormValues((prev) => ({
      ...prev,
      officeCode: ["", ""],
    }));
    setOfficeCode(["", ""]);
    setOfficeName("");
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
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
                <input
                  ref={firstInputRef}
                  className="w-20 h-6 border border-black text-center"
                  value={officeCode[0]}
                  onChange={(e) =>
                    setOfficeCode([e.target.value, officeCode[1]])
                  }
                  onKeyDown={handleOfficeSearch}
                />
                <p>-</p>
                <input
                  className="w-20 h-6 border border-black text-center"
                  value={officeCode[1]}
                  onChange={(e) =>
                    setOfficeCode([officeCode[0], e.target.value])
                  }
                  onKeyDown={handleOfficeSearch}
                />
                <Button
                  onClick={() => setShowAdvanceSearch(true)}
                  className="w-[22px] h-[22px] flex items-center justify-center border border-gray-500 shadow-md shadow-zinc-600"
                >
                  ▼
                </Button>
                <p>{officeName}</p>
                <Button
                  onClick={handleResetOfficeCode}
                  disabled={areButtonsOfficeDisabled}
                  className={`w-14 h-6 flex justify-center items-center border border-b rounded-md ml-[2.8rem] ${
                    areButtonsOfficeDisabled
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed "
                      : "bg-white shadow-md shadow-zinc-600"
                  }`}
                >
                  再入力
                </Button>
              </div>

              <div className="flex flex-row items-center gap-4 mt-2">
                <>
                  <select
                    className="bg-[#D9D9D9] w-28 h-6 text-center"
                    value={selectedFieldId}
                    onChange={(e) => {
                      setSelectedFieldId(e.target.value as FieldId);
                      setCustomerData(null);
                    }}
                  >
                    {fieldDefinitionsLeftPanel.map((field) => (
                      <option key={field.id} value={field.id}>
                        {field.label}
                      </option>
                    ))}
                  </select>

                  <div className="flex">{renderDynamicInput()}</div>
                </>
                <Button
                  onClick={() => setShowAdvanceSearch(true)}
                  className="w-[18px] h-[22px] flex items-center justify-center border border-gray-500 shadow-md shadow-zinc-600"
                >
                  ▼
                </Button>
                <Button
                  onClick={onClose}
                  disabled={areButtonsDisabled}
                  className={`w-11 h-6 flex justify-center items-center border border-b rounded-md ${
                    areButtonsDisabled
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white shadow-md shadow-zinc-600"
                  }`}
                >
                  確定
                </Button>
                <Button
                  ref={resetCustomerBtnref}
                  onClick={handleResetCustomerCode}
                  disabled={areButtonsDisabled}
                  className={`w-14 h-6 flex justify-center items-center border border-b rounded-md ${
                    areButtonsDisabled
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white shadow-md shadow-zinc-600"
                  }`}
                >
                  再入力
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4 px-2">
            <span className="font-bold">顧客情報詳細</span>
            <div className="border border-black p-4 mt-1 text-sm">
              <div className="grid grid-cols-[auto_1fr_auto_1fr_auto_1fr] items-center gap-x-4 gap-y-2">
                <span className="w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  氏名
                </span>
                <span>{customerData?.name}</span>
                <span className="w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  開閉
                </span>
                <span>{customerData?.status}</span>
                <span className="w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  供給
                </span>
                <span>{customerData?.supplyType}</span>
                <span className="w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold row-span-2">
                  住所
                </span>
                <div className="col-span-3">
                  <p>{customerData?.address1}</p>
                  <p>{customerData?.address2}</p>
                </div>
                <span className="w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  電話番号
                </span>
                <span>{customerData?.phoneNumber}</span>

                <div className="col-span-3"></div>
                <div></div>
                <div></div>
                <span className="w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  地区
                </span>
                <span>{customerData?.district}</span>
                <span className="w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  地図
                </span>
                <span>{customerData?.map}</span>
                <span className="w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  距離
                </span>
                <span>{customerData?.distance}</span>
                <span className="w-20 h-6 flex items-center justify-center bg-gray-300 border border-black font-bold">
                  案内
                </span>
                <span className="col-span-5">{customerData?.guidance}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 px-2">
            <span className="font-bold">前回実施情報</span>
            <div className="border border-black p-4 mt-1 text-sm">
              <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                <div className="flex items-center">
                  <span className="w-32 h-6 bg-[#D9D9D9] flex justify-center items-center text-center">
                    供給開始
                  </span>
                  <p className="ml-4">{customerData?.supplyStartDate}</p>
                </div>
                <div className="flex items-center">
                  <span className="w-32 h-6 bg-[#D9D9D9] flex justify-center items-center text-center">
                    消費調査
                  </span>
                  <p className="ml-4">{customerData?.consumptionSurveyDate}</p>
                </div>
                <div className="flex items-center">
                  <span className="w-32 h-6 bg-[#D9D9D9] flex justify-center items-center text-center">
                    埋設管
                  </span>
                  <p className="ml-4">{customerData?.buriedPipeDate}</p>
                </div>
                <div className="flex items-center">
                  <span className="w-32 h-6 bg-[#D9D9D9] flex justify-center items-center text-center">
                    供給点検
                  </span>
                  <p className="ml-4">{customerData?.supplyInspectionDate}</p>
                </div>
                <div className="flex items-center">
                  <span className="w-32 h-6 bg-[#D9D9D9] flex justify-center items-center text-center text-[11px] leading-tight">
                    消費調査（器具のみ）
                  </span>
                  <p className="ml-4">
                    {customerData?.consumptionSurveyApplianceOnlyDate}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="w-32 h-6 bg-[#D9D9D9] flex justify-center items-center text-center">
                    地下室
                  </span>
                  <p className="ml-4">{customerData?.basementDate}</p>
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
            <Button
              onClick={onClose}
              className="w-36 h-10 bg-[#D9D9D9] font-bold shadow-md shadow-zinc-600"
            >
              閉じる
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
