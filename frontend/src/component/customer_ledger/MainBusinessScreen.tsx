import { labelColor , inputColor} from "../../constants/colors";
import { Select, Button, Radio, Input } from "antd";
import BasicInformation from "./MainAreas/BasicInformation";
import FamilyInfo from "./MainAreas/FamilyInfo";
import OtherInfo from "./MainAreas/OtherInfo";
import AcquisitionInformation from "./MainAreas/AcquisitionInformation";
import AreaInfo from "./MainAreas/AreaInfo";
import EmergencyContact from "./MainAreas/EmergencyContact";
import { useEffect, useRef, useState } from "react";

export const handleNavigationKey = (
  e: KeyboardEvent,
  currentIndex: number,
  focusableElements: HTMLElement[]
) => {
  if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
    let nextIndex = currentIndex;
    const total = focusableElements.length;

    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % total;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + total) % total;
    }

    focusableElements[nextIndex]?.focus();
  }
};

const MainBusinessScreen = () => {

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const basicInformationRef = useRef<any>(null);
  const acquisitionInformationRef = useRef<any>(null);
  const familyInfoRef = useRef<any>(null);
  const otherInfoRef = useRef<any>(null);
  const areaInfoRef = useRef<any>(null);
  const emergencyContactRef = useRef<any>(null);

  const handleFocusSection = (sectionName: string) => {
    setActiveSection(sectionName);
    setTimeout(() => {
      switch (sectionName) {
        case "basicInformation":
          if (basicInformationRef.current) {
            const container = basicInformationRef.current.getContainerNode?.();
            container?.scrollIntoView({ behavior: "smooth", block: "start" });
            basicInformationRef.current.focusFirstInput?.();
          }
          break;
        case "acquisitionInformation":
          if (acquisitionInformationRef.current) {
            const container = acquisitionInformationRef.current.getContainerNode?.();
            container?.scrollIntoView({ behavior: "smooth", block: "start" });
            acquisitionInformationRef.current.focusFirstSelect?.();
          }
          break;
        case "areaInfo":
          if (areaInfoRef.current) {
            const container = areaInfoRef.current.getContainerNode?.();
            container?.scrollIntoView({ behavior: "smooth", block: "start" });
            areaInfoRef.current.focusFirstInput?.();
          }
          break;
        case "emergencyContact":
          if (emergencyContactRef.current) {
            const container = emergencyContactRef.current.getContainerNode?.();
            container?.scrollIntoView({ behavior: "smooth", block: "start" });
            emergencyContactRef.current.focusFirstSelect?.();
          }
          break;
        case "otherInfo":
          if (otherInfoRef.current) {
            const container = otherInfoRef.current.getContainerNode?.();
            container?.scrollIntoView({ behavior: "smooth", block: "start" });
            otherInfoRef.current.focusFirstButton?.();
          }
          break;
        case "familyInfo":
          if (familyInfoRef.current) {
            const container = familyInfoRef.current.getContainerNode?.();
            container?.scrollIntoView({ behavior: "smooth", block: "start" });
            familyInfoRef.current.focusFirstInput?.();
          }
          break;    
        default:
          break;
      }
    }, 0);
  };

  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
  
      const handleContainerKeyDown = (e: KeyboardEvent) => {
        const focusableElements = Array.from(
          container.querySelectorAll(
            "input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled]) "
          )
        ) as HTMLElement[];
  
        const activeElement = document.activeElement as HTMLElement;
        const currentIndex = focusableElements.indexOf(activeElement);
  
        if (currentIndex !== -1) {
          handleNavigationKey(e, currentIndex, focusableElements);
        }
      };
  
      container.addEventListener("keydown", handleContainerKeyDown as any);
      return () => {
        container.removeEventListener("keydown", handleContainerKeyDown as any);
      };
    }, []);

  const label =
    `h-8 border border-gray-300 font-bold rounded-md flex text-center justify-center items-center px-2 ml-7 mr-2 ${labelColor}`;
  const button = `flex text-center justify-center items-center ${labelColor} border border-black xl:text-base text-xs font-bold shadow-md shadow-zinc-600 hover:bg-white`;
  const activeButton = `bg-yellow-300 border-yellow-400`;
  return (
    <div ref={containerRef} className="h-screen w-full flex flex-col px-4 py-2 ">
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
            <Select className="w-40 mr-2 [&>.ant-select-selector]:!bg-[#ebcec0]" defaultValue="顧客コード">
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
            ></Input>
            <span>-</span>
            <Input
              className={`w-10 !px-0 text-center !${inputColor}`}
              defaultValue={"000"}
            ></Input>
            <span>-</span>
            <Input
              className={`w-14 !px-0 text-center !${inputColor}`}
              defaultValue={"000000"}
            ></Input>
            <span>-</span>
            <Input
              className={`w-10 !px-0 text-center !${inputColor}`}
              defaultValue={"000"}
            ></Input>
            <Button className={`${button} mx-2`}>
              ▼
            </Button>
            <Button className={`${button} mx-2`}>
              再入力
            </Button>
            <label className={label}>管理区分</label>
            <Button className={`${button} mx-2`}>
              直売
            </Button>
            <Button className={`${button} mx-2`}>
              卸
            </Button>
            <Button className={`${button} mx-2`}>
              配送
            </Button>
            <Button className={`${button} mx-2`}>
              保安
            </Button>
          </div>
          <div className="flex flex-row items-center justify-center mt-2">
            <label className={label}>氏名</label>
            <Input className={`w-[20%] !px-0 text-center ${inputColor}`}></Input>
            <label className={label}>顧客種別</label>
            <Radio.Group defaultValue={"法人以外"}>
              <Radio value="法人以外">法人以外</Radio>
              <Radio value="法人 ">法人 </Radio>
            </Radio.Group>
            <label className={label}>代表者名</label>
            <Input className={`w-[20%] !px-0 text-center ${inputColor}`}></Input>
          </div>
        </div>
      </div>
      {/* button group */}
      <div className="flex flex-row my-2 justify-between items-center text-sm mx-48">
        <Button onClick={() => handleFocusSection("basicInformation")} className={`${button} w-28 ${activeSection === "basicInformation" ? activeButton : ""}`}>基本情報</Button>
        <Button onClick={()=> handleFocusSection("acquisitionInformation")} className={`${button} w-28 ${activeSection === "acquisitionInformation" ? activeButton : ""}`}>獲得情報</Button>
        <Button onClick={()=> handleFocusSection("areaInfo")} className={`${button} w-28 ${activeSection === "areaInfo" ? activeButton : ""}`}>担当・地区</Button>
        <Button onClick={()=> handleFocusSection("emergencyContact")} className={`${button} w-28 ${activeSection === "emergencyContact" ? activeButton : ""}`}>緊急連絡先</Button>
        <Button onClick={()=> handleFocusSection("otherInfo")} className={`${button} w-28 ${activeSection === "ortherInfo" ? activeButton : ""}`}>その他情報</Button>
        <Button onClick={()=> handleFocusSection("familyInfo")} className={`${button} w-28 ${activeSection === "familyInfo" ? activeButton : ""}`}>家族情報</Button>
      </div>
      {/* content area */}
      <div className="w-full h-[70%] flex justify-center items-center text-sm">
        <div className="w-[90%] h-full border border-black p-4 overflow-auto z-50">
          <BasicInformation ref={basicInformationRef}/>
          <AcquisitionInformation ref={acquisitionInformationRef}/>
          <AreaInfo ref={areaInfoRef} />
          <EmergencyContact ref={emergencyContactRef} />
          <OtherInfo ref={otherInfoRef} />
          <FamilyInfo ref={familyInfoRef} />
        </div>
      </div>
      {/* footer */}
      <div className="flex flex-col text-sm w-full justify-center items-center mt-2">
        <div className="flex flex-row justify-between items-center w-[90%]">
          <Button className={`!bg-[#80bad7] !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}>F1ヘルプ</Button>
          <Button className={`!bg-[#80bad7] !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}>F2入力切替</Button>
          <Button className={`!bg-[#80bad7] !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}>
            F3事業所変更
          </Button>
          <Button className={`!bg-[#80bad7] !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}>F4検索</Button>
          <Button className={`!bg-[#80bad7] !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}>F5前の顧客</Button>
          <Button className={`!bg-[#80bad7] !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}>F6次の顧客</Button>
          <Button className={`!bg-[#80bad7] !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}>
            F7顧客コード変更
          </Button>
          <Button className={`!bg-[#80bad7] !text-black hover:!bg-white hover:!text-blue-600 w-28 shadow-md shadow-zinc-500`}>F8再入力</Button>
        </div>
        <div className="flex flex-col w-[90%] mt-2">
          {/* Hàng thứ hai: chia 3 block */}
          <div className="flex flex-row justify-between w-full">
            {/* マスター情報 */}
            <div className="flex flex-col w-[40%]">
              <span className={`h-8 border border-gray-300 rounded-md font-bold flex text-center justify-center items-center w-full ${labelColor}`}>
                マスター情報
              </span>
              <div className="flex flex-row w-full">
                <Button className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}>
                  顧客{"\n"}情報
                </Button>
                <Button className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}>
                  請求{"\n"}情報
                </Button>
                <Button className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}>
                  検配{"\n"}情報
                </Button>
                <Button className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}>
                  灯油{"\n"}情報
                </Button>
                <Button className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}>
                  集中{"\n"}監視
                </Button>
                <Button className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}>
                  保証金
                </Button>
                <Button className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}>
                  保安{"\n"}情報
                </Button>
              </div>
            </div>

            {/* 伝票入力 */}
            <div className="flex flex-col w-[30%]">
              <span className={`h-8 border border-gray-300 rounded-md font-bold flex text-center justify-center items-center w-full ${labelColor}`}>
                伝票入力
              </span>
              <div className="flex flex-row w-full">
                <Button className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}>
                  開始{"\n"}点検
                </Button>
                <Button className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}>
                  開閉{"\n"}伝票
                </Button>
                <Button className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}>
                  検針{"\n"}伝票
                </Button>
                <Button className={`flex-1 h-20 m-0.5 shadow-md shadow-zinc-500 leading-tight whitespace-pre-line ${labelColor}`}>
                  配送{"\n"}伝票
                </Button>
              </div>
            </div>

            {/* 保存削除閉じる */}
            <div className="flex flex-row justify-end w-[30%]">
              <Button className={`flex-1 h-full shadow-md shadow-zinc-500 ${labelColor}`}>
                保存(S)
              </Button>
              <Button className={`flex-1 h-full shadow-md shadow-zinc-500 ${labelColor}`}>
                削除(D)
              </Button>
              <Button className={`flex-1 h-full shadow-md shadow-zinc-500 ${labelColor}`}>
                閉じる(C)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBusinessScreen;
