import React from "react";

/**
 * Keyboard handler for native HTML select elements
 * Handles Space/Enter to open dropdown and prevents event propagation
 */
export const handleSelectKeyDown = (
  e: React.KeyboardEvent<HTMLSelectElement>
) => {
  const select = e.currentTarget;

  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    e.stopPropagation();
    // Trigger click to open/close dropdown
    select.click();
  } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    // Allow default arrow behavior but stop propagation
    e.stopPropagation();
  }
};
