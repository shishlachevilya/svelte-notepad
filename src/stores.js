import { writable } from "svelte/store";

import INITIAL_NOTES from "./db";

const locale = localStorage.getItem("key-note")
  ? JSON.parse(localStorage.getItem("key-note"))
  : false;

const data = locale ? locale : INITIAL_NOTES;

export const notes = writable(data);
