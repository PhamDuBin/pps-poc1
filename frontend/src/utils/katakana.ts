/**
 * Convert half-width Katakana to full-width Katakana
 * @param char - Single character to convert
 * @returns Full-width Katakana character or original char
 */
const convertHalfWidthToFullWidth = (char: string): string => {
  const halfWidthKatakana = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｬｭｮｯ';
  const fullWidthKatakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォャュョッ';

  const index = halfWidthKatakana.indexOf(char);
  if (index !== -1) {
    return fullWidthKatakana[index];
  }

  // Handle voiced marks (゛) and semi-voiced marks (゜)
  const voicedMark = 'ﾞ';
  const semiVoicedMark = 'ﾟ';

  if (char === voicedMark) return '゛';
  if (char === semiVoicedMark) return '゜';

  return char;
};

/**
 * Check if a character is full-width Katakana
 * @param char - Character to check
 * @returns true if character is full-width Katakana
 */
const isFullWidthKatakana = (char: string): boolean => {
  const code = char.charCodeAt(0);
  // Full-width Katakana range: U+30A0 to U+30FF
  // Includes: ァ-ヺ, ー, ・, ヽ, ヾ
  return (code >= 0x30A0 && code <= 0x30FF);
};

/**
 * Process input to filter non-Katakana and convert half-width to full-width
 * @param input - Input string to process
 * @returns Processed string with only full-width Katakana
 */
export const processKatakanaInput = (input: string): string => {
  let result = '';
  let i = 0;

  while (i < input.length) {
    const char = input[i];
    const nextChar = input[i + 1];

    // Convert half-width Katakana to full-width
    const converted = convertHalfWidthToFullWidth(char);

    // Check if current char is half-width Katakana base and next is voiced/semi-voiced mark
    if (nextChar === 'ﾞ' || nextChar === 'ﾟ') {
      const baseConverted = convertHalfWidthToFullWidth(char);
      const markConverted = convertHalfWidthToFullWidth(nextChar);

      // Combine base character with voiced mark
      const combined = baseConverted + markConverted;
      // Normalize to get combined character (e.g., カ + ゛ = ガ)
      const normalized = combined.normalize('NFC');

      if (isFullWidthKatakana(normalized)) {
        result += normalized;
        i += 2; // Skip both characters
        continue;
      }
    }

    // If already full-width Katakana, keep it
    if (isFullWidthKatakana(converted)) {
      result += converted;
    } else if (isFullWidthKatakana(char)) {
      result += char;
    }
    // Otherwise, skip the character (filter it out)

    i++;
  }

  return result;
};
