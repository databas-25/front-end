import { writable, type Writable } from 'svelte/store';

export function validUser(user: User | null): user is User {
    return !!user;
}

export const user: Writable<User | null> = writable();
export const loginAttempted = writable(false);
// export const token: Writable<string | null> = writable()