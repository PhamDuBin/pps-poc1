"use client";
import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export default function ModalF1() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {/* Trigger button */}
      <div className="flex justify-center p-4">
        <Button
          onPress={onOpen}
          className="bg-gray-200 text-black rounded-none px-6"
        >
          Open Modal
        </Button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          base: "rounded-none border border-gray-300",
          backdrop: "bg-black/30",
        }}
        hideCloseButton
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center text-lg">
                Modal_1
              </ModalHeader>
              <ModalFooter className="flex justify-center pb-6">
                <Button
                  onPress={onClose}
                  className="bg-gray-200 text-black rounded-none px-6"
                >
                  閉じる（C）
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
