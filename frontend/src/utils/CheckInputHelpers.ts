import { ChangeEvent, KeyboardEvent as ReactKeyboardEvent } from "react";

// Function to handle half-width katakana input only
export const handleHalfWidthKatakanaInput = (
  e: ChangeEvent<HTMLInputElement>
) => {
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

// Interface for code options
export interface CodeOption {
  code: string;
  label: string;
}

// Handling when changing values ​​in textbox(code) and pull-down
export const handleCodeKeyDown = (
  e: ReactKeyboardEvent<HTMLInputElement>,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  codeOptions: CodeOption[]
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
