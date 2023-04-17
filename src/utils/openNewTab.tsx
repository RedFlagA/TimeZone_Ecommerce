const openInNewTab = (id: number) => {
  const url = `${window.location.href}product/${id}`;
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};
export default openInNewTab;
