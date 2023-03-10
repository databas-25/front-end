<script lang="ts">
	import _ from 'lodash';
    import post from '~/script/web';

    function remove() {
        if (confirm("Are you sure you want to remove this product")) {
            post(
                'unpublish',
                { Product_id: item.Product_id },
                () => {},
                () => {},
                'product',
            )
        }
    }

    const updateStock = _.debounce(() => {
        post(
            'update_stock',
            {
                productId: item.Product_id,
                stock: item.stock,
            },
            () => { },
            () => { },
            'product',
        );
    }, 500);

    function editItemAmount(amount: number) {
        item.stock += amount;
        if (item.stock < 0) {
            item.stock = 0;
        }
        if (item.stock > 999) {
            item.stock = 999;
        }
        updateStock();
    }

    export let item: Product;
    export let onSelect = () => {};
</script>
<div class="grid grid-cols-12 bob p-2">
    <div class="col-span-8 px-2 flex">
        <img src={item.img_address} class="h-12 object-scale-down" alt="j"/>
        <div class="flex flex-col justify-center px-3">
            <p>{item.product_name}</p>
        </div>
    </div>
    <div class="text-center flex flex-col justify-center"><p>{item.price} kr</p></div>
    <div class="flex flex-col justify-center">
        <div class="flex justify-evenly align-baseline">
            <div class="w-8 border border-gray-600 rounded-full aspect-square flex flex-col justify-center select-none hover:bg-black hover:bg-opacity-10 cursor-pointer" on:click={() => editItemAmount(-1)} on:keydown>
                <p class="h-fit w-full text-center">-</p>
            </div>
            <div class="flex flex-col justify-center w-12">
                <input type="number" class="hide-button-control h-fit border-b-2 border-stone-300 px-2 outline-none bg-transparent focus:border-black whitespace-nowrap text-right overflow-hidden" bind:value={item.stock} on:blur={() => editItemAmount(0)} />
            </div>
            <div class="w-8 border border-gray-600 rounded-full aspect-square flex flex-col justify-center select-none hover:bg-black hover:bg-opacity-10 cursor-pointer" on:click={() => editItemAmount(1)} on:keydown>
                <p class="h-fit w-full text-center">+</p>
            </div>
        </div>
    </div>
    <div class="text-right flex flex-col justify-center"><i class="bi bi-pencil-square hover:text-amber-600 cursor-pointer" on:click={onSelect} on:keydown></i></div>
    <div class="text-center flex flex-col justify-center"><i class="bi bi-trash hover:text-red-600 cursor-pointer" on:click={remove} on:keydown></i></div>
</div>

<style>
    .hide-button-control::-webkit-inner-spin-button,
    .hide-button-control::-webkit-outer-spin-button {
        @apply appearance-none;
        margin: 0;
    }

    .hide-button-control {
        -moz-appearance: textfield;
    }
</style>