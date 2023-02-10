
<script lang="ts">
    export const def: Product = {
        product_name: '',
        manufacturer: '',
        img_address: '',
        price: 0,
        description: '',
    }

    export let onSubmit = (product: Product) => { console.log(product) }
</script>

<div class="max-w-screen-sm flex flex-col gap-1 mx-5 pb-5">
    <div>
        <p>Product name</p>
        <input type="text" class="input-text" bind:value={def.product_name}/>
    </div>
    <div>
        <p>Manufacturer</p>
        <input type="text" class="input-text" bind:value={def.manufacturer}/>
    </div>
    <div>
        <p>Image url</p>
        <input type="text" class="input-text" bind:value={def.img_address}/>
    </div>
    <div>
        <p>Price</p>
        <input type="number" class="input-text" bind:value={def.price}/>
    </div>
    <div>
        <p>Description</p>
        <textarea class="input-text" bind:value={def.description}/>
    </div>
    <div class="flex justify-end">
        <button class="bg-blue-500 rounded-lg hover:bg-blue-400 text-white px-5 py-2" on:click={() => onSubmit(def)}>Save</button>
    </div>
</div>