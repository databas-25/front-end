<script lang="ts">
	import post from "~/script/web";
	import { user, validUser } from "~/stores/user_store";

	let profileName:string;
	let email:string;
    let profileNameTmp: string;
    let emailTmp: string;
    let userId: number;
    let succ = 0;

    user.subscribe((u) => {
		if (validUser(u)) {
			profileName = u.user_name;
			email = u.email;
            profileNameTmp = profileName;
            emailTmp = email;
		}
    });

    let items = [
        {name: "fläkt", id: 12387, price: 55, date: 2002},
        {name: "flökt", id: 12384, price: 525, date: 2001},
        {name: "flåkt", id: 12381, price: 52, date: 2004}
    ];

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
                user: userId,
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

<div class="w-4/5 grid grid-cols-5 m-auto bg-gray-200 p-1 rounded">
    <div class="rounded border-2 bg-gray-500 text-gray-300 border-black justify-evenly h-fit"> <!-- div is for left side menu --> 
        <p class="menuItem {current_tab==SUB_TABS.ACCOUNT_DETAILS? 'text-gray-200 bg-gray-700': ''}" on:click={()=>current_tab=SUB_TABS.ACCOUNT_DETAILS} on:keydown>Account Details</p>
        <p class="menuItem {current_tab==SUB_TABS.ORDER_HISTORY? 'text-gray-200 bg-gray-700': ''}" on:click={()=>{current_tab=SUB_TABS.ORDER_HISTORY;succ=0}} on:keydown>Order History</p>
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
        <div class="orderHistory rounded border-2 border-black col-span-4 text-center fit-content-center h-fit bg-gray-500">

            <div class="grid grid-cols-4 header">
                <div class=" border-2 border-pink-400 rounded-full"><p>Item name</p></div>
                <div class=" border-2 border-pink-400 rounded-full"><p>Order ID</p></div>
                <div class=" border-2 border-pink-400 rounded-full"><p>Date</p></div>
                <div class=" border-2 border-pink-400 rounded-full"><p>Price</p></div>
            </div>
        
            {#each items as item}
                <div class="grid grid-cols-4 entries">
                    <div><p>{item.name}</p></div>
                    <div><p>{item.id}</p></div>
                    <div><p>{item.date}</p></div>
                    <div><p>{item.price}</p></div>
                </div>
            {/each}

        </div>
    {:else}
        <div>
            <p>This is the else case</p>
            <p>You shouldn't be here</p>
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

