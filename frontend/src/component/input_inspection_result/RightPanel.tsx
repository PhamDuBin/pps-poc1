import { DownArrowIcon } from "../transaction_information/LeftPanel";
import "react-day-picker/dist/style.css";
import React, { useState } from "react";
import { DatePickerInput } from "../../context/DatePickerInput";
import CustomModal from "../../context/CustomModal";
import { CustomerSearchModal } from "./CustomerSearchModal";

const SurveyRow = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <div className="flex flex-row relative w-full">
    <select className="border border-black rounded-lg w-[25%]">
      <option value="0">空白</option>
      <option value="1">拒否</option>
      <option value="2">不在</option>
      <option value="3">その他</option>
    </select>

    <div className="w-[70%] ml-auto">
      <DatePickerInput />
    </div>
    <button
      onClick={onOpenModal}
      className="w-[30%] border border-black bg-[#D9D9D9]"
    >
      備考
    </button>
  </div>
);

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
  const options1 = ["", "良", "否"];
  const options2 = ["", "良", "否"];
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

  const [notificationValue, setNotificationValue] = useState("0");
  const [notificationLabel, setNotificationLabel] = useState("0");

  const notificationOptions = [
    { value: "0", label: "▼" },
    { value: "1", label: "コンロ　ゴム管不良" },
    { value: "2", label: "コンロ　末端閉止弁不良" },
    { value: "3", label: "コンロ　安全装置不良" },
    { value: "4", label: "コンロ　バーナー燃焼不良" },
    { value: "5", label: "給湯器及び追い炊き機能付 給排気不良不備" },
    { value: "6", label: "給湯器及び追い炊き機能付　排気筒不良不備" },
    { value: "7", label: "給湯器及び追い炊き機能付　立消安全装置不良不備" },
    {
      value: "8",
      label: "給湯器及び追い炊き機能付　不完全燃焼防止装置不良不備",
    },
    { value: "9", label: "風呂釜　給排気不良・不備" },
    { value: "10", label: "風呂釜　ガス漏れ" },
  ];

  const handleNotificationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = e.target.value;
    setNotificationValue(selectedValue);
    const selectedOption = notificationOptions.find(
      (option) => option.value === selectedValue
    );

    if (selectedOption) {
      setNotificationLabel(selectedValue === "0" ? "0" : selectedOption.label);
    }
  };

  const [notificationValue1, setNotificationValue1] = useState("0");
  const [notificationLabel1, setNotificationLabel1] = useState("0");

  const [notificationValue2, setNotificationValue2] = useState("0");
  const [notificationLabel2, setNotificationLabel2] = useState("0");

  const [notificationValue3, setNotificationValue3] = useState("0");
  const [notificationLabel3, setNotificationLabel3] = useState("0");

  const notificationOptions1 = [
    { value: "0", label: "▼" },
    { value: "1", label: "メーター期限（否)" },
    { value: "2", label: "ガス栓ビューズ無し" },
    { value: "3", label: "器具燃焼状況" },
    { value: "4", label: "器具設置場所" },
    { value: "5", label: "器具接続管（否）" },
    { value: "6", label: "未使用ガス栓（否）" },
    { value: "7", label: "メーターBおよびBR表示" },
    {
      value: "8",
      label: "接続管ゴ厶管（否）",
    },
    { value: "9", label: "漏洩検知部表示" },
    { value: "10", label: "ガス漏警報器無し" },
    { value: "11", label: "圧力降下（ガス漏れ）" },
  ];

  const notificationOptions2 = [
    { value: "0", label: "▼" },
    { value: "1", label: "調整噐交換" },
    { value: "2", label: "メータ交換" },
    { value: "3", label: "接続管交換" },
    { value: "4", label: "遮断装置" },
  ];

  const notificationOptions3 = [
    { value: "0", label: "▼" },
    { value: "1", label: "容器" },
    { value: "2", label: "容器設置場所" },
    { value: "3", label: "容器チェーン" },
    { value: "4", label: "容噐危険標識" },
    { value: "5", label: "高圧ホース期限切れ" },
    { value: "6", label: "調整器期限切れ" },
    { value: "7", label: "調整器圧力" },
    {
      value: "8",
      label: "調整器高圧ホース期限切れ",
    },
    { value: "9", label: "ガスメータ" },
    { value: "10", label: "ガスメータ検満" },
  ];

  const handleNotificationChange1 = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = e.target.value;
    setNotificationValue1(selectedValue);
    const selectedOption = notificationOptions1.find(
      (option) => option.value === selectedValue
    );

    if (selectedOption) {
      setNotificationLabel1(selectedValue === "0" ? "0" : selectedOption.label);
    }
  };

  const handleNotificationChange2 = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = e.target.value;
    setNotificationValue2(selectedValue);
    const selectedOption = notificationOptions2.find(
      (option) => option.value === selectedValue
    );

    if (selectedOption) {
      setNotificationLabel2(selectedValue === "0" ? "0" : selectedOption.label);
    }
  };
  const handleNotificationChange3 = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = e.target.value;
    setNotificationValue3(selectedValue);
    const selectedOption = notificationOptions3.find(
      (option) => option.value === selectedValue
    );

    if (selectedOption) {
      setNotificationLabel3(selectedValue === "0" ? "0" : selectedOption.label);
    }
  };

  const label =
    "bg-[#D9D9D9] h-[24px] flex justify-center items-center border border-black";
  return (
    <div className="w-[350px] border border-black p-2 h-full overflow-y-auto text-xs">
      <div className="flex flex-col">
        <div>
          <span className={`${label} font-bold  w-full`}>今回調査日</span>
          <div className="flex flex-row relative">
            <span className={`${label} !h-[30px] w-[30%]`}>調査日</span>

            <div className="w-[70%] ml-auto">
              <DatePickerInput />
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <span className="w-[10%] h-[120px] bg-[#D9D9D9] flex justify-center items-center text-center border border-black">
            調査区分
          </span>
          <div className="flex flex-col w-[35%]">
            <span className={`${label} `}>供給開始</span>
            <span className={`${label} `}>供給点検</span>
            <span className={`${label} `}>消費調査</span>
            <span className={`${label} `}>埋設管</span>
            <span className={`${label}`}>地下室</span>
          </div>
          <div className="flex flex-col w-[10%]">
            {circleStates.map((active, i) => (
              <button
                key={i}
                onClick={() => toggleCircle(i)}
                className=" h-[24px] flex items-center justify-center border border-black bg-white"
              >
                <div
                  className={`w-[15px] h-[15px] border border-black rounded-full 
                  ${active ? "bg-black" : "bg-white"}`}
                ></div>
              </button>
            ))}
          </div>
          <div className="flex flex-col w-[35%]">
            <span className={`${label} `}>再調査</span>
            <span className={`${label} `}>完成調査</span>
            <span className={`${label} `}>CO点検</span>
            <span className={`${label} `}>消費器具</span>
            <span className={`${label} `}></span>
          </div>
          <div className="flex flex-col w-[10%]">
            {circleStates2.map((active, i) => (
              <button
                key={i}
                onClick={() => toggleCircle2(i)}
                className=" h-[24px] flex items-center justify-center border border-black bg-white"
              >
                <div
                  className={`w-[15px] h-[15px] border border-black rounded-full 
                  ${active ? "bg-black" : "bg-white"}`}
                ></div>
              </button>
            ))}
          </div>
        </div>
        <span className="h-[25px] rounded-md mt-2 w-full p-1 border border-black flex text-center justify-center items-center">
          訪問履歴
        </span>
        <div className="mt-2">
          <span className={`${label} font-bold  w-full`}>未調査区分</span>
          {Array.from({ length: 5 }).map((_, i) => (
            <SurveyRow
              key={i}
              onOpenModal={() => {
                setModalF2Open(true);
                setTitleModal("備考");
              }}
            />
          ))}
          <div className="flex flex-row mt-2">
            <span className="w-[15%] flex items-center justify-center border border-black bg-[#D9D9D9]">
              周知
            </span>

            <button
              onClick={handleClick2}
              className="w-[28%] border border-black"
            >
              {options[index2]}
            </button>

            <button
              onClick={() => {
                setModalF2Open(true);
                setTitleModal("周知内容");
              }}
              disabled={options[index2] !== "済"}
              className={`w-[22px] h-[22px] flex items-center justify-center border border-gray-500
                ${
                  options[index2] === "済"
                    ? "bg-white cursor-pointer"
                    : "bg-gray-200 cursor-not-allowed"
                }`}
            >
              <DownArrowIcon />
            </button>

            <span className="w-[15%] flex items-center justify-center border border-black bg-[#D9D9D9]">
              周知
            </span>

            <button
              onClick={handleClick}
              className="w-[28%] border border-black"
            >
              {options[index]}
            </button>

            <button
              onClick={() => ""}
              disabled={options[index] !== "済"}
              className={`w-[22px] h-[22px] flex items-center justify-center border border-gray-500
                ${
                  options[index] === "済"
                    ? "bg-white cursor-pointer"
                    : "bg-gray-200 cursor-not-allowed"
                }`}
            >
              <DownArrowIcon />
            </button>
          </div>
        </div>
        <div className="mt-2">
          <span className={`${label} font-bold  w-full`}>交換部品</span>
          <div className="flex flex-row">
            <button
              className={`${label} !w-1/3`}
              onClick={() => {
                setModalF2Open(true);
                setTitleModal("部品マスター検索");
              }}
            >
              商品名
            </button>
            <span className={`${label} !w-1/3`}>数量</span>
            <span className={`${label} !w-1/3`}>商品名</span>
          </div>
          <div className="w-full border border-black">
            <div className="max-h-[70px] overflow-y-scroll">
              <table className="w-full border-collapse">
                <tbody>
                  {rows.map((row) => (
                    <tr key={row} className="border border-black">
                      <td className="border border-black text-center w-1/3"></td>
                      <td className="border border-black text-center w-1/3">
                        0.00
                      </td>
                      <td className="border border-black text-center w-1/3">
                        0
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex flex-row">
            <span className={`${label} !w-3/5`}>消費設備調査</span>
            <button
              onClick={handleClick3}
              className="w-2/5 border border-black"
            >
              {options1[index3]}
            </button>
          </div>
          <div className=" w-full flex flex-row">
            <span
              className={`w-[10%] h-[80px] bg-[#D9D9D9] flex justify-center items-center text-center border border-black`}
            >
              通知事項
            </span>
            <div className="flex flex-col w-[90%]">
              <input
                value={notificationLabel}
                className={`h-[40px] border border-black text-center transition-all duration-300 ${
                  notificationValue === "0" ? "w-[20%]" : "w-full"
                }`}
              />

              <select
                onChange={handleNotificationChange}
                disabled={options1[index3] !== "否"}
                className={`h-[40px] border  w-[20%] border-black text-center  ${
                  options1[index3] === "否"
                    ? "bg-white cursor-pointer"
                    : "bg-gray-200 cursor-not-allowed"
                }`}
              >
                {notificationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className=" w-full flex flex-row">
            <span
              className={`w-[10%] h-[80px] bg-[#D9D9D9] flex justify-center items-center text-center border border-black`}
            >
              要改善
            </span>
            <div className="flex flex-col w-[90%]">
              <input
                value={notificationLabel1}
                className={`h-[40px] border border-black text-center transition-all duration-300 ${
                  notificationValue1 === "0" ? "w-[20%]" : "w-full"
                }`}
              />

              <select
                onChange={handleNotificationChange1}
                disabled={options1[index3] !== "否"}
                className={`h-[40px] border  w-[20%] border-black text-center  ${
                  options1[index3] === "否"
                    ? "bg-white cursor-pointer"
                    : "bg-gray-200 cursor-not-allowed"
                }`}
              >
                {notificationOptions1.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-row relative">
            <span className={`${label} !h-[30px] w-[40%]`}>再調査予定日</span>

            <div className="w-[70%] ml-auto">
              <DatePickerInput />
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex flex-row">
            <span className={`${label} !w-3/5`}>供給設備点検</span>
            <button
              onClick={handleClick4}
              className="w-2/5 border border-black"
            >
              {options2[index4]}
            </button>
          </div>
          <div className=" w-full flex flex-row">
            <span
              className={`w-[10%] h-[80px] bg-[#D9D9D9] flex justify-center items-center text-center border border-black`}
            >
              通知事項
            </span>
            <div className="flex flex-col w-[90%]">
              <input
                value={notificationLabel2}
                className={`h-[40px] border border-black text-center transition-all duration-300 ${
                  notificationValue2 === "0" ? "w-[20%]" : "w-full"
                }`}
              />

              <select
                onChange={handleNotificationChange2}
                disabled={options2[index4] !== "否"}
                className={`h-[40px] border  w-[20%] border-black text-center  ${
                  options2[index4] === "否"
                    ? "bg-white cursor-pointer"
                    : "bg-gray-200 cursor-not-allowed"
                }`}
              >
                {notificationOptions2.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className=" w-full flex flex-row">
            <span
              className={`w-[10%] h-[80px] bg-[#D9D9D9] flex justify-center items-center text-center border border-black`}
            >
              要改善
            </span>
            <div className="flex flex-col w-[90%]">
              <input
                value={notificationLabel3}
                className={`h-[40px] border border-black text-center transition-all duration-300 ${
                  notificationValue3 === "0" ? "w-[20%]" : "w-full"
                }`}
              />

              <select
                onChange={handleNotificationChange3}
                disabled={options2[index4] !== "否"}
                className={`h-[40px] border  w-[20%] border-black text-center  ${
                  options2[index4] === "否"
                    ? "bg-white cursor-pointer"
                    : "bg-gray-200 cursor-not-allowed"
                }`}
              >
                {notificationOptions3.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-row relative">
            <span className={`${label} !h-[30px] w-[40%]`}>連絡済相手</span>
            <input className="w-[60%] border border-black"></input>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-2">
          <button className="w-1/4 border border-black rounded-lg">地図</button>
          <button className="w-1/4 border border-black rounded-lg">図面</button>
          <button className="w-1/4 border border-black rounded-lg">写真</button>
        </div>
        <div className="flex flex-row justify-between mt-2">
          <button
            onClick={() => setIsCustomerModalOpen(true)}
            className="w-2/5 border border-black bg-[#D9D9D9]"
          >
            保存（S)
          </button>
          <button
            onClick={() => setIsCustomerModalOpen(true)}
            className="w-2/5 border border-black bg-[#D9D9D9]"
          >
            閉じる（C)
          </button>
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
