import { writable } from "svelte/store";

export const modalOpen = writable({open: false, type: 1});