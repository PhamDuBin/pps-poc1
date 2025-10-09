import { useState } from "react";
import { labelColor } from "../../../constants/colors";
import { symbols } from "../../../constants/input_inspection_result";

const TestMeasurement = () => {
  const label = `w-1/6 flex text-center justify-center ${labelColor} border border-black h-6`;
  const input = `w-1/12 flex text-center justify-center hover:bg-[#E5F7E5] border border-black h-6 border-gray-600`;
  const buttonBase = `w-[30px] border border-black h-6 border-gray-600`;

  const [pressureChecked, setPressureChecked] = useState(false);
  const [airtightChecked, setAirtightChecked] = useState(false);
  const [leakageChecked, setLeakageChecked] = useState(false);

  const [pressureButtonStates, setPressureButtonStates] = useState([0, 0, 0]);
  const [airtightButtonStates, setAirtightButtonStates] = useState([0, 0]);
  const [leakageButtonStates, setLeakageButtonStates] = useState([0, 0]);

  const getButtonColor = (val: number) => {
    if (val === 2) return "bg-red-500";
    if (val === 3) return "bg-green-600";
    return "";
  };

  const handleNumericSelectKeyDown = (
    e: React.KeyboardEvent<HTMLSelectElement>
  ) => {
    const num = parseInt(e.key, 10);
    if (!isNaN(num)) {
      e.preventDefault();
      const options = e.currentTarget.options;
      for (let i = 0; i < options.length; i++) {
        if (options[i].text.startsWith(num.toString() + ":")) {
          e.currentTarget.value = options[i].value;
          e.currentTarget.dispatchEvent(new Event("change", { bubbles: true }));
          break;
        }
      }
    }
  };

  const handlePressureButtonClick = (index: number) => {
    setPressureButtonStates((prev) => {
      const newStates = [...prev];
      newStates[index] = (newStates[index] + 1) % symbols.length;
      return newStates;
    });
  };

  const handleAirtightButtonClick = (index: number) => {
    setAirtightButtonStates((prev) => {
      const newStates = [...prev];
      newStates[index] = (newStates[index] + 1) % symbols.length;
      return newStates;
    });
  };

  const handleLeakageButtonClick = (index: number) => {
    setLeakageButtonStates((prev) => {
      const newStates = [...prev];
      newStates[index] = (newStates[index] + 1) % symbols.length;
      return newStates;
    });
  };

  return (
    <>
      <div className={`p-1 flex flex-row text-[10px] w-full`}>
        <select className={`border border-black w-1/12`}>
          <option>供給点検</option>
          <option>消費調査</option>
          <option>供給消費</option>
        </select>

        <div className="flex items-center space-x-4 mx-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="test-type"
              defaultChecked
              className="mr-1"
            />
            測定
          </label>
          <label className="flex items-center">
            <input type="radio" name="test-type" className="mr-1" /> 代替
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-1"
              checked={pressureChecked}
              onChange={(e) => setPressureChecked(e.target.checked)}
            />
            圧力検査
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-1"
              checked={airtightChecked}
              onChange={(e) => setAirtightChecked(e.target.checked)}
            />
            気密試験
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-1"
              checked={leakageChecked}
              onChange={(e) => setLeakageChecked(e.target.checked)}
            />
            漏洩試験
          </label>
        </div>
      </div>

      {/* row 1: 圧力検査 */}
      <div className="flex flex-row text-[10px]">
        <span className={`${label} font-bold`}>圧力検査</span>
        <span className={label}>調整圧力</span>

        {pressureChecked ? (
          <input className={input} placeholder="00.00" />
        ) : (
          <span className={input}></span>
        )}

        <button
          className={`${buttonBase} ${getButtonColor(
            pressureButtonStates[0]
          )} ${
            !pressureChecked
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-blue-100"
          }`}
          disabled={!pressureChecked}
          onClick={() => handlePressureButtonClick(0)}
        >
          {pressureChecked ? symbols[pressureButtonStates[0]] : ""}
        </button>

        <span className={label}>入口圧力</span>
        {pressureChecked ? (
          <input className={input} placeholder="00.00" />
        ) : (
          <span className={input}></span>
        )}

        <button
          className={`${buttonBase} ${getButtonColor(
            pressureButtonStates[1]
          )} ${
            !pressureChecked
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-blue-100"
          }`}
          disabled={!pressureChecked}
          onClick={() => handlePressureButtonClick(1)}
        >
          {pressureChecked ? symbols[pressureButtonStates[1]] : ""}
        </button>

        <span className={label}>圧力損失</span>
        {pressureChecked ? (
          <input className={input} placeholder="00.00" />
        ) : (
          <span className={input}></span>
        )}

        <input className={input} placeholder="XXX003" readOnly />

        <span className={label}>閉塞圧力</span>
        {pressureChecked ? (
          <input className={input} placeholder="00.00" />
        ) : (
          <span className={input}></span>
        )}

        <button
          className={`${buttonBase} ${getButtonColor(
            pressureButtonStates[2]
          )} ${
            !pressureChecked
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-blue-100"
          }`}
          disabled={!pressureChecked}
          onClick={() => handlePressureButtonClick(2)}
        >
          {pressureChecked ? symbols[pressureButtonStates[2]] : ""}
        </button>
      </div>

      {/* row 2: 気密試験 */}
      <div className="flex flex-row text-[10px]">
        <span className={`${label} font-bold`}>気密試験</span>
        <span className={label}>初期圧力</span>

        {airtightChecked ? (
          <input className={input} placeholder="00.00" />
        ) : (
          <span className={input}></span>
        )}

        <span className={label}>終了圧力</span>
        {airtightChecked ? (
          <input className={input} placeholder="00.00" />
        ) : (
          <span className={input}></span>
        )}

        <span className={label}>補正圧力</span>
        {airtightChecked ? (
          <input className={input} placeholder="00.00" />
        ) : (
          <span className={input}></span>
        )}

        <span className={label}>保持時間</span>
        {airtightChecked ? (
          <input className={`${input} !w-[30px]`} placeholder="0" />
        ) : (
          <input className={`${input} !w-[30px]`} placeholder="" disabled />
        )}

        <span className={label}>点検方法</span>
        {airtightChecked ? (
          <select
            className={`$ w-1/6 text-center border border-black h-6`}
            onKeyDown={handleNumericSelectKeyDown}
          >
            <option>0:空白</option>
            <option>1:掘出調査</option>
            <option>2:気密試験</option>
            <option>3:漏洩試験</option>
            <option>4:目視</option>
            <option>5:ボーリング調査</option>
            <option>6:検知装置</option>
            <option>7:その他</option>
          </select>
        ) : (
          <select
            disabled
            className={`w-1/6 border border-gray-300 h-6 `}
          ></select>
        )}

        <button
          className={`${buttonBase} ${getButtonColor(
            airtightButtonStates[1]
          )} ${
            !airtightChecked
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-blue-100"
          }`}
          disabled={!airtightChecked}
          onClick={() => handleAirtightButtonClick(1)}
        >
          {airtightChecked ? symbols[airtightButtonStates[1]] : ""}
        </button>
      </div>

      {/* row 3: 漏洩試験 */}
      <div className="flex flex-row text-[10px]">
        <span className={`${label} font-bold`}>漏洩試験</span>
        <span className={label}>初期圧力</span>

        {leakageChecked ? (
          <input className={input} placeholder="00.00" />
        ) : (
          <span className={input}></span>
        )}

        <span className={label}>終了圧力</span>
        {leakageChecked ? (
          <input className={input} placeholder="00.00" />
        ) : (
          <span className={input}></span>
        )}

        <span className={label}>補正圧力</span>
        {leakageChecked ? (
          <input className={input} placeholder="00.00" />
        ) : (
          <span className={input}></span>
        )}

        <span className={label}>保持時間</span>
        {leakageChecked ? (
          <input className={`${input} !w-[30px]`} placeholder="0" />
        ) : (
          <input className={`${input} !w-[30px]`} placeholder="" disabled />
        )}

        <span className={label}>点検方法</span>
        {leakageChecked ? (
          <select
            className={` w-1/6 text-center border border-black h-6`}
            onKeyDown={handleNumericSelectKeyDown}
          >
            <option>0:空白</option>
            <option>1:掘出調査</option>
            <option>2:気密試験</option>
            <option>3:漏洩試験</option>
            <option>4:目視</option>
            <option>5:ボーリング調査</option>
            <option>6:検知装置</option>
            <option>7:その他</option>
          </select>
        ) : (
          <select
            disabled
            className={`w-1/6 border border-gray-300 h-6`}
          ></select>
        )}

        <button
          className={`${buttonBase} ${getButtonColor(leakageButtonStates[1])} ${
            !leakageChecked
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-blue-100"
          }`}
          disabled={!leakageChecked}
          onClick={() => handleLeakageButtonClick(1)}
        >
          {leakageChecked ? symbols[leakageButtonStates[1]] : ""}
        </button>
      </div>
    </>
  );
};

export default TestMeasurement;
