<script lang="ts">
    import { user } from '@stores/user_store';
	import { onMount } from 'svelte';
    import post from "~/script/web";
    import { modalOpen } from '@stores/modal_store';

    // might no be needed since layout has it. Although we do need them logged in to add an item
    let userID:number;
    user.subscribe((u) => userID = u?.User_id ?? -1)

    export let review: Review;
    let time = new Date();

    $: {
        time = new Date(review.reviewTime);
    }

</script>
<div class="grid grid-cols-5">
    <div class="text-xl col-span-3 font-bold">              {review.title}        </div>
    <div class="text-xl col-span-2 text-right font-bold">
        {#each [1, 2, 3, 4, 5] as i}
            <i class="bi {i <= review.rating? 'bi-star-fill text-yellow-300': 'bi-star'}"></i>
        {/each}
    </div>
    <div class="col-span-5 m-5">                            {review.body}         </div>
    <div class="col-span-3 font-bold">
        By: {review.user_name}
    </div>
    <div class="col-span-2 text-right font-bold ">
        At: {time.toJSON()?.slice(0,10)?.replace(/-/g,'/')}
    </div>
</div>
<hr/>

<style lang="postcss">

</style>