import { ajax } from 'jquery';

const IP = "localhost"
type roots = 'user' | 'cart' | 'order' | 'product';

export default function(path: string, data: unknown, success: JQuery.Ajax.SuccessCallback<unknown>, error: JQuery.Ajax.ErrorCallback<unknown>, root: roots = 'user') {
    ajax({
        url: `http://${IP}:8000/${root}/${path}`,
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(data),
        success,
        error,
    })
}
