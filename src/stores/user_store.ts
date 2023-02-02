import { writable, type Writable } from 'svelte/store';

export type User = {
    User_id: number,
}

export const user: Writable<User | null> = writable();
// export const token: Writable<string | null> = writable()