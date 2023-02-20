<script lang="ts">
	import post from '~/script/web';
    import { user, validUser } from '~/stores/user_store';
	import CartItem from './CartItem.svelte';

    let loggedIn = false;
	let permissions = 0;
	let userName = '';
    let userId = 0;
    let amount = "";

    user.subscribe((u) => {
		if (validUser(u)) {

			loggedIn = true;

            post(
            "fetch_items",
            {
                userId: u.User_id
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

<!-- <style class="scss">
    .bob:nth-of-type(even){
        background-color: rgba(86, 59, 7, 0.119);
    }
</style> -->

<div class="my-2 w-3/4 text-black m-auto">

    <div class="grid grid-cols-10 text-lg">
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
</div>