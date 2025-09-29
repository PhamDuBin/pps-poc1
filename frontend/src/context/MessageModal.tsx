import React from "react";
import { Modal, Button } from "antd";

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  children?: React.ReactNode;
}

const MessageModal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  onConfirm,
  children,
}) => {
  return (
    <Modal
      open={isOpen}
      title={title}
      onCancel={onClose}
      footer={[
        <Button
          key="no"
          onClick={onClose}
          className="rounded-md bg-gray-200 font-medium text-gray-800 hover:bg-gray-300"
        >
          No
        </Button>,
        <Button
          key="yes"
          type="primary"
          onClick={onConfirm}
          className="rounded-md bg-blue-600 font-medium text-white hover:bg-blue-700"
        >
          Yes
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
};

export default MessageModal;
