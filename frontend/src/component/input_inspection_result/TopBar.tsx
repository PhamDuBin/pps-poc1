import { useState, KeyboardEvent, useRef, useEffect } from "react";
import PersonnelSearchModal from "./PersonnelSearchModal";
import { inputColor, labelColor } from "../../constants/colors";
import { CustomerSearchModal } from "./CustomerSearchModal";
import { handleNumericSelectKeyDown } from "../../utils/InputHandlers";

type PersonnelData = {
  name: string;
  kanaName: string;
};

const TopBar = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMamager, setShowManager] = useState(false);
  const [selectedPersonnel, setSelectedPersonnel] =
    useState<PersonnelData | null>(null);
  const [managerCode, setManagerCode] = useState([""]);
  const [value, setValue] = useState("0");

  const firstInputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

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
            className=" w-[20px] h-[20px] mt-1 flex items-center justify-center px-1 bg-white border border-gray-500 cursor-pointer mr-5"
          >
            ▼
          </button>
          <span className={label}>立会人</span>
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => handleNumericSelectKeyDown(e, setValue)}
            className="border border-black rounded-lg mr-4 shadow-medium w-36"
          >
            <option value="0">0:未選択</option>
            <option value="1">1:世帯主</option>
            <option value="2">2:息子</option>
            <option value="3">3:娘</option>
            <option value="4">4:お婆さん</option>
            <option value="5">5:お爺さん</option>
            <option value="6">6:大家</option>
            <option value="7">7:管理人</option>
            <option value="8">8:大家</option>
          </select>
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
