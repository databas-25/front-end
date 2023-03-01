<script lang="ts">
    import _ from 'lodash';
    import post from '~/script/web';
    import { updateCartAmount, user } from '~/stores/user_store';

    let userID = -1;
    user.subscribe((u) => userID = u?.User_id ?? -1);

    export let item: BasketItem;
    export let onUpdate: () => void;

    const sendUpdate = _.debounce(() => {
        post(
            'update_amount',
            {
                productID: item.Products_Product_id,
                userID,
                amount: item.amount,
            },
            () => {
                updateCartAmount();
            },
            () => {
                console.error('Failed to update basket item amount');
            },
            'cart'
        );
    }, 400);

    const reload = _.debounce(() => {
            window.location.reload();
        }, 100);

    function removeItem(){
        post(
            'clearItem', 
            {
                userID,
                productID: item.Products_Product_id
            },
            () => {},
            () => {
                console.error('Failed to remove item from basket');
            },
            'cart'
        );
        reload();
    }

    function editItemAmount(change: number) {
        item.amount += change;
        if (item.amount < 0) {
            item.amount = 0;
        }

        if (item.amount > 999) {
            item.amount = 999;
        }

        sendUpdate();
        onUpdate();
    }
</script>

<div class="grid grid-cols-11 bob p-2">
    <div class="col-span-7 px-2 flex">
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
                <input type="number" class="hide-button-control h-fit border-b-2 border-stone-300 px-2 outline-none bg-transparent focus:border-black whitespace-nowrap text-right overflow-hidden" bind:value={item.amount} on:blur={() => editItemAmount(0)} />
            </div>
            <div class="w-8 border border-gray-600 rounded-full aspect-square flex flex-col justify-center select-none hover:bg-black hover:bg-opacity-10 cursor-pointer" on:click={() => editItemAmount(1)} on:keydown>
                <p class="h-fit w-full text-center">+</p>
            </div>
        </div>
    </div>
    <div class="text-center flex flex-col justify-center"><p>{item.price * item.amount} kr</p></div>
    <div class="text-center">
        <i class="bi bi-trash text-red-600 hover:text-red-800 cursor-pointer text-2xl" on:click={removeItem} on:keydown></i>
    </div>
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