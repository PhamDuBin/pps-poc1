import { useEffect, useRef } from "react";

export function useScreenNavigation<T extends HTMLElement>(
  onSwitchScreen: (direction: "next" | "prev") => void,
  focusFirstElement: boolean = true
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (container.tabIndex === -1) {
      container.setAttribute("tabindex", "-1");
    }

    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(
        "button, input:not([disabled]), textarea, select, [tabindex]:not([tabindex='-1'])"
      )
    );

    if (focusFirstElement && focusable.length > 0) {
      focusable[0].focus();
    } else {
    }

    const handleKeyDown = (e: KeyboardEvent) => {
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
