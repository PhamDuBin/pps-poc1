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
  const mockData: TransferItem[] = Array.from({ length: 20 }, (_, i) => ({
    key: (i + 1).toString(),
    title: `事業者${(i + 1).toString().padStart(2, "0")}`,
  }));

  const [targetKeys, setTargetKeys] = useState<Key[]>(
    Array.from({ length: 1 }, (_, i) => (i + 4).toString())
  );
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  const onChange: TransferProps["onChange"] = (
    nextTargetKeys,
    direction,
    moveKeys
  ) => {
    setTargetKeys(nextTargetKeys);
    setTimeout(() => {
      const container = modalRef.current;
      if (!container) return;
      const inputs = container.querySelectorAll(
        ".ant-transfer-list-search .ant-input"
      );
      if (direction === "right") (inputs[0] as HTMLElement)?.focus();
      else if (direction === "left") (inputs[1] as HTMLElement)?.focus();
    }, 50);
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

    // Focus Input trái khi mở modal
    setTimeout(() => {
      const firstInput = container.querySelector(
        ".ant-transfer-list-search .ant-input"
      ) as HTMLElement | null;
      firstInput?.focus();
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const activeElement = document.activeElement as HTMLElement;

      // Helpers xác định vị trí
      const headerWrapper = activeElement.closest(".ant-transfer-list-header");
      const isHeaderCheckbox =
        headerWrapper !== null &&
        activeElement.getAttribute("type") === "checkbox";

      const isSearchInput = activeElement.matches(
        ".ant-transfer-list-search .ant-input"
      );
      const currentItemRow = activeElement.closest(
        ".ant-transfer-list-content-item"
      );

      // =========================================================
      // 1. LOGIC TẠI HEADER CHECKBOX (MỚI THÊM)
      // =========================================================
      if (isHeaderCheckbox) {
        const currentList = activeElement.closest(".ant-transfer-list");

        // Space/Enter để check/uncheck (Antd checkbox input native xử lý Space rồi, ta chỉ thêm Enter nếu cần)
        if (key === "Enter") {
          e.preventDefault();
          activeElement.click();
          return;
        }

        // Xuống: Vào ô Search
        if (key === "ArrowDown") {
          e.preventDefault();
          const searchInput = currentList?.querySelector(
            ".ant-transfer-list-search .ant-input"
          ) as HTMLElement;
          searchInput?.focus();
          return;
        }

        // Trái/Phải: Nhảy qua lại giữa 2 Header Checkbox (Trái <-> Phải)
        if (key === "ArrowLeft" || key === "ArrowRight") {
          e.preventDefault();
          const allHeaders = container.querySelectorAll(
            ".ant-transfer-list-header input[type='checkbox']"
          );
          const leftHeader = allHeaders[0] as HTMLElement;
          const rightHeader = allHeaders[1] as HTMLElement;

          if (activeElement === leftHeader && key === "ArrowRight") {
            rightHeader?.focus();
          } else if (activeElement === rightHeader && key === "ArrowLeft") {
            leftHeader?.focus();
          }
          return;
        }
        return;
      }

      // =========================================================
      // 2. LOGIC TẠI SEARCH INPUT
      // =========================================================
      if (isSearchInput) {
        const currentList = activeElement.closest(".ant-transfer-list");

        // Lên: Quay về Header Checkbox
        if (key === "ArrowUp") {
          e.preventDefault();
          const headerCheckbox = currentList?.querySelector(
            ".ant-transfer-list-header input[type='checkbox']"
          ) as HTMLElement;
          headerCheckbox?.focus();
          return;
        }

        // Xuống/Enter: Vào List Item đầu tiên
        if (key === "ArrowDown" || key === "Enter") {
          e.preventDefault();
          const firstCheckbox = currentList?.querySelector(
            '.ant-transfer-list-content-item input[type="checkbox"]'
          ) as HTMLElement;
          firstCheckbox?.focus();
          return;
        }
        return;
      }

      // =========================================================
      // 3. LOGIC TẠI ITEM LIST
      // =========================================================
      if (currentItemRow) {
        if (key === "Enter" || key === " ") {
          // Space được xử lý mặc định, nhưng thêm cho chắc
          // Logic check item (đã có sẵn ở input checkbox)
          return;
        }
        if (e.code === "KeyC") {
          const checkbox = currentItemRow.querySelector(
            'input[type="checkbox"]'
          ) as HTMLElement;
          checkbox?.click();
          return;
        }

        const listContent = currentItemRow.closest(
          ".ant-transfer-list-content"
        );
        if (!listContent) return;

        const allCheckboxes = Array.from(
          listContent.querySelectorAll(
            '.ant-transfer-list-content-item input[type="checkbox"]'
          )
        ) as HTMLElement[];
        const currentCheckbox = currentItemRow.querySelector(
          'input[type="checkbox"]'
        ) as HTMLElement;
        const currentIndex = allCheckboxes.indexOf(currentCheckbox);

        // Lên/Xuống Cycle
        if (key === "ArrowUp" || key === "ArrowDown") {
          e.preventDefault();

          // Đặc biệt: Nếu đang ở Item đầu tiên mà nhấn Lên -> Về Search
          if (key === "ArrowUp" && currentIndex === 0) {
            const currentList = currentItemRow.closest(".ant-transfer-list");
            const searchInput = currentList?.querySelector(
              ".ant-transfer-list-search .ant-input"
            ) as HTMLElement;
            searchInput?.focus();
            return;
          }

          let nextIndex = currentIndex;
          if (key === "ArrowDown") {
            nextIndex = (currentIndex + 1) % allCheckboxes.length;
          } else {
            nextIndex =
              (currentIndex - 1 + allCheckboxes.length) % allCheckboxes.length;
          }
          allCheckboxes[nextIndex]?.focus();
          return;
        }

        // Trái/Phải: Logic nhảy sang nút Operation (giữ nguyên logic cũ)
        if (key === "ArrowLeft" || key === "ArrowRight") {
          e.preventDefault();
          const isLeftList =
            currentItemRow.closest(".ant-transfer-list") ===
            container.querySelectorAll(".ant-transfer-list")[0];
          const operations = container.querySelectorAll(
            ".ant-transfer-operation button"
          ) as NodeListOf<HTMLElement>;
          const [btnAdd, btnRemove] = [operations[0], operations[1]];
          const searchInput = currentItemRow
            .closest(".ant-transfer-list")
            ?.querySelector(
              ".ant-transfer-list-search .ant-input"
            ) as HTMLElement;

          if (isLeftList) {
            if (key === "ArrowRight") btnAdd?.focus();
            else searchInput?.focus();
          } else {
            // Right List
            if (key === "ArrowLeft") btnRemove?.focus();
            else searchInput?.focus();
          }
          return;
        }
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
        {title || "事業者"}
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
          listStyle={{ width: 300, height: 350 }}
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
