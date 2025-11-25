/**
 * @param e
 * @param index
 * @param inputs
 * @param radios
 */

import { KeyboardEvent as ReactKeyboardEvent } from "react";

export const handleNavigationKey = (
  e: KeyboardEvent,
  currentIndex: number,
  focusableElements: HTMLElement[]
) => {
  const keysToHandle = [
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Enter",
  ];

  const activeElement = e.target as HTMLElement;

  // ... (Logic xử lý Space và KeyC giữ nguyên) ...
  if (e.code === "Space") {
    const tagName = activeElement?.tagName.toUpperCase();
    const isInput = tagName === "INPUT";
    const isTextArea = tagName === "TEXTAREA";
    const isTextInput =
      ((isInput &&
        activeElement.getAttribute("type") !== "radio" &&
        activeElement.getAttribute("type") !== "checkbox") ||
        isTextArea) &&
      !activeElement?.closest(".ant-select");

    if (isTextInput) return;
    if (activeElement?.closest(".ant-btn")) return;

    if (activeElement?.closest(".ant-select")) {
      if (activeElement?.closest(".ant-select-open")) {
        e.preventDefault();
        e.stopPropagation();
        const activeOption = document.querySelector(
          ".ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item-option-active"
        ) as HTMLElement;
        if (activeOption) {
          activeOption.click();
        }
      }
      return;
    }

    if (isInput && (activeElement as HTMLInputElement).type === "checkbox") {
      e.preventDefault();
      activeElement.click();
      return;
    }

    e.preventDefault();
    return;
  }

  if (e.code === "KeyC") {
    const tagName = activeElement?.tagName.toUpperCase();
    const isInput = tagName === "INPUT";
    const isTextArea = tagName === "TEXTAREA";
    const isTextInput =
      ((isInput &&
        activeElement.getAttribute("type") !== "radio" &&
        activeElement.getAttribute("type") !== "checkbox") ||
        isTextArea) &&
      !activeElement?.closest(".ant-select");

    if (isTextInput) return;

    const checkboxGroup = activeElement?.closest(
      ".ant-checkbox-group-navigable"
    );
    if (checkboxGroup) {
      e.preventDefault();
      e.stopPropagation();
      activeElement.click();
      return;
    }
  }

  if (e.key === "Enter") {
    const tagName = activeElement?.tagName.toUpperCase();
    if (tagName === "BUTTON") {
      return;
    }
  }

  if (!keysToHandle.includes(e.key)) {
    return;
  }

  if (activeElement?.closest(".ant-select-open")) return;
  if (activeElement?.closest(".ant-btn") && e.key === "Enter") return;

  if (activeElement?.closest(".ant-select")) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (e.key === "Enter") {
      return;
    }
  }
  const tagName = activeElement?.tagName.toUpperCase();
  const isInput = tagName === "INPUT";
  const isTextArea = tagName === "TEXTAREA";
  const isTextInput2 =
    ((isInput &&
      activeElement.getAttribute("type") !== "radio" &&
      activeElement.getAttribute("type") !== "checkbox") ||
      isTextArea) &&
    !activeElement?.closest(".ant-select");
  if (isTextInput2 && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
    return;
  }

  const checkboxGroup = activeElement?.closest(".ant-checkbox-group-navigable");
  const radioGroup = activeElement?.closest(".ant-radio-group");

  if (checkboxGroup) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      e.stopPropagation();
      const checkboxes = Array.from(
        checkboxGroup.querySelectorAll('input[type="checkbox"]:not([disabled])')
      ) as HTMLInputElement[];
      let currentCheckboxIndex = checkboxes.findIndex(
        (cb) => cb === activeElement
      );
      if (currentCheckboxIndex === -1) currentCheckboxIndex = 0;
      const totalCheckboxes = checkboxes.length;
      let nextCheckboxIndex;
      if (e.key === "ArrowRight")
        nextCheckboxIndex = (currentCheckboxIndex + 1) % totalCheckboxes;
      else
        nextCheckboxIndex =
          (currentCheckboxIndex - 1 + totalCheckboxes) % totalCheckboxes;
      checkboxes[nextCheckboxIndex]?.focus();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      activeElement.click();
      return;
    }
  }
  if (radioGroup) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      e.stopPropagation();
      const radios = Array.from(
        radioGroup.querySelectorAll('input[type="radio"]')
      ) as HTMLInputElement[];
      let currentRadioIndex = radios.findIndex((r) => r === activeElement);
      if (currentRadioIndex === -1) currentRadioIndex = 0;
      const totalRadios = radios.length;
      let nextRadioIndex;
      if (e.key === "ArrowRight")
        nextRadioIndex = (currentRadioIndex + 1) % totalRadios;
      else nextRadioIndex = (currentRadioIndex - 1 + totalRadios) % totalRadios;
      const nextRadio = radios[nextRadioIndex];
      if (nextRadio) {
        nextRadio.focus();
        nextRadio.click();
      }
      return;
    }
  }

  if (activeElement?.closest(".advance-search-modal")) return;
  if (activeElement?.closest('[role="dialog"]')) return;
  if (activeElement?.closest(".modal")) return;
  if (activeElement?.closest(".personnel-search-modal-root")) return;

  if (activeElement?.tagName === "TR") return;
  if (
    e.key === "ArrowRight" &&
    activeElement?.classList.contains("sale-slip-row")
  ) {
    return;
  }

  e.preventDefault();
  e.stopPropagation();

  let validCurrentIndex = currentIndex;
  if (validCurrentIndex === -1 && activeElement) {
    validCurrentIndex = focusableElements.indexOf(activeElement);
  }
  if (validCurrentIndex === -1) {
    if (checkboxGroup) {
      const firstCheckbox = checkboxGroup.querySelector(
        'input[type="checkbox"]'
      ) as HTMLElement;
      validCurrentIndex = focusableElements.indexOf(firstCheckbox);
    } else if (radioGroup) {
      const representativeRadio = focusableElements.find(
        (el) => el.closest(".ant-radio-group") === radioGroup
      );
      if (representativeRadio)
        validCurrentIndex = focusableElements.indexOf(representativeRadio);
    }
  }
  if (validCurrentIndex === -1) return;

  let nextIndex = validCurrentIndex;
  const total = focusableElements.length;

  if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "Enter") {
    let step = 1;
    const codeInputSelect = activeElement?.closest(".code-input-select");
    const isCodeInput = codeInputSelect && activeElement.tagName === "INPUT";
    if (isCodeInput && (e.key === "ArrowDown" || e.key === "Enter")) {
      step = 2;
    }
    nextIndex = (validCurrentIndex + step) % total;
  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    let step = 1;
    let potentialNextIndex = (validCurrentIndex - 1 + total) % total;
    const nextElement = focusableElements[potentialNextIndex];
    const nextElementIsCodeSelect =
      nextElement?.closest(".code-input-select") &&
      !!nextElement?.closest(".ant-select");

    if (nextElementIsCodeSelect) {
      step = 2;
    }
    nextIndex = (validCurrentIndex - step + total) % total;
  }

  if (focusableElements[nextIndex]) {
    focusableElements[nextIndex].focus();
  }
};

export const handleNavigationKey040504 = (
  e: KeyboardEvent,
  currentIndex: number,
  focusableElements: HTMLElement[]
) => {
  const keysToHandle = [
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Enter",
  ];

  const activeElement = e.target as HTMLElement;

  if (e.code === "Space") {
    const tagName = activeElement?.tagName.toUpperCase();
    const isInput = tagName === "INPUT";
    const isTextArea = tagName === "TEXTAREA";
    const isTextInput =
      ((isInput &&
        activeElement.getAttribute("type") !== "radio" &&
        activeElement.getAttribute("type") !== "checkbox") ||
        isTextArea) &&
      !activeElement?.closest(".ant-select");

    if (isTextInput) return;
    if (activeElement?.closest(".ant-btn")) return;

    if (activeElement?.closest(".ant-select")) {
      if (activeElement?.closest(".ant-select-open")) {
        e.preventDefault();
        e.stopPropagation();
        const activeOption = document.querySelector(
          ".ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item-option-active"
        ) as HTMLElement;
        if (activeOption) {
          activeOption.click();
        }
      }
      return;
    }

    if (isInput && (activeElement as HTMLInputElement).type === "checkbox") {
      e.preventDefault();
      activeElement.click();
      return;
    }

    e.preventDefault();
    return;
  }

  if (e.code === "KeyC") {
    const tagName = activeElement?.tagName.toUpperCase();
    const isInput = tagName === "INPUT";
    const isTextArea = tagName === "TEXTAREA";
    const isTextInput =
      ((isInput &&
        activeElement.getAttribute("type") !== "radio" &&
        activeElement.getAttribute("type") !== "checkbox") ||
        isTextArea) &&
      !activeElement?.closest(".ant-select");

    if (isTextInput) return;

    const checkboxGroup = activeElement?.closest(
      ".ant-checkbox-group-navigable"
    );
    if (checkboxGroup) {
      e.preventDefault();
      e.stopPropagation();
      activeElement.click();
      return;
    }
  }

  if (e.key === "Enter") {
    const tagName = activeElement?.tagName.toUpperCase();
    if (tagName === "BUTTON") {
      return;
    }
  }

  if (!keysToHandle.includes(e.key)) {
    return;
  }

  if (activeElement?.closest(".ant-select-open")) return;
  if (activeElement?.closest(".ant-btn") && e.key === "Enter") return;

  if (activeElement?.closest(".ant-select")) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (e.key === "Enter") {
      return;
    }
  }
  const tagName = activeElement?.tagName.toUpperCase();
  const isInput = tagName === "INPUT";
  const isTextArea = tagName === "TEXTAREA";
  const isTextInput2 =
    ((isInput &&
      activeElement.getAttribute("type") !== "radio" &&
      activeElement.getAttribute("type") !== "checkbox") ||
      isTextArea) &&
    !activeElement?.closest(".ant-select");
  if (isTextInput2 && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
    return;
  }

  const checkboxGroup = activeElement?.closest(".ant-checkbox-group-navigable");
  const radioGroup = activeElement?.closest(".ant-radio-group");

  if (checkboxGroup) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      e.stopPropagation();
      const checkboxes = Array.from(
        checkboxGroup.querySelectorAll('input[type="checkbox"]:not([disabled])')
      ) as HTMLInputElement[];
      let currentCheckboxIndex = checkboxes.findIndex(
        (cb) => cb === activeElement
      );
      if (currentCheckboxIndex === -1) currentCheckboxIndex = 0;
      const totalCheckboxes = checkboxes.length;
      let nextCheckboxIndex;
      if (e.key === "ArrowRight")
        nextCheckboxIndex = (currentCheckboxIndex + 1) % totalCheckboxes;
      else
        nextCheckboxIndex =
          (currentCheckboxIndex - 1 + totalCheckboxes) % totalCheckboxes;
      checkboxes[nextCheckboxIndex]?.focus();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      activeElement.click();
      return;
    }
  }
  if (radioGroup) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      e.stopPropagation();
      const radios = Array.from(
        radioGroup.querySelectorAll('input[type="radio"]')
      ) as HTMLInputElement[];
      let currentRadioIndex = radios.findIndex((r) => r === activeElement);
      if (currentRadioIndex === -1) currentRadioIndex = 0;
      const totalRadios = radios.length;
      let nextRadioIndex;
      if (e.key === "ArrowRight")
        nextRadioIndex = (currentRadioIndex + 1) % totalRadios;
      else nextRadioIndex = (currentRadioIndex - 1 + totalRadios) % totalRadios;
      const nextRadio = radios[nextRadioIndex];
      if (nextRadio) {
        nextRadio.focus();
        nextRadio.click();
      }
      return;
    }
  }

  if (activeElement?.closest(".advance-search-modal")) return;
  if (activeElement?.closest('[role="dialog"]')) return;
  if (activeElement?.closest(".modal")) return;
  if (activeElement?.closest(".personnel-search-modal-root")) return;

  e.preventDefault();
  e.stopPropagation();

  let validCurrentIndex = currentIndex;
  if (validCurrentIndex === -1) {
    if (checkboxGroup) {
      const firstCheckbox = checkboxGroup.querySelector(
        'input[type="checkbox"]'
      ) as HTMLElement;
      validCurrentIndex = focusableElements.indexOf(firstCheckbox);
    } else if (radioGroup) {
      const representativeRadio = focusableElements.find(
        (el) => el.closest(".ant-radio-group") === radioGroup
      );
      if (representativeRadio)
        validCurrentIndex = focusableElements.indexOf(representativeRadio);
    }
  }
  if (validCurrentIndex === -1) return;

  let nextIndex = validCurrentIndex;
  const total = focusableElements.length;

  if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "Enter") {
    let step = 1;
    const codeInputSelect = activeElement?.closest(".code-input-select");
    const isCodeInput = codeInputSelect && activeElement.tagName === "INPUT";
    if (isCodeInput && (e.key === "ArrowDown" || e.key === "Enter")) {
      step = 2;
    }
    nextIndex = (validCurrentIndex + step) % total;
  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    let step = 1;
    let potentialNextIndex = (validCurrentIndex - 1 + total) % total;
    const nextElement = focusableElements[potentialNextIndex];
    const nextElementIsCodeSelect =
      nextElement?.closest(".code-input-select") &&
      !!nextElement?.closest(".ant-select");

    if (nextElementIsCodeSelect) {
      step = 2;
    }
    nextIndex = (validCurrentIndex - step + total) % total;
  }

  focusableElements[nextIndex]?.focus();
};

export const extractHalfWidthDigits = (str: string): string =>
  str
    .replace(/[０-９]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0))
    .replace(/[^0-9]/g, "");

export const removeAllWhitespace = (str: string): string =>
  str.replace(/[\s\r\n\t]/g, "");

export const handleFormatting = (
  e: ReactKeyboardEvent<HTMLInputElement>,
  formatter: (str: string) => string
): void => {
  if (["Tab", "Enter", "ArrowDown", "ArrowUp"].includes(e.key)) {
    // *** MODIFIED START: Thêm kiểm tra IME ***
    if (e.nativeEvent.isComposing || e.nativeEvent.keyCode === 229) {
      return;
    }
    // *** MODIFIED END ***

    e.preventDefault();
    const input = e.currentTarget;
    input.value = formatter(input.value);
  }
};

export const handleNumericSelectKeyDown = (
  e: React.KeyboardEvent<HTMLSelectElement>,
  setValue: (val: string) => void
) => {
  if (/^[0-9]$/.test(e.key)) {
    e.preventDefault();
    setValue(e.key);
  }
};
export const blockTab = (e: React.KeyboardEvent) => {
  if (e.key === "Tab") {
    e.preventDefault();
  }
};
