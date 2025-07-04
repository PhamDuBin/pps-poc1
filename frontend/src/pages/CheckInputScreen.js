import React from "react";
import { Card, CardBody, Radio, RadioGroup } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  handleDigitInput,
  handleNavigationKey,
  handleRadioGroupNavigation,
  handleInputToRadio,
  handleRadioNavigation,
} from "../utils/InputHandlers";

export default function CheckInputScreen() {
  const className_label =
    "flex justify-center min-w-[100px] text-base font-black bg-gray-300 py-0.5 px-3 whitespace-nowrap";

  const className_input_customer =
    "w-8 h-8 border-2 border-gray-300 rounded-lg shadow-md p-2 focus:border-gray-300 focus:shadow-lg focus:outline-none transition-all";

  const className_input_text =
    "h-8 border-2 border-gray-300 rounded-lg shadow-md p-2 focus:border-gray-300 focus:shadow-lg focus:outline-none transition-all";

  useEffect(() => {
    const inputs = Array.from(document.querySelectorAll(".input-navigable"));

    inputs.forEach((input, index) => {
      if (input.classList.contains("input-customer-digit")) {
        const inputHandler = (e) => handleDigitInput(e, index, inputs);
        input.addEventListener("input", inputHandler);
        input._inputHandler = inputHandler;
      }
      if (input.tagName !== "TEXTAREA") {
        const keyHandler = (e) => handleNavigationKey(e, index, inputs);
        input.addEventListener("keydown", keyHandler);
        input._keyHandler = keyHandler;
      }
    });

    return () => {
      inputs.forEach((input) => {
        if (input._inputHandler) {
          input.removeEventListener("input", input._inputHandler);
        }
        if (input._keyHandler) {
          input.removeEventListener("keydown", input._keyHandler);
        }
      });
    };
  }, []);

  useEffect(() => {
    const radios = Array.from(
      document.querySelectorAll(".radio-customer-type")
    );
    const inputBeforeRadio = document.querySelector(".input-to-radio");

    if (inputBeforeRadio) {
      const handler = (e) => handleInputToRadio(e, radios);
      inputBeforeRadio.addEventListener("keydown", handler);
      inputBeforeRadio._keydownHandler = handler;
    }

    radios.forEach((radio, index) => {
      const keyHandler = (e) => handleRadioNavigation(e, index, radios);
      radio.addEventListener("keydown", keyHandler);
      radio._keyHandler = keyHandler;
    });

    return () => {
      if (inputBeforeRadio) {
        inputBeforeRadio.removeEventListener(
          "keydown",
          inputBeforeRadio._keydownHandler
        );
      }

      radios.forEach((radio) => {
        radio.removeEventListener("keydown", radio._keyHandler);
      });
    };
  }, []);

  useEffect(() => {
    const checkboxes = Array.from(
      document.querySelectorAll(".checkbox-group-item")
    );
    const nextRadios = Array.from(
      document.querySelectorAll(".radio2-group .radio-customer-type")
    );

    checkboxes.forEach((checkbox) => {
      const handler = (e) => {
        switch (e.key) {
          case "ArrowRight":
          case "ArrowDown":
            e.preventDefault();
            const next = checkboxes.indexOf(checkbox) + 1;
            if (next < checkboxes.length) checkboxes[next].focus();
            break;
          case "ArrowLeft":
          case "ArrowUp":
            e.preventDefault();
            const prev = checkboxes.indexOf(checkbox) - 1;
            if (prev >= 0) checkboxes[prev].focus();
            break;
          case "Enter":
          case "Tab":
            e.preventDefault();
            // ✅ Nhảy đến radio đầu tiên luôn, bất kể vị trí hiện tại
            if (nextRadios.length > 0) {
              nextRadios[0].focus();
              nextRadios[0].click(); // chọn luôn nếu muốn
            }
            break;
          case "c":
          case "C":
            e.preventDefault();
            checkbox.checked = !checkbox.checked;
            break;
        }
      };
      checkbox.addEventListener("keydown", handler);
      checkbox._keyHandler = handler;
    });

    return () => {
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener("keydown", checkbox._keyHandler);
      });
    };
  }, []);

  useEffect(() => {
    const checkboxes = Array.from(
      document.querySelectorAll(".checkbox-group-item")
    );
    const nextRadios = Array.from(
      document.querySelectorAll(".radio2-group .radio-customer-type")
    );

    checkboxes.forEach((checkbox) => {
      const handler = (e) => {
        switch (e.key) {
          case "ArrowRight":
          case "ArrowDown":
            e.preventDefault();
            const next = checkboxes.indexOf(checkbox) + 1;
            if (next < checkboxes.length) checkboxes[next].focus();
            break;
          case "ArrowLeft":
          case "ArrowUp":
            e.preventDefault();
            const prev = checkboxes.indexOf(checkbox) - 1;
            if (prev >= 0) checkboxes[prev].focus();
            break;
          case "Enter":
          case "Tab":
            e.preventDefault();
            // ✅ Nhảy đến radio đầu tiên luôn, bất kể vị trí hiện tại
            if (nextRadios.length > 0) {
              nextRadios[0].focus();
              nextRadios[0].click(); // chọn luôn nếu muốn
            }
            break;
          case "c":
          case "C":
            e.preventDefault();
            checkbox.checked = !checkbox.checked;
            break;
        }
      };
      checkbox.addEventListener("keydown", handler);
      checkbox._keyHandler = handler;
    });

    return () => {
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener("keydown", checkbox._keyHandler);
      });
    };
  }, []);

  useEffect(() => {
    const text3Input = document.querySelector(".text3-input");
    const radio1Group = document.querySelectorAll(
      ".radio1-group .radio-customer-type"
    );

    if (text3Input && radio1Group.length > 0) {
      const handler = (e) => {
        if (["Tab", "Enter", "ArrowDown", "ArrowRight"].includes(e.key)) {
          e.preventDefault();
          radio1Group[0].focus();
          radio1Group[0].click();
        }
      };

      text3Input.addEventListener("keydown", handler);
      text3Input._keydownHandler = handler;

      return () => {
        text3Input.removeEventListener("keydown", handler);
      };
    }
  }, []);

  useEffect(() => {
    const input = document.querySelector(".input-to-checkbox");
    const checkboxes = Array.from(
      document.querySelectorAll(".checkbox-group-item")
    );

    if (input && checkboxes.length > 0) {
      const handler = (e) => {
        if (["Tab", "Enter", "ArrowDown", "ArrowRight"].includes(e.key)) {
          e.preventDefault();
          checkboxes[0].focus();
        }
      };
      input.addEventListener("keydown", handler);
      input._keydownHandler = handler;
    }

    return () => {
      if (input && input._keydownHandler) {
        input.removeEventListener("keydown", input._keydownHandler);
      }
    };
  }, []);

  const [code1, setCode1] = useState("0");
  const [code2, setCode2] = useState("0");

  const codeOptions = [
    { code: "0", label: "Zero" },
    { code: "1", label: "One" },
    { code: "2", label: "Two" },
    { code: "3", label: "Three" },
    { code: "", label: "Invalid" },
  ];

  useEffect(() => {
    const options = ["1", "2", "3"];
    const codeInputs = document.querySelectorAll(".code-input");

    codeInputs.forEach((input) => {
      const group = input.dataset.group;
      const select = document.querySelector(
        `.code-select[data-group="${group}"]`
      );

      const handler = (e) => {
        let index = options.indexOf(input.value);
        if (e.key === "ArrowUp") {
          e.preventDefault();
          index = (index <= 0 ? options.length : index) - 1;
          input.value = options[index];
          select.value = options[index];
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          index = (index + 1) % options.length;
          input.value = options[index];
          select.value = options[index];
        } else if (e.key === "Enter" || e.key === "Tab") {
          e.preventDefault();
          // Move to next input
          const currentIndex = Array.from(codeInputs).indexOf(input);
          if (currentIndex + 1 < codeInputs.length) {
            codeInputs[currentIndex + 1].focus();
          }
        }
      };

      input.addEventListener("keydown", handler);
      input._codeHandler = handler;
    });

    return () => {
      codeInputs.forEach((input) => {
        input.removeEventListener("keydown", input._codeHandler);
      });
    };
  }, []);

  const toHalfWidth = (str) => {
    return (
      str
        // fullwidth → halfwidth
        .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) =>
          String.fromCharCode(s.charCodeAt(0) - 0xfee0)
        )
        // Special characters
        .replace(/[！-～]/g, (s) =>
          String.fromCharCode(s.charCodeAt(0) - 0xfee0)
        )
        // Fullwidth space → normal space
        .replace(/　/g, " ")
    );
  };

  const extractHalfWidthDigits = (str) => {
    // 1. fullwidth → halfwidth
    const half = str.replace(/[０-９]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
    );

    // 2. keep numberic (0-9)
    return half.replace(/[^0-9]/g, "");
  };

  const convertToHalfWidthAndRemoveKana = (str) => {
    return (
      str
        // Convert letters & numbers full-width → half-width
        .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (ch) =>
          String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
        )
        // Convert special characters full-width → half-width
        .replace(/[！-～]/g, (ch) =>
          String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
        )
        // Convert full space → normal space
        .replace(/　/g, " ")
        // Delete all Kana: Hiragana + Katakana + Half-width Kana
        .replace(/[\u3040-\u309F\u30A0-\u30FF\uFF66-\uFF9F]/g, "")
        .trim()
    );
  };

  const convertToFullWidth = (str) => {
    return str

      .replace(/[A-Za-z0-9]/g, (ch) =>
        String.fromCharCode(ch.charCodeAt(0) + 0xfee0)
      )

      .replace(/ /g, "　");
  };

  const removeAllWhitespace = (str) => {
    return str.replace(/[\s\r\n\t]/g, "");
  };

  const [radioValue, setRadioValue] = useState("");
  const [radio1Value, setRadio1Value] = useState("");
  const [radio2Value, setRadio2Value] = useState("");

  return (
    <div className="p-6 bg-[#f0f0f0] min-h-screen">
      <h1>テストフィールド1</h1>
      <Card className="border border-gray-400 bg-white shadow-md">
        <CardBody className="space-y-4">
          <div className="px-4 space-y-4">
            {/* 顧客コード */}
            <div className="flex items-center gap-2 p-2">
              <label className={`${className_label}`}>顧客コード</label>
              <input
                className={`${className_input_customer} input-customer-digit input-navigable`}
              />
              <input
                className={`${className_input_customer} input-customer-digit input-navigable`}
              />
              <input
                className={`${className_input_customer} input-customer-digit input-navigable`}
              />
              <input
                className={`${className_input_customer} input-customer-digit input-navigable`}
              />
            </div>

            {/* 氏名・顧客種別 */}
            <div className="flex items-center gap-5 p-2">
              <label className="flex justify-center min-w-[100px] text-base font-black bg-gray-300 py-0.5 px-10">
                氏名
              </label>
              <input className="input-free-text input-to-radio input-navigable w-60 h-8 border-2 border-gray-300 rounded-lg shadow-md p-2 focus:border-gray-300 focus:shadow-lg focus:outline-none transition-all" />
              <span className="flex justify-center min-w-[100px] text-base font-black bg-gray-300 py-0.5 px-8">
                顧客種別
              </span>
              <RadioGroup
                name="radio"
                orientation="horizontal"
                className="items-center gap-6 radio-group"
                value={radioValue}
                onChange={(e) => setRadioValue(e.target.value)}
              >
                <div className="flex gap-4">
                  {["法人以外", "法人"].map((v) => (
                    <Radio
                      key={v}
                      value={v}
                      className="flex flex-row font-bold text-base radio-customer-type"
                    >
                      <p className="ml-4">{v}</p>
                    </Radio>
                  ))}
                </div>
              </RadioGroup>

              <span className="flex justify-center min-w-[100px] text-base font-black bg-gray-300 py-0.5 px-8">
                氏名
              </span>
              <input className="input-free-text after-radio input-navigable w-60 h-8 border-2 border-gray-300 rounded-lg shadow-md p-2 focus:border-gray-300 focus:shadow-lg focus:outline-none transition-all" />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Section 2: キーアクションテスト & 入力制御テスト */}
      <div className="grid grid-cols-2 gap-6">
        <h1>キーアクションテスト</h1>
        <h1>入力制御テスト</h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* キーアクションテスト */}
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
              <label className={`${className_label} `}>Text3</label>
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
                onChange={(e) => setRadio1Value(e.target.value)}
              >
                <div className="flex gap-4">
                  {["A", "B"].map((v) => (
                    <Radio
                      key={v}
                      value={v}
                      className="flex flex-row font-bold text-base radio-customer-type"
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
                onKeyDown={(e) => {
                  if (
                    ["Tab", "Enter", "ArrowDown", "ArrowRight"].includes(e.key)
                  ) {
                    e.preventDefault();
                    document.querySelector('[data-group="code1"]').focus();
                  }
                }}
                className={`col-span-1 ${className_input_text} input-navigable`}
              />
              <label className={`${className_label}`}>Code1</label>
              <div className="flex flex-row">
                <input
                  value={code1}
                  onChange={(e) => setCode1(e.target.value)} // Nhập tự do
                  onKeyDown={(e) => {
                    const idx = codeOptions.findIndex((o) => o.code === code1);
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      const next = (idx + 1) % codeOptions.length;
                      setCode1(codeOptions[next].code);
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      const prev =
                        (idx - 1 + codeOptions.length) % codeOptions.length;
                      setCode1(codeOptions[prev].code);
                    } else if (e.key === "Enter" || e.key === "Tab") {
                      e.preventDefault();
                      document.querySelector('[data-group="code2"]').focus();
                    }
                  }}
                  className="w-8 border border-gray-300 rounded code-input"
                  data-group="code1"
                />
                <select
                  className="ml-2 h-8 border border-gray-300 rounded code-select"
                  value={codeOptions.some((o) => o.code === code1) ? code1 : ""}
                  onChange={(e) => setCode1(e.target.value)}
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
                    const idx = codeOptions.findIndex((o) => o.code === code2);
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      const next = (idx + 1) % codeOptions.length;
                      setCode2(codeOptions[next].code);
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      const prev =
                        (idx - 1 + codeOptions.length) % codeOptions.length;
                      setCode2(codeOptions[prev].code);
                    } else if (e.key === "Enter" || e.key === "Tab") {
                      e.preventDefault();
                      document.querySelector('[data-group="text6"]').focus();
                    }
                  }}
                  className="w-8 border border-gray-300 rounded code-input"
                  data-group="code2"
                />
                <select
                  className="ml-2 h-8 border border-gray-300 rounded code-select"
                  value={codeOptions.some((o) => o.code === code2) ? code2 : ""}
                  onChange={(e) => setCode2(e.target.value)}
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
                  <label
                    key={day}
                    className="flex items-center gap-2 text-base "
                  >
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
                onChange={(e) => setRadio2Value(e.target.value)}
              >
                <div className="flex gap-4">
                  {["A", "B", "C", "D"].map((v) => (
                    <Radio
                      key={v}
                      value={v}
                      className="flex flex-row font-bold text-base radio-customer-type"
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
              className={`input-free-text textarea-after-radio2 p-3 w-full border-2 input-navigable border-gray-300 rounded-lg shadow-md focus:border-gray-300 focus:shadow-lg focus:outline-none transition-all`}
              minRows={1}
              maxRows={3}
            />
          </CardBody>
        </Card>
        {/* 入力制御テスト */}
        <Card className="border border-gray-400 bg-white shadow-md">
          <CardBody className="space-y-3 mt-3">
            <div className="grid grid-cols-4 items-center gap-2 px-4">
              <label className={`${className_label}`}>全角＆半角混合</label>
              <input
                className={`col-span-2 ${className_input_text} input-navigable`}
              />
              <span></span>
              <label className="flex justify-center min-w-[100px] text-base font-black bg-gray-300 whitespace-nowrap py-0.5 px-8">
                半角カナ
              </label>
              <input
                className={`col-span-2 ${className_input_text} input-navigable`}
                onKeyDown={(e) => {
                  if (
                    ["Tab", "Enter", "ArrowDown", "ArrowUp"].includes(e.key)
                  ) {
                    e.preventDefault();
                    const input = e.target;
                    input.value = toHalfWidth(input.value);
                  }
                }}
              />
              <span></span>
              <label className="flex justify-center min-w-[100px] text-base font-black bg-gray-300 whitespace-nowrap py-0.5 px-8">
                半角数字
              </label>
              <input
                className={`col-span-2 ${className_input_text} input-navigable`}
                onKeyDown={(e) => {
                  if (
                    ["Tab", "Enter", "ArrowDown", "ArrowUp"].includes(e.key)
                  ) {
                    e.preventDefault();
                    const input = e.target;
                    input.value = extractHalfWidthDigits(input.value);
                  }
                }}
              />
              <span></span>
              <label className="flex justify-center min-w-[100px] text-base font-black bg-gray-300 whitespace-nowrap py-0.5 px-8">
                半角英数字
              </label>
              <input
                className={`col-span-2 ${className_input_text} input-navigable`}
                onKeyDown={(e) => {
                  if (
                    ["Tab", "Enter", "ArrowDown", "ArrowUp"].includes(e.key)
                  ) {
                    e.preventDefault();
                    const input = e.target;
                    input.value = convertToHalfWidthAndRemoveKana(input.value);
                  }
                }}
              />
              <span></span>
              <label className="flex justify-center min-w-[100px] text-base font-black bg-gray-300 whitespace-nowrap py-0.5 px-8">
                全角
              </label>
              <input
                className={`col-span-2 ${className_input_text} input-navigable`}
                onKeyDown={(e) => {
                  if (
                    ["Tab", "Enter", "ArrowDown", "ArrowUp"].includes(e.key)
                  ) {
                    e.preventDefault();
                    const input = e.target;
                    input.value = convertToFullWidth(input.value);
                  }
                }}
              />
              <span></span>
              <label className="flex justify-center min-w-[100px] text-base font-black bg-gray-300 whitespace-nowrap py-0.5 px-8">
                E/Tab排除
              </label>
              <span></span>
              <span></span>
              <span></span>
              <textarea
                className={`input-navigable col-span-4 border-2 border-gray-300 rounded-lg shadow-md focus:border-gray-300 focus:shadow-lg focus:outline-none transition-all`}
                minRows={3}
                maxRows={3}
              />
              <label className="flex justify-center min-w-[100px] text-base font-black bg-gray-300 whitespace-nowrap py-0.5 px-8">
                排除確認
              </label>
              <input
                className={`col-span-2 ${className_input_text} input-navigable`}
                onKeyDown={(e) => {
                  if (
                    ["Tab", "Enter", "ArrowDown", "ArrowUp"].includes(e.key)
                  ) {
                    e.preventDefault();

                    const input = e.target;
                    input.value = removeAllWhitespace(input.value);
                  }
                }}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
