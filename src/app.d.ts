// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import 'bootstrap-icons';
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface User {
		User_id: number,
		user_name: string,
		permission: number,
		email: string,
	}
	
	interface Product {
		Product_id?: number,
		product_name: string,
		img_address: string,
		price: number,
		description: string,
		manufacturer: string,
		radius?: number,
	}

	interface BasketItem {
		Product_id?: number,
		product_name: string,
		price: number,
		amount: number,
	}
}


export {};
