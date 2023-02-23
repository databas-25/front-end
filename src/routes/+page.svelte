<script lang="ts">
	import post from "~/script/web";
	import {onMount, beforeUpdate, afterUpdate, onDestroy} from 'svelte';
    import Item from './Item.svelte';

	import ProdCard from "./ProdCard.svelte";
	import { not_equal } from "svelte/internal";
	import { isNull } from "lodash";

    let products: Array<Product> = [];
    let Manufacturers: Record<string,number> = {};
    let Category: Record<string,number> = {};

    onMount(() =>{
        post(
            "fetch_items",
            {},
            (d) => {
                products = d.products??[];


                for (let product of products) {
                    product.category ??= 'Uncategorized';
                    
                    if(product.manufacturer in Manufacturers && (product.manufacturer ?? false))
                        Manufacturers[product.manufacturer]++;
                    else
                        Manufacturers[product.manufacturer] = 1

                    if(product.category in Category && (product.category ?? false))
                        Category[product.category]++;
                    else
                        Category[product.category] = 1
                }

                displayed_products = products;
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
            {name: 'Company A', checked: false, amount: 5},
            {name: 'Company V', checked: false, amount: 5},
        ],
        'Fan type': [
            {name: 'Ceiling fan', checked: false, amount: 5},
            {name: 'Tower fan', checked: false, amount: 5},
            {name: 'Floor fan', checked: false, amount: 5},
            {name: 'Computer fan', checked: false, amount: 5}
        ],
    }

    let displayed_products: Array<Product> = [];


    function filter(){
        let man_anyChecked = false;
        let man_filter: Array<string> = [];
        for(let man of categories.Manufacturer) {
            if(man.checked){
                man_anyChecked = true;
                man_filter.push(man.name)
            }
        }
        let typ_anyChecked = false;
        let typ_filter: Array<string> = [];
        for(let typ of categories['Fan type']) {
            if(typ.checked){
                typ_anyChecked = true;
                typ_filter.push(typ.name)
            }
        }

        displayed_products = products
            .filter((prod) => {
                if(man_anyChecked){
                    return man_filter.includes(prod.manufacturer)
                }
                return true
            })
            .filter((prod) => {
                if(typ_anyChecked){
                    return typ_filter.includes(prod.manufacturer)
                }
                return true
            });

    }

</script>

<div class="grid grid-cols-5">
    <div class="filterMenu rounded-xl border-2 mx-3 shadow-xl text-gray-300 border-black justify-evenly h-fit">
        <div class="text-2xl px-3 py-2 flex justify-between align-baseline text-gray-700">
            <p>Filter</p>
            <i class="bi bi-filter" on:click={filter} on:keydown></i>
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
        {#each displayed_products as product}
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