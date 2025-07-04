"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface ModalF1Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalF1({ isOpen, onClose }: ModalF1Props) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      hideCloseButton
      placement="center"
      className="border-1 border-black w-1/3 bg-gray-200"
    >
      <ModalContent>
        {(onCloseInternal: () => void) => (
          <>
            <ModalHeader className="justify-center text-base font-bold mt-6">
              Modal_1
            </ModalHeader>

            <ModalFooter className="justify-center pb-10 pt-6">
              <Button
                onPress={() => {
                  onClose();
                  onCloseInternal();
                }}
                className="bg-gray-300 text-black font-bold text-sm px-6 py-3 rounded-none shadow-sm"
              >
                閉じる
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
