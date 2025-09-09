// src/utils/useArrowNavigation.ts
import { useEffect, RefObject } from "react";
import { handleNavigationKey } from "./InputHandlers"; // Giả sử file này có tồn tại

export const useArrowNavigation = (
  containerRef: RefObject<HTMLElement | null>
) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Chỉ xử lý các phím mũi tên
      if (
        !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
      ) {
        return;
      }

      // GHI CHÚ: Chỉ tìm các phần tử trong container của component này
      const focusableElements = Array.from(
        container.querySelectorAll<HTMLElement>(
          'input, button, [role="button"], select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null); // Lọc các phần tử đang hiển thị

      const activeElement = document.activeElement as HTMLElement;

      // Chỉ xử lý nếu phần tử đang được focus nằm trong container này
      if (container.contains(activeElement)) {
        const currentIndex = focusableElements.indexOf(activeElement);
        if (currentIndex !== -1) {
          // Ngăn hành vi mặc định của phím mũi tên (như cuộn trang)
          e.preventDefault();
          handleNavigationKey(e, currentIndex, focusableElements);
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [containerRef]);
};
