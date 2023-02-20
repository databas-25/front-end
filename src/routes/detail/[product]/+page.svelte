<script lang="ts">
	import { user } from "~/stores/user_store";
	import ItemCard from "./ItemCard.svelte";

    export let data: {product: string};

    let prodID = parseInt(data.product);
    let userID:number;

    user.subscribe((u) => userID = u?.User_id ?? -1)
</script>


<div>
    <ItemCard {prodID}/>
</div>




<style lang="postcss">

</style>