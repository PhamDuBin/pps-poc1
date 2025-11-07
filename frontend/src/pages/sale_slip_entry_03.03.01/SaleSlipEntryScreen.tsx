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

    const handleContainerKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement as HTMLElement;

      // Check if there's a calendar popup open by looking for the data attribute
      const calendarPopup = document.querySelector('[data-calendar-popup="true"]');

      // If calendar popup exists and arrow keys are pressed, don't handle navigation
      if (calendarPopup && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        // Let the calendar handle the event completely
        return;
      }

      // Check if Ant Design Select dropdown is open
      const antSelectDropdown = document.querySelector('.ant-select-dropdown:not(.ant-select-dropdown-hidden)');

      // If Select dropdown is open, let Select handle arrow/enter/space keys
      if (antSelectDropdown && ['ArrowUp', 'ArrowDown', 'Enter', ' '].includes(e.key)) {
        // Let the Select dropdown handle the event
        return;
      }

      const focusableElements = Array.from(
        container.querySelectorAll(
          'input, button, [role="registmodal"], select, textarea, .ant-select'
        )
      ) as HTMLElement[];

      const currentIndex = focusableElements.indexOf(activeElement);

      // Prevent Enter key from navigating to next element
      if (e.key === "Enter") {
        e.preventDefault();
        // Trigger click event on the current element if it's a button
        if (activeElement.tagName === "BUTTON") {
          activeElement.click();
        }
        return;
      }

      // Handle left/right arrow keys for navigation (except in text input fields)
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        // Check if we're in a text input/textarea where cursor movement should work
        const isTextInput =
          (activeElement.tagName === "INPUT" &&
           (activeElement as HTMLInputElement).type === "text") ||
          activeElement.tagName === "TEXTAREA";

        if (!isTextInput) {
          e.preventDefault();
          const total = focusableElements.length;
          let nextIndex = currentIndex;

          if (e.key === "ArrowRight") {
            nextIndex = (currentIndex + 1) % total;
          } else if (e.key === "ArrowLeft") {
            nextIndex = (currentIndex - 1 + total) % total;
          }

          focusableElements[nextIndex]?.focus();
          return;
        }
      }

      if (currentIndex !== -1) {
        handleNavigationKey(e, currentIndex, focusableElements);
      }
    };

    container.addEventListener("keydown", handleContainerKeyDown as any);
    return () => {
      container.removeEventListener("keydown", handleContainerKeyDown as any);
    };
  }, []);

  useEffect(() => {
    if (!showLeftPanel) {
      setTimeout(() => {
        salesSlipEntryRef.current?.focusUriageDateCalendar();
      }, 0);
    }
  }, [showLeftPanel]);

  // Prevent Ant Design Select from auto-opening on arrow keys
  useEffect(() => {
    const handleSelectKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isAntSelect = target.classList.contains('ant-select') ||
                         target.closest('.ant-select');

      if (isAntSelect && ['ArrowUp', 'ArrowDown'].includes(e.key)) {
        // Check if dropdown is open
        const dropdown = document.querySelector('.ant-select-dropdown:not(.ant-select-dropdown-hidden)');
        if (!dropdown) {
          // Dropdown is closed - prevent arrow keys from opening it
          e.stopPropagation();
        }
      }
    };

    document.addEventListener('keydown', handleSelectKeyDown, true); // Use capture phase
    return () => {
      document.removeEventListener('keydown', handleSelectKeyDown, true);
    };
  }, []);

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
    <div
      ref={containerRef}
      className="w-full bg-bg-alt h-screen flex flex-row"
    >
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
            // Maintain focus on toggle button after closing
            setTimeout(() => {
              toggleButtonRef.current?.focus();
            }, 0);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setShowLeftPanel(false);
              // Maintain focus on toggle button after closing
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
