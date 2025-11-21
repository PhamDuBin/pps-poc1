import React from "react";
import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import DepositProcess from "./DepositProcess";
import CategorySelectionModal from "./CategorySelectionModal";
import SalesSlipEntryRegistration from "./SalesSlipEntryRegistration";
import ProductSearchModal from "./ProductSearchModal";
import SaleDetailModal from "./SaleDetail/SaleDetailModal";
import { createPortal } from "react-dom";
import JapaneseCalendar, {
  JapaneseCalendarHandle,
} from "../../JapaneseCalendar";
import JapaneseMonthPicker, {
  JapaneseMonthPickerHandle,
} from "../../JapaneseMonthPicker";
import { HalfWidthNumberInput } from "../../input/JapaneseInputs";
import { Select, Button } from "antd";

type SalesSlipEntryProps = {
  onOpenLeftPanelForSearch: () => void;
};

const SalesSlipEntry = forwardRef(
  ({ onOpenLeftPanelForSearch }: SalesSlipEntryProps, ref) => {
    const [labelDeposit, setLabelDeposit] = useState("入金処理");
    const [isDeposited, setIsDeposited] = useState(false);
    const [isOpenCategorySelection, setIsOpenCategorySelection] =
      useState(false);
    const [isOpenDepositProcess, setIsOpenDepositProcess] = useState(false);
    const [isProductSearchModalOpen, setProductSearchModalOpen] =
      useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentStep, setCurrentStep] = useState(1);
    const [focusIndex, setFocusIndex] = useState<number | null>(null);
    const [rowEdit, setRowEdit] = useState<any>(null);
    const [saleSlips, setSaleSlips] = useState<any>([]);
    const [selectedTanto, setSelectedTanto] = useState("営業タロウ");
    const [numberValue, setNumberValue] = useState("0000000000");
    const [numberValue1, setNumberValue1] = useState("0000000000");

    const tantoOptions = [
      "営業タロウ",
      "営業ジロウ",
      "営業サブロウ",
      "営業シロウ",
    ];

    const [activeSlipIndex, setActiveSlipIndex] = useState<number | null>(null);
    const [tooltipPos, setTooltipPos] = useState<{
      top: number;
      left: number;
    } | null>(null);
    const slipRefs = useRef<(HTMLDivElement | null)[]>([]);
    const tooltipRef = useRef<HTMLDivElement | null>(null);

    const [keiriDate, setKeiriDate] = useState<Date>(new Date());

    const [uriageDate, setUriageDate] = useState<Date>(new Date());

    const uriageDateCalendarRef = useRef<JapaneseCalendarHandle>(null);
    const billingDatePickerRef = useRef<JapaneseMonthPickerHandle>(null);

    useImperativeHandle(ref, () => ({
      focusUriageDateCalendar: () => {
        uriageDateCalendarRef.current?.focus();
      },
      openCategorySelection: () => {
        setIsOpenCategorySelection(true);
      },
      focusBillingDatePicker: () => {
        billingDatePickerRef.current?.focus();
      },
      toggleDepositProcess: () => {
        setIsOpenDepositProcess((prev) => !prev);
      },
    }));

    const handleClickSlip = (index: number) => {
      if (activeSlipIndex === index) {
        setActiveSlipIndex(null);
        setTooltipPos(null);
        return;
      }
      setActiveSlipIndex(index);

      const rect = slipRefs.current[index]?.getBoundingClientRect();
      if (rect) {
        setTooltipPos({
          top: rect.top + window.scrollY + rect.height / 2 - 30,
          left: rect.right + 10 + window.scrollX,
        });
      }
    };

    const handleAddSaleSlip = useCallback((data: any) => {
      let isEditing = data.id !== undefined && data.id >= 0;

      setSaleSlips((prev: any) => {
        if (isEditing) {
          const updated = [...prev];
          updated[data.id] = { ...data, id: data.id };
          return updated;
        } else {
          data.headerRow.no = (prev.length + 1).toString().padStart(2, "0");
          const newSlip = { ...data, id: prev.length };
          return [...prev, newSlip];
        }
      });

      setRowEdit(undefined);
      setCurrentStep(4);

      setFocusIndex(isEditing ? data.id : 0);
    }, []);

    const handleCloseSaleDetailModal = useCallback(() => {
      setCurrentStep(2);
    }, []);

    const handleBackFromSaleDetail = useCallback(() => {
      setCurrentStep(1);
      setIsOpenCategorySelection(true);
    }, []);

    const handleEditLine = (index: number) => {
      const rowData = saleSlips[index];
      setRowEdit({ ...rowData, id: index });
      setActiveSlipIndex(null);
      setSelectedCategory(saleSlips[index].headerRow.categoryName);
      setTooltipPos(null);
      setCurrentStep(3);
    };

    const handleDeleteLine = (indexToDelete: number) => {
      const nextFocusIndex = indexToDelete > 0 ? indexToDelete - 1 : 0;
      setSaleSlips((prev: any) =>
        prev.filter((_: any, i: any) => i !== indexToDelete)
      );
      setActiveSlipIndex(null);
      if (saleSlips.length > 1) {
        setFocusIndex(nextFocusIndex);
      }
    };

    const handleOpenCategorySelection = () => {
      setActiveSlipIndex(null);
      setIsOpenCategorySelection(true);
      setRowEdit(undefined);
    };

    const handleCategorySelect = (categoryName: string) => {
      setSelectedCategory(categoryName);
      setIsOpenCategorySelection(false);
      setRowEdit(undefined);

      if (categoryName === "7.消費税") {
        setCurrentStep(3);
      } else {
        setProductSearchModalOpen(true);
        setCurrentStep(2);
      }
    };

    const handleBackToCategory = () => {
      setProductSearchModalOpen(false);
      setIsOpenCategorySelection(true);
      setRowEdit(undefined);
    };

    useEffect(() => {
      if (activeSlipIndex !== null && tooltipRef.current) {
        const firstButton = tooltipRef.current.querySelector("button");
        firstButton?.focus();
      }
    }, [activeSlipIndex]);

    useEffect(() => {
      if (focusIndex !== null) {
        const targetRow = slipRefs.current[focusIndex];
        if (targetRow) {
          const firstFocusableElement = targetRow.querySelector<HTMLElement>(
            'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );

          if (firstFocusableElement) {
            firstFocusableElement.focus();
          } else {
            targetRow.focus();
          }

          setFocusIndex(null);
        }
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

    const handleTooltipKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const originalSlip = slipRefs.current[activeSlipIndex!];
        setActiveSlipIndex(null);
        setTooltipPos(null);
        originalSlip?.focus();
        focusNextElement();
      } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
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

    return (
      <div className=" w-full h-full flex flex-col items-center px-4 pt-4 2xl:text-[16px] text-[11px] sale-slip-entry">
        <style>{`
          .sale-slip-entry input:focus,
          .sale-slip-entry textarea:focus,
          .sale-slip-entry select:focus {
            background-color: #ffffcc !important;
            outline: 2px solid #4a90e2;
          }
        `}</style>
        {/* Header */}
        <div className="w-full">
          <div className="bg-[#D9D9D9] text-center font-bold py-2">
            <h1 className="text-[24px] font-bold text-black">売上伝票入力</h1>
          </div>
        </div>
        <div className="h-full w-[95%] mx-60 mt-4">
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
              <div className="relative mx-1 w-1/2">
                <JapaneseCalendar
                  ref={uriageDateCalendarRef}
                  value={uriageDate}
                  onChange={(date) => setUriageDate(date)}
                  format="yyyy/MM/dd"
                  placeholder="YYYY/MM/DD"
                  className="w-full border border-black px-2 py-1 h-[26px] "
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
                品番No.
              </label>
              <HalfWidthNumberInput
                value={numberValue}
                onChange={(val) => setNumberValue(val)}
                className="ml-1 w-1/2 border border-black text-black px-1 py-1 h-[26px]"
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
                伝票No.
              </label>
              <HalfWidthNumberInput
                value={numberValue1}
                onChange={(val) => setNumberValue1(val)}
                className="ml-1 w-1/2 border border-black px-2 py-1 h-[26px]"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
                請求年月
              </label>
              <div className="relative ml-1 w-1/2">
                <JapaneseMonthPicker
                  ref={billingDatePickerRef}
                  value={keiriDate}
                  onChange={(date) => setKeiriDate(date)}
                  format="yyyy/MM"
                  placeholder="YYYY/MM"
                  className="w-full border border-black px-2 py-1 h-[26px] rounded-none"
                />
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-1/2 bg-[#D9D9D9] px-2 py-1 text-center">
                担当者
              </label>
              <div className="mx-1 w-1/2">
                <Select
                  value={selectedTanto}
                  onChange={(value) => setSelectedTanto(value)}
                  options={tantoOptions.map((opt) => ({
                    value: opt,
                    label: opt,
                  }))}
                  className="h-7"
                />
              </div>
            </div>
          </div>
          <div className="w-full max-h-96 overflow-y-auto border p-2 relative">
            {saleSlips.map((slip: any, index: any) => (
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

            {activeSlipIndex !== null &&
              tooltipPos &&
              createPortal(
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
                    <Button
                      onClick={() => handleEditLine(activeSlipIndex!)}
                      className="block w-full px-2 py-1 hover:bg-gray-100 border border-black rounded shadow-md shadow-zinc-600 text-center"
                    >
                      行編集
                    </Button>
                    <Button
                      onClick={() => handleDeleteLine(activeSlipIndex)}
                      className="block w-full px-2 py-1 hover:bg-gray-100 border border-black rounded shadow-md shadow-zinc-600 mt-2 text-center"
                    >
                      行削除
                    </Button>
                    <Button
                      onClick={() => handleOpenCategorySelection()}
                      className="block w-full px-2 py-1 hover:bg-gray-100 border border-black rounded shadow-md shadow-zinc-600 mt-2 text-center"
                    >
                      行追加
                    </Button>
                  </div>
                </div>,
                document.body
              )}
          </div>
          {/* 行追加 */}
          <div className="flex justify-center items-center my-6 font-bold text-[16px] text-black">
            <Button
              className="bg-bg-gray border border-black px-12 py-2 rounded shadow-md shadow-zinc-600"
              onClick={() => setIsOpenCategorySelection(true)}
            >
              行追加
            </Button>
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
          <Button
            className="bg-[#D9D9D9] border border-black px-12 py-2 rounded shadow-md shadow-zinc-600"
            onClick={() => setIsOpenDepositProcess(!isOpenDepositProcess)}
          >
            {labelDeposit}
          </Button>
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
            isOpen={currentStep === 3}
            onClose={handleCloseSaleDetailModal}
            categoryName={selectedCategory}
            onNext={handleAddSaleSlip}
            rowEdit={rowEdit}
            onBackToCategorySelection={handleBackFromSaleDetail}
          />
        )}
      </div>
    );
  }
);
SalesSlipEntry.displayName = "SalesSlipEntry";
export default SalesSlipEntry;
