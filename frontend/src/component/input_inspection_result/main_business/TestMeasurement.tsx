import { useState } from "react";
import { labelColor } from "../../../constants/colors";
import { symbols } from "../../../constants/input_inspection_result";
import { Select, Checkbox, Radio } from "antd";
import { HalfWidthNumberInput } from "../../JapaneseInputs";

const { Option } = Select;

const topOptions = ["供給点検", "消費調査", "供給消費"];
const methodOptions = [
  "0:空白",
  "1:掘出調査",
  "2:気密試験",
  "3:漏洩試験",
  "4:目視",
  "5:ボーリング調査",
  "6:検知装置",
  "7:その他",
];

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

  const [topSelectVal, setTopSelectVal] = useState(topOptions[0]);
  const [airtightMethodVal, setAirtightMethodVal] = useState(methodOptions[0]);
  const [leakageMethodVal, setLeakageMethodVal] = useState(methodOptions[0]);

  const getButtonColor = (val: number) => {
    if (val === 2) return "bg-red-500";
    if (val === 3) return "bg-green-600";
    return "";
  };

  const handleKeyDownForSelect = (
    e: React.KeyboardEvent,
    optionsList: string[],
    setValue: (val: string) => void
  ) => {
    const num = parseInt(e.key, 10);
    if (!isNaN(num) && num >= 0 && num < optionsList.length) {
      e.preventDefault();
      setValue(optionsList[num]);
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
        {/* Top Select */}
        <Select
          className={`w-1/12`}
          value={topSelectVal}
          onChange={setTopSelectVal}
          onKeyDown={(e) =>
            handleKeyDownForSelect(e, topOptions, setTopSelectVal)
          }
        >
          {topOptions.map((opt) => (
            <Option key={opt} value={opt}>
              {opt}
            </Option>
          ))}
        </Select>

        <div className="flex items-center space-x-4 mx-3">
          <Radio.Group defaultValue={1}>
            <Radio value={1}>測定</Radio>
            <Radio value={2}>代替</Radio>
          </Radio.Group>
        </div>

        <div className="flex items-center space-x-4">
          <Checkbox
            checked={pressureChecked}
            onChange={(e) => setPressureChecked(e.target.checked)}
          >
            圧力検査
          </Checkbox>

          <Checkbox
            checked={airtightChecked}
            onChange={(e) => setAirtightChecked(e.target.checked)}
          >
            気密試験
          </Checkbox>

          <Checkbox
            checked={leakageChecked}
            onChange={(e) => setLeakageChecked(e.target.checked)}
          >
            漏洩試験
          </Checkbox>
        </div>
      </div>

      {/* row 1: 圧力検査 */}
      <div className="flex flex-row text-[10px]">
        <span className={`${label} font-bold`}>圧力検査</span>
        <span className={label}>調整圧力</span>

        {pressureChecked ? (
          <HalfWidthNumberInput
            allowDecimal={true}
            className={input}
            placeholder="00.00"
          />
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
          <HalfWidthNumberInput
            allowDecimal={true}
            className={input}
            placeholder="00.00"
          />
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
          <HalfWidthNumberInput
            allowDecimal={true}
            className={input}
            placeholder="00.00"
          />
        ) : (
          <span className={input}></span>
        )}

        <HalfWidthNumberInput className={input} placeholder="XXX003" readOnly />

        <span className={label}>閉塞圧力</span>
        {pressureChecked ? (
          <HalfWidthNumberInput
            allowDecimal={true}
            className={input}
            placeholder="00.00"
          />
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
          <HalfWidthNumberInput
            allowDecimal={true}
            className={input}
            placeholder="00.00"
          />
        ) : (
          <span className={input}></span>
        )}

        <span className={label}>終了圧力</span>
        {airtightChecked ? (
          <HalfWidthNumberInput
            allowDecimal={true}
            className={input}
            placeholder="00.00"
          />
        ) : (
          <span className={input}></span>
        )}

        <span className={label}>補正圧力</span>
        {airtightChecked ? (
          <HalfWidthNumberInput
            allowDecimal={true}
            className={input}
            placeholder="00.00"
          />
        ) : (
          <span className={input}></span>
        )}

        <span className={label}>保持時間</span>
        {airtightChecked ? (
          <HalfWidthNumberInput
            className={`${input} !w-[30px]`}
            placeholder="0"
          />
        ) : (
          <HalfWidthNumberInput
            className={`${input} !w-[30px]`}
            placeholder=""
            disabled
          />
        )}

        <span className={label}>点検方法</span>
        {airtightChecked ? (
          <Select
            className={`w-1/6 text-center border border-black h-6 custom-select-center`}
            value={airtightMethodVal}
            onChange={setAirtightMethodVal}
            onKeyDown={(e) =>
              handleKeyDownForSelect(e, methodOptions, setAirtightMethodVal)
            }
          >
            {methodOptions.map((opt) => (
              <Option key={opt} value={opt}>
                {opt}
              </Option>
            ))}
          </Select>
        ) : (
          <Select
            disabled
            className={`w-1/6 border border-gray-300 h-6`}
          ></Select>
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
          <HalfWidthNumberInput
            allowDecimal={true}
            className={input}
            placeholder="00.00"
          />
        ) : (
          <span className={input}></span>
        )}

        <span className={label}>終了圧力</span>
        {leakageChecked ? (
          <HalfWidthNumberInput
            allowDecimal={true}
            className={input}
            placeholder="00.00"
          />
        ) : (
          <span className={input}></span>
        )}

        <span className={label}>補正圧力</span>
        {leakageChecked ? (
          <HalfWidthNumberInput
            allowDecimal={true}
            className={input}
            placeholder="00.00"
          />
        ) : (
          <span className={input}></span>
        )}

        <span className={label}>保持時間</span>
        {leakageChecked ? (
          <HalfWidthNumberInput
            className={`${input} !w-[30px]`}
            placeholder="0"
          />
        ) : (
          <HalfWidthNumberInput
            className={`${input} !w-[30px]`}
            placeholder=""
            disabled
          />
        )}

        <span className={label}>点検方法</span>
        {leakageChecked ? (
          <Select
            className={`w-1/6 text-center border border-black h-6 custom-select-center`}
            value={leakageMethodVal}
            onChange={setLeakageMethodVal}
            onKeyDown={(e) =>
              handleKeyDownForSelect(e, methodOptions, setLeakageMethodVal)
            }
          >
            {methodOptions.map((opt) => (
              <Option key={opt} value={opt}>
                {opt}
              </Option>
            ))}
          </Select>
        ) : (
          <Select
            disabled
            className={`w-1/6 border border-gray-300 h-6`}
          ></Select>
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
