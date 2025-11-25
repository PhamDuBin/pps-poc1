import "react-day-picker/dist/style.css";
import React, { useState, useEffect, useMemo } from "react";
import CustomModal from "../../context/CustomModal";
import { CustomerSearchModal } from "./CustomerSearchModal";
import { inputColor, labelColor } from "../../constants/colors";
import { CustomCodeTextPair } from "./AntdCodeInputSelect";
import { Button, Select } from "antd";
import JapaneseCalendar from "../JapaneseCalendar";
import { KanaFullWidthInput } from "../JapaneseInputs";

type SurveyRowProps = {
  onOpenModal: () => void;
  index: number;
  value: string;
  onValueChange: (newValue: string) => void;
  onSelectKeyDown: (e: React.KeyboardEvent<HTMLSelectElement>) => void;
  isPrecedingDisabled: boolean;
};

const SurveyRow: React.FC<SurveyRowProps> = ({
  onOpenModal,
  index,
  value,
  onValueChange,
  onSelectKeyDown,
  isPrecedingDisabled,
}) => {
  const isDisabled = value === "" || value === "0" || isPrecedingDisabled;

  return (
    <div className="flex flex-row relative w-full mt-1 text-[10px] items-center">
      <Select
        id={`survey-select-${index}`}
        value={value}
        disabled={isPrecedingDisabled}
        onChange={(val) => onValueChange(val)}
        onKeyDown={(e) => {
          onSelectKeyDown(e as any);
        }}
        className="w-24 mr-1 h-6"
        popupMatchSelectWidth={false}
      >
        <Select.Option value="" disabled hidden>
          0
        </Select.Option>
        <Select.Option value="0">0:空白</Select.Option>
        <Select.Option value="1">1:拒否</Select.Option>
        <Select.Option value="2">2:不在</Select.Option>
        <Select.Option value="3">3:その他</Select.Option>
      </Select>

      <div
        className={`relative w-[45%] mr-1 ${
          isDisabled ? "pointer-events-none opacity-50 bg-gray-200" : ""
        }`}
      >
        <JapaneseCalendar
          disabled={isDisabled}
          align="right"
          className="japanese-calendar w-full h-[24px] border border-black p-1 text-[10px]"
        />
      </div>

      <Button
        onClick={onOpenModal}
        disabled={isDisabled}
        // SỬA: Dùng backtick ` và ${labelColor}
        className={`w-[30%] h-[24px] border border-black text-[10px] flex items-center justify-center p-0 rounded-none ${
          isDisabled ? "bg-gray-300 cursor-not-allowed" : labelColor
        }`}
      >
        備考
      </Button>
    </div>
  );
};

const RightPanel = () => {
  const [circleStates, setCircleStates] = useState<boolean[]>(
    Array(5).fill(false)
  );

  const toggleCircle = (index: number) => {
    setCircleStates((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };

  const [circleStates2, setCircleStates2] = useState<boolean[]>(
    Array(4).fill(false)
  );

  const toggleCircle2 = (index: number) => {
    setCircleStates2((prev) =>
      prev.map((val, i) => (i === index ? !val : val))
    );
  };

  const [modalF2Open, setModalF2Open] = useState<boolean>(false);
  const [titleModal, setTitleModal] = useState("");

  const options = ["", "済", "無"];
  const options1 = useMemo(() => ["", "良", "否"], []);
  const options2 = useMemo(() => ["", "良", "否"], []);
  const [index, setIndex] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [index3, setIndex3] = useState(0);
  const [index4, setIndex4] = useState(0);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  const handleClick = () => {
    setIndex((prev) => (prev + 1) % options.length);
  };
  const handleClick2 = () => {
    setIndex2((prev) => (prev + 1) % options.length);
  };

  const handleClick3 = () => {
    setIndex3((prev) => (prev + 1) % options1.length);
  };

  const handleClick4 = () => {
    setIndex4((prev) => (prev + 1) % options2.length);
  };

  const rows = Array.from({ length: 10 }, (_, i) => i + 1);
  const [surveyValues, setSurveyValues] = useState<string[]>(Array(5).fill(""));

  const handleSurveyChange = (index: number, newValue: string) => {
    setSurveyValues((prev) => {
      const newValues = [...prev];
      newValues[index] = newValue;
      return newValues;
    });
  };

  const handleSurveySelectKeyDown = (
    e: React.KeyboardEvent<HTMLSelectElement>,
    index: number
  ) => {
    if (
      e.key === "Tab" &&
      !e.shiftKey &&
      (surveyValues[index] === "" || surveyValues[index] === "0")
    ) {
      e.preventDefault();
      let nextFocusableElement: HTMLElement | null = null;
      for (let i = index + 1; i < surveyValues.length; i++) {
        if (surveyValues[i] !== "" && surveyValues[i] !== "0") {
          nextFocusableElement = document.getElementById(`survey-select-${i}`);
          break;
        }
      }
      if (!nextFocusableElement) {
        nextFocusableElement = document.getElementById("shuchi-button-1");
      }
      nextFocusableElement?.focus();
    }
  };

  const [notificationLabel, setNotificationLabel] = useState("0");
  const [tsuchihoCode, setTsuchihoCode] = useState("");
  const [kaizenCode, setKaizenCode] = useState("");
  const [kyokyuTsuchihoCode, setKyokyuTsuchihoCode] = useState("");
  const [kyokyuKaizenCode, setKyokyuKaizenCode] = useState("");

  const notificationOptions = [
    { value: "0", label: "0:空白" },
    { value: "1", label: "1:コンロ　ゴム管不良" },
    { value: "2", label: "2:コンロ　末端閉止弁不良" },
    { value: "3", label: "3:コンロ　安全装置不良" },
    { value: "4", label: "4:コンロ　バーナー燃焼不良" },
    { value: "5", label: "5:給湯器及び追い炊き機能付 給排気不良不備" },
    { value: "6", label: "6:給湯器及び追い炊き機能付　排気筒不良不備" },
    { value: "7", label: "7:給湯器及び追い炊き機能付　立消安全装置不良不備" },
    {
      value: "8",
      label: "8:給湯器及び追い炊き機能付　不完全燃焼防止装置不良不備",
    },
    { value: "9", label: "9:風呂釜　給排気不良・不備" },
    { value: "10", label: "10:風呂釜　ガス漏れ" },
  ];

  const [notificationLabel1, setNotificationLabel1] = useState("0");
  const [notificationLabel2, setNotificationLabel2] = useState("0");
  const [notificationLabel3, setNotificationLabel3] = useState("0");

  const notificationOptions1 = [
    { value: "0", label: "0:空白" },
    { value: "1", label: "1:メーター期限（否)" },
    { value: "2", label: "2:ガス栓ビューズ無し" },
    { value: "3", label: "3:器具燃焼状況" },
    { value: "4", label: "4:器具設置場所" },
    { value: "5", label: "5:器具接続管（否）" },
    { value: "6", label: "6:未使用ガス栓（否）" },
    { value: "7", label: "7:メーターBおよびBR表示" },
    {
      value: "8",
      label: "8:接続管ゴ厶管（否）",
    },
    { value: "9", label: "9:漏洩検知部表示" },
    { value: "10", label: "10:ガス漏警報器無し" },
    { value: "11", label: "11:圧力降下（ガス漏れ）" },
  ];

  const notificationOptions2 = [
    { value: "0", label: "0:空白" },
    { value: "1", label: "1:調整噐交換" },
    { value: "2", label: "2:メータ交換" },
    { value: "3", label: "3:接続管交換" },
    { value: "4", label: "4:遮断装置" },
  ];

  const notificationOptions3 = [
    { value: "0", label: "0:空白" },
    { value: "1", label: "1:容器" },
    { value: "2", label: "2:容器設置場所" },
    { value: "3", label: "3:容器チェーン" },
    { value: "4", label: "4:容噐危険標識" },
    { value: "5", label: "5:高圧ホース期限切れ" },
    { value: "6", label: "6:調整器期限切れ" },
    { value: "7", label: "7:調整器圧力" },
    {
      value: "8",
      label: "調整器高圧ホース期限切れ",
    },
    { value: "9", label: "ガスメータ" },
    { value: "10", label: "ガスメータ検満" },
  ];

  useEffect(() => {
    if (options1[index3] !== "否") {
      setNotificationLabel("0");
      setTsuchihoCode("");
      setNotificationLabel1("0");
      setKaizenCode("");
    }
  }, [index3, options1]);

  useEffect(() => {
    if (options2[index4] !== "否") {
      setNotificationLabel2("0");
      setKyokyuTsuchihoCode("");
      setNotificationLabel3("0");
      setKyokyuKaizenCode("");
    }
  }, [index4, options2]);

  const label = `${labelColor} h-[24px] flex justify-center items-center border border-black`;

  return (
    <div className="w-[350px] relative border border-black p-2 h-full overflow-y-auto text-xs bg-white">
      <div className="flex flex-col">
        <div>
          <span className={`${label} font-bold w-full`}>今回調査日</span>
          <div className="flex flex-row relative mt-1 items-center">
            <span className={`${label} !h-[24px] w-[30%] text-[10px] mr-1`}>
              調査日
            </span>
            <div className="w-[70%]">
              <JapaneseCalendar
                align="right"
                className="japanese-calendar h-[24px] border border-black w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full text-[10px] mt-2">
          <span
            className={`w-[10%] h-[120px] ${labelColor} flex justify-center items-center text-center border border-black`}
          >
            調査区分
          </span>
          <div className="flex flex-col w-[35%] ">
            <span className={`${label} border-b-0`}>供給開始</span>
            <span className={`${label} border-b-0`}>供給点検</span>
            <span className={`${label} border-b-0`}>消費調査</span>
            <span className={`${label} border-b-0`}>埋設管</span>
            <span className={`${label}`}>地下室</span>
          </div>
          <div className="flex flex-col w-[10%]">
            {circleStates.map((active, i) => (
              <Button
                key={i}
                onClick={() => toggleCircle(i)}
                type="text"
                className={`
                  h-[24px] w-full 
                  flex items-center justify-center 
                  border border-black border-l-0 
                  rounded-none 
                  p-0 
                  ${inputColor}
                `}
                style={{ boxShadow: "none" }}
              >
                <div
                  className={`
                    w-[14px] h-[14px] 
                    border border-black rounded-full 
                    ${active ? "bg-black" : "bg-white"}
                  `}
                />
              </Button>
            ))}
          </div>
          <div className="flex flex-col w-[35%]">
            <span className={`${label} border-b-0 border-l-0`}>再調査</span>
            <span className={`${label} border-b-0 border-l-0`}>完成調査</span>
            <span className={`${label} border-b-0 border-l-0`}>CO点検</span>
            <span className={`${label} border-b-0 border-l-0`}>消費器具</span>
            <span className={`${label} border-l-0`}></span>
          </div>
          <div className="flex flex-col w-[10%]">
            {circleStates2.map((active, i) => (
              <Button
                key={i}
                onClick={() => toggleCircle2(i)}
                type="text"
                className={`
                  h-[24px] w-full 
                  flex items-center justify-center 
                  border border-black border-l-0 
                  rounded-none 
                  p-0 
                  ${inputColor}
                `}
                style={{ boxShadow: "none" }}
              >
                <div
                  className={`
                    w-[14px] h-[14px] 
                    border border-black rounded-full 
                    ${active ? "bg-black" : "bg-white"}
                  `}
                />
              </Button>
            ))}
            <div
              className={`h-[24px] border border-black border-l-0 border-t-0 ${inputColor}`}
            ></div>
          </div>
        </div>

        <span
          className={`${labelColor} h-[25px] mt-2 w-full p-1 border border-black flex text-center justify-center items-center font-bold`}
        >
          訪問履歴
        </span>

        <div className="mt-2">
          <span className={`${label} font-bold w-full`}>未調査区分</span>
          {Array.from({ length: 5 }).map((_, i) => {
            const isPrecedingDisabled = surveyValues
              .slice(0, i)
              .some((val) => val === "" || val === "0");
            return (
              <SurveyRow
                key={i}
                index={i}
                value={surveyValues[i]}
                onValueChange={(newValue) => handleSurveyChange(i, newValue)}
                onSelectKeyDown={(e) => handleSurveySelectKeyDown(e as any, i)}
                isPrecedingDisabled={isPrecedingDisabled}
                onOpenModal={() => {
                  setModalF2Open(true);
                  setTitleModal("備考");
                }}
              />
            );
          })}
          <div className="flex flex-row mt-2 text-[10px] h-[24px]">
            <span
              className={`w-[15%] flex items-center justify-center border border-black ${labelColor}`}
            >
              周知
            </span>
            <Button
              id="shuchi-button-1"
              onClick={handleClick2}
              className={`w-[28%] h-6 ${inputColor}  border border-black`}
            >
              {options[index2]}
            </Button>

            <Button
              onClick={() => {
                setModalF2Open(true);
                setTitleModal("周知内容");
              }}
              disabled={options[index2] !== "済"}
              className={`w-[22px] h-full flex items-center justify-center border border-gray-500`}
            >
              ▼
            </Button>
            <span
              className={`w-[15%] flex items-center justify-center border border-black border-l-0 ${labelColor}`}
            >
              周知
            </span>

            <Button
              onClick={handleClick}
              className={`w-[28%] h-6 ${inputColor}  border border-black`}
            >
              {options[index]}
            </Button>

            <Button
              onClick={() => ""}
              disabled={options[index] !== "済"}
              className={`w-[22px] h-full flex items-center justify-center border border-gray-500`}
            >
              ▼
            </Button>
          </div>
        </div>

        <div className="mt-2">
          <span className={`${label} font-bold w-full`}>交換部品</span>
          <div className="w-full border border-black text-[10px]">
            <div className="max-h-[70px] overflow-y-scroll">
              <table className="w-full border-collapse table-fixed">
                <thead>
                  <tr className={`${labelColor} sticky top-0 z-10`}>
                    <th className={`border border-black w-1/3`}>金額</th>
                    <th className={`border border-black w-1/3`}>数量</th>
                    <th className={`border border-black w-1/3`}>商品名</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row} className="bg-white">
                      <td
                        onClick={() => {
                          setModalF2Open(true);
                          setTitleModal("部品マスター検索");
                        }}
                        className="border border-black text-center h-[20px] cursor-pointer"
                      ></td>
                      <td className="border border-black text-center h-[20px]">
                        0.00
                      </td>
                      <td className="border border-black text-center h-[20px]">
                        0
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-2 text-[10px]">
          <div className="flex flex-row h-[24px]">
            <span className={`${label} !w-3/5`}>消費設備調査</span>
            <button
              onClick={handleClick3}
              className={`w-2/5 border border-black border-l-0 ${inputColor}`}
            >
              {options1[index3]}
            </button>
          </div>
          <CustomCodeTextPair
            label="通知事項"
            options={notificationOptions}
            codeValue={notificationLabel}
            onCodeChange={setNotificationLabel}
            textValue={tsuchihoCode}
            onTextChange={setTsuchihoCode}
            disabled={options1[index3] !== "否"}
          />
          <CustomCodeTextPair
            label="要改善"
            options={notificationOptions1}
            codeValue={notificationLabel1}
            onCodeChange={setNotificationLabel1}
            textValue={kaizenCode}
            onTextChange={setKaizenCode}
            disabled={options1[index3] !== "否"}
          />
          <div className="flex flex-row relative mt-1 items-center">
            <span className={`${label} !h-[24px] w-[40%] mr-1`}>
              再調査予定日
            </span>
            <div className="w-[60%]">
              <JapaneseCalendar
                align="right"
                className="japanese-calendar h-[24px] border border-black w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-2 text-[10px]">
          <div className="flex flex-row h-[24px]">
            <span className={`${label} !w-3/5`}>供給設備点検</span>
            <button
              onClick={handleClick4}
              className={`w-2/5 border border-black border-l-0 ${inputColor}`}
            >
              {options2[index4]}
            </button>
          </div>
          <CustomCodeTextPair
            label="通知事項"
            options={notificationOptions2}
            codeValue={notificationLabel2}
            onCodeChange={setNotificationLabel2}
            textValue={kyokyuTsuchihoCode}
            onTextChange={setKyokyuTsuchihoCode}
            disabled={options2[index4] !== "否"}
          />

          <CustomCodeTextPair
            label="要改善"
            options={notificationOptions3}
            codeValue={notificationLabel3}
            onCodeChange={setNotificationLabel3}
            textValue={kyokyuKaizenCode}
            onTextChange={setKyokyuKaizenCode}
            disabled={options2[index4] !== "否"}
          />
          <div className="flex flex-row relative mt-1 items-center">
            <span className={`${label} !h-[24px] w-[40%] mr-1`}>
              連絡済相手
            </span>
            <KanaFullWidthInput className="w-[60%] h-[24px] border border-black bg-white px-1"></KanaFullWidthInput>
          </div>
        </div>

        <div className="flex flex-row justify-between mt-4">
          <Button
            className={`w-[30%] text-[10px] h-[28px] border border-black rounded ${labelColor} shadow p-0`}
          >
            地図
          </Button>
          <Button
            className={`w-[30%] text-[10px] h-[28px] border border-black rounded ${labelColor} shadow p-0`}
          >
            図面
          </Button>
          <Button
            className={`w-[30%] text-[10px] h-[28px] border border-black rounded ${labelColor} shadow p-0`}
          >
            写真
          </Button>
        </div>

        <div className="flex flex-row justify-between mt-2 mb-2">
          <Button
            onClick={() => setIsCustomerModalOpen(true)}
            className={`w-[48%] border text-[10px] h-[32px] border-black ${labelColor} shadow p-0`}
          >
            保存（S)
          </Button>
          <Button
            onClick={() => setIsCustomerModalOpen(true)}
            className={`w-[48%] border text-[10px] h-[32px] border-black ${labelColor} shadow p-0`}
          >
            閉じる（C)
          </Button>
        </div>
      </div>
      <CustomModal
        isOpen={modalF2Open}
        onClose={() => setModalF2Open(false)}
        title={titleModal}
      />
      {isCustomerModalOpen && (
        <CustomerSearchModal onClose={() => setIsCustomerModalOpen(false)} />
      )}
    </div>
  );
};

export default RightPanel;
