import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const TooltipPortal = ({ children }: any) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let tooltipRoot = document.getElementById("tooltip-root");
    if (!tooltipRoot) {
      tooltipRoot = document.createElement("div");
      tooltipRoot.setAttribute("id", "tooltip-root");
      document.body.appendChild(tooltipRoot);
    }
    setMounted(true);

    return () => {
      if (tooltipRoot && tooltipRoot.children.length === 0) {
      }
    };
  }, []);

  const tooltipRoot =
    typeof document !== "undefined"
      ? document.getElementById("tooltip-root")
      : null;
  return mounted && tooltipRoot ? createPortal(children, tooltipRoot) : null;
};

export default TooltipPortal;
