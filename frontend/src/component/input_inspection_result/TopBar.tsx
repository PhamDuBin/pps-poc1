import { DownArrowIcon } from "../transaction_information/LeftPanel";
import { useState } from "react";
const TopBar = () => {
  const [roleValue, setRoleValue] = useState("0");
  const [witnessName, setWitnessName] = useState("");

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
  const label = "bg-[#D9D9D9] w-[6%] flex justify-center items-center mr-2";
  const input = "flex justify-center items-center mx-4";

  return (
    <div className="w-full border-b border-black font-bold ">
      <div className="p-2 flex flex-row">
        <span className={label}>コード</span>
        <p className={input}>0001-003-000001-111</p>
        <span className={label}>氏名</span>
        <p className={input}>鈴木　カンクロウ</p>
        <span className={label}>担当者</span>
        <input
          className="border border-black w-[10%]"
          value={witnessName}
          onChange={(e) => setWitnessName(e.target.value)}
        />
        <button
          onClick={() => {}}
          className=" w-[20px] h-[20px] mt-1 inset-y-0 right-0 flex items-center px-1 bg-white border border-gray-500 cursor-pointer"
        >
          <DownArrowIcon />
        </button>
        <p className={input}>佐々木　担当タロウ</p>
        <select
          className="border border-black rounded-lg mr-4 shadow-medium"
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
        <input className="border border-black w-[10%]"></input>
      </div>
    </div>
  );
};

export default TopBar;
