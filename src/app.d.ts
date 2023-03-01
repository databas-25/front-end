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
		category: string,
	}

	interface BasketItem {
		Products_Product_id?: number,
		product_name: string,
		img_address: string,
		price: number,
		amount: number,
	}

	interface Review {
		userID: number,
        title: string,
        body: string,
        name: string,
        rating: number,
		reviewTime: Date,
    }
}


export {};
