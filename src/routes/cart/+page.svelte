<script lang="ts">
    import BasketItem from '~/routes/ProdCard.svelte';
    const items = [
        {name: "fan 1"},
        {name: "fan 2"}
    ]
</script>

<style>
    .bob:nth-child(even){
        background-color: rgba(86, 59, 7, 0.119);
    }
</style>

<div class="bg-teal-50 w-3/4 text-black m-auto text-center border-2">

    <div class="grid grid-cols-6 bob">
        <div class="border-4 col-span-3">Item name</div>
        <div class="border-4">Unit price</div>
        <div class="border-4">Amount</div>
        <div class="border-4">Price</div>
    </div>

    {#each items as item}
        <div class="grid grid-cols-6 bob">
            <div class="col-span-3"><p>{item.name}</p></div>
            <div><p>5</p></div>
            <div><p>5</p></div>
            <div><p>5*5=25</p></div>
        </div>
    {/each}
    
    <div  class="grid grid-cols-6 bob">
        <div class="col-start-5 border-2 col-span-2">toto cost: 5*10 = 50</div>
    </div>

</div>