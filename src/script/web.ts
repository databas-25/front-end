import { ajax } from 'jquery';
import { page } from '$app/stores';

let ip = "localhost";
page.subscribe(p => ip = p.url.hostname);
type roots = 'user' | 'cart' | 'order' | 'product';

export default function(path: string, data: unknown, success: JQuery.Ajax.SuccessCallback<unknown>, error: JQuery.Ajax.ErrorCallback<unknown>, root: roots = 'user') {
    ajax({
        url: `http://${ip}:8000/${root}/${path}`,
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(data),
        success,
        error,
    })
}
