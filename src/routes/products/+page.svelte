<script lang="ts">
    import ProductForm from './product_form.svelte';
    import post from '~/script/web';

    const TABS = {
        CREATE: 0,
        EDIT: 1,
    }

    function createProduct(product: Product) {
        console.log("CREATE PRODUCT");
        post(
            'create',
            product,
            (data) => {
                console.log(data);
            },
            (err) => {
                console.error(err);
            },
            'product',
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
            <p class="text-2xl">EDIT PRODUCT</p>
            <hr />
            <ProductForm />
        {/if}
    </div>
</div>

<style lang="postcss">
    .tab-item {
        @apply px-3 py-2 hover:bg-white hover:bg-opacity-20 cursor-pointer text-white;
    }
</style>