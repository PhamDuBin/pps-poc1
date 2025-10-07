export const handleOpenWindow = () => {
  const win = window.open(
    "/link-destination",
    "_blank",
    "width=800,height=600,noopener,noreferrer"
  );

  if (win) {
    win.focus();
  }
};
