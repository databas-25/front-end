<script lang="ts">
    import post from '~/script/web';


    function remove() {
        if (confirm("Are you sure you want to remove this product")) {
            post(
                'unpublish',
                { Product_id: item.Product_id },
                () => {},
                () => {},
                'product',
            )
        }
    }

    export let item: Product;
    export let onSelect = () => {};
</script>
<div class="grid grid-cols-12 bob p-2">
    <div class="col-span-9 px-2 flex">
        <img src={item.img_address} class="h-12 object-scale-down" alt="j"/>
        <div class="flex flex-col justify-center px-3">
            <p>{item.product_name}</p>
        </div>
    </div>
    <div class="text-center flex flex-col justify-center"><p>{item.price} kr</p></div>
    <div class="text-right flex flex-col justify-center"><i class="bi bi-pencil-square hover:text-amber-600 cursor-pointer" on:click={onSelect} on:keydown></i></div>
    <div class="text-center flex flex-col justify-center"><i class="bi bi-trash hover:text-red-600 cursor-pointer" on:click={remove} on:keydown></i></div>
</div>