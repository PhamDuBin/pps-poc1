import { labelColor, inputColor } from "../../constants/colors";
import { Select, Button } from "antd";
import BasicInformation from "./MainAreas/BasicInformation";
import FamilyInfo from "./MainAreas/FamilyInfo";
import OtherInfo from "./MainAreas/OtherInfo";
import AcquisitionInformation from "./MainAreas/AcquisitionInformation";
import AreaInfo from "./MainAreas/AreaInfo";
import EmergencyContact from "./MainAreas/EmergencyContact";
import { useEffect, useMemo, useCallback, useRef, useState } from "react";
import { scroller } from "react-scroll";
import { handleNavigationKey040504 } from "../../utils/InputHandlers";
import AdvanceSearchModal from "../transaction_information/1.1.1_03/AdvanceSearchModal";
import MessageModal from "../../context/MessageModal";
import { Transition } from "@headlessui/react";
import React from "react";
import { handleOpenWindow } from "../../constants/functions";
import { HalfWidthKanaInput } from "../input/JapaneseInputs";

const MainBusinessScreen = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const basicInformationRef = useRef<any>(null);
  const acquisitionInformationRef = useRef<any>(null);
  const familyInfoRef = useRef<any>(null);
  const otherInfoRef = useRef<any>(null);
  const areaInfoRef = useRef<any>(null);
  const emergencyContactRef = useRef<any>(null);
  const [shouldShowData, setShouldShowData] = useState(false);
  const sections = useMemo(
    () => [
      "basicInformation",
      "acquisitionInformation",
      "areaInfo",
      "emergencyContact",
      "otherInfo",
      "familyInfo",
    ],
    []
  );
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(true);
  const [customerCode, setCustomerCode] = useState({
    part1: "0000",
    part2: "000",
    part3: "000000",
    part4: "000",
  });
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    message: "",
  });
  const openConfirmationModal = useCallback((message: string) => {
    setModalConfig({
      isOpen: true,
      message: message,
    });
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalConfig({ isOpen: false, message: "" });
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLButtonElement>(null);

  const handleScrollAndFocus = useCallback((sectionName: string) => {
    setActiveSection(sectionName);
    scroller.scrollTo(`${sectionName}Section`, {
      duration: 500,
      smooth: true,
      containerId: "scroll-container",
    });

    setTimeout(() => {
      switch (sectionName) {
        case "basicInformation":
          basicInformationRef.current?.focusFirstButton();
          break;
        case "acquisitionInformation":
          acquisitionInformationRef.current?.focusFirstButton();
          break;
        case "areaInfo":
          areaInfoRef.current?.focusFirstButton();
          break;
        case "emergencyContact":
          emergencyContactRef.current?.focusFirstButton();
          break;
        case "otherInfo":
          otherInfoRef.current?.focusFirstButton();
          break;
        case "familyInfo":
          familyInfoRef.current?.focusFirstButton();
          break;
      }
    }, 100);
  }, []);

  const shortcuts = useMemo(
    () => ({
      "1": () => handleScrollAndFocus("basicInformation"),
      "2": () => handleScrollAndFocus("acquisitionInformation"),
      "3": () => handleScrollAndFocus("areaInfo"),
      "4": () => handleScrollAndFocus("emergencyContact"),
      "5": () => handleScrollAndFocus("otherInfo"),
      "6": () => handleScrollAndFocus("familyInfo"),

      F1: () => {
        handleOpenWindow();
      },

      F2: () => {
        handleOpenWindow();
      },

      F3: () => {
        handleOpenWindow();
      },

      F5: () => {
        handleOpenWindow();
      },

      F6: () => {
        handleOpenWindow();
      },

      F7: () => {
        handleOpenWindow();
      },

      F8: () => {
        setCustomerCode({
          part1: "0000",
          part2: "000",
          part3: "000000",
          part4: "000",
        });
        setShouldShowData(false);
        setShowAdvanceSearch(true);
      },

      F9: () => {},
      F10: () => {},
      F11: () => {},
      F12: () => {},

      S: () => openConfirmationModal("更新しますが、よろしいですか？"),
      D: () => openConfirmationModal("削除しますが、よろしいですか？"),
      C: () => {
        const closeButton = document.querySelector(
          'a[href="/"]'
        ) as HTMLElement;
        closeButton?.click();
      },
    }),
    [
      handleScrollAndFocus,
      setCustomerCode,
      setShouldShowData,
      openConfirmationModal,
    ]
  );

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
      const isModifierPressed = e.ctrlKey && e.altKey;
      const action = shortcuts[key as keyof typeof shortcuts];
      if (isModifierPressed && action) {
        e.preventDefault();
        action();
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
        modalConfig.isOpen &&
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

      // Logic điều hướng trang (chỉ chạy khi không có modal nào mở)
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
      if (
        activeElement &&
        activeElement.closest('[data-calendar-popup="true"]')
      ) {
        return;
      }

      if (
        e.key === "Enter" &&
        activeElement &&
        activeElement.classList.contains("japanese-calendar")
      ) {
        return;
      }
      const currentIndex = focusableElements.indexOf(activeElement);
      handleNavigationKey040504(e, currentIndex, focusableElements);
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    activeSection,
    sections,
    shortcuts,
    handleScrollAndFocus,
    modalConfig.isOpen,
  ]);

  const label = `h-8 border border-gray-300 font-bold rounded-md flex text-center justify-center items-center px-2 ml-7 mr-2 ${labelColor}`;
  const button = `flex text-center justify-center items-center ${labelColor} border border-black xl:text-base text-xs font-bold shadow-md shadow-zinc-600 hover:bg-white`;
  const activeButton = `bg-yellow-300 border-yellow-400`;
  return (
    <div
      ref={containerRef}
      className="h-screen min-w-[1100px] w-full flex flex-col px-4 py-2 "
    >
      {/* label header */}
      <label
        className={`w-full h-10 rounded-md font-bold xl:text-2xl text-xl flex text-center justify-center items-center ${labelColor}`}
      >
        顧客台帳
      </label>
      {/* customer search */}
      <div className="w-full flex justify-center items-center text-sm">
        <div className="w-[90%] h-14 border border-black rounded-md p-2 mt-2 ">
          <div className="w-full flex flex-row items-center justify-center">
            <Select
              className="w-40 mr-2 [&>.ant-select-selector]:!bg-input"
              defaultValue="顧客コード"
            >
              <Select.Option value="顧客コード">顧客コード</Select.Option>
              <Select.Option value="取引先">取引先</Select.Option>
              <Select.Option value="検索キー2">検索キー2</Select.Option>
              <Select.Option value="電算コード">電算コード</Select.Option>
              <Select.Option value="軒先バーコード">
                軒先バーコード
              </Select.Option>
              <Select.Option value="配送順コード">配送順コード</Select.Option>
              <Select.Option value="点検順コード">点検順コード</Select.Option>
              <Select.Option value="営業順コード">営業順コード</Select.Option>
              <Select.Option value="検針順コード">検針順コード</Select.Option>
              <Select.Option value="集金順コード">集金順コード</Select.Option>
              <Select.Option value="配送センターコード">
                配送センターコード
              </Select.Option>
              <Select.Option value="保安機関コード">
                保安機関コード
              </Select.Option>
              <Select.Option value="集中監視センターコード">
                集中監視センターコード
              </Select.Option>
            </Select>
            <HalfWidthKanaInput
              className={`w-10 !px-0 text-center hover:${inputColor}`}
              defaultValue={"0000"}
              value={customerCode.part1}
              onChange={(e) =>
                setCustomerCode((prev) => ({ ...prev, part1: e }))
              }
            ></HalfWidthKanaInput>
            <span>-</span>
            <HalfWidthKanaInput
              className={`w-10 !px-0 text-center hover:${inputColor}`}
              defaultValue={"000"}
              value={customerCode.part2}
              onChange={(e) =>
                setCustomerCode((prev) => ({ ...prev, part2: e }))
              }
            ></HalfWidthKanaInput>
            <span>-</span>
            <HalfWidthKanaInput
              className={`w-14 !px-0 text-center hover:${inputColor}`}
              defaultValue={"000000"}
              value={customerCode.part3}
              onChange={(e) =>
                setCustomerCode((prev) => ({ ...prev, part3: e }))
              }
            ></HalfWidthKanaInput>
            <span>-</span>
            <HalfWidthKanaInput
              className={`w-10 !px-0 text-center hover:${inputColor}`}
              defaultValue={"000"}
              value={customerCode.part4}
              onChange={(e) =>
                setCustomerCode((prev) => ({ ...prev, part4: e }))
              }
            ></HalfWidthKanaInput>
            <Button
              onClick={() => setShowAdvanceSearch(true)}
              className={`${button} mx-2`}
            >
              ▼
            </Button>
            <Button
              ref={firstInputRef}
              onClick={() => {
                setCustomerCode({
                  part1: "0000",
                  part2: "000",
                  part3: "000000",
                  part4: "000",
                });
                setShouldShowData(false);
              }}
              className={`${button} mx-2`}
            >
              再入力
            </Button>
            <label className={label}>管理区分</label>
            <Button
              onClick={() =>
                openConfirmationModal(
                  "関連項目以外が初期化されますが、よろしいですか？"
                )
              }
              className={`${button} mx-2`}
            >
              直売
            </Button>
            <Button disabled className={`${button} mx-2`}>
              卸
            </Button>
            <Button disabled className={`${button} mx-2`}>
              配送
            </Button>
            <Button
              onClick={() =>
                openConfirmationModal(
                  "関連項目以外が初期化されますが、よろしいですか？"
                )
              }
              className={`${button} mx-2`}
            >
              保安
            </Button>
          </div>
        </div>
      </div>
      {/* button group */}
      <div className="flex flex-row my-2 justify-between items-center text-sm mx-48">
        <Button
          onClick={() => handleScrollAndFocus("basicInformation")}
          className={`${button} w-28 ${
            activeSection === "basicInformation" ? activeButton : ""
          }`}
        >
          基本情報 (1)
        </Button>
        <Button
          onClick={() => handleScrollAndFocus("acquisitionInformation")}
          className={`${button} w-28 ${
            activeSection === "acquisitionInformation" ? activeButton : ""
          }`}
        >
          獲得情報 (2)
        </Button>
        <Button
          onClick={() => handleScrollAndFocus("areaInfo")}
          className={`${button} w-28 ${
            activeSection === "areaInfo" ? activeButton : ""
          }`}
        >
          担当・地区 (3)
        </Button>
        <Button
          onClick={() => handleScrollAndFocus("emergencyContact")}
          className={`${button} w-28 ${
            activeSection === "emergencyContact" ? activeButton : ""
          }`}
        >
          緊急連絡先 (4)
        </Button>
        <Button
          onClick={() => handleScrollAndFocus("otherInfo")}
          className={`${button} w-28 ${
            activeSection === "otherInfo" ? activeButton : ""
          }`}
        >
          その他情報 (5)
        </Button>
        <Button
          onClick={() => handleScrollAndFocus("familyInfo")}
          className={`${button} w-28 ${
            activeSection === "familyInfo" ? activeButton : ""
          }`}
        >
          家族情報 (6)
        </Button>
      </div>
      {/* content area */}
      <div className="w-full h-[63%] flex justify-center items-center text-sm">
        <div
          id="scroll-container"
          className="w-[90%] h-full border border-black px-4 overflow-auto z-50"
        >
          <div
            onFocus={() => setActiveSection("basicInformation")}
            id="basicInformationSection"
          >
            <BasicInformation
              ref={basicInformationRef}
              showData={shouldShowData}
            />
          </div>
          <div
            onFocus={() => setActiveSection("acquisitionInformation")}
            id="acquisitionInformationSection"
          >
            <AcquisitionInformation
              ref={acquisitionInformationRef}
              showData={shouldShowData}
            />
          </div>
          <div
            onFocus={() => setActiveSection("areaInfo")}
            id="areaInfoSection"
          >
            <AreaInfo ref={areaInfoRef} showData={shouldShowData} />
          </div>

          <div
            onFocus={() => setActiveSection("emergencyContact")}
            id="emergencyContactSection"
          >
            <EmergencyContact
              ref={emergencyContactRef}
              showData={shouldShowData}
            />
          </div>
          <div
            onFocus={() => setActiveSection("otherInfo")}
            id="otherInfoSection"
          >
            <OtherInfo ref={otherInfoRef} showData={shouldShowData} />
          </div>

          <div
            onFocus={() => setActiveSection("familyInfo")}
            id="familyInfoSection"
          >
            <FamilyInfo ref={familyInfoRef} showData={shouldShowData} />
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="flex flex-col text-sm w-full justify-center items-center mt-2">
        <div className="flex flex-row justify-between items-center w-[90%]">
          <Button
            onClick={() => {
              handleOpenWindow();
            }}
            className={`!bg-label !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}
          >
            F1ヘルプ
          </Button>
          <Button
            onClick={() => {
              handleOpenWindow();
            }}
            className={`!bg-label !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}
          >
            F2入力切替
          </Button>
          <Button
            onClick={() => {
              handleOpenWindow();
            }}
            className={`!bg-label !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}
          >
            F3事業所変更
          </Button>
          <Button
            className={`!bg-label !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}
          >
            F4検索
          </Button>
          <Button
            onClick={() => {
              handleOpenWindow();
            }}
            className={`!bg-label !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}
          >
            F5前の顧客
          </Button>
          <Button
            onClick={() => {
              handleOpenWindow();
            }}
            className={`!bg-label !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}
          >
            F6次の顧客
          </Button>
          <Button
            onClick={() => {
              handleOpenWindow();
            }}
            className={`!bg-label !text-black hover:!bg-white hover:!text-blue-600 w-32 shadow-md shadow-zinc-500`}
          >
            F7顧客コード変更
          </Button>
          <Button
            onClick={() => {
              setCustomerCode({
                part1: "0000",
                part2: "000",
                part3: "000000",
                part4: "000",
              });
              setShowAdvanceSearch(true);
            }}
            className={`!bg-label !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}
          >
            F8再入力
          </Button>
        </div>
        <div className="flex flex-col w-[90%] mt-2">
          {/* Hàng thứ hai: chia 3 block */}
          <div className="flex flex-row justify-between w-full">
            {/* マスター情報 */}
            <div className="flex flex-col w-[40%]">
              <span
                className={`h-8 border border-gray-300 rounded-md font-bold flex text-center justify-center items-center w-full ${labelColor}`}
              >
                マスター情報
              </span>
              <div className="flex flex-row w-full">
                <Button
                  onClick={() => {
                    handleOpenWindow();
                  }}
                  className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}
                >
                  顧客{"\n"}情報
                </Button>
                <Button
                  onClick={() => {
                    handleOpenWindow();
                  }}
                  className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}
                >
                  請求{"\n"}情報
                </Button>
                <Button
                  onClick={() => {
                    handleOpenWindow();
                  }}
                  className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}
                >
                  検配{"\n"}情報
                </Button>
                <Button
                  onClick={() => {
                    handleOpenWindow();
                  }}
                  className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}
                >
                  灯油{"\n"}情報
                </Button>
                <Button
                  onClick={() => {
                    handleOpenWindow();
                  }}
                  className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}
                >
                  集中{"\n"}監視
                </Button>
                <Button
                  onClick={() => {
                    handleOpenWindow();
                  }}
                  className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}
                >
                  保証金
                </Button>
                <Button
                  onClick={() => {
                    handleOpenWindow();
                  }}
                  className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}
                >
                  保安{"\n"}情報
                </Button>
              </div>
            </div>

            {/* 伝票入力 */}
            <div className="flex flex-col w-[30%]">
              <span
                className={`h-8 border border-gray-300 rounded-md font-bold flex text-center justify-center items-center w-full ${labelColor}`}
              >
                伝票入力
              </span>
              <div className="flex flex-row w-full">
                <Button
                  onClick={() => {
                    handleOpenWindow();
                  }}
                  className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}
                >
                  開始{"\n"}点検
                </Button>
                <Button
                  onClick={() => {
                    handleOpenWindow();
                  }}
                  className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}
                >
                  開閉{"\n"}伝票
                </Button>
                <Button
                  onClick={() => {
                    handleOpenWindow();
                  }}
                  className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}
                >
                  検針{"\n"}伝票
                </Button>
                <Button
                  onClick={() => {
                    handleOpenWindow();
                  }}
                  className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}
                >
                  配送{"\n"}伝票
                </Button>
              </div>
            </div>

            {/* 保存削除閉じる */}
            <div className="flex flex-row justify-end w-[30%]">
              <Button
                className={`flex-1 h-full shadow-md shadow-zinc-500 ${labelColor}`}
                onClick={() =>
                  openConfirmationModal("更新しますが、よろしいですか？")
                }
              >
                保存(S)
              </Button>
              <Button
                className={`flex-1 h-full shadow-md shadow-zinc-500 ${labelColor}`}
                onClick={() =>
                  openConfirmationModal("削除しますが、よろしいですか？")
                }
              >
                削除(D)
              </Button>
              <Button
                href="/"
                className={`flex-1 h-full shadow-md shadow-zinc-500 ${labelColor}`}
              >
                閉じる(C)
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Transition show={showAdvanceSearch} as={React.Fragment}>
        <div className="fixed inset-0 w-full flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Transition.Child
            as="div"
            className="transition-all w-[700px] duration-300 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <AdvanceSearchModal
              showAdvanceSearch={showAdvanceSearch}
              setShowAdvanceSearch={setShowAdvanceSearch}
              onRowEnter={() => {
                setCustomerCode({
                  part1: "0001",
                  part2: "001",
                  part3: "000001",
                  part4: "020",
                });
                setShouldShowData(true);
                firstInputRef.current?.focus();
              }}
            />
          </Transition.Child>
        </div>
      </Transition>
      <MessageModal
        isOpen={modalConfig.isOpen}
        title=""
        onClose={handleCloseModal}
        onConfirm={() => {
          handleCloseModal();
        }}
        getContainer={() => containerRef.current!}
      >
        {modalConfig.message}
      </MessageModal>
    </div>
  );
};

export default MainBusinessScreen;
