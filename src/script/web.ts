type roots = 'user' | 'cart' | 'order' | 'product' | 'review';

export default function(path: string, data: unknown, success: (arg: any) => void, error: (arg: any) => void, root: roots = 'user') {
    let ip;
    switch (window.location.hostname) {
        case 'onlyfans.beachore.com':
            ip = 'https://onlyfans_api.beachore.com';
            break;
        default:
            ip = `http://${window.location.hostname ?? 'localhost'}:8000`;
            break;
    }

    fetch(`${ip}/${root}/${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
    })
        .then(d => d.json())
        .then(success)
        .catch(error);
}
