import React, { useState, useEffect, forwardRef } from "react";
import { Input } from "antd";
import type { InputProps, InputRef } from "antd";

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

function hiraToKata(str: string): string {
  if (!str) return "";
  return str.replace(/[\u3041-\u3096]/g, (match) => {
    return String.fromCharCode(match.charCodeAt(0) + 0x60);
  });
}

function formatKanaFullWidth(value: string): string {
  if (!value) return "";
  let kata = hiraToKata(value);
  let normalized = kata.normalize("NFKC");
  return normalized.replace(/[^\u30A0-\u30FF\u30FC]/g, "");
}

function formatToHalfWidth(value: string): string {
  if (!value) return "";
  let kata = hiraToKata(value);
  return kata.replace(zenRegex, (m) => zenToHanMap[m] || m);
}

function formatHalfWidthNumber(value: string): string {
  if (!value) return "";
  let normalized = value.normalize("NFKC");
  return normalized.replace(/[^0-9]/g, "");
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

const BaseJapaneseInput = forwardRef<InputRef, JapaneseInputProps>(
  ({ value, onChange, formatter, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(value || "");

    useEffect(() => {
      if (value !== internalValue) {
        setInternalValue(value || "");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const formattedValue = formatter(internalValue);
      setInternalValue(formattedValue);

      if (onChange) {
        onChange(formattedValue);
      }
    };

    return (
      <Input
        ref={ref}
        {...props}
        value={internalValue}
        onChange={handleChange}
        onBlur={handleBlur}
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

export const HalfWidthNumberInput = forwardRef<InputRef, ExportInputProps>(
  (props, ref) => {
    return (
      <BaseJapaneseInput
        formatter={formatHalfWidthNumber}
        {...props}
        ref={ref}
      />
    );
  }
);

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
