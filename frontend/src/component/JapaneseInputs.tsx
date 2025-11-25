import React, { useState, useEffect, forwardRef } from "react";
import { Input } from "antd";
import type { InputProps, InputRef } from "antd";
interface HalfWidthNumberInputProps extends ExportInputProps {
  allowDecimal?: boolean;
}
// ... (Toàn bộ code từ zenToHanMap đến hanRegex của bạn giữ nguyên) ...
const zenToHanMap: { [key: string]: string } = {
  "。": "｡",
  "「": "｢",
  "」": "｣",
  "、": "､",
  "・": "･",
  ァ: "ｧ",
  ィ: "ｨ",
  ゥ: "ｩ",
  ェ: "ｪ",
  ォ: "ｫ",
  ャ: "ｬ",
  ュ: "ｭ",
  ョ: "ｮ",
  ッ: "ｯ",
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
  ヴ: "ｳﾞ",
  ー: "ｰ",
  "゛": "ﾞ",
  "゜": "ﾟ",
  "{": " ",
  Ａ: "A",
  Ｂ: "B",
  Ｃ: "C",
  Ｄ: "D",
  Ｅ: "E",
  Ｆ: "F",
  Ｇ: "G",
  Ｈ: "H",
  Ｉ: "I",
  Ｊ: "J",
  Ｋ: "K",
  Ｌ: "L",
  Ｍ: "M",
  Ｎ: "N",
  Ｏ: "O",
  Ｐ: "P",
  Ｑ: "Q",
  Ｒ: "R",
  Ｓ: "S",
  Ｔ: "T",
  Ｕ: "U",
  Ｖ: "V",
  Ｗ: "W",
  Ｘ: "X",
  Ｙ: "Y",
  Ｚ: "Z",
  ａ: "a",
  ｂ: "b",
  ｃ: "c",
  ｄ: "d",
  ｅ: "e",
  ｆ: "f",
  ｇ: "g",
  ｈ: "h",
  ｉ: "i",
  ｊ: "j",
  ｋ: "k",
  ｌ: "l",
  ｍ: "m",
  ｎ: "n",
  ｏ: "o",
  ｐ: "p",
  ｑ: "q",
  ｒ: "r",
  ｓ: "s",
  ｔ: "t",
  ｕ: "u",
  ｖ: "v",
  ｗ: "w",
  ｘ: "x",
  ｙ: "y",
  ｚ: "z",
  "０": "0",
  "１": "1",
  "２": "2",
  "３": "3",
  "４": "4",
  "５": "5",
  "６": "6",
  "７": "7",
  "８": "8",
  "９": "9",
  "！": "!",
  "”": '"',
  "＃": "#",
  "＄": "$",
  "％": "%",
  "＆": "&",
  "’": "'",
  "（": "(",
  "）": ")",
  "＊": "*",
  "＋": "+",
  "，": ",",
  "－": "-",
  "．": ".",
  "／": "/",
  "：": ":",
  "；": ";",
  "＜": "<",
  "＝": "=",
  "＞": ">",
  "？": "?",
  "＠": "@",
  "［": "[",
  "＼": "\\",
  "］": "]",
  "＾": "^",
  "＿": "_",
  "‘": "`",
  "｛": "{",
  "｜": "|",
  "｝": "}",
  "～": "~",
};
const zenRegex = new RegExp(
  "(" + Object.keys(zenToHanMap).join("|") + ")",
  "g"
);

const hanToZenMap: { [key: string]: string } = {
  " ": "　",
  "0": "０",
  "1": "１",
  "2": "２",
  "3": "３",
  "4": "４",
  "5": "５",
  "6": "６",
  "7": "７",
  "8": "８",
  "9": "９",
  a: "ａ",
  b: "ｂ",
  c: "ｃ",
  d: "ｄ",
  e: "ｅ",
  f: "ｆ",
  g: "ｇ",
  h: "ｈ",
  i: "ｉ",
  j: "ｊ",
  k: "ｋ",
  l: "ｌ",
  m: "ｍ",
  n: "ｎ",
  o: "ｏ",
  p: "ｐ",
  q: "ｑ",
  r: "ｒ",
  s: "ｓ",
  t: "ｔ",
  u: "ｕ",
  v: "ｖ",
  w: "ｗ",
  x: "ｘ",
  y: "ｙ",
  z: "ｚ",
  A: "Ａ",
  B: "Ｂ",
  C: "Ｃ",
  D: "Ｄ",
  E: "Ｅ",
  F: "Ｆ",
  G: "Ｇ",
  H: "Ｈ",
  I: "Ｉ",
  J: "Ｊ",
  K: "Ｋ",
  L: "Ｌ",
  M: "Ｍ",
  N: "Ｎ",
  O: "Ｏ",
  P: "Ｐ",
  Q: "Ｑ",
  R: "Ｒ",
  S: "Ｓ",
  T: "Ｔ",
  U: "Ｕ",
  V: "Ｖ",
  W: "Ｗ",
  X: "Ｘ",
  Y: "Ｙ",
  Z: "Ｚ",
};

const hanRegex = new RegExp(
  "(" +
    Object.keys(hanToZenMap)
      // eslint-disable-next-line
      .map((k) => k.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
      .join("|") +
    ")",
  "g"
);

function hiraToKata(str: string): string {
  if (!str) return "";
  return str.replace(/[\u3041-\u3096]/g, (match) => {
    return String.fromCharCode(match.charCodeAt(0) + 0x60);
  });
}

function formatKanaFullWidth(value: string): string {
  if (!value) return "";
  let normalized = value.normalize("NFKC");
  let fullWidth = normalized.replace(hanRegex, (m) => hanToZenMap[m] || m);
  return fullWidth;
}

function formatToHalfWidth(value: string): string {
  if (!value) return "";
  let kata = hiraToKata(value);
  return kata.replace(zenRegex, (m) => zenToHanMap[m] || m);
}

function formatHalfWidthAlphaNum(value: string): string {
  if (!value) return "";
  let kata = hiraToKata(value);
  let halfWidth = kata.replace(zenRegex, (m) => zenToHanMap[m] || m);
  return halfWidth.replace(/[^\x20-\x7E]/g, "");
}

function formatHalfWidthKana(value: string): string {
  if (!value) return "";
  let kata = hiraToKata(value);
  let halfWidth = kata.replace(zenRegex, (m) => zenToHanMap[m] || m);
  return halfWidth.replace(/[^\uFF61-\uFF9F]/g, "");
}

interface JapaneseInputProps extends Omit<InputProps, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  formatter: (value: string) => string;
}

// --- 🔽 THAY ĐỔI COMPONENT NÀY ---
const BaseJapaneseInput = forwardRef<InputRef, JapaneseInputProps>(
  ({ value, onChange, formatter, onKeyDown, ...props }, ref) => {
    // 1. Tách 'onKeyDown' ra khỏi props
    const [internalValue, setInternalValue] = useState(value || "");

    useEffect(() => {
      if (value !== internalValue) {
        setInternalValue(value || "");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value; // Lấy giá trị mới
      setInternalValue(newValue); // Cập nhật state nội bộ

      if (onChange) {
        onChange(newValue); // <-- THÊM DÒNG NÀY: Báo cho component cha (MainBusinessScreen) ngay lập tức
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const formattedValue = formatter(internalValue);
      setInternalValue(formattedValue);

      if (onChange) {
        onChange(formattedValue); // <-- Giữ nguyên dòng này để xử lý padding (ví dụ: '1' -> '001')
      }
    };

    // 2. Tạo hàm handleKeyDown mới
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // 3. Xử lý phím Escape
      if (e.key === "Escape") {
        e.preventDefault(); // Ngăn hành vi mặc định (ví dụ: đóng modal)
        setInternalValue(""); // Xóa giá trị nội bộ
        if (onChange) {
          onChange(""); // Cập nhật state của component cha
        }
      }

      // 4. Gọi hàm onKeyDown gốc (nếu có)
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    return (
      <Input
        ref={ref}
        {...props}
        value={internalValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown} // 5. Sử dụng hàm mới
      />
    );
  }
);

type ExportInputProps = Omit<JapaneseInputProps, "formatter">;

export const KanaFullWidthInput = forwardRef<InputRef, ExportInputProps>(
  (props, ref) => {
    return (
      <BaseJapaneseInput formatter={formatKanaFullWidth} {...props} ref={ref} />
    );
  }
);

export const HalfWidthInput = forwardRef<InputRef, ExportInputProps>(
  (props, ref) => {
    return (
      <BaseJapaneseInput formatter={formatToHalfWidth} {...props} ref={ref} />
    );
  }
);

// allowDecimal={true}
export const HalfWidthNumberInput = forwardRef<
  InputRef,
  HalfWidthNumberInputProps
>((props, ref) => {
  const { maxLength, onFocus, allowDecimal, ...restProps } = props;

  const numberFormatter = (value: string): string => {
    if (!value) return "";

    let normalized = value.normalize("NFKC");

    if (allowDecimal) {
      let cleaned = normalized.replace(/[^0-9.]/g, "");
      const parts = cleaned.split(".");
      if (parts.length > 2) {
        cleaned = parts[0] + "." + parts.slice(1).join("");
      }
      return cleaned;
    } else {
      let cleanedValue = normalized.replace(/[^0-9]/g, "");
      if (maxLength && cleanedValue) {
        cleanedValue = cleanedValue.padStart(maxLength, "0");
      }
      return cleanedValue;
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.target;
    setTimeout(() => {
      target.select();
    }, 0);

    if (onFocus) {
      onFocus(e);
    }
  };

  return (
    <BaseJapaneseInput
      formatter={numberFormatter}
      maxLength={maxLength}
      onFocus={handleFocus}
      {...restProps}
      ref={ref}
    />
  );
});

export const HalfWidthAlphaNumInput = forwardRef<InputRef, ExportInputProps>(
  (props, ref) => {
    return (
      <BaseJapaneseInput
        formatter={formatHalfWidthAlphaNum}
        {...props}
        ref={ref}
      />
    );
  }
);

export const HalfWidthKanaInput = forwardRef<InputRef, ExportInputProps>(
  (props, ref) => {
    return (
      <BaseJapaneseInput formatter={formatHalfWidthKana} {...props} ref={ref} />
    );
  }
);
