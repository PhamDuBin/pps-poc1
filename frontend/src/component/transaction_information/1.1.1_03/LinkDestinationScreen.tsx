import { useEffect } from "react";

function LinkDestinationScreen() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const isCloseKey =
        (e.code === "KeyC" && e.altKey && (isMac ? e.metaKey : e.ctrlKey)) ||
        (e.code === "KeyC" && e.altKey && (isMac ? e.metaKey : e.ctrlKey));

      if (isCloseKey) {
        e.preventDefault();
        window.close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <div className="p-4 h-8 w-[90%]">
      <div className="w-full bg-gray-300">
        <h2 className="text-sm font-bold flex text-center justify-center p-2">
          ＜請求残高＞
        </h2>
      </div>
    </div>
  );
}
export default LinkDestinationScreen;
