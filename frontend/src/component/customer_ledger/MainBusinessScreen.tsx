import { labelColor, inputColor } from "../../constants/colors";
import { Select, Button, Radio, Input } from "antd";
import BasicInformation from "./MainAreas/BasicInformation";
import FamilyInfo from "./MainAreas/FamilyInfo";
import OtherInfo from "./MainAreas/OtherInfo";
import AcquisitionInformation from "./MainAreas/AcquisitionInformation";
import AreaInfo from "./MainAreas/AreaInfo";
import EmergencyContact from "./MainAreas/EmergencyContact";
import { useEffect, useRef, useState } from "react";
import { scroller } from "react-scroll";
import { handleNavigationKey040504 } from "../../utils/InputHandlers";
import AdvanceSearchModal from "../transaction_information/1.1.1_03/AdvanceSearchModal";
import MessageModal from "../../context/MessageModal";
import { Transition } from "@headlessui/react";
import React from "react";

const MainBusinessScreen = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const basicInformationRef = useRef<any>(null);
  const acquisitionInformationRef = useRef<any>(null);
  const familyInfoRef = useRef<any>(null);
  const otherInfoRef = useRef<any>(null);
  const areaInfoRef = useRef<any>(null);
  const emergencyContactRef = useRef<any>(null);
  const sections = [
    "basicInformation",
    "acquisitionInformation",
    "areaInfo",
    "emergencyContact",
    "otherInfo",
    "familyInfo",
  ];
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(true);
  const [customerCode, setCustomerCode] = useState({
    part1: "0000",
    part2: "000",
    part3: "000000",
    part4: "000",
  });
  const [showMessegeModal, setShowMessageModal] = useState(false);

  const handleScrollAndFocus = (sectionName: string) => {
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
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleContainerKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const currentSectionIndex = sections.indexOf(activeSection ?? "");
        if (currentSectionIndex === -1) return;
        if (e.shiftKey) {
          const prevIndex =
            (currentSectionIndex - 1 + sections.length) % sections.length;
          handleScrollAndFocus(sections[prevIndex]);
        } else {
          const nextIndex = (currentSectionIndex + 1) % sections.length;
          handleScrollAndFocus(sections[nextIndex]);
        }
        return;
      }
      const focusableElements = Array.from(
        container.querySelectorAll(
          "input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled]) "
        )
      ) as HTMLElement[];

      const activeElement = document.activeElement as HTMLElement;
      const currentIndex = focusableElements.indexOf(activeElement);

      if (currentIndex !== -1) {
        handleNavigationKey040504(e, currentIndex, focusableElements);
      }
    };

    container.addEventListener("keydown", handleContainerKeyDown as any);
    return () => {
      container.removeEventListener("keydown", handleContainerKeyDown as any);
    };
  }, [activeSection, sections]);

  const containerRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLButtonElement>(null);

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
        <div className="w-[90%] h-24 border border-black rounded-md p-2 flex flex-col mt-2 ">
          <div className="w-full flex flex-row items-center justify-center">
            <Select
              className="w-40 mr-2 [&>.ant-select-selector]:!bg-[#ebcec0]"
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
            <Input
              className={`w-10 !px-0 text-center !${inputColor}`}
              defaultValue={"0000"}
              value={customerCode.part1}
            ></Input>
            <span>-</span>
            <Input
              className={`w-10 !px-0 text-center !${inputColor}`}
              defaultValue={"000"}
              value={customerCode.part2}
            ></Input>
            <span>-</span>
            <Input
              className={`w-14 !px-0 text-center !${inputColor}`}
              defaultValue={"000000"}
              value={customerCode.part3}
            ></Input>
            <span>-</span>
            <Input
              className={`w-10 !px-0 text-center !${inputColor}`}
              defaultValue={"000"}
              value={customerCode.part4}
            ></Input>
            <Button
              onClick={() => setShowAdvanceSearch(true)}
              className={`${button} mx-2`}
            >
              ▼
            </Button>
            <Button
              ref={firstInputRef}
              onClick={() =>
                setCustomerCode({
                  part1: "0000",
                  part2: "000",
                  part3: "000000",
                  part4: "000",
                })
              }
              className={`${button} mx-2`}
            >
              再入力
            </Button>
            <label className={label}>管理区分</label>
            <Button
              onClick={() => setShowMessageModal(true)}
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
              onClick={() => setShowMessageModal(true)}
              className={`${button} mx-2`}
            >
              保安
            </Button>
          </div>
          <div className="flex flex-row items-center justify-center mt-2">
            <label className={label}>氏名</label>
            <Input
              className={`w-[20%] !px-0 text-center ${inputColor}`}
            ></Input>
            <label className={label}>顧客種別</label>
            <Radio.Group defaultValue={"法人以外"}>
              <Radio value="法人以外">法人以外</Radio>
              <Radio value="法人 ">法人 </Radio>
            </Radio.Group>
            <label className={label}>代表者名</label>
            <Input
              className={`w-[20%] !px-0 text-center ${inputColor}`}
            ></Input>
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
          基本情報
        </Button>
        <Button
          onClick={() => handleScrollAndFocus("acquisitionInformation")}
          className={`${button} w-28 ${
            activeSection === "acquisitionInformation" ? activeButton : ""
          }`}
        >
          獲得情報
        </Button>
        <Button
          onClick={() => handleScrollAndFocus("areaInfo")}
          className={`${button} w-28 ${
            activeSection === "areaInfo" ? activeButton : ""
          }`}
        >
          担当・地区
        </Button>
        <Button
          onClick={() => handleScrollAndFocus("emergencyContact")}
          className={`${button} w-28 ${
            activeSection === "emergencyContact" ? activeButton : ""
          }`}
        >
          緊急連絡先
        </Button>
        <Button
          onClick={() => handleScrollAndFocus("otherInfo")}
          className={`${button} w-28 ${
            activeSection === "otherInfo" ? activeButton : ""
          }`}
        >
          その他情報
        </Button>
        <Button
          onClick={() => handleScrollAndFocus("familyInfo")}
          className={`${button} w-28 ${
            activeSection === "familyInfo" ? activeButton : ""
          }`}
        >
          家族情報
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
            <BasicInformation ref={basicInformationRef} />
          </div>
          <div
            onFocus={() => setActiveSection("acquisitionInformation")}
            id="acquisitionInformationSection"
          >
            <AcquisitionInformation ref={acquisitionInformationRef} />
          </div>
          <div
            onFocus={() => setActiveSection("areaInfo")}
            id="areaInfoSection"
          >
            {" "}
            <AreaInfo ref={areaInfoRef} />
          </div>

          <div
            onFocus={() => setActiveSection("emergencyContact")}
            id="emergencyContactSection"
          >
            <EmergencyContact ref={emergencyContactRef} />
          </div>
          <div
            onFocus={() => setActiveSection("otherInfo")}
            id="otherInfoSection"
          >
            <OtherInfo ref={otherInfoRef} />
          </div>

          <div
            onFocus={() => setActiveSection("familyInfo")}
            id="familyInfoSection"
          >
            <FamilyInfo ref={familyInfoRef} />
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="flex flex-col text-sm w-full justify-center items-center mt-2">
        <div className="flex flex-row justify-between items-center w-[90%]">
          <Button
            className={`!bg-[#80bad7] !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}
          >
            F1ヘルプ
          </Button>
          <Button
            className={`!bg-[#80bad7] !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}
          >
            F2入力切替
          </Button>
          <Button
            className={`!bg-[#80bad7] !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}
          >
            F3事業所変更
          </Button>
          <Button
            className={`!bg-[#80bad7] !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}
          >
            F4検索
          </Button>
          <Button
            className={`!bg-[#80bad7] !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}
          >
            F5前の顧客
          </Button>
          <Button
            className={`!bg-[#80bad7] !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}
          >
            F6次の顧客
          </Button>
          <Button
            className={`!bg-[#80bad7] !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}
          >
            F7顧客コード変更
          </Button>
          <Button
            className={`!bg-[#80bad7] !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}
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
                  className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}
                >
                  顧客{"\n"}情報
                </Button>
                <Button
                  className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}
                >
                  請求{"\n"}情報
                </Button>
                <Button
                  className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}
                >
                  検配{"\n"}情報
                </Button>
                <Button
                  className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}
                >
                  灯油{"\n"}情報
                </Button>
                <Button
                  className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}
                >
                  集中{"\n"}監視
                </Button>
                <Button
                  className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}
                >
                  保証金
                </Button>
                <Button
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
                  className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}
                >
                  開始{"\n"}点検
                </Button>
                <Button
                  className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}
                >
                  開閉{"\n"}伝票
                </Button>
                <Button
                  className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}
                >
                  検針{"\n"}伝票
                </Button>
                <Button
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
              >
                保存(S)
              </Button>
              <Button
                className={`flex-1 h-full shadow-md shadow-zinc-500 ${labelColor}`}
              >
                削除(D)
              </Button>
              <Button
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
            className="transition-all w-1/2 duration-300 ease-out"
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
                firstInputRef.current?.focus();
              }}
            />
          </Transition.Child>
        </div>
      </Transition>
      <MessageModal
        isOpen={showMessegeModal}
        title=""
        onClose={() => setShowMessageModal(false)}
        onConfirm={() => setShowMessageModal(false)}
      >
        関連項目以外が初期化されますが、よろしいですか？
      </MessageModal>
    </div>
  );
};

export default MainBusinessScreen;
