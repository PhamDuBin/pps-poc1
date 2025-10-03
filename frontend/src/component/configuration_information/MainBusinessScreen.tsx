import { useEffect, useRef, useState } from "react";
import OperatorSelectionModal from "./OperatorSelectionModal";
import ContinuousIssue from "./MainBusinessAreas/ContinuousIssue";
import IndividualIssue from "./MainBusinessAreas/IndividualIssue";
import TargetCustomer from "./MainBusinessAreas/TargetCustomer";
import PrintingDesignation from "./MainBusinessAreas/PrintingDesignation";
import TitleFormSetting from "./MainBusinessAreas/TitleFormSetting";
import PaperSelectionModal from "./PaperSelectionModal";
import { labelColor } from "../../constants/colors";
import { Select, Button, Radio } from "antd";
import CustomModal from "../../context/CustomModal";
import React from "react";
import { scroller } from "react-scroll";
import { Transition } from "@headlessui/react";
import { handleNavigationKey040504 } from "../../utils/InputHandlers";

const MainBusinessScreen = () => {
  const [isOperationSeachModalOpen, setIsOperationSeachModalOpen] =
    useState(false);
  const [isPaperSelectionModalOpen, setIsPaperSelectionModalOpen] =
    useState(true);
  const [condition, setCondition] = useState("連続発行");
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const monthPickerRef = useRef<any>(null);
  const datePickerRef = useRef<any>(null);
  const targetCustomerRef = useRef<any>(null);
  const printingDesignationRef = useRef<any>(null);
  const TitleFormSettingRef = useRef<any>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [modalF2Open, setModalF2Open] = useState<boolean>(false);
  const [titleModal, setTitleModal] = useState("");
  const sections = [
    "extraForm",
    "targetCustomer",
    "printingDesignation",
    "titleFormSetting",
  ];
  const isInitialMount = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeButton = `bg-yellow-300 border-yellow-400`;
  const button = `flex text-center justify-center items-center ${labelColor} border border-black xl:text-base text-xs font-bold shadow-md shadow-zinc-600 hover:bg-white`;
  const span = `w-[10%] flex justify-center text-center items-center font-bold ${labelColor}`;
  const focusFirstButtonRef = useRef<HTMLButtonElement>(null);
  const shortcuts = {
    "1": () => handleScrollAndFocus("extraForm"),
    "2": () => handleScrollAndFocus("targetCustomer"),
    "3": () => handleScrollAndFocus("printingDesignation"),
    "4": () => handleScrollAndFocus("titleFormSetting"),
    F1: () => {
      ("");
    },
    F2: () => {
      ("");
    },
    F4: () => {
      ("");
    },
    F5: () => {
      ("");
    },
    F6: () => {
      ("");
    },
    F9: () => {
      ("");
    },
    F10: () => {
      ("");
    },
    F11: () => {
      ("");
    },
    F12: () => {
      ("");
    },
    F3: () => {
      setModalF2Open(true);
      setTitleModal("条件保存（F3）");
    },
    F7: () => {
      setModalF2Open(true);
      setTitleModal("伝票メモ設定(F7)");
    },
    F8: () => {
      setModalF2Open(true);
      setTitleModal("再入力（F8）");
    },
    V: () => {
      setModalF2Open(true);
      setTitleModal("プレビュー（V）");
    },
    P: () => {
      setModalF2Open(true);
      setTitleModal("印刷（P）");
    },
    H: () => {
      setModalF2Open(true);
      setTitleModal("データ（H）");
    },
    C: () => {
      window.location.href = "/";
    },
  };

  const handleCloseOperationSerachModal = () => {
    setIsOperationSeachModalOpen(false);
  };

  const handleClosePaperSelectionModalOpen = () => {
    setIsPaperSelectionModalOpen(false);

    if (focusFirstButtonRef.current) {
      focusFirstButtonRef.current.focus();
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (!isPaperSelectionModalOpen) {
      handleScrollAndFocus("extraForm");
    }
  }, [condition]);
  const handleRadioKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    value: string
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      setCondition(value);
    }
  };
  const handleScrollAndFocus = (sectionName: string) => {
    setActiveSection(sectionName);
    scroller.scrollTo(`${sectionName}Section`, {
      duration: 500,
      smooth: true,
      containerId: "scroll-container",
    });

    setTimeout(() => {
      switch (sectionName) {
        case "extraForm":
          if (condition === "連続発行") datePickerRef.current?.focus();
          else monthPickerRef.current?.focus();
          break;
        case "targetCustomer":
          targetCustomerRef.current?.focusFirstButton();
          break;
        case "printingDesignation":
          printingDesignationRef.current?.focusFirstButton();
          break;
        case "titleFormSetting":
          TitleFormSettingRef.current?.focusFirstButton();
          break;
      }
    }, 100);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key.startsWith("F") && !isNaN(Number(key.substring(1)))) {
        e.preventDefault();

        const action = shortcuts[key as keyof typeof shortcuts];
        if (action) {
          action();
        }
        return;
      }
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const isModifierPressed = isMac
        ? e.metaKey && e.altKey
        : e.ctrlKey && e.altKey;

      const action = shortcuts[key as keyof typeof shortcuts];
      if (isModifierPressed && action) {
        e.preventDefault();
        action();
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        const currentSectionIndex = sections.indexOf(activeSection ?? "");
        if (currentSectionIndex === -1) return;

        const nextIndex = e.shiftKey
          ? (currentSectionIndex - 1 + sections.length) % sections.length
          : (currentSectionIndex + 1) % sections.length;

        handleScrollAndFocus(sections[nextIndex]);
        return;
      }

      const focusableElements = Array.from(
        container.querySelectorAll(
          "input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled])"
        )
      ) as HTMLElement[];

      const activeElement = document.activeElement as HTMLElement;
      const currentIndex = focusableElements.indexOf(activeElement);

      if (currentIndex !== -1) {
        handleNavigationKey040504(e, currentIndex, focusableElements);
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeSection, sections]);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full flex flex-col p-4 min-w-[1080px]"
    >
      <span
        className={`w-full h-10 font-bold xl:text-2xl text-xl flex text-center justify-center items-center ${labelColor}`}
      >
        請求書発行
      </span>
      <div className="flex flex-row items-center xl:text-base text-xs mt-3 h-8 px-8 justify-between">
        <span className={`${span}`}>用紙設定</span>
        <p className="ml-3">伝票請｜請求書（15日）〇〇商社様用</p>
        <Button
          ref={focusFirstButtonRef}
          onClick={() => setIsPaperSelectionModalOpen(true)}
          className="p-2 rounded-md border border-black h-6 w-14 text-xs flex text-center justify-center items-center shadow-md shadow-zinc-600"
        >
          再設定
        </Button>
        <span className={`${span}`}>フォーム選択</span>
        <Select
          className="w-[15%] h-7 [&>.ant-select-selector]:!bg-[#ebcec0] "
          defaultValue="請求書（大）"
          options={[
            { value: "請求書（大）", label: "請求書（大）" },
            { value: "請求書（小）", label: "請求書（小）" },
            { value: "3部料金", label: "3部料金" },
            { value: "請求書（中）", label: "請求書（中）" },
            { value: "請求書（中）3部料金", label: "請求書（中）3部料金" },
            {
              value: "請求書（大）レーザー用",
              label: "請求書（大）レーザー用",
            },
            {
              value: "請求書（小）レーザー用3部料金",
              label: "請求書（小）レーザー用3部料金",
            },
            { value: "請求書（WS01）", label: "請求書（WS01）" },
            { value: "請求書（W02）", label: "請求書（W02）" },
            { value: "請求書（WK.01）", label: "請求書（WK.01）" },
          ]}
        />
        <span className={`${span}`}>発行方法</span>

        <Radio.Group
          value={condition}
          className="ml-2 flex gap-4"
          onChange={(e) => setCondition(e.target.value)}
        >
          <Radio
            value="連続発行"
            onKeyDown={(e) => handleRadioKeyDown(e, "連続発行")}
          >
            連続発行
          </Radio>
          <Radio
            value="個別発行"
            onKeyDown={(e) => handleRadioKeyDown(e, "個別発行")}
          >
            個別発行
          </Radio>
        </Radio.Group>
      </div>
      <div className="mt-3 flex flex-row px-40 font-bold xl:text-base text-xs justify-between h-10">
        <Button
          onClick={() => handleScrollAndFocus("extraForm")}
          className={`${button} w-1/6 ${
            activeSection === "extraForm" ? activeButton : ""
          }`}
        >
          抽出条件 （1）
        </Button>
        <Button
          onClick={() => handleScrollAndFocus("targetCustomer")}
          className={`${button} w-1/6 ${
            activeSection === "targetCustomer" ? activeButton : ""
          }`}
        >
          対象顧客（2）
        </Button>
        <Button
          onClick={() => handleScrollAndFocus("printingDesignation")}
          className={`${button} w-1/6 ${
            activeSection === "printingDesignation" ? activeButton : ""
          }`}
        >
          印刷指定（3）
        </Button>
        <Button
          onClick={() => handleScrollAndFocus("titleFormSetting")}
          className={`${button} w-1/6 ${
            activeSection === "titleFormSetting" ? activeButton : ""
          }`}
        >
          タイトル ・鑑設定(4)
        </Button>
      </div>
      <div
        onKeyDown={(e) => {
          if (e.code === "Space") {
            e.preventDefault();
          }
        }}
        id="scroll-container"
        className="mt-3 h-[80%] border border-black p-4 overflow-auto"
      >
        <div
          onFocus={() => setActiveSection("extraForm")}
          id="extraFormSection"
        >
          {condition === "連続発行" ? (
            <ContinuousIssue ref={datePickerRef} />
          ) : (
            <IndividualIssue ref={monthPickerRef} />
          )}
        </div>
        <div
          onFocus={() => setActiveSection("targetCustomer")}
          className="mt-2"
          id="targetCustomerSection"
        >
          <TargetCustomer
            ref={targetCustomerRef}
            onLabelClick={(title) => {
              setSelectedLabel(title);
              setIsOperationSeachModalOpen(true);
            }}
          />
        </div>
        <div
          onFocus={() => setActiveSection("printingDesignation")}
          id="printingDesignationSection"
        >
          <PrintingDesignation ref={printingDesignationRef} />
        </div>
        <div
          onFocus={() => setActiveSection("titleFormSetting")}
          id="titleFormSettingSection"
        >
          <TitleFormSetting ref={TitleFormSettingRef} />
        </div>
      </div>
      <div className="mt-2 flex flex-row justify-between">
        <Button
          onClick={() => {
            setModalF2Open(true);
            setTitleModal("条件保存（F3）");
          }}
          className={`${button} w-[10%] xl:text-base text-xs`}
        >
          条件保存（F3）
        </Button>
        <Button
          onClick={() => {
            setModalF2Open(true);
            setTitleModal("伝票メモ設定(F7)");
          }}
          className={`${button} w-[10%] xl:text-base text-xs`}
        >
          伝票メモ設定(F7)
        </Button>
        <Button
          onClick={() => {
            setModalF2Open(true);
            setTitleModal("再入力（F8）");
          }}
          className={`${button} w-[10%] xl:text-base text-xs`}
        >
          再入力（F8）
        </Button>
        <Button
          onClick={() => {
            setModalF2Open(true);
            setTitleModal("プレビュー（V）");
          }}
          className={`${button} w-[10%] xl:text-base text-xs`}
        >
          プレビュー（V）
        </Button>
        <Button
          onClick={() => {
            setModalF2Open(true);
            setTitleModal("印刷（P）");
          }}
          className={`${button} w-[10%] xl:text-base text-xs`}
        >
          印刷（P）
        </Button>
        <Button
          onClick={() => {
            setModalF2Open(true);
            setTitleModal("データ（H）");
          }}
          className={`${button} w-[10%] xl:text-base text-xs`}
        >
          データ（H）
        </Button>
        <Button href="/" className={`${button} w-[10%] xl:text-base text-xs`}>
          閉じる（C）
        </Button>
      </div>

      <Transition show={isOperationSeachModalOpen} as={React.Fragment}>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Transition.Child
            as="div"
            className="transition-all duration-300 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <OperatorSelectionModal
              title={selectedLabel ?? ""}
              isOpen={isOperationSeachModalOpen}
              onClose={handleCloseOperationSerachModal}
            />
          </Transition.Child>
        </div>
      </Transition>
      <div>
        <PaperSelectionModal
          open={isPaperSelectionModalOpen}
          onClose={handleClosePaperSelectionModalOpen}
        />
      </div>
      <CustomModal
        isOpen={modalF2Open}
        onClose={() => setModalF2Open(false)}
        title={titleModal}
      />
    </div>
  );
};

export default MainBusinessScreen;
