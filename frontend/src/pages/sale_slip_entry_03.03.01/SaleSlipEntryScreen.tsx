import React, { useEffect, useRef, useState } from "react";
import RightPanel from "../../component/sale_slip_entry/RightPanel";
import LeftPanel from "../../component/sale_slip_entry/LeftPanel";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { handleNavigationKey } from "../../utils/InputHandlers";
import SalesSlipEntry from "../../component/sale_slip_entry/3.3.3_01/SalesSlipEntry";
import { Button } from "antd";

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
    console.log(buttonName);
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
      if (e.ctrlKey && e.altKey) {
        e.preventDefault();
        return;
      }

      const isAdvanceSearchOpen = container.querySelector(
        ".advance-search-modal"
      );
      const confirmationModalRoot = container.querySelector(".ant-modal-root");
      if (isAdvanceSearchOpen) return;
      if (
        confirmationModalRoot &&
        (confirmationModalRoot as HTMLElement).style.display !== "none"
      ) {
        return;
      }

      const activeElement = document.activeElement as HTMLElement;
      if (
        activeElement &&
        activeElement.closest('[data-calendar-popup="true"]')
      ) {
        return;
      }

      if (e.key === "Enter") {
        if (activeElement?.classList.contains("custom-date-input")) return;
        if (activeElement?.classList.contains("japanese-calendar")) return;
        if (activeElement?.closest(".ant-picker")) return;
      }
      if (activeElement?.classList.contains("sale-slip-row")) {
        if (
          [
            "ArrowUp",
            "ArrowDown",
            "ArrowRight",
            "ArrowLeft",
            "Enter",
            "Tab",
          ].includes(e.key)
        ) {
          return;
        }
      }

      const allElements = Array.from(
        container.querySelectorAll(
          'input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[];

      const focusableElements = allElements.filter((el) => {
        if (
          el.tagName === "INPUT" &&
          (el as HTMLInputElement).type === "radio"
        ) {
          const radioGroup = el.closest(".ant-radio-group");
          if (!radioGroup) return true;
          const checkedRadio = radioGroup.querySelector(
            'input[type="radio"]:checked'
          ) as HTMLInputElement | null;
          if (checkedRadio) return el === checkedRadio;
          else return el === radioGroup.querySelector('input[type="radio"]');
        }
        if (
          el.tagName === "INPUT" &&
          (el as HTMLInputElement).type === "checkbox"
        ) {
          const checkboxGroup = el.closest(".ant-checkbox-group-navigable");
          if (!checkboxGroup) return true;
          return el === checkboxGroup.querySelector('input[type="checkbox"]');
        }
        return true;
      });

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
        if (e.key === "F1") handleButtonClick("行追加");
        else if (e.key === "F2") handleButtonClick("請求年月変更");
        else if (e.key === "F3") handleButtonClick("入金処理");
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
        <Button
          ref={toggleButtonRef}
          // Dùng type="text" hoặc "default" tùy ý, ở đây dùng text để bỏ border mặc định của antd
          type="text"
          // Thêm các class !p-0 !min-w-0 flex items-center justify-center để ghi đè style của Antd
          className={`absolute left-[36.8rem] top-1/2 -translate-y-1/2 text-black !w-5 !h-5 !min-w-0 !p-0 flex items-center justify-center cursor-pointer bg-bg-alt rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500
      ${showAdvanceSearch ? "z-0 hidden pointer-events-none" : "z-30"}`}
          onClick={() => {
            setShowLeftPanel(false);
            setTimeout(() => {
              toggleButtonRef.current?.focus();
            }, 0);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              // Antd Button tự xử lý click khi nhấn Enter/Space,
              // nhưng nếu bạn muốn giữ logic custom thì để nguyên
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
        </Button>
      ) : (
        <Button
          ref={toggleButtonRef}
          type="text"
          className={`absolute left-2 top-1/2 -translate-y-1/2 text-black !w-5 !h-5 !min-w-0 !p-0 flex items-center justify-center cursor-pointer bg-bg-alt rounded-full focus:outline-none focus:ring-4 focus:ring-orange-600
      ${showAdvanceSearch ? "z-0 pointer-events-none" : "z-30"}`}
          onClick={() => {
            setShowLeftPanel(true);
            setTimeout(() => {
              toggleButtonRef.current?.focus();
            }, 100);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setShowLeftPanel(true);
              setTimeout(() => {
                toggleButtonRef.current?.focus();
              }, 100);
            }
          }}
          tabIndex={0}
          aria-label="Expand left panel"
        >
          <CircleArrowRight className="w-full h-full" />
        </Button>
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
