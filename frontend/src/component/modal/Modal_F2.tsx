"use client";
import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface ModalF2Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalF2({ isOpen, onClose }: ModalF2Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      // Alt + Ctrl/Cmd + C
      const isComboPressed =
        e.code === "KeyC" && e.altKey && (isMac ? e.metaKey : e.ctrlKey);

      if (isOpen && isComboPressed) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
              Modal_2
            </ModalHeader>

            <ModalFooter className="justify-center pb-10 pt-6">
              <Button
                onPress={() => {
                  onClose();
                  onCloseInternal();
                }}
                className="bg-gray-300 text-black font-bold text-sm px-6 py-3 rounded-none shadow-sm"
              >
                閉じる (C)
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
