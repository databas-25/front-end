<script lang="ts">
    import { slide } from "svelte/transition";
    export let items: Array<OrderedItem>;
    export let open = -1;
    export let onOpen = (x: number) => {};
    $: order_id = items[0].Order_Order_id;
    $: time = new Date(items[0].timestamp);
    $: shown = open == order_id;
</script>

<div class="bg-white rounded transition-all hover:bg-gray-100">
    <div on:click={() => onOpen(shown? -1: order_id ?? -1)} on:keydown class="cursor-pointer px-2 py-1 grid grid-cols-12">
        <div class="col-span-3 flex gap-3">
            <svg
                style="tran" width="20" height="20" fill="none"
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                viewBox="0 0 24 24" stroke="currentColor"
                class="transition-all {shown? 'rotate-90': ''}"
            >
                <path d="M9 5l7 7-7 7"></path>
            </svg>
            <p class="{shown? '-rotate-90': ''} transition-all">{order_id}</p>
        </div>
        <p class="col-start-9 col-span-2">{items.reduce((acc, x) => acc + x.price * x.amount, 0)} kr</p>
        <p class="col-start-11 text-right col-span-2">{time.toJSON().substring(0, 10).replace(/-/g, '/')}</p>
    </div>

    {#if shown}
        <div transition:slide={{ duration: 300 }} class="px-1 grid grid-cols-12">
            <div class="col-span-full grid grid-cols-12 text-sm text-gray-600 px-2">
                <div class="col-span-6">Name</div>
                <div class="col-span-2">Amount</div>
                <div class="col-span-2">Price</div>
            </div>
            {#each items as item}
                 <p class="col-span-6">{item.product_name}</p>
                 <p class="col-span-2">{item.amount}</p>
                 <p class="col-span-2">{item.price} kr</p>
                 <a class="col-span-2 flex justify-end" href="/detail/{item.Products_Product_id}">
                    <div class="w-fit box-border flex justify-end gap-2 hover:border-b border-gray-600 hover:text-blue-800 cursor-pointer">
                        <p>Link</p>
                        <p class="rotate-45"><i class="bi bi-link"></i></p>
                    </div>
                </a>
             {/each}
             <div class="col-span-full mb-2"></div>
        </div>
    {/if}
</div>