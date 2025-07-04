"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import ModalF1 from "../component/modal/Modal_F1";
import ModalF2 from "../component/modal/Modal_F2";
import SearchModal from "../component/modal/Search_Modal";

export default function CheckKeyScreen() {
  const [modalF1Open, setModalF1Open] = useState(false);
  const [modalF2Open, setModalF2Open] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isMagnifier, setIsMagnifier] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");

      // F1
      if (e.key === "F1") {
        e.preventDefault();
        setModalF1Open(true);
      }

      // F2
      if (e.key === "F2") {
        e.preventDefault();
        setModalF2Open(true);
      }

      // F3
      if (e.key === "F3") {
        e.preventDefault();
        const newWindow = window.open(
          "/window3",
          "_blank",
          "width=500,height=300,noopener,noreferrer"
        );
        if (newWindow) newWindow.focus();
      }

      // F4
      if (e.key === "F4") {
        e.preventDefault();
        const newWindow = window.open(
          "/window4",
          "_blank",
          "width=500,height=300,noopener,noreferrer"
        );
        if (newWindow) newWindow.focus();
      }

      // Magnifier toggle
      if (
        e.key.toLowerCase() === "z" &&
        e.altKey &&
        (isMac ? e.metaKey : e.ctrlKey)
      ) {
        e.preventDefault();
        setIsMagnifier((prev) => {
          const newCursor = !prev ? "zoom-in" : "default";
          document.body.style.cursor = newCursor;
          return !prev;
        });
      }

      // Search modal toggle
      if (
        e.key.toLowerCase() === "f" &&
        e.altKey &&
        (isMac ? e.metaKey : e.ctrlKey)
      ) {
        e.preventDefault();
        setShowSearchModal(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0f0f0] p-4">
      <Card
        className={`w-full max-w-3xl border border-gray-300 bg-white shadow-md transition-opacity duration-200 ${
          modalF1Open || modalF2Open || showSearchModal
            ? "opacity-20"
            : "opacity-100"
        }`}
      >
        <CardBody className="p-6 space-y-6">
          {/* Header */}
          <div>
            <p className="text-sm text-gray-500">ショートカットサンプル</p>
            <h1 className="text-center text-xl font-bold mt-4">
              「ショートカットキー」サンプルコード
            </h1>
          </div>

          {/* Instructions */}
          <ul className="space-y-2 text-sm text-black whitespace-nowrap">
            <li>
              ●
              各種ファンクションキーをクリックすると「モーダル画面」が開きます。
            </li>
            <li>● Option + Win（Command）+ Z → 虫眼鏡の切り替え</li>
            <li>● Option + Win（Command）+ F → 検索画面</li>
          </ul>

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            {["F1キー", "F2キー", "F3キー", "F4キー"].map((label, index) => (
              <Button
                key={label}
                className="bg-gray-200 text-black shadow-sm rounded-none px-6"
                onPress={() => {
                  if (index === 0) {
                    setModalF1Open(true); // F1
                  } else if (index === 1) {
                    setModalF2Open(true); // F2
                  } else if (index === 2) {
                    const newWindow = window.open(
                      "/window4",
                      "_blank",
                      "width=500,height=300,noopener,noreferrer"
                    );
                    if (newWindow) newWindow.focus();
                  } else if (index === 3) {
                    const newWindow = window.open(
                      "/window4",
                      "_blank",
                      "width=500,height=300,noopener,noreferrer"
                    );
                    if (newWindow) newWindow.focus();
                  }
                }}
              >
                {label}
              </Button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Modals */}
      <ModalF1 isOpen={modalF1Open} onClose={() => setModalF1Open(false)} />
      <ModalF2 isOpen={modalF2Open} onClose={() => setModalF2Open(false)} />
      {showSearchModal && (
        <SearchModal onClose={() => setShowSearchModal(false)} />
      )}
    </div>
  );
}
