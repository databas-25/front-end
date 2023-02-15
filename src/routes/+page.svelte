<script lang="ts">
	import post from "~/script/web";
	import {onMount, beforeUpdate, afterUpdate, onDestroy} from 'svelte';

    
	import ProdCard from "./ProdCard.svelte";

    let products: Array<Product> = [];
        
    onMount(() =>{
        post(
            "fetch_items",
            {},
            (d) => {
                products = d.products??[];
                console.log(d.products??[]);
            },
            (e) => {
                console.error(e);
            },
            "product"
            )
        });

    beforeUpdate(() => console.log('before update'));
    afterUpdate(() => console.log('after update'));
    onDestroy(() => console.log('destroyed'));

    const usID = 10;
    const poID = 1;
    let modalOpen = false;

   

</script>

<style>
    .productSection{
        display: flex;
        justify-content: right;
    }

    .productSectionSub{
        width: 80%;

        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr; /* displays five products per row */
    }

    @media screen and (max-width: 700px){
        .productSectionSub {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
</style>

<div class="productSection mr-10">
    <div class="productSectionSub">
        {#each products as product}
            <ProdCard img="{product.img_address}" productID={product.Product_id??-1} name="{product.product_name}" price="{product.price} sek" link = ""/>
	    {/each}
        <ProdCard img="fan.webp" name="Fan 1" price="199 sek" link="" productID={5}/>
        <ProdCard img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvlz_EFNKYgW-4NRGUKM8KSIJQGCPnUbGWqQ&usqp=CAU" name="Fan 2" price="459 sek" link="" productID={5}/>
        <ProdCard img="https://productimages.biltema.com/v1/Image/article/xlarge/443060/1" name="Fan 3" price="249 sek" link="" productID={5}/>
        <ProdCard img="https://m.media-amazon.com/images/I/81U06MS2NiL._AC_SX466_.jpg" name="Fan 4" price="369 sek" link="" productID={5}/>
        <ProdCard img="https://i5.walmartimages.com/asr/0eb01f80-ee74-4343-b0a7-2629f7fae4b6.6beb73fb0c3e04f2caedce138495b98f.jpeg" name="Fan 5" price="109 sek" link="" productID={5}/>
        <ProdCard img="https://cdn.thewirecutter.com/wp-content/media/2022/05/roomfans_2048px_honeywell.jpg" name="Fan 6" price="159 sek" link="" productID={5}/>
    </div>
</div>