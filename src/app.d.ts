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
		stock: number,
		description: string,
		manufacturer: string,
		radius?: number,
		rpm?: number,
		published?: number,
		category: string,
	}

	interface BasketItem {
		Products_Product_id?: number,
		product_name: string,
		img_address: string,
		price: number,
		amount: number,
	}

	interface OrderedItem {
		Order_Order_id?: number,
		timestamp: Date,
		Products_Product_id?: number,
		amount: number,
		product_name: string,
		price: number,
	}

	interface Review {
		User_id: number,
        title: string,
        body: string,
        user_name: string,
        rating: number,
		reviewTime: Date,
    }

	interface adminOrders {
		Order_id?: number
		User_id?: number,
		timestamp: Date,
		user_name: string,
	}

	interface adminBasket {
		Users_User_id?: number
		Products_Product_id?: number,
		user_name: string,
	}
}

export {};
