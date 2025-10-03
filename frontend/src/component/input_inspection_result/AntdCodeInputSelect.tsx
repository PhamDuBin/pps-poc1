import React, { useRef, useState } from "react"; // Thêm useState
import { Input, Select } from "antd";
import type { RefSelectProps } from "antd";

const { TextArea } = Input;

// Định nghĩa các props mà component sẽ nhận
type Option = {
  value: string;
  label: string;
};

type AntdCodeTextPairProps = {
  label: string; // Nhãn bên trái (ví dụ: "通知事項")
  options: Option[];
  codeValue: string;
  onCodeChange: (value: string) => void;
  textValue: string;
  onTextChange: (value: string) => void;
  disabled?: boolean;
};

export const AntdCodeTextPair: React.FC<AntdCodeTextPairProps> = ({
  label,
  options,
  codeValue,
  onCodeChange,
  textValue,
  onTextChange,
  disabled,
}) => {
  const selectRef = useRef<RefSelectProps>(null);
  // State mới để điều khiển việc mở/đóng dropdown
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  // Cập nhật logic xử lý sự kiện F4
  const handleCodeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "F4") {
      e.preventDefault();
      setIsSelectOpen(true); // Mở dropdown
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = e.target.value;
    onCodeChange(newCode);
    const foundOption = options.find((option) => option.value === newCode);
    onTextChange(foundOption ? foundOption.label : "invalid");
  };

  // Cập nhật logic khi chọn: đóng dropdown lại
  const handleSelectChange = (newCode: string) => {
    onCodeChange(newCode);
    const foundOption = options.find((option) => option.value === newCode);
    if (foundOption) {
      onTextChange(foundOption.label);
    }
    setIsSelectOpen(false); // Đóng dropdown sau khi chọn
  };

  // MỚI: Xử lý sự kiện bàn phím trên Select
  const handleSelectKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Khi dropdown đang mở, chặn sự kiện phím lên/xuống lan ra ngoài
    if (isSelectOpen && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
      e.stopPropagation();
    }
  };

  const selectOptions = options.map((opt) => ({
    value: opt.value,
    label: `${opt.value}: ${opt.label}`,
  }));

  return (
    <div className="w-full flex flex-row">
      {/* 1. Nhãn bên trái */}
      <span className="w-[10%] h-[80px] bg-[#80bad7] flex justify-center items-center text-center border border-black">
        {label}
      </span>

      {/* 2. Cặp Input/Select */}
      <div className="w-1/12 h-[80px] flex flex-col">
        <Input
          value={codeValue}
          onChange={handleCodeChange}
          onKeyDown={handleCodeKeyDown}
          disabled={disabled}
          className="w-full h-1/2 !p-0 border-b-0 text-center custom-antd-input"
          style={{ borderRadius: "0", borderLeft: 0 }}
        />
        <Select
          ref={selectRef}
          value={codeValue === "0" || !codeValue ? null : codeValue}
          onChange={handleSelectChange}
          disabled={disabled}
          showSearch
          options={selectOptions}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          className="w-full h-1/2 !p-0 custom-antd-select"
          style={{ borderRadius: "0" }}
          getPopupContainer={() => document.body}
          dropdownStyle={{ minWidth: "300px" }}
          dropdownMatchSelectWidth={false}
          open={isSelectOpen}
          // MỚI: Đồng bộ state khi người dùng tự mở/đóng dropdown bằng chuột
          onDropdownVisibleChange={(open) => setIsSelectOpen(open)}
          // MỚI: Thêm trình xử lý keydown
          onKeyDown={handleSelectKeyDown}
        />
      </div>

      {/* 3. Vùng TextArea */}
      <TextArea
        disabled={disabled}
        value={textValue}
        onChange={(e) => onTextChange(e.target.value)}
        className="w-11/12 h-[80px] border border-black border-l-0 bg-[#ebcec0] text-left align-top p-1 resize-none"
        style={{ backgroundColor: "#ebcec0", borderRadius: "0" }}
      />
    </div>
  );
};
