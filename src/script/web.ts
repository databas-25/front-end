import { ajax } from 'jquery';
import { page } from '$app/stores';

type roots = 'user' | 'cart' | 'order' | 'product';

export default function(path: string, data: unknown, success: JQuery.Ajax.SuccessCallback<unknown>, error: JQuery.Ajax.ErrorCallback<unknown>, root: roots = 'user') {
    let ip;
    switch (window.location.hostname) {
        case 'onlyfans.beachore.com':
            ip = 'https://onlyfans_api.beachore.com';
            break;
        default:
            ip = `http://${window.location.hostname ?? 'localhost'}:8000`;
            break;
    }

    ajax({
        url: `${ip}/${root}/${path}`,
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(data),
        success,
        error,
    })
}
