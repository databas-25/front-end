<script lang="ts">
    import ProductForm from './product_form.svelte';
    import post from '~/script/web';
	import { onMount } from 'svelte';
	import ProductRow from './product_row.svelte';

    const TABS = {
        CREATE: 0,
        EDIT: 1,
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

    let selected = TABS.CREATE;
</script>

<div class="grid grid-cols-5 m-auto max-w-screen-2xl gap-2 mt-2">
    <div class="bg-slate-500 h-fit rounded-xl overflow-clip">
        <p class="tab-item {selected == TABS.CREATE? 'bg-white bg-opacity-25': ''}" on:click={()=>selected=TABS.CREATE} on:keydown>Create new product</p>
        <p class="tab-item {selected == TABS.EDIT? 'bg-white bg-opacity-25': ''}" on:click={()=>selected=TABS.EDIT} on:keydown>Edit product</p>
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
        {/if}
    </div>
</div>

<style lang="postcss">
    .tab-item {
        @apply px-3 py-2 hover:bg-white hover:bg-opacity-20 cursor-pointer text-white;
    }
</style>