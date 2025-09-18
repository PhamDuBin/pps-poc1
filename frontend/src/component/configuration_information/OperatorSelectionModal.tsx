"use client";

import React, { useState } from "react";
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

const OperatorSelectionModal: React.FC<OperatorSelectionModalProps> = ({ isOpen, onClose , title}) => {
  // mock data
  const mockData: TransferItem[] = Array.from({ length: 20 }, (_, i) => ({
    key: (i + 1).toString(),
    title: `事業者${(i + 1).toString().padStart(2, "0")}`,
  }));

  const [targetKeys, setTargetKeys] = useState<Key[]>(
    Array.from({ length: 10 }, (_, i) => (i + 11).toString())
  );
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);

  const onChange: TransferProps["onChange"] = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange: TransferProps["onSelectChange"] = (
    sourceSelectedKeys,
    targetSelectedKeys
  ) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl w-[800px] h-[500px] p-4 flex flex-col">
      <h2 className="text-xl font-bold text-center mb-4 bg-[#D9D9D9] py-2">{title}</h2>

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
