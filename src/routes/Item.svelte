<script>
	import { slide } from "svelte/transition";
	export let entry
	let isOpen = false
	const toggle = () => isOpen = !isOpen
</script>
<style lang="postcss">
	button {
        background: none;
        color: inherit;
        cursor: pointer;
        margin: 0;
        @apply py-2 m-2 border-2 border-white rounded p-2 bg-blue-400 text-black w-full;
    }

	svg { 
        transition: transform 0.2s ease-in;
	}
	
	[aria-expanded=true] svg { transform: rotate(0.25turn); }

    ul{
        @apply w-full ml-[12%];
    }

    li {
        @apply py-0.5 pl-2 border-2 border-white rounded w-[90%] bg-blue-400 text-gray-900 my-1;
    }
</style>

<button on:click={toggle} aria-expanded={isOpen} class="flex items-baseline gap-1">
    <svg style="tran"  width="20" height="20" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 5l7 7-7 7"></path>
    </svg> {entry[0]}
</button>

{#if isOpen}
<ul transition:slide={{ duration: 300 }}>
    {#each entry[1] as item}
        <li>{item}</li>
    {/each}
</ul>
{/if}