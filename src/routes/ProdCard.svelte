<script lang="ts">
    let name:string;
    let price:string;
    let img:string;
    let link:string;

    export {name, price, img, link};
</script>

<a href={link}>
    <div class="ProdCard bg-gray-400 m-2 border-2 border-red-600 grid grid-rows-5 aspect-[9/12]">
        <div class="thumbnail row-span-4 m-4">
            <img src={img} alt="Img Err" class="object-scale-down h-full w-full">
        </div>
        <div class="productInfo p-2">
            <div class="prodName float-left">
                {name}
            </div>
            <div class="prodPrice float-right">
                {price}
            </div>
        </div>
    </div>
</a>