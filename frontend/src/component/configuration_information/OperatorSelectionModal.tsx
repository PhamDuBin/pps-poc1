"use client";

import React, { useState, useEffect, useRef } from "react";
import { Transfer, Button } from "antd";
import type { TransferProps } from "antd";
import type { Key } from "react";

interface TransferItem {
  key: string;
  title: string;
}

interface OperatorSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const OperatorSelectionModal: React.FC<OperatorSelectionModalProps> = ({
  isOpen,
  onClose,
  title,
}) => {
  // mock data
  const mockData: TransferItem[] = Array.from({ length: 20 }, (_, i) => ({
    key: (i + 1).toString(),
    title: `事業者${(i + 1).toString().padStart(2, "0")}`,
  }));

  const [targetKeys, setTargetKeys] = useState<Key[]>(
    Array.from({ length: 10 }, (_, i) => (i + 11).toString())
  );
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  const onChange: TransferProps["onChange"] = (
    nextTargetKeys,
    direction,
    moveKeys
  ) => {
    setTargetKeys(nextTargetKeys);

    // Logic Auto-Focus sau khi nhấn nút chuyển
    setTimeout(() => {
      const container = modalRef.current;
      if (!container) return;

      // Lấy cả 2 ô input (Trái và Phải)
      const inputs = container.querySelectorAll(
        ".ant-transfer-list-search .ant-input"
      );

      if (direction === "right") {
        // CASE 1: Vừa nhấn "Thêm" (Items chạy sang phải)
        // -> Focus lại Input bên TRÁI (index 0) để người dùng có thể tìm và thêm tiếp
        (inputs[0] as HTMLElement)?.focus();
      } else if (direction === "left") {
        // CASE 2: Vừa nhấn "Xóa" (Items chạy về trái)
        // -> Focus lại Input bên PHẢI (index 1) để người dùng có thể chọn xóa tiếp
        // (Lưu ý: Nếu bạn muốn xóa xong focus về ô tìm kiếm bên Trái luôn thì sửa thành inputs[0])
        (inputs[1] as HTMLElement)?.focus();
      }
    }, 50); // setTimeout nhỏ để đợi DOM render xong
  };

  const onSelectChange: TransferProps["onSelectChange"] = (
    sourceSelectedKeys,
    targetSelectedKeys
  ) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  useEffect(() => {
    const container = modalRef.current;
    if (!container || !isOpen) return;

    // Focus vào ô input đầu tiên khi mở modal
    setTimeout(() => {
      const firstInput = container.querySelector(
        ".ant-transfer-list-search .ant-input"
      ) as HTMLElement | null;
      firstInput?.focus();
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const code = e.code;
      const activeElement = document.activeElement as HTMLElement;

      // =========================================================
      // 1. LOGIC KHI ĐANG Ở TRONG DANH SÁCH (CHECKBOX ITEMS)
      // =========================================================
      // Kiểm tra xem có đang đứng ở item (dòng) nào không
      const currentItemRow = activeElement.closest(
        ".ant-transfer-list-content-item"
      );

      if (currentItemRow) {
        // --- XỬ LÝ CHECK/UNCHECK ---
        if (code === "KeyC" || code === "Space" || key === "Enter") {
          e.preventDefault();
          e.stopPropagation();
          const checkbox = currentItemRow.querySelector(
            'input[type="checkbox"]'
          ) as HTMLElement;
          checkbox?.click();
          return;
        }

        // --- XỬ LÝ ĐIỀU HƯỚNG ---
        const listContent = currentItemRow.closest(
          ".ant-transfer-list-content"
        );
        if (listContent) {
          const allRows = Array.from(
            listContent.querySelectorAll(".ant-transfer-list-content-item")
          ) as HTMLElement[];
          const currentIndex = allRows.indexOf(currentItemRow as HTMLElement);

          // TRÁI / PHẢI: Di chuyển giữa các checkbox trong list
          if (key === "ArrowLeft" || key === "ArrowRight") {
            e.preventDefault();
            e.stopPropagation();

            let nextIndex = currentIndex;
            if (key === "ArrowRight") {
              // Sang item tiếp theo, nếu hết thì dừng ở cuối (hoặc vòng về đầu tuỳ bạn, ở đây mình để dừng)
              if (currentIndex < allRows.length - 1) nextIndex++;
            } else {
              // Về item trước đó
              if (currentIndex > 0) nextIndex--;
            }

            const nextRow = allRows[nextIndex];
            const nextInput = nextRow.querySelector(
              'input[type="checkbox"]'
            ) as HTMLElement;
            nextInput?.focus();
            return;
          }

          // LÊN (ArrowUp): Thoát khỏi list -> Lên ô Input Search
          if (key === "ArrowUp") {
            e.preventDefault();
            e.stopPropagation();

            const currentColumn = listContent.closest(".ant-transfer-list");
            const searchInput = currentColumn?.querySelector(
              ".ant-transfer-list-search .ant-input"
            ) as HTMLElement;
            searchInput?.focus();
            return;
          }

          // XUỐNG (ArrowDown): Thoát khỏi list -> Xuống Button bên dưới
          if (key === "ArrowDown") {
            e.preventDefault();
            e.stopPropagation();

            // Lấy tất cả phần tử focus được trong modal
            const allFocusables = Array.from(
              container.querySelectorAll(
                'input:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
              )
            ) as HTMLElement[];

            // Tìm phần tử focusable đầu tiên KHÔNG nằm trong danh sách hiện tại
            // (Nghĩa là bỏ qua toàn bộ các checkbox còn lại bên dưới)
            const currentListContainer =
              listContent.closest(".ant-transfer-list");

            let nextFocusableOutside: HTMLElement | null = null;
            let foundCurrent = false;

            for (const el of allFocusables) {
              // Đánh dấu khi duyệt qua phần tử hiện tại
              if (
                el === activeElement ||
                el.closest(".ant-transfer-list-content-item") === currentItemRow
              ) {
                foundCurrent = true;
                continue;
              }

              // Chỉ bắt đầu tìm SAU KHI đã qua phần tử hiện tại
              if (foundCurrent) {
                // Nếu phần tử này KHÔNG nằm trong cùng cái List Container hiện tại -> Nó chính là Button ở dưới
                if (!currentListContainer?.contains(el)) {
                  nextFocusableOutside = el;
                  break;
                }
              }
            }

            nextFocusableOutside?.focus();
            return;
          }
        }
      }

      // =========================================================
      // 2. LOGIC KHI ĐANG Ở Ô INPUT SEARCH
      // =========================================================
      if (activeElement.matches(".ant-transfer-list-search .ant-input")) {
        // Trái/Phải: Di chuyển con trỏ chữ (Mặc định)
        if (key === "ArrowLeft" || key === "ArrowRight") return;

        // Xuống: Nhảy vào Checkbox đầu tiên
        if (key === "ArrowDown") {
          e.preventDefault();
          const currentColumn = activeElement.closest(".ant-transfer-list");
          const firstRow = currentColumn?.querySelector(
            ".ant-transfer-list-content-item"
          );
          if (firstRow) {
            const firstCheckbox = firstRow.querySelector(
              'input[type="checkbox"]'
            ) as HTMLElement;
            firstCheckbox?.focus();
          }
          return;
        }
      }

      // =========================================================
      // 3. LOGIC TAB (FOCUS TRAP & CYCLE)
      // =========================================================
      if (key === "Tab") {
        e.preventDefault();
        const allFocusables = Array.from(
          container.querySelectorAll(
            'input:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ) as HTMLElement[];

        // Lọc element ẩn
        const visibleFocusables = allFocusables.filter(
          (el) => el.offsetParent !== null
        );

        const currentIndex = visibleFocusables.indexOf(activeElement);
        const total = visibleFocusables.length;
        const nextIndex = e.shiftKey
          ? (currentIndex - 1 + total) % total
          : (currentIndex + 1) % total;

        visibleFocusables[nextIndex]?.focus();
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={modalRef}
      className="bg-white rounded-lg shadow-xl w-[800px] h-[500px] p-4 flex flex-col"
    >
      <h2 className="text-xl font-bold text-center mb-4 bg-[#D9D9D9] py-2">
        {title}
      </h2>

      <div className="flex-1 flex justify-center items-center">
        <Transfer
          dataSource={mockData}
          titles={["対象項目", "選択済み項目"]}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={onChange}
          onSelectChange={onSelectChange}
          render={(item) => item.title}
          listStyle={{
            width: 300,
            height: 350,
          }}
          showSearch
          operations={["追加する", "削除する"]}
        />
      </div>

      <div className="flex justify-center mt-4">
        <Button onClick={onClose}>閉じる</Button>
      </div>
    </div>
  );
};

export default OperatorSelectionModal;
