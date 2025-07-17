import React, {
  useEffect,
  useState,
  useRef,
  KeyboardEvent as ReactKeyboardEvent,
  ChangeEvent,
} from "react";
import { Card, CardBody, Radio, RadioGroup } from "@nextui-org/react";
import BackButton from "../component/BackButton";

import {
  handleDigitInput,
  handleNavigationKey,
  handleInputToRadio,
  handleRadioNavigation,
  toHalfWidth,
  extractHalfWidthDigits,
  convertToHalfWidthAndRemoveKana,
  convertToFullWidth,
  removeAllWhitespace,
} from "../utils/InputHandlers";

interface CodeOption {
  code: string;
  label: string;
}

interface Listener {
  element: EventTarget;
  event: string;
  handler: EventListenerOrEventListenerObject;
}

const useKeyboardNavigation = (
  formRef: React.RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    if (!(formRef.current instanceof HTMLElement)) return;

    const form = formRef.current;
    const navigableInputs = Array.from(
      form.querySelectorAll<HTMLElement>(".input-navigable")
    );
    const digitInputs = Array.from(
      form.querySelectorAll<HTMLInputElement>(".input-customer-digit")
    );
    const mainRadios = Array.from(
      form.querySelectorAll<HTMLInputElement>(
        ".radio-group .radio-customer-type"
      )
    );
    const inputToMainRadio =
      form.querySelector<HTMLInputElement>(".input-to-radio");
    const checkboxes = Array.from(
      form.querySelectorAll<HTMLInputElement>(".checkbox-group-item")
    );
    const radioGroup2 = Array.from(
      form.querySelectorAll<HTMLInputElement>(
        ".radio2-group .radio-customer-type"
      )
    );
    const text3Input = form.querySelector<HTMLInputElement>(".text3-input");
    const radioGroup1 = Array.from(
      form.querySelectorAll<HTMLInputElement>(
        ".radio1-group .radio-customer-type"
      )
    );
    const inputToCheckbox =
      form.querySelector<HTMLInputElement>(".input-to-checkbox");
    const codeInputs = Array.from(
      form.querySelectorAll<HTMLInputElement>(".code-input")
    );

    const listeners: Listener[] = [];
    const addListener = (
      element: EventTarget,
      event: string,
      handler: EventListenerOrEventListenerObject
    ) => {
      element.addEventListener(event, handler);
      listeners.push({ element, event, handler });
    };

    navigableInputs.forEach((input, index) => {
      if (input.tagName !== "TEXTAREA") {
        addListener(input, "keydown", (e: Event) =>
          handleNavigationKey(e as KeyboardEvent, index, navigableInputs)
        );
      }
    });

    digitInputs.forEach((input, index) => {
      addListener(input, "input", (e: Event) =>
        handleDigitInput(e, index, navigableInputs)
      );
    });

    if (inputToMainRadio) {
      addListener(inputToMainRadio, "keydown", (e: Event) =>
        handleInputToRadio(e as KeyboardEvent, mainRadios)
      );
    }
    mainRadios.forEach((radio, index) => {
      addListener(radio, "keydown", (e: Event) =>
        handleRadioNavigation(e as KeyboardEvent, index, mainRadios)
      );
    });

    radioGroup1.forEach((radio, index) => {
      addListener(radio, "keydown", (e: Event) =>
        handleRadioNavigation(e as KeyboardEvent, index, radioGroup1)
      );
    });

    radioGroup2.forEach((radio, index) => {
      addListener(radio, "keydown", (e: Event) =>
        handleRadioNavigation(e as KeyboardEvent, index, radioGroup2)
      );
    });

    checkboxes.forEach((checkbox, index) => {
      const handler = (e: Event) => {
        const kbEvent = e as KeyboardEvent;
        const keyMap: { [key: string]: number } = {
          ArrowRight: 1,
          ArrowDown: 1,
          ArrowLeft: -1,
          ArrowUp: -1,
        };
        if (keyMap[kbEvent.key]) {
          kbEvent.preventDefault();
          const nextIndex = index + keyMap[kbEvent.key];
          if (nextIndex >= 0 && nextIndex < checkboxes.length)
            checkboxes[nextIndex].focus();
        } else if (kbEvent.key === "Enter" || kbEvent.key === "Tab") {
          kbEvent.preventDefault();
          radioGroup2[0]?.focus();
          radioGroup2[0]?.click();
        } else if (kbEvent.key.toLowerCase() === "c") {
          kbEvent.preventDefault();
          checkbox.checked = !checkbox.checked;
        }
      };
      addListener(checkbox, "keydown", handler);
    });

    if (text3Input && radioGroup1.length > 0) {
      addListener(text3Input, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;
        if (["Tab", "Enter", "ArrowDown", "ArrowRight"].includes(kbEvent.key)) {
          kbEvent.preventDefault();
          radioGroup1[0]?.focus();
          radioGroup1[0]?.click();
        }
      });
    }

    if (inputToCheckbox && checkboxes.length > 0) {
      addListener(inputToCheckbox, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;
        if (["Tab", "Enter", "ArrowDown", "ArrowRight"].includes(kbEvent.key)) {
          kbEvent.preventDefault();
          checkboxes[0]?.focus();
        }
      });
    }

    codeInputs.forEach((input, index) => {
      const handler = (e: Event) => {
        const kbEvent = e as KeyboardEvent;
        if (kbEvent.key === "Enter" || kbEvent.key === "Tab") {
          kbEvent.preventDefault();
          const nextCodeInput = codeInputs[index + 1];
          if (nextCodeInput) {
            nextCodeInput.focus();
          } else {
            form
              .querySelector<HTMLInputElement>('[data-group="text6"]')
              ?.focus();
          }
        }
      };
      addListener(input, "keydown", handler);
    });

    return () => {
      listeners.forEach(({ element, event, handler }) =>
        element.removeEventListener(event, handler)
      );
    };
  }, [formRef]);
};

export default function CheckInputScreen() {
  const formRef = useRef<HTMLDivElement>(null);
  useKeyboardNavigation(formRef);

  //focus on first input field when page loads
  useEffect(() => {
    const firstInput =
      formRef.current?.querySelector<HTMLElement>(".input-navigable");
    firstInput?.focus();
  }, []);

  const [radioValue, setRadioValue] = useState<string>("");
  const [radio1Value, setRadio1Value] = useState<string>("");
  const [radio2Value, setRadio2Value] = useState<string>("");
  const [code1, setCode1] = useState<string>("0");
  const [code2, setCode2] = useState<string>("0");
  const [fontSizeClass, setFontSizeClass] = useState<string>("text-base");

  const codeOptions: CodeOption[] = [
    { code: "0", label: "Zero" },
    { code: "1", label: "One" },
    { code: "2", label: "Two" },
    { code: "3", label: "Three" },
    { code: "", label: "Invalid" },
  ];

  // Handling when changing values ​​in textbox(code) and pull-down
  const handleCodeKeyDown = (
    e: ReactKeyboardEvent<HTMLInputElement>,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    const idx = codeOptions.findIndex((o) => o.code === value);
    if (idx === -1) return;

    let newIndex = idx;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      newIndex = (idx + 1) % codeOptions.length;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      newIndex = (idx - 1 + codeOptions.length) % codeOptions.length;
    }

    if (newIndex !== idx) setValue(codeOptions[newIndex].code);
  };

  // Handle format text in 入力制御テスト
  const handleFormatting = (
    e: ReactKeyboardEvent<HTMLInputElement>,
    formatter: (str: string) => string
  ): void => {
    if (["Tab", "Enter", "ArrowDown", "ArrowUp"].includes(e.key)) {
      e.preventDefault();
      const input = e.currentTarget;
      input.value = formatter(input.value);
    }
  };
  const btnBaseStyle =
    "font-semibold py-1 px-4 rounded-lg transition-all duration-200 shadow-md";
  const btnActiveStyle = "bg-blue-600 text-white scale-110";
  const btnInactiveStyle = "bg-white text-blue-600 hover:bg-blue-100";
  const className_label =
    "flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-3 whitespace-nowrap";
  const className_input_customer =
    "w-8 h-8 border-2 border-gray-300 rounded-lg shadow-md p-2 focus:border-gray-300 focus:shadow-lg focus:outline-none transition-all";
  const className_input_text =
    "h-8 border-2 border-gray-300 rounded-lg shadow-md p-2 focus:border-gray-300 focus:shadow-lg focus:outline-none transition-all";

  return (
    <div
      ref={formRef}
      className={`p-6 bg-[#f0f0f0] min-h-screen ${fontSizeClass}`}
    >
      <BackButton />
      <div className="flex flex-row justify-between items-center mb-2">
        <h1>テストフィールド1</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFontSizeClass("text-xs")}
            className={`${btnBaseStyle} ${
              fontSizeClass === "text-xs" ? btnActiveStyle : btnInactiveStyle
            }`}
          >
            Small
          </button>
          <button
            onClick={() => setFontSizeClass("text-base")}
            className={`${btnBaseStyle} ${
              fontSizeClass === "text-base" ? btnActiveStyle : btnInactiveStyle
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => setFontSizeClass("text-2xl")}
            className={`${btnBaseStyle} ${
              fontSizeClass === "text-2xl" ? btnActiveStyle : btnInactiveStyle
            }`}
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
                  className={`${className_input_customer} input-customer-digit input-navigable`}
                />
              ))}
            </div>

            <div className="flex items-center gap-5 p-2">
              <label className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-10">
                氏名
              </label>
              <input className="input-free-text input-to-radio input-navigable w-60 h-8 border-2 border-gray-300 rounded-lg shadow-md p-2" />
              <span className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-8">
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
              >
                <div className="flex gap-4">
                  {["法人以外", "法人"].map((v) => (
                    <Radio
                      key={v}
                      value={v}
                      className="flex flex-row font-bold radio-customer-type"
                    >
                      <p className="ml-4">{v}</p>
                    </Radio>
                  ))}
                </div>
              </RadioGroup>
              <span className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-8">
                代表者名
              </span>
              <input className="input-free-text after-radio input-navigable w-60 h-8 border-2 border-gray-300 rounded-lg shadow-md p-2" />
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-2 gap-6 mt-4">
        <h1>キーアクションテスト</h1>
        <h1>入力制御テスト</h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="border border-gray-400 bg-white shadow-md">
          <CardBody className="space-y-3 w-full">
            <div className="grid grid-cols-4 items-center gap-2 p-4">
              <label className={`${className_label}`}>Text1</label>
              <input
                className={`col-span-2 ${className_input_text} input-navigable`}
              />
              <span></span>

              <label className={`${className_label}`}>Text2</label>
              <input
                className={`col-span-2 ${className_input_text} input-navigable`}
              />
              <span></span>

              <label className={`${className_label}`}>Text3</label>
              <input
                className={`col-span-2 ${className_input_text} input-navigable text3-input`}
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
              >
                <div className="flex gap-4">
                  {["A", "B"].map((v) => (
                    <Radio
                      key={v}
                      value={v}
                      className="flex flex-row font-bold radio-customer-type"
                    >
                      <p className="ml-4">Item {v}</p>
                    </Radio>
                  ))}
                </div>
              </RadioGroup>
              <span></span>

              <label className={`${className_label}`}>Text4</label>
              <input
                className={`col-span-1 ${className_input_text} input-navigable after-radio1`}
              />

              <label className={`${className_label}`}>Text5</label>
              <input
                data-group="text5"
                onKeyDown={(e: ReactKeyboardEvent<HTMLInputElement>) => {
                  if (
                    ["Tab", "Enter", "ArrowDown", "ArrowRight"].includes(e.key)
                  ) {
                    e.preventDefault();
                    const currentInput = e.currentTarget;
                    currentInput.blur();

                    setTimeout(() => {
                      formRef.current
                        ?.querySelector<HTMLElement>('[data-group="code1"]')
                        ?.focus();
                    }, 10);
                  }
                }}
                className={`col-span-1 ${className_input_text} input-navigable`}
              />

              <label className={`${className_label}`}>Code1</label>
              <div className="flex flex-row">
                <input
                  value={code1}
                  onChange={(e) => setCode1(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      e.preventDefault();
                      setCode1("0");
                      return;
                    }
                    handleCodeKeyDown(e, code1, setCode1);
                  }}
                  className="w-8 border border-gray-300 rounded code-input"
                  data-group="code1"
                />

                <select
                  className="ml-2 h-8 border border-gray-300 rounded code-select"
                  value={codeOptions.some((o) => o.code === code1) ? code1 : ""}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setCode1(e.target.value)
                  }
                  data-group="code1"
                >
                  {codeOptions.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <label className={`${className_label}`}>Code2</label>
              <div className="flex flex-row">
                <input
                  value={code2}
                  onChange={(e) => setCode2(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      e.preventDefault();
                      setCode2("0");
                      return;
                    }
                    handleCodeKeyDown(e, code2, setCode2);
                  }}
                  className="w-8 border border-gray-300 rounded code-input"
                  data-group="code2"
                />

                <select
                  className="ml-2 h-8 border border-gray-300 rounded code-select"
                  value={codeOptions.some((o) => o.code === code2) ? code2 : ""}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setCode2(e.target.value)
                  }
                  data-group="code2"
                >
                  {codeOptions.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <label className={`${className_label}`}>Text6</label>
              <input
                data-group="text6"
                className={`col-span-1 ${className_input_text} input-navigable input-to-checkbox`}
              />
              <span></span>
              <span></span>

              <label className={`${className_label}`}>Check Box</label>
              <div className="col-span-3 flex gap-4 flex-row">
                {["sun", "mon", "tue", "wed", "thu", "fri"].map((day) => (
                  <label key={day} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-6 h-6 accent-blue-600 checkbox-group-item"
                      tabIndex={0}
                    />
                    <span>{day}</span>
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
              >
                <div className="flex gap-4">
                  {["A", "B", "C", "D"].map((v) => (
                    <Radio
                      key={v}
                      value={v}
                      className="flex flex-row font-bold radio-customer-type"
                    >
                      <p className="ml-4">Item {v}</p>
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
              className={`input-free-text textarea-after-radio2 p-3 w-full border-2 input-navigable border-gray-300 rounded-lg shadow-md`}
              rows={2}
            />
          </CardBody>
        </Card>

        <Card className="border border-gray-400 bg-white shadow-md">
          <CardBody className="space-y-3 mt-3">
            <div className="grid grid-cols-4 items-center gap-2 px-4">
              <label className={`${className_label}`}>全角＆半角混合</label>
              <input
                className={`col-span-2 ${className_input_text} input-navigable`}
              />
              <span></span>

              <label className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-8">
                半角カナ
              </label>
              <input
                className={`col-span-2 ${className_input_text} input-navigable`}
                onKeyDown={(e) => handleFormatting(e, toHalfWidth)}
              />
              <span></span>

              <label className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-8">
                半角数字
              </label>
              <input
                className={`col-span-2 ${className_input_text} input-navigable`}
                onKeyDown={(e) => handleFormatting(e, extractHalfWidthDigits)}
              />
              <span></span>

              <label className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-8">
                半角英数字
              </label>
              <input
                className={`col-span-2 ${className_input_text} input-navigable`}
                onKeyDown={(e) =>
                  handleFormatting(e, convertToHalfWidthAndRemoveKana)
                }
              />
              <span></span>

              <label className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-8">
                全角
              </label>
              <input
                className={`col-span-2 ${className_input_text} input-navigable`}
                onKeyDown={(e) => handleFormatting(e, convertToFullWidth)}
              />
              <span></span>

              <label className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-8">
                E/Tab排除
              </label>
              <span></span>
              <span></span>
              <span></span>
              <textarea
                className={`input-navigable col-span-4 border-2 border-gray-300 rounded-lg shadow-md`}
                rows={3}
              />

              <label className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-8">
                排除確認
              </label>
              <input
                className={`col-span-2 ${className_input_text} input-navigable`}
                onKeyDown={(e) => handleFormatting(e, removeAllWhitespace)}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
