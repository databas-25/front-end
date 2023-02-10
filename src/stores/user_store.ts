import { writable, type Writable } from 'svelte/store';

export const user: Writable<User | null> = writable();
// export const token: Writable<string | null> = writable()