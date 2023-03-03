
<script lang="ts">
    import Select from 'svelte-select';

    export let def: Product = {
        product_name: '',
        manufacturer: '',
        img_address: '',
        price: 0,
        description: '',
        category: '',
        radius: 0,
    }

    const manufacturers = [
        'Matzuus Fans AB',
        'Fany fans',
        'Biltema',
        'Bosch',
        'Cool Products Inc'
    ]

    const categories = [
        'Ceiling fan',
        'Table fan',
        'Tower fan',
    ]

    let select_man: any = (man: { detail: { value: string }}) => { def.manufacturer = man.detail.value };
    let select_cat: any = (cat: { detail: { value: string }}) => { def.category = cat.detail.value };

    export let onSubmit = (product: Product) => { console.log(product) }
</script>

<div class="max-w-screen-sm flex flex-col gap-1 mx-5 pb-5">
    <div>
        <p>Product name</p>
        <input type="text" class="input-text" bind:value={def.product_name}/>
    </div>
    <div>
        <p>Manufacturer</p>
        <Select items={manufacturers} value={def.manufacturer} on:change={select_man} label='value'/>
    </div>
    <div>
        <p>Category</p>
        <Select items={categories} value={def.category} on:change={select_cat} label='value'/>
    </div>
    <div>
        <p>Image url</p>
        <input type="text" class="input-text" bind:value={def.img_address}/>
    </div>
    <div>
        <p>radius</p>
        <input type="text" class="input-text" bind:value={def.radius}/>
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