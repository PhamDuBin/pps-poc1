import React, { useEffect, useRef, useState } from "react";
import RightPanel from "../../component/sale_slip_entry/RightPanel";
import LeftPanel from "../../component/sale_slip_entry/LeftPanel";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { handleNavigationKey } from "../../utils/InputHandlers";
import SalesSlipEntry from "../../component/sale_slip_entry/3.3.3_01/SalesSlipEntry";

type SalesSlipEntryHandle = {
  focusUriageDateCalendar: () => void;
  openCategorySelection: () => void;
  focusBillingDatePicker: () => void;
  toggleDepositProcess: () => void;
};

const SaleSlipEntryScreen = () => {
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [activeScreen, setActiveScreen] = useState<string | null>(null);
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);
  const [showCustomerInLeftPanel, setShowCustomerInLeftPanel] = useState(false);
  const salesSlipEntryRef = useRef<SalesSlipEntryHandle>(null);
  const handleOpenAndResetLeftPanel = () => {
    setShowLeftPanel(true);
    setShowCustomerInLeftPanel(false);
  };

  const handleButtonClick = (buttonName: string) => {
    setActiveScreen(buttonName);
    switch (buttonName) {
      case "行追加":
        salesSlipEntryRef.current?.openCategorySelection();
        break;
      case "請求年月変更":
        salesSlipEntryRef.current?.focusBillingDatePicker();
        break;
      case "入金処理":
        salesSlipEntryRef.current?.toggleDepositProcess();
        break;
      default:
        break;
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key.startsWith("F") && !isNaN(Number(key.substring(1)))) {
        e.preventDefault();

        return;
      }
      const isModifierPressed = e.ctrlKey && e.altKey;

      if (isModifierPressed) {
        e.preventDefault();

        return;
      }

      const isAdvanceSearchOpen = container.querySelector(
        ".advance-search-modal"
      );
      const confirmationModalRoot = container.querySelector(".ant-modal-root");

      if (isAdvanceSearchOpen) {
        return;
      }

      if (
        confirmationModalRoot &&
        (confirmationModalRoot as HTMLElement).style.display !== "none"
      ) {
        const confirmationModal =
          confirmationModalRoot.querySelector(".ant-modal");
        if (!confirmationModal) return;

        const buttons = Array.from(
          confirmationModal.querySelectorAll<HTMLButtonElement>(
            ".ant-modal-footer button:not([disabled])"
          )
        );

        if (buttons.length === 0) return; // Không có nút nào

        const activeElement = document.activeElement as HTMLElement;
        let currentIndex = buttons.findIndex((btn) => btn === activeElement);

        // Nếu focus không nằm trên nút, đặt mặc định cho các phím điều hướng
        if (
          currentIndex === -1 &&
          ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"].includes(
            e.key
          )
        ) {
          // Mặc định là nút primary (OK) hoặc nút cuối (Cancel)
          const primaryButtonIndex = buttons.findIndex((b) =>
            b.classList.contains("ant-btn-primary")
          );
          currentIndex =
            primaryButtonIndex !== -1 ? primaryButtonIndex : buttons.length - 1;
          buttons[currentIndex]?.focus();
          e.preventDefault();
          return;
        }

        // Xử lý điều hướng
        if (
          (e.key === "Tab" && e.shiftKey) ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowUp"
        ) {
          e.preventDefault();
          const nextIndex =
            (currentIndex - 1 + buttons.length) % buttons.length;
          buttons[nextIndex]?.focus();
        } else if (
          e.key === "Tab" ||
          e.key === "ArrowRight" ||
          e.key === "ArrowDown"
        ) {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % buttons.length;
          buttons[nextIndex]?.focus();
        } else if (e.key === "Enter" || e.key === " ") {
          // Cho phép hành động mặc định (click) của trình duyệt/Ant
          return;
        } else if (e.key === "Escape") {
          // Cho phép modal tự xử lý đóng
          return;
        } else {
          // Chặn các phím khác
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
          }
        }
        return; // Đã xử lý phím trong modal, dừng lại
      }
      // --- KẾT THÚC LOGIC XỬ LÝ MODAL ---

      const allElements = Array.from(
        container.querySelectorAll(
          "input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled])"
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
        if (
          el.tagName === "INPUT" &&
          (el as HTMLInputElement).type === "checkbox"
        ) {
          const checkboxGroup = el.closest(".ant-checkbox-group-navigable");
          if (!checkboxGroup) {
            return true;
          }
          const firstCheckboxInGroup = checkboxGroup.querySelector(
            'input[type="checkbox"]'
          );
          return el === firstCheckboxInGroup;
        }

        return true;
      });

      const activeElement = document.activeElement as HTMLElement;

      // --- CÁC LOGIC BỎ QUA ĐIỀU HƯỚNG ---

      if (
        activeElement &&
        activeElement.closest('[data-calendar-popup="true"]')
      ) {
        return;
      }

      // Giữ nguyên logic cũ của bạn cho class "japanese-calendar"
      if (
        e.key === "Enter" &&
        activeElement &&
        activeElement.classList.contains("japanese-calendar")
      ) {
        return;
      }

      if (e.key === "Enter") {
        if (activeElement?.classList.contains("custom-date-input")) {
          return;
        }
        if (activeElement?.classList.contains("japanese-calendar")) {
          return;
        }
        if (activeElement?.closest(".ant-picker")) {
          return;
        }
      }

      const currentIndex = focusableElements.indexOf(activeElement);
      handleNavigationKey(e, currentIndex, focusableElements);
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    if (!showLeftPanel) {
      setTimeout(() => {
        salesSlipEntryRef.current?.focusUriageDateCalendar();
      }, 0);
    }
  }, [showLeftPanel]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^F\d{1,2}$/.test(e.key)) {
        e.preventDefault();

        // Handle F1, F2, F3 for specific buttons
        if (e.key === "F1") {
          handleButtonClick("行追加");
        } else if (e.key === "F2") {
          handleButtonClick("請求年月変更");
        } else if (e.key === "F3") {
          handleButtonClick("入金処理");
        }

        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-bg-alt h-screen flex flex-row">
      {!showLeftPanel && (
        <div className="relative flex items-center h-full w-2 bg-[#e6cfcf]"></div>
      )}

      <div
        className={
          showLeftPanel
            ? "w-[600px] transition-all duration-300 absolute z-20"
            : "hidden"
        }
      >
        <LeftPanel
          showAdvanceSearch={showAdvanceSearch}
          setShowAdvanceSearch={setShowAdvanceSearch}
          showCustomer={showCustomerInLeftPanel}
          setShowCustomer={setShowCustomerInLeftPanel}
        />
      </div>

      {showLeftPanel ? (
        <button
          ref={toggleButtonRef}
          className={`absolute left-[36.8rem] top-1/2 -translate-y-1/2 text-black w-5 h-5 cursor-pointer bg-bg-alt rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500
            ${showAdvanceSearch ? "z-0 hidden pointer-events-none" : "z-30"}`}
          onClick={() => {
            setShowLeftPanel(false);
            setTimeout(() => {
              toggleButtonRef.current?.focus();
            }, 0);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setShowLeftPanel(false);
              setTimeout(() => {
                toggleButtonRef.current?.focus();
              }, 0);
            }
          }}
          tabIndex={0}
          aria-label="Collapse left panel"
        >
          <CircleArrowLeft className="w-full h-full" />
        </button>
      ) : (
        <button
          ref={toggleButtonRef}
          className={`absolute left-2 top-1/2 -translate-y-1/2 text-black w-5 h-5 cursor-pointer bg-bg-alt rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500
            ${showAdvanceSearch ? "z-0 pointer-events-none" : "z-30"}`}
          onClick={() => {
            setShowLeftPanel(true);
            // Maintain focus on toggle button after opening
            setTimeout(() => {
              toggleButtonRef.current?.focus();
            }, 100);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setShowLeftPanel(true);
              // Maintain focus on toggle button after opening
              setTimeout(() => {
                toggleButtonRef.current?.focus();
              }, 100);
            }
          }}
          tabIndex={0}
          aria-label="Expand left panel"
        >
          <CircleArrowRight className="w-full h-full" />
        </button>
      )}
      <div className="my-3 ml-2 flex-1 h-[calc(100%-0.75rem*2)] flex flex-row min-w-0 z-10">
        <div className="relative mr-2 border border-black w-10/12 text-black flex justify-center overflow-auto bg-white">
          <SalesSlipEntry
            ref={salesSlipEntryRef}
            onOpenLeftPanelForSearch={handleOpenAndResetLeftPanel}
          />
        </div>

        <RightPanel
          onButtonClick={handleButtonClick}
          activeButton={activeScreen}
        />
      </div>
    </div>
  );
};

export default SaleSlipEntryScreen;
