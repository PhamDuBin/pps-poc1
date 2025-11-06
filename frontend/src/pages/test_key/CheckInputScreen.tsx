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
  handleNavigationKey,
  handleInputToRadio,
  handleRadioNavigation,
  extractHalfWidthDigits,
  convertToHalfWidthAndRemoveKana,
  convertToFullWidth,
  removeAllWhitespace,
  handleFormatting,
} from "../../utils/InputHandlers";

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
    const afterRadioInput =
      form.querySelector<HTMLInputElement>(".after-radio");
    const afterRadio1Input =
      form.querySelector<HTMLInputElement>(".after-radio1");
    const textareaAfterRadio2 = form.querySelector<HTMLTextAreaElement>(
      ".textarea-after-radio2"
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
      addListener(input, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;
        const target = kbEvent.target as HTMLInputElement | HTMLTextAreaElement;

        // Handle ESC key to clear input/textarea value
        if (kbEvent.key === "Escape") {
          kbEvent.preventDefault();
          if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
            target.value = "";
          }
          return;
        }

        // For TEXTAREA, only handle ESC, not navigation keys
        if (input.tagName === "TEXTAREA") {
          return;
        }

        // Skip handleNavigationKey for special inputs that have custom navigation logic
        const hasCustomForwardNav =
          input.classList.contains("input-to-radio") ||
          input.classList.contains("input-to-checkbox") ||
          input.classList.contains("text3-input") ||
          (input.hasAttribute("data-group") &&
            input.getAttribute("data-group") === "text5");

        const hasCustomBackNav =
          input.classList.contains("after-radio") ||
          input.classList.contains("after-radio1") ||
          input.classList.contains("textarea-after-radio2") ||
          input.classList.contains("input-to-radio") ||
          input.classList.contains("input-to-checkbox") ||
          input.classList.contains("text3-input") ||
          (input.hasAttribute("data-group") &&
            input.getAttribute("data-group") === "text5");

        // Skip forward navigation for inputs that jump to radio/checkbox groups
        if (
          hasCustomForwardNav &&
          ["Tab", "Enter", "ArrowDown"].includes(kbEvent.key)
        ) {
          // Let the custom handler deal with this
          return;
        }

        // Skip backward navigation for inputs with custom Shift+Tab logic
        if (hasCustomBackNav && kbEvent.key === "Tab" && kbEvent.shiftKey) {
          // Let the custom handler deal with this
          return;
        }

        handleNavigationKey(kbEvent, index, navigableInputs);
      });
    });

    // Remove digit input auto-advance since customer code now allows 4 digits

    if (inputToMainRadio) {
      addListener(inputToMainRadio, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;

        // Handle Shift+Tab to go back to last enabled customer code input
        if (kbEvent.key === "Tab" && kbEvent.shiftKey) {
          kbEvent.preventDefault();
          // Find all customer code inputs
          const customerCodeInputs = Array.from(
            form.querySelectorAll<HTMLInputElement>(".input-customer-digit")
          );
          // Find the last enabled input (not disabled)
          let targetInput = customerCodeInputs[0]; // Default to first
          for (let i = customerCodeInputs.length - 1; i >= 0; i--) {
            if (!customerCodeInputs[i].disabled) {
              targetInput = customerCodeInputs[i];
              break;
            }
          }
          if (targetInput) {
            targetInput.focus();
          }
          return;
        }

        // Handle forward navigation (Tab, Enter, ArrowDown)
        handleInputToRadio(kbEvent, mainRadios);
      });
    }
    mainRadios.forEach((radio, index) => {
      addListener(radio, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;

        // Handle Shift+Tab to go back to previous navigable input
        if (kbEvent.key === "Tab" && kbEvent.shiftKey) {
          kbEvent.preventDefault();
          // Find the .input-to-radio element and focus it
          const prevInput =
            form.querySelector<HTMLInputElement>(".input-to-radio");
          if (prevInput) {
            prevInput.focus();
          }
          return;
        }

        if (
          ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(
            kbEvent.key
          )
        ) {
          kbEvent.preventDefault();
          let nextIndex = index;

          if (kbEvent.key === "ArrowDown" || kbEvent.key === "ArrowRight") {
            nextIndex = (index + 1) % mainRadios.length;
          } else if (kbEvent.key === "ArrowUp" || kbEvent.key === "ArrowLeft") {
            nextIndex = (index - 1 + mainRadios.length) % mainRadios.length;
          }

          const nextRadio = mainRadios[nextIndex];
          if (nextRadio) {
            nextRadio.focus();
            nextRadio.click();
            // Ensure the radio is actually checked
            nextRadio.checked = true;
            // Trigger change event
            const event = new Event("change", { bubbles: true });
            nextRadio.dispatchEvent(event);
          }
        } else {
          handleRadioNavigation(kbEvent, index, mainRadios);
        }
      });
    });

    radioGroup1.forEach((radio, index) => {
      addListener(radio, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;

        // Handle Shift+Tab to go back to previous navigable input
        if (kbEvent.key === "Tab" && kbEvent.shiftKey) {
          kbEvent.preventDefault();
          text3Input?.focus();
          return;
        }

        if (
          ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(
            kbEvent.key
          )
        ) {
          kbEvent.preventDefault();
          let nextIndex = index;

          if (kbEvent.key === "ArrowDown" || kbEvent.key === "ArrowRight") {
            nextIndex = (index + 1) % radioGroup1.length;
          } else if (kbEvent.key === "ArrowUp" || kbEvent.key === "ArrowLeft") {
            nextIndex = (index - 1 + radioGroup1.length) % radioGroup1.length;
          }

          const nextRadio = radioGroup1[nextIndex];
          if (nextRadio) {
            nextRadio.focus();
            nextRadio.click();
            // Ensure the radio is actually checked
            nextRadio.checked = true;
            // Trigger change event
            const event = new Event("change", { bubbles: true });
            nextRadio.dispatchEvent(event);
          }
        } else {
          handleRadioNavigation(kbEvent, index, radioGroup1);
        }
      });
    });

    radioGroup2.forEach((radio, index) => {
      addListener(radio, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;

        // Handle Shift+Tab to go back to previous element (last checkbox)
        if (kbEvent.key === "Tab" && kbEvent.shiftKey) {
          kbEvent.preventDefault();
          const lastCheckbox = checkboxes[checkboxes.length - 1];
          if (lastCheckbox) {
            lastCheckbox.focus();
          }
          return;
        }

        if (
          ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(
            kbEvent.key
          )
        ) {
          kbEvent.preventDefault();
          let nextIndex = index;

          if (kbEvent.key === "ArrowDown" || kbEvent.key === "ArrowRight") {
            nextIndex = (index + 1) % radioGroup2.length;
          } else if (kbEvent.key === "ArrowUp" || kbEvent.key === "ArrowLeft") {
            nextIndex = (index - 1 + radioGroup2.length) % radioGroup2.length;
          }

          const nextRadio = radioGroup2[nextIndex];
          if (nextRadio) {
            nextRadio.focus();
            nextRadio.click();
            // Ensure the radio is actually checked
            nextRadio.checked = true;
            // Trigger change event
            const event = new Event("change", { bubbles: true });
            nextRadio.dispatchEvent(event);
          }
        } else {
          handleRadioNavigation(kbEvent, index, radioGroup2);
        }
      });
    });

    checkboxes.forEach((checkbox, index) => {
      const handler = (e: Event) => {
        const kbEvent = e as KeyboardEvent;

        // Handle ESC key to uncheck checkbox
        if (kbEvent.key === "Escape") {
          kbEvent.preventDefault();
          checkbox.checked = false;
          return;
        }

        // Handle Shift+Tab to ALWAYS go back to TEXT6 (input-to-checkbox)
        if (kbEvent.key === "Tab" && kbEvent.shiftKey) {
          kbEvent.preventDefault();
          // Always go back to the input before checkboxes, regardless of which checkbox
          if (inputToCheckbox) {
            inputToCheckbox.focus();
          }
          return;
        }

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
          // Move forward to first radio in group 2
          if (radioGroup2.length > 0) {
            radioGroup2[0].focus();
            radioGroup2[0].click();
          }
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

        // Handle Shift+Tab to go back using normal navigation
        if (kbEvent.key === "Tab" && kbEvent.shiftKey) {
          // Let handleNavigationKey handle this - find text3 in navigableInputs
          const text3Index = navigableInputs.indexOf(text3Input);
          if (text3Index > 0) {
            kbEvent.preventDefault();
            navigableInputs[text3Index - 1].focus();
          }
          return;
        }

        if (["Tab", "Enter", "ArrowDown"].includes(kbEvent.key)) {
          kbEvent.preventDefault();
          radioGroup1[0]?.focus();
          radioGroup1[0]?.click();
        }
      });
    }

    if (inputToCheckbox && checkboxes.length > 0) {
      addListener(inputToCheckbox, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;

        // Handle Shift+Tab to go back to CODE2
        if (kbEvent.key === "Tab" && kbEvent.shiftKey) {
          kbEvent.preventDefault();
          const lastCodeInput = codeInputs[codeInputs.length - 1];
          if (lastCodeInput) {
            lastCodeInput.focus();
          }
          return;
        }

        if (["Tab", "Enter", "ArrowDown"].includes(kbEvent.key)) {
          kbEvent.preventDefault();
          checkboxes[0]?.focus();
        }
      });
    }

    codeInputs.forEach((input, index) => {
      const handler = (e: Event) => {
        const kbEvent = e as KeyboardEvent;

        // Handle Shift+Tab to go back to previous code input or text5
        if (kbEvent.key === "Tab" && kbEvent.shiftKey) {
          kbEvent.preventDefault();
          if (index > 0) {
            // Go to previous code input
            codeInputs[index - 1].focus();
          } else {
            // First code input: go back to text5 input
            const text5Input = form.querySelector<HTMLInputElement>(
              '[data-group="text5"]'
            );
            if (text5Input) {
              text5Input.focus();
            }
          }
          return;
        }

        // Handle Tab/Enter to go forward
        if (kbEvent.key === "Enter" || kbEvent.key === "Tab") {
          kbEvent.preventDefault();
          const nextCodeInput = codeInputs[index + 1];
          if (nextCodeInput) {
            // Go to next code input
            nextCodeInput.focus();
          } else {
            // Last code input: go to text6
            const text6Input = form.querySelector<HTMLInputElement>(
              '[data-group="text6"]'
            );
            if (text6Input) {
              text6Input.focus();
            }
          }
        }
      };
      addListener(input, "keydown", handler);
    });

    // Handle Shift+Tab and ArrowUp for after-radio input (代表者名) - this has .input-navigable
    // The handleNavigationKey will handle it, but we need special logic for going back to radio
    if (afterRadioInput && mainRadios.length > 0) {
      addListener(afterRadioInput, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;
        // Handle Shift+Tab and ArrowUp to go back to radio group
        if (
          (kbEvent.key === "Tab" && kbEvent.shiftKey) ||
          kbEvent.key === "ArrowUp"
        ) {
          kbEvent.preventDefault();
          const lastRadio = mainRadios[mainRadios.length - 1];
          if (lastRadio) {
            lastRadio.focus();
          }
        }
      });
    }

    // Handle Shift+Tab and ArrowUp for after-radio1 input (Text4) - this has .input-navigable
    if (afterRadio1Input && radioGroup1.length > 0) {
      addListener(afterRadio1Input, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;
        // Handle Shift+Tab and ArrowUp to go back to radio group
        if (
          (kbEvent.key === "Tab" && kbEvent.shiftKey) ||
          kbEvent.key === "ArrowUp"
        ) {
          kbEvent.preventDefault();
          const lastRadio = radioGroup1[radioGroup1.length - 1];
          if (lastRadio) {
            lastRadio.focus();
          }
        }
      });
    }

    // Handle Shift+Tab for textarea after radio2 - this has .input-navigable
    if (textareaAfterRadio2 && radioGroup2.length > 0) {
      addListener(textareaAfterRadio2, "keydown", (e: Event) => {
        const kbEvent = e as KeyboardEvent;
        // Only handle Shift+Tab specially to go back to radio group
        if (kbEvent.key === "Tab" && kbEvent.shiftKey) {
          kbEvent.preventDefault();
          const lastRadio = radioGroup2[radioGroup2.length - 1];
          if (lastRadio) {
            lastRadio.focus();
          }
        }
      });
    }

    return () => {
      listeners.forEach(({ element, event, handler }) =>
        element.removeEventListener(event, handler)
      );
    };
  }, [formRef]);
};

// Function to handle half-width katakana input only
const handleHalfWidthKatakanaInput = (e: ChangeEvent<HTMLInputElement>) => {
  const input = e.target;
  let value = input.value;

  // First convert full-width katakana to half-width
  // Full-width katakana range: \u30A0-\u30FF
  value = value.replace(/[\u30A0-\u30FF]/g, (char) => {
    const kanaMap: { [key: string]: string } = {
      ア: "ｱ",
      イ: "ｲ",
      ウ: "ｳ",
      エ: "ｴ",
      オ: "ｵ",
      カ: "ｶ",
      キ: "ｷ",
      ク: "ｸ",
      ケ: "ｹ",
      コ: "ｺ",
      サ: "ｻ",
      シ: "ｼ",
      ス: "ｽ",
      セ: "ｾ",
      ソ: "ｿ",
      タ: "ﾀ",
      チ: "ﾁ",
      ツ: "ﾂ",
      テ: "ﾃ",
      ト: "ﾄ",
      ナ: "ﾅ",
      ニ: "ﾆ",
      ヌ: "ﾇ",
      ネ: "ﾈ",
      ノ: "ﾉ",
      ハ: "ﾊ",
      ヒ: "ﾋ",
      フ: "ﾌ",
      ヘ: "ﾍ",
      ホ: "ﾎ",
      マ: "ﾏ",
      ミ: "ﾐ",
      ム: "ﾑ",
      メ: "ﾒ",
      モ: "ﾓ",
      ヤ: "ﾔ",
      ユ: "ﾕ",
      ヨ: "ﾖ",
      ラ: "ﾗ",
      リ: "ﾘ",
      ル: "ﾙ",
      レ: "ﾚ",
      ロ: "ﾛ",
      ワ: "ﾜ",
      ヲ: "ｦ",
      ン: "ﾝ",
      ガ: "ｶﾞ",
      ギ: "ｷﾞ",
      グ: "ｸﾞ",
      ゲ: "ｹﾞ",
      ゴ: "ｺﾞ",
      ザ: "ｻﾞ",
      ジ: "ｼﾞ",
      ズ: "ｽﾞ",
      ゼ: "ｾﾞ",
      ゾ: "ｿﾞ",
      ダ: "ﾀﾞ",
      ヂ: "ﾁﾞ",
      ヅ: "ﾂﾞ",
      デ: "ﾃﾞ",
      ド: "ﾄﾞ",
      バ: "ﾊﾞ",
      ビ: "ﾋﾞ",
      ブ: "ﾌﾞ",
      ベ: "ﾍﾞ",
      ボ: "ﾎﾞ",
      パ: "ﾊﾟ",
      ピ: "ﾋﾟ",
      プ: "ﾌﾟ",
      ペ: "ﾍﾟ",
      ポ: "ﾎﾟ",
      ャ: "ｬ",
      ュ: "ｭ",
      ョ: "ｮ",
      ッ: "ｯ",
      ヮ: "ﾜ",
      ヰ: "ｲ",
      ヱ: "ｴ",
      ヵ: "ｶ",
      ヶ: "ｹ",
      ー: "ｰ",
      "・": "･",
      "゛": "ﾞ",
      "゜": "ﾟ",
    };
    return kanaMap[char] || "";
  });

  // Only keep half-width katakana characters (ｱ-ﾝ and dakuten marks)
  // Half-width katakana range: \uFF61-\uFF9F
  value = value.replace(/[^\uFF61-\uFF9F]/g, "");

  input.value = value;
};

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
  const [zeroSuppress, setZeroSuppress] = useState<string>("");

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
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    const newCode = [...customerCode];
                    newCode[i] = value;
                    setCustomerCode(newCode);
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    if (value && value.length > 0) {
                      const newCode = [...customerCode];
                      newCode[i] = value.padStart(4, "0");
                      setCustomerCode(newCode);
                    }
                  }}
                  onKeyDown={(e) => {
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
                        <p className="ml-4 whitespace-nowrap">Item {v}</p>
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
                <input
                  disabled={shouldDisableFields}
                  className={`col-span-2 ${className_input_text} input-navigable disabled:bg-gray-200 disabled:cursor-not-allowed`}
                  onChange={handleHalfWidthKatakanaInput}
                  onInput={handleHalfWidthKatakanaInput}
                />
                <span></span>

                <label className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-8 whitespace-nowrap overflow-hidden text-ellipsis">
                  半角数字
                </label>
                <input
                  disabled={shouldDisableFields}
                  className={`col-span-2 ${className_input_text} input-navigable disabled:bg-gray-200 disabled:cursor-not-allowed`}
                  onKeyDown={(e) => handleFormatting(e, extractHalfWidthDigits)}
                />
                <span></span>

                <label className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-8 whitespace-nowrap overflow-hidden text-ellipsis">
                  半角英数字
                </label>
                <input
                  disabled={shouldDisableFields}
                  className={`col-span-2 ${className_input_text} input-navigable disabled:bg-gray-200 disabled:cursor-not-allowed`}
                  onKeyDown={(e) =>
                    handleFormatting(e, convertToHalfWidthAndRemoveKana)
                  }
                />
                <span></span>

                <label className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-8 whitespace-nowrap overflow-hidden text-ellipsis">
                  全角
                </label>
                <input
                  disabled={shouldDisableFields}
                  className={`col-span-2 ${className_input_text} input-navigable disabled:bg-gray-200 disabled:cursor-not-allowed`}
                  onKeyDown={(e) => handleFormatting(e, convertToFullWidth)}
                />
                <span></span>

                <label className="flex justify-center min-w-[100px] font-black bg-gray-300 py-0.5 px-8 whitespace-nowrap overflow-hidden text-ellipsis">
                  ゼロパディング
                </label>
                <input
                  disabled={shouldDisableFields}
                  value={zeroSuppress}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setZeroSuppress(value);
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    if (value) {
                      // Add two zeros at the beginning if not already present
                      if (!value.startsWith("00")) {
                        setZeroSuppress("00" + value);
                      }
                    }
                  }}
                  className={`col-span-2 ${className_input_text} input-navigable disabled:bg-gray-200 disabled:cursor-not-allowed`}
                />
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
