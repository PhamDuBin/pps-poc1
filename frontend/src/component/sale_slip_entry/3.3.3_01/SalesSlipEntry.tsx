import React from "react";
import { useState, useRef, useEffect } from "react";
import DepositProcess from "./DepositProcess";
import CategorySelectionModal from "./CategorySelectionModal";
import SalesSlipEntryRegistration from "./SalesSlipEntryRegistration";
import { DownArrowIcon } from "../../transaction_information/LeftPanel";
import ProductSearchModal from "./ProductSearchModal";
import SaleDetailModal from "./SaleDetail/SaleDetailModal";
import StatusBar from "../StatusBar";
import { createPortal } from "react-dom";

export default function SalesSlipEntry({
  onOpenLeftPanelForSearch,
}: {
  onOpenLeftPanelForSearch: () => void;
}) {
  const [labelDeposit, setLabelDeposit] = useState("入金処理");
  const [isDeposited, setIsDeposited] = useState(false);
  const [isOpenCategorySelection, setIsOpenCategorySelection] = useState(false);
  const [isOpenDepositProcess, setIsOpenDepositProcess] = useState(false);
  const [isProductSearchModalOpen, setProductSearchModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSaleDetailModalOpen, setIsSaleDetailModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const [rowEdit, setRowEdit] = useState<any>(null);
  const [saleSlips, setSaleSlips] = useState([
    {
      headerRow: {
        no: "01",
        icon: "",
        categoryName: "売上",
        outsideMonth: 1,
        selfTransferTarget: 1,
      },
      bodyRow: {
        titleInfo: {
          productName: "パロマ 給湯器 PH-163EWS",
          supplierName: "ABC商事",
        },
        detailInfo: {
          quantity: "01",
          tax: "100,000",
        },
        note: "備考がある場合追加で表示。当月分が空白の場合ラベルは非表示。",
      },
    },
    {
      headerRow: {
        no: "02",
        icon: "",
        categoryName: "売上",
        outsideMonth: 1,
        selfTransferTarget: 1,
      },
      bodyRow: {
        titleInfo: {
          productName: "リンナイ 給湯器 RUX-V1615W-E",
          supplierName: "XYZ商会",
        },
        detailInfo: {
          quantity: "02",
          tax: "200,000",
        },
        note: "",
      },
    },
  ]);

  const [activeSlipIndex, setActiveSlipIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const slipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tooltipRef = useRef<HTMLDivElement | null>(null); // Ref cho div chứa tooltip

  const handleClickSlip = (index: number) => {
    if (activeSlipIndex === index) {
      setActiveSlipIndex(null);
      setTooltipPos(null);
      return;
    }
    setActiveSlipIndex(index);

    // Lấy tọa độ slip để định vị tooltip
    const rect = slipRefs.current[index]?.getBoundingClientRect();
    if (rect) {
      setTooltipPos({
        top: rect.top + window.scrollY + rect.height / 2 - 30, // căn giữa slip
        left: rect.right + 10 + window.scrollX, // đặt tooltip bên phải slip
      });
    }
  };
  
  // Handle Add Sale Slip
  const handleAddSaleSlip = (data: any) => {
    console.log("Line data:", data);
    setSaleSlips((prev) => {
      if (data.id !== undefined && data.id >= 0 && data.id < prev.length) {
        // ✅ Update slip by id
        const updated = [...prev];
        updated[data.id] = { ...data, id: data.id };
        return updated;
      } else {
        // ✅ Add slip new
        data.headerRow.no = (prev.length + 1).toString().padStart(2, "0");
        return [...prev, { ...data, id: prev.length }];
      }
    });
    setIsSaleDetailModalOpen(false);
    setCurrentStep(4);
  };

  const handleEditLine = (index: number) => {
    const rowData = saleSlips[index];
    setRowEdit({ ...rowData, id: index });
    setActiveSlipIndex(null);
    setSelectedCategory(saleSlips[index].headerRow.categoryName);     
    setTooltipPos(null);
    setIsSaleDetailModalOpen(true); // ✅ mở modal edit
    setCurrentStep(3);
  };

  const handleDeleteLine = (indexToDelete: number) => {
    const nextFocusIndex = indexToDelete > 0 ? indexToDelete - 1 : 0;
    setSaleSlips((prev) => prev.filter((_, i) => i !== indexToDelete));
    setActiveSlipIndex(null);
    if (saleSlips.length > 1) {
      setFocusIndex(nextFocusIndex);
    }
  };


  const handleOpenCategorySelection = () => {
    setActiveSlipIndex(null);
    setIsOpenCategorySelection(true);
    setRowEdit(null);
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsOpenCategorySelection(false);
    setProductSearchModalOpen(true);
    setCurrentStep(2);
  };

  const handleBackToCategory = () => {
    setProductSearchModalOpen(false);
    setIsOpenCategorySelection(true);
  };
  useEffect(() => {
    if (activeSlipIndex !== null && tooltipRef.current) {
      // Tìm tất cả các nút trong tooltip và focus vào nút đầu tiên
      const firstButton = tooltipRef.current.querySelector("button");
      firstButton?.focus();
    }
  }, [activeSlipIndex]); // Chạy mỗi khi activeSlipIndex thay đổi

  useEffect(() => {
    // Chạy khi `focusIndex` có giá trị và `saleSlips` đã được cập nhật
    if (focusIndex !== null && slipRefs.current[focusIndex]) {
      slipRefs.current[focusIndex]?.focus();
      // Reset lại để không chạy lại lần nữa
      setFocusIndex(null);
    }
  }, [saleSlips, focusIndex]);

  function focusNextElement() {
    const focusableElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(
      (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
    );

    const currentIndex = focusableElements.indexOf(
      document.activeElement as HTMLElement
    );
    if (currentIndex > -1) {
      const nextElement =
        focusableElements[currentIndex + 1] || focusableElements[0];
      nextElement.focus();
    }
  }

  // 3. Hàm xử lý sự kiện bàn phím trên tooltip
  const handleTooltipKeyDown = (e: React.KeyboardEvent) => {
    // Đóng tooltip khi nhấn mũi tên trái
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const originalSlip = slipRefs.current[activeSlipIndex!]; // Lấy lại slip gốc
      setActiveSlipIndex(null);
      setTooltipPos(null);
      originalSlip?.focus();

      // Giả lập nhấn phím Tab

      focusNextElement();
    }

    // Di chuyển focus giữa các nút trong tooltip
    else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const buttons = Array.from(
        tooltipRef.current?.querySelectorAll("button") || []
      ) as HTMLButtonElement[];
      const currentIndex = buttons.findIndex(
        (btn) => btn === document.activeElement
      );

      if (currentIndex > -1) {
        let nextIndex = 0;
        if (e.key === "ArrowDown") {
          nextIndex = (currentIndex + 1) % buttons.length;
        } else {
          nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        }
        buttons[nextIndex]?.focus();
      }
    }
  };

  console.log("rowedit:",rowEdit);

  return (
    <div className=" w-full h-full flex flex-col items-center px-4 pt-4 2xl:text-[16px] text-[11px]">
      {/* Header */}
      <div className="w-3/4">
        <div className="bg-[#D9D9D9] text-center font-bold py-2">
          <h1 className="text-[24px] font-bold text-black">売上伝票入力</h1>
        </div>
      </div>
      <div className="h-full w-3/5 mx-60 mt-4">
        {/* Customer Info */}
        <div className="w-full p-2 grid lg:grid-cols-4 grid-cols-3  gap-x-4 gap-y-2 whitespace-nowrap font-bold  text-black border border-black">
          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
              顧客氏名
            </label>
            <span className="ml-1 w-1/2 px-2 py-1">山田太郎</span>
          </div>
          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
              売上日
            </label>
            <input
              type="text"
              defaultValue="2025/05/01"
              className="ml-1 w-1/2 border border-black px-2 py-1"
            />
            <button className="mx-1 w-[20px] h-[20px] inset-y-0 right-0 flex items-center px-1 bg-white border border-gray-500 cursor-pointer">
              <DownArrowIcon />
            </button>
          </div>
          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
              品番No.
            </label>
            <input
              type="text"
              defaultValue="0000000000"
              className="ml-1 w-1/2 border border-black text-black px-2 py-1"
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
              伝票No.
            </label>
            <input
              type="text"
              defaultValue="0000000000"
              className="ml-1 w-1/2 border border-black px-2 py-1"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
              請求年月
            </label>
            <input
              type="text"
              defaultValue="2025/05"
              className="ml-1 w-1/2 border border-black px-2 py-1"
            />
            <button className="mx-1 w-[20px] h-[20px] inset-y-0 right-0 flex items-center px-1 bg-white border border-gray-500 cursor-pointer">
              <DownArrowIcon />
            </button>
          </div>
          <div className="flex items-center">
            <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
              担当者
            </label>
            <input
              type="text"
              defaultValue="営業タロウ"
              className="ml-1 w-1/2 border border-black px-2 py-1"
            />
            <button
              onClick={onOpenLeftPanelForSearch}
              className="mx-1 w-[20px] h-[20px] inset-y-0 right-0 flex items-center px-1 bg-white border border-gray-500 cursor-pointer"
            >
              <DownArrowIcon />
            </button>
          </div>
        </div>
        <div className="w-full max-h-96 overflow-y-auto border p-2 relative">
          {saleSlips.map((slip, index) => (
            <div
              key={index}
              ref={(el) => {
                slipRefs.current[index] = el;
              }}
              tabIndex={0}
              onClick={() => handleClickSlip(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "ArrowRight") {
                  e.preventDefault();
                  handleClickSlip(index);
                }
              }}
            >
              <SalesSlipEntryRegistration
                headerRow={slip.headerRow}
                bodyRow={slip.bodyRow}
              />
            </div>
          ))}

          {/* Tooltip hiển thị bằng Portal */}
          {activeSlipIndex !== null &&
            tooltipPos &&
            createPortal(
              // 5. Thêm ref và onKeyDown cho div của tooltip
              <div
                ref={tooltipRef}
                onKeyDown={handleTooltipKeyDown}
                style={{
                  position: "absolute",
                  top: tooltipPos.top,
                  left: tooltipPos.left,
                  zIndex: 9999,
                  width: "160px",
                }}
              >
                <div className="relative bg-white border border-black shadow-lg rounded-md p-2 font-normal text-[14px] text-black">
                  <div className="absolute top-4 -left-2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-[#D9D9D9]"></div>
                  <button
                    onClick={() => handleEditLine(activeSlipIndex!)}
                    className="block w-full px-2 py-1 hover:bg-gray-100 border border-black rounded shadow-md shadow-zinc-600 text-center">
                    行編集
                  </button>
                  <button
                    onClick={() => handleDeleteLine(activeSlipIndex)}
                    className="block w-full px-2 py-1 hover:bg-gray-100 border border-black rounded shadow-md shadow-zinc-600 mt-2 text-center"
                  >
                    行削除
                  </button>
                  <button
                    onClick={() => handleOpenCategorySelection()}
                    className="block w-full px-2 py-1 hover:bg-gray-100 border border-black rounded shadow-md shadow-zinc-600 mt-2 text-center"
                  >
                    行追加
                  </button>
                </div>
              </div>,
              document.body
            )}
        </div>
        {/* 行追加 */}
        <div className="flex justify-center items-center my-6 font-bold text-[16px] text-black">
          <button
            className="bg-[#EEEEEE] border border-black px-12 py-2 rounded shadow-md shadow-zinc-600"
            onClick={() => setIsOpenCategorySelection(true)}
          >
            行追加
          </button>
        </div>

        {/* 売上合計 */}
        <div className="w-full flex justify-end font-bold text-[16px] text-black">
          <div className="flex border border-black p-2 w-80">
            <div className="w-1/2 flex justify-center items-center">
              <span className="bg-[#D9D9D9] px-2 py-1 text-center">
                売上合計
              </span>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex justify-between px-2 py-1">
                <div></div>
                <div>0　</div>
              </div>
              <div className="flex justify-between px-2 py-1">
                <div>（税</div>
                <div>０）</div>
              </div>
            </div>
          </div>
        </div>

        {/* 入金処理 */}
      </div>
      <div className="w-3/5 bottom-0 flex justify-center items-center mt-12 font-bold text-[16px] text-black">
        <button
          className="bg-[#D9D9D9] border border-black px-12 py-2 rounded"
          onClick={() => setIsOpenDepositProcess(!isOpenDepositProcess)}
        >
          {labelDeposit}
        </button>
      </div>
      <div className="w-3/5 mt-0">
        {isOpenDepositProcess && (
          <DepositProcess
            isDeposited={isDeposited}
            onClose={() => {
              setIsOpenDepositProcess(false);
              setLabelDeposit("入金処理");
            }}
            onSave={() => {
              setLabelDeposit("入金済み");
              setIsDeposited(true);
              setIsOpenDepositProcess(false);
            }}
          />
        )}
      </div>
      {isOpenCategorySelection && (
        <CategorySelectionModal
          onClose={() => setIsOpenCategorySelection(false)}
          onCategorySelect={handleCategorySelect}
        />
      )}
      {currentStep === 2 && (
        <ProductSearchModal
          isOpen={isProductSearchModalOpen}
          onClose={handleBackToCategory}
          categoryName={selectedCategory}
          onNext={() => setCurrentStep(3)}
        />
      )}
      {currentStep === 3 && (
        <SaleDetailModal
          isOpen={isSaleDetailModalOpen}
          onClose={() => setCurrentStep(2)}
          categoryName={selectedCategory}
          onNext={handleAddSaleSlip}
          rowEdit={rowEdit}
          
        />

      )}
    </div>
  );
}
