<script lang="ts">
	import post from "~/script/web";
	import { user, validUser } from "~/stores/user_store";
	import _ from 'lodash';
	import Order from "./Order.svelte";

	let profileName:string;
	let email:string;
    let profileNameTmp: string;
    let emailTmp: string;
    let userId: number;
    let succ = 0;
    let items: Array<OrderedItem> = [];
    let grouped: Record<number, Array<OrderedItem>> = {};
    let open = -1;

    user.subscribe((u) => {
		if (validUser(u)) {
			profileName = u.user_name;
			email = u.email;
            profileNameTmp = profileName;
            emailTmp = email;
            userId = u.User_id;

            // let itemsTmp: Array<{
            //     Order_id: number,
            //     timestamp: Date,
            //     Products_Product_id: number,
            //     amount: number
            // }> = [];

            post(
                "getHistory",
                {},
                (d) => {
                    items = d.result??[];
                    items.forEach(i => {
                        i.timestamp = new Date(i.timestamp);
                    });
                    grouped = _.groupBy(items, (i: OrderedItem) => i.Order_Order_id);
                },
                (e) => {
                    console.error(e);
                },
                "order"
            );
		}
    });

	const SUB_TABS = {
		ACCOUNT_DETAILS: 0,
		ORDER_HISTORY: 1,
		DELETE_ACCOUNT: 99
	}
	let current_tab = SUB_TABS.ACCOUNT_DETAILS;

	let changePersInfo = false;

    function saveNewPersonalDetails(){
        profileName = profileNameTmp;
        email = emailTmp;
        post(
            "update",
            {
                email: email,
                username : profileName
            },
            (d) => {
                succ = 1;
                setTimeout(() => succ = 0, 5000);
                user.update((u) => {
                    if(validUser(u)) {
                        u.email = email;
                        u.user_name = profileName;
                    }
                    return u;
                });
            },
            (e) => {
                succ = 2;
                setTimeout(() => succ = 0, 5000);
                console.error(e);
            }
        )
    }

    function discardNetPersonalDetails(){
        profileNameTmp = profileName;
        emailTmp = email;
    }

</script>

<div class="w-4/5 grid grid-cols-5 mx-auto h-fit bg-gray-200 p-1 rounded">
    <div class="rounded border-2 bg-gray-500 text-gray-300 border-black justify-evenly h-fit"> <!-- div is for left side menu -->
        <p class="menuItem py-1 px-1 cursor-pointer {current_tab==SUB_TABS.ACCOUNT_DETAILS? 'text-gray-200 bg-gray-700': ''}" on:click={()=>current_tab=SUB_TABS.ACCOUNT_DETAILS} on:keydown>Account Details</p>
        <p class="menuItem py-1 px-1 cursor-pointer {current_tab==SUB_TABS.ORDER_HISTORY? 'text-gray-200 bg-gray-700': ''}" on:click={()=>{current_tab=SUB_TABS.ORDER_HISTORY;succ=0}} on:keydown>Order History</p>
    </div>
    {#if current_tab==SUB_TABS.ACCOUNT_DETAILS}
        <div class="rounded border-2 border-black col-span-4 text-center fit-content-center h-fit grid grid-cols-8 bg-gray-300 ml-4">
            <div class="infoHeaders col-span-2">
                <p class="infoHeader">Profile name: </p>
                <p class="infoHeader">E-mail address:</p>
            </div>
            {#if changePersInfo==false}
                <div class="infoValues col-span-6">
                    <p class="infoValue">{profileName}</p>
                    <p class="infoValue">{email}</p>
                </div>
                <div class=" col-span-7">
                    {#if succ == 1}
                        <p class=" text-green-600">Successfully changed</p>
                    {:else if succ == 2}
                        <p class=" text-red-600">An error occurred</p>
                    {/if}
                </div>
                <button class="buttn bg-red-400 hover:bg-red-700 focus:bg-red-900" on:click={()=>{succ=0;changePersInfo=true}}>Edit</button>
            {:else}
                <div class="infoValues text-center fit-content-center col-span-6 grid grid-rows-2">
                    <input class="infoValueIn" bind:value={profileNameTmp} required/> <!-- fix binding so you might not need it maybe -->
                    <input class="infoValueIn" bind:value={emailTmp} required/>
                </div>
                <div class=" col-span-6"></div>
                <button class="buttn bg-green-400 hover:bg-green-700 focus:bg-green-900" on:click={()=>{changePersInfo=false;saveNewPersonalDetails()}}>Save</button>
                <button class="buttn bg-red-400 hover:bg-red-700 focus:bg-red-900" on:click={()=>{changePersInfo=false;discardNetPersonalDetails()}}>Cancel</button>
            {/if}
        </div>
    {:else if current_tab==SUB_TABS.ORDER_HISTORY}
        <!-- <div class="orderHistory rounded border-2 border-black col-span-4 text-center fit-content-center h-fit bg-gray-500">

            <div class="grid grid-cols-6 header">
                <div class=" border-2 border-pink-400 rounded-full"><p>Order ID</p></div>
                <div class=" border-2 border-pink-400 rounded-full"><p>Item name</p></div>
                <div class=" border-2 border-pink-400 rounded-full"><p>Product ID</p></div>
                <div class=" border-2 border-pink-400 rounded-full"><p>Amount</p></div>
                <div class=" border-2 border-pink-400 rounded-full"><p>Date</p></div>
                <div class=" border-2 border-pink-400 rounded-full"><p>Price</p></div>
            </div>

            {#each items as item}
                <div class="grid grid-cols-6 entries">
                    <div><p>{item.Order_Order_id}</p></div>
                    <div><p>{item.product_name}</p></div>
                    <div><p>{item.Products_Product_id}</p></div>
                    <div><p>{item.amount}</p></div>
                    <div><p>{item.timestamp.toJSON()?.slice(0,10)?.replace(/-/g,'/')}</p></div>
                    <div><p>{item.price}</p></div>
                </div>
            {/each}
        </div> -->
        <div class="col-span-4 px-2">
            <div class="grid grid-cols-12 divide-x-0 divide-gray-600">
                <p class="col-span-3 px-2">Order</p>
                <p class="col-span-5 px-2"></p>
                <p class="col-span-2 px-2">Sum</p>
                <p class="col-span-2 text-right">Date</p>
            </div>
            {#each Object.values(grouped) as items}
                <Order {items} {open} onOpen={(o) => open = o}/>
                <hr class="last-of-type:hidden border-gray-600"/>
            {/each}
        </div>
    {:else}
        <div>
            <p>This is the else case</p>
            <p>You shouldn't be here</p>package-lock.json
            modified:   package.json
        </div>
    {/if}
</div>

<style lang="postcss">
    .menuItem {
        @apply hover:text-white;
    }

    .infoHeader:nth-child(even){
        @apply bg-gray-500;
    }

    .infoHeader:nth-child(odd){
        @apply bg-gray-400;
    }

    .infoValue:nth-child(even){
        @apply bg-gray-400;
    }

    .infoValue:nth-child(odd){
        @apply bg-gray-500;
    }

    .infoValueIn{
        text-align: center;
        @apply rounded bg-yellow-200;
    }

    .infoValueIn:nth-child(odd){
        @apply rounded bg-yellow-300;
    }
    
    .infoValueIn:focus{
        @apply bg-yellow-100;
    }

    .buttn{
        @apply col-span-1 rounded-full m-1;
    }
    
    .header{
        @apply bg-sky-400 p-1;
    }

    .entries{
        @apply bg-sky-300;
    }

    .entries:nth-child(even){
        @apply bg-sky-200;
    }

</style>

