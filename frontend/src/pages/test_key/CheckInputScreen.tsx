import React, {
  useEffect,
  useState,
  useRef,
  KeyboardEvent as ReactKeyboardEvent,
  ChangeEvent,
} from "react";
import { Card, CardBody, Radio, RadioGroup } from "@nextui-org/react";
import BackButton from "../../component/BackButton";
import CodeInputSelect from "../../component/CodeInputSelect";
import type { InputRef } from "antd";
import {
  HalfWidthKanaInput,
  HalfWidthNumberInput,
  HalfWidthAlphaNumInput,
  KanaFullWidthInput,
} from "../../component/input/JapaneseInputs";

import {
  extractHalfWidthDigits,
  removeAllWhitespace,
  handleFormatting,
} from "../../utils/InputHandlers";

import { useKeyboardNavigation } from "../../hooks/useCheckInputNavigation";
import { type CodeOption } from "../../utils/CheckInputHelpers";

export default function CheckInputScreen() {
  const formRef = useRef<HTMLDivElement>(null);
  const code1InputRef = useRef<InputRef>(null);
  const code2InputRef = useRef<InputRef>(null);
  useKeyboardNavigation(formRef);

  //focus on first input field when page loads
  useEffect(() => {
    const firstInput =
      formRef.current?.querySelector<HTMLElement>(".input-navigable");
    firstInput?.focus();
  }, []);

  // Block browser shortcuts (Ctrl+Z, F-keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl+Z
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        return;
      }

      // Block F-keys (F1-F12)
      if (e.key.startsWith("F") && e.key.length <= 3) {
        const fNumber = parseInt(e.key.substring(1));
        if (!isNaN(fNumber) && fNumber >= 1 && fNumber <= 12) {
          e.preventDefault();
          return;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [radioValue, setRadioValue] = useState<string>("");
  const [radio1Value, setRadio1Value] = useState<string>("");
  const [radio2Value, setRadio2Value] = useState<string>("");
  const [code1, setCode1] = useState<string>("0");
  const [code2, setCode2] = useState<string>("0");
  const [fontSizeClass, setFontSizeClass] = useState<string>("text-base");
  const [customerCode, setCustomerCode] = useState<string[]>(["", "", "", ""]);

  // Check if all customer code fields are filled
  const isAllCustomerCodeFilled = customerCode.every(
    (code) => code && code.length > 0
  );
  const shouldDisableFields = !isAllCustomerCodeFilled;

  const codeOptions: CodeOption[] = [
    { code: "0", label: "Zero" },
    { code: "1", label: "One" },
    { code: "2", label: "Two" },
    { code: "3", label: "Three" },
    { code: "", label: "Invalid" },
  ];

  // --- MODIFIED START: Đã xóa các hàm 'processHalfWidthKatakana' và 'processHalfWidthAlphaNumeric'
  // và các state 'hasConvertedKana', 'hasConvertedAlphaNum', 'isComposingJP', 'isComposingAlphaNum'
  // vì logic này đã được chuyển vào các component input mới.
  // --- MODIFIED END ---

  const btnBaseStyle =
    "font-semibold py-1 px-4 rounded-lg transition-all duration-200 shadow-md";
  const btnActiveStyle = "bg-blue-600 text-white scale-110";
  const btnInactiveStyle = "bg-white text-blue-600 hover:bg-blue-100";
  const className_label =
    "flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-3 whitespace-nowrap overflow-hidden text-ellipsis";
  const className_input_text =
    "h-8 border-2 border-gray-300 rounded-lg shadow-md p-2 focus:border-gray-300 focus:shadow-lg focus:outline-none transition-all";

  return (
    <div
      ref={formRef}
      className={`px-6 pb-6 pt-12 bg-[#f0f0f0] min-h-screen ${fontSizeClass} check-input-screen`}
    >
      <style>{`
        .check-input-screen input:focus,
        .check-input-screen textarea:focus,
        .check-input-screen select:focus {
          background-color: #ffffcc !important;
          outline: 2px solid #4a90e2;
        }
      `}</style>
      <BackButton />
      <div className="flex flex-row justify-between items-center mb-2">
        <h1>テストフィールド1</h1>
        <div className="flex items-center gap-3">
          <button
            disabled={shouldDisableFields}
            onClick={() => setFontSizeClass("text-xs")}
            className={`${btnBaseStyle} ${
              fontSizeClass === "text-xs" ? btnActiveStyle : btnInactiveStyle
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Small
          </button>
          <button
            disabled={shouldDisableFields}
            onClick={() => setFontSizeClass("text-base")}
            className={`${btnBaseStyle} ${
              fontSizeClass === "text-base" ? btnActiveStyle : btnInactiveStyle
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Medium
          </button>
          <button
            disabled={shouldDisableFields}
            onClick={() => setFontSizeClass("text-2xl")}
            className={`${btnBaseStyle} ${
              fontSizeClass === "text-2xl" ? btnActiveStyle : btnInactiveStyle
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Large
          </button>
        </div>
      </div>

      <Card className="border border-gray-400 bg-white shadow-md">
        <CardBody className="space-y-4">
          <div className="px-4 space-y-4">
            <div className="flex items-center gap-2 p-2">
              <label className={`${className_label}`}>顧客コード</label>
              {[...Array(4)].map((_, i) => (
                <input
                  key={i}
                  value={customerCode[i]}
                  maxLength={4}
                  disabled={i > 0 && !customerCode[i - 1]}
                  onChange={(e) => {
                    // *** MODIFIED START: Cho phép cả số half-width và full-width ***
                    const value = e.target.value.replace(/[^0-9０-９]/g, "");
                    // *** MODIFIED END ***

                    const newCode = [...customerCode];
                    newCode[i] = value;
                    setCustomerCode(newCode);
                  }}
                  onBlur={(e) => {
                    // *** MODIFIED START: Chuyển sang half-width TRƯỚC khi padding ***
                    // 1. Lấy giá trị và chuyển tất cả sang half-width
                    const halfWidthValue = extractHalfWidthDigits(
                      e.target.value
                    );

                    // 2. Thực hiện padding nếu có giá trị
                    if (halfWidthValue && halfWidthValue.length > 0) {
                      const newCode = [...customerCode];
                      newCode[i] = halfWidthValue.padStart(4, "0");
                      setCustomerCode(newCode);
                    } else {
                      // Nếu người dùng xóa trống, hãy đảm bảo nó rỗng
                      const newCode = [...customerCode];
                      newCode[i] = "";
                      setCustomerCode(newCode);
                    }
                    // *** MODIFIED END ***
                  }}
                  onKeyDown={(e) => {
                    if (e.nativeEvent.isComposing) {
                      return;
                    }
                    // For first input (i=0), if empty and Tab/Enter/ArrowDown, go to 氏名
                    if (i === 0 && !customerCode[i]) {
                      if (
                        ["Tab", "Enter", "ArrowDown"].includes(e.key) &&
                        !e.shiftKey
                      ) {
                        e.preventDefault();
                        // Jump to 氏名 input
                        const nameInput =
                          formRef.current?.querySelector<HTMLInputElement>(
                            ".input-to-radio"
                          );
                        if (nameInput) {
                          nameInput.focus();
                        }
                        return;
                      }
                    }

                    // Skip navigation for disabled inputs
                    if (i > 0 && !customerCode[i - 1]) {
                      if (
                        ["Tab", "Enter", "ArrowDown"].includes(e.key) &&
                        !e.shiftKey
                      ) {
                        e.preventDefault();
                        // Jump to 氏名 input
                        const nameInput =
                          formRef.current?.querySelector<HTMLInputElement>(
                            ".input-to-radio"
                          );
                        if (nameInput) {
                          nameInput.focus();
                        }
                      }
                    }
                  }}
                  className="w-20 h-8 border-2 border-gray-300 rounded-lg shadow-md p-2 focus:border-gray-300 focus:shadow-lg focus:outline-none transition-all input-customer-digit input-navigable disabled:bg-gray-200 disabled:cursor-not-allowed"
                />
              ))}
            </div>

            <div className="flex items-center gap-5 p-2">
              <label className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-10 whitespace-nowrap overflow-hidden text-ellipsis">
                氏名
              </label>
              <input
                disabled={shouldDisableFields}
                className="input-free-text input-to-radio input-navigable w-60 h-8 border-2 border-gray-300 rounded-lg shadow-md p-2 disabled:bg-gray-200 disabled:cursor-not-allowed"
              />
              <span className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-8 whitespace-nowrap overflow-hidden text-ellipsis">
                顧客種別
              </span>
              <RadioGroup
                name="radio"
                orientation="horizontal"
                className="items-center gap-6 radio-group"
                value={radioValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setRadioValue(e.target.value)
                }
                isDisabled={shouldDisableFields}
              >
                <div className="flex gap-4">
                  {["法人以外", "法人"].map((v) => (
                    <Radio
                      key={v}
                      value={v}
                      className="flex flex-row font-bold radio-customer-type"
                    >
                      <p className="ml-4 whitespace-nowrap">{v}</p>
                    </Radio>
                  ))}
                </div>
              </RadioGroup>
              <span className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-8 whitespace-nowrap overflow-hidden text-ellipsis">
                代表者名
              </span>
              <input
                disabled={shouldDisableFields}
                className="input-free-text after-radio input-navigable w-60 h-8 border-2 border-gray-300 rounded-lg shadow-md p-2 disabled:bg-gray-200 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <div
        className={`gap-6 mt-4 ${
          fontSizeClass === "text-2xl" ? "flex flex-col" : "grid grid-cols-2"
        }`}
      >
        <div className="flex flex-col">
          <h1 className="overflow-hidden mb-2">キーアクションテスト</h1>
          <Card className="border border-gray-400 bg-white shadow-md">
            <CardBody className="space-y-3 w-full">
              <div className="grid grid-cols-4 items-center gap-2 p-4">
                <label className={`${className_label}`}>Text1</label>
                <input
                  disabled={shouldDisableFields}
                  className={`col-span-2 ${className_input_text} input-navigable disabled:bg-gray-200 disabled:cursor-not-allowed`}
                />
                <span></span>

                <label className={`${className_label}`}>Text2</label>
                <input
                  disabled={shouldDisableFields}
                  className={`col-span-2 ${className_input_text} input-navigable disabled:bg-gray-200 disabled:cursor-not-allowed`}
                />
                <span></span>

                <label className={`${className_label}`}>Text3</label>
                <input
                  disabled={shouldDisableFields}
                  className={`col-span-2 ${className_input_text} input-navigable text3-input disabled:bg-gray-200 disabled:cursor-not-allowed`}
                />
                <span></span>

                <label className={`${className_label}`}>Radio1</label>

                <RadioGroup
                  name="radio1"
                  orientation="horizontal"
                  className="flex items-start col-span-2 gap-6 radio1-group"
                  value={radio1Value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRadio1Value(e.target.value)
                  }
                  isDisabled={shouldDisableFields}
                >
                  <div className="flex gap-4">
                    {["A", "B"].map((v) => (
                      <Radio
                        key={v}
                        value={v}
                        className="flex flex-row font-bold radio-customer-type"
                      >
                        <p className="ml-4 whitespace-nowrap">Item {v}</p>
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>
                <span></span>

                <label className={`${className_label}`}>Text4</label>
                <input
                  disabled={shouldDisableFields}
                  className={`col-span-1 ${className_input_text} input-navigable after-radio1 disabled:bg-gray-200 disabled:cursor-not-allowed`}
                />

                <label className={`${className_label}`}>Text5</label>
                <input
                  disabled={shouldDisableFields}
                  data-group="text5"
                  onKeyDown={(e: ReactKeyboardEvent<HTMLInputElement>) => {
                    if (e.nativeEvent.isComposing) {
                      return;
                    }
                    // Handle Shift+Tab to go back to TEXT4 (after-radio1)
                    if (e.key === "Tab" && e.shiftKey) {
                      e.preventDefault();
                      const text4Input =
                        formRef.current?.querySelector<HTMLInputElement>(
                          ".after-radio1"
                        );
                      if (text4Input) {
                        text4Input.focus();
                      }
                      return;
                    }

                    if (["Tab", "Enter", "ArrowDown"].includes(e.key)) {
                      e.preventDefault();
                      const currentInput = e.currentTarget;
                      currentInput.blur();

                      setTimeout(() => {
                        code1InputRef.current?.focus();
                      }, 10);
                    }
                  }}
                  className={`col-span-1 ${className_input_text} input-navigable disabled:bg-gray-200 disabled:cursor-not-allowed`}
                />

                <label className={`${className_label}`}>Code1</label>
                <CodeInputSelect
                  ref={code1InputRef}
                  options={codeOptions}
                  value={code1}
                  onChange={setCode1}
                  resetValue="0"
                  disabled={shouldDisableFields}
                  autoSelectOnFocus={true}
                  onArrowUp={() => {
                    const text5Input =
                      formRef.current?.querySelector<HTMLInputElement>(
                        '[data-group="text5"]'
                      );
                    if (text5Input) {
                      text5Input.focus();
                    }
                  }}
                  onArrowDown={() => code2InputRef.current?.focus()}
                  inputClassName="code-input"
                  selectClassName="code-select"
                />

                <label className={`${className_label}`}>Code2</label>
                <CodeInputSelect
                  ref={code2InputRef}
                  options={codeOptions}
                  value={code2}
                  onChange={setCode2}
                  resetValue="0"
                  disabled={shouldDisableFields}
                  autoSelectOnFocus={true}
                  onArrowUp={() => code1InputRef.current?.focus()}
                  onArrowDown={() => {
                    const text6Input =
                      formRef.current?.querySelector<HTMLInputElement>(
                        '[data-group="text6"]'
                      );
                    if (text6Input) {
                      text6Input.focus();
                    }
                  }}
                  inputClassName=" code-input"
                  selectClassName="code-select"
                />

                <label className={`${className_label}`}>Text6</label>
                <input
                  disabled={shouldDisableFields}
                  data-group="text6"
                  onKeyDown={(e) => {
                    // Handle ArrowUp to go back to Code2
                    if (e.key === "ArrowUp") {
                      e.preventDefault();
                      code2InputRef.current?.focus();
                      return;
                    }
                  }}
                  className={`col-span-1 ${className_input_text} input-navigable input-to-checkbox disabled:bg-gray-200 disabled:cursor-not-allowed`}
                />
                <span></span>
                <span></span>

                <label className={`${className_label}`}>Check Box</label>
                <div className="col-span-3 flex gap-4 flex-row">
                  {["sun", "mon", "tue", "wed", "thu", "fri"].map((day) => (
                    <label key={day} className="flex items-center gap-2">
                      <input
                        disabled={shouldDisableFields}
                        type="checkbox"
                        className="w-6 h-6 accent-blue-600 checkbox-group-item disabled:cursor-not-allowed"
                        tabIndex={0}
                      />
                      <span className="whitespace-nowrap">{day}</span>
                    </label>
                  ))}
                </div>

                <label className={`${className_label}`}>Radio2</label>
                <RadioGroup
                  name="radio2"
                  orientation="horizontal"
                  className="col-span-3 flex gap-4 radio2-group"
                  value={radio2Value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRadio2Value(e.target.value)
                  }
                  isDisabled={shouldDisableFields}
                >
                  <div className="flex gap-4">
                    {["A", "B", "C", "D"].map((v) => (
                      <Radio
                        key={v}
                        value={v}
                        className="flex flex-row font-bold radio-customer-type"
                      >
                        <p className="ml-4 whitespace-nowVrap">Item {v}</p>
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>

                <label className={`${className_label}`}>TextArea</label>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <textarea
                disabled={shouldDisableFields}
                className={`input-free-text textarea-after-radio2 p-3 w-full border-2 input-navigable border-gray-300 rounded-lg shadow-md disabled:bg-gray-200 disabled:cursor-not-allowed`}
                rows={2}
              />
            </CardBody>
          </Card>
        </div>

        <div className="flex flex-col">
          <h1 className="overflow-hidden mb-2">入力制御テスト</h1>
          <Card className="border border-gray-400 bg-white shadow-md">
            <CardBody className="space-y-3 mt-3">
              <div className="grid grid-cols-4 items-center gap-2 px-4">
                <label className={`${className_label}`}>全角＆半角混合</label>
                <input
                  disabled={shouldDisableFields}
                  className={`col-span-2 ${className_input_text} input-navigable disabled:bg-gray-200 disabled:cursor-not-allowed`}
                />
                <span></span>

                <label className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-8 whitespace-nowrap overflow-hidden text-ellipsis">
                  半角カナ
                </label>
                {/* --- MODIFIED START: Thay thế input bằng HalfWidthKanaInput --- */}
                <HalfWidthKanaInput
                  disabled={shouldDisableFields}
                  className={`col-span-2 ${className_input_text} input-navigable halfwidth-kana-input disabled:bg-gray-200 disabled:cursor-not-allowed`}
                  // Tất cả onKeyDown, onBlur, onChange, onComposition... đã bị xóa
                  // vì HalfWidthKanaInput sẽ tự xử lý logic format.
                />
                {/* --- MODIFIED END --- */}

                <span></span>

                <label className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-8 whitespace-nowrap overflow-hidden text-ellipsis">
                  半角数字
                </label>
                {/* --- MODIFIED START: Thay thế input bằng HalfWidthNumberInput --- */}
                <HalfWidthNumberInput
                  disabled={shouldDisableFields}
                  className={`col-span-2 ${className_input_text} input-navigable disabled:bg-gray-200 disabled:cursor-not-allowed`}
                  // onKeyDown, onCompositionEnd đã bị xóa.
                />
                {/* --- MODIFIED END --- */}
                <span></span>

                <label className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-8 whitespace-nowrap overflow-hidden text-ellipsis">
                  半角英数字
                </label>
                {/* --- MODIFIED START: Thay thế input bằng HalfWidthAlphaNumInput --- */}
                <HalfWidthAlphaNumInput
                  disabled={shouldDisableFields}
                  className={`col-span-2 ${className_input_text} input-navigable halfwidth-alphanum-input disabled:bg-gray-200 disabled:cursor-not-allowed`}
                  // Tất cả onKeyDown, onBlur, onChange, onComposition... đã bị xóa
                />
                {/* --- MODIFIED END --- */}
                <span></span>

                <label className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-8 whitespace-nowrap overflow-hidden text-ellipsis">
                  全角
                </label>
                {/* --- MODIFIED START: Thay thế input bằng KanaFullWidthInput --- */}
                <KanaFullWidthInput
                  disabled={shouldDisableFields}
                  className={`col-span-2 ${className_input_text} input-navigable disabled:bg-gray-200 disabled:cursor-not-allowed`}
                  // onKeyDown đã bị xóa.
                />
                {/* --- MODIFIED END --- */}
                <span></span>

                <label className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-8 whitespace-nowrap overflow-hidden text-ellipsis">
                  E/Tab排除
                </label>
                <span></span>
                <span></span>
                <span></span>
                <textarea
                  disabled={shouldDisableFields}
                  className={`input-navigable col-span-4 border-2 border-gray-300 rounded-lg shadow-md disabled:bg-gray-200 disabled:cursor-not-allowed`}
                  rows={3}
                />

                <label className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-8 whitespace-nowrap overflow-hidden text-ellipsis">
                  排除確認
                </label>
                <input
                  disabled={shouldDisableFields}
                  className={`col-span-2 ${className_input_text} input-navigable disabled:bg-gray-200 disabled:cursor-not-allowed`}
                  onKeyDown={(e) => handleFormatting(e, removeAllWhitespace)}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
