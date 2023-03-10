<script lang="ts">
    import { slide } from "svelte/transition";
    export let items: adminOrders[];
    export let open = -1;
    export let onOpen = (x: number) => {};
    $: user = items[0].User_id;
    $: username = items[0].user_name;
    $: time = new Date(items[0].timestamp);
    $: shown = open == user;
</script>

<div class="bg-white rounded transition-all hover:bg-gray-100">
    <div on:click={() => onOpen(shown? -1: user ?? -1)} on:keydown class="cursor-pointer px-3 py-2 grid grid-cols-12">
        <div class="col-span-3 flex gap-3">
            <svg
                style="tran" width="20" height="20" fill="none"
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                viewBox="0 0 24 24" stroke="currentColor"
                class="transition-all {shown? 'rotate-90': ''}"
            >
                <path d="M9 5l7 7-7 7"></path>
            </svg>
            <p>{username}</p>
        </div>
        <p class="col-start-11 text-right col-span-2">{time.toJSON().substring(0, 10).replace(/-/g, '/')}</p>
    </div>

    {#if shown}
        <div transition:slide={{ duration: 300 }} class="px-5 grid grid-cols-12">
            <div class="col-span-full grid grid-cols-12 text-sm text-gray-600 px-2 mb-1">
                <div class="col-span-10">Name</div>
                <div class="col-span-2">status</div>
            </div>
            {#each items as item}
                {#if item.Order_id}
                    <p class="col-span-10">{item.Order_id ?? '?'}</p>
                    <p class="col-span-2 text-sm rounded text-green-400 border border-green-400 w-fit px-1 shadow-lg my-1">done</p>
                {:else}
                    <p class="col-span-10">{item.Order_id ?? '?'}</p>
                    <p class="col-span-2 text-sm rounded text-yellow-500 border border-yellow-500 w-fit px-1 shadow-lg my-1">progress</p>
                {/if}
                <hr class="col-span-full border-gray-400 last-of-type:hidden mx-2 mb-1"/>
             {/each}
             <div class="col-span-full mb-2"></div>
        </div>
    {/if}
</div>