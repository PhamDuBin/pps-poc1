//■左カラム顧客検索＆情報表示ランチャー
import { useEffect, useRef, useState } from "react";
import AdvanceSearchModal from "./1.1.1_03/AdvanceSearchModal";
import TooltipPortal from "./1.1.1_03/TooltipPortal";
import {
  extractHalfWidthDigits,
  convertToFullWidth,
  handleFormatting,
  allowDecimalInput,
} from "../../utils/InputHandlers";

export const DownArrowIcon = () => (
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

type LeftPanelProps = {
  showAdvanceSearch: boolean;
  setShowAdvanceSearch: React.Dispatch<React.SetStateAction<boolean>>;
  lastButtonRef: React.Ref<HTMLButtonElement>;
  firstInputRef: React.Ref<HTMLInputElement>;
};

const LeftPanel: React.FC<LeftPanelProps> = ({
  showAdvanceSearch,
  setShowAdvanceSearch,
  lastButtonRef,
  firstInputRef,
}) => {
  const [postcode1, setPostcode1] = useState("");
  const [postcode2, setPostcode2] = useState("");
  const [showDepart, setShowDepart] = useState(false);
  const [id1, setId1] = useState("");
  const [id2, setId2] = useState("");
  const [showCustomer, setShowCustomer] = useState(false);

  const [tooltip, setTooltip] = useState({
    visible: false,
    content: null as React.ReactNode | null,
    top: 0,
    left: 0,
  });
  const tantoRef = useRef<HTMLButtonElement>(null);
  const bikouRef = useRef<HTMLButtonElement>(null);

  const customerId1Ref = useRef<HTMLInputElement>(null);
  const advancedSearchButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (showDepart) {
      customerId1Ref.current?.focus();
    }
  }, [showDepart]);

  useEffect(() => {
    if (showCustomer) {
      advancedSearchButtonRef.current?.focus();
    }
  }, [showCustomer]);

  const handleShowTooltip = (
    ref: React.RefObject<HTMLButtonElement | null>,
    content: React.ReactNode
  ) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setTooltip({
        visible: true,
        content: content,
        top: rect.top,
        left: rect.right + 8,
      });
    }
  };

  const tantoTooltipContent = (
    <div className="w-36 bg-white border border-gray-400 rounded shadow-lg p-2 text-xs">
      <div className="font-bold mb-1 text-center bg-gray-200 p-1">
        担当者表示
      </div>
      <div className="mb-2">
        <span className="font-bold bg-gray-200 p-0.5 mr-2">営業</span> 001
        担当者名01
      </div>
      <div className="mb-2">
        <span className="font-bold bg-gray-200 p-0.5 mr-2">営業</span> 001
        担当者名01
      </div>
      <div className="mb-2">
        <span className="font-bold bg-gray-200 p-0.5 mr-2">営業</span> 001
        担当者名01
      </div>
      <div className="mb-2">
        <span className="font-bold bg-gray-200 p-0.5 mr-2">営業</span> 001
        担当者名01
      </div>
    </div>
  );

  const bikouTooltipContent = (
    <div className="w-64 bg-white border border-gray-400 rounded shadow-lg p-2 text-xs">
      <div className="font-bold mb-1 text-center bg-gray-200 p-1">顧客備考</div>
      <div className="mb-2">
        <span className="font-bold bg-gray-200 p-0.5 mr-2">顧客備考1</span>
        住所仮のものになります。
      </div>
      <div className="mb-2">
        <span className="font-bold bg-gray-200 p-0.5 mr-2">顧客備考2</span>
        世帯主様に直接お伺い。
      </div>
      <div className="mb-2">
        <span className="font-bold bg-gray-200 p-0.5 mr-2">顧客備考3</span>
      </div>
    </div>
  );

  const nippouTooltipContent = (
    <div className="w-48 bg-white border border-gray-400 rounded shadow-lg p-2 text-xs">
      <div className="font-bold text-center bg-gray-200 p-1">
        日報入力画面を表示
      </div>
    </div>
  );

  const handleHideTooltip = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const handleSearchDepartment = () => {
    if (postcode1 && postcode2) {
      setShowDepart(true);
    } else {
      setShowDepart(false);
    }
  };

  const handleSearchCustomer = () => {
    if (id1 && id2) {
      setShowCustomer(true);
    } else {
      setShowCustomer(false);
    }
  };

  const handlePostcodeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchDepartment();
    }
  };

  const handleCustomerIdKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchCustomer();
    }
  };

  // NEW: Function to reset department search
  const handleResetDepartmentSearch = () => {
    setPostcode1("");
    setPostcode2("");
    setShowDepart(false);
  };

  // NEW: Function to reset customer search
  const handleResetCustomerSearch = () => {
    setId1("");
    setId2("");
    setShowCustomer(false);
  };

  const handleShowHardcodedCustomer = () => {
    setId1("000000");
    setId2("000");
    setShowCustomer(true);
    setPostcode1("000000");
    setPostcode2("000");
    setShowDepart(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const isComboPressed =
        e.code === "KeyC" && e.altKey && (isMac ? e.metaKey : e.ctrlKey);

      if (isComboPressed && showAdvanceSearch) {
        e.preventDefault();
        setShowAdvanceSearch(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showAdvanceSearch]);

  const handleOpenWindow = () => {
    const win = window.open(
      "/link-destination",
      "_blank",
      "width=800,height=600,noopener,noreferrer"
    );

    if (win) {
      win.focus();
    }
  };

  return (
    <div className="w-72 overflow-y-auto  h-screen p-3 bg-[#d8dadc] border-2 border-gray-400 font-sans">
      <div className="mb-4">
        <div className="text-center text-sm bg-[#80bad7] py-1 font-semibold border border-black">
          {!showDepart ? "事務所コード" : "事務所情報"}
        </div>
        <div className="text-xs flex items-center flex-row py-2 w-full">
          {!showDepart ? (
            <>
              <input
                ref={firstInputRef}
                type="text"
                placeholder="0000"
                value={postcode1} // MODIFIED: Bind value
                className="w-[30%] bg-[#ebcec0] px-1 py-0.5 border border-black"
                onChange={(e) =>
                  setPostcode1(extractHalfWidthDigits(e.target.value))
                }
                onKeyDown={(e) => {
                  handlePostcodeKeyDown(e);
                  allowDecimalInput(e);
                }}
              />
              <span className="mx-1">-</span>
              <input
                type="text"
                placeholder="000"
                value={postcode2} // MODIFIED: Bind value
                className="w-[30%] bg-[#ebcec0] px-1 py-0.5 border border-black "
                onChange={(e) =>
                  setPostcode2(extractHalfWidthDigits(e.target.value))
                }
                onKeyDown={(e) => {
                  handlePostcodeKeyDown(e);
                  allowDecimalInput(e);
                }}
              />
              <button
                onClick={() => {
                  setShowAdvanceSearch(true);
                }}
                className="mx-1 w-[20px] h-[20px] inset-y-0 right-0 flex items-center px-1 bg-gray-200 border border-black cursor-pointer"
              >
                <DownArrowIcon />
              </button>
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <span>
                {postcode1} - {postcode2}
              </span>
              <button
                onClick={handleResetDepartmentSearch} // MODIFIED: Added onClick
                className=" border border-black rounded"
              >
                <span className="w-[25%] m-2">再検索</span>
              </button>
            </div>
          )}
        </div>
        {showDepart && (
          <div className="text-xs flex flex-col">
            <span>東京23区担当営業所</span>
            <span>サンプル部門</span>
          </div>
        )}
      </div>

      {/* Customer Code Section */}
      <div className="mb-4">
        <div className="text-center text-sm bg-[#80bad7] border border-black py-1 font-semibold">
          {!showCustomer ? "顧客コード" : "顧客情報"}
        </div>
        <div className="text-xs flex items-center flex-row py-2 w-full">
          {!showCustomer ? (
            <>
              <input
                ref={customerId1Ref}
                type="text"
                placeholder="000000"
                value={id1} // MODIFIED: Bind value
                className="w-[30%] bg-[#ebcec0] px-1 py-0.5 border border-gray-500"
                onChange={(e) => setId1(extractHalfWidthDigits(e.target.value))}
                onKeyDown={(e) => {
                  handleCustomerIdKeyDown(e);
                  allowDecimalInput(e);
                }}
              />
              <span className="mx-1">-</span>
              <input
                type="text"
                placeholder="000"
                value={id2} // MODIFIED: Bind value
                className="w-[30%] bg-[#ebcec0] px-1 py-0.5 border border-gray-500"
                onChange={(e) => setId2(extractHalfWidthDigits(e.target.value))}
                onKeyDown={(e) => {
                  handleCustomerIdKeyDown(e);
                  allowDecimalInput(e);
                }}
              />
              <button
                onClick={() => {
                  setShowAdvanceSearch(true);
                }}
                className="mx-1 w-[20px] h-[20px] inset-y-0 right-0 flex items-center px-1 bg-gray-200 border border-black cursor-pointer"
              >
                <DownArrowIcon />
              </button>
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <span>
                {id1} - {id2}
              </span>
              <button
                onClick={handleResetCustomerSearch}
                className="border border-black rounded"
              >
                <span className="w-[25%] m-2">再検索</span>
              </button>
            </div>
          )}
        </div>
        {showCustomer && (
          <div className="text-xs flex flex-col">
            <span>山田　太郎</span>
            <span>東京都文京区小石川1-1-1 文京ビルディング</span>
            <div>
              <div className="mt-2 flex flex-row justify-between items-center">
                <label className="bg-gray-200 p-1 font-bold w-[80px] text-center">
                  電話番号
                </label>
                <span>03-1234-9999</span>
                <button
                  onClick={handleOpenWindow}
                  className="border border-black rounded"
                >
                  <span className="w-[25%] m-2">電話番号</span>
                </button>
              </div>
              <div className="mt-2 flex flex-row items-center">
                <label className="bg-gray-200 p-1 font-bold w-[80px] text-center">
                  地図番号
                </label>
                <span className="ml-1">X0123:Y0315</span>
              </div>
            </div>
            {/* black line */}
            <div className="border border-black mt-4"></div>
            <div className="mt-2 flex flex-col">
              <div className="mb-2 flex flex-row items-center">
                <label className="bg-gray-200 p-1 font-bold w-[80px] text-center">
                  当月締日
                </label>
                <span className="ml-4">2025/05/31</span>
              </div>
              <div className="mb-2 flex flex-row items-center">
                <label className="bg-gray-200 p-1 font-bold w-[80px] text-center">
                  回収
                </label>
                <span className="ml-4">自振翌月</span>
              </div>
              <div className="mb-2 flex flex-row justify-between items-center">
                <label className="bg-gray-200 p-1 font-bold w-[80px] text-center">
                  締日
                </label>
                <span className="ml-4">31</span>
                <label className="bg-gray-200 p-1 font-bold w-[80px] text-center">
                  集金日
                </label>
                <span className="ml-4">14</span>
              </div>
            </div>
            <div className="border border-black mt-4"></div>
            <div className="mt-2 flex flex-col">
              <div className="mb-2 flex flex-row items-center">
                <label className="bg-gray-200 p-1 font-bold w-[80px] text-center">
                  開閉栓区分
                </label>
                <span className="ml-4">新規開栓（2017/10/17）</span>
              </div>
              <div className="mb-2 flex flex-row items-center justify-between">
                <label className="bg-gray-200 p-1 font-bold w-[80px] text-center">
                  不可能回収
                </label>
                <span>0回</span>
                <label className="bg-gray-200 p-1 font-bold w-[80px] text-center">
                  回収日数
                </label>
                <span>0回</span>
              </div>
            </div>
          </div>
        )}
        <div className="text-xs mt-4 flex items-center flex-col gap-2">
          <button
            ref={advancedSearchButtonRef}
            onClick={() => setShowAdvanceSearch(true)}
            className="border text-center border-black p-2 rounded-md shadow-md shadow-zinc-600"
          >
            詳細検索（S）
          </button>
          <button className="w-1/2 font-bold border text-center border-black p-2 text-white bg-[#4d7a90] shadow-md shadow-zinc-600">
            請求親
          </button>
          <button
            ref={tantoRef}
            onMouseEnter={() =>
              handleShowTooltip(tantoRef, tantoTooltipContent)
            }
            onFocus={() =>
              handleShowTooltip(
                tantoRef as React.RefObject<HTMLButtonElement>,
                tantoTooltipContent
              )
            }
            onMouseLeave={handleHideTooltip}
            className="w-1/2 font-bold border text-center border-black p-2 bg-[#80bad7] shadow-md shadow-zinc-600"
          >
            担当者
          </button>

          <button
            ref={bikouRef}
            onMouseEnter={() =>
              handleShowTooltip(bikouRef, bikouTooltipContent)
            }
            onFocus={() =>
              handleShowTooltip(
                bikouRef as React.RefObject<HTMLButtonElement>,
                bikouTooltipContent
              )
            }
            onMouseLeave={handleHideTooltip}
            className="w-1/2 font-bold border text-center border-black p-2 bg-[#80bad7] shadow-md shadow-zinc-600"
          >
            顧客備考
          </button>
          <button
            ref={lastButtonRef}
            onClick={handleOpenWindow}
            onMouseEnter={() =>
              handleShowTooltip(
                lastButtonRef as React.RefObject<HTMLButtonElement>,
                nippouTooltipContent
              )
            }
            onFocus={() =>
              handleShowTooltip(
                lastButtonRef as React.RefObject<HTMLButtonElement>,
                nippouTooltipContent
              )
            }
            onBlur={handleHideTooltip}
            onMouseLeave={handleHideTooltip}
            className="w-1/2 font-bold border text-center border-black p-2 bg-[#80bad7] shadow-md shadow-zinc-600"
          >
            日報入力
          </button>
        </div>
      </div>
      {showAdvanceSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg relative w-[700px] max-w-full">
            <AdvanceSearchModal
              showAdvanceSearch={showAdvanceSearch}
              setShowAdvanceSearch={setShowAdvanceSearch}
              onRowEnter={handleShowHardcodedCustomer}
            />
          </div>
        </div>
      )}
      {tooltip.visible && (
        <TooltipPortal>
          <div
            className="absolute z-50"
            style={{ top: `${tooltip.top}px`, left: `${tooltip.left}px` }}
          >
            {tooltip.content}
          </div>
        </TooltipPortal>
      )}
    </div>
  );
};

export default LeftPanel;
