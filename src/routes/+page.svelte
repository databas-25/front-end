<script lang="ts">
	import post from "~/script/web";
	import {onMount, beforeUpdate, afterUpdate, onDestroy} from 'svelte';
    import Item from './Item.svelte';

	import ProdCard from "./ProdCard.svelte";
	import { not_equal } from "svelte/internal";
	import { isNull } from "lodash";
	import { each } from "jquery";

    let products: Array<Product> = [];
    // let Manufacturers: Record<string,number> = {};
    // let Category: Record<string,number> = {};

    onMount(() =>{
        post(
            "fetch_items",
            {},
            (d) => {
                products = d.products??[];


                for (let product of products) {
                    product.category ??= 'Uncategorized';
                    let man = categories.Manufacturer.find((m) => m.name == product.manufacturer)
                    if(man)
                        man.amount++;
                    else
                        categories.Manufacturer.push({
                            name: product.manufacturer,
                            checked: false,
                            amount: 1,
                        });

                    let typ = categories['Fan type'].find((m) => m.name == product.category)
                    if(typ)
                        typ.amount++;
                    else
                        categories['Fan type'].push({
                            name: product.category,
                            checked: false,
                            amount: 1,
                        });
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

    let categories: {
        'Manufacturer': Array<{
            name: string,
            checked: boolean,
            amount: number,
        }>,
        'Fan type': Array<{
            name: string,
            checked: boolean,
            amount: number,
        }>,
    } = {
        'Manufacturer': [],
        'Fan type': [],
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