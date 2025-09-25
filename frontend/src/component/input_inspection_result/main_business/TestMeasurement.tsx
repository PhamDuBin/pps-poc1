import { useState } from "react";
import { labelColor, inputColor } from "../../../constants/colors";

const TestMeasurement = () => {
  const label = `w-1/6 flex text-center justify-center ${labelColor} border border-black h-6`;
  const input = `w-1/12 flex text-center justify-center ${inputColor} border border-black h-6 border-gray-600`;
  const button = `w-[30px] border border-black h-6 border-gray-600 ${inputColor}`;

  // State quản lý checkbox
  const [pressureChecked, setPressureChecked] = useState(false);
  const [airtightChecked, setAirtightChecked] = useState(false);
  const [leakageChecked, setLeakageChecked] = useState(false);

  // State quản lý riêng cho nhiều nút (row 1 có 3 nút, row 2 có 2 nút)
  const [pressureButtonStates, setPressureButtonStates] = useState([0, 0, 0]);
  const [airtightButtonStates, setAirtightButtonStates] = useState([0, 0]);
  const [leakageButtonStates, setLeakageButtonStates] = useState([0, 0]);

  const symbols = ["", "◯", "✕", "✓"];

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
      {/* Header */}
      <div className={`p-1 flex flex-row text-[10px] w-full `}>
        <select className={`border border-black w-1/12 ${inputColor}`}>
          <option>供給点検</option>
          <option>消費調査</option>
          <option>供給消費</option>
        </select>

        {/* radio */}
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

        {/* checkbox */}
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
            />{" "}
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
          className={`${button} ${
            !pressureChecked ? `${inputColor} cursor-not-allowed` : ""
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
          className={`${button} ${
            !pressureChecked ? `${inputColor} cursor-not-allowed` : ""
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
          className={`${button} ${
            !pressureChecked ? `${inputColor} cursor-not-allowed` : ""
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
          <span className={`${input} !w-[30px]`}></span>
        )}

        <span className={label}>点検方法</span>
        {airtightChecked ? (
          <select
            className={`${inputColor} w-1/6 flex text-center justify-center border border-black h-6`}
          >
            <option>空白</option>
            <option>掘出調査</option>
            <option>気密試験</option>
            <option>漏洩試験</option>
            <option>目視</option>
            <option>ボーリング調査</option>
            <option>検知装置</option>
            <option>その他</option>
          </select>
        ) : (
          <select
            disabled
            className={`w-1/6 border border-gray-300 h-6 ${inputColor}`}
          ></select>
        )}

        <button
          className={`${button} ${
            !airtightChecked ? `${inputColor} cursor-not-allowed` : ""
          }`}
          disabled={!airtightChecked}
          onClick={() => handleAirtightButtonClick(1)}
        >
          {airtightChecked ? symbols[airtightButtonStates[1]] : ""}
        </button>
      </div>
      {/* row 3: 漏洩試験 */}
      <div className="flex flex-row text-[10px]">
        <span className={`${label} font-bold`}>気密試験</span>
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
          <span className={`${input} !w-[30px]`}></span>
        )}

        <span className={label}>点検方法</span>
        {leakageChecked ? (
          <select
            className={`${inputColor} w-1/6 flex text-center justify-center border border-black h-6`}
          >
            <option>空白</option>
            <option>掘出調査</option>
            <option>気密試験</option>
            <option>漏洩試験</option>
            <option>目視</option>
            <option>ボーリング調査</option>
            <option>検知装置</option>
            <option>その他</option>
          </select>
        ) : (
          <select
            disabled
            className={`w-1/6 border border-gray-300 h-6 ${inputColor}`}
          ></select>
        )}

        <button
          className={`${button} ${
            !leakageChecked ? `${inputColor} cursor-not-allowed` : ""
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
