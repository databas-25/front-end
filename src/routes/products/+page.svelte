<script lang="ts">
    import ProductForm from './product_form.svelte';
    import post from '~/script/web';
	import { onMount } from 'svelte';
	import ProductRow from './product_row.svelte';
	import { each } from 'jquery';
	import OrderRow from './order_row.svelte';
    import _ from 'lodash';

    const TABS = {
        CREATE: 0,
        EDIT: 1,
        ADMINVIEW: 2
    }

    function createProduct(product: Product) {
        post(
            'create',
            product,
            () => {
                window.location.pathname = "/";
            },
            (err) => {
                console.error(err);
            },
            'product',
        )
    }
    
    let products: Array<Product> = [];
    onMount(() => {
        post(
            "fetch_items",
            {},
            (d) => {
                products = d.products??[];
            },
            (e) => {
                console.error(e);
            },
            "product"
        )
        getOrders();
    });

    let selected_product: Product | null;
    function select(product: Product) {
        selected_product = product;
    }

    function updateProduct(product: Product) {
        post(
            "update_product",
            { product },
            (d) => {
                window.location.pathname = "/";
            },
            (e) => {
                console.error(e);
            },
            "product"
        )
    }

    let orders: _.Dictionary<Array<adminOrders>> = {};

    function getOrders(){
        post(
            "getAll", 
            {}, 
            (d) => {
                const results = d.result as Array<adminOrders>;
                orders = _.groupBy(results, (o) => o.User_id);
                getBaskets();
            },
            (e) => {
                console.error(e);
            },
            "order"
        );
    }

    function getBaskets(){
        post(
            "getAll", 
            {}, 
            (d) => {
                const results = d.result as Array<adminBasket>;
                const baskets = _.groupBy(results, (b) => b.Users_User_id);
                for(let [user, basket] of Object.entries(baskets)) {
                    if (orders[user]) {
                        orders[user].push({
                            User_id: basket[0].Users_User_id,
                            timestamp: new Date(),
                            user_name: basket[0].user_name,
                        });
                    } else {
                        orders[user] = [{
                            User_id: basket[0].Users_User_id,
                            timestamp: new Date(),
                            user_name: basket[0].user_name,
                        }];
                    }
                }
                // baskets = _.groupBy(results, (o) => o.User_id);      // maybe as adminOrder
            },
            (e) => {
                console.log("Error Getting basket");
                console.error(e);
            },
            "cart",
        );
    }

    let open = -1;

    let selected = TABS.CREATE;
</script>

<div class="grid grid-cols-5 m-auto max-w-screen-2xl gap-2 mt-2">
    <div class="bg-slate-500 h-fit rounded-xl overflow-clip">
        <p class="tab-item {selected == TABS.CREATE? 'bg-white bg-opacity-25': ''}" on:click={()=>selected=TABS.CREATE} on:keydown>Create new product</p>
        <p class="tab-item {selected == TABS.EDIT? 'bg-white bg-opacity-25': ''}" on:click={()=>selected=TABS.EDIT} on:keydown>Edit product</p>
        <p class="tab-item {selected == TABS.ADMINVIEW? 'bg-white bg-opacity-25': ''}" on:click={()=>selected=TABS.ADMINVIEW} on:keydown>View orders</p>
    </div>
    <div class="col-span-4 bg-slate-200 h-fit rounded-xl p-2">
        {#if selected == TABS.CREATE}
            <p class="text-2xl">CREATE PRODUCT</p>
            <hr />
            <ProductForm onSubmit={createProduct} />
        {:else if selected == TABS.EDIT}
            <p class="text-2xl">
                {#if selected_product}
                     <i class="bi bi-chevron-left hover:text-gray-600 cursor-pointer" on:click={() => selected_product = null} on:keydown></i>
                {/if}
                <span>EDIT PRODUCT</span>
            </p>
            <hr />
            {#if selected_product}
                <ProductForm def={selected_product} onSubmit={updateProduct}/>
            {:else}
                {#each products as product}
                    <ProductRow item={product} onSelect={() => select(product)}/>
                    <hr class="border-gray-600 last-of-type:hidden"/>
                {/each}
            {/if}
        {:else if selected == TABS.ADMINVIEW}
            <p class="text-2xl">ORDERS</p>
            {#each Object.values(orders) as order}
                <OrderRow items={order} {open} onOpen={(u) => open = u}/>
                <hr class="border-gray-600 last-of-type:hidden"/>
            {/each}
        {/if}
    </div>
</div>

<style lang="postcss">
    .tab-item {
        @apply px-3 py-2 hover:bg-white hover:bg-opacity-20 cursor-pointer text-white;
    }
</style>