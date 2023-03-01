<script lang="ts">
    import { user } from '@stores/user_store';
	import { onMount } from 'svelte';
    import post from "~/script/web";
    import { modalOpen } from '@stores/modal_store';


    // might no be needed since layout has it. Although we do need them logged in to add an item
    let userID:number;
    user.subscribe((u) => userID = u?.User_id ?? -1)

    export let review: Review;

</script>
<div class="grid grid-cols-5">
    <div class="text-xl col-span-4 font-bold">              {review.title}        </div>
    <div class="text-xl col-span-1 text-right font-bold">   {review.rating}/5    </div>
    <div class="col-span-5 m-5">                            {review.body}         </div>
    <div class="col-span-3 font-bold">                    
        By: {review.name}
    </div>
    <div class="col-span-2 text-right font-bold ">
        At: {review.reviewTime.toJSON().slice(0,10).replace(/-/g,'/')}
    </div>
</div>
<hr/>



<style lang="postcss">

</style>