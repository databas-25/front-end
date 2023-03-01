<script lang="ts">
	import post from '~/script/web';
    import { user, validUser } from '~/stores/user_store';
	import CartItem from './CartItem.svelte';

    let loggedIn = false;
    let userId = 0;

    user.subscribe((u) => {
		if (validUser(u)) {
            userId = u.User_id;
			loggedIn = true;

            post(
                "fetch_items",
                {
                    userId
                },
                (d) => {
                    items = d.data;
                    onUpdate();
                },
                (e) => {
                    console.error(e);
                },
                "cart"
            )
		} else {
			loggedIn = false;
		}
	});

    let items: Array<BasketItem> = [];
    let sum = 0;

    function onUpdate() {
        sum = items.reduce((acc, x) => acc + x.price * x.amount, 0);
    }

</script>

<div class="my-2 w-3/4 text-black m-auto">

    <div class="grid grid-cols-11 text-lg">
        <div class="col-span-7">Item name</div>
        <div class="text-center">Unit price</div>
        <div class="text-center">Amount</div>
        <div class="text-center">Price</div>
    </div>
    <hr/>

    {#each items as item}
        <CartItem {item} onUpdate={onUpdate}/>
        <hr/>
    {/each}

    <div  class="grid grid-cols-12 bob p-2">
        <div class="col-start-11 col-span-2">Sum: {sum}</div>
    </div>

    <a href="/checkout" class="float-right bg-blue-500 rounded text-white px-4 py-2">
        <span>To checkout</span>
    </a>
</div>