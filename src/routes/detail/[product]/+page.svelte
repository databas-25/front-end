<script lang="ts">
	import post from '~/script/web';
	import { onMount } from "svelte";
	import { user } from "~/stores/user_store";
	import ItemCard from "./ItemCard.svelte";
    import Review_ from "./Review.svelte";

    export let data: {product: string};

    let prodID = parseInt(data.product);
    let userID: number;

    let reviews: Array<Review> = [];

    user.subscribe((u) => userID = u?.User_id ?? -1)

    onMount(()=>{
        post(
            'getForProduct',
            {productID: prodID },
            (d) => {
                reviews = d.reviews??[]
            },
            (e) => {
                if (e) {
                    console.error("Err: ", e);
                }
            },
            "review"
        )
    });

    let hover: number = 0;
    let selected: number = 0;
    let title: string;
    let body: string;

    $: get_classes = (i: number) => {
        if(i <= hover && i <= selected) {
            return 'bi-star-fill text-yellow-500';
        }
        if(i <= hover) {
            return 'bi-star-fill text-yellow-400'
        }
        if(i <= selected) {
            return 'bi-star-fill text-yellow-300'
        }
        return 'bi-star'
    }

    const create_review = () => {
        console.log("post");
        if(title.length > 255 || 5 > title.length)
            return
        if(selected == 0)
            return
        console.log("post2");

        post(
            'post',
            { userID, productID: prodID, rating: selected, body, title },
            (d) => {
                window.location.reload();
            },
            (e) => {
                if (e) {
                    console.error("Err: ", e);
                }
            },
            'review'
        );
    }
</script>

<div class="w-[35rem] m-auto shadow-2xl rounded-xl border border-gray-300 mb-10 px-3">
    <ItemCard {prodID} product={null}/>

    {#if !(reviews.some((r) => r.User_id == userID) || userID == -1)}

        <div class="mt-5 bg-gray-50 p-1">
            <p class="text-2xl">Write a review:</p>
            <input class="border w-full mt-5" type="text" name="" id="" placeholder="Title" bind:value={title}/>
            <textarea class="border w-full mt-5" name="" id="" placeholder="Body" bind:value={body}/>
            <div class="flex justify-between mt-5">
                <div class="flex">
                    {#each [1,2,3,4,5] as i}
                        <i class="bi {get_classes(i)}" on:click={()=>{selected = i}} on:mouseover={()=>{hover = i}} on:mouseleave={()=>{hover = 0}} on:keydown on:focus/>
                    {/each}
                </div>
                <button class=" border w-1/4" type="submit" on:click={create_review}>Submit</button>
            </div>
        </div>

    {/if}
    <div class="m-auto w-[30rem] mt-5 flex flex-col gap-5">
        <p class="text-2xl">Reviews:</p>
        {#if (!reviews.length)}
            <p>There are no reviews yet</p>
        {/if}
        {#each reviews as review}
            <Review_ {review}/>
        {/each}
    </div>
</div>

<style lang="postcss">

</style>