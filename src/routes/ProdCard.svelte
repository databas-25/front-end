<script lang="ts">
    import * as jq from 'jquery';
    import { user, type User } from '@stores/user_store';
    import { modalOpen } from '@stores/modal_store';

    let name:string;
    let price:string;
    let img:string;
    let link:string;
    let userID:Number;
    let productID:Number = Math.ceil(Math.random() * 50);

    user.subscribe((u) => userID = u?.User_id ?? -1)

    export {name, price, img, link};

    
    function addToCart(){
        if (userID !== -1) {
            jq.ajax?.({
                url: 'http://localhost:8000/user/addToCart',
                method: 'POST',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({
                    'userID': userID,
                    'productID': productID
                }),
                success: (d) => {
                    console.log(d);
                },
                error: (e) => {
                    if (e) {
                        console.error("Err: ", e);
                    }
                }
            })
        } else {
            modalOpen.set({ open: true, type: 1 });
        }
    }

    //run to update their cart, how many items + which ones
    function updateCart(){
        //fetch from database
    }
    
</script>

<div class="ProdCard relative z-0 bg-gray-400 m-2 border-2 border-red-600 grid grid-rows-5 aspect-[9/12]">
    <a href={link}>
        <div class="thumbnail row-span-4 m-4">
            <img src={img} alt="Img Err" class="object-scale-down h-full w-full">
        </div>
    </a>
    <div class="absolute bottom-0 left-0 right-0 flex flex-col">
        <div class="productInfo p-1">
            <div class="prodName float-left">
                {name}
            </div>
            <div class="prodPrice float-right">
                {price}
            </div>
        </div>
        <button class="h-8 border bg-red-600" on:click={addToCart}>
            Add
        </button>
    </div>
</div>
