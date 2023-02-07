import { writable, type Writable } from 'svelte/store';

export type User = {
    User_id: number,
    user_name: string,
    permissions: number
}

export const user: Writable<User | null> = writable();
// export const token: Writable<string | null> = writable()