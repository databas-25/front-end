<script lang="ts">
    import { user } from '@stores/user_store';
	import { onMount } from 'svelte';
    import post from "~/script/web";
    import { modalOpen } from '@stores/modal_store';


    // might no be needed since layout has it. Although we do need them logged in to add an item
    let userID:number;
    user.subscribe((u) => userID = u?.User_id ?? -1)

    export let prodID:number;

    /*interface Product {
		Product_id?: number,
		product_name: string,
		img_address: string,
		price: number,
		description: string,
		manufacturer: string,
		radius?: number,
	}*/

    let product:Product;
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
                { userID, productID: product.Product_id },
                (d) => {
                    console.log(d);
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
        fetch_item_data(prodID);
	});


</script>

<div class="productInfo grid grid-rows-10 justify-center justify-items-center">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img class="itemImg row-span-4 w-[30rem] h-[30rem] object-scale-down " src="{product?.img_address}" alt="Image failed to load"/>
    <div class=" row-span-2 grid w-[30rem]">
        <div class=" grid grid-cols-5">
            <p class="itemName text-3xl col-span-3 ">{product?.product_name}</p>
            <div class="col-span-2 grid grid-rows-2">
                <p class="itemPrice text-3xl text-right">{product?.price} :-</p>
                <button class=" rows-span-1 px-4 py-1 h-[3rem] w-[10rem] bg-red-500 rounded-full justify-self-end" on:click={addToCart} on:keydown>
                    <i class="bi bi-cart-plus"></i>
                    Add to cart
                </button>
            </div>
        </div>
    </div>

    <p class="itemDesc bg-gray-200 w-[30rem] min-h-[2.5rem] p-3 mt-5">{product?.description}</p>
    <div class="itemSpecs grid grid-cols-3 w-full">
        <div class="grid grid-rows-3 header">
            <div class=" border-b-2 border-stone-300"><p>Manufacturer:</p></div>
            <div class=" border-b-2 border-stone-300"><p>Radius:</p></div>
            <div class=" "><p>Product ID:</p></div>
        </div>
        <div class=" col-span-2 grid grid-rows-3 ">
            <p class=" border-b-2 border-stone-300 w-full text-right ">{product?.manufacturer}</p>
            <p class=" border-b-2 border-stone-300 w-full text-right ">{product?.radius}</p>
            <p class="  w-full text-right ">{product?.Product_id}</p>
        </div>
    </div>
</div>


<style lang="postcss">

</style>