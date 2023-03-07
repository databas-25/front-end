
export function setCookie(cname: string, cvalue: string, exdays: number) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	document.cookie = `${cname}=${cvalue};expires=${d.toUTCString()};path=/`;
}

export function getCookie(cname: string) {
	const name = cname + "=";
	return decodeURIComponent(document.cookie).split(';').find((c) => c.trim().startsWith(name))?.trim()?.replace(name, '');
}

export function deleteCookie(name: string) { setCookie(name, '', -1); }
