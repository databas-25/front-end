import { writable, type Writable } from 'svelte/store';
import post from '~/script/web';

export function validUser(user: User | null): user is User {
    return !!user;
}

export const user: Writable<User | null> = writable();
let userId = -1;
user.subscribe(u => {
    userId = u?.User_id ?? -1;
});

export const loginAttempted = writable(false);
export const cartAmount = writable(0);
export const updateCartAmount = () => {
    post(
        'get_amount',
        {},
        (d) => {
            cartAmount.set(d.result);
        },
        (e) => {
            console.error(e);
        },
        'cart',
    )
};
// export const token: Writable<string | null> = writable()