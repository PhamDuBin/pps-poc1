/**
 * @param e
 * @param index
 * @param inputs
 * @param radios
 */
export function handleDigitInput(
  e: Event,
  index: number,
  inputs: HTMLElement[]
): void {
  const target = e.target as HTMLInputElement;
  const value = target.value;

  // Only one numeric character is allowed
  if (!/^\d$/.test(value)) {
    target.value = "";
  } else if (index < inputs.length - 1) {
    // Auto focus
    inputs[index + 1].focus();
  }
}

export const handleNavigationKey = (
  e: KeyboardEvent,
  index: number,
  inputs: HTMLElement[]
) => {
  const input = inputs[index];
  const key = e.key;

  // if (["Tab", "Enter", "ArrowDown", "ArrowRight"].includes(key)) {
  if (["Tab", "ArrowDown", "ArrowRight"].includes(key)) {
    e.preventDefault();
    if (
      input instanceof HTMLInputElement ||
      input instanceof HTMLTextAreaElement
    ) {
      const el = input;
      if ((e as any).isComposing) return;

      let isComposing = false;
      const handler = () => {
        if (!isComposing) {
          const nextIndex = index + 1;
          if (nextIndex < inputs.length) inputs[nextIndex].focus();
          el.removeEventListener("compositionend", handler);
        }
      };

      el.addEventListener("compositionend", handler);
      if (!isComposing) {
        const nextIndex = index + 1;
        if (nextIndex < inputs.length) inputs[nextIndex].focus();
      }
    } else {
      const nextIndex = index + 1;
      if (nextIndex < inputs.length) inputs[nextIndex].focus();
    }
  } else if (["ArrowUp", "ArrowLeft"].includes(key)) {
    e.preventDefault();
    const prevIndex = index - 1;
    if (prevIndex >= 0) inputs[prevIndex].focus();
  }
};

export function handleRadioNavigation(
  e: KeyboardEvent,
  index: number,
  radios: HTMLInputElement[]
): void {
  const focusAndClick = (i: number): void => {
    if (radios[i]) {
      radios[i].focus();
      radios[i].click();
    }
  };

  switch (e.key) {
    case "ArrowRight":
    case "ArrowDown":
      e.preventDefault();
      if (index < radios.length - 1) {
        focusAndClick(index + 1);
      }
      break;
    case "ArrowLeft":
    case "ArrowUp":
      e.preventDefault();
      if (index > 0) {
        focusAndClick(index - 1);
      }
      break;
    case "Tab":
    case "Enter":
      e.preventDefault();
      const currentRadio = radios[index];
      if (!currentRadio) return;
      const parentForm = currentRadio.closest("form") || document;

      // Find and focus on the next element based on the class of the radio container
      let nextElement: HTMLElement | null = null;
      if (currentRadio.closest(".radio2-group")) {
        nextElement = parentForm.querySelector<HTMLTextAreaElement>(
          ".textarea-after-radio2"
        );
      } else if (currentRadio.closest(".radio1-group")) {
        nextElement =
          parentForm.querySelector<HTMLInputElement>(".after-radio1");
      } else if (currentRadio.closest(".radio-group")) {
        nextElement =
          parentForm.querySelector<HTMLInputElement>(".after-radio");
      }

      nextElement?.focus();
      break;
  }
}

export const handleInputToRadio = (
  e: KeyboardEvent,
  radios: HTMLInputElement[]
): void => {
  const keys = ["Tab", "Enter", "ArrowDown", "ArrowRight"];
  if (keys.includes(e.key)) {
    e.preventDefault();
    const firstRadio = radios[0];
    if (firstRadio) {
      firstRadio.focus();
      firstRadio.click();
    }
  }
};

export const toHalfWidth = (str: string): string => {
  return str

    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) =>
      String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    )
    .replace(/[！-～]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
    .replace(/　/g, " ")

    .replace(/[\u30A1-\u30F6]/g, (char) => {
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
      };
      return kanaMap[char] || char;
    });
};

export const extractHalfWidthDigits = (str: string): string =>
  str
    .replace(/[０-９]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0))
    .replace(/[^0-9]/g, "");

export const convertToHalfWidthAndRemoveKana = (str: string): string =>
  str
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (ch) =>
      String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
    )
    .replace(/[！-～]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0))
    .replace(/　/g, " ")
    .replace(/[\u3040-\u309F\u30A0-\u30FF\uFF66-\uFF9F]/g, "")
    .trim();

export const convertToFullWidth = (str: string): string => {
  return (
    str
      // Chữ cái/số
      .replace(/[A-Za-z0-9]/g, (ch) =>
        String.fromCharCode(ch.charCodeAt(0) + 0xfee0)
      )
      .replace(/ /g, "　")

      // Katakana half-width → full-width
      .replace(/[ｱ-ﾝﾞﾟ]/g, (char) => {
        const kanaMap: { [key: string]: string } = {
          ｱ: "ア",
          ｲ: "イ",
          ｳ: "ウ",
          ｴ: "エ",
          ｵ: "オ",
          ｶ: "カ",
          ｷ: "キ",
          ｸ: "ク",
          ｹ: "ケ",
          ｺ: "コ",
          ｻ: "サ",
          ｼ: "シ",
          ｽ: "ス",
          ｾ: "セ",
          ｿ: "ソ",
          ﾀ: "タ",
          ﾁ: "チ",
          ﾂ: "ツ",
          ﾃ: "テ",
          ﾄ: "ト",
          ﾅ: "ナ",
          ﾆ: "ニ",
          ﾇ: "ヌ",
          ﾈ: "ネ",
          ﾉ: "ノ",
          ﾊ: "ハ",
          ﾋ: "ヒ",
          ﾌ: "フ",
          ﾍ: "ヘ",
          ﾎ: "ホ",
          ﾏ: "マ",
          ﾐ: "ミ",
          ﾑ: "ム",
          ﾒ: "メ",
          ﾓ: "モ",
          ﾔ: "ヤ",
          ﾕ: "ユ",
          ﾖ: "ヨ",
          ﾗ: "ラ",
          ﾘ: "リ",
          ﾙ: "ル",
          ﾚ: "レ",
          ﾛ: "ロ",
          ﾜ: "ワ",
          ｦ: "ヲ",
          ﾝ: "ン",
          ｬ: "ャ",
          ｭ: "ュ",
          ｮ: "ョ",
          ｯ: "ッ",
          ｳﾞ: "ヴ",
          ﾞ: "゛",
          ﾟ: "゜",
        };
        return kanaMap[char] || char;
      })
  );
};

export const removeAllWhitespace = (str: string): string =>
  str.replace(/[\s\r\n\t]/g, "");
