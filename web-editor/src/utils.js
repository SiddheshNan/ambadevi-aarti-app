export function saveFile(filename, data) {
  const blob = new Blob([data], { type: "application/json" });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}

export const getAll = () =>
  JSON.parse(localStorage.getItem("aartiList1")) || [];
export const setAll = (aartiList) =>
  localStorage.setItem("aartiList1", JSON.stringify(aartiList));
