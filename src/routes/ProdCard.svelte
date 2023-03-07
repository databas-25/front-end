<script lang="ts">
    import post from '~/script/web';
    import { updateCartAmount, user } from '@stores/user_store';
    import { modalOpen } from '@stores/modal_store';

    let userID:Number;
    const maxChars = 50;

    user.subscribe((u) => userID = u?.User_id ?? -1)

    export let product: Product;

    function addToCart(e: MouseEvent){
        e.stopPropagation();
        e.preventDefault();
        if (userID !== -1) {
            post(
                'add_item',
                { productID: product.Product_id },
                () => {
                    updateCartAmount()
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

    //run to update their cart, how many items + which ones
    function updateCart(){
        //fetch from database
    }
</script>

<a href="/detail/{product.Product_id}">
    <div class="relative z-0 bg-gray-100 m-2 border-2 border-gray-400 rounded-xl shadow-md grid grid-rows-6 w-72 aspect-[9/12] overflow-clip">
        <div class="row-span-3 bg-black relative">
            <img src={product.img_address} alt="Img Err" class="h-full w-full object-scale-down">
            <div class="absolute rounded top-1 right-2 text-sm px-1 bg-gray-100 shadow-lg shadow-black">
                {product.price} :-
            </div>
        </div>
        <div class="flex justify-between py-1 px-2">
            <div class="text-xl w-100 text-ellipsis whitespace-nowrap overflow-hidden">
                {product.product_name}
            </div>
            <div>
                <button class="border px-3 py-1 hover:bg-gray-200 rounded" on:click={addToCart} on:keydown>
                    <i class="bi bi-cart-plus"></i>
                </button>
            </div>
        </div>
        <div class="px-2">
            {#if product.description.length < maxChars}
                {product.description}
            {:else}
                {product.description.substring(0, maxChars - 3).trim() + '...'}
            {/if}
        </div>
    </div>
</a>
