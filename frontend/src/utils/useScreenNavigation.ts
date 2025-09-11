// useScreenNavigation.ts

import { useEffect, useRef } from "react";

export function useScreenNavigation<T extends HTMLElement>(
  onSwitchScreen: (direction: "next" | "prev") => void,
  focusFirstElement: boolean = true
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // LOG SỐ 1: KIỂM TRA XEM HOOK ĐÃ GẮN ĐÚNG CHỖ CHƯA
    console.log("useScreenNavigation attached to:", container);

    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(
        "button:not([disabled]):not([tabindex='-1']), input:not([disabled]), textarea, select, [tabindex]:not([tabindex='-1'])"
      )
    );

    // LOG SỐ 2: ĐÂY LÀ DÒNG QUAN TRỌNG NHẤT
    console.log("Found focusable elements:", focusable);

    if (focusFirstElement && focusable.length > 0) {
      // LOG SỐ 3: XEM NÓ ĐANG FOCUS VÀO ĐÂU
      console.log("Attempting to focus first element:", focusable[0]);
      focusable[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // ... phần còn lại của code giữ nguyên
      if (
        focusFirstElement &&
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
      ) {
        e.preventDefault();
        if (focusable.length === 0) return;
        const currentIndex = focusable.findIndex(
          (el) => el === document.activeElement
        );
        let nextIndex = currentIndex;

        if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          nextIndex = (currentIndex - 1 + focusable.length) % focusable.length;
        } else {
          nextIndex = (currentIndex + 1) % focusable.length;
        }

        focusable[nextIndex]?.focus();
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [onSwitchScreen, focusFirstElement]);

  return containerRef;
}
