import { DownArrowIcon } from "../transaction_information/LeftPanel";
import { useState, KeyboardEvent, useRef, useEffect } from "react";
import PersonnelSearchModal from "./PersonnelSearchModal";
import { inputColor, labelColor } from "../../constants/colors";
import { CustomerSearchModal } from "./CustomerSearchModal";

type PersonnelData = {
  name: string;
  kanaName: string;
};

const TopBar = () => {
  const [roleValue, setRoleValue] = useState("0");
  const [witnessName, setWitnessName] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMamager, setShowManager] = useState(false);
  const [selectedPersonnel, setSelectedPersonnel] =
    useState<PersonnelData | null>(null);
  const [managerCode, setManagerCode] = useState([""]);

  const firstInputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedText = e.target.options[e.target.selectedIndex].text;

    setRoleValue(selectedValue);

    if (selectedValue !== "0") {
      setWitnessName(selectedText);
    } else {
      setWitnessName("");
    }
  };
  const label = `${labelColor} w-[6%] flex justify-center items-center mr-2`;
  const input = `${inputColor} flex justify-center items-center mx-4`;

  const handleShowManager = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && managerCode) {
      e.preventDefault();
      setShowManager(true);
      if (btnRef.current) {
        btnRef.current.focus();
      }
    }
  };
  const handleSelectPersonnel = (personnel: PersonnelData) => {
    if (personnel.name && personnel.kanaName) {
      setSelectedPersonnel(personnel);
    }
    setIsModalOpen(false);
    if (btnRef.current) {
      btnRef.current.focus();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (firstInputRef.current && !isSearchModalOpen) {
        firstInputRef.current.focus();
      }
    }, 100);
  }, [isSearchModalOpen]);

  return (
    <>
      <div className="w-full border-b border-black font-bold ">
        <div className="p-2 flex flex-row">
          <span className={label}>コード</span>
          {!isSearchModalOpen ? (
            <p className={input}>0001-003-000001-111</p>
          ) : (
            <p className={input}></p>
          )}

          <span className={label}>氏名</span>

          {!isSearchModalOpen ? (
            <p className={input}>鈴木　カンクロウ</p>
          ) : (
            <p className={input}></p>
          )}

          <span className={label}>担当者</span>
          {selectedPersonnel ? (
            <div className="flex flex-col text-center justify-center text-sm mx-2">
              <p className={`${input} !mx-0`}>
                {selectedPersonnel.name} {selectedPersonnel.kanaName}
              </p>
            </div>
          ) : showMamager ? (
            <p className={`${input} !mx-0`}>佐々木　担当タロウ</p>
          ) : (
            <input
              ref={firstInputRef}
              onChange={(e) => setManagerCode([e.target.value])}
              onKeyDown={handleShowManager}
              className={`${inputColor} border border-black w-[10%]`}
            />
          )}
          <button
            ref={btnRef}
            onClick={() => setIsModalOpen(true)}
            className=" w-[20px] h-[20px] mt-1 inset-y-0 right-0 flex items-center px-1 bg-white border border-gray-500 cursor-pointer mr-5"
          >
            <DownArrowIcon />
          </button>
          <select
            className={`${inputColor} border border-black rounded-lg mr-4 shadow-medium`}
            value={roleValue}
            onChange={handleRoleChange}
          >
            <option value="0">立会人</option>
            <option value="1">世帯主</option>
            <option value="2">息子</option>
            <option value="3">娘</option>
            <option value="4">お婆さん</option>
            <option value="5">お爺さん</option>
            <option value="6">大家</option>
            <option value="7">管理人</option>
            <option value="8">大家</option>
          </select>
          <input
            value={witnessName}
            onChange={(e) => setWitnessName(e.target.value)}
            className={`${inputColor} border border-black w-[10%]`}
          ></input>
        </div>
      </div>

      {isModalOpen && (
        <PersonnelSearchModal onSelectAndClose={handleSelectPersonnel} />
      )}
      {isSearchModalOpen && (
        <CustomerSearchModal onClose={() => setIsSearchModalOpen(false)} />
      )}
    </>
  );
};

export default TopBar;
