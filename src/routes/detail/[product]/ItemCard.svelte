<script lang="ts">
    import { updateCartAmount, user } from '@stores/user_store';
	import { onMount } from 'svelte';
    import post from "~/script/web";
    import { modalOpen } from '@stores/modal_store';

    // might no be needed since layout has it. Although we do need them logged in to add an item
    let userID:number;
    user.subscribe((u) => userID = u?.User_id ?? -1)

    export let prodID: number|null;
    $: published = product?.published != 0;

    /*interface Product {
		Product_id?: number,
		product_name: string,
		img_address: string,
		price: number,
		description: string,
		manufacturer: string,
		radius?: number,
	}*/

    export let product:Product|null;
    function fetch_item_data(productID:number){
        post(
            "get_one",
            {productID},
            (d) => {
                product = d.product??-1;
            },
            (e) => {
                console.error(e);
            },
            "product"
        );
    }

    function addToCart(e: MouseEvent){
        e.stopPropagation();
        e.preventDefault();
        if (userID !== -1) {
            post(
                'add_item',
                { userID, productID: product?.Product_id },
                () => {
                    updateCartAmount();
                },
                (e) => {
                    if (e) {
                        console.error("Err: ", e);
                    }
                },
                "cart"
            )
        } else {
            modalOpen.set({ open: true, type: 1 });
        }
    }

    onMount(() => {
        if (prodID) {
            fetch_item_data(prodID);
        }
	});

</script>

<div class="productInfo grid grid-rows-10 justify-center justify-items-center">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    {#if !published}
         <div class="absolute text-[100px] text-red-600 border-[10px] border-red-600 opacity-100 rounded-xl top-1/4 px-4 -rotate-45">DEPRECATED</div>
    {/if}
    <img class="itemImg row-span-4 w-[30rem] h-[30rem] object-scale-down " src="{product?.img_address}" alt="Image failed to load"/>
    <div class=" row-span-2 grid w-[30rem]">
        <div class=" grid grid-cols-5">
            <p class="itemName text-3xl col-span-3 ">{product?.product_name}</p>
            <div class="col-span-2 grid grid-rows-2">
                <p class="itemPrice text-3xl text-right">{product?.price} :-</p>
                <button class=" rows-span-1 px-4 py-1 h-[3rem] w-[10rem] {published? 'bg-red-500': 'bg-red-200'} rounded-full justify-self-end" disabled={!published} on:click={addToCart} on:keydown>
                    <i class="bi bi-cart-plus"></i>
                    Add to cart
                </button>
            </div>
        </div>
    </div>

    <p class="itemDesc bg-gray-200 w-[30rem] min-h-[2.5rem] p-3 mt-5">{product?.description}</p>
    <div class="itemSpecs grid grid-cols-3 w-full">
        <div class="grid grid-rows-3 header">
            <div class="border-b-2 border-stone-300"><p>Manufacturer:</p></div>
            <div class="border-b-2 border-stone-300"><p>Product ID:</p></div>
            {#if product?.radius}
                 <div class="border-b-2 border-stone-300"><p>Radius:</p></div>
            {/if}
            {#if product?.rpm}
                 <div class="border-b-2 border-stone-300"><p>Rotation speed:</p></div>
            {/if}
            <!-- <div class="border-b-2 border-stone-300"><p>:</p></div>
            <div class="border-b-2 border-stone-300"><p>Radius:</p></div> -->
        </div>
        <div class=" col-span-2 grid grid-rows-3 ">
            <p class=" border-b-2 border-stone-300 w-full text-right ">{product?.manufacturer}</p>
            <p class=" border-b-2 border-stone-300 w-full text-right ">{product?.Product_id ?? '?'}</p>
            {#if product?.radius}
                 <p class=" border-b-2 border-stone-300 w-full text-right ">{product?.radius} cm</p>
            {/if}
            {#if product?.rpm}
                 <p class=" border-b-2 border-stone-300 w-full text-right ">{product?.rpm} rpm</p>
            {/if}
        </div>
    </div>
</div>

<style lang="postcss">

</style>