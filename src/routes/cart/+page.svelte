<script lang="ts">
	import post from '~/script/web';
    import { user, validUser } from '~/stores/user_store';

    let loggedIn = false;
	let permissions = 0;
	let userName = '';
    let userId = 0;


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

</script>

<style>
    .bob:nth-child(even){
        background-color: rgba(86, 59, 7, 0.119);
    }
</style>

<div class="bg-teal-50 w-3/4 text-black m-auto text-center border-2">

    <div class="grid grid-cols-6 bob">
        <div class="border-4 col-span-3">Item name</div>
        <div class="border-4">Unit price</div>
        <div class="border-4">Amount</div>
        <div class="border-4">Price</div>
    </div>

    {#each items as item}
        <div class="grid grid-cols-6 bob">
            <div class="col-span-3"><p>{item.product_name}</p></div>
            <div><p>{item.price}</p></div>
            <div><p>{item.amount}</p></div>
            <div><p>{item.price * item.amount}</p></div>
        </div>
    {/each}
    
    <div  class="grid grid-cols-6 bob">
        <div class="col-start-5 border-2 col-span-2">toto cost: {items.reduce((acc, x) => acc + x.price * x.amount, 0)}</div>
    </div>

</div>