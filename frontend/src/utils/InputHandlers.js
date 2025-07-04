// utils/inputHandlers.js hoặc trong cùng file
export function handleDigitInput(e, index, inputs) {
  const value = e.target.value;
  if (!/^\d$/.test(value)) {
    e.target.value = "";
  } else if (index < inputs.length - 1) {
    inputs[index + 1].focus();
  }
}

export function handleNavigationKey(e, index, inputs) {
  switch (e.key) {
    case "ArrowDown":
    case "Tab":
    case "Enter":
      e.preventDefault();
      if (index < inputs.length - 1) inputs[index + 1].focus();
      break;
    case "ArrowUp":
      e.preventDefault();
      if (index > 0) inputs[index - 1].focus();
      break;
    case "ArrowRight":
      if (e.target.selectionEnd === e.target.value.length) {
        if (index < inputs.length - 1) inputs[index + 1].focus();
      }
      break;
    case "ArrowLeft":
      if (e.target.selectionStart === 0) {
        if (index > 0) inputs[index - 1].focus();
      }
      break;
    case "Escape":
      e.preventDefault();
      e.target.value = "";
      break;
  }
}

export function handleRadioGroupNavigation(e, index, radios) {
  const isHorizontal = e.target.closest('[data-orientation="horizontal"]');
  const isVertical = !isHorizontal;

  const nextIndex = () => {
    if (index < radios.length - 1) radios[index + 1].focus();
  };

  const prevIndex = () => {
    if (index > 0) radios[index - 1].focus();
  };

  switch (e.key) {
    case "ArrowLeft":
      e.preventDefault();
      prevIndex();
      break;
    case "ArrowRight":
      e.preventDefault();
      nextIndex();
      break;
    case "ArrowUp":
      e.preventDefault();
      if (isVertical) prevIndex();
      break;
    case "ArrowDown":
      e.preventDefault();
      if (isVertical) nextIndex();
      break;
    case "Enter":
    case "Tab":
      nextIndex();
      break;
  }
}

export function handleRadioNavigation(e, index, radios) {
  const focusAndClick = (i) => {
    radios[i].focus();
    radios[i].click();
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

      // ✅ Nếu thuộc radio2-group → focus textarea
      if (currentRadio.closest(".radio2-group")) {
        const textarea = document.querySelector(".textarea-after-radio2");
        if (textarea) textarea.focus();

        // ✅ Nếu thuộc radio1-group → focus input sau radio1
      } else if (currentRadio.closest(".radio1-group")) {
        const input = document.querySelector(".after-radio1");
        if (input) input.focus();

        // ✅ Nếu thuộc radio-group (khác) → focus input sau
      } else if (currentRadio.closest(".radio-group")) {
        const input = document.querySelector(".after-radio");
        if (input) input.focus();
      }

      break;
  }
}

export const handleInputToRadio = (e, radios) => {
  const keys = ["Tab", "Enter", "ArrowDown", "ArrowRight"];
  if (keys.includes(e.key)) {
    e.preventDefault();
    const firstRadio = radios[0];
    if (firstRadio) {
      firstRadio.focus();
      firstRadio.click(); // chọn radio đầu tiên
    }
  }
};
