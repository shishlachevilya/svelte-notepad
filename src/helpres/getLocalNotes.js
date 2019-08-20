  export function getLocalNotes() {
    return JSON.parse(localStorage.getItem("notes"));
  }