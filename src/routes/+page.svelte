<script lang="ts">
	import post from "~/script/web";
	import {onMount, beforeUpdate, afterUpdate, onDestroy} from 'svelte';
    import Item from './Item.svelte'

	import ProdCard from "./ProdCard.svelte";

    let products: Array<Product> = [];

    onMount(() =>{
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
        }
    );

    const usID = 10;
    const poID = 1;
    let modalOpen = false;

    let categories = {
        'Manufacturer': [
            'Company A',
            'Company B'
        ],
        'Fan type': [
            'Ceiling fan',
            'Tower fan',
            'Floor fan',
            'Computer fan',
        ],
    }

</script>

<div class="grid grid-cols-5">
    <div class="filterMenu rounded-xl border-2 mx-3 shadow-xl text-gray-300 border-black justify-evenly h-fit">
        <div class="text-2xl px-3 py-2 flex justify-between align-baseline text-gray-700">
            <p>Filter</p>
            <i class="bi bi-filter"></i>
        </div>
        <hr class="border-gray-600"/>
        <div class="flex flex-col gap-2 py-2"> <!-- div is for left side menu -->
            {#each Object.entries(categories) as entry}
                <div class="border-b border-gray-500 last-of-type:border-none">
                    <Item {entry}/>
                </div>
            {/each}
        </div>
    </div>
    <div class="productSection col-span-4 max-w-full mr-10">
        {#each products as product}
            <ProdCard {product}/>
	    {/each}
    </div>
</div>

<style lang="postcss">
    /*.menuItem{  //not used
        @apply m-2 border-2 border-white rounded p-2 bg-blue-400 text-black;
    }*/

    .productSection{
        @apply flex justify-start flex-wrap; /* displays five products per row */
    }

    @media screen and (max-width: 700px){
        .productSection {
            @apply grid-cols-3;
        }
    }
</style>