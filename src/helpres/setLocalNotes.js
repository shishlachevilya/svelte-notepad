export function setLocalNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}
