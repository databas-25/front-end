<script lang="ts">
	import { slide } from "svelte/transition";
	export let entry: [string, {name: string, checked: boolean, amount: number}[]]
	let isOpen = false
	const toggle = () => isOpen = !isOpen;
	export let onChange = () => {};
</script>

<style lang="postcss">
	button {
        background: none;
        color: inherit;
        cursor: pointer;
        margin: 0;
        @apply py-2 border-2 border-white rounded text-black w-full;
    }

    [aria-expanded=true] {
	    @apply text-sky-700;
	}

	svg {
        transition: transform 0.2s ease-in;
	}

	[aria-expanded=true] svg {
	    @apply rotate-90 stroke-sky-700;
	}

    ul{
        @apply w-full ml-[12%];
    }

    li {
        @apply py-1 pl-2 border-2 border-white rounded w-[90%] text-gray-900 my-1;
    }
</style>

<div class="px-2">
    <button on:click={toggle} aria-expanded={isOpen} class="flex align-baseline gap-1 outline-none">
        <svg style="tran"  width="20" height="20" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M9 5l7 7-7 7"></path>
        </svg>
        {entry[0]}
    </button>

    {#if isOpen}
        <ul transition:slide={{ duration: 300 }}>
            {#each entry[1] as item}
                <li class="flex gap-2 select-none">
                    <input type="checkbox" id="filter_{item.name}" bind:checked={item.checked} on:change={onChange} class="outline-none cursor-pointer w-5"/>
                    <label for="filter_{item.name}" class="w-full flex justify-between pr-4 cursor-pointer">
                        {item.name}
                        <span class="flex flex-col justify-center">
                            <span class="bg-gray-300 rounded-lg px-1 text-sm">{item.amount}</span>
                        </span>
                    </label>
                </li>
            {/each}
        </ul>
    {/if}
</div>